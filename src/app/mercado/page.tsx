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
  Check
} from 'lucide-react';

export default function ShoppingPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [household, setHousehold] = useState(getHouseholdState());
  const [selectedCategory, setSelectedCategory] = useState<
    | 'todos'
    | MarketCategory
    | 'pendientes'
    | 'dia8'
    | 'en_despensa'
  >('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [isSupermarketMode, setIsSupermarketMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<MarketCategory>('verduras_hierbas');
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
    data: { realPriceCop?: number; realAmountBought?: string }
  ) => {
    updateMarketItemAdjustment(itemId, data);
    refreshState();
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    addCustomMarketItem({
      category: newItemCategory,
      name: newItemName.trim(),
      calculatedUsage: 'Ingrediente añadido por el hogar',
      buyAmount: newItemAmount.trim() || '1 unidad',
      notes: newItemNotes.trim() || undefined,
      batch: 'inicio'
    });

    setNewItemName('');
    setNewItemAmount('');
    setNewItemNotes('');
    setIsAddModalOpen(false);
    refreshState();
  };

  // Financial summary calculation
  const financialSummary = getMarketFinancialSummary(household, allItems);

  // Filtering
  const filteredItems = allItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.calculatedUsage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    const isChecked = !!household.checkedItems[item.id]?.checked;
    const isInPantry = !!adjustments[item.id]?.inPantry;

    if (selectedCategory === 'en_despensa') {
      return isInPantry;
    }

    // In other categories, we can show items, but let user filter by pending or batch
    if (selectedCategory === 'pendientes') {
      return !isChecked && !isInPantry;
    }

    if (selectedCategory === 'dia8') {
      return item.batch === 'dia8';
    }

    if (selectedCategory === 'todos') {
      return true;
    }

    // Category mapping for compatibility
    if (selectedCategory === 'proteinas') {
      return item.category === 'carnes_pollo' || item.category === 'pescados_mariscos' || item.category === 'proteinas';
    }
    if (selectedCategory === 'verduras') {
      return item.category === 'verduras_hierbas' || item.category === 'verduras';
    }
    if (selectedCategory === 'frutas_despensa') {
      return item.category === 'frutas' || item.category === 'bebidas' || item.category === 'despensa_condimentos' || item.category === 'frutas_despensa';
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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28">
      <TopHeader />

      <main className="max-w-lg md:max-w-xl mx-auto px-4 pt-4 space-y-4">
        {/* Page Title & Supermarket Mode Banner */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 text-brand-600" />
              Mercado Quincenal
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Cantidades exactas calculadas para 2 personas sin desperdicios
            </p>
          </div>

          <button
            onClick={() => setIsSupermarketMode(true)}
            className="px-3.5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 shrink-0 transition-transform active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Modo Plaza</span>
          </button>
        </div>

        {/* Financial & Progress Summary Card */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-black text-slate-500 uppercase tracking-wider">
              Control de Presupuesto y Compras
            </span>
            <span className="text-xs sm:text-sm font-black text-brand-700 bg-brand-50 px-2.5 py-1 rounded-xl border border-brand-200">
              {financialSummary.itemsBoughtCount} de {financialSummary.itemsToBuyTotal} comprados ({financialSummary.progressPercentage}%)
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-brand-600 h-full transition-all duration-500 rounded-full"
              style={{ width: `${financialSummary.progressPercentage}%` }}
            />
          </div>

          {/* Financial Metrics Grid */}
          <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="block text-[11px] sm:text-xs font-bold text-slate-500">
                Presupuesto Est.
              </span>
              <span className="text-sm sm:text-base font-black text-slate-800">
                $${financialSummary.totalEstimated.toLocaleString('es-CO')}
              </span>
            </div>

            <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="block text-[11px] sm:text-xs font-bold text-emerald-800">
                Total Real Pagado
              </span>
              <span className="text-sm sm:text-base font-black text-emerald-950">
                $${financialSummary.totalRealPaid.toLocaleString('es-CO')}
              </span>
            </div>

            <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-100">
              <span className="block text-[11px] sm:text-xs font-bold text-amber-800 flex items-center justify-center gap-1">
                <Home className="w-3 h-3" />
                En Despensa
              </span>
              <span className="text-sm sm:text-base font-black text-amber-950">
                {financialSummary.itemsInPantryCount} ítems
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: WhatsApp & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShareWhatsApp}
            className="flex-1 py-2.5 px-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Compartir por WhatsApp</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="py-2.5 px-3.5 rounded-2xl bg-brand-50 hover:bg-brand-100 text-brand-900 font-bold text-xs sm:text-sm border border-brand-200 flex items-center justify-center gap-1.5 transition-all"
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
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all"
            title="Reiniciar lista"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Buscar alimento, corte o receta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500 shadow-2xs"
          />
        </div>

        {/* Organization Tips Accordion */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <button
            onClick={() => setIsTipsOpen(!isTipsOpen)}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span className="text-sm sm:text-base font-bold text-slate-900">
                Consejos de Porcionado, Conservación y Bebidas
              </span>
            </div>
            {isTipsOpen ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {isTipsOpen && (
            <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3">
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
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('todos')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedCategory === 'todos'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            Todos ({allItems.length})
          </button>

          <button
            onClick={() => setSelectedCategory('pendientes')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedCategory === 'pendientes'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            Por comprar ({allItems.filter((i) => !household.checkedItems[i.id]?.checked && !adjustments[i.id]?.inPantry).length})
          </button>

          <button
            onClick={() => setSelectedCategory('en_despensa')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-1 ${
              selectedCategory === 'en_despensa'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>En Despensa ({financialSummary.itemsInPantryCount})</span>
          </button>

          <button
            onClick={() => setSelectedCategory('carnes_pollo')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedCategory === 'carnes_pollo'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            🍗 Carnes y Pollo
          </button>

          <button
            onClick={() => setSelectedCategory('pescados_mariscos')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedCategory === 'pescados_mariscos'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            🐟 Pescados y Mariscos
          </button>

          <button
            onClick={() => setSelectedCategory('huevos_lacteos')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedCategory === 'huevos_lacteos'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            🥚 Huevos y Lácteos
          </button>

          <button
            onClick={() => setSelectedCategory('granos_cereales')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedCategory === 'granos_cereales'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            🌾 Granos y Cereales
          </button>

          <button
            onClick={() => setSelectedCategory('tuberculos_harinas')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedCategory === 'tuberculos_harinas'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            🥔 Tubérculos y Plátanos
          </button>

          <button
            onClick={() => setSelectedCategory('verduras_hierbas')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedCategory === 'verduras_hierbas'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            🥦 Verduras y Hierbas
          </button>

          <button
            onClick={() => setSelectedCategory('frutas')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedCategory === 'frutas'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            🍎 Frutas
          </button>

          <button
            onClick={() => setSelectedCategory('bebidas')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedCategory === 'bebidas'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            ☕ Bebidas e Infusiones
          </button>

          <button
            onClick={() => setSelectedCategory('despensa_condimentos')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedCategory === 'despensa_condimentos'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            🧂 Despensa y Sal
          </button>

          <button
            onClick={() => setSelectedCategory('dia8')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              selectedCategory === 'dia8'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            📅 Tanda 2 (Día 8)
          </button>
        </div>

        {/* Shopping Items List */}
        <div className="space-y-2.5">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="text-base font-black text-slate-800">
                No hay productos pendientes en esta vista
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                Prueba cambiando de filtro o busca con otra palabra clave.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isChecked = !!household.checkedItems[item.id]?.checked;
              const checkInfo = household.checkedItems[item.id];
              const adj = adjustments[item.id];

              return (
                <ShoppingItemRow
                  key={item.id}
                  item={item}
                  isChecked={isChecked}
                  checkedBy={checkInfo?.checkedBy}
                  checkedAt={checkInfo?.checkedAt}
                  realPriceCop={adj?.realPriceCop}
                  realAmountBought={adj?.realAmountBought}
                  inPantry={adj?.inPantry}
                  onToggle={() => handleToggle(item.id)}
                  onTogglePantry={() => handleTogglePantry(item.id)}
                  onUpdateRealData={(data) => handleUpdateRealData(item.id, data)}
                  onDelete={
                    item.isCustom
                      ? () => {
                          removeCustomMarketItem(item.id);
                          refreshState();
                        }
                      : undefined
                  }
                />
              );
            })
          )}
        </div>
      </main>

      {/* Add Custom Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-lg font-black text-slate-900">
              Añadir Producto al Mercado
            </h3>

            <form onSubmit={handleAddCustom} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nombre del producto:
                </label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Ej. Arepas de chócolo, Panela..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-bold focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Cantidad o Gramos a comprar:
                </label>
                <input
                  type="text"
                  value={newItemAmount}
                  onChange={(e) => setNewItemAmount(e.target.value)}
                  placeholder="Ej. 500 g, 1 libra, 2 paquetes..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-bold focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Categoría:
                </label>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value as MarketCategory)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-bold focus:ring-2 focus:ring-brand-500"
                >
                  <option value="carnes_pollo">Carnes y Pollo</option>
                  <option value="pescados_mariscos">Pescados y Mariscos</option>
                  <option value="huevos_lacteos">Huevos y Lácteos</option>
                  <option value="granos_cereales">Granos y Cereales</option>
                  <option value="tuberculos_harinas">Tubérculos y Harinas</option>
                  <option value="verduras_hierbas">Verduras y Hierbas</option>
                  <option value="frutas">Frutas</option>
                  <option value="bebidas">Bebidas e Infusiones</option>
                  <option value="despensa_condimentos">Despensa y Condimentos</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nota adicional (opcional):
                </label>
                <input
                  type="text"
                  value={newItemNotes}
                  onChange={(e) => setNewItemNotes(e.target.value)}
                  placeholder="Ej. Marca preferida o lugar de compra"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-bold focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs"
                >
                  Añadir al mercado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Supermarket Fullscreen Mode Modal */}
      {isSupermarketMode && (
        <SupermarketModeModal
          items={allItems.filter((i) => !adjustments[i.id]?.inPantry)}
          checkedItems={household.checkedItems}
          onToggle={handleToggle}
          onClose={() => setIsSupermarketMode(false)}
        />
      )}

      <BottomNav />
    </div>
  );
}
