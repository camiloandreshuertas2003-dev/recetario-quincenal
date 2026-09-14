'use client';

import React from 'react';
import Link from 'next/link';
import { User } from '@/types';
import { Sparkles, LogOut, ShieldCheck, HeartHandshake } from 'lucide-react';

interface TopHeaderProps {
  user: User | null;
  onLogout?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 shadow-xs">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-warm-500 flex items-center justify-center text-white shadow-sm shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-none">
              Recetario 15 Días
            </h1>
            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
              <span>Cenas 4p</span>
              <span>•</span>
              <span className="text-brand-700">Almuerzo listo</span>
            </p>
          </div>
        </Link>

        {user ? (
          <div className="flex items-center gap-2">
            <Link
              href="/hogar"
              className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-full transition-colors"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  user.avatarColor || 'bg-brand-600'
                }`}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-semibold text-slate-700 max-w-[80px] truncate">
                {user.name}
              </span>
              {user.role === 'admin' && (
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              )}
            </Link>

            {onLogout && (
              <button
                onClick={onLogout}
                title="Cerrar sesión"
                className="text-slate-400 hover:text-rose-600 p-1.5 rounded-full hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="text-xs font-semibold bg-brand-600 text-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-brand-700 transition-colors flex items-center gap-1"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
};
