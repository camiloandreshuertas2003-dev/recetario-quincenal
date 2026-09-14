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
  Utensils
} from 'lucide-react';

export default function RecipesPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [household, setHousehold] = useState(getHouseholdState());
  const [categoryFilter, setCategoryFilter] = useState<'todos' | 'cena' | 'desayuno'>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    setCurrentUser(getCurrentSession());
    setHousehold(getHouseholdState());
  }, []);

  const filteredRecipes = RECIPES.filter((recipe) => {
    const matchesCategory =
      categoryFilter === 'todos' || recipe.category === categoryFilter;

    const term = searchTerm.toLowerCase().trim();
    if (!term) return matchesCategory;

    const matchesTitle = recipe.title.toLowerCase().includes(term);
    const matchesIngredient = recipe.ingredients.some((ing) =>
      ing.name.toLowerCase().includes(term)
    );
    const matchesCarb = recipe.carbType?.toLowerCase().includes(term);

    return matchesCategory && (matchesTitle || matchesIngredient || matchesCarb);
  });

  // Calculate pending market items count for badge
  const totalMarketItems = SHOPPING_LIST_INITIAL.length + (household.customItems?.length || 0);
  const checkedMarketCount = Object.keys(household.checkedItems || {}).length;
  const pendingMarketCount = Math.max(0, totalMarketItems - checkedMarketCount);

  return (
    <div className="flex-1 flex flex-col">
      <TopHeader user={currentUser} />

      <main className="flex-1 px-4 py-4 space-y-4">
        {/* Page Title Header */}
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-brand-600" />
            Recetario Completo
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cenas de 4 porciones con medidas en crudo y desayunos exprés
          </p>
        </div>

        {/* Search bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por receta o ingrediente (ahuyama, lentejas...)"
            className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-2xs"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setCategoryFilter('todos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              categoryFilter === 'todos'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            Todas ({RECIPES.length})
          </button>
          <button
            onClick={() => setCategoryFilter('cena')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              categoryFilter === 'cena'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            🍲 Cenas 4 porciones (14)
          </button>
          <button
            onClick={() => setCategoryFilter('desayuno')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              categoryFilter === 'desayuno'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            🌅 Desayunos exprés (7)
          </button>
        </div>

        {/* Recipes Grid / List */}
        <div className="space-y-3">
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-3xl border border-slate-200 p-6">
              <p className="text-xs text-slate-500">
                No encontramos recetas que coincidan con tu búsqueda.
              </p>
            </div>
          ) : (
            filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:border-brand-300 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      recipe.category === 'cena'
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {recipe.category === 'cena' ? 'Cena (4p)' : 'Desayuno (2p)'}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {recipe.prepTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {recipe.yieldServings} porciones
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-700 transition-colors">
                  {recipe.title}
                </h3>

                {recipe.carbType && (
                  <p className="text-[11px] text-slate-600 mt-1">
                    🌾 {recipe.carbType}
                  </p>
                )}

                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 text-xs">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {recipe.ingredients.length} ingredientes en crudo
                  </span>
                  <div className="flex items-center gap-2 text-brand-700 font-bold text-xs">
                    {recipe.videoUrl && (
                      <span className="flex items-center gap-0.5 text-rose-600 text-[10px] bg-rose-50 px-1.5 py-0.5 rounded">
                        <Video className="w-3 h-3" /> Video
                      </span>
                    )}
                    <span>Ver Receta →</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />

      <BottomNav pendingMarketCount={pendingMarketCount} />
    </div>
  );
}
