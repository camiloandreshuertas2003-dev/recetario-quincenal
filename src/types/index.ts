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
    recipeId?: string;
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
  category: 'cena' | 'desayuno' | 'almuerzo';
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
}

export type MarketCategory = 'proteinas' | 'verduras' | 'frutas_despensa';

export interface MarketItem {
  id: string;
  category: MarketCategory;
  name: string;
  calculatedUsage: string;
  buyAmount: string;
  estimatedPriceCop?: number;
  notes?: string;
  batch?: 'inicio' | 'dia8' | 'indiferente';
  checked?: boolean;
  checkedBy?: string;
  checkedAt?: string;
  isCustom?: boolean;
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
  startDate?: string; // YYYY-MM-DD
  servingMultiplier?: number; // 0.5 (2p), 1.0 (4p), 1.5 (6p)
  fridgeNotes?: FridgeNote[];
  estimatedBudgetCop?: number;
  updatedAt: string;
}
