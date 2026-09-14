'use client';

import React, { useState, useEffect } from 'react';
import {
  getCurrentSession,
  getHouseholdState,
  toggleDayCompleted,
  togglePrepTask,
  setActiveDay
} from '@/lib/storage';
import { User, DayMealPlan, Recipe } from '@/types';
import { MEAL_PLAN_14_DAYS } from '@/data/mealPlanData';
import { ALL_RECIPES } from '@/data/recipesData';
import { TopHeader } from '@/components/TopHeader';
import { BottomNav } from '@/components/BottomNav';
import { DayCard } from '@/components/DayCard';
import { RecipeModal } from '@/components/RecipeModal';
import { WeekSelector } from '@/components/WeekSelector';
import {
  CalendarDays,
  Clock,
  Sparkles,
  ChefHat,
  Coffee,
  CheckCircle2,
  Circle,
  PackageCheck,
  Utensils,
  Sun,
  Moon,
  Flame,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  ThermometerSnowflake,
  Droplets,
  Share2
} from 'lucide-react';

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [household, setHousehold] = useState(getHouseholdState());
  const [activeTab, setActiveTab] = useState<'hoy' | 'quincenal'>('hoy');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(
    household.selectedDayActive || 1
  );
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

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

  // Find active day meal plan
  const activeDayPlan: DayMealPlan =
    MEAL_PLAN_14_DAYS.find((d) => d.dayNumber === selectedDayNumber) ||
    MEAL_PLAN_14_DAYS[0];

  // Lookup recipes for active day
  const breakfastRecipe = ALL_RECIPES.find(
    (r) => r.id === activeDayPlan.breakfast.recipeId
  );
  const dinnerRecipe = ALL_RECIPES.find(
    (r) => r.id === activeDayPlan.dinner.recipeId
  );
  const lunchRecipe = activeDayPlan.lunch.recipeId
    ? ALL_RECIPES.find((r) => r.id === activeDayPlan.lunch.recipeId)
    : null;

  // Filter days for quincenal view
  const availableWeeks = [1, 2];
  const filteredDays = MEAL_PLAN_14_DAYS.filter((day) => {
    if (selectedWeek === 'all') return true;
    return day.weekNumber === selectedWeek;
  });

  const isDayDone = household.completedDays.includes(selectedDayNumber);
  const prepChecks = household.prepTasksChecked || {};

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 pb-28">
      <TopHeader />

      <main className="max-w-lg md:max-w-xl mx-auto px-4 pt-3 space-y-4">
        {/* Value Proposition & Slogan Banner */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 space-y-1">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Asistente de Organización Alimentaria
            </span>
            <h1 className="text-xl sm:text-2xl font-black leading-tight">
              Planifica, cocina una vez en la noche, cena rico y despierta con el almuerzo listo.
            </h1>
            <p className="text-xs sm:text-sm text-brand-100 font-medium pt-1">
              Ciclo nocturno continuo para 2 personas: 14 cenas que producen 14 almuerzos con ingredientes colombianos.
            </p>
          </div>
        </div>

        {/* View Switcher: HOY vs. PLAN QUINCENAL */}
        <div className="p-1.5 rounded-2xl bg-slate-200/70 flex items-center gap-1.5 shadow-2xs">
          <button
            onClick={() => setActiveTab('hoy')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === 'hoy'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>Hoy (Asistente Diario)</span>
          </button>

          <button
            onClick={() => setActiveTab('quincenal')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === 'quincenal'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Plan 14 Días</span>
          </button>
        </div>

        {/* ========================================================== */}
        {/* TAB 1: HOY (ASISTENTE DIARIO) */}
        {/* ========================================================== */}
        {activeTab === 'hoy' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Horizontal Day Pill Selector */}
            <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between px-1 mb-2">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  Selecciona el día del ciclo:
                </span>
                <span className="text-xs font-bold text-brand-700">
                  Día {selectedDayNumber} de 14
                </span>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {MEAL_PLAN_14_DAYS.map((day) => {
                  const isSelected = day.dayNumber === selectedDayNumber;
                  const isDone = household.completedDays.includes(day.dayNumber);

                  return (
                    <button
                      key={day.dayNumber}
                      onClick={() => handleSelectDay(day.dayNumber)}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black shrink-0 transition-all flex items-center gap-1 ${
                        isSelected
                          ? 'bg-brand-600 text-white shadow-xs scale-105'
                          : isDone
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-700" />}
                      <span>Día {day.dayNumber}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Day Title & Night Cycle Rule Banner */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-brand-700 bg-brand-50 px-2.5 py-1 rounded-xl border border-brand-200">
                  {activeDayPlan.weekNumber === 1 ? 'Semana 1' : 'Semana 2'} • Día {activeDayPlan.dayNumber}
                </span>

                <button
                  onClick={() => {
                    toggleDayCompleted(selectedDayNumber);
                    refreshState();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                    isDayDone
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isDayDone ? 'Día completado' : 'Marcar día listo'}</span>
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {activeDayPlan.title}
              </h2>

              <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-950 text-xs sm:text-sm font-medium flex items-center gap-2">
                <Moon className="w-5 h-5 text-amber-600 shrink-0" />
                <span>
                  <strong>Regla del ciclo:</strong> Hoy cocinas la cena de 4 porciones: 2 para cenar rico esta noche y 2 quedan empacadas para el almuerzo de mañana.
                </span>
              </div>
            </div>

            {/* Meal Prep Daily Checklist */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                <PackageCheck className="w-5 h-5 text-brand-600" />
                Tareas de Organización del Día
              </h3>

              <div className="space-y-2 text-xs sm:text-sm">
                {/* Descongelar */}
                {activeDayPlan.prepAlert?.thaw && (
                  <div
                    onClick={() => handleTogglePrep(`day-${selectedDayNumber}-thaw`)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      prepChecks[`day-${selectedDayNumber}-thaw`]
                        ? 'bg-slate-50 border-slate-200 opacity-60 line-through'
                        : 'bg-blue-50/60 border-blue-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5">
                      <ThermometerSnowflake className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <strong className="block text-blue-950 font-bold">Descongelar en la nevera:</strong>
                      <span className="text-slate-700">{activeDayPlan.prepAlert.thaw}</span>
                    </div>
                  </div>
                )}

                {/* Remojar */}
                {activeDayPlan.prepAlert?.soak && (
                  <div
                    onClick={() => handleTogglePrep(`day-${selectedDayNumber}-soak`)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      prepChecks[`day-${selectedDayNumber}-soak`]
                        ? 'bg-slate-50 border-slate-200 opacity-60 line-through'
                        : 'bg-amber-50/70 border-amber-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Droplets className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <strong className="block text-amber-950 font-bold">Poner en remojo:</strong>
                      <span className="text-slate-700">{activeDayPlan.prepAlert.soak}</span>
                    </div>
                  </div>
                )}

                {/* Cocinar */}
                <div
                  onClick={() => handleTogglePrep(`day-${selectedDayNumber}-cook`)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    prepChecks[`day-${selectedDayNumber}-cook`]
                      ? 'bg-slate-50 border-slate-200 opacity-60 line-through'
                      : 'bg-emerald-50/60 border-emerald-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Utensils className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <strong className="block text-emerald-950 font-bold">Cocinar en la noche:</strong>
                    <span className="text-slate-700">
                      {activeDayPlan.prepAlert?.cook || 'Cocinar la cena de 4 porciones completas.'}
                    </span>
                  </div>
                </div>

                {/* Empacar */}
                <div
                  onClick={() => handleTogglePrep(`day-${selectedDayNumber}-pack`)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    prepChecks[`day-${selectedDayNumber}-pack`]
                      ? 'bg-slate-50 border-slate-200 opacity-60 line-through'
                      : 'bg-purple-50/60 border-purple-200 hover:border-purple-300'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 mt-0.5">
                    <PackageCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <strong className="block text-purple-950 font-bold">Empacar 2 almuerzos antes de cenar:</strong>
                    <span className="text-slate-700">
                      {activeDayPlan.prepAlert?.pack || 'Separar en recipientes herméticos limpios. Dejar entibiar y refrigerar antes de 2h.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 1: DESAYUNO RÁPIDO & BEBIDA */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5" />
                  Desayuno Nutritivo (Mañana)
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeDayPlan.breakfast.prepTime}
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  {activeDayPlan.breakfast.title}
                </h3>
                {activeDayPlan.breakfast.quickNote && (
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                    {activeDayPlan.breakfast.quickNote}
                  </p>
                )}
              </div>

              {/* Bebida Recomendada */}
              {activeDayPlan.beverage && (
                <div className="p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-200/90 text-emerald-950 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                      <Coffee className="w-4 h-4 text-emerald-700" />
                      Bebida sugerida:
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-white/80 px-2 py-0.5 rounded-md">
                      {activeDayPlan.beverage.quickPrep}
                    </span>
                  </div>
                  <p className="text-sm font-black text-emerald-900">
                    {activeDayPlan.beverage.name}
                  </p>
                  {activeDayPlan.beverage.healthNote && (
                    <p className="text-xs text-emerald-800/90 italic pt-0.5">
                      💡 {activeDayPlan.beverage.healthNote}
                    </p>
                  )}
                </div>
              )}

              {breakfastRecipe && (
                <button
                  onClick={() => setSelectedRecipe(breakfastRecipe)}
                  className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Ver preparación completa del desayuno</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* CARD 2: ALMUERZO EMPACADO (PREPARADO ANOCHE) */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200 flex items-center gap-1.5">
                  <PackageCheck className="w-3.5 h-3.5" />
                  Almuerzo al Trabajo (0 min cocción)
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg">
                  {activeDayPlan.lunch.isFreshOrPacked}
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  {activeDayPlan.lunch.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                  {activeDayPlan.lunch.packingTip}
                </p>
              </div>

              {activeDayPlan.lunch.reheatTip && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>
                    <strong>Instrucción de recalentado:</strong> {activeDayPlan.lunch.reheatTip}
                  </span>
                </div>
              )}

              {lunchRecipe && (
                <button
                  onClick={() => setSelectedRecipe(lunchRecipe)}
                  className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Consultar receta original del almuerzo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* CARD 3: CENA A COCINAR HOY (4 PORCIONES) */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-brand-500/80 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-white bg-brand-600 px-3 py-1 rounded-xl shadow-2xs flex items-center gap-1.5">
                  <ChefHat className="w-3.5 h-3.5" />
                  Cena a cocinar hoy (Noche)
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-600" />
                  {activeDayPlan.dinner.prepTime}
                </span>
              </div>

              {dinnerRecipe?.imageUrl && (
                <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden bg-slate-900">
                  <img
                    src={dinnerRecipe.imageUrl}
                    alt={activeDayPlan.dinner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                      Rinde 4 porciones completas
                    </span>
                    <h3 className="text-lg sm:text-xl font-black drop-shadow-xs leading-tight">
                      {activeDayPlan.dinner.title}
                    </h3>
                  </div>
                </div>
              )}

              {!dinnerRecipe?.imageUrl && (
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                    {activeDayPlan.dinner.title}
                  </h3>
                </div>
              )}

              {/* Tags of portion division and carb */}
              <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                <span className="bg-brand-50 text-brand-900 px-2.5 py-1 rounded-lg border border-brand-200">
                  🍽️ 2 porciones hoy
                </span>
                <span className="bg-blue-50 text-blue-900 px-2.5 py-1 rounded-lg border border-blue-200">
                  🍱 2 para almuerzo mañana
                </span>
                <span className="bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200">
                  🌾 {activeDayPlan.dinner.carbohydrate}
                </span>
              </div>

              {activeDayPlan.dinner.keyTip && (
                <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                  💡 <strong>Tip clave:</strong> {activeDayPlan.dinner.keyTip}
                </p>
              )}

              {/* Main Call to Action: Cocinar Ahora */}
              {dinnerRecipe && (
                <button
                  onClick={() => setSelectedRecipe(dinnerRecipe)}
                  className="w-full py-3.5 px-5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
                >
                  <Flame className="w-5 h-5 text-amber-300" />
                  <span>Cocinar cena ahora (Paso a paso & Timer)</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 2: PLAN QUINCENAL COMPLETO (14 DÍAS) */}
        {/* ========================================================== */}
        {activeTab === 'quincenal' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <WeekSelector
              availableWeeks={availableWeeks}
              selectedWeek={selectedWeek}
              onSelectWeek={setSelectedWeek}
            />

            <div className="space-y-3">
              {filteredDays.map((day) => {
                const isCompleted = household.completedDays.includes(day.dayNumber);

                return (
                  <DayCard
                    key={day.dayNumber}
                    day={day}
                    isCompleted={isCompleted}
                    onToggleComplete={() => {
                      toggleDayCompleted(day.dayNumber);
                      refreshState();
                    }}
                    onOpenRecipe={(recipeId) => {
                      const found = ALL_RECIPES.find((r) => r.id === recipeId);
                      if (found) setSelectedRecipe(found);
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          servingMultiplier={household.servingMultiplier || 1.0}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      <BottomNav />
    </div>
  );
}
