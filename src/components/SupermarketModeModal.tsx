'use client';

import React, { useState } from 'react';
import { MarketItem } from '@/types';
import { X, Check, ShoppingBag, CheckCircle2, Eye, EyeOff } from 'lucide-react';

interface SupermarketModeModalProps {
  items: MarketItem[];
  checkedItems: Record<string, { checked: boolean; checkedBy: string; checkedAt: string }>;
  onToggleItem?: (id: string) => void;
  onToggle?: (id: string) => void;
  onClose: () => void;
}

export const SupermarketModeModal: React.FC<SupermarketModeModalProps> = ({
  items,
  checkedItems,
  onToggleItem,
  onToggle,
  onClose
}) => {
  const toggleHandler = onToggle || onToggleItem || (() => {});
  const [showPendingOnly, setShowPendingOnly] = useState(true);

  const completedCount = items.filter((i) => checkedItems[i.id]?.checked).length;
  const totalCount = items.length;
  const pendingCount = totalCount - completedCount;

  const displayItems = showPendingOnly
    ? items.filter((i) => !checkedItems[i.id]?.checked)
    : items;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col text-white animate-in fade-in select-none">
      {/* Top Bar */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-brand-500 text-slate-950 flex items-center justify-center font-bold">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white leading-none">
              Modo Supermercado
            </h3>
            <p className="text-[11px] text-brand-400 mt-0.5 font-bold">
              Faltan {pendingCount} de {totalCount} productos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPendingOnly(!showPendingOnly)}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition-colors flex items-center gap-1 ${
              showPendingOnly
                ? 'bg-brand-600/30 border-brand-500 text-brand-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {showPendingOnly ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showPendingOnly ? 'Solo faltantes' : 'Ver todos'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Big Items List for One-Handed Tapping */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {displayItems.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <CheckCircle2 className="w-16 h-16 text-brand-400 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-white">
              ¡Mercado Completado!
            </h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Ya compraste todos los productos pendientes de la quincena.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl"
            >
              Salir del modo compra
            </button>
          </div>
        ) : (
          displayItems.map((item) => {
            const isChecked = !!checkedItems[item.id]?.checked;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleHandler(item.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all active:scale-[0.98] flex items-center justify-between gap-3 ${
                  isChecked
                    ? 'bg-slate-900/60 border-slate-800/80 opacity-50'
                    : 'bg-slate-900 border-slate-800 hover:border-brand-500 shadow-sm'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-base sm:text-lg font-black block leading-snug ${
                      isChecked ? 'line-through text-slate-500' : 'text-white'
                    }`}
                  >
                    {item.name}
                  </span>

                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className="text-xs sm:text-sm font-black text-brand-300 font-mono bg-brand-950/60 px-2 py-0.5 rounded-md border border-brand-800/60">
                      Comprar: {item.buyAmount}
                    </span>
                    {item.notes && (
                      <span className="text-xs text-slate-300">
                        • {item.notes}
                      </span>
                    )}
                  </div>
                </div>

                {/* Big touch target check box */}
                <div
                  className={`w-9 h-9 rounded-2xl border-2 flex items-center justify-center shrink-0 transition-all ${
                    isChecked
                      ? 'bg-brand-500 border-brand-500 text-slate-950'
                      : 'border-slate-700 bg-slate-800'
                  }`}
                >
                  {isChecked && <Check className="w-5 h-5 stroke-[3px]" />}
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Footer Bar */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span>Toca cualquier producto con el pulgar para marcarlo</span>
        <button
          onClick={onClose}
          className="font-bold text-brand-400 hover:underline"
        >
          Volver
        </button>
      </div>
    </div>
  );
};
