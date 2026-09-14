'use client';

import React, { useState } from 'react';
import { Recipe } from '@/types';
import {
  X,
  Clock,
  Users,
  Video,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  UtensilsCrossed,
  Sparkles
} from 'lucide-react';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  if (!recipe) return null;

  const toggleIngredient = (name: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
        {/* Modal Header */}
        <div className="relative px-5 pt-5 pb-4 border-b border-slate-100 bg-gradient-to-br from-brand-50/50 via-white to-warm-50/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-white/80 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2 pr-8">
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                recipe.category === 'cena'
                  ? 'bg-brand-100 text-brand-800'
                  : 'bg-warm-100 text-warm-800'
              }`}
            >
              {recipe.category === 'cena' ? 'Cena para Almuerzo' : 'Desayuno Exprés'}
            </span>
            <span className="text-xs bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
              <Users className="w-3 h-3" />
              {recipe.yieldServings} porciones {recipe.category === 'cena' ? '(2 hoy + 2 mañana)' : 'para 2'}
            </span>
            <span className="text-xs bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {recipe.prepTime}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
            {recipe.title}
          </h2>

          {recipe.carbType && (
            <p className="text-xs text-amber-700 font-medium mt-1 bg-amber-50/80 px-2 py-1 rounded-md border border-amber-200/60 inline-block">
              🌾 Carbohidrato: {recipe.carbType}
            </p>
          )}
        </div>

        {/* Modal Body with Scroll */}
        <div className="p-5 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* External video and recipe links */}
          {(recipe.videoUrl || recipe.recipeUrl) && (
            <div className="flex flex-wrap gap-2">
              {recipe.videoUrl && (
                <a
                  href={recipe.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200 transition-colors"
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
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {recipe.recipeSourceName || 'Receta Escrita'}
                </a>
              )}
            </div>
          )}

          {/* Ingredientes con Checkbox interactivo */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm uppercase tracking-wider">
                <UtensilsCrossed className="w-4 h-4 text-brand-600" />
                Ingredientes en crudo
              </h3>
              <span className="text-[11px] text-slate-500">Toca para tachar</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
              {recipe.ingredients.map((ing, i) => {
                const isChecked = !!checkedIngredients[ing.name];
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => toggleIngredient(ing.name)}
                    className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg text-left transition-all ${
                      isChecked
                        ? 'bg-slate-200/60 text-slate-400 line-through'
                        : 'hover:bg-white text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                          isChecked
                            ? 'bg-brand-600 border-brand-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && '✓'}
                      </div>
                      <span className="font-medium text-xs sm:text-sm">{ing.name}</span>
                    </div>
                    <span
                      className={`text-xs font-semibold ml-2 ${
                        isChecked ? 'text-slate-400' : 'text-brand-800 font-mono'
                      }`}
                    >
                      {ing.amount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preparación paso a paso */}
          <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm uppercase tracking-wider mb-2.5">
              <Sparkles className="w-4 h-4 text-warm-600" />
              Paso a paso de cocción
            </h3>

            <div className="space-y-2.5">
              {recipe.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-2xs"
                >
                  <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips de empaque y seguridad alimentaria */}
          {recipe.packingInstructions && (
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-amber-950">
              <h4 className="font-bold text-xs flex items-center gap-1.5 text-amber-900 mb-1">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Seguridad y Empaque para el Almuerzo
              </h4>
              <p className="text-xs leading-relaxed">
                {recipe.packingInstructions}
              </p>
              <p className="text-[11px] text-amber-800/80 mt-1 font-medium">
                Regla USDA/FSIS: Divide de inmediato al terminar de cocinar. Refrigera antes de 2 horas en recipientes poco profundos con tapa.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {Object.values(checkedIngredients).filter(Boolean).length} de {recipe.ingredients.length} ingredientes listos
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Listo, cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
