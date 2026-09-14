'use client';

import React, { useState } from 'react';
import { Recipe } from '@/types';
import { ALL_RECIPES } from '@/data/recipesData';
import { X, Check, RefreshCw, Sparkles, Clock, Users, Flame } from 'lucide-react';

interface MealSwapModalProps {
  dayNumber: number;
  currentRecipeId: string;
  onSelectNewRecipe: (recipeId: string) => void;
  onClose: () => void;
}

export const MealSwapModal: React.FC<MealSwapModalProps> = ({
  dayNumber,
  currentRecipeId,
  onSelectNewRecipe,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  // Filter dinner recipes
  const dinnerRecipes = ALL_RECIPES.filter((r) => r.category === 'cena');

  const filtered = dinnerRecipes.filter((r) => {
    if (selectedCategory === 'todas') return true;
    return r.proteinType === selectedCategory;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
        
        {/* Header */}
        <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between shadow-2xs shrink-0">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-brand-600 flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5" />
              Cambiar Cena • Día {dayNumber}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-0.5">
              Elige una cena alternativa
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-2xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice: No rompe el mercado */}
        <div className="px-4 pt-3 shrink-0">
          <div className="p-3 rounded-2xl bg-brand-50 border border-brand-200/80 text-xs font-semibold text-brand-950 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
            <span>
              <strong>Inteligente:</strong> Al cambiar esta cena se recalcularán automáticamente los ingredientes en tu lista de mercado sin desbalancear el presupuesto.
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="p-4 pb-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          {[
            { id: 'todas', label: 'Todas' },
            { id: 'pollo', label: '🍗 Pollo' },
            { id: 'res', label: '🥩 Res' },
            { id: 'pescado', label: '🐟 Pescado/Mariscos' },
            { id: 'granos', label: '🌱 Granos' },
            { id: 'huevo', label: '🥚 Tortilla/Huevo' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Recipe Cards List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filtered.map((recipe) => {
            const isCurrent = recipe.id === currentRecipeId;

            return (
              <div
                key={recipe.id}
                onClick={() => {
                  onSelectNewRecipe(recipe.id);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                  isCurrent
                    ? 'bg-brand-50/70 border-brand-500 ring-2 ring-brand-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-brand-400 hover:bg-slate-50 shadow-2xs'
                }`}
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  {recipe.imageUrl ? (
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                      🍲
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-700 bg-brand-100 px-2 py-0.5 rounded-md">
                      {recipe.highlightTag || '4 porciones'}
                    </span>
                    {recipe.carbType && (
                      <span className="text-[11px] font-semibold text-slate-500 truncate">
                        • {recipe.carbType}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm sm:text-base font-black text-slate-900 truncate mt-0.5">
                    {recipe.title}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-slate-500 font-bold mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-brand-600" />
                      {recipe.prepTime}
                    </span>
                    <span>•</span>
                    <span>4 porciones (2 hoy + 2 mañana)</span>
                  </div>
                </div>

                {/* Select button / indicator */}
                <div className="shrink-0">
                  {isCurrent ? (
                    <span className="text-xs font-black text-brand-700 bg-brand-200/80 px-2.5 py-1 rounded-xl">
                      Actual
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-black shadow-xs hover:bg-brand-700"
                    >
                      Elegir
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl"
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
};
