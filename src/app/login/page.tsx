'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  loginUser,
  getCurrentSession,
  registerNewMember,
  getHouseholdState
} from '@/lib/storage';
import {
  IdCard,
  Lock,
  ArrowRight,
  ShieldCheck,
  UserPlus,
  Sparkles,
  CheckCircle2,
  Users
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      router.push('/');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = loginUser(cedula, password);
    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Credenciales inválidas.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = registerNewMember({
      cedula,
      name,
      password,
      role: 'miembro'
    });

    if (result.success && result.user) {
      setSuccessMsg('¡Usuario registrado exitosamente! Iniciando sesión...');
      setTimeout(() => {
        loginUser(cedula, password);
        router.push('/');
      }, 800);
    } else {
      setError(result.error || 'Error al registrar.');
    }
  };

  const handleQuickLogin = (quickCedula: string, quickPass: string) => {
    setCedula(quickCedula);
    setPassword(quickPass);
    setError(null);
    const result = loginUser(quickCedula, quickPass);
    if (result.success) {
      router.push('/');
    }
  };

  const household = getHouseholdState();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex w-14 h-14 rounded-3xl bg-gradient-to-tr from-brand-600 to-warm-500 items-center justify-center text-white shadow-lg shadow-brand-500/20 mb-3">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Nuestro menú
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1 max-w-xs mx-auto">
          Cenas que resuelven el almuerzo del día siguiente para 2 personas
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/80">
        <div className="flex border-b border-slate-100 pb-3 mb-5">
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(false);
              setError(null);
            }}
            className={`flex-1 text-center py-2 text-xs font-bold transition-colors ${
              !isRegisterMode
                ? 'text-brand-700 border-b-2 border-brand-600'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(true);
              setError(null);
            }}
            className={`flex-1 text-center py-2 text-xs font-bold transition-colors ${
              isRegisterMode
                ? 'text-brand-700 border-b-2 border-brand-600'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Nuevo Integrante
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={isRegisterMode ? handleRegister : handleLogin} className="space-y-4">
          {isRegisterMode && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nombre completo o apodo
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Camila"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Número de Cédula
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <IdCard className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                placeholder="Ej. 1020304050"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-600/20 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {isRegisterMode ? (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Registrarme en el Hogar</span>
              </>
            ) : (
              <>
                <span>Ingresar al Ecosistema</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Quick Access */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mb-2.5 uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Acceso Rápido de Demostración</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {household.users.slice(0, 2).map((demoUser) => (
              <button
                key={demoUser.id}
                type="button"
                onClick={() => handleQuickLogin(demoUser.cedula, demoUser.password || '123')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-brand-400 bg-slate-50/70 hover:bg-brand-50/40 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${
                      demoUser.avatarColor || 'bg-brand-600'
                    }`}
                  >
                    {demoUser.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-brand-900 truncate">
                    {demoUser.name}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">
                  CC: {demoUser.cedula}
                </div>
                <div className="text-[9px] text-brand-700 font-semibold mt-0.5">
                  1 toque para entrar
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-6 text-[11px] text-slate-500">
        <p className="flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
          <span>Ecosistema compartido: misma lista de mercado y menú sincronizado</span>
        </p>
      </div>
    </div>
  );
}
