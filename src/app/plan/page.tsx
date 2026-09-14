'use client';

import React, { useState, useEffect } from 'react';
import {
  getHouseholdState,
  setActiveDay,
  toggleDayCompleted,
  setPlanDurationDays,
  swapDinnerRecipe
} from '@/lib/storage';
import { DayMealPlan, Recipe } from '@/types';
import { MEAL_PLAN_14_DAYS } from '@/data/mealPlanData';
import { ALL_RECIPES } from '@/data/recipesData';
import { BottomNav } from '@/components/BottomNav';
import { RecipeModal } from '@/components/RecipeModal';
import { CookingModeModal } from '@/components/CookingModeModal';
import { MealSwapModal } from '@/components/MealSwapModal';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Sun,
  PackageCheck,
  ChefHat,
  Clock,
  Flame,
  RefreshCw,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const DAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export default function PlanPage() {
  const [household, setHousehold] = useState(getHouseholdState());
  const [activeDuration, setActiveDuration] = useState<number>(household.planDurationDays || 14);
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(household.selectedDayActive || 1);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isCookingOpen, setIsCookingOpen] = useState(false);
  const [isSwapOpen, setIsSwapOpen] = useState(false);

  const refreshState = () => {
    const state = getHouseholdState();
    setHousehold(state);
    if (state.planDurationDays) setActiveDuration(state.planDurationDays);
    if (state.selectedDayActive) setSelectedDayNumber(state.selectedDayActive);
  };

  useEffect(() => {
    refreshState();
    const handleStateChange = () => setHousehold(getHouseholdState());
    window.addEventListener('recetario_state_changed', handleStateChange);
    return () => {
      window.removeEventListener('recetario_state_changed', handleStateChange);
    };
  }, []);

  const handleDurationChange = (days: number) => {
    setActiveDuration(days);
    setPlanDurationDays(days);
    if (selectedDayNumber > days) {
      setSelectedDayNumber(1);
      setActiveDay(1);
    }
  };

  const handleSelectDay = (dayNum: number) => {
    setSelectedDayNumber(dayNum);
    setActiveDay(dayNum);
    const calculatedWeek = dayNum <= 7 ? 1 : 2;
    if (calculatedWeek !== activeWeek) {
      setActiveWeek(calculatedWeek);
    }
  };

  const handlePrevWeek = () => {
    if (activeWeek > 1) {
      setActiveWeek(1);
      handleSelectDay(1);
    }
  };

  const handleNextWeek = () => {
    if (activeWeek < 2 && activeDuration > 7) {
      setActiveWeek(2);
      handleSelectDay(8);
    }
  };

  // Filter days for active week
  const weekDays = MEAL_PLAN_14_DAYS.filter((d) => {
    if (d.dayNumber > activeDuration) return false;
    return d.weekNumber === activeWeek;
  });

  const selectedDayPlan =
    MEAL_PLAN_14_DAYS.find((d) => d.dayNumber === selectedDayNumber) ||
    MEAL_PLAN_14_DAYS[0];

  // Resolve dinner with swaps
  const swappedDinnerId = household.swappedRecipes?.[selectedDayNumber];
  const dinnerRecipeId = swappedDinnerId || selectedDayPlan.dinner.recipeId;
  const dinnerRecipe = ALL_RECIPES.find((r) => r.id === dinnerRecipeId);

  const breakfastRecipe = ALL_RECIPES.find(
    (r) => r.id === selectedDayPlan.breakfast.recipeId
  );
  const lunchRecipe = selectedDayPlan.lunch.recipeId
    ? ALL_RECIPES.find((r) => r.id === selectedDayPlan.lunch.recipeId)
    : null;

  const isCompleted = household.completedDays.includes(selectedDayNumber);

  return (
    <div className="min-h-screen bg-[#F7F9F8] text-slate-900 pb-28">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3.5">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
              <CalendarDays className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <h1 className="text-base font-black text-slate-900 leading-tight">
                Plan de Comidas
              </h1>
              <p className="text-xs text-slate-500 font-semibold">
                Ciclo nocturno continuo • {activeDuration} Días
              </p>
            </div>
          </div>

          {/* 7 / 14 / 15 Days Selector */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1">
            {[7, 14, 15].map((duration) => (
              <button
                key={duration}
                onClick={() => handleDurationChange(duration)}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                  activeDuration === duration
                    ? 'bg-white text-brand-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {duration}d
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-3.5 space-y-4">
        {/* Week Pager (< Semana 1 >) */}
        <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
          <button
            onClick={handlePrevWeek}
            disabled={activeWeek === 1}
            className="p-1.5 rounded-xl hover:bg-slate-100 disabled:opacity-30 text-slate-700 font-bold transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h2 className="text-sm font-black text-slate-900">
              Semana {activeWeek} ({activeWeek === 1 ? 'Días 1–7' : `Días 8–${activeDuration}`})
            </h2>
            <p className="text-[11px] text-brand-700 font-bold">
              Cenas que cocinan los almuerzos del día siguiente
            </p>
          </div>

          <button
            onClick={handleNextWeek}
            disabled={activeWeek === 2 || activeDuration <= 7}
            className="p-1.5 rounded-xl hover:bg-slate-100 disabled:opacity-30 text-slate-700 font-bold transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Horizontal Day Selector Pills (Lun 1, Mar 2, ...) */}
        <div className="grid grid-cols-7 gap-1 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs">
          {weekDays.map((day, idx) => {
            const isSelected = day.dayNumber === selectedDayNumber;
            const isDone = household.completedDays.includes(day.dayNumber);
            const label = DAY_LABELS[idx % 7];

            return (
              <button
                key={day.dayNumber}
                onClick={() => handleSelectDay(day.dayNumber)}
                className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-xs scale-102 font-black'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-50 font-bold'
                }`}
              >
                <span className={`text-[10px] uppercase ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                  {label}
                </span>
                <span className="text-xs sm:text-sm font-black mt-0.5">
                  {day.dayNumber}
                </span>
                {isDone && !isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Day Header & Status */}
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base font-black text-slate-900">
              {selectedDayPlan.title}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Menú completo para 2 personas
            </p>
          </div>

          <button
            onClick={() => {
              toggleDayCompleted(selectedDayNumber);
              refreshState();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
              isCompleted
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Completado' : 'Marcar listo'}</span>
          </button>
        </div>

        {/* 3 Meal Cards for Selected Day */}
        <div className="space-y-3.5">
          {/* 1. Desayuno */}
          <div className="p-4 rounded-3xl bg-[#FFFDF7] border border-amber-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-[#FFF4CC] px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-700" />
                Desayuno Rápido
              </span>
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedDayPlan.breakfast.prepTime}
              </span>
            </div>

            <h4 className="text-sm font-black text-slate-900">
              {selectedDayPlan.breakfast.title}
            </h4>

            {selectedDayPlan.breakfast.quickNote && (
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {selectedDayPlan.breakfast.quickNote}
              </p>
            )}

            {breakfastRecipe && (
              <button
                onClick={() => setSelectedRecipe(breakfastRecipe)}
                className="w-full py-2 px-3 rounded-xl bg-amber-100/60 hover:bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Ver receta del desayuno</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* 2. Almuerzo */}
          <div className="p-4 rounded-3xl bg-[#F4FAF6] border border-emerald-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-[#E8F7EE] px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                <PackageCheck className="w-3.5 h-3.5 text-emerald-700" />
                Almuerzo de Anoche
              </span>
              <span className="text-[10px] font-black text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                {selectedDayPlan.lunch.isFreshOrPacked}
              </span>
            </div>

            <h4 className="text-sm font-black text-slate-900">
              {selectedDayPlan.lunch.title}
            </h4>

            <p className="text-xs text-emerald-950/80 font-medium leading-relaxed">
              {selectedDayPlan.lunch.packingTip}
            </p>

            {lunchRecipe && (
              <button
                onClick={() => setSelectedRecipe(lunchRecipe)}
                className="w-full py-2 px-3 rounded-xl bg-emerald-100/60 hover:bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Ver receta de origen</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* 3. Cena (Hero Recipe) */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-brand-500 shadow-md space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-white bg-brand-600 px-3 py-1 rounded-xl shadow-2xs flex items-center gap-1.5">
                <ChefHat className="w-3.5 h-3.5 text-amber-300" />
                Cena a Cocinar • 4 Porciones
              </span>
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-xl">
                <Clock className="w-3.5 h-3.5 text-brand-600" />
                {dinnerRecipe?.prepTime || selectedDayPlan.dinner.prepTime}
              </span>
            </div>

            {dinnerRecipe?.imageUrl && (
              <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <img
                  src={dinnerRecipe.imageUrl}
                  alt={dinnerRecipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider block">
                    {swappedDinnerId ? 'Personalizada' : '4 porciones = 2 cena + 2 almuerzo'}
                  </span>
                  <h4 className="text-base font-black leading-tight drop-shadow-xs">
                    {dinnerRecipe.title}
                  </h4>
                </div>
              </div>
            )}

            {!dinnerRecipe?.imageUrl && (
              <h4 className="text-base font-black text-slate-900">
                {dinnerRecipe?.title || selectedDayPlan.dinner.title}
              </h4>
            )}

            <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
              <span className="bg-brand-50 text-brand-900 px-2.5 py-1 rounded-lg border border-brand-200">
                🍽️ 2 hoy + 🍱 2 mañana
              </span>
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                🌾 {selectedDayPlan.dinner.carbohydrate}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => setIsCookingOpen(true)}
                className="w-full py-3 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <Flame className="w-4 h-4 text-amber-300" />
                <span>🟢 Cocinar esta cena (Paso a paso)</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    if (dinnerRecipe) setSelectedRecipe(dinnerRecipe);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Ver receta completa</span>
                </button>

                <button
                  onClick={() => setIsSwapOpen(true)}
                  className="py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center gap-1 transition-colors border border-amber-200"
                >
                  <RefreshCw className="w-3 h-3 text-amber-700" />
                  <span>Cambiar receta</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {isCookingOpen && dinnerRecipe && (
        <CookingModeModal
          recipe={dinnerRecipe}
          onClose={() => setIsCookingOpen(false)}
        />
      )}

      {isSwapOpen && dinnerRecipe && (
        <MealSwapModal
          dayNumber={selectedDayNumber}
          currentRecipeId={dinnerRecipe.id}
          onSelectNewRecipe={(newId) => {
            swapDinnerRecipe(selectedDayNumber, newId);
            setIsSwapOpen(false);
            refreshState();
          }}
          onClose={() => setIsSwapOpen(false)}
        />
      )}

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          servingMultiplier={household.servingMultiplier || 1.0}
          onClose={() => setSelectedRecipe(null)}
          onStartCooking={() => {
            setSelectedRecipe(null);
            setIsCookingOpen(true);
          }}
        />
      )}

      <BottomNav />
    </div>
  );
}
