export interface User {
  id: string;
  cedula: string;
  name: string;
  password?: string;
  role: 'admin' | 'miembro';
  avatarColor: string;
  createdAt: string;
}

export interface DayMealPlan {
  dayNumber: number;
  weekNumber: number;
  title: string;
  breakfast: {
    title: string;
    prepTime: string;
    recipeId: string;
    quickNote?: string;
  };
  lunch: {
    title: string;
    sourceDinnerDay: number | null;
    isFreshOrPacked: string;
    packingTip: string;
  };
  dinner: {
    title: string;
    yieldPortions: number; // typically 4
    eatPortions: number;  // 2
    packPortions: number; // 2
    prepTime: string;
    recipeId: string;
    carbohydrate: string;
    keyTip?: string;
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
  category: 'cena' | 'desayuno';
  yieldServings: number;
  prepTime: string;
  ingredients: RecipeIngredient[];
  steps: string[];
  packingInstructions?: string;
  videoUrl?: string;
  recipeUrl?: string;
  recipeSourceName?: string;
  highlightTag: string;
  carbType?: string;
}

export type MarketCategory = 'proteinas' | 'verduras' | 'frutas_despensa';

export interface MarketItem {
  id: string;
  category: MarketCategory;
  name: string;
  calculatedUsage: string;
  buyAmount: string;
  notes?: string;
  batch?: 'inicio' | 'dia8' | 'indiferente'; // compra en dos tandas
  checked?: boolean;
  checkedBy?: string;
  checkedAt?: string;
  isCustom?: boolean;
}

export interface HouseholdState {
  householdName: string;
  users: User[];
  checkedItems: Record<string, { checked: boolean; checkedBy: string; checkedAt: string }>;
  customItems: MarketItem[];
  completedDays: number[];
  activeWeek: number;
  updatedAt: string;
}
