'use client';

import React from 'react';
import { DayMealPlan, Recipe } from '@/types';
import {
  Sun,
  Briefcase,
  Utensils,
  Clock,
  ArrowRight,
  CheckCircle2,
  Circle,
  Eye,
  Info
} from 'lucide-react';

interface DayCardProps {
  day: DayMealPlan;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onOpenRecipe: (recipeId: string) => void;
}

export const DayCard: React.FC<DayCardProps> = ({
  day,
  isCompleted,
  onToggleComplete,
  onOpenRecipe
}) => {
  return (
    <div
      className={`rounded-3xl border transition-all duration-200 overflow-hidden shadow-xs ${
        isCompleted
          ? 'bg-slate-50/90 border-slate-200 opacity-90'
          : 'bg-white border-slate-200/80 hover:border-brand-300'
      }`}
    >
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-slate-50 to-brand-50/30 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-brand-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
            {day.dayNumber}
          </span>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700">
              Semana {day.weekNumber}
            </span>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              {day.title}
            </h3>
          </div>
        </div>

        <button
          onClick={onToggleComplete}
          className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
            isCompleted
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
          title="Marcar día como cocinado / completado"
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Listo</span>
            </>
          ) : (
            <>
              <Circle className="w-3.5 h-3.5 text-slate-400" />
              <span>Pendiente</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 space-y-3.5 text-xs">
        {/* 1. DESAYUNO */}
        <div className="bg-amber-50/60 rounded-2xl p-3 border border-amber-200/50">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <Sun className="w-4 h-4 text-amber-600" />
              <span>Desayuno Exprés (2 personas)</span>
            </div>
            <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {day.breakfast.prepTime}
            </span>
          </div>
          <p className="font-semibold text-slate-800 text-xs sm:text-sm">
            {day.breakfast.title}
          </p>
          {day.breakfast.quickNote && (
            <p className="text-[11px] text-amber-900/80 mt-1 leading-snug">
              {day.breakfast.quickNote}
            </p>
          )}
          <button
            onClick={() => onOpenRecipe(day.breakfast.recipeId)}
            className="mt-2 text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 underline underline-offset-2"
          >
            <Eye className="w-3.5 h-3.5" />
            Ver preparación e ingredientes
          </button>
        </div>

        {/* 2. ALMUERZO */}
        <div className="bg-blue-50/50 rounded-2xl p-3 border border-blue-200/50">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 font-bold text-blue-900">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>Almuerzo (No se cocina)</span>
            </div>
            <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">
              {day.lunch.isFreshOrPacked}
            </span>
          </div>
          <p className="font-semibold text-slate-800 text-xs sm:text-sm">
            {day.lunch.title}
          </p>
          <p className="text-[11px] text-blue-900/80 mt-1 leading-relaxed">
            {day.lunch.packingTip}
          </p>
        </div>

        {/* 3. CENA */}
        <div className="bg-emerald-50/60 rounded-2xl p-3.5 border border-emerald-200/60">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 font-bold text-emerald-950">
              <Utensils className="w-4 h-4 text-brand-600" />
              <span>Cena (Cocinar esta noche)</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {day.dinner.prepTime}
            </span>
          </div>

          <p className="font-extrabold text-slate-900 text-sm sm:text-base">
            {day.dinner.title}
          </p>

          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
            <span className="text-[10px] bg-white border border-emerald-300/80 text-emerald-900 font-bold px-2 py-0.5 rounded-md">
              4 porciones: 2 cenan hoy + 2 mañana
            </span>
            <span className="text-[10px] bg-emerald-100/80 text-emerald-900 font-medium px-2 py-0.5 rounded-md">
              🌾 {day.dinner.carbohydrate}
            </span>
          </div>

          {day.dinner.keyTip && (
            <p className="text-[11px] text-emerald-900/90 mt-2 italic flex items-start gap-1">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-brand-700" />
              <span>{day.dinner.keyTip}</span>
            </p>
          )}

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-emerald-200/60">
            <button
              onClick={() => onOpenRecipe(day.dinner.recipeId)}
              className="text-xs font-bold text-brand-800 hover:text-brand-950 bg-white hover:bg-emerald-50 border border-brand-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-brand-600" />
              Ver Receta de Cena y Gramos
            </button>
            <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
              <span>Almuerzo mañana</span>
              <ArrowRight className="w-3 h-3 text-brand-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
