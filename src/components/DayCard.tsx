'use client';

import React from 'react';
import { DayMealPlan } from '@/types';
import { calculateDateForDay } from '@/lib/storage';
import {
  Sun,
  Briefcase,
  Utensils,
  Clock,
  ArrowRight,
  CheckCircle2,
  Circle,
  Eye,
  Info,
  Calendar,
  Sparkles,
  Flame
} from 'lucide-react';

interface DayCardProps {
  day: DayMealPlan;
  startDate?: string;
  servingMultiplier?: number;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onOpenRecipe: (recipeId: string) => void;
}

export const DayCard: React.FC<DayCardProps> = ({
  day,
  startDate,
  servingMultiplier = 1.0,
  isCompleted,
  onToggleComplete,
  onOpenRecipe
}) => {
  const dateInfo = calculateDateForDay(day.dayNumber, startDate);
  const scaledPortions = Math.round(day.dinner.yieldPortions * servingMultiplier);

  return (
    <div
      className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
        dateInfo.isToday
          ? 'ring-2 ring-brand-500 shadow-xl shadow-brand-500/15 border-brand-400 bg-white'
          : isCompleted
          ? 'bg-slate-50/90 border-slate-200 opacity-95'
          : 'bg-white border-slate-200/90 hover:border-brand-300 shadow-xs'
      }`}
    >
      {/* Header with Day Number, Today Badge and Calendar Date */}
      <div
        className={`p-4 sm:p-5 border-b flex items-center justify-between gap-2 flex-wrap ${
          dateInfo.isToday
            ? 'bg-gradient-to-r from-brand-600/10 via-brand-50 to-warm-50/40 border-brand-200'
            : 'bg-gradient-to-r from-slate-50 to-brand-50/20 border-slate-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`w-11 h-11 rounded-2xl font-black text-base flex items-center justify-center shadow-xs transition-transform shrink-0 ${
              dateInfo.isToday
                ? 'bg-brand-600 text-white scale-105 animate-pulse'
                : 'bg-slate-800 text-white'
            }`}
          >
            {day.dayNumber}
          </span>
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-brand-700 flex-wrap">
              {dateInfo.isToday ? (
                <span className="bg-brand-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3 h-3" />
                  ¡TOCA COCINAR HOY!
                </span>
              ) : (
                <span>Semana {day.weekNumber}</span>
              )}
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-700 font-bold lowercase first-letter:capitalize">
                <Calendar className="w-3.5 h-3.5 text-brand-600" />
                {dateInfo.formattedDate}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug mt-0.5">
              {day.title}
            </h3>
          </div>
        </div>

        <button
          onClick={onToggleComplete}
          className={`flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-2xl transition-colors ${
            isCompleted
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
          }`}
          title="Marcar día como cocinado / completado"
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Cocinado</span>
            </>
          ) : (
            <>
              <Circle className="w-4 h-4 text-slate-400" />
              <span>Pendiente</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* 1. DESAYUNO */}
        <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 font-black text-amber-950 text-sm sm:text-base">
              <Sun className="w-4 h-4 text-amber-600" />
              <span>Desayuno Exprés (2 personas)</span>
            </div>
            <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {day.breakfast.prepTime}
            </span>
          </div>
          <p className="font-extrabold text-slate-900 text-sm sm:text-base">
            {day.breakfast.title}
          </p>
          {day.breakfast.quickNote && (
            <p className="text-xs sm:text-sm text-amber-950/80 mt-1 leading-relaxed font-medium">
              {day.breakfast.quickNote}
            </p>
          )}
          <button
            onClick={() => onOpenRecipe(day.breakfast.recipeId)}
            className="mt-2.5 text-xs sm:text-sm font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 underline underline-offset-2"
          >
            <Eye className="w-4 h-4" />
            Ver ingredientes y preparación
          </button>
        </div>

        {/* 2. ALMUERZO */}
        <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-200/80">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 font-black text-blue-950 text-sm sm:text-base">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>Almuerzo (No se cocina en la mañana)</span>
            </div>
            <span className="text-xs font-bold text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-full">
              {day.lunch.isFreshOrPacked}
            </span>
          </div>
          <p className="font-extrabold text-slate-900 text-sm sm:text-base">
            {day.lunch.title}
          </p>
          <p className="text-xs sm:text-sm text-blue-950/80 mt-1 leading-relaxed font-medium">
            {day.lunch.packingTip}
          </p>

          {/* Botón de receta para el almuerzo del Día 1 */}
          {day.lunch.recipeId && (
            <button
              onClick={() => onOpenRecipe(day.lunch.recipeId!)}
              className="mt-2.5 text-xs sm:text-sm font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1 underline underline-offset-2"
            >
              <Eye className="w-4 h-4" />
              Ver receta del Sándwich (5 min)
            </button>
          )}
        </div>

        {/* 3. CENA */}
        <div className="bg-emerald-50/70 rounded-2xl p-4 sm:p-5 border border-emerald-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-black text-emerald-950 text-sm sm:text-base">
              <Utensils className="w-4 h-4 text-brand-600" />
              <span>Cena (Cocinar esta noche)</span>
            </div>
            <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {day.dinner.prepTime}
            </span>
          </div>

          <p className="font-black text-slate-900 text-base sm:text-lg leading-snug">
            {day.dinner.title}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-xs sm:text-sm bg-white border border-emerald-300 text-emerald-950 font-extrabold px-2.5 py-1 rounded-xl shadow-2xs">
              {scaledPortions} porciones {servingMultiplier === 1.0 ? '(2 hoy + 2 mañana)' : `(${servingMultiplier}x)`}
            </span>
            <span className="text-xs sm:text-sm bg-emerald-100 text-emerald-950 font-bold px-2.5 py-1 rounded-xl">
              🌾 {day.dinner.carbohydrate}
            </span>
          </div>

          {day.dinner.keyTip && (
            <p className="text-xs sm:text-sm text-emerald-950 mt-2.5 flex items-start gap-1.5 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-emerald-200/80">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-brand-700" />
              <span className="font-medium">{day.dinner.keyTip}</span>
            </p>
          )}

          <div className="mt-4 flex items-center justify-between pt-3 border-t border-emerald-200/80 flex-wrap gap-2">
            <button
              onClick={() => onOpenRecipe(day.dinner.recipeId)}
              className="text-xs sm:text-sm font-extrabold text-brand-800 hover:text-brand-950 bg-white hover:bg-emerald-50 border border-brand-300 px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Eye className="w-4 h-4 text-brand-600" />
              Ver Receta, Foto y Temporizador
            </button>
            <div className="text-xs font-bold text-slate-600 flex items-center gap-1">
              <span>Almuerzo mañana</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
