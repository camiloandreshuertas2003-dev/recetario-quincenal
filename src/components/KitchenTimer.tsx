'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Bell, X, Flame, ChevronUp, ChevronDown } from 'lucide-react';

interface KitchenTimerProps {
  initialMinutes?: number;
  onClose?: () => void;
}

export const KitchenTimer: React.FC<KitchenTimerProps> = ({
  initialMinutes = 25,
  onClose
}) => {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [remaining, setRemaining] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && remaining > 0) {
      interval = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            // Trigger haptic vibration if supported
            if (typeof window !== 'undefined' && 'vibrate' in navigator) {
              try {
                navigator.vibrate([200, 100, 200, 100, 400]);
              } catch {}
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, remaining]);

  const setPresetMinutes = (mins: number) => {
    setIsRunning(false);
    setIsFinished(false);
    setTotalSeconds(mins * 60);
    setRemaining(mins * 60);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setRemaining(totalSeconds);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const progressPercent = totalSeconds > 0 ? ((totalSeconds - remaining) / totalSeconds) * 100 : 0;

  if (isMinimized) {
    return (
      <div
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-20 right-4 z-40 bg-slate-900 text-white px-3.5 py-2 rounded-2xl shadow-xl border border-brand-500/50 flex items-center gap-2 cursor-pointer animate-pulse"
      >
        <Flame className="w-4 h-4 text-warm-400" />
        <span className="font-mono font-bold text-xs">{formatTime(remaining)}</span>
        <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-4 shadow-xl border border-slate-800 relative overflow-hidden">
      {/* Background glow when finished */}
      {isFinished && (
        <div className="absolute inset-0 bg-brand-600/30 animate-pulse pointer-events-none" />
      )}

      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-warm-500/20 text-warm-400 flex items-center justify-center">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white leading-tight">
              Temporizador de Cocina
            </h4>
            <p className="text-[10px] text-slate-400">Control de cocción en vivo</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 text-slate-400 hover:text-white rounded-lg"
            title="Minimizar"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-center py-2">
        <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white drop-shadow-md">
          {formatTime(remaining)}
        </div>

        {isFinished && (
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-brand-400 mt-1 animate-bounce">
            <Bell className="w-4 h-4" />
            <span>¡Tiempo cumplido! Tu comida está en su punto</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden my-3">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-warm-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 my-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all ${
            isRunning
              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
              : 'bg-brand-600 hover:bg-brand-500 text-white'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Iniciar</span>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
          title="Reiniciar temporizador"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Presets */}
      <div className="grid grid-cols-4 gap-1.5 mt-3 pt-2.5 border-t border-slate-800">
        {[5, 15, 25, 40].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setPresetMinutes(m)}
            className={`py-1 rounded-lg text-[10px] font-bold border transition-colors ${
              totalSeconds === m * 60
                ? 'bg-brand-600/30 border-brand-500 text-brand-300'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            {m} min
          </button>
        ))}
      </div>
    </div>
  );
};
