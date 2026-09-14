'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getCurrentSession,
  getHouseholdState,
  toggleDayCompleted,
  updateStartDate,
  getTodayDayNumber,
  logoutUser
} from '@/lib/storage';
import { User, Recipe, DayMealPlan } from '@/types';
import { TopHeader } from '@/components/TopHeader';
import { BottomNav } from '@/components/BottomNav';
import { WeekSelector } from '@/components/WeekSelector';
import { DayCard } from '@/components/DayCard';
import { RecipeModal } from '@/components/RecipeModal';
import { AddWeekModal } from '@/components/AddWeekModal';
import { SplashScreen } from '@/components/SplashScreen';
import { PwaInstallBanner } from '@/components/PwaInstallBanner';
import { MEAL_PLAN_14_DAYS, DAILY_ROUTINE } from '@/data/mealPlanData';
import { RECIPES } from '@/data/recipesData';
import { SHOPPING_LIST_INITIAL } from '@/data/shoppingData';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  CalendarCheck,
  Calendar,
  Flame,
  ArrowRight,
  Utensils,
  ShieldCheck,
  Salad
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [household, setHousehold] = useState(getHouseholdState());
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>(1);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isRoutineOpen, setIsRoutineOpen] = useState(false);
  const [isAddWeekOpen, setIsAddWeekOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [allPlans, setAllPlans] = useState<DayMealPlan[]>(MEAL_PLAN_14_DAYS);
  const [availableWeeks, setAvailableWeeks] = useState<number[]>([1, 2]);

  const refreshState = () => {
    const session = getCurrentSession();
    setCurrentUser(session);
    setHousehold(getHouseholdState());
  };

  useEffect(() => {
    refreshState();

    if (typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('nuestro_menu_splash_seen');
      if (!seen) {
        setShowSplash(true);
        sessionStorage.setItem('nuestro_menu_splash_seen', 'true');
      }
    }

    const handleStateChange = () => setHousehold(getHouseholdState());
    const handleSessionChange = () => setCurrentUser(getCurrentSession());

    window.addEventListener('recetario_state_changed', handleStateChange);
    window.addEventListener('recetario_session_changed', handleSessionChange);

    return () => {
      window.removeEventListener('recetario_state_changed', handleStateChange);
      window.removeEventListener('recetario_session_changed', handleSessionChange);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    router.push('/login');
  };

  const handleOpenRecipe = (recipeId: string) => {
    const found = RECIPES.find((r) => r.id === recipeId);
    if (found) {
      setSelectedRecipe(found);
    }
  };

  const handleToggleDay = (dayNumber: number) => {
    toggleDayCompleted(dayNumber);
    setHousehold(getHouseholdState());
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStartDate(e.target.value);
    setHousehold(getHouseholdState());
  };

  const handleAddWeek = (weekNumber: number, daysCount: number) => {
    if (!availableWeeks.includes(weekNumber)) {
      setAvailableWeeks((prev) => [...prev, weekNumber]);
    }
    const startDay = (weekNumber - 1) * 7 + 1;
    const newDays: DayMealPlan[] = Array.from({ length: daysCount }).map((_, idx) => {
      const currentDay = startDay + idx;
      return {
        dayNumber: currentDay,
        weekNumber: weekNumber,
        title: `Día ${currentDay}: Plan Extendido`,
        breakfast: {
          title: 'Desayuno exprés a elección',
          prepTime: '5 min',
          recipeId: 'desayuno-1',
          quickNote: 'Arepa con huevos pericos o avena remojada.'
        },
        lunch: {
          title: `Almuerzo empacado (Cena Día ${currentDay - 1})`,
          sourceDinnerDay: currentDay - 1,
          isFreshOrPacked: 'Empacado anoche',
          packingTip: 'Recalentar en microondas; llevar ensalada fresca por separado.'
        },
        dinner: {
          title: 'Cena casera colombiana (4 porciones)',
          yieldPortions: 4,
          eatPortions: 2,
          packPortions: 2,
          prepTime: '35–45 min',
          recipeId: 'cena-dia-1',
          carbohydrate: 'Arroz pequeño o tubérculo',
          keyTip: 'Comer 2 porciones hoy y guardar 2 para el almuerzo de mañana.'
        },
        nextDayLunch: {
          title: 'Almuerzo listo para mañana',
          note: 'Empacar en refractaria poco profunda.'
        }
      };
    });

    setAllPlans((prev) => [...prev, ...newDays]);
    setSelectedWeek(weekNumber);
  };

  const filteredPlans =
    selectedWeek === 'all'
      ? allPlans
      : allPlans.filter((p) => p.weekNumber === selectedWeek);

  const completedCount = household.completedDays.length;
  const totalDays = allPlans.length;
  const progressPercent = Math.round((completedCount / totalDays) * 100);

  const totalMarketItems = SHOPPING_LIST_INITIAL.length + (household.customItems?.length || 0);
  const checkedMarketCount = Object.keys(household.checkedItems || {}).length;
  const pendingMarketCount = Math.max(0, totalMarketItems - checkedMarketCount);

  // Identify today's day plan
  const todayDayNumber = getTodayDayNumber(household.startDate);
  const todayPlan = allPlans.find((p) => p.dayNumber === todayDayNumber) || allPlans[0];

  return (
    <div className="flex-1 flex flex-col">
      {/* Animated Splash Screen */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      <TopHeader
        user={currentUser}
        servingMultiplier={household.servingMultiplier || 1.0}
        onLogout={handleLogout}
        onRefresh={refreshState}
      />

      <main className="flex-1 px-3 sm:px-5 py-4 space-y-4">
        {/* PWA Install Banner */}
        <PwaInstallBanner />

        {/* Smart 'Today' Highlight Card */}
        {todayPlan && (
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-brand-950 text-white p-5 shadow-xl border border-brand-500/30 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-brand-400 uppercase tracking-wider">
                <Flame className="w-4 h-4 text-warm-400" />
                <span>Hoy en Nuestro menú</span>
              </div>
              <span className="text-xs font-black bg-brand-500/20 text-brand-300 border border-brand-500/30 px-3 py-1 rounded-full">
                Día {todayPlan.dayNumber} de {totalDays}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black leading-snug">
              {todayPlan.dinner.title}
            </h3>

            <div className="flex flex-wrap items-center gap-2.5 mt-2.5 text-xs sm:text-sm text-slate-300 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {todayPlan.dinner.prepTime}
              </span>
              <span>•</span>
              <span className="text-brand-300 font-bold">
                4 porciones: 2 cena + 2 almuerzo
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/70 flex items-center justify-between flex-wrap gap-2">
              <button
                onClick={() => handleOpenRecipe(todayPlan.dinner.recipeId)}
                className="text-xs sm:text-sm font-black text-slate-950 bg-brand-400 hover:bg-brand-300 px-4 py-2 rounded-2xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Utensils className="w-4 h-4" />
                <span>Cocinar ahora</span>
              </button>

              <span className="text-xs text-slate-400 font-semibold">
                Almuerzo de mañana asegurado ✓
              </span>
            </div>
          </div>
        )}

        {/* Banner Quincenal & Principios Nutricionales */}
        <div className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-emerald-900 text-white p-5 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-brand-200 tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Plan Profesional Quincenal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black leading-tight">
              Nuestro menú para 2 personas
            </h2>
            <p className="text-sm text-brand-100 mt-1.5 leading-relaxed">
              Cenas variadas que resuelven el almuerzo de mañana: pollo, res, pescado, camarones, huevo y leguminosas. ¡Cero cocina en la mañana!
            </p>

            {/* Micro stats & Calendar Start Date Toggle */}
            <div className="mt-4 pt-3 border-t border-brand-600/60 flex items-center justify-between text-xs sm:text-sm flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-warm-300" />
                <span className="font-bold">
                  {completedCount} de {totalDays} días cocinados ({progressPercent}%)
                </span>
              </div>

              <button
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl font-bold transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Fecha Inicio</span>
              </button>
            </div>

            {/* Start Date Picker Dropdown */}
            {isDatePickerOpen && (
              <div className="mt-3 p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 animate-in slide-in-from-top-2">
                <label className="block text-xs font-bold text-brand-200 mb-1">
                  Selecciona la fecha en que inicias la quincena:
                </label>
                <input
                  type="date"
                  value={household.startDate || ''}
                  onChange={handleStartDateChange}
                  className="bg-white text-slate-900 px-3 py-2 rounded-xl text-sm font-bold w-full focus:outline-none"
                />
              </div>
            )}
          </div>

          <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Guía Nutricional & Operativa (MinSalud / USDA) */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-3">
          <button
            onClick={() => setIsRoutineOpen(!isRoutineOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-brand-100 text-brand-800 flex items-center justify-center font-black">
                <Salad className="w-5 h-5 text-brand-700" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-sm sm:text-base">
                  Guía de Porciones y Seguridad
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Regla de la mitad del plato (MinSalud) y empaque seguro (USDA)
                </p>
              </div>
            </div>
            <div className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
              {isRoutineOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          {isRoutineOpen && (
            <div className="pt-3 border-t border-slate-100 space-y-3.5 text-xs sm:text-sm text-slate-700 animate-in fade-in leading-relaxed">
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1.5">
                <p className="font-extrabold text-emerald-950 flex items-center gap-1.5">
                  <Salad className="w-4 h-4 text-emerald-700" />
                  Estructura del Plato (MinSalud):
                </p>
                <p className="text-xs sm:text-sm text-emerald-950 font-medium">
                  • <strong>Verduras:</strong> la mitad del plato, la parte más abundante.<br />
                  • <strong>Proteína:</strong> pollo, res, pescado, camarón, huevo o leguminosas.<br />
                  • <strong>Carbohidrato moderado:</strong> una sola fuente principal (arroz, papa, yuca, plátano, arepa o mazorca; no mezcles varios en exceso).<br />
                  • <strong>Grasa y sabor:</strong> aguacate, limón, ajo, hierbas y hogao casero.
                </p>
              </div>

              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-1.5">
                <p className="font-extrabold text-blue-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  Seguridad y Empaque (USDA FSIS):
                </p>
                <p className="text-xs sm:text-sm text-blue-950 font-medium">
                  • Separa las 2 porciones de almuerzo antes de comenzar a cenar.<br />
                  • Refrigera antes de 2 horas desde la cocción en recipientes herméticos poco profundos.<br />
                  • Calientes juntos: arroz, carnes, pollo, pescado y guiso. Fríos y aparte: ensaladas, pepino y aguacate.<br />
                  • Recalienta hasta que humee en el centro (referencia de seguridad: 74 °C).
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <p className="font-extrabold text-slate-900 text-sm">Rutina Diaria Recomendada:</p>
                {DAILY_ROUTINE.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="font-black text-brand-700 text-sm min-w-[20px]">{idx + 1}.</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{step.moment}</span>
                        <span className="text-xs text-slate-500 font-bold">{step.estimatedTime}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{step.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Week Selector Bar */}
        <WeekSelector
          selectedWeek={selectedWeek}
          availableWeeks={availableWeeks}
          onSelectWeek={setSelectedWeek}
          onOpenAddWeek={() => setIsAddWeekOpen(true)}
        />

        {/* Days List Grid */}
        <div className="space-y-4">
          {filteredPlans.map((day) => (
            <DayCard
              key={day.dayNumber}
              day={day}
              startDate={household.startDate}
              servingMultiplier={household.servingMultiplier || 1.0}
              isCompleted={household.completedDays.includes(day.dayNumber)}
              onToggleComplete={() => handleToggleDay(day.dayNumber)}
              onOpenRecipe={handleOpenRecipe}
            />
          ))}
        </div>
      </main>

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        servingMultiplier={household.servingMultiplier || 1.0}
        onClose={() => setSelectedRecipe(null)}
      />

      {/* Add Week Modal */}
      <AddWeekModal
        isOpen={isAddWeekOpen}
        onClose={() => setIsAddWeekOpen(false)}
        onAddWeek={handleAddWeek}
        nextWeekNumber={availableWeeks.length + 1}
      />

      <BottomNav pendingMarketCount={pendingMarketCount} />
    </div>
  );
}
