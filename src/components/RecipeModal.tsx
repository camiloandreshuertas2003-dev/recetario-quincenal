'use client';

import React, { useState } from 'react';
import { Recipe } from '@/types';
import {
  scaleAmount,
  toggleIngredientHave,
  isIngredientOwned
} from '@/lib/storage';
import { KitchenTimer } from './KitchenTimer';
import {
  X,
  Clock,
  Users,
  Flame,
  PackageCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Check
} from 'lucide-react';

interface RecipeModalProps {
  recipe: Recipe | null;
  servingMultiplier?: number;
  onClose: () => void;
  onStartCooking?: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  servingMultiplier = 1.0,
  onClose,
  onStartCooking
}) => {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [showTimer, setShowTimer] = useState(false);

  if (!recipe) return null;

  const currentImg = recipe.imageUrl;
  const scaledPortions = Math.round(recipe.yieldServings * servingMultiplier);

  const toggleChecked = (name: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleToggleOwned = (e: React.MouseEvent, ingName: string) => {
    e.stopPropagation();
    toggleIngredientHave(ingName);
    // Force re-render
    setCheckedIngredients((prev) => ({ ...prev }));
  };

  const isCena = recipe.category === 'cena';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg max-h-[92vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
        
        {/* Hero Photo & Top Controls */}
        <div className="relative w-full h-52 sm:h-60 bg-slate-900 shrink-0">
          {currentImg ? (
            <img
              src={currentImg}
              alt={recipe.title}
              className="w-full h-full object-cover brightness-95"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-brand-800 to-amber-700 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white/40" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all z-10"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge over photo */}
          <div className="absolute bottom-3.5 left-4 right-4 text-white">
            <span className="text-[10px] font-black uppercase tracking-wider bg-brand-600/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-white inline-block mb-1.5 shadow-xs">
              {isCena ? 'Cena Quincenal • 4 Porciones' : 'Preparación Rápida'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-sm">
              {recipe.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* 4 Portions Breakdown Badge (Screen 3 Reference) */}
          {isCena ? (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-brand-50 to-emerald-50 border border-brand-200/90 text-brand-950 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-xl">🍱</span>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-brand-800">
                    Regla de 4 Porciones
                  </h3>
                  <p className="text-xs font-bold text-slate-700">
                    2 porciones para cenar rico hoy + 2 para el almuerzo de mañana
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-brand-700 bg-white px-2.5 py-1 rounded-xl border border-brand-200 shrink-0">
                4 porc.
              </span>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-center justify-between text-xs font-bold">
              <span>{recipe.title}</span>
              <span className="bg-white px-2 py-0.5 rounded-md border border-amber-200">
                {scaledPortions} {scaledPortions === 1 ? 'porción' : 'porciones'}
              </span>
            </div>
          )}

          {/* Quick Metrics (Time, Protein, Carb) */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Tiempo</span>
              <span className="text-xs font-black text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-brand-600" />
                {recipe.prepTime || '35 min'}
              </span>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Proteína</span>
              <span className="text-xs font-black text-slate-800 capitalize truncate mt-0.5 block">
                {recipe.proteinType || 'Variada'}
              </span>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Dificultad</span>
              <span className="text-xs font-black text-emerald-700 capitalize mt-0.5 block">
                Fácil
              </span>
            </div>
          </div>

          {/* Raw Ingredients with [✓ Tengo] Button */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <span>Ingredientes Exactos ({recipe.ingredients.length})</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-semibold">
                Marca [Tengo] para descontar de compras
              </span>
            </div>

            <div className="space-y-1.5">
              {recipe.ingredients.map((ing, idx) => {
                const isOwned = isIngredientOwned(ing.name);
                const isChecked = !!checkedIngredients[ing.name];
                const displayAmount = scaleAmount(ing.amount, servingMultiplier);

                return (
                  <div
                    key={idx}
                    onClick={() => toggleChecked(ing.name)}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      isOwned
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : isChecked
                        ? 'bg-slate-50 border-slate-200 opacity-60'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center text-xs shrink-0 transition-all ${
                          isChecked
                            ? 'bg-brand-600 border-brand-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && '✓'}
                      </div>
                      <div className="truncate">
                        <span className={`text-xs sm:text-sm font-bold block truncate ${isChecked ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {ing.name}
                        </span>
                        {ing.note && (
                          <span className="text-[10px] text-slate-500 font-medium block">
                            {ing.note}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-xs font-black font-mono text-slate-700">
                        {displayAmount}
                      </span>

                      {/* [✓ Tengo] Button */}
                      <button
                        onClick={(e) => handleToggleOwned(e, ing.name)}
                        className={`text-[10px] font-black px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 ${
                          isOwned
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 border border-slate-200'
                        }`}
                        title="Marcar si ya lo tienes en tu cocina"
                      >
                        {isOwned ? (
                          <>
                            <Check className="w-3 h-3 text-white" />
                            <span>Tengo</span>
                          </>
                        ) : (
                          <span>+ Tengo</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Steps Preview */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <span>Resumen de preparación ({recipe.steps.length} pasos)</span>
            </h3>

            <div className="space-y-2">
              {recipe.steps.slice(0, 3).map((step, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-200 font-black text-slate-800 flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed font-medium">{step}</p>
                </div>
              ))}
              {recipe.steps.length > 3 && (
                <p className="text-center text-[11px] font-bold text-slate-500">
                  + {recipe.steps.length - 3} pasos más en el modo de cocción
                </p>
              )}
            </div>
          </div>

          {/* Empaque y conservación */}
          {recipe.packingInstructions && (
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
              <strong className="block font-black text-amber-900">
                📦 Empaque hermético recomendado:
              </strong>
              <p className="font-medium text-slate-700 leading-relaxed">
                {recipe.packingInstructions}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer / Sticky CTA (Screen 3 Siguiente: Paso a paso) */}
        <div className="p-3.5 border-t border-slate-200 bg-white flex items-center gap-2">
          {onStartCooking ? (
            <button
              onClick={onStartCooking}
              className="flex-1 py-3 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-98 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>Siguiente: Paso a paso de cocción</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black text-xs sm:text-sm shadow-xs transition-colors"
            >
              Entendido, cerrar
            </button>
          )}

          <button
            onClick={onClose}
            className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
