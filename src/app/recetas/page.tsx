'use client';

import React, { useState, useEffect } from 'react';
import { getCurrentSession, getHouseholdState } from '@/lib/storage';
import { User, Recipe } from '@/types';
import { TopHeader } from '@/components/TopHeader';
import { BottomNav } from '@/components/BottomNav';
import { RecipeModal } from '@/components/RecipeModal';
import { RECIPES } from '@/data/recipesData';
import { SHOPPING_LIST_INITIAL } from '@/data/shoppingData';
import {
  Search,
  ChefHat,
  Clock,
  Users,
  Video,
  ExternalLink,
  Sparkles,
  Utensils,
  Flame,
  Fish,
  Wheat
} from 'lucide-react';

type FilterType = 'todos' | 'pollo' | 'res' | 'pescado' | 'granos' | 'desayuno';

export default function RecipesPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [household, setHousehold] = useState(getHouseholdState());
  const [filterType, setFilterType] = useState<FilterType>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    setCurrentUser(getCurrentSession());
    setHousehold(getHouseholdState());

    const handleState = () => setHousehold(getHouseholdState());
    window.addEventListener('recetario_state_changed', handleState);
    return () => window.removeEventListener('recetario_state_changed', handleState);
  }, []);

  const filteredRecipes = RECIPES.filter((recipe) => {
    // Category or protein matching
    let matchesFilter = true;
    if (filterType === 'desayuno') {
      matchesFilter = recipe.category === 'desayuno';
    } else if (filterType === 'pollo') {
      matchesFilter = recipe.proteinType === 'pollo';
    } else if (filterType === 'res') {
      matchesFilter = recipe.proteinType === 'res';
    } else if (filterType === 'pescado') {
      matchesFilter = recipe.proteinType === 'pescado';
    } else if (filterType === 'granos') {
      matchesFilter = recipe.proteinType === 'granos' || recipe.proteinType === 'huevo' && recipe.category === 'cena';
    }

    const term = searchTerm.toLowerCase().trim();
    if (!term) return matchesFilter;

    const matchesTitle = recipe.title.toLowerCase().includes(term);
    const matchesIngredient = recipe.ingredients.some((ing) =>
      ing.name.toLowerCase().includes(term)
    );
    const matchesCarb = recipe.carbType?.toLowerCase().includes(term);

    return matchesFilter && (matchesTitle || matchesIngredient || matchesCarb);
  });

  // Category counts
  const countPollo = RECIPES.filter((r) => r.proteinType === 'pollo').length;
  const countRes = RECIPES.filter((r) => r.proteinType === 'res').length;
  const countPescado = RECIPES.filter((r) => r.proteinType === 'pescado').length;
  const countGranos = RECIPES.filter((r) => (r.proteinType === 'granos' || r.proteinType === 'huevo') && r.category === 'cena').length;
  const countDesayunos = RECIPES.filter((r) => r.category === 'desayuno').length;

  const totalMarketItems = SHOPPING_LIST_INITIAL.length + (household.customItems?.length || 0);
  const checkedMarketCount = Object.keys(household.checkedItems || {}).length;
  const pendingMarketCount = Math.max(0, totalMarketItems - checkedMarketCount);

  const getProteinBadge = (recipe: Recipe) => {
    if (recipe.category === 'desayuno') {
      return { label: 'Desayuno Exprés', color: 'bg-amber-100 text-amber-900 border-amber-300' };
    }
    if (recipe.proteinType === 'pollo') {
      return { label: 'Pollo / Presas', color: 'bg-orange-100 text-orange-950 border-orange-300' };
    }
    if (recipe.proteinType === 'res') {
      return { label: 'Carne de Res', color: 'bg-rose-100 text-rose-950 border-rose-300' };
    }
    if (recipe.proteinType === 'pescado') {
      return { label: 'Pescado / Camarón', color: 'bg-sky-100 text-sky-950 border-sky-300' };
    }
    return { label: 'Leguminosas / Vegetariano', color: 'bg-emerald-100 text-emerald-950 border-emerald-300' };
  };

  return (
    <div className="flex-1 flex flex-col">
      <TopHeader
        user={currentUser}
        servingMultiplier={household.servingMultiplier || 1.0}
        onRefresh={() => setHousehold(getHouseholdState())}
      />

      <main className="flex-1 px-3 sm:px-5 py-4 space-y-4">
        {/* Page Title Header with Larger Clear Text */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <ChefHat className="w-6 h-6 text-brand-600 shrink-0" />
                Recetario Profesional
              </h2>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                14 cenas completas de 4 porciones y 6 desayunos rápidos con medidas exactas en crudo.
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-extrabold text-brand-700 bg-brand-50 px-3 py-1 rounded-xl border border-brand-200">
                {RECIPES.length} Recetas
              </span>
            </div>
          </div>

          {/* Search bar with large readable font */}
          <div className="relative mt-3.5">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar receta o ingrediente (lentejas, ahuyama, bistec, camarones...)"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-2xs font-medium"
            />
          </div>
        </div>

        {/* Categories & Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
          <button
            onClick={() => setFilterType('todos')}
            className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              filterType === 'todos'
                ? 'bg-brand-600 text-white shadow-sm ring-1 ring-brand-500'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>🍽️ Todas ({RECIPES.length})</span>
          </button>
          <button
            onClick={() => setFilterType('pollo')}
            className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              filterType === 'pollo'
                ? 'bg-orange-600 text-white shadow-sm ring-1 ring-orange-500'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>🍗 Pollo ({countPollo})</span>
          </button>
          <button
            onClick={() => setFilterType('res')}
            className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              filterType === 'res'
                ? 'bg-rose-700 text-white shadow-sm ring-1 ring-rose-600'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>🥩 Res ({countRes})</span>
          </button>
          <button
            onClick={() => setFilterType('pescado')}
            className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              filterType === 'pescado'
                ? 'bg-sky-600 text-white shadow-sm ring-1 ring-sky-500'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>🐟 Pescado y Mariscos ({countPescado})</span>
          </button>
          <button
            onClick={() => setFilterType('granos')}
            className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              filterType === 'granos'
                ? 'bg-emerald-700 text-white shadow-sm ring-1 ring-emerald-600'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>🌱 Granos y Tortilla ({countGranos})</span>
          </button>
          <button
            onClick={() => setFilterType('desayuno')}
            className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              filterType === 'desayuno'
                ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-500'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>🌅 Desayunos ({countDesayunos})</span>
          </button>
        </div>

        {/* Recipes Grid */}
        <div className="space-y-3.5">
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6 space-y-2">
              <ChefHat className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-base font-bold text-slate-700">
                No encontramos recetas que coincidan con tu búsqueda.
              </p>
              <p className="text-sm text-slate-500">
                Intenta buscar por ingrediente como "ahuyama", "pollo", "pescado" o limpia el filtro.
              </p>
            </div>
          ) : (
            filteredRecipes.map((recipe) => {
              const badge = getProteinBadge(recipe);
              const scaledServings = Math.round(recipe.yieldServings * (household.servingMultiplier || 1.0));

              return (
                <div
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:border-brand-400 hover:shadow-md transition-all cursor-pointer group active:scale-[0.99]"
                >
                  {/* Top tags row */}
                  <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                    <span className={`text-xs font-black px-3 py-1 rounded-xl border ${badge.color}`}>
                      {badge.label}
                    </span>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 font-bold">
                      <span className="flex items-center gap-1 text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-brand-600" />
                        {recipe.prepTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-700">
                        <Users className="w-3.5 h-3.5 text-warm-600" />
                        {scaledServings} porciones
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-brand-700 transition-colors leading-snug">
                    {recipe.title}
                  </h3>

                  {/* Carbohydrate & filling note */}
                  {recipe.carbType && (
                    <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5 flex items-center gap-1.5">
                      <span className="text-amber-600 font-bold">🌾 Carbohidrato:</span>
                      <span>{recipe.carbType}</span>
                    </p>
                  )}

                  {recipe.whyFilling && (
                    <p className="text-xs sm:text-sm text-slate-600 bg-amber-50/70 border border-amber-200/70 p-2.5 rounded-2xl mt-2 leading-relaxed">
                      <strong className="text-amber-950 font-bold">💡 Por qué llena: </strong>
                      {recipe.whyFilling}
                    </p>
                  )}

                  {/* Footer Row */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs sm:text-sm">
                    <span className="text-slate-500 font-semibold">
                      {recipe.ingredients.length} ingredientes en crudo
                    </span>
                    <div className="flex items-center gap-2 text-brand-700 font-extrabold">
                      {recipe.videoUrl && (
                        <span className="flex items-center gap-1 text-rose-600 text-xs bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-lg">
                          <Video className="w-3.5 h-3.5" /> Video
                        </span>
                      )}
                      <span className="group-hover:translate-x-0.5 transition-transform">Ver Receta →</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      <RecipeModal
        recipe={selectedRecipe}
        servingMultiplier={household.servingMultiplier || 1.0}
        onClose={() => setSelectedRecipe(null)}
      />

      <BottomNav pendingMarketCount={pendingMarketCount} />
    </div>
  );
}
