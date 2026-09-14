'use client';

import React, { useState, useEffect } from 'react';
import {
  getCurrentSession,
  getHouseholdState,
  toggleMarketItemCheck,
  addCustomMarketItem,
  removeCustomMarketItem,
  resetMarketChecklist,
  updateMarketItemAdjustment,
  togglePantryItem,
  getMarketFinancialSummary
} from '@/lib/storage';
import { User, MarketItem, MarketCategory } from '@/types';
import { TopHeader } from '@/components/TopHeader';
import { BottomNav } from '@/components/BottomNav';
import { ShoppingItemRow } from '@/components/ShoppingItemRow';
import { SupermarketModeModal } from '@/components/SupermarketModeModal';
import { ProductDetailModal } from '@/components/ProductDetailModal';
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
  DollarSign,
  TrendingDown,
  TrendingUp,
  Home,
  Check,
  Layers,
  PieChart
} from 'lucide-react';

const CATEGORY_DEFINITIONS: {
  id: MarketCategory;
  name: string;
  icon: string;
  description: string;
}[] = [
  { id: 'carnes_pollo', name: 'Carnes y Pollo', icon: '🥩', description: 'Pechuga, contramuslos, carne de res para posta y molida' },
  { id: 'pescados_mariscos', name: 'Pescados y Mariscos', icon: '🐟', description: 'Filetes blancos de tilapia/basa y camarones' },
  { id: 'huevos_lacteos', name: 'Lácteos y Huevos', icon: '🥚', description: 'Huevos AA, queso campesino, leche y mantequilla' },
  { id: 'granos_cereales', name: 'Granos y Cereales', icon: '🫘', description: 'Lentejas, frijoles bola roja, arroz y avena' },
  { id: 'tuberculos_harinas', name: 'Tubérculos y Harinas', icon: '🥔', description: 'Papa pastusa, criolla, plátano y yuca' },
  { id: 'verduras_hierbas', name: 'Verduras y Hierbas', icon: '🥦', description: 'Cebolla, tomate, pimentón, zanahoria, calabacín y hierbas' },
  { id: 'frutas', name: 'Frutas y Cítricos', icon: '🍊', description: 'Papaya, banano, limones y frutas de temporada' },
  { id: 'despensa_condimentos', name: 'Despensa Básica', icon: '🧂', description: 'Aceite, sal marina, comino y condimentos' },
  { id: 'bebidas', name: 'Bebidas Típicas', icon: '☕', description: 'Café colombiano y chocolate tradicional de mesa' }
];

export default function ShoppingPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [household, setHousehold] = useState(getHouseholdState());
  const [viewTab, setViewTab] = useState<'categorias' | 'resumen'>('categorias');
  const [selectedCategory, setSelectedCategory] = useState<
    | 'todos'
    | MarketCategory
    | 'pendientes'
    | 'en_despensa'
  >('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [isSupermarketMode, setIsSupermarketMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<MarketItem | null>(null);

  // Form for new item
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<MarketCategory>('verduras_hierbas');

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

  const adjustments = household.marketAdjustments || {};

  const handleToggle = (itemId: string) => {
    const userName = currentUser ? currentUser.name : 'Alguien';
    toggleMarketItemCheck(itemId, userName);
    refreshState();
  };

  const handleTogglePantry = (itemId: string) => {
    togglePantryItem(itemId);
    refreshState();
  };

  const handleUpdateRealData = (
    itemId: string,
    data: { realPriceCop?: number; realAmountBought?: string; inPantry?: boolean }
  ) => {
    updateMarketItemAdjustment(itemId, data);
    refreshState();
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemAmount.trim()) return;

    addCustomMarketItem({
      name: newItemName.trim(),
      buyAmount: newItemAmount.trim(),
      calculatedUsage: newItemAmount.trim(),
      category: newItemCategory,
      notes: 'Ítem agregado por el hogar'
    });

    setNewItemName('');
    setNewItemAmount('');
    setIsAddModalOpen(false);
    refreshState();
  };

  const financialSummary = getMarketFinancialSummary(household, allItems);

  // Filter items
  const filteredItems = allItems.filter((item) => {
    const isChecked = !!household.checkedItems[item.id]?.checked;
    const isInPantry = !!adjustments[item.id]?.inPantry;

    if (searchTerm.trim()) {
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.buyAmount.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchSearch) return false;
    }

    if (selectedCategory === 'pendientes') {
      return !isChecked && !isInPantry;
    }
    if (selectedCategory === 'en_despensa') {
      return isInPantry;
    }
    if (selectedCategory === 'todos') {
      return true;
    }
    return item.category === selectedCategory;
  });

  const handleShareWhatsApp = () => {
    const pendingItems = allItems.filter(
      (item) => !household.checkedItems[item.id]?.checked && !adjustments[item.id]?.inPantry
    );

    let text = `🛒 *LISTA DE MERCADO - ${household.householdName || 'Nuestro menú'}*\n`;
    text += `Total estimado: $${financialSummary.totalEstimated.toLocaleString('es-CO')} COP\n`;
    text += `Pendientes: ${pendingItems.length} artículos\n\n`;

    const grouped: Record<string, MarketItem[]> = {};
    pendingItems.forEach((item) => {
      const cat = item.category || 'Otros';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });

    for (const [category, items] of Object.entries(grouped)) {
      text += `*[${category.toUpperCase().replace('_', ' ')}]*\n`;
      items.forEach((item) => {
        text += `• ${item.name} - ${item.buyAmount}\n`;
      });
      text += `\n`;
    }

    text += `_Generado con la App Nuestro menú_`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8] text-slate-900 pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3.5">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
              <ShoppingCart className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <h1 className="text-base font-black text-slate-900 leading-tight">
                Mercado Quincenal
              </h1>
              <p className="text-xs text-slate-500 font-semibold">
                Cantidades exactas para 2 personas
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSupermarketMode(true)}
            className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black text-xs shadow-sm flex items-center gap-1.5 transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Modo Plaza</span>
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-3.5 space-y-4">
        {/* Segmented View Switcher: [ Por Categorías ] | [ Resumen Financiero ] */}
        <div className="p-1 rounded-2xl bg-slate-200/70 flex items-center gap-1 shadow-2xs">
          <button
            onClick={() => setViewTab('categorias')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
              viewTab === 'categorias'
                ? 'bg-white text-brand-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Por Categorías</span>
          </button>

          <button
            onClick={() => setViewTab('resumen')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
              viewTab === 'resumen'
                ? 'bg-white text-brand-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PieChart className="w-4 h-4" />
            <span>Resumen Financiero</span>
          </button>
        </div>

        {/* Progress & Financial Overview Card */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Progreso de Compras
            </span>
            <span className="text-xs font-black text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md border border-brand-200">
              {financialSummary.itemsBoughtCount} de {financialSummary.itemsToBuyTotal} comprados ({financialSummary.progressPercentage}%)
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-brand-600 h-full transition-all duration-500 rounded-full"
              style={{ width: `${financialSummary.progressPercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="p-2 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Presupuesto</span>
              <span className="text-xs sm:text-sm font-black text-slate-800">
                ${financialSummary.totalEstimated.toLocaleString('es-CO')}
              </span>
            </div>

            <div className="p-2 rounded-2xl bg-emerald-50/70 border border-emerald-100">
              <span className="block text-[10px] font-bold text-emerald-700 uppercase">Real Pagado</span>
              <span className="text-xs sm:text-sm font-black text-emerald-800">
                ${financialSummary.totalRealPaid.toLocaleString('es-CO')}
              </span>
            </div>

            <div className="p-2 rounded-2xl bg-amber-50/70 border border-amber-100">
              <span className="block text-[10px] font-bold text-amber-700 uppercase">En Despensa</span>
              <span className="text-xs sm:text-sm font-black text-amber-800">
                {financialSummary.itemsInPantryCount} ítems
              </span>
            </div>
          </div>
        </div>

        {/* TAB 1: POR CATEGORÍAS */}
        {viewTab === 'categorias' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* 8 Category Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORY_DEFINITIONS.map((cat) => {
                const itemsInCat = allItems.filter((i) => i.category === cat.id);
                const boughtInCat = itemsInCat.filter(
                  (i) => household.checkedItems[i.id]?.checked || adjustments[i.id]?.inPantry
                ).length;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(isSelected ? 'todos' : cat.id)}
                    className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-brand-50 border-brand-500 shadow-2xs ring-1 ring-brand-500'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{cat.icon}</span>
                      <span className="text-[10px] font-black text-slate-500">
                        {boughtInCat}/{itemsInCat.length}
                      </span>
                    </div>

                    <div className="mt-2">
                      <h4 className="text-xs font-black text-slate-900 truncate">
                        {cat.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 truncate font-medium">
                        {itemsInCat.length} artículos
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Actions: Add Item & Share WhatsApp */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareWhatsApp}
                className="flex-1 py-2.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Compartir lista por WhatsApp</span>
              </button>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="py-2.5 px-3 rounded-2xl bg-brand-50 hover:bg-brand-100 text-brand-900 font-bold text-xs border border-brand-200 flex items-center justify-center gap-1 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir</span>
              </button>

              <button
                onClick={() => {
                  if (confirm('¿Deseas reiniciar todas las casillas de compra?')) {
                    resetMarketChecklist();
                    refreshState();
                  }
                }}
                className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Reiniciar lista"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Buscar carne, verdura o ingrediente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500 shadow-2xs"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('todos')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 ${
                  selectedCategory === 'todos'
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                Todos ({allItems.length})
              </button>

              <button
                onClick={() => setSelectedCategory('pendientes')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 ${
                  selectedCategory === 'pendientes'
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                Por comprar ({allItems.filter((i) => !household.checkedItems[i.id]?.checked && !adjustments[i.id]?.inPantry).length})
              </button>

              <button
                onClick={() => setSelectedCategory('en_despensa')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 flex items-center gap-1 ${
                  selectedCategory === 'en_despensa'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}
              >
                <Home className="w-3 h-3" />
                <span>En Despensa ({financialSummary.itemsInPantryCount})</span>
              </button>
            </div>

            {/* Item List */}
            <div className="space-y-2.5">
              {filteredItems.map((item) => {
                const isChecked = !!household.checkedItems[item.id]?.checked;
                const checkInfo = household.checkedItems[item.id];
                const adjustment = adjustments[item.id] || {};

                return (
                  <ShoppingItemRow
                    key={item.id}
                    item={item}
                    isChecked={isChecked}
                    checkedBy={checkInfo?.checkedBy}
                    checkedAt={checkInfo?.checkedAt}
                    realPriceCop={adjustment.realPriceCop}
                    realAmountBought={adjustment.realAmountBought}
                    inPantry={adjustment.inPantry}
                    onToggle={() => handleToggle(item.id)}
                    onDelete={
                      item.isCustom
                        ? () => {
                            removeCustomMarketItem(item.id);
                            refreshState();
                          }
                        : undefined
                    }
                    onUpdateRealData={(data) => handleUpdateRealData(item.id, data)}
                    onTogglePantry={() => handleTogglePantry(item.id)}
                    onOpenDetail={() => setSelectedItemForDetail(item)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: RESUMEN FINANCIERO */}
        {viewTab === 'resumen' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                Desglose Estimado por Categoría
              </h3>

              <div className="space-y-2.5">
                {CATEGORY_DEFINITIONS.map((cat) => {
                  const itemsInCat = allItems.filter((i) => i.category === cat.id);
                  const totalEstCop = itemsInCat.reduce((sum, item) => sum + (item.estimatedPriceCop || 0), 0);
                  const boughtCount = itemsInCat.filter((i) => household.checkedItems[i.id]?.checked || adjustments[i.id]?.inPantry).length;

                  return (
                    <div key={cat.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{cat.icon}</span>
                        <div>
                          <h4 className="text-xs font-black text-slate-900">{cat.name}</h4>
                          <span className="text-[10px] text-slate-500 font-semibold">
                            {boughtCount} de {itemsInCat.length} listos
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black text-slate-900 block">
                          ${totalEstCop.toLocaleString('es-CO')}
                        </span>
                        <span className="text-[10px] text-brand-700 font-bold">
                          {Math.round((totalEstCop / (financialSummary.totalEstimated || 1)) * 100)}% del total
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Savings through Pantry Alert */}
            <div className="p-4 rounded-3xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-900">
                  Ahorro por Ingredientes en Casa
                </h4>
              </div>
              <p className="text-xs leading-relaxed font-medium text-amber-900">
                Tienes <strong>{financialSummary.itemsInPantryCount} artículos</strong> marcados como ya presentes en tu cocina. Esto te ahorra aproximadamente <strong>${financialSummary.savingsPantryCop.toLocaleString('es-CO')} COP</strong> en tu compra quincenal.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Supermarket Mode Modal */}
      {isSupermarketMode && (
        <SupermarketModeModal
          items={allItems}
          checkedItems={household.checkedItems}
          onToggle={handleToggle}
          onClose={() => setIsSupermarketMode(false)}
        />
      )}

      {/* Product Detail Modal (Substitutions & Amount Adjustment) */}
      {selectedItemForDetail && (
        <ProductDetailModal
          item={selectedItemForDetail}
          onClose={() => setSelectedItemForDetail(null)}
          onUpdateItem={(data) => {
            handleUpdateRealData(selectedItemForDetail.id, data);
            setSelectedItemForDetail(null);
          }}
        />
      )}

      {/* Add Custom Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4">
            <h3 className="text-base font-black text-slate-900">
              Añadir Producto al Mercado
            </h3>

            <form onSubmit={handleAddNewItem} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Cilantro fresco"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cantidad a comprar:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 1 atado grande"
                  value={newItemAmount}
                  onChange={(e) => setNewItemAmount(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Categoría:</label>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value as MarketCategory)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
                >
                  {CATEGORY_DEFINITIONS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-brand-600 text-white font-black text-xs shadow-xs"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
