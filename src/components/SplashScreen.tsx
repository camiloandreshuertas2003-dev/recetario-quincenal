'use client';

import React, { useState, useEffect } from 'react';
import { ChefHat, Sparkles, Utensils, HeartHandshake } from 'lucide-react';

interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
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
      className={`fixed inset-0 z-50 bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 flex flex-col items-center justify-center p-6 text-white cursor-pointer transition-opacity duration-400 select-none ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center max-w-xs text-center">
        {/* Glow effect */}
        <div className="absolute -top-10 w-44 h-44 bg-brand-500/20 rounded-full blur-3xl animate-pulse" />

        {/* Distinctive Chef Icon Badge */}
        <div className="relative mb-5">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-brand-500 via-emerald-600 to-warm-400 p-1 shadow-2xl shadow-brand-500/40 flex items-center justify-center transform hover:scale-105 transition-transform animate-bounce duration-1000">
            <div className="w-full h-full bg-slate-900/90 rounded-[20px] flex items-center justify-center relative overflow-hidden">
              <ChefHat className="w-12 h-12 text-brand-400 stroke-[2.2px] drop-shadow-lg" />
              <Sparkles className="w-4 h-4 text-warm-300 absolute top-2 right-2 animate-spin duration-3000" />
            </div>
          </div>

          <div className="absolute -bottom-1 -right-1 bg-warm-500 text-slate-950 p-1.5 rounded-full shadow-md">
            <Utensils className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2 justify-center">
          <span>Nuestro menú</span>
        </h1>

        <p className="text-xs text-brand-300 font-bold tracking-wider uppercase mt-1">
          Cenas que resuelven el almuerzo
        </p>

        <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed">
          Plan de alimentación colombiano para 2 personas que ahorra tiempo, dinero y esfuerzo.
        </p>

        {/* Progress dots */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-warm-400 animate-ping delay-150" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping delay-300" />
          </div>
          <span className="text-[10px] text-slate-500 font-medium">
            Toca en la pantalla para comenzar
          </span>
        </div>
      </div>
    </div>
  );
};
