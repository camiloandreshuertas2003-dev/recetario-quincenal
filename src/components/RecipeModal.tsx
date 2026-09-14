'use client';

import React, { useState } from 'react';
import { Recipe } from '@/types';
import { scaleAmount } from '@/lib/storage';
import { KitchenTimer } from './KitchenTimer';
import {
  X,
  Clock,
  Users,
  Video,
  ExternalLink,
  ShieldAlert,
  UtensilsCrossed,
  Sparkles,
  Flame,
  Coffee,
  PackageCheck,
  CheckCircle2,
  Circle
} from 'lucide-react';

interface RecipeModalProps {
  recipe: Recipe | null;
  servingMultiplier?: number;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  servingMultiplier = 1.0,
  onClose
}) => {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiGeneratedSuccess, setAiGeneratedSuccess] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null);
  const [showTimer, setShowTimer] = useState(false);

  if (!recipe) return null;

  const currentImg = customImageUrl || recipe.imageUrl;
  const scaledPortions = Math.round(recipe.yieldServings * servingMultiplier);

  const toggleIngredient = (name: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleRecreateWithAi = () => {
    setIsAiGenerating(true);
    setAiGeneratedSuccess(false);

    setTimeout(() => {
      const culinaryAngles = [
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=85',
        'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=900&auto=format&fit=crop&q=85',
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=85',
        'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=85'
      ];
      const randomImg = culinaryAngles[Math.floor(Math.random() * culinaryAngles.length)];
      setCustomImageUrl(randomImg);
      setIsAiGenerating(false);
      setAiGeneratedSuccess(true);
    }, 1200);
  };

  const getCategoryLabel = () => {
    if (recipe.category === 'cena') return 'Cena de 4 porciones (Cena + Almuerzo)';
    if (recipe.category === 'almuerzo') return 'Almuerzo Inicial (5 min)';
    return 'Desayuno Rápido y Completo';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg max-h-[94vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
        {/* Recipe Image & Overlay Controls */}
        <div className="relative w-full h-52 sm:h-60 bg-slate-900 shrink-0">
          {currentImg ? (
            <img
              src={currentImg}
              alt={recipe.title}
              className="w-full h-full object-cover brightness-90"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-brand-800 to-amber-700 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white/40" />
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors z-10"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={handleRecreateWithAi}
            disabled={isAiGenerating}
            className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-bold rounded-xl backdrop-blur-md transition-all flex items-center gap-1.5 border border-white/20 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isAiGenerating ? 'Generando...' : 'Recrear foto con IA'}</span>
          </button>

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="bg-brand-600/90 text-white text-xs font-black px-3 py-1 rounded-xl shadow-md border border-white/20">
              {getCategoryLabel()}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 text-white max-w-[70%]">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest block">
              {recipe.highlightTag}
            </span>
            <h2 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-md">
              {recipe.title}
            </h2>
          </div>
        </div>

        {/* Action Header: Yield, Timing & Timer Button */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-600" />
              {recipe.prepTime}
            </span>
            <span className="flex items-center gap-1.5 bg-brand-100 text-brand-950 px-2.5 py-1 rounded-xl">
              <Users className="w-4 h-4 text-brand-700" />
              {recipe.category === 'cena'
                ? 'Rinde 4 porciones: 2 cena hoy + 2 almuerzo mañana'
                : `${scaledPortions} porciones`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTimer(!showTimer)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Flame className="w-4 h-4" />
              <span>{showTimer ? 'Ocultar Timer' : 'Temporizador'}</span>
            </button>
          </div>
        </div>

        {/* Cooking Timer if active */}
        {showTimer && (
          <div className="p-4 bg-slate-950 border-b border-slate-800 animate-in slide-in-from-top-4">
            <KitchenTimer
              initialMinutes={recipe.cookMinutes || 25}
              onClose={() => setShowTimer(false)}
            />
          </div>
        )}

        {/* Modal Body with Scroll */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-800">
          {/* AI Banner feedback if generated */}
          {aiGeneratedSuccess && (
            <div className="p-3.5 rounded-2xl bg-brand-50 border border-brand-200 text-brand-950 text-sm flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Foto culinaria recreada con IA para este plato:</p>
                <p className="text-xs text-brand-800/80 italic mt-0.5">
                  "{recipe.aiPrompt || recipe.title}"
                </p>
              </div>
            </div>
          )}

          {/* Por qué llena / Saciedad */}
          {recipe.whyFilling && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-1">
              <h4 className="font-black text-sm flex items-center gap-2 text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Por qué llena (Aporte de Saciedad)
              </h4>
              <p className="text-sm leading-relaxed font-medium">
                {recipe.whyFilling}
              </p>
            </div>
          )}

          {/* Bebida complementaria recomendada (para desayunos) */}
          {recipe.beveragePairing && (
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 space-y-1">
              <h4 className="font-black text-sm flex items-center gap-2 text-emerald-900">
                <Coffee className="w-4 h-4 text-emerald-600" />
                Bebida Recomendada: {recipe.beveragePairing.name}
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed font-medium">
                {recipe.beveragePairing.description}
              </p>
            </div>
          )}

          {recipe.carbType && (
            <div className="text-sm text-amber-950 font-medium bg-amber-50/90 px-4 py-2.5 rounded-2xl border border-amber-200 flex items-center justify-between">
              <span>🌾 Carbohidrato: <strong className="font-extrabold">{recipe.carbType}</strong></span>
              <span className="text-xs bg-white text-amber-900 font-black px-2.5 py-0.5 rounded-md border border-amber-200">
                Controlado
              </span>
            </div>
          )}

          {/* External video and recipe links */}
          {(recipe.videoUrl || recipe.recipeUrl) && (
            <div className="flex flex-wrap gap-2.5">
              {recipe.videoUrl && (
                <a
                  href={recipe.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2.5 px-3.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-sm font-bold rounded-2xl border border-rose-200 transition-colors shadow-2xs"
                >
                  <Video className="w-4 h-4 text-rose-600" />
                  Ver Video Tutorial
                </a>
              )}
              {recipe.recipeUrl && (
                <a
                  href={recipe.recipeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold rounded-2xl border border-slate-200 transition-colors shadow-2xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  {recipe.recipeSourceName || 'Receta Escrita'}
                </a>
              )}
            </div>
          )}

          {/* Ingredientes con Checkbox interactivo y Escalado dinámico */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm sm:text-base uppercase tracking-wider">
                <UtensilsCrossed className="w-5 h-5 text-brand-600" />
                Ingredientes en crudo ({recipe.category === 'cena' ? '4 porciones' : `${scaledPortions} porciones`})
              </h3>
              <span className="text-xs text-slate-500 font-semibold">Toca para tachar</span>
            </div>

            <div className="grid grid-cols-1 gap-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              {recipe.ingredients.map((ing, i) => {
                const isChecked = !!checkedIngredients[ing.name];
                const displayAmount = scaleAmount(ing.amount, servingMultiplier);

                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => toggleIngredient(ing.name)}
                    className={`w-full flex items-center justify-between py-2 px-3 rounded-xl text-left transition-all ${
                      isChecked
                        ? 'bg-slate-200/70 text-slate-400 line-through'
                        : 'hover:bg-white text-slate-900 bg-white/60 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs font-bold ${
                          isChecked
                            ? 'bg-brand-600 border-brand-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && '✓'}
                      </div>
                      <span className="font-semibold text-sm sm:text-base">{ing.name}</span>
                    </div>
                    <span
                      className={`text-sm font-extrabold ml-2 shrink-0 ${
                        isChecked ? 'text-slate-400' : 'text-brand-800 font-mono'
                      }`}
                    >
                      {displayAmount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preparación paso a paso */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm sm:text-base uppercase tracking-wider">
                <Sparkles className="w-5 h-5 text-amber-600" />
                Paso a paso de cocción
              </h3>
              <span className="text-xs text-slate-500 font-semibold">Toca el paso completado</span>
            </div>

            <div className="space-y-2.5">
              {recipe.steps.map((step, idx) => {
                const isStepDone = !!completedSteps[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isStepDone
                        ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950 opacity-85'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
                        isStepDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {isStepDone ? '✓' : idx + 1}
                    </div>
                    <p
                      className={`text-sm sm:text-base leading-relaxed flex-1 ${
                        isStepDone ? 'line-through text-slate-400' : 'text-slate-800 font-medium'
                      }`}
                    >
                      {step}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tips de empaque y seguridad */}
          {recipe.packingInstructions && (
            <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 space-y-2">
              <h4 className="font-black text-sm flex items-center gap-2 text-amber-900">
                <PackageCheck className="w-5 h-5 text-amber-600" />
                Guía de Empaque y Conservación Segura
              </h4>
              <p className="text-sm leading-relaxed font-medium">
                {recipe.packingInstructions}
              </p>
              <div className="p-2.5 rounded-xl bg-white/70 border border-amber-200/80 text-xs text-amber-900 space-y-1">
                <p><strong>🔥 Calientes juntos:</strong> Arroz, proteína, guiso y tubérculos.</p>
                <p><strong>❄️ Fríos aparte:</strong> Aguacate, ensaladas de repollo o lechuga y limón.</p>
                <p><strong>⏱️ Seguridad (USDA / MinSalud):</strong> Dejar entibiar y refrigerar antes de 2 horas. Recalentar hasta que el centro humee.</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs sm:text-sm text-slate-600 font-bold">
            {Object.values(checkedIngredients).filter(Boolean).length} de {recipe.ingredients.length} ingredientes listos
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-black rounded-2xl shadow-xs transition-colors"
          >
            Listo, cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
