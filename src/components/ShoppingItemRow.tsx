'use client';

import React from 'react';
import { MarketItem } from '@/types';
import { Check, Trash2, CalendarClock, Scale } from 'lucide-react';

interface ShoppingItemRowProps {
  item: MarketItem;
  isChecked: boolean;
  checkedBy?: string;
  checkedAt?: string;
  onToggle: () => void;
  onDelete?: () => void;
}

export const ShoppingItemRow: React.FC<ShoppingItemRowProps> = ({
  item,
  isChecked,
  checkedBy,
  checkedAt,
  onToggle,
  onDelete
}) => {
  return (
    <div
      onClick={onToggle}
      className={`p-3 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
        isChecked
          ? 'bg-slate-50 border-slate-200/80 opacity-75'
          : 'bg-white border-slate-200/80 hover:border-brand-300 shadow-2xs'
      }`}
    >
      {/* Checkbox */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
          isChecked
            ? 'bg-brand-600 border-brand-600 text-white'
            : 'border-slate-300 bg-white hover:border-brand-500'
        }`}
      >
        {isChecked && <Check className="w-4 h-4 stroke-[3px]" />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <span
            className={`text-sm sm:text-base font-black ${
              isChecked ? 'line-through text-slate-400' : 'text-slate-900'
            }`}
          >
            {item.name}
          </span>

          <span
            className={`text-xs sm:text-sm font-extrabold px-3 py-1 rounded-xl ${
              isChecked
                ? 'bg-slate-200/60 text-slate-500'
                : 'bg-brand-100 text-brand-950 border border-brand-300'
            }`}
          >
            Comprar: {item.buyAmount}
          </span>
        </div>

        {/* Calculated usage */}
        <div className="flex flex-wrap items-center gap-2.5 mt-1.5 text-xs sm:text-sm text-slate-600 font-medium">
          <span className="flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-slate-400" />
            Uso receta: <strong className="text-slate-800">{item.calculatedUsage}</strong>
          </span>

          {item.batch === 'dia8' && (
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-300">
              <CalendarClock className="w-3 h-3" />
              Tanda 2 (Día 8)
            </span>
          )}
        </div>

        {/* Custom notes or packing tips */}
        {item.notes && (
          <p
            className={`text-xs sm:text-sm mt-1.5 italic ${
              isChecked ? 'text-slate-400' : 'text-slate-700 font-medium'
            }`}
          >
            💡 {item.notes}
          </p>
        )}

        {/* Who bought it */}
        {isChecked && (checkedBy || checkedAt) && (
          <p className="text-xs font-bold text-emerald-800 mt-1.5 flex items-center gap-1">
            <span>✓ Comprado por {checkedBy || 'un miembro'}</span>
            {checkedAt && <span className="opacity-75 font-normal font-mono">({checkedAt})</span>}
          </p>
        )}
      </div>

      {/* Delete custom item */}
      {item.isCustom && onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          title="Eliminar ítem personalizado"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
