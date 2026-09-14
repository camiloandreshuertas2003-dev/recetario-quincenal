'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  getCurrentSession,
  getHouseholdState,
  registerNewMember,
  deleteMember,
  setCurrentSession,
  updateUserProfile,
  setHouseholdMembersCount,
  setHouseholdBudget,
  setPlanDurationDays,
  toggleDayCompleted,
  resetMarketChecklist
} from '@/lib/storage';
import { User } from '@/types';
import { BottomNav } from '@/components/BottomNav';
import {
  Users,
  UserPlus,
  DollarSign,
  Calendar,
  Utensils,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Edit3,
  Camera,
  Share2,
  MessageCircle,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Smartphone,
  ChevronRight,
  Check,
  Moon
} from 'lucide-react';

const PROTEIN_OPTIONS = [
  { id: 'pollo', label: 'Pollo y Aves', icon: '🍗' },
  { id: 'res', label: 'Carne de Res', icon: '🥩' },
  { id: 'pescado', label: 'Pescados y Mariscos', icon: '🐟' },
  { id: 'cerdo', label: 'Cerdo', icon: '🥓' },
  { id: 'huevo', label: 'Huevos campesinos', icon: '🥚' },
  { id: 'granos', label: 'Leguminosas y Granos', icon: '🫘' }
];

const KITCHEN_EQUIPMENT = [
  { id: 'olla_presion', label: 'Olla a presión / Pitadora', icon: '🍲' },
  { id: 'airfryer', label: 'Freidora de aire (Airfryer)', icon: '🍟' },
  { id: 'licuadora', label: 'Licuadora tradicional', icon: '🥤' },
  { id: 'horno', label: 'Horno convencional', icon: '🥧' }
];

export default function MasPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [household, setHousehold] = useState(getHouseholdState());

  // Settings State
  const [membersCount, setMembersCount] = useState<number>(household.householdMembersCount || 2);
  const [budget, setBudget] = useState<number>(household.budgetAmount || 320000);
  const [planDays, setPlanDays] = useState<number>(household.planDurationDays || 14);
  const [selectedProteins, setSelectedProteins] = useState<string[]>(['pollo', 'res', 'pescado', 'huevo', 'granos']);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(['licuadora', 'olla_presion']);

  // Member Management State
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [editingMember, setEditingMember] = useState<User | null>(null);
  const [editName, setEditName] = useState('');
  const [editPhoto, setEditPhoto] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshState = () => {
    setCurrentUser(getCurrentSession());
    const state = getHouseholdState();
    setHousehold(state);
    if (state.householdMembersCount) setMembersCount(state.householdMembersCount);
    if (state.budgetAmount) setBudget(state.budgetAmount);
    if (state.planDurationDays) setPlanDays(state.planDurationDays);
  };

  useEffect(() => {
    refreshState();
    const handleStateChange = () => setHousehold(getHouseholdState());
    window.addEventListener('recetario_state_changed', handleStateChange);
    return () => {
      window.removeEventListener('recetario_state_changed', handleStateChange);
    };
  }, []);

  const handleUpdateMembersCount = (count: number) => {
    setMembersCount(count);
    setHouseholdMembersCount(count);
  };

  const handleUpdateBudget = (amount: number) => {
    setBudget(amount);
    setHouseholdBudget(amount);
  };

  const handleUpdatePlanDays = (days: number) => {
    setPlanDays(days);
    setPlanDurationDays(days);
  };

  const toggleProtein = (id: string) => {
    setSelectedProteins((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleEquipment = (id: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    registerNewMember({
      cedula: `member-${Date.now()}`,
      name: newMemberName.trim(),
      role: 'miembro'
    });
    setNewMemberName('');
    setIsAddingMember(false);
    refreshState();
  };

  const handleDeleteMember = (memberId: string, memberName: string) => {
    if (confirm(`¿Seguro que deseas eliminar a ${memberName} del hogar?`)) {
      deleteMember(memberId);
      refreshState();
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (editingMember) {
      updateUserProfile(editingMember.id, {
        name: editName.trim() || editingMember.name,
        photoUrl: editPhoto || editingMember.photoUrl
      });
      setEditingMember(null);
      refreshState();
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8] text-slate-900 pb-28">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3.5">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
              <Users className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <h1 className="text-base font-black text-slate-900 leading-tight">
                Personalización del Hogar
              </h1>
              <p className="text-xs text-slate-500 font-semibold">
                Configuración del menú, integrantes y preferencias
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-3.5 space-y-4">
        {/* ========================================================== */}
        {/* SECCIÓN 1: CONFIGURACIÓN DEL PLAN Y COMENSALES */}
        {/* ========================================================== */}
        <section className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">👥</span>
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
              Comensales y Porciones
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2">
              ¿Para cuántas personas cocinas en casa?
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleUpdateMembersCount(num)}
                  className={`py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex flex-col items-center justify-center ${
                    membersCount === num
                      ? 'bg-brand-600 text-white shadow-xs scale-102'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{num === 5 ? '5+' : num}</span>
                  <span className="text-[10px] font-normal opacity-80">
                    {num === 1 ? 'persona' : 'personas'}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-brand-800 bg-brand-50/80 p-2.5 rounded-xl border border-brand-200 mt-2 font-medium">
              💡 La cena rinde <strong>{membersCount * 2} porciones</strong>: {membersCount} para cenar rico y {membersCount} para llevar al almuerzo de mañana.
            </p>
          </div>

          {/* Duración del ciclo */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-500 mb-2">
              Duración del ciclo alimentario:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[7, 14, 15].map((d) => (
                <button
                  key={d}
                  onClick={() => handleUpdatePlanDays(d)}
                  className={`py-2.5 rounded-2xl text-xs font-black transition-all ${
                    planDays === d
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {d} Días ({d === 7 ? '1 Semana' : 'Quincenal'})
                </button>
              ))}
            </div>
          </div>

          {/* Presupuesto quincenal aproximado */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-500 mb-2">
              Presupuesto estimado para mercado quincenal ($ COP):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
              {[250000, 320000, 400000, 500000].map((val) => (
                <button
                  key={val}
                  onClick={() => handleUpdateBudget(val)}
                  className={`py-2 rounded-xl text-xs font-black transition-all ${
                    budget === val
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  ${(val / 1000).toFixed(0)}k COP
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SECCIÓN 2: PREFERENCIAS DE PROTEÍNAS Y EQUIPOS */}
        {/* ========================================================== */}
        <section className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🥩</span>
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
              Proteínas y Equipos de Cocina
            </h2>
          </div>

          {/* Proteínas */}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2">
              Proteínas preferidas en tus menús:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PROTEIN_OPTIONS.map((prot) => {
                const isSelected = selectedProteins.includes(prot.id);
                return (
                  <button
                    key={prot.id}
                    onClick={() => toggleProtein(prot.id)}
                    className={`p-2.5 rounded-2xl text-left border transition-all flex items-center justify-between text-xs font-bold ${
                      isSelected
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <span>{prot.icon}</span>
                      <span>{prot.label}</span>
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Equipos */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-500 mb-2">
              Equipos disponibles en tu cocina:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {KITCHEN_EQUIPMENT.map((eq) => {
                const isSelected = selectedEquipment.includes(eq.id);
                return (
                  <button
                    key={eq.id}
                    onClick={() => toggleEquipment(eq.id)}
                    className={`p-2.5 rounded-2xl text-left border transition-all flex items-center justify-between text-xs font-bold ${
                      isSelected
                        ? 'bg-brand-50/80 border-brand-300 text-brand-950'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <span>{eq.icon}</span>
                      <span>{eq.label}</span>
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-brand-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SECCIÓN 3: GESTIÓN DE INTEGRANTES DEL HOGAR */}
        {/* ========================================================== */}
        <section className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏠</span>
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
                Integrantes del Hogar ({household.users?.length || 1})
              </h2>
            </div>

            <button
              onClick={() => setIsAddingMember(true)}
              className="text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-xl border border-brand-200 flex items-center gap-1 transition-colors"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Añadir</span>
            </button>
          </div>

          {/* Members List */}
          <div className="space-y-2">
            {(household.users || []).map((m) => {
              const isCurrent = currentUser?.id === m.id;
              return (
                <div
                  key={m.id}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                    isCurrent
                      ? 'bg-brand-50/70 border-brand-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 overflow-hidden shrink-0">
                      {m.photoUrl ? (
                        <img src={m.photoUrl} alt={m.name} className="w-full h-full object-cover" />
                      ) : (
                        m.name.charAt(0).toUpperCase()
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
                        <span>{m.name}</span>
                        {isCurrent && (
                          <span className="text-[10px] font-black uppercase text-brand-700 bg-white px-2 py-0.5 rounded-md border border-brand-200">
                            Activo
                          </span>
                        )}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {m.role === 'admin' ? 'Administrador' : 'Comensal'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {!isCurrent && (
                      <button
                        onClick={() => {
                          setCurrentSession(m);
                          refreshState();
                        }}
                        className="px-2.5 py-1 text-xs font-bold text-brand-700 hover:bg-brand-100 rounded-lg transition-colors"
                      >
                        Activar
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setEditingMember(m);
                        setEditName(m.name);
                        setEditPhoto(m.photoUrl || '');
                      }}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
                      title="Editar perfil"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    {(household.users?.length || 1) > 1 && (
                      <button
                        onClick={() => handleDeleteMember(m.id, m.name)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Eliminar del hogar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add member form */}
          {isAddingMember && (
            <form onSubmit={handleAddMemberSubmit} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 animate-in fade-in">
              <label className="block text-xs font-bold text-slate-700">
                Nombre del nuevo integrante:
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Laura, Papá, Roommate"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              />
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingMember(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-brand-600 text-white font-black text-xs shadow-xs"
                >
                  Guardar
                </button>
              </div>
            </form>
          )}
        </section>

        {/* ========================================================== */}
        {/* SECCIÓN 4: INFORMACIÓN DE SEGURIDAD ALIMENTARIA */}
        {/* ========================================================== */}
        <section className="p-4 rounded-3xl bg-blue-50/70 border border-blue-200 text-blue-950 space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <h3 className="text-xs font-black uppercase tracking-wider text-blue-900">
              Cadena de Frío y Conservación (MinSalud / USDA)
            </h3>
          </div>
          <p className="text-xs text-blue-900/90 leading-relaxed font-medium">
            1. <strong>Regla de 2 horas:</strong> Nunca dejes enfriar la comida sobre el mesón por más de 2 horas. Pásala a refrigeración tan pronto pierda el vapor intenso.
          </p>
          <p className="text-xs text-blue-900/90 leading-relaxed font-medium">
            2. <strong>Descongelación segura:</strong> Siempre en nevera o microondas; jamás en agua tibia ni al aire libre.
          </p>
        </section>
      </main>

      {/* Edit Profile Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95">
            <h3 className="text-base font-black text-slate-900">
              Editar Perfil de {editingMember.name}
            </h3>

            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-brand-500 overflow-hidden flex items-center justify-center">
                {editPhoto ? (
                  <img src={editPhoto} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl font-black text-slate-400">{editingMember.name.charAt(0)}</span>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-brand-700 hover:underline flex items-center gap-1"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Cambiar foto</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nombre:</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="flex-1 py-2 rounded-xl bg-brand-600 text-white font-black text-xs shadow-xs"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
