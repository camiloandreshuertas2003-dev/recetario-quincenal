'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getCurrentSession,
  getHouseholdState,
  toggleDayCompleted,
  togglePrepTask,
  setActiveDay,
  toggleMealPacked,
  isMealPacked,
  swapDinnerRecipe
} from '@/lib/storage';
import { User, DayMealPlan, Recipe } from '@/types';
import { MEAL_PLAN_14_DAYS } from '@/data/mealPlanData';
import { ALL_RECIPES } from '@/data/recipesData';
import { BottomNav } from '@/components/BottomNav';
import { CookingModeModal } from '@/components/CookingModeModal';
import { MealSwapModal } from '@/components/MealSwapModal';
import { RecipeModal } from '@/components/RecipeModal';
import {
  Sparkles,
  Flame,
  PackageCheck,
  CheckCircle2,
  Clock,
  Sun,
  Moon,
  ChefHat,
  RefreshCw,
  Bell,
  ArrowRight,
  ShieldCheck,
  Droplets,
  ThermometerSnowflake,
  Users,
  ChevronRight,
  Check,
  Utensils
} from 'lucide-react';

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [household, setHousehold] = useState(getHouseholdState());
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(
    household.selectedDayActive || 1
  );
  const [isCookingModeOpen, setIsCookingModeOpen] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [selectedRecipeForModal, setSelectedRecipeForModal] = useState<Recipe | null>(null);
  const [showNotificationTip, setShowNotificationTip] = useState(false);

  const refreshState = () => {
    setCurrentUser(getCurrentSession());
    const state = getHouseholdState();
    setHousehold(state);
    if (state.selectedDayActive) {
      setSelectedDayNumber(state.selectedDayActive);
    }
  };

  useEffect(() => {
    refreshState();

    const handleStateChange = () => {
      const state = getHouseholdState();
      setHousehold(state);
    };

    window.addEventListener('recetario_state_changed', handleStateChange);
    return () => {
      window.removeEventListener('recetario_state_changed', handleStateChange);
    };
  }, []);

  const handleSelectDay = (dayNum: number) => {
    setSelectedDayNumber(dayNum);
    setActiveDay(dayNum);
  };

  const handleTogglePrep = (taskKey: string) => {
    togglePrepTask(taskKey);
    refreshState();
  };

  const handleTogglePacking = () => {
    toggleMealPacked(selectedDayNumber);
    refreshState();
  };

  // Find active day meal plan
  const activeDayPlan: DayMealPlan =
    MEAL_PLAN_14_DAYS.find((d) => d.dayNumber === selectedDayNumber) ||
    MEAL_PLAN_14_DAYS[0];

  // Check if tomorrow has prep alerts (thaw / soak)
  const tomorrowDayNumber = selectedDayNumber < (household.planDurationDays || 14) ? selectedDayNumber + 1 : 1;
  const tomorrowDayPlan = MEAL_PLAN_14_DAYS.find((d) => d.dayNumber === tomorrowDayNumber);

  // Lookup recipes for active day, taking swaps into account
  const swappedDinnerId = household.swappedRecipes?.[selectedDayNumber];
  const dinnerRecipeId = swappedDinnerId || activeDayPlan.dinner.recipeId;
  const dinnerRecipe = ALL_RECIPES.find((r) => r.id === dinnerRecipeId);

  const breakfastRecipe = ALL_RECIPES.find(
    (r) => r.id === activeDayPlan.breakfast.recipeId
  );
  const lunchRecipe = activeDayPlan.lunch.recipeId
    ? ALL_RECIPES.find((r) => r.id === activeDayPlan.lunch.recipeId)
    : null;

  const isPacked = isMealPacked(selectedDayNumber);
  const isDayDone = household.completedDays.includes(selectedDayNumber);
  const prepChecks = household.prepTasksChecked || {};

  const totalDays = household.planDurationDays || 14;
  const householdCount = household.householdMembersCount || household.users?.length || 2;
  const budgetAmount = household.budgetAmount || 320000;
  const userName = currentUser?.name || 'Camilo';

  return (
    <div className="min-h-screen bg-[#F7F9F8] text-slate-900 pb-28">
      {/* Top Header / Greeting Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-emerald-400 p-0.5 shadow-xs">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-black text-brand-700 text-sm overflow-hidden">
                {currentUser?.photoUrl ? (
                  <img src={currentUser.photoUrl} alt={userName} className="w-full h-full object-cover" />
                ) : (
                  userName.charAt(0).toUpperCase()
                )}
              </div>
            </div>
            <div>
              <h1 className="text-base font-black text-slate-900 flex items-center gap-1.5 leading-tight">
                ¡Hola, {userName}! 👋
              </h1>
              <p className="text-xs text-slate-500 font-semibold">
                Semana {activeDayPlan.weekNumber} • Día {selectedDayNumber} de {totalDays}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotificationTip(!showNotificationTip)}
              className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Avisos y recordatorios"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            </button>

            <Link
              href="/mas"
              className="p-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 transition-colors"
              title="Ajustes del hogar"
            >
              <Users className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick notification drop */}
        {showNotificationTip && (
          <div className="max-w-lg mx-auto mt-2 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start justify-between gap-2 shadow-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start gap-2">
              <Moon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Recordatorio nocturno:</strong> Cocina las 4 porciones de la cena esta noche. Al terminar, empaca 2 en la nevera para mañana y evita cocinar al mediodía.
              </div>
            </div>
            <button
              onClick={() => setShowNotificationTip(false)}
              className="text-amber-700 font-bold hover:text-amber-900 text-sm px-1"
            >
              ✕
            </button>
          </div>
        )}
      </header>

      <main className="max-w-lg mx-auto px-4 pt-3.5 space-y-4">
        {/* ========================================================== */}
        {/* SCREEN 1: PLAN SUMMARY CARD */}
        {/* ========================================================== */}
        <section className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md border border-brand-200">
                Plan Activo
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Menú Quincenal Colombiano
              </h2>
            </div>

            <Link
              href="/plan"
              className="text-xs font-black text-brand-600 hover:text-brand-700 flex items-center gap-1 bg-brand-50/80 px-3 py-1.5 rounded-xl border border-brand-200 transition-all hover:scale-102"
            >
              <span>Ver calendario</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Progress dots */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
              <span>Progreso del ciclo</span>
              <span className="text-brand-700">Día {selectedDayNumber} de {totalDays}</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1">
              {Array.from({ length: totalDays }).map((_, idx) => {
                const dayNum = idx + 1;
                const isCurrent = dayNum === selectedDayNumber;
                const isCompleted = household.completedDays.includes(dayNum);

                return (
                  <button
                    key={dayNum}
                    onClick={() => handleSelectDay(dayNum)}
                    className="flex flex-col items-center flex-1 min-w-[20px] focus:outline-hidden group"
                    title={`Día ${dayNum}`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full transition-all flex items-center justify-center ${
                        isCurrent
                          ? 'bg-amber-500 ring-2 ring-amber-300 scale-125'
                          : isCompleted
                          ? 'bg-brand-600'
                          : 'bg-slate-200 group-hover:bg-slate-300'
                      }`}
                    >
                      {isCompleted && !isCurrent && (
                        <Check className="w-2.5 h-2.5 text-white" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4 Info Chips (Días, Proteínas, Personas, Presupuesto) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-2">
              <span className="text-base">⏱️</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Duración</p>
                <p className="text-xs font-black text-slate-800">{totalDays} Días</p>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-2">
              <span className="text-base">🥩</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Variedad</p>
                <p className="text-xs font-black text-slate-800">5 Proteínas</p>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-2">
              <span className="text-base">👥</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Comensales</p>
                <p className="text-xs font-black text-slate-800">{householdCount} Personas</p>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-2">
              <span className="text-base">💰</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Presupuesto</p>
                <p className="text-xs font-black text-slate-800">${budgetAmount.toLocaleString('es-CO')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Day Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {MEAL_PLAN_14_DAYS.slice(0, totalDays).map((day) => {
            const isSelected = day.dayNumber === selectedDayNumber;
            const isDone = household.completedDays.includes(day.dayNumber);

            return (
              <button
                key={day.dayNumber}
                onClick={() => handleSelectDay(day.dayNumber)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-xs scale-102'
                    : isDone
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />}
                <span>Día {day.dayNumber}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================== */}
        {/* TU DÍA DE HOY: 3 CARDS */}
        {/* ========================================================== */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-brand-600" />
              Tu menú de hoy (Día {selectedDayNumber})
            </h3>
            <button
              onClick={() => {
                toggleDayCompleted(selectedDayNumber);
                refreshState();
              }}
              className={`text-xs font-bold px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 ${
                isDayDone
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>{isDayDone ? 'Día completado' : 'Marcar listo'}</span>
            </button>
          </div>

          {/* CARD 1: 🟡 DESAYUNO RÁPIDO */}
          <div className="p-4 rounded-3xl bg-[#FFFDF7] border border-amber-200/90 shadow-2xs space-y-2.5 transition-all hover:border-amber-300">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-[#FFF4CC] px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-700" />
                Desayuno Rápido
              </span>
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeDayPlan.breakfast.prepTime}
              </span>
            </div>

            <div>
              <h4 className="text-base font-black text-slate-900 leading-snug">
                {activeDayPlan.breakfast.title}
              </h4>
              {activeDayPlan.breakfast.quickNote && (
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                  {activeDayPlan.breakfast.quickNote}
                </p>
              )}
            </div>

            {activeDayPlan.beverage && (
              <div className="p-2.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-950 flex items-center justify-between gap-2">
                <span className="font-semibold truncate">☕ {activeDayPlan.beverage.name}</span>
                <span className="text-[10px] font-bold text-amber-800 bg-white/80 px-2 py-0.5 rounded-md shrink-0">
                  {activeDayPlan.beverage.quickPrep.split('•')[0]}
                </span>
              </div>
            )}

            {breakfastRecipe && (
              <button
                onClick={() => setSelectedRecipeForModal(breakfastRecipe)}
                className="w-full py-2 px-3 rounded-xl bg-amber-100/60 hover:bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Ver receta e ingredientes del desayuno</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* CARD 2: 🟢 ALMUERZO LISTO (DE ANOCHE) */}
          <div className="p-4 rounded-3xl bg-[#F4FAF6] border border-emerald-200/90 shadow-2xs space-y-2.5 transition-all hover:border-emerald-300">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-[#E8F7EE] px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                <PackageCheck className="w-3.5 h-3.5 text-emerald-700" />
                Almuerzo de Anoche (0 min cocción)
              </span>
              <span className="text-[10px] font-black text-emerald-700 bg-white/90 px-2 py-0.5 rounded-md border border-emerald-200">
                {activeDayPlan.lunch.isFreshOrPacked}
              </span>
            </div>

            <div>
              <h4 className="text-base font-black text-slate-900 leading-snug">
                {activeDayPlan.lunch.title}
              </h4>
              <p className="text-xs text-emerald-900/90 font-medium mt-1 leading-relaxed">
                {activeDayPlan.lunch.packingTip}
              </p>
            </div>

            {activeDayPlan.lunch.reheatTip && (
              <div className="p-2.5 rounded-2xl bg-white/80 border border-emerald-200 text-xs text-slate-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Recalentado:</strong> {activeDayPlan.lunch.reheatTip}
                </span>
              </div>
            )}

            {lunchRecipe && (
              <button
                onClick={() => setSelectedRecipeForModal(lunchRecipe)}
                className="w-full py-2 px-3 rounded-xl bg-emerald-100/60 hover:bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Consultar receta original del almuerzo</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* CARD 3: 🔴 CENA DE HOY (HERO CARD - 4 PORCIONES) */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-brand-500 shadow-md space-y-3.5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-white bg-brand-600 px-3 py-1 rounded-xl shadow-2xs flex items-center gap-1.5">
                <ChefHat className="w-3.5 h-3.5 text-amber-300" />
                Cena de Hoy • Rinde 4 Porciones
              </span>
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-xl">
                <Clock className="w-3.5 h-3.5 text-brand-600" />
                {dinnerRecipe?.prepTime || activeDayPlan.dinner.prepTime}
              </span>
            </div>

            {/* Photo */}
            {dinnerRecipe?.imageUrl && (
              <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <img
                  src={dinnerRecipe.imageUrl}
                  alt={dinnerRecipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider block">
                    {swappedDinnerId ? '✨ Receta Personalizada' : '4 porciones = 2 cena + 2 almuerzo'}
                  </span>
                  <h3 className="text-lg font-black leading-tight drop-shadow-xs">
                    {dinnerRecipe.title}
                  </h3>
                </div>
              </div>
            )}

            {!dinnerRecipe?.imageUrl && (
              <div>
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  {dinnerRecipe?.title || activeDayPlan.dinner.title}
                </h3>
              </div>
            )}

            {/* Portions breakdown badge */}
            <div className="p-2.5 rounded-2xl bg-brand-50/80 border border-brand-200 text-xs font-bold text-brand-950 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                🍽️ 2 porciones hoy
              </span>
              <span className="text-brand-400 font-bold">+</span>
              <span className="flex items-center gap-1.5 text-emerald-900">
                🍱 2 almuerzos mañana
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                🥩 {dinnerRecipe?.proteinType || activeDayPlan.dinner.proteinType}
              </span>
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                🌾 {activeDayPlan.dinner.carbohydrate}
              </span>
            </div>

            {/* BIG GREEN CTA: COCINAR LA CENA */}
            <button
              onClick={() => setIsCookingModeOpen(true)}
              className="w-full py-3.5 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-98 text-white font-black text-sm sm:text-base shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <Flame className="w-5 h-5 text-amber-300 animate-bounce" />
              <span>🟢 COCINAR LA CENA (Paso a Paso)</span>
            </button>

            {/* Secondary actions: Ver receta & Cambiar receta */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  if (dinnerRecipe) setSelectedRecipeForModal(dinnerRecipe);
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Ver ingredientes</span>
              </button>

              <button
                onClick={() => setIsSwapModalOpen(true)}
                className="py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-amber-200"
              >
                <RefreshCw className="w-3 h-3 text-amber-700" />
                <span>Cambiar receta</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* CARD: ANTES DE DORMIR - EMPACA 2 PORCIONES PARA MAÑANA */}
        {/* ========================================================== */}
        <section
          onClick={handleTogglePacking}
          className={`p-4 rounded-3xl border-2 transition-all cursor-pointer shadow-sm flex items-start gap-3.5 ${
            isPacked
              ? 'bg-[#E8F7EE] border-emerald-400 text-emerald-950'
              : 'bg-white border-dashed border-slate-300 hover:border-brand-500'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              isPacked ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
            }`}
          >
            {isPacked ? <Check className="w-5 h-5 font-black" /> : <PackageCheck className="w-4 h-4" />}
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <span>Antes de dormir: Empacar 2 almuerzos</span>
                {isPacked && (
                  <span className="text-[10px] font-black uppercase text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                    Empacado ✓
                  </span>
                )}
              </h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {isPacked
                ? '¡Excelente trabajo! Tus 2 recipientes herméticos están en la nevera listos para tomar por la mañana.'
                : 'Separa los 2 recipientes antes de servir la cena. Deja enfriar a temperatura ambiente y refrigera antes de 2 horas.'}
            </p>
          </div>
        </section>

        {/* ========================================================== */}
        {/* ACCORDION: PREPARACIÓN PARA MAÑANA (DESCONGELAR / REMOJAR) */}
        {/* ========================================================== */}
        {tomorrowDayPlan?.prepAlert && (tomorrowDayPlan.prepAlert.thaw || tomorrowDayPlan.prepAlert.soak) && (
          <section className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Moon className="w-4 h-4 text-indigo-600" />
                Preparación para mañana (Día {tomorrowDayNumber})
              </h4>
              <span className="text-[11px] font-bold text-slate-400">Esta noche</span>
            </div>

            <div className="space-y-2 text-xs">
              {tomorrowDayPlan.prepAlert.thaw && (
                <div
                  onClick={() => handleTogglePrep(`day-${tomorrowDayNumber}-thaw`)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                    prepChecks[`day-${tomorrowDayNumber}-thaw`]
                      ? 'bg-slate-50 border-slate-200 opacity-60 line-through text-slate-400'
                      : 'bg-blue-50/70 border-blue-200 hover:border-blue-300 text-blue-950'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5">
                    <ThermometerSnowflake className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <strong className="block font-bold text-blue-950">Descongelar en la nevera:</strong>
                    <span>{tomorrowDayPlan.prepAlert.thaw}</span>
                  </div>
                </div>
              )}

              {tomorrowDayPlan.prepAlert.soak && (
                <div
                  onClick={() => handleTogglePrep(`day-${tomorrowDayNumber}-soak`)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                    prepChecks[`day-${tomorrowDayNumber}-soak`]
                      ? 'bg-slate-50 border-slate-200 opacity-60 line-through text-slate-400'
                      : 'bg-amber-50/70 border-amber-200 hover:border-amber-300 text-amber-950'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Droplets className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <strong className="block font-bold text-amber-950">Poner en remojo:</strong>
                    <span>{tomorrowDayPlan.prepAlert.soak}</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Cooking Mode Step-by-Step Modal */}
      {isCookingModeOpen && dinnerRecipe && (
        <CookingModeModal
          recipe={dinnerRecipe}
          onClose={() => setIsCookingModeOpen(false)}
        />
      )}

      {/* Meal Swap Modal */}
      {isSwapModalOpen && dinnerRecipe && (
        <MealSwapModal
          dayNumber={selectedDayNumber}
          currentRecipeId={dinnerRecipe.id}
          onSelectNewRecipe={(newId) => {
            swapDinnerRecipe(selectedDayNumber, newId);
            setIsSwapModalOpen(false);
            refreshState();
          }}
          onClose={() => setIsSwapModalOpen(false)}
        />
      )}

      {/* Recipe Detail Modal */}
      {selectedRecipeForModal && (
        <RecipeModal
          recipe={selectedRecipeForModal}
          servingMultiplier={household.servingMultiplier || 1.0}
          onClose={() => setSelectedRecipeForModal(null)}
          onStartCooking={() => {
            setSelectedRecipeForModal(null);
            setIsCookingModeOpen(true);
          }}
        />
      )}

      {/* Fixed Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
