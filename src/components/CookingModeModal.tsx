'use client';

import React, { useState, useEffect } from 'react';
import { Recipe } from '@/types';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  PackageCheck,
  Video,
  ShieldCheck,
  Utensils,
  Flame,
  ChevronDown,
  ChevronUp,
  Download
} from 'lucide-react';
import { exportRecipeToPdf } from '@/lib/pdfExport';

interface CookingModeModalProps {
  recipe: Recipe;
  onClose: () => void;
  onFinish?: () => void;
}

export const CookingModeModal: React.FC<CookingModeModalProps> = ({
  recipe,
  onClose,
  onFinish
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
  
  // Timer state
  const defaultMinutes = 5;
  const [secondsLeft, setSecondsLeft] = useState(defaultMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Total steps = recipe steps + 1 final packing & reheating step
  const totalSteps = recipe.steps.length + 1;
  const isPackingStep = currentStepIndex === recipe.steps.length;

  // Sound/Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([200, 100, 200, 100, 300]);
        } catch {}
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsLeft]);

  const handleResetTimer = (mins: number = 5) => {
    setIsTimerRunning(false);
    setSecondsLeft(mins * 60);
  };

  const formatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      handleResetTimer(5);
    } else {
      onFinish?.();
      onClose();
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      handleResetTimer(5);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg h-[95vh] sm:h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
        
        {/* Top Header Bar */}
        <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between shadow-2xs shrink-0">
          <button
            onClick={currentStepIndex > 0 ? handlePrevStep : onClose}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-2xl transition-colors"
          >
            {currentStepIndex > 0 ? <ChevronLeft className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>

          <div className="text-center flex-1 px-2">
            <h3 className="text-sm sm:text-base font-black text-slate-900 truncate">
              {recipe.title}
            </h3>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <span className="text-xs font-bold text-brand-700">
                {isPackingStep ? 'Empaque final' : `Paso ${currentStepIndex + 1} de ${totalSteps}`}
              </span>
              {/* Progress dots */}
              <div className="flex items-center gap-1 ml-1.5">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentStepIndex
                        ? 'w-4 bg-brand-600'
                        : i < currentStepIndex
                        ? 'w-1.5 bg-brand-400'
                        : 'w-1.5 bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => exportRecipeToPdf(recipe)}
              className="px-2.5 py-1.5 text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-xl transition-colors flex items-center gap-1 font-bold text-xs border border-brand-200"
              title="Descargar receta en PDF"
            >
              <Download className="w-3.5 h-3.5 text-brand-600" />
              <span className="hidden sm:inline">PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-2xl"
              aria-label="Cerrar modo cocina"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* STEP CONTENT (When not on packing step) */}
          {!isPackingStep ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Step Header */}
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-2xl bg-brand-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                  {currentStepIndex + 1}
                </span>
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                    {recipe.steps[currentStepIndex]}
                  </h4>
                </div>
              </div>

              {/* Recipe Hero Photo */}
              <div className="relative h-44 sm:h-52 rounded-3xl overflow-hidden bg-slate-900 shadow-xs">
                <img
                  src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-xl border border-white/20">
                  {recipe.highlightTag || 'Paso guiado'}
                </span>
              </div>

              {/* Big Interactive Kitchen Timer Widget */}
              <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-500" />
                    Temporizador de cocción
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleResetTimer(2)}
                      className="px-2 py-0.5 rounded-lg text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100"
                    >
                      2 min
                    </button>
                    <button
                      onClick={() => handleResetTimer(5)}
                      className="px-2 py-0.5 rounded-lg text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100"
                    >
                      5 min
                    </button>
                    <button
                      onClick={() => handleResetTimer(10)}
                      className="px-2 py-0.5 rounded-lg text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100"
                    >
                      10 min
                    </button>
                  </div>
                </div>

                <div className="text-center py-1">
                  <span className="font-mono text-4xl sm:text-5xl font-black text-slate-900 tracking-wider">
                    {formatTime(secondsLeft)}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`flex-1 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xs transition-all ${
                      isTimerRunning
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-brand-600 hover:bg-brand-700 text-white'
                    }`}
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>PAUSAR</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>INICIAR TEMPORIZADOR</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleResetTimer(5)}
                    className="p-3 bg-white hover:bg-slate-100 text-slate-700 rounded-2xl border border-slate-200 shadow-2xs transition-colors"
                    title="Reiniciar a 5 min"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chef / Saving Tip */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950 font-medium leading-relaxed flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Consejo de cocina:</strong> Ajusta el fuego a medio-bajo y tapa la sartén u olla para concentrar los jugos y reducir el tiempo de cocción.
                </span>
              </div>

              {/* Collapsible Ingredients sheet */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setIsIngredientsOpen(!isIngredientsOpen)}
                  className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 text-left flex items-center justify-between text-xs sm:text-sm font-black text-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-brand-600" />
                    Consultar Ingredientes ({recipe.ingredients.length})
                  </span>
                  {isIngredientsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isIngredientsOpen && (
                  <div className="p-3 bg-white space-y-1.5 border-t border-slate-100 text-xs sm:text-sm">
                    {recipe.ingredients.map((ing, idx) => (
                      <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
                        <span className="text-slate-700 font-semibold">{ing.name}</span>
                        <span className="font-bold text-brand-800 font-mono">{ing.amount}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* FINAL STEP: EMPAQUE Y RECALENTADO (Screen 5 in reference) */
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Empaca para mañana card */}
              <div className="p-5 rounded-3xl bg-brand-50 border border-brand-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-brand-800 bg-white px-3 py-1 rounded-xl shadow-2xs flex items-center gap-1.5">
                    <PackageCheck className="w-4 h-4 text-brand-600" />
                    Empaca para mañana
                  </span>
                  <span className="text-xs font-black text-brand-900 bg-brand-200/80 px-2.5 py-0.5 rounded-lg">
                    2 porciones
                  </span>
                </div>

                <div className="space-y-2 pt-1 text-xs sm:text-sm font-semibold text-brand-950">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs">✓</div>
                    <span>Usa recipientes de vidrio o herméticos libres de BPA.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs">✓</div>
                    <span>Deja entibiar y etiqueta con la fecha de hoy.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs">✓</div>
                    <span>Refrigera en la nevera antes de 2 horas tras la cocción.</span>
                  </div>
                </div>

                {/* Photo of packed containers */}
                <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-900 shadow-xs mt-2">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"
                    alt="Empaque de almuerzo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                    <span className="text-xs font-black text-white bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                      2 almuerzos listos para mañana en el trabajo
                    </span>
                  </div>
                </div>
              </div>

              {/* Guía de Recalentado */}
              <div className="p-4 rounded-3xl bg-blue-50/80 border border-blue-200 text-blue-950 space-y-2.5">
                <h4 className="font-black text-sm flex items-center gap-2 text-blue-900">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Cómo recalentar mañana con seguridad
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
                  <div className="p-2.5 rounded-xl bg-white border border-blue-200 flex items-center gap-2">
                    <span className="text-lg">📟</span>
                    <div>
                      <span className="block text-slate-500 text-[10px]">Microondas</span>
                      <span>2–3 min tapado</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-blue-200 flex items-center gap-2">
                    <span className="text-lg">♨️</span>
                    <div>
                      <span className="block text-slate-500 text-[10px]">Estufa u Horno</span>
                      <span>10 min a 180°C</span>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-blue-800/80 italic">
                  Recalienta siempre hasta que el centro esté muy caliente (74 °C según USDA).
                </p>
              </div>

              {/* Video tutorial if available */}
              {recipe.videoUrl && (
                <a
                  href={recipe.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-rose-200 transition-colors"
                >
                  <Video className="w-4 h-4 text-rose-600" />
                  <span>Ver video de la receta en YouTube</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Fixed Bottom Action Bar */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
          {currentStepIndex > 0 && (
            <button
              onClick={handlePrevStep}
              className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors"
            >
              Anterior
            </button>
          )}

          <button
            onClick={handleNextStep}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
          >
            <span>
              {isPackingStep
                ? '¡Listo! Marcar como empacado y terminar'
                : 'Siguiente paso →'}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
