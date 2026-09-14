'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  getCurrentSession,
  getHouseholdState,
  registerNewMember,
  deleteMember,
  setCurrentSession,
  updateUserProfile,
  logoutUser,
  setRoutineMode,
  togglePantryItem
} from '@/lib/storage';
import { User } from '@/types';
import { TopHeader } from '@/components/TopHeader';
import { BottomNav } from '@/components/BottomNav';
import { SHOPPING_LIST_INITIAL } from '@/data/shoppingData';
import {
  Users,
  UserPlus,
  IdCard,
  CheckCircle2,
  LogOut,
  Home,
  Camera,
  Edit3,
  X,
  Upload,
  User as UserIcon,
  ShieldCheck,
  Trash2,
  Plus,
  AlertTriangle,
  Clock,
  Sparkles,
  PackageCheck,
  Check
} from 'lucide-react';

const PANTRY_QUICK_STAPLES = [
  { id: 'mkt-15', name: 'Arroz blanco', icon: '🌾' },
  { id: 'mkt-42', name: 'Sal común', icon: '🧂' },
  { id: 'mkt-40', name: 'Aceite vegetal', icon: '🫒' },
  { id: 'mkt-37', name: 'Café colombiano', icon: '☕' },
  { id: 'mkt-38', name: 'Chocolate tradicional', icon: '🍫' },
  { id: 'mkt-29', name: 'Ajo fresco', icon: '🧄' },
  { id: 'mkt-16', name: 'Avena en hojuelas', icon: '🥣' },
  { id: 'mkt-43', name: 'Especias básicas', icon: '🌿' },
  { id: 'mkt-41', name: 'Mantequilla', icon: '🧈' },
  { id: 'mkt-21', name: 'Arepas campesinas', icon: '🫓' }
];

const ROUTINE_OPTIONS = [
  {
    id: 'dinner_to_next_lunch',
    title: 'Cocino en la noche y dejo listo el almuerzo de mañana',
    badge: 'Recomendado • Activo',
    desc: 'Cena de 4 porciones: 2 se cenan hoy, 2 se empacan herméticas para llevar al trabajo. 0 min cocción al mediodía.'
  },
  {
    id: 'lunch_and_dinner_separate',
    title: 'Cocino almuerzo y cena por separado',
    badge: 'Alternativa',
    desc: 'Para quienes trabajan en casa y disponen de tiempo al mediodía y en la noche.'
  },
  {
    id: 'batch_cooking_twice_week',
    title: 'Cocino por lotes 2–3 veces por semana',
    badge: 'Batch cooking',
    desc: 'Preparar bases (hogao, granos, proteínas al horno) el domingo y miércoles.'
  }
];

export default function HogarPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [household, setHousehold] = useState(getHouseholdState());

  // Modals state
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<User | null>(null);

  // Edit Profile Form State
  const [editName, setEditName] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  // New Member Form State
  const [newCedula, setNewCedula] = useState('');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'miembro'>('miembro');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const refresh = () => {
    const session = getCurrentSession();
    setCurrentUser(session);
    const h = getHouseholdState();
    setHousehold(h);
    if (session) {
      setEditName(session.name);
      setPreviewPhoto(session.photoUrl || null);
    }
  };

  useEffect(() => {
    refresh();

    const handleSessionChange = () => {
      const session = getCurrentSession();
      setCurrentUser(session);
      if (session) {
        setEditName(session.name);
        setPreviewPhoto(session.photoUrl || null);
      }
    };
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('La imagen no debe superar los 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const res = updateUserProfile(currentUser.id, {
      name: editName,
      photoUrl: previewPhoto || undefined
    });

    if (res.success) {
      setIsEditProfileOpen(false);
      refresh();
    } else {
      alert(res.error || 'Error al actualizar perfil');
    }
  };

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = registerNewMember({
      cedula: newCedula,
      name: newName,
      password: newPassword,
      role: newRole
    });

    if (!res.success) {
      setErrorMsg(res.error || 'Error al registrar el integrante');
      return;
    }

    setSuccessMsg(`¡${res.user?.name} ha sido añadido exitosamente!`);
    setNewCedula('');
    setNewName('');
    setNewPassword('');
    setTimeout(() => {
      setIsAddUserOpen(false);
      setSuccessMsg(null);
      refresh();
    }, 1200);
  };

  const handleConfirmDelete = () => {
    if (!memberToDelete) return;

    const res = deleteMember(memberToDelete.id);
    if (!res.success) {
      alert(res.error || 'No se pudo eliminar el integrante.');
    } else {
      setMemberToDelete(null);
      refresh();
    }
  };

  const handleTogglePantryStaple = (itemId: string) => {
    togglePantryItem(itemId);
    refresh();
  };

  const adjustments = household.marketAdjustments || {};

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28">
      <TopHeader />

      <main className="max-w-lg md:max-w-xl mx-auto px-4 pt-4 space-y-4">
        {/* Header Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Home className="w-6 h-6 sm:w-7 sm:h-7 text-brand-600" />
            Organización del Hogar
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Configuración de rutina, comensales e inventario de despensa
          </p>
        </div>

        {/* Current User Session Card */}
        {currentUser && (
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                {currentUser.photoUrl ? (
                  <img
                    src={currentUser.photoUrl}
                    alt={currentUser.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-500 shadow-sm"
                  />
                ) : (
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-sm ${
                      currentUser.avatarColor || 'bg-brand-600'
                    }`}
                  >
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <button
                  onClick={() => setIsEditProfileOpen(true)}
                  className="absolute -bottom-1 -right-1 p-1.5 bg-white text-slate-700 hover:text-brand-600 rounded-xl shadow-xs border border-slate-200"
                  title="Cambiar foto o nombre"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-black text-slate-900">
                    {currentUser.name}
                  </span>
                  <span className="text-xs font-bold bg-brand-100 text-brand-800 px-2 py-0.5 rounded-md capitalize">
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-sm text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                  <IdCard className="w-4 h-4 text-slate-400" />
                  C.C. {currentUser.cedula}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="text-sm font-bold text-slate-700 hover:text-brand-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                title="Editar nombre y foto"
              >
                <Edit3 className="w-4 h-4" />
                <span className="hidden sm:inline">Editar</span>
              </button>

              <button
                onClick={handleLogout}
                className="text-sm font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        )}

        {/* 1. SELECCIÓN DE RUTINA: ¿CÓMO QUIERES ORGANIZAR TUS COMIDAS? */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-600" />
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              ¿Cómo quieres organizar tus comidas?
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Define la rutina que rige el planificador quincenal y el cálculo de almuerzos:
          </p>

          <div className="space-y-2.5 pt-1">
            {ROUTINE_OPTIONS.map((opt) => {
              const isSelected = (household.routineMode || 'dinner_to_next_lunch') === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setRoutineMode(opt.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-50/80 border-brand-500 ring-2 ring-brand-500/20 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm sm:text-base font-black text-slate-900">
                      {opt.title}
                    </span>
                    <span
                      className={`text-xs font-black px-2.5 py-0.5 rounded-md shrink-0 ${
                        isSelected
                          ? 'bg-brand-600 text-white shadow-2xs'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {opt.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {opt.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. INVENTARIO RÁPIDO DE DESPENSA ("¿QUÉ YA TIENES EN CASA?") */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-amber-600" />
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Inventario de Despensa
              </h3>
            </div>
            <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-xl">
              Toca para marcar
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Marca los ingredientes básicos que ya tienes en tu alacena. Se descontarán automáticamente de la lista de compras del mercado para evitar sobrecostos:
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {PANTRY_QUICK_STAPLES.map((staple) => {
              const inPantry = !!adjustments[staple.id]?.inPantry;

              return (
                <button
                  key={staple.id}
                  type="button"
                  onClick={() => handleTogglePantryStaple(staple.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between gap-1.5 ${
                    inPantry
                      ? 'bg-amber-100 border-amber-300 text-amber-950 shadow-2xs font-black'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <span>{staple.icon}</span>
                    <span className="truncate">{staple.name}</span>
                  </span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-xs shrink-0 ${
                      inPantry ? 'bg-amber-600 text-white' : 'border border-slate-300 bg-white'
                    }`}
                  >
                    {inPantry && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. MIEMBROS DEL HOGAR */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-600" />
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Miembros del Hogar ({household.users.length})
              </h3>
            </div>
            <button
              onClick={() => setIsAddUserOpen(true)}
              className="text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white px-3.5 py-2 rounded-2xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Añadir Integrante</span>
            </button>
          </div>

          <div className="space-y-3">
            {household.users.map((member) => {
              const isCurrentUser = currentUser?.id === member.id;

              return (
                <div
                  key={member.id}
                  className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-300"
                      />
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold ${
                          member.avatarColor || 'bg-brand-600'
                        }`}
                      >
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm sm:text-base text-slate-900">
                          {member.name}
                        </span>
                        {isCurrentUser && (
                          <span className="text-[10px] font-extrabold bg-brand-200/80 text-brand-900 px-2 py-0.2 rounded-md">
                            Tú
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 font-mono">
                        C.C. {member.cedula} • {member.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {!isCurrentUser && (
                      <button
                        onClick={() => {
                          setCurrentSession(member);
                          refresh();
                        }}
                        className="text-xs font-bold text-slate-700 hover:text-brand-700 bg-white border border-slate-200 px-2.5 py-1.5 rounded-xl hover:bg-brand-50 transition-colors"
                      >
                        Cambiar a este usuario
                      </button>
                    )}

                    <button
                      onClick={() => setMemberToDelete(member)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title={`Eliminar integrante ${member.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Delete User Modal */}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-black text-slate-900">
                ¿Eliminar a {memberToDelete.name}?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Esta acción removerá a este usuario del hogar.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setMemberToDelete(null)}
                className="px-4 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-xs"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-lg font-black text-slate-900">Editar Perfil</h3>

            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nombre:
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Foto de perfil:
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-xs text-slate-600 w-full"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-lg font-black text-slate-900">Añadir Nuevo Integrante</h3>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleCreateMember} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Cédula:</label>
                <input
                  type="text"
                  required
                  value={newCedula}
                  onChange={(e) => setNewCedula(e.target.value)}
                  placeholder="Número de cédula"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre completo:</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nombre del integrante"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Rol:</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as 'admin' | 'miembro')}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 focus:ring-2 focus:ring-brand-500"
                >
                  <option value="miembro">Miembro</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs"
                >
                  Guardar integrante
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
