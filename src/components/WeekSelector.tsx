'use client';

import React from 'react';
import { Calendar, Plus, Sparkles } from 'lucide-react';

interface WeekSelectorProps {
  availableWeeks: number[];
  selectedWeek: number | 'all';
  onSelectWeek: (week: number | 'all') => void;
  onAddNewWeek?: () => void;
  onOpenAddWeek?: () => void;
}

export const WeekSelector: React.FC<WeekSelectorProps> = ({
  availableWeeks,
  selectedWeek,
  onSelectWeek,
  onAddNewWeek,
  onOpenAddWeek
}) => {
  const handleAdd = onAddNewWeek || onOpenAddWeek;

  return (
    <div className="bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-2xs mb-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => onSelectWeek('all')}
          className={`px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
            selectedWeek === 'all'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Quincena Completa (14 días)
        </button>

        {availableWeeks.map((week) => (
          <button
            key={week}
            onClick={() => onSelectWeek(week)}
            className={`px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0 ${
              selectedWeek === week
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            Semana {week} {week === 1 ? '(Días 1–7)' : week === 2 ? '(Días 8–14)' : ''}
          </button>
        ))}

        {handleAdd && (
          <button
            onClick={handleAdd}
            className="px-3 py-2.5 rounded-xl text-sm font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors shrink-0 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir Semana</span>
          </button>
        )}
      </div>
    </div>
  );
};
