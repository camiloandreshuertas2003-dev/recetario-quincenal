'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getCurrentSession,
  getHouseholdState,
  toggleDayCompleted,
  updateStartDate,
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
  Settings2
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

    // Check splash
    if (typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('recetario_splash_seen');
      if (!seen) {
        setShowSplash(true);
        sessionStorage.setItem('recetario_splash_seen', 'true');
      }
    }

    const handleStateChange = () => {
      setHousehold(getHouseholdState());
    };
    const handleSessionChange = () => {
      setCurrentUser(getCurrentSession());
    };

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
        title: `Día ${currentDay}: Plan Personalizado`,
        breakfast: {
          title: 'Desayuno exprés a elección',
          prepTime: '5 min',
          recipeId: 'desayuno-1',
          quickNote: 'Yogur con avena o arepa con huevo.'
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

  return (
    <div className="flex-1 flex flex-col">
      {/* Animated Splash Screen on app launch */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      <TopHeader user={currentUser} onLogout={handleLogout} />

      <main className="flex-1 px-4 py-4 space-y-4">
        {/* PWA Install Banner */}
        <PwaInstallBanner />

        {/* Banner de Bienvenida y Principios del Plan */}
        <div className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-emerald-900 text-white p-4 sm:p-5 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-200 tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sistema Ahorro de Tiempo y Dinero</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black leading-tight">
              Recetario Quincenal para 2
            </h2>
            <p className="text-xs text-brand-100 mt-1 leading-relaxed">
              <strong>Regla clave:</strong> Cocina 4 porciones en la cena. Se comen 2 hoy y se refrigeran 2 para el almuerzo de mañana. ¡El almuerzo nunca se cocina en la mañana!
            </p>

            {/* Micro stats & Calendar Start Date Toggle */}
            <div className="mt-3 pt-3 border-t border-brand-600/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-warm-400" />
                <span>
                  Progreso: <strong>{completedCount} de {totalDays} días</strong>
                </span>
              </div>

              <button
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className="flex items-center gap-1 font-bold bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-full text-[11px] transition-colors"
                title="Ajustar fecha de inicio del menú"
              >
                <Calendar className="w-3 h-3 text-warm-300" />
                <span>Fecha Inicio</span>
              </button>
            </div>

            {/* Date Picker Drawer */}
            {isDatePickerOpen && (
              <div className="mt-3 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <label className="font-semibold text-brand-100">
                    Fecha de arranque de la quincena:
                  </label>
                  <input
                    type="date"
                    value={household.startDate || ''}
                    onChange={handleStartDateChange}
                    className="bg-white text-slate-900 px-2 py-1 rounded-xl text-xs font-bold font-mono focus:outline-none"
                  />
                </div>
                <p className="text-[10px] text-brand-200 mt-1">
                  Los 14 días se calcularán a partir de esta fecha en tus tarjetas diarias.
                </p>
              </div>
            )}
          </div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Acordeón: Rutina Diaria Recomendada */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
          <button
            onClick={() => setIsRoutineOpen(!isRoutineOpen)}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-warm-100 text-warm-800 flex items-center justify-center font-bold text-xs">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Rutina Diaria Recomendada
                </h4>
                <p className="text-[11px] text-slate-500">
                  Paso a paso de 4 momentos para ahorrar hasta 2 horas al día
                </p>
              </div>
            </div>
            {isRoutineOpen ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {isRoutineOpen && (
            <div className="px-3.5 pb-4 pt-1 border-t border-slate-100 space-y-2.5">
              {DAILY_ROUTINE.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs"
                >
                  <span className="font-bold text-brand-700 w-24 shrink-0">
                    {item.moment}:
                  </span>
                  <div className="flex-1 text-slate-700">
                    <p>{item.action}</p>
                    <span className="text-[10px] text-amber-700 font-bold bg-amber-100/70 px-1.5 py-0.2 rounded inline-block mt-1">
                      ⏱ {item.estimatedTime}
                    </span>
                  </div>
                </div>
              ))}

              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200/60 text-[11px] text-blue-900 space-y-1 mt-2">
                <p>
                  🥗 <strong>ICBF:</strong> Alimentación con alimentos frescos y variados; leguminosas al menos dos veces por semana.
                </p>
                <p>
                  🧊 <strong>USDA FSIS:</strong> Refrigera antes de 2 horas en recipientes poco profundos con tapa.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Selector de Semanas */}
        <WeekSelector
          availableWeeks={availableWeeks}
          selectedWeek={selectedWeek}
          onSelectWeek={setSelectedWeek}
          onAddNewWeek={() => setIsAddWeekOpen(true)}
        />

        {/* Listado de Días con Fechas Dinámicas */}
        <div className="space-y-3.5">
          {filteredPlans.map((day) => (
            <DayCard
              key={day.dayNumber}
              day={day}
              startDate={household.startDate}
              isCompleted={household.completedDays.includes(day.dayNumber)}
              onToggleComplete={() => handleToggleDay(day.dayNumber)}
              onOpenRecipe={handleOpenRecipe}
            />
          ))}
        </div>
      </main>

      {/* Modal de Detalle de Receta con Fotos e IA */}
      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />

      {/* Modal para Añadir Semana */}
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
