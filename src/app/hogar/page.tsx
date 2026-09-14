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
  deleteFridgeNote
} from '@/lib/storage';
import { User } from '@/types';
import { TopHeader } from '@/components/TopHeader';
import { BottomNav } from '@/components/BottomNav';
import { SHOPPING_LIST_INITIAL } from '@/data/shoppingData';
import { FridgeNotesModal } from '@/components/FridgeNotesModal';
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
  Plus,
  AlertTriangle
} from 'lucide-react';

export default function HogarPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [household, setHousehold] = useState(getHouseholdState());

  // Modals state
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isFridgeNotesOpen, setIsFridgeNotesOpen] = useState(false);
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

  const handleSwitchUser = (user: User) => {
    setCurrentSession(user);
    setCurrentUser(user);
    setEditName(user.name);
    setPreviewPhoto(user.photoUrl || null);
  };

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
      setTimeout(() => setSuccessMsg(null), 3000);
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
      refresh();
      setTimeout(() => setSuccessMsg(null), 3000);
    } else {
      setErrorMsg(res.error || 'Error al añadir el integrante.');
    }
  };

  const handleConfirmDeleteMember = () => {
    if (!memberToDelete) return;
    const res = deleteMember(memberToDelete.id);
    if (res.success) {
      setSuccessMsg(`${memberToDelete.name} fue eliminado del hogar.`);
      setMemberToDelete(null);
      refresh();
      setTimeout(() => setSuccessMsg(null), 3000);
    } else {
      setErrorMsg(res.error || 'No se pudo eliminar el integrante.');
      setMemberToDelete(null);
    }
  };

  const totalMarketItems = SHOPPING_LIST_INITIAL.length + (household.customItems?.length || 0);
  const checkedMarketCount = Object.keys(household.checkedItems || {}).length;
  const pendingMarketCount = Math.max(0, totalMarketItems - checkedMarketCount);

  return (
    <div className="flex-1 flex flex-col">
      <TopHeader user={currentUser} onLogout={handleLogout} />

      <main className="flex-1 px-3 sm:px-5 py-4 space-y-4">
        {/* Household Overview Header */}
        <div className="bg-gradient-to-tr from-slate-900 via-slate-800 to-brand-950 text-white rounded-3xl p-5 sm:p-6 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-brand-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
              <Home className="w-4 h-4" />
              <span>Ecosistema Compartido</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">{household.householdName}</h2>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              Todos los miembros comparten el recetario, la lista de mercado en tiempo real y el tablero de notas.
            </p>

            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-700/60 text-center">
              <div className="bg-white/10 rounded-2xl p-2.5">
                <span className="block text-lg sm:text-xl font-extrabold text-white">
                  {household.users.length}
                </span>
                <span className="text-xs text-slate-300 font-semibold">Integrantes</span>
              </div>
              <div className="bg-white/10 rounded-2xl p-2.5">
                <span className="block text-lg sm:text-xl font-extrabold text-brand-400">
                  {checkedMarketCount}
                </span>
                <span className="text-xs text-slate-300 font-semibold">Mercado OK</span>
              </div>
              <div className="bg-white/10 rounded-2xl p-2.5">
                <span className="block text-lg sm:text-xl font-extrabold text-warm-400">
                  {household.completedDays.length} / 14
                </span>
                <span className="text-xs text-slate-300 font-semibold">Días Cocinados</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-brand-500/15 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Feedback messages */}
        {successMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-sm font-bold flex items-center gap-2 animate-in fade-in">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

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

        {/* Members List with CREATION & DELETION */}
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

          <p className="text-sm text-slate-600 leading-relaxed">
            Puedes agregar nuevos integrantes o eliminar usuarios que ya no pertenezcan al hogar.
          </p>

          <div className="space-y-3">
            {household.users.map((member) => {
              const isCurrent = currentUser?.id === member.id;
              const canDelete = household.users.length > 1;

              return (
                <div
                  key={member.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
                    isCurrent
                      ? 'bg-brand-50/70 border-brand-300 ring-2 ring-brand-300/60'
                      : 'bg-slate-50 border-slate-200/90 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-11 h-11 rounded-2xl object-cover border border-brand-300 shadow-2xs"
                      />
                    ) : (
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white text-sm font-black ${
                          member.avatarColor || 'bg-brand-600'
                        }`}
                      >
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-extrabold text-slate-900">
                          {member.name}
                        </span>
                        {isCurrent && (
                          <span className="text-xs font-black bg-brand-600 text-white px-2 py-0.5 rounded-full">
                            Tú
                          </span>
                        )}
                        <span className="text-xs font-semibold text-slate-500 capitalize">
                          ({member.role})
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 font-mono mt-0.5">
                        Cédula: {member.cedula}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isCurrent && (
                      <button
                        onClick={() => handleSwitchUser(member)}
                        className="text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-900 bg-white hover:bg-brand-50 border border-slate-300 px-3 py-1.5 rounded-xl shadow-2xs transition-colors"
                      >
                        Ingresar aquí
                      </button>
                    )}

                    {canDelete && (
                      <button
                        onClick={() => setMemberToDelete(member)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        title={`Eliminar a ${member.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tablero de la Nevera (Notas compartidas) */}
        <div className="bg-amber-50/70 rounded-3xl p-5 border border-amber-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StickyNote className="w-5 h-5 text-amber-700" />
              <h3 className="text-base sm:text-lg font-black text-amber-950">
                Tablero de la Nevera
              </h3>
            </div>
            <button
              onClick={() => setIsFridgeNotesOpen(true)}
              className="text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-2 rounded-2xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Pegar Notita
            </button>
          </div>

          <p className="text-sm text-amber-900/90 leading-relaxed">
            Recordatorios del almuerzo, mensajes cariñosos o avisos sobre las porciones congeladas para el hogar.
          </p>

          <div className="space-y-2.5 pt-1">
            {(!household.fridgeNotes || household.fridgeNotes.length === 0) ? (
              <div className="text-center py-6 bg-white/80 rounded-2xl border border-dashed border-amber-300 space-y-1">
                <p className="text-sm text-amber-800 font-medium">
                  No hay notitas pegadas en la nevera todavía.
                </p>
                <button
                  onClick={() => setIsFridgeNotesOpen(true)}
                  className="text-xs sm:text-sm font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl transition-colors"
                >
                  ¡Sé el primero en dejar una!
                </button>
              </div>
            ) : (
              household.fridgeNotes.map((note) => (
                <div
                  key={note.id}
                  className={`p-4 rounded-2xl border shadow-2xs relative ${note.color || 'bg-amber-100 border-amber-200 text-amber-950'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm sm:text-base font-semibold leading-relaxed flex-1">
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
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-black/10 text-xs font-bold opacity-75">
                    <span>✍️ {note.authorName}</span>
                    <span>{note.createdAt}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Confirmation Modal for Member Deletion */}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-5 sm:p-6 animate-in zoom-in-95 duration-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-black text-slate-900">
                ¿Eliminar a {memberToDelete.name}?
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Se eliminará el acceso con cédula <strong className="font-mono">{memberToDelete.cedula}</strong> de este hogar compartido.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setMemberToDelete(null)}
                className="w-1/2 py-2.5 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteMember}
                className="w-1/2 py-2.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Editar Perfil (Nombre y Foto) */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-5 sm:p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-brand-600" />
                Editar Mi Perfil
              </h3>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="py-4 space-y-4 text-sm">
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  {previewPhoto ? (
                    <img
                      src={previewPhoto}
                      alt="Preview"
                      className="w-24 h-24 rounded-3xl object-cover border-2 border-brand-500 shadow-md"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
                      <UserIcon className="w-10 h-10" />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 bg-brand-600 hover:bg-brand-700 text-white p-2.5 rounded-xl shadow-md transition-colors"
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
                  className="text-sm font-bold text-brand-700 hover:underline flex items-center gap-1.5 mt-1"
                >
                  <Upload className="w-4 h-4" />
                  Subir foto desde galería
                </button>

                {previewPhoto && (
                  <button
                    type="button"
                    onClick={() => setPreviewPhoto(null)}
                    className="text-xs text-rose-600 hover:underline mt-1 font-semibold"
                  >
                    Quitar foto
                  </button>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">
                  Tu nombre o apodo
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Ej. Camilo"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-xs"
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
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-5 sm:p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-brand-600" />
                Añadir Integrante al Hogar
              </h3>
              <button
                onClick={() => setIsAddUserOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 mb-4">
              Podrá ingresar desde su teléfono con su Cédula y Contraseña compartiendo este mismo recetario.
            </p>

            <form onSubmit={handleAddMember} className="space-y-3.5 text-sm">
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Rol en el hogar
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as 'admin' | 'miembro')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="miembro">Miembro (Ver y tachar mercado)</option>
                  <option value="admin">Administrador (Gestionar integrantes)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-xs"
                >
                  Registrar Miembro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fridge Notes Modal */}
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
