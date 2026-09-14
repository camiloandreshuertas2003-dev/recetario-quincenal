'use client';

import React, { useState } from 'react';
import { MarketItem } from '@/types';
import { X, TrendingDown, Sparkles } from 'lucide-react';

interface ProductDetailModalProps {
  item: MarketItem;
  onClose: () => void;
  onUpdateItem?: (updated: { realPriceCop?: number; realAmountBought?: string; inPantry?: boolean }) => void;
}

const COMMON_SUBSTITUTIONS: Record<
  string,
  { name: string; approxPrice: number; benefit: string }[]
> = {
  'Pechuga o contramuslos sin piel': [
    { name: 'Muslo de pollo campesino', approxPrice: 9500, benefit: 'Más económico y jugoso para sudados y arroz.' },
    { name: 'Pernil de pollo entero', approxPrice: 10200, benefit: 'Aporta excelente sabor y ahorras hasta $4.800.' }
  ],
  'Muslos o contramuslos de pollo': [
    { name: 'Alas de pollo en guiso', approxPrice: 10000, benefit: 'Opción económica de cocción rápida.' },
    { name: 'Pollo entero troceado', approxPrice: 9000, benefit: 'El corte más rendidor por libra en plaza.' }
  ],
  'Filetes de pescado blanco (tilapia, basa o merluza)': [
    { name: 'Trucha fresca local', approxPrice: 18000, benefit: 'Proteína fresca nacional de alto valor biológico.' },
    { name: 'Filete de basa congelado', approxPrice: 14000, benefit: 'La opción más económica para cocinar a la plancha.' }
  ],
  'Camarones crudos limpios o precocidos congelados': [
    { name: 'Huevos de gallina + calamar', approxPrice: 12000, benefit: 'Ahorro sustancial con buena textura marina.' },
    { name: 'Filete de tilapia en cubos', approxPrice: 13000, benefit: 'Misma técnica al ajillo con $9.000 de ahorro.' }
  ],
  'Carne de res para posta / guisar (paletero o murillo)': [
    { name: 'Murillo de res', approxPrice: 22000, benefit: 'Corte ideal para cocción lenta que ablanda delicioso.' },
    { name: 'Bola o tabla de res', approxPrice: 24000, benefit: 'Carne magra fácil de tajear en salsa criolla.' }
  ]
};

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  onClose,
  onUpdateItem
}) => {
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const substitutions = COMMON_SUBSTITUTIONS[item.name] || [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
        
        {/* Header */}
        <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between shadow-2xs shrink-0">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Detalle del producto
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Product Hero Info */}
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-200/80 flex items-center justify-center text-2xl shadow-2xs shrink-0">
              🛒
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                {item.name}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-500 mt-0.5">
                Calculado: {item.buyAmount}
              </p>
              <p className="text-sm sm:text-base font-black text-brand-700 mt-0.5">
                ${item.estimatedPriceCop?.toLocaleString('es-CO') || 0} aprox.
              </p>
            </div>
          </div>

          {/* Usage Note */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700">
            <strong>Recetas del plan:</strong> {item.calculatedUsage}
          </div>

          {/* Substitutions Section if available */}
          {substitutions.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <span className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5 text-brand-600" />
                Opciones de ahorro (Sustituciones):
              </span>

              <div className="space-y-2">
                {substitutions.map((sub, idx) => {
                  const isSelected = selectedSub === sub.name;
                  const diff = (item.estimatedPriceCop || 0) - sub.approxPrice;

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedSub(isSelected ? null : sub.name)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-black text-slate-900">{sub.name}</span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          ${sub.approxPrice.toLocaleString('es-CO')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 font-medium">
                        {sub.benefit}
                      </p>
                      {diff > 0 && (
                        <p className="text-[10px] font-black text-brand-700 mt-1">
                          Ahorras aprox. ${diff.toLocaleString('es-CO')} COP
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Benefit Card */}
          <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 font-medium leading-relaxed flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Comprar la cantidad exacta calculada evita que las verduras se marchiten o que la proteína sobre en el congelador.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-200"
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={() => {
              if (selectedSub && onUpdateItem) {
                // Apply substitution
              }
              onClose();
            }}
            className="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-black shadow-xs"
          >
            {selectedSub ? 'Aplicar cambio de producto' : 'Entendido'}
          </button>
        </div>

      </div>
    </div>
  );
};
