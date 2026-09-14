import { User, HouseholdState, MarketItem } from '@/types';
import { SHOPPING_LIST_INITIAL } from '@/data/shoppingData';

const STORAGE_KEY_STATE = 'recetario_household_state_v1';
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

const INITIAL_STATE: HouseholdState = {
  householdName: 'Nuestro Hogar',
  users: DEFAULT_USERS,
  checkedItems: {},
  customItems: [],
  completedDays: [],
  activeWeek: 1,
  startDate: getInitialStartDate(),
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

export function calculateDateForDay(dayNumber: number, startDateStr?: string): {
  dayName: string;
  formattedDate: string;
  isoDate: string;
} {
  const baseDate = startDateStr ? new Date(`${startDateStr}T12:00:00`) : new Date();
  const targetDate = new Date(baseDate);
  targetDate.setDate(baseDate.getDate() + (dayNumber - 1));

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
    isoDate: targetDate.toISOString().split('T')[0]
  };
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
  }
  saveHouseholdState(state);
  return completed;
}
