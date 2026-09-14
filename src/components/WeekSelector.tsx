'use client';

import React from 'react';
import { Calendar, Plus, Sparkles } from 'lucide-react';

interface WeekSelectorProps {
  availableWeeks: number[];
  selectedWeek: number | 'all';
  onSelectWeek: (week: number | 'all') => void;
  onAddNewWeek?: () => void;
}

export const WeekSelector: React.FC<WeekSelectorProps> = ({
  availableWeeks,
  selectedWeek,
  onSelectWeek,
  onAddNewWeek
}) => {
  return (
    <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-2xs mb-4">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => onSelectWeek('all')}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
            selectedWeek === 'all'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          Quincena Completa (14 días)
        </button>

        {availableWeeks.map((week) => (
          <button
            key={week}
            onClick={() => onSelectWeek(week)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedWeek === week
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
            }`}
          >
            Semana {week} {week === 1 ? '(Días 1–7)' : week === 2 ? '(Días 8–14)' : ''}
          </button>
        ))}

        {onAddNewWeek && (
          <button
            onClick={onAddNewWeek}
            className="px-2.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors shrink-0 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Añadir Semana</span>
          </button>
        )}
      </div>
    </div>
  );
};
