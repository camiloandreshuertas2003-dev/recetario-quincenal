'use client';

import React, { useState, useEffect } from 'react';
import {
  getCurrentSession,
  getHouseholdState,
  toggleMarketItemCheck,
  addCustomMarketItem,
  removeCustomMarketItem,
  resetMarketChecklist
} from '@/lib/storage';
import { User, MarketItem, MarketCategory } from '@/types';
import { TopHeader } from '@/components/TopHeader';
import { BottomNav } from '@/components/BottomNav';
import { ShoppingItemRow } from '@/components/ShoppingItemRow';
import { SupermarketModeModal } from '@/components/SupermarketModeModal';
import {
  SHOPPING_LIST_INITIAL,
  ORGANIZATION_TIPS
} from '@/data/shoppingData';
import {
  ShoppingCart,
  Plus,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Share2,
  MessageCircle,
  ShoppingBag,
  Search,
  DollarSign
} from 'lucide-react';

export default function ShoppingPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [household, setHousehold] = useState(getHouseholdState());
  const [selectedCategory, setSelectedCategory] = useState<
    'todos' | MarketCategory | 'pendientes' | 'dia8'
  >('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [isSupermarketMode, setIsSupermarketMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<MarketCategory>('verduras');
  const [newItemNotes, setNewItemNotes] = useState('');

  const refreshState = () => {
    setCurrentUser(getCurrentSession());
    setHousehold(getHouseholdState());
  };

  useEffect(() => {
    refreshState();

    const handleStateChange = () => setHousehold(getHouseholdState());
    window.addEventListener('recetario_state_changed', handleStateChange);
    return () => {
      window.removeEventListener('recetario_state_changed', handleStateChange);
    };
  }, []);

  const allItems: MarketItem[] = [
    ...SHOPPING_LIST_INITIAL,
    ...(household.customItems || [])
  ];

  const totalCount = allItems.length;
  const completedCount = allItems.filter((i) => household.checkedItems[i.id]?.checked).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggleItem = (itemId: string) => {
    const userName = currentUser ? currentUser.name : 'Miembro del Hogar';
    toggleMarketItemCheck(itemId, userName);
    setHousehold(getHouseholdState());
  };

  const handleReset = () => {
    if (confirm('¿Deseas reiniciar todos los checks de la lista para una nueva quincena?')) {
      resetMarketChecklist();
      setHousehold(getHouseholdState());
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    addCustomMarketItem({
      name: newItemName.trim(),
      category: newItemCategory,
      buyAmount: newItemAmount.trim() || '1 unidad',
      calculatedUsage: 'Ítem adicional del hogar',
      notes: newItemNotes.trim() || undefined,
      batch: 'inicio'
    });

    setNewItemName('');
    setNewItemAmount('');
    setNewItemNotes('');
    setIsAddModalOpen(false);
    setHousehold(getHouseholdState());
  };

  const handleDeleteCustomItem = (itemId: string) => {
    removeCustomMarketItem(itemId);
    setHousehold(getHouseholdState());
  };

  const handleShareWhatsApp = () => {
    const pendingItems = allItems.filter((i) => !household.checkedItems[i.id]?.checked);

    if (pendingItems.length === 0) {
      alert('¡Todo el mercado ya está comprado! No hay pendientes.');
      return;
    }

    let text = `🛒 *Lista de Mercado (Nuestro menú)*\n`;
    text += `Pendientes por comprar (${pendingItems.length} de ${totalCount} productos):\n\n`;

    const proteinas = pendingItems.filter((i) => i.category === 'proteinas');
    const verduras = pendingItems.filter((i) => i.category === 'verduras');
    const despensa = pendingItems.filter((i) => i.category === 'frutas_despensa');

    if (proteinas.length > 0) {
      text += `🥩 *PROTEÍNAS Y GRANOS:*\n`;
      proteinas.forEach((p) => {
        text += `[ ] ${p.name} -> ${p.buyAmount}\n`;
      });
      text += `\n`;
    }

    if (verduras.length > 0) {
      text += `🥦 *VERDURAS Y TUBÉRCULOS:*\n`;
      verduras.forEach((v) => {
        text += `[ ] ${v.name} -> ${v.buyAmount}${v.batch === 'dia8' ? ' (Tanda 2 Día 8)' : ''}\n`;
      });
      text += `\n`;
    }

    if (despensa.length > 0) {
      text += `🍊 *FRUTAS Y DESPENSA:*\n`;
      despensa.forEach((d) => {
        text += `[ ] ${d.name} -> ${d.buyAmount}\n`;
      });
      text += `\n`;
    }

    text += `🇨🇴 _Nuestro menú • Cocina inteligente para dos_`;

    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  const filteredItems = allItems.filter((item) => {
    const isChecked = !!household.checkedItems[item.id]?.checked;

    const matchesSearch =
      !searchTerm.trim() ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.buyAmount.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'pendientes') {
      return !isChecked;
    }
    if (selectedCategory === 'dia8') {
      return item.batch === 'dia8';
    }
    if (selectedCategory === 'todos') {
      return true;
    }
    return item.category === selectedCategory;
  });

  return (
    <div className="flex-1 flex flex-col">
      <TopHeader
        user={currentUser}
        servingMultiplier={household.servingMultiplier || 1.0}
        onRefresh={refreshState}
      />

      <main className="flex-1 px-4 py-3.5 space-y-3.5">
        {/* Header, Progress & Supermarket Mode Launch Button */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-brand-100 text-brand-800 flex items-center justify-center font-bold">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900 leading-tight">
                  Mercado para 15 Días
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  2 personas • 14 cenas (4p) + 14 desayunos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleShareWhatsApp}
                className="p-2 text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
                title="Compartir pendientes por WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>

              <button
                onClick={handleReset}
                className="p-2 text-slate-400 hover:text-brand-700 hover:bg-slate-50 rounded-xl transition-colors"
                title="Reiniciar lista para la próxima quincena"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Supermarket Mode CTA */}
          <button
            onClick={() => setIsSupermarketMode(true)}
            className="w-full mt-2 py-2.5 px-3 bg-gradient-to-r from-slate-900 to-brand-950 hover:from-slate-800 hover:to-brand-900 text-white rounded-2xl flex items-center justify-between shadow-xs transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-brand-500 text-slate-950 flex items-center justify-center">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-extrabold tracking-wide">
                Activar Modo Supermercado
              </span>
            </div>
            <span className="text-[11px] text-brand-300 font-bold">
              Una mano →
            </span>
          </button>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
              <span className="text-slate-700">
                Progreso: <strong>{completedCount} de {totalCount} comprados</strong>
              </span>
              <span className="text-brand-700 font-extrabold">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-emerald-600 rounded-full transition-all duration-300 shadow-xs"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Budget & Equivalences Banner */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <DollarSign className="w-3.5 h-3.5 text-brand-600 -mr-1" />
              Presupuesto est.: ~$195.000 COP
            </span>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Añadir ítem
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar producto en la lista (pollo, papa, leche...)"
            className="w-full bg-white border border-slate-200/80 rounded-2xl pl-10 pr-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-2xs"
          />
        </div>

        {/* Tips de Organización Acordeón */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
          <button
            onClick={() => setIsTipsOpen(!isTipsOpen)}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-800 flex items-center justify-center font-bold text-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Organización para que no falte comida
                </h4>
                <p className="text-[11px] text-slate-500">
                  Pollo congelado por porciones y compras en 2 tandas
                </p>
              </div>
            </div>
            {isTipsOpen ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {isTipsOpen && (
            <div className="px-3.5 pb-4 pt-1 border-t border-slate-100 space-y-3">
              {ORGANIZATION_TIPS.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-sm space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-800 text-sm sm:text-base">{tip.title}</span>
                    {tip.badge && (
                      <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200/50">
                        {tip.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory('todos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedCategory === 'todos'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            Todos ({totalCount})
          </button>

          <button
            onClick={() => setSelectedCategory('pendientes')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedCategory === 'pendientes'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            Solo Pendientes ({totalCount - completedCount})
          </button>

          <button
            onClick={() => setSelectedCategory('proteinas')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedCategory === 'proteinas'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            🥩 Proteínas y Granos
          </button>

          <button
            onClick={() => setSelectedCategory('verduras')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedCategory === 'verduras'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            🥦 Verduras y Tubérculos
          </button>

          <button
            onClick={() => setSelectedCategory('frutas_despensa')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedCategory === 'frutas_despensa'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            🍊 Frutas y Despensa
          </button>

          <button
            onClick={() => setSelectedCategory('dia8')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedCategory === 'dia8'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            📅 Tanda 2 (Día 8)
          </button>
        </div>

        {/* Shopping Items List */}
        <div className="space-y-2.5">
          {filteredItems.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-3xl border border-slate-200 p-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-800">
                ¡No hay productos pendientes en esta categoría!
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Todo comprado o filtro sin resultados.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const checkData = household.checkedItems[item.id];
              return (
                <ShoppingItemRow
                  key={item.id}
                  item={item}
                  isChecked={!!checkData?.checked}
                  checkedBy={checkData?.checkedBy}
                  checkedAt={checkData?.checkedAt}
                  onToggle={() => handleToggleItem(item.id)}
                  onDelete={item.isCustom ? () => handleDeleteCustomItem(item.id) : undefined}
                />
              );
            })
          )}
        </div>
      </main>

      {/* Supermarket Mode Fullscreen View */}
      {isSupermarketMode && (
        <SupermarketModeModal
          items={allItems}
          checkedItems={household.checkedItems}
          onToggleItem={handleToggleItem}
          onClose={() => setIsSupermarketMode(false)}
        />
      )}

      {/* Modal para Añadir Producto Personalizado */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-5 animate-in zoom-in-95 duration-200">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Añadir Producto al Mercado
            </h3>

            <form onSubmit={handleAddItem} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nombre del producto
                </label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Ej. Café molido, Manzanas..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Cantidad a comprar
                  </label>
                  <input
                    type="text"
                    value={newItemAmount}
                    onChange={(e) => setNewItemAmount(e.target.value)}
                    placeholder="Ej. 500 g o 1 bolsa"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Categoría
                  </label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as MarketCategory)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="proteinas">Proteínas / Granos</option>
                    <option value="verduras">Verduras / Tubérculos</option>
                    <option value="frutas_despensa">Frutas / Despensa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nota u observación (opcional)
                </label>
                <input
                  type="text"
                  value={newItemNotes}
                  onChange={(e) => setNewItemNotes(e.target.value)}
                  placeholder="Ej. Marca preferida, comprar en plaza..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-xs"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <BottomNav pendingMarketCount={totalCount - completedCount} />
    </div>
  );
}
