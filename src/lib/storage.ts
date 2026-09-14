import { User, HouseholdState, MarketItem, FridgeNote } from '@/types';
import { SHOPPING_LIST_INITIAL } from '@/data/shoppingData';

const STORAGE_KEY_STATE = 'recetario_household_state_v3';
const STORAGE_KEY_SESSION = 'recetario_current_user_v1';

const DEFAULT_USERS: User[] = [
  {
    id: 'user-1',
    cedula: '1020304050',
    name: 'Camila',
    password: '123',
    role: 'admin',
    avatarColor: 'bg-emerald-500',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-2',
    cedula: '9876543210',
    name: 'Cristian',
    password: '123',
    role: 'miembro',
    avatarColor: 'bg-amber-500',
    createdAt: new Date().toISOString()
  }
];

function getInitialStartDate(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const DEFAULT_NOTES: FridgeNote[] = [
  {
    id: 'note-1',
    authorName: 'Camila',
    text: 'Dejé medio aguacate fresco protegido con limón en la refractaria azul para el almuerzo.',
    createdAt: 'Hoy, 7:30 AM',
    color: 'bg-amber-50 border-amber-200 text-amber-900'
  },
  {
    id: 'note-2',
    authorName: 'Cristian',
    text: '¡Acuérdate de bajar el paquete de pollo de 600g del congelador a las 5:00 PM!',
    createdAt: 'Hoy, 8:15 AM',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-900'
  }
];

const INITIAL_STATE: HouseholdState = {
  householdName: 'Nuestro menú',
  users: DEFAULT_USERS,
  checkedItems: {},
  customItems: [],
  completedDays: [],
  activeWeek: 1,
  startDate: getInitialStartDate(),
  servingMultiplier: 1.0,
  fridgeNotes: DEFAULT_NOTES,
  estimatedBudgetCop: 195000,
  updatedAt: new Date().toISOString()
};

export function getHouseholdState(): HouseholdState {
  if (typeof window === 'undefined') return INITIAL_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(INITIAL_STATE));
      return INITIAL_STATE;
    }
    const parsed = JSON.parse(raw);
    if (!parsed.users || parsed.users.length === 0) {
      parsed.users = DEFAULT_USERS;
    }
    if (!parsed.startDate) {
      parsed.startDate = getInitialStartDate();
    }
    if (!parsed.fridgeNotes) {
      parsed.fridgeNotes = DEFAULT_NOTES;
    }
    if (!parsed.servingMultiplier) {
      parsed.servingMultiplier = 1.0;
    }
    return parsed;
  } catch {
    return INITIAL_STATE;
  }
}

export function saveHouseholdState(state: HouseholdState): void {
  if (typeof window === 'undefined') return;
  try {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(state));
    window.dispatchEvent(new Event('recetario_state_changed'));
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
}

export function getCurrentSession(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSION);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentSession(user: User | null): void {
  if (typeof window === 'undefined') return;
  if (!user) {
    localStorage.removeItem(STORAGE_KEY_SESSION);
  } else {
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(user));
  }
  window.dispatchEvent(new Event('recetario_session_changed'));
}

export function updateUserProfile(
  userId: string,
  updates: { name?: string; photoUrl?: string }
): { success: boolean; user?: User; error?: string } {
  const state = getHouseholdState();
  const userIndex = state.users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return { success: false, error: 'Usuario no encontrado' };
  }

  const updatedUser = {
    ...state.users[userIndex],
    name: updates.name?.trim() || state.users[userIndex].name,
    photoUrl: updates.photoUrl !== undefined ? updates.photoUrl : state.users[userIndex].photoUrl
  };

  state.users[userIndex] = updatedUser;
  saveHouseholdState(state);

  const currentSession = getCurrentSession();
  if (currentSession?.id === userId) {
    setCurrentSession(updatedUser);
  }

  return { success: true, user: updatedUser };
}

export function updateStartDate(dateStr: string): void {
  const state = getHouseholdState();
  state.startDate = dateStr;
  saveHouseholdState(state);
}

export function setServingMultiplier(multiplier: number): void {
  const state = getHouseholdState();
  state.servingMultiplier = multiplier;
  saveHouseholdState(state);
}

export function getTodayDayNumber(startDateStr?: string): number {
  if (!startDateStr) return 1;
  const start = new Date(`${startDateStr}T00:00:00`);
  const now = new Date();
  const diffTime = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  if (diffDays >= 1 && diffDays <= 14) {
    return diffDays;
  }
  return 1;
}

export function calculateDateForDay(dayNumber: number, startDateStr?: string): {
  dayName: string;
  formattedDate: string;
  isoDate: string;
  isToday: boolean;
} {
  const baseDate = startDateStr ? new Date(`${startDateStr}T12:00:00`) : new Date();
  const targetDate = new Date(baseDate);
  targetDate.setDate(baseDate.getDate() + (dayNumber - 1));

  const today = new Date();
  const isToday =
    targetDate.getDate() === today.getDate() &&
    targetDate.getMonth() === today.getMonth() &&
    targetDate.getFullYear() === today.getFullYear();

  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const monthNames = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  const dayName = dayNames[targetDate.getDay()];
  const dayMonth = `${targetDate.getDate()} de ${monthNames[targetDate.getMonth()]}`;

  return {
    dayName,
    formattedDate: `${dayName}, ${dayMonth}`,
    isoDate: targetDate.toISOString().split('T')[0],
    isToday
  };
}

export function scaleAmount(amountStr: string, multiplier: number): string {
  if (multiplier === 1.0) return amountStr;

  // Match numbers (e.g. 600 g, 2 unidades, 1.5 litros)
  return amountStr.replace(/(\d+([.,]\d+)?)/g, (match) => {
    const num = parseFloat(match.replace(',', '.'));
    if (isNaN(num)) return match;
    const scaled = Math.round(num * multiplier * 10) / 10;
    return String(scaled).replace('.', ',');
  });
}

const NOTE_COLORS = [
  'bg-amber-50 border-amber-200 text-amber-950',
  'bg-emerald-50 border-emerald-200 text-emerald-950',
  'bg-blue-50 border-blue-200 text-blue-950',
  'bg-rose-50 border-rose-200 text-rose-950',
  'bg-purple-50 border-purple-200 text-purple-950'
];

export function addFridgeNote(text: string, authorName: string): FridgeNote {
  const state = getHouseholdState();
  if (!state.fridgeNotes) state.fridgeNotes = [];

  const randomColor = NOTE_COLORS[state.fridgeNotes.length % NOTE_COLORS.length];
  const now = new Date();
  const timeStr = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

  const newNote: FridgeNote = {
    id: `note-${Date.now()}`,
    authorName,
    text: text.trim(),
    createdAt: `Hoy, ${timeStr}`,
    color: randomColor
  };

  state.fridgeNotes.unshift(newNote);
  saveHouseholdState(state);
  return newNote;
}

export function deleteFridgeNote(noteId: string): void {
  const state = getHouseholdState();
  if (!state.fridgeNotes) return;
  state.fridgeNotes = state.fridgeNotes.filter((n) => n.id !== noteId);
  saveHouseholdState(state);
}

export function loginUser(cedula: string, pass: string): { success: boolean; user?: User; error?: string } {
  const state = getHouseholdState();
  const cleanCedula = cedula.trim().replace(/\D/g, '');
  const user = state.users.find((u) => u.cedula.replace(/\D/g, '') === cleanCedula);

  if (!user) {
    return { success: false, error: 'Número de cédula no registrado en el hogar.' };
  }

  if (user.password && user.password !== pass.trim()) {
    return { success: false, error: 'Contraseña incorrecta para esta cédula.' };
  }

  setCurrentSession(user);
  return { success: true, user };
}

export function logoutUser(): void {
  setCurrentSession(null);
}

const AVATAR_COLORS = [
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-teal-500',
  'bg-orange-500'
];

export function registerNewMember(params: {
  cedula: string;
  name: string;
  password?: string;
  role?: 'admin' | 'miembro';
  photoUrl?: string;
}): { success: boolean; error?: string; user?: User } {
  const state = getHouseholdState();
  const cleanCedula = params.cedula.trim().replace(/\D/g, '');

  if (!cleanCedula || cleanCedula.length < 5) {
    return { success: false, error: 'Ingresa una cédula válida (mínimo 5 dígitos).' };
  }

  if (!params.name.trim()) {
    return { success: false, error: 'El nombre del integrante es obligatorio.' };
  }

  if (state.users.some((u) => u.cedula.replace(/\D/g, '') === cleanCedula)) {
    return { success: false, error: 'Ya existe un usuario con esta cédula en el hogar.' };
  }

  const randomColor = AVATAR_COLORS[state.users.length % AVATAR_COLORS.length];

  const newUser: User = {
    id: `user-${Date.now()}`,
    cedula: cleanCedula,
    name: params.name.trim(),
    password: params.password?.trim() || '1234',
    role: params.role || 'miembro',
    avatarColor: randomColor,
    photoUrl: params.photoUrl,
    createdAt: new Date().toISOString()
  };

  state.users.push(newUser);
  saveHouseholdState(state);
  return { success: true, user: newUser };
}

export function toggleMarketItemCheck(itemId: string, userName: string): HouseholdState {
  const state = getHouseholdState();
  const current = state.checkedItems[itemId];

  if (current?.checked) {
    delete state.checkedItems[itemId];
  } else {
    // Haptic vibration feedback if supported
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {}
    }

    state.checkedItems[itemId] = {
      checked: true,
      checkedBy: userName,
      checkedAt: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
    };
  }

  saveHouseholdState(state);
  return state;
}

export function addCustomMarketItem(item: Omit<MarketItem, 'id' | 'isCustom'>): MarketItem {
  const state = getHouseholdState();
  const newItem: MarketItem = {
    ...item,
    id: `custom-${Date.now()}`,
    isCustom: true
  };
  state.customItems.push(newItem);
  saveHouseholdState(state);
  return newItem;
}

export function removeCustomMarketItem(itemId: string): void {
  const state = getHouseholdState();
  state.customItems = state.customItems.filter((i) => i.id !== itemId);
  delete state.checkedItems[itemId];
  saveHouseholdState(state);
}

export function resetMarketChecklist(): void {
  const state = getHouseholdState();
  state.checkedItems = {};
  saveHouseholdState(state);
}

export function toggleDayCompleted(dayNumber: number): boolean {
  const state = getHouseholdState();
  const index = state.completedDays.indexOf(dayNumber);
  let completed = false;
  if (index >= 0) {
    state.completedDays.splice(index, 1);
    completed = false;
  } else {
    state.completedDays.push(dayNumber);
    completed = true;
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([20, 30, 20]);
      } catch {}
    }
  }
  saveHouseholdState(state);
  return completed;
}
