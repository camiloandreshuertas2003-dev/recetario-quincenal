'use client';

import React, { useState } from 'react';
import { MarketItem } from '@/types';
import { Check, Trash2, CalendarClock, Scale, DollarSign, Home, Edit3 } from 'lucide-react';

interface ShoppingItemRowProps {
  item: MarketItem;
  isChecked: boolean;
  checkedBy?: string;
  checkedAt?: string;
  realPriceCop?: number;
  realAmountBought?: string;
  inPantry?: boolean;
  onToggle: () => void;
  onDelete?: () => void;
  onUpdateRealData?: (data: { realPriceCop?: number; realAmountBought?: string }) => void;
  onTogglePantry?: () => void;
}

export const ShoppingItemRow: React.FC<ShoppingItemRowProps> = ({
  item,
  isChecked,
  checkedBy,
  checkedAt,
  realPriceCop,
  realAmountBought,
  inPantry = false,
  onToggle,
  onDelete,
  onUpdateRealData,
  onTogglePantry
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localPrice, setLocalPrice] = useState<string>(
    realPriceCop !== undefined && realPriceCop > 0 ? String(realPriceCop) : ''
  );
  const [localAmount, setLocalAmount] = useState<string>(realAmountBought || '');

  const handleSaveData = () => {
    if (onUpdateRealData) {
      const parsedPrice = localPrice.trim() ? parseInt(localPrice.replace(/\D/g, ''), 10) : undefined;
      onUpdateRealData({
        realPriceCop: parsedPrice,
        realAmountBought: localAmount.trim() || undefined
      });
    }
    setIsEditing(false);
  };

  return (
    <div
      className={`p-3.5 sm:p-4 rounded-2xl border transition-all select-none ${
        inPantry
          ? 'bg-amber-50/50 border-amber-200/80 opacity-80'
          : isChecked
          ? 'bg-slate-50 border-slate-200/80 opacity-75'
          : 'bg-white border-slate-200/80 hover:border-brand-400 shadow-2xs'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox (only if not in pantry) */}
        {!inPantry ? (
          <button
            type="button"
            onClick={onToggle}
            className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              isChecked
                ? 'bg-brand-600 border-brand-600 text-white shadow-xs'
                : 'border-slate-300 bg-white hover:border-brand-500'
            }`}
          >
            {isChecked && <Check className="w-4 h-4 stroke-[3px]" />}
          </button>
        ) : (
          <div className="w-7 h-7 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
            <Home className="w-4 h-4" />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <span
              onClick={!inPantry ? onToggle : undefined}
              className={`text-base sm:text-lg font-black cursor-pointer ${
                inPantry
                  ? 'text-amber-950 font-bold'
                  : isChecked
                  ? 'line-through text-slate-400'
                  : 'text-slate-900'
              }`}
            >
              {item.name}
            </span>

            {/* Buy Amount Badge */}
            <div className="flex items-center gap-1.5">
              <span
                className={`text-xs sm:text-sm font-black px-3 py-1 rounded-xl flex items-center gap-1 ${
                  inPantry
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : isChecked
                    ? 'bg-slate-200/70 text-slate-500'
                    : 'bg-brand-100 text-brand-950 border border-brand-300'
                }`}
              >
                {inPantry ? 'En despensa' : `Comprar: ${item.buyAmount}`}
              </span>

              {item.isCustom && onDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Eliminar ítem personalizado"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Details & Usage */}
          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs sm:text-sm text-slate-600 font-medium">
            <span className="flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-slate-400" />
              Receta: <strong className="text-slate-800">{item.calculatedUsage}</strong>
            </span>

            {item.unitConversion && (
              <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-md">
                {item.unitConversion}
              </span>
            )}

            {item.batch === 'dia8' && (
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-300">
                <CalendarClock className="w-3 h-3" />
                Tanda 2 (Día 8)
              </span>
            )}
          </div>

          {/* Notes */}
          {item.notes && (
            <p className="text-xs sm:text-sm mt-1 text-slate-700 italic">
              💡 {item.notes}
            </p>
          )}

          {/* Real Price & Real Grams Section */}
          <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span className="text-slate-500">
                Est: <strong className="text-slate-700 font-bold">${item.estimatedPriceCop?.toLocaleString('es-CO') || 0}</strong>
              </span>

              {realPriceCop !== undefined && realPriceCop > 0 && (
                <span className="bg-emerald-50 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded-lg font-black text-xs sm:text-sm flex items-center gap-0.5">
                  <DollarSign className="w-3 h-3" />
                  Pagado: ${realPriceCop.toLocaleString('es-CO')}
                </span>
              )}

              {realAmountBought && (
                <span className="bg-blue-50 text-blue-900 border border-blue-200 px-2 py-0.5 rounded-lg font-bold text-xs sm:text-sm">
                  Comprado: {realAmountBought}
                </span>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-1.5 ml-auto">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="px-2.5 py-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
                title="Editar precio y cantidad real comprada"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isEditing ? 'Cerrar' : 'Ajustar real'}</span>
              </button>

              {onTogglePantry && (
                <button
                  type="button"
                  onClick={onTogglePantry}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 ${
                    inPantry
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900'
                  }`}
                  title={inPantry ? 'Volver a incluir en la lista de compras' : 'Marcar que ya lo tienes en despensa'}
                >
                  <Home className="w-3 h-3" />
                  <span>{inPantry ? 'Ya en casa' : 'Tengo en casa'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Inline Edit Form for Real Price & Grams */}
          {isEditing && (
            <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Precio Real Pagado ($ COP):
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2 text-slate-400 text-xs font-bold">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={localPrice}
                      onChange={(e) => setLocalPrice(e.target.value)}
                      placeholder={String(item.estimatedPriceCop || 10000)}
                      className="w-full pl-6 pr-2.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Gramos / Cantidad Comprada:
                  </label>
                  <input
                    type="text"
                    value={localAmount}
                    onChange={(e) => setLocalAmount(e.target.value)}
                    placeholder="Ej. 920 g, 2 libras o 4 unid."
                    className="w-full px-2.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveData}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-xs"
                >
                  Guardar compra real
                </button>
              </div>
            </div>
          )}

          {/* Checked info */}
          {isChecked && (checkedBy || checkedAt) && (
            <p className="text-xs font-bold text-emerald-800 mt-2 flex items-center gap-1">
              <span>✓ Comprado por {checkedBy || 'un miembro'}</span>
              {checkedAt && <span className="opacity-75 font-normal font-mono">({checkedAt})</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
