'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getCurrentSession,
  getHouseholdState,
  registerNewMember,
  setCurrentSession,
  logoutUser,
  saveHouseholdState
} from '@/lib/storage';
import { User } from '@/types';
import { TopHeader } from '@/components/TopHeader';
import { BottomNav } from '@/components/BottomNav';
import { SHOPPING_LIST_INITIAL } from '@/data/shoppingData';
import {
  Users,
  UserPlus,
  IdCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  LogOut,
  RefreshCw,
  Home,
  Sparkles,
  ShoppingBag,
  Calendar
} from 'lucide-react';

export default function HogarPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [household, setHousehold] = useState(getHouseholdState());
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newCedula, setNewCedula] = useState('');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'miembro'>('miembro');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const refresh = () => {
    setCurrentUser(getCurrentSession());
    setHousehold(getHouseholdState());
  };

  useEffect(() => {
    refresh();

    const handleSessionChange = () => setCurrentUser(getCurrentSession());
    const handleStateChange = () => setHousehold(getHouseholdState());

    window.addEventListener('recetario_session_changed', handleSessionChange);
    window.addEventListener('recetario_state_changed', handleStateChange);

    return () => {
      window.removeEventListener('recetario_session_changed', handleSessionChange);
      window.removeEventListener('recetario_state_changed', handleStateChange);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    router.push('/login');
  };

  const handleSwitchUser = (user: User) => {
    setCurrentSession(user);
    setCurrentUser(user);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = registerNewMember({
      cedula: newCedula,
      name: newName,
      password: newPassword,
      role: newRole
    });

    if (res.success && res.user) {
      setSuccessMsg(`¡${res.user.name} ha sido añadido al hogar!`);
      setNewCedula('');
      setNewName('');
      setNewPassword('');
      setIsAddUserOpen(false);
      setHousehold(getHouseholdState());
    } else {
      setErrorMsg(res.error || 'Error al añadir el integrante.');
    }
  };

  const totalMarketItems = SHOPPING_LIST_INITIAL.length + (household.customItems?.length || 0);
  const checkedMarketCount = Object.keys(household.checkedItems || {}).length;
  const pendingMarketCount = Math.max(0, totalMarketItems - checkedMarketCount);

  return (
    <div className="flex-1 flex flex-col">
      <TopHeader user={currentUser} onLogout={handleLogout} />

      <main className="flex-1 px-4 py-4 space-y-4">
        {/* Household Overview Header */}
        <div className="bg-gradient-to-tr from-slate-900 via-slate-800 to-brand-950 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Home className="w-4 h-4" />
              <span>Ecosistema Compartido</span>
            </div>
            <h2 className="text-xl font-black">{household.householdName}</h2>
            <p className="text-xs text-slate-300 mt-1">
              Todos los miembros comparten la lista del mercado, recetas cocinadas y planificación quincenal.
            </p>

            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-700/60 text-center">
              <div className="bg-white/5 rounded-xl p-2">
                <span className="block text-base font-extrabold text-white">
                  {household.users.length}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Miembros</span>
              </div>
              <div className="bg-white/5 rounded-xl p-2">
                <span className="block text-base font-extrabold text-brand-400">
                  {checkedMarketCount}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Mercado OK</span>
              </div>
              <div className="bg-white/5 rounded-xl p-2">
                <span className="block text-base font-extrabold text-warm-400">
                  {household.completedDays.length} / 14
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Días Cocinados</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-brand-500/10 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Current User Session Status */}
        {currentUser && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white text-base font-extrabold shadow-sm ${
                  currentUser.avatarColor || 'bg-brand-600'
                }`}
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] font-bold bg-brand-100 text-brand-800 px-1.5 py-0.2 rounded-md capitalize">
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono flex items-center gap-1">
                  <IdCard className="w-3.5 h-3.5" />
                  CC: {currentUser.cedula}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl border border-rose-200 transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              Salir
            </button>
          </div>
        )}

        {/* Members List */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Miembros del Hogar ({household.users.length})
              </h3>
            </div>
            <button
              onClick={() => setIsAddUserOpen(true)}
              className="text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white px-3 py-1.5 rounded-xl shadow-xs transition-colors flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Añadir Integrante
            </button>
          </div>

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="space-y-2.5">
            {household.users.map((member) => {
              const isCurrent = currentUser?.id === member.id;
              return (
                <div
                  key={member.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                    isCurrent
                      ? 'bg-brand-50/50 border-brand-300 ring-1 ring-brand-300'
                      : 'bg-slate-50 border-slate-200/80 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold ${
                        member.avatarColor || 'bg-brand-600'
                      }`}
                    >
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">
                          {member.name}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] font-bold bg-brand-600 text-white px-1.5 py-0.2 rounded-full">
                            Activo
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Cédula: {member.cedula}
                      </p>
                    </div>
                  </div>

                  {!isCurrent && (
                    <button
                      onClick={() => handleSwitchUser(member)}
                      className="text-xs font-bold text-brand-700 hover:text-brand-900 bg-white hover:bg-brand-50 border border-slate-200 px-2.5 py-1 rounded-xl shadow-2xs transition-colors"
                    >
                      Cambiar aquí
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Modal para Añadir Nuevo Usuario por Cédula y Contraseña */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-5 animate-in zoom-in-95 duration-200">
            <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <UserPlus className="w-4 h-4 text-brand-600" />
              Añadir Integrante al Hogar
            </h3>
            <p className="text-[11px] text-slate-500 mb-4">
              Podrá ingresar desde su teléfono con su Cédula y Contraseña compartiendo el mismo recetario.
            </p>

            {errorMsg && (
              <div className="p-2.5 mb-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleAddMember} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nombre o apodo
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ej. Andrés"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Número de Cédula
                </label>
                <input
                  type="text"
                  required
                  value={newCedula}
                  onChange={(e) => setNewCedula(e.target.value)}
                  placeholder="Ej. 1019283746"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Contraseña de acceso
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Rol en el hogar
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as 'admin' | 'miembro')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="miembro">Miembro (Ver y tachar mercado)</option>
                  <option value="admin">Administrador (Gestionar miembros)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-xs"
                >
                  Registrar Miembro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <BottomNav pendingMarketCount={pendingMarketCount} />
    </div>
  );
}
