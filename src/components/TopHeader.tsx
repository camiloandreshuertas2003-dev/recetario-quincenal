'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, FridgeNote } from '@/types';
import {
  Sparkles,
  LogOut,
  ShieldCheck,
  HeartHandshake,
  Download,
  Flame,
  StickyNote,
  Users
} from 'lucide-react';
import { PwaInstallBanner } from './PwaInstallBanner';
import { KitchenTimer } from './KitchenTimer';
import { FridgeNotesModal } from './FridgeNotesModal';
import { setServingMultiplier, getHouseholdState } from '@/lib/storage';

interface TopHeaderProps {
  user?: User | null;
  servingMultiplier?: number;
  onLogout?: () => void;
  onRefresh?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  user = null,
  servingMultiplier = 1.0,
  onLogout,
  onRefresh
}) => {
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);

  const household = getHouseholdState();

  const handleToggleMultiplier = () => {
    let next = 1.0;
    if (servingMultiplier === 1.0) next = 0.5; // 2 personas
    else if (servingMultiplier === 0.5) next = 1.5; // 6 personas
    else next = 1.0; // 4 personas estándar

    setServingMultiplier(next);
    onRefresh?.();
  };

  const getMultiplierLabel = () => {
    if (servingMultiplier === 0.5) return '2p';
    if (servingMultiplier === 1.5) return '6p';
    return '4p';
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 shadow-2xs">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {/* Logo & App Name */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/icon-192.png"
              alt="Nuestro menú"
              className="w-8 h-8 rounded-xl object-cover shadow-xs border border-slate-200/80 group-hover:scale-105 transition-transform"
            />
            <div>
              <h1 className="text-base font-black text-slate-900 tracking-tight leading-none">
                Nuestro menú
              </h1>
              <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                <span className="text-brand-700 font-bold">Cenas 4p</span>
                <span>•</span>
                <span>Almuerzo listo</span>
              </p>
            </div>
          </Link>

          {/* Action Tools */}
          <div className="flex items-center gap-1">
            {/* Serving Multiplier Pill */}
            <button
              onClick={handleToggleMultiplier}
              className="px-2 py-1 bg-slate-100 hover:bg-brand-50 hover:text-brand-800 text-slate-700 rounded-lg text-[10px] font-extrabold transition-colors border border-slate-200 flex items-center gap-1"
              title="Ajustar porciones (2p, 4p o 6p)"
            >
              <Users className="w-3 h-3 text-brand-600" />
              <span>{getMultiplierLabel()}</span>
            </button>

            {/* Quick Timer Button */}
            <button
              onClick={() => setShowTimerModal(!showTimerModal)}
              className="p-1.5 text-slate-500 hover:text-warm-600 bg-slate-100 hover:bg-warm-50 rounded-lg transition-colors"
              title="Temporizador de cocina"
            >
              <Flame className="w-4 h-4" />
            </button>

            {/* Quick Fridge Notes Button */}
            <button
              onClick={() => setShowNotesModal(true)}
              className="p-1.5 text-slate-500 hover:text-amber-600 bg-slate-100 hover:bg-amber-50 rounded-lg transition-colors relative"
              title="Notas de la nevera"
            >
              <StickyNote className="w-4 h-4" />
              {(household.fridgeNotes?.length || 0) > 0 && (
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full absolute top-1 right-1" />
              )}
            </button>

            {/* PWA Download Button */}
            <button
              onClick={() => setShowInstallModal(true)}
              title="Descargar app en celular"
              className="p-1.5 text-slate-500 hover:text-brand-600 bg-slate-100 hover:bg-brand-50 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* User Profile Avatar */}
            {user ? (
              <div className="flex items-center gap-1 ml-0.5">
                <Link
                  href="/hogar"
                  className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 p-0.5 pr-2 rounded-full transition-colors"
                >
                  {user.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover border border-brand-400"
                    />
                  ) : (
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold ${
                        user.avatarColor || 'bg-brand-600'
                      }`}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-bold text-slate-800 max-w-[55px] truncate">
                    {user.name}
                  </span>
                </Link>

                {onLogout && (
                  <button
                    onClick={onLogout}
                    title="Cerrar sesión"
                    className="text-slate-400 hover:text-rose-600 p-1 rounded-full hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-xs font-bold bg-brand-600 text-white px-2.5 py-1 rounded-lg hover:bg-brand-700 transition-colors flex items-center gap-1"
              >
                <HeartHandshake className="w-3 h-3" />
                Entrar
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Floating Kitchen Timer Drawer if open */}
      {showTimerModal && (
        <div className="px-4 py-2 max-w-md mx-auto">
          <KitchenTimer onClose={() => setShowTimerModal(false)} />
        </div>
      )}

      {/* Fridge Notes Modal */}
      <FridgeNotesModal
        isOpen={showNotesModal}
        notes={household.fridgeNotes || []}
        currentUserName={user?.name || 'Hogar'}
        onClose={() => setShowNotesModal(false)}
        onUpdateNotes={() => onRefresh?.()}
      />

      {/* PWA Install Guide */}
      <PwaInstallBanner
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />
    </>
  );
};
