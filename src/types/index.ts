export interface User {
  id: string;
  cedula: string;
  name: string;
  password?: string;
  role: 'admin' | 'miembro';
  avatarColor: string;
  photoUrl?: string;
  createdAt: string;
}

export interface DayBeverage {
  name: string;
  type: 'cafe' | 'chocolate' | 'jugo' | 'aromatica' | 'avena' | 'agua';
  quickPrep: string;
  healthNote?: string;
}

export interface MealPrepAlert {
  thaw?: string;  // p.ej. "Bajar la carne del congelador a la nevera"
  soak?: string;  // p.ej. "Poner los fríjoles en remojo en agua abundante"
  cook?: string;  // p.ej. "Cena de 4 porciones: 2 cenar hoy + 2 empacar"
  pack?: string;  // p.ej. "Empacar caliente en hermético; ensalada y limón frío aparte"
}

export interface DayMealPlan {
  dayNumber: number;
  weekNumber: number;
  title: string;
  beverage?: DayBeverage;
  prepAlert?: MealPrepAlert;
  breakfast: {
    title: string;
    prepTime: string;
    recipeId: string;
    quickNote?: string;
    beverageName?: string;
  };
  lunch: {
    title: string;
    sourceDinnerDay: number | null;
    isFreshOrPacked: string;
    packingTip: string;
    recipeId?: string;
    reheatTip?: string;
  };
  dinner: {
    title: string;
    yieldPortions: number;
    eatPortions: number;
    packPortions: number;
    prepTime: string;
    recipeId: string;
    carbohydrate: string;
    keyTip?: string;
    proteinType?: string;
  };
  nextDayLunch: {
    title: string;
    note: string;
  };
}

export interface RecipeIngredient {
  name: string;
  amount: string;
  grams?: number;
  note?: string;
}

export interface Recipe {
  id: string;
  title: string;
  category: 'cena' | 'desayuno' | 'almuerzo' | 'bebida';
  proteinType?: 'pollo' | 'res' | 'pescado' | 'granos' | 'huevo';
  yieldServings: number;
  prepTime: string;
  cookMinutes?: number;
  ingredients: RecipeIngredient[];
  steps: string[];
  packingInstructions?: string;
  videoUrl?: string;
  recipeUrl?: string;
  recipeSourceName?: string;
  highlightTag: string;
  carbType?: string;
  imageUrl?: string;
  aiPrompt?: string;
  whyFilling?: string;
  beveragePairing?: {
    name: string;
    type: string;
    description: string;
  };
  reheatMethod?: string;
  storageType?: string;
}

export type MarketCategory =
  | 'carnes_pollo'
  | 'pescados_mariscos'
  | 'huevos_lacteos'
  | 'granos_cereales'
  | 'tuberculos_harinas'
  | 'verduras_hierbas'
  | 'frutas'
  | 'bebidas'
  | 'despensa_condimentos'
  // Compatibilidad hacia atrás
  | 'proteinas'
  | 'verduras'
  | 'frutas_despensa';

export interface MarketItem {
  id: string;
  category: MarketCategory;
  name: string;
  calculatedUsage: string;
  buyAmount: string; // ej. "800 g / 1.6 lb"
  estimatedPriceCop?: number;
  notes?: string;
  batch?: 'inicio' | 'dia8' | 'indiferente';
  checked?: boolean;
  checkedBy?: string;
  checkedAt?: string;
  isCustom?: boolean;
  // Nuevos campos para registrar compras reales e inventario de despensa
  realPriceCop?: number;
  realAmountBought?: string; // ej. "920 g" o "4 unidades"
  realGramsBought?: number;
  inPantry?: boolean; // "Ya lo tengo en casa" (descuenta de la compra)
  isPantryDefault?: boolean; // Ingrediente básico típico de alacena
  unitConversion?: string; // ej. "1.5 kg / 3 lb"
}

export interface FridgeNote {
  id: string;
  authorName: string;
  text: string;
  createdAt: string;
  color: string;
}

export interface HouseholdState {
  householdName: string;
  users: User[];
  checkedItems: Record<string, { checked: boolean; checkedBy: string; checkedAt: string }>;
  customItems: MarketItem[];
  completedDays: number[];
  activeWeek: number;
  selectedDayActive?: number; // Día seleccionado en el asistente (1..14)
  startDate?: string; // YYYY-MM-DD
  servingMultiplier?: number; // 0.5 (2p), 1.0 (4p), 1.5 (6p)
  fridgeNotes?: FridgeNote[];
  estimatedBudgetCop?: number;
  routineMode?: string; // "dinner_to_next_lunch"
  marketAdjustments?: Record<
    string,
    {
      realPriceCop?: number;
      realAmountBought?: string;
      realGramsBought?: number;
      inPantry?: boolean;
    }
  >;
  prepTasksChecked?: Record<string, boolean>; // e.g. "day-1-thaw": true
  swappedRecipes?: Record<number, string>; // dayNumber -> recipeId
  packedDays?: number[]; // list of days marked as packed
  householdMembersCount?: number; // 1..5+ (default 4)
  planDurationDays?: number; // 7, 14, or 15 (default 14)
  budgetAmount?: number; // default 320000
  pantryIngredientNames?: Record<string, boolean>; // ingredient name -> true if already owned
  updatedAt: string;
}
