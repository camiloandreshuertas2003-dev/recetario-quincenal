'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  getCurrentSession,
  getHouseholdState,
  registerNewMember,
  setCurrentSession,
  updateUserProfile,
  logoutUser
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
  StickyNote,
  Trash2,
  Plus
} from 'lucide-react';
import { FridgeNotesModal } from '@/components/FridgeNotesModal';
import { deleteFridgeNote } from '@/lib/storage';

export default function HogarPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [household, setHousehold] = useState(getHouseholdState());

  // Modals state
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isFridgeNotesOpen, setIsFridgeNotesOpen] = useState(false);

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
    setHousehold(getHouseholdState());
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

  const handleSwitchUser = (user: User) => {
    setCurrentSession(user);
    setCurrentUser(user);
    setEditName(user.name);
    setPreviewPhoto(user.photoUrl || null);
  };

  // Image Upload handler to convert file to Base64
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert('La imagen es demasiado pesada. Por favor selecciona una imagen de menos de 3MB.');
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
      name: editName.trim(),
      photoUrl: previewPhoto || undefined
    });

    if (res.success && res.user) {
      setSuccessMsg('¡Perfil actualizado con éxito!');
      setIsEditProfileOpen(false);
      refresh();
    }
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

        {/* Current User Session with Edit Profile Button */}
        {currentUser && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                {currentUser.photoUrl ? (
                  <img
                    src={currentUser.photoUrl}
                    alt={currentUser.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-brand-500 shadow-sm"
                  />
                ) : (
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-base font-extrabold shadow-sm ${
                      currentUser.avatarColor || 'bg-brand-600'
                    }`}
                  >
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <button
                  onClick={() => setIsEditProfileOpen(true)}
                  className="absolute -bottom-1 -right-1 p-1 bg-white text-slate-700 hover:text-brand-600 rounded-full shadow-xs border border-slate-200"
                  title="Cambiar foto o nombre"
                >
                  <Camera className="w-3 h-3" />
                </button>
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

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="text-xs font-bold text-slate-700 hover:text-brand-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-xl transition-colors flex items-center gap-1"
                title="Editar nombre y foto"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar</span>
              </button>

              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded-xl border border-rose-200 transition-colors flex items-center gap-1"
                title="Cerrar sesión"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
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
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-9 h-9 rounded-xl object-cover border border-brand-300 shadow-2xs"
                      />
                    ) : (
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold ${
                          member.avatarColor || 'bg-brand-600'
                        }`}
                      >
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">
                          {member.name}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] font-bold bg-brand-600 text-white px-1.5 py-0.2 rounded-full">
                            Tú
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

        {/* Tablero de la Nevera (Notas compartidas) */}
        <div className="bg-amber-50/60 rounded-3xl p-5 border border-amber-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-amber-950">
                Tablero de la Nevera
              </h3>
            </div>
            <button
              onClick={() => setIsFridgeNotesOpen(true)}
              className="text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-xl shadow-xs transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Pegar Notita
            </button>
          </div>

          <p className="text-[11px] text-amber-800/80 leading-relaxed">
            Mensajes rápidos, recordatorios del almuerzo o notas cariñosas para los miembros del hogar.
          </p>

          <div className="space-y-2 pt-1">
            {(!household.fridgeNotes || household.fridgeNotes.length === 0) ? (
              <div className="text-center py-5 bg-white/70 rounded-2xl border border-dashed border-amber-300">
                <p className="text-xs text-amber-700 font-medium">
                  No hay notitas pegadas en la nevera todavía.
                </p>
                <button
                  onClick={() => setIsFridgeNotesOpen(true)}
                  className="mt-2 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-lg transition-colors"
                >
                  ¡Sé el primero en dejar una!
                </button>
              </div>
            ) : (
              household.fridgeNotes.map((note) => {
                const colorClasses =
                  note.color === 'pink'
                    ? 'bg-rose-100 border-rose-200 text-rose-950'
                    : note.color === 'blue'
                    ? 'bg-sky-100 border-sky-200 text-sky-950'
                    : note.color === 'green'
                    ? 'bg-emerald-100 border-emerald-200 text-emerald-950'
                    : 'bg-amber-100 border-amber-200 text-amber-950';

                return (
                  <div
                    key={note.id}
                    className={`p-3 rounded-2xl border ${colorClasses} shadow-2xs relative group`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-medium leading-snug flex-1">
                        {note.text}
                      </p>
                      <button
                        onClick={() => {
                          deleteFridgeNote(note.id);
                          setHousehold(getHouseholdState());
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                        title="Despegar notita"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-black/5 text-[10px] opacity-70">
                      <span>{note.authorName}</span>
                      <span>
                        {new Date(note.createdAt).toLocaleDateString('es-CO', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* Modal para Editar Perfil (Nombre y Foto) */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Edit3 className="w-4 h-4 text-brand-600" />
                Editar Mi Perfil
              </h3>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="py-4 space-y-4 text-xs">
              {/* Photo Avatar Preview & Upload */}
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  {previewPhoto ? (
                    <img
                      src={previewPhoto}
                      alt="Preview"
                      className="w-20 h-20 rounded-3xl object-cover border-2 border-brand-500 shadow-md"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
                      <UserIcon className="w-8 h-8" />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 bg-brand-600 hover:bg-brand-700 text-white p-2 rounded-xl shadow-md transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-bold text-brand-700 hover:underline flex items-center gap-1 mt-1"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Subir foto desde galería
                </button>

                {previewPhoto && (
                  <button
                    type="button"
                    onClick={() => setPreviewPhoto(null)}
                    className="text-[10px] text-rose-600 hover:underline mt-1"
                  >
                    Quitar foto
                  </button>
                )}
              </div>

              {/* Edit Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tu nombre o apodo
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Ej. Camilo"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-xs"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

      <FridgeNotesModal
        isOpen={isFridgeNotesOpen}
        notes={household.fridgeNotes || []}
        currentUserName={currentUser?.name || 'Hogar'}
        onClose={() => {
          setIsFridgeNotesOpen(false);
          setHousehold(getHouseholdState());
        }}
        onUpdateNotes={() => setHousehold(getHouseholdState())}
      />

      <BottomNav pendingMarketCount={pendingMarketCount} />
    </div>
  );
}
