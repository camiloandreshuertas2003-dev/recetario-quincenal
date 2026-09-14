'use client';

import React, { useState, useEffect } from 'react';
import { ChefHat, Sparkles, Utensils, Heart } from 'lucide-react';

interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Show splash for 1.8s then fade out smoothly
    const timer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        setVisible(false);
        onFinish?.();
      }, 400);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div
      onClick={() => {
        setFadingOut(true);
        setTimeout(() => {
          setVisible(false);
          onFinish?.();
        }, 200);
      }}
      className={`fixed inset-0 z-50 bg-gradient-to-b from-slate-900 via-brand-950 to-slate-900 flex flex-col items-center justify-center p-6 text-white cursor-pointer transition-opacity duration-400 select-none ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center max-w-xs text-center">
        {/* Glow effect */}
        <div className="absolute -top-12 w-40 h-40 bg-brand-500/20 rounded-full blur-2xl animate-pulse" />

        {/* Distinctive Chef Icon Badge */}
        <div className="relative mb-5">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-brand-500 via-emerald-600 to-warm-500 p-0.5 shadow-2xl shadow-brand-500/40 flex items-center justify-center transform hover:scale-105 transition-transform animate-bounce duration-1000">
            <div className="w-full h-full bg-slate-900/90 rounded-[22px] flex items-center justify-center relative overflow-hidden">
              <ChefHat className="w-12 h-12 text-brand-400 stroke-[2.2px] drop-shadow-md" />
              <Sparkles className="w-4 h-4 text-warm-400 absolute top-2 right-2 animate-spin duration-3000" />
            </div>
          </div>

          <div className="absolute -bottom-2 -right-2 bg-warm-500 text-slate-950 p-1.5 rounded-full shadow-md">
            <Utensils className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Title and subtitle */}
        <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5 justify-center">
          <span>Recetario Quincenal</span>
        </h1>

        <p className="text-xs text-brand-300 font-semibold tracking-wide uppercase mt-1">
          Cenas que resuelven el almuerzo
        </p>

        <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
          Plan de alimentación colombiano para 2 personas que ahorra tiempo, dinero y esfuerzo.
        </p>

        {/* Loading / Tap hint */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-warm-400 animate-ping delay-150" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping delay-300" />
          </div>
          <span className="text-[10px] text-slate-500 font-medium mt-1">
            Toca en cualquier parte para continuar
          </span>
        </div>
      </div>
    </div>
  );
};
