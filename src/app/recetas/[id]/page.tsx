'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { RECIPES } from '@/data/recipesData';
import { TopHeader } from '@/components/TopHeader';
import { BottomNav } from '@/components/BottomNav';
import { getCurrentSession } from '@/lib/storage';
import { User } from '@/types';
import {
  ArrowLeft,
  Clock,
  Users,
  Video,
  ExternalLink,
  ShieldAlert,
  UtensilsCrossed,
  Sparkles
} from 'lucide-react';

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCurrentUser(getCurrentSession());
  }, []);

  const recipeId = params?.id as string;
  const recipe = RECIPES.find((r) => r.id === recipeId);

  if (!recipe) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-sm font-bold text-slate-800">Receta no encontrada</p>
        <Link
          href="/recetas"
          className="mt-3 px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold"
        >
          Volver al recetario
        </Link>
      </div>
    );
  }

  const toggleIngredient = (name: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <div className="flex-1 flex flex-col">
      <TopHeader user={currentUser} />

      <main className="flex-1 px-4 py-4 space-y-4">
        {/* Back link */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver atrás</span>
        </button>

        {/* Recipe card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
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
                {recipe.yieldServings} porciones
              </span>
              <span className="text-xs bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {recipe.prepTime}
              </span>
            </div>

            <h1 className="text-xl font-extrabold text-slate-900 leading-tight">
              {recipe.title}
            </h1>

            {recipe.carbType && (
              <p className="text-xs text-amber-700 font-medium mt-1.5 bg-amber-50/80 px-2.5 py-1 rounded-md border border-amber-200/60 inline-block">
                🌾 Carbohidrato: {recipe.carbType}
              </p>
            )}
          </div>

          {/* Video & External Links */}
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

          {/* Ingredientes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <UtensilsCrossed className="w-4 h-4 text-brand-600" />
                Ingredientes en crudo
              </h3>
              <span className="text-[11px] text-slate-400">Toca para tachar</span>
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
                      <span className="font-medium text-xs">{ing.name}</span>
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

          {/* Pasos de preparación */}
          <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-warm-600" />
              Paso a paso de cocción
            </h3>

            <div className="space-y-2.5">
              {recipe.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100"
                >
                  <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs leading-relaxed text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips de seguridad */}
          {recipe.packingInstructions && (
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-amber-950">
              <h4 className="font-bold text-xs flex items-center gap-1.5 text-amber-900 mb-1">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Seguridad y Empaque para el Almuerzo
              </h4>
              <p className="text-xs leading-relaxed">{recipe.packingInstructions}</p>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
