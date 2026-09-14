'use client';

import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';

interface AddWeekModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWeek: (weekNumber: number, daysCount: number) => void;
  nextWeekNumber: number;
}

export const AddWeekModal: React.FC<AddWeekModalProps> = ({
  isOpen,
  onClose,
  onAddWeek,
  nextWeekNumber
}) => {
  const [daysCount, setDaysCount] = useState(7);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Añadir Semana {nextWeekNumber}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs text-slate-600">
          <p>
            Puedes extender el plan agregando una nueva semana de planificación de comidas para el hogar.
          </p>

          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Número de días a planificar:
            </label>
            <div className="flex items-center gap-2">
              {[5, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDaysCount(num)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    daysCount === num
                      ? 'bg-brand-600 border-brand-600 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {num} Días {num === 5 ? '(Lunes a Viernes)' : '(Semana Completa)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onAddWeek(nextWeekNumber, daysCount);
              onClose();
            }}
            className="px-4 py-2 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Crear Semana {nextWeekNumber}
          </button>
        </div>
      </div>
    </div>
  );
};
