import { DayMealPlan } from '@/types';

export interface RoutineStep {
  moment: string;
  action: string;
  estimatedTime: string;
  iconName: string;
}

export const DAILY_ROUTINE: RoutineStep[] = [
  {
    moment: 'Noche anterior',
    action: 'Preparar el desayuno frío si aplica (yogur con avena hidratándose o avena remojada).',
    estimatedTime: '3–5 min',
    iconName: 'Moon'
  },
  {
    moment: 'Mañana',
    action: 'Preparar o tomar el desayuno rápido; sacar de la nevera el almuerzo ya empacado de anoche.',
    estimatedTime: '5–10 min',
    iconName: 'Sun'
  },
  {
    moment: 'Al llegar del trabajo',
    action: 'Cocinar la cena del día rindiendo 4 porciones completas (2 para cenar hoy + 2 para mañana).',
    estimatedTime: '30–50 min',
    iconName: 'Utensils'
  },
  {
    moment: 'Después de cenar',
    action: 'Dejar reposar unos minutos, tapar y refrigerar las 2 porciones en recipientes herméticos.',
    estimatedTime: '3 min',
    iconName: 'PackageCheck'
  }
];

export const MEAL_PLAN_14_DAYS: DayMealPlan[] = [
  // ==================== SEMANA 1 (DÍAS 1–7) ====================
  {
    dayNumber: 1,
    weekNumber: 1,
    title: 'Día 1: Arranque de Quincena',
    breakfast: {
      title: 'Yogur con avena, papaya y maní',
      prepTime: '2–3 min',
      recipeId: 'desayuno-1',
      quickNote: 'Deja la avena con yogur desde anoche en la nevera; en la mañana añade papaya fresca y maní.'
    },
    lunch: {
      title: 'Sándwich de huevo rápido (o porción previa)',
      sourceDinnerDay: null,
      isFreshOrPacked: 'Preparación inicial (5 min)',
      packingTip: 'Como no hay cena previa que haya dejado almuerzo, prepara un sándwich de huevo en 5 min o lleva una porción previamente congelada. Desde esta noche se activa el ciclo.'
    },
    dinner: {
      title: 'Sudado de pollo con arroz pequeño y ensalada',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '35–40 min',
      recipeId: 'cena-dia-1',
      carbohydrate: 'Arroz moderado (120 g crudo) + Ahuyama',
      keyTip: 'Divide en caliente: 2 platos a la mesa y 2 refractarias tapadas a la nevera.'
    },
    nextDayLunch: {
      title: 'Sudado de pollo con ahuyama y arroz',
      note: 'Listo en la nevera de la cena de hoy. Lleva la ensalada aparte.'
    }
  },
  {
    dayNumber: 2,
    weekNumber: 1,
    title: 'Día 2: Leguminosas y Energía',
    breakfast: {
      title: 'Arepa congelada con pericos rápidos',
      prepTime: '8–10 min',
      recipeId: 'desayuno-2',
      quickNote: 'Sofrito de tomate y cebolla rápido con 4 huevos y arepa tostada.'
    },
    lunch: {
      title: 'Sudado de pollo con ahuyama y arroz',
      sourceDinnerDay: 1,
      isFreshOrPacked: 'Empacado anoche (Cena Día 1)',
      packingTip: 'Solo sacar de la nevera y calentar en el microondas en el trabajo.'
    },
    dinner: {
      title: 'Lentejas con verduras, arroz pequeño, huevo y pepino',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '40–45 min',
      recipeId: 'cena-dia-2',
      carbohydrate: 'Papa + Arroz pequeño (100 g crudo)',
      keyTip: 'Ricas en hierro y proteína vegetal según guía ICBF.'
    },
    nextDayLunch: {
      title: 'Lentejas con arroz, verduras y huevo cocido',
      note: 'Empacado anoche con huevo. Pepino fresco llevado aparte.'
    }
  },
  {
    dayNumber: 3,
    weekNumber: 1,
    title: 'Día 3: Salteado Rápido',
    breakfast: {
      title: 'Avena remojada con banano y canela',
      prepTime: '2 min',
      recipeId: 'desayuno-3',
      quickNote: 'Hidratada desde anoche en leche con canela. Solo cortar banano.'
    },
    lunch: {
      title: 'Lentejas con verduras, arroz y huevo',
      sourceDinnerDay: 2,
      isFreshOrPacked: 'Empacado anoche (Cena Día 2)',
      packingTip: 'Recalienta 2-3 minutos en microondas; añade pepino fresco.'
    },
    dinner: {
      title: 'Pollo salteado con verduras y arepa',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '25–30 min',
      recipeId: 'cena-dia-3',
      carbohydrate: 'Arepas de maíz (4 unidades pequeñas)',
      keyTip: 'Salteado en wok a fuego alto; verduras crujientes y llenas de color.'
    },
    nextDayLunch: {
      title: 'Pollo salteado con verduras y arepa',
      note: 'Empaca el pollo con verduras en contenedor y la arepa en servilleta.'
    }
  },
  {
    dayNumber: 4,
    weekNumber: 1,
    title: 'Día 4: Garbanzos Caseros',
    breakfast: {
      title: 'Huevos cocidos, queso, aguacate y fruta',
      prepTime: '3–5 min',
      recipeId: 'desayuno-4',
      quickNote: 'Usa huevos ya cocidos de la tanda semanal. Pela y sirve con queso y aguacate.'
    },
    lunch: {
      title: 'Pollo salteado con verduras y arepa',
      sourceDinnerDay: 3,
      isFreshOrPacked: 'Empacado anoche (Cena Día 3)',
      packingTip: 'Calienta el salteado y tuesta ligeramente la arepa.'
    },
    dinner: {
      title: 'Garbanzos con ahuyama, arroz pequeño y repollo',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '45–50 min',
      recipeId: 'cena-dia-4',
      carbohydrate: 'Arroz pequeño (100 g crudo) + Garbanzo',
      keyTip: 'Machaca una taza de garbanzo contra la olla para espesar con cremosidad natural.'
    },
    nextDayLunch: {
      title: 'Garbanzos con ahuyama y arroz',
      note: 'Empacado anoche. Lleva el repollo rebanado en recipiente aparte.'
    }
  },
  {
    dayNumber: 5,
    weekNumber: 1,
    title: 'Día 5: Arroz con Pollo Criollo',
    breakfast: {
      title: 'Yogur con fruta y maní',
      prepTime: '2–3 min',
      recipeId: 'desayuno-6',
      quickNote: 'Rápido y ligero para cerrar la semana laboral.'
    },
    lunch: {
      title: 'Garbanzos con ahuyama, arroz y repollo',
      sourceDinnerDay: 4,
      isFreshOrPacked: 'Empacado anoche (Cena Día 4)',
      packingTip: 'Sabor potenciado tras asentar en la nevera.'
    },
    dinner: {
      title: 'Arroz con pollo cargado de verduras',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '40–45 min',
      recipeId: 'cena-dia-5',
      carbohydrate: 'Arroz con verduras (200 g crudo)',
      keyTip: 'Plato único balanceado con arveja, habichuela, zanahoria y pimentón.'
    },
    nextDayLunch: {
      title: 'Arroz con pollo cargado de verduras',
      note: 'Las 2 porciones empacadas anoche listas para recalentar.'
    }
  },
  {
    dayNumber: 6,
    weekNumber: 1,
    title: 'Día 6: Cazuela Paisa Ligera',
    breakfast: {
      title: 'Arepa ya hecha, queso y huevo',
      prepTime: '7–8 min',
      recipeId: 'desayuno-5',
      quickNote: 'Arepa tostada con queso campesino derretido y huevo frito con poco aceite.'
    },
    lunch: {
      title: 'Arroz con pollo con verduras',
      sourceDinnerDay: 5,
      isFreshOrPacked: 'Empacado anoche (Cena Día 5)',
      packingTip: 'Recalentar en microondas; queda jugoso por el caldo casero.'
    },
    dinner: {
      title: 'Fríjoles con ahuyama y plátano (sin arroz)',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '50–60 min',
      recipeId: 'cena-dia-6',
      carbohydrate: 'Plátano verde + Fríjoles (Sin arroz)',
      keyTip: 'Acompaña con repollo y aguacate fresco; carbohidrato completo sin necesidad de arroz.'
    },
    nextDayLunch: {
      title: 'Fríjoles con ahuyama y plátano',
      note: 'Empacado anoche. Corta medio aguacate fresco para acompañar.'
    }
  },
  {
    dayNumber: 7,
    weekNumber: 1,
    title: 'Día 7: Sopa Campesina de Pollo',
    breakfast: {
      title: 'Avena remojada con fruta de temporada',
      prepTime: '2 min',
      recipeId: 'desayuno-3',
      quickNote: 'Desayuno fresco para iniciar el domingo.'
    },
    lunch: {
      title: 'Fríjoles con ahuyama y plátano con aguacate',
      sourceDinnerDay: 6,
      isFreshOrPacked: 'Empacado anoche (Cena Día 6)',
      packingTip: 'Añadir 2 cucharadas de agua antes de calentar para devolver soltura.'
    },
    dinner: {
      title: 'Sopa de pollo con papa y yuca (sin arroz)',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '40–45 min',
      recipeId: 'cena-dia-7',
      carbohydrate: 'Papa + Yuca + Ahuyama (Sin arroz)',
      keyTip: 'Reconfortante caldo con tubérculos criollos y cilantro fresco.'
    },
    nextDayLunch: {
      title: 'Sopa de pollo con papa y yuca',
      note: 'Usar recipiente hermético anti-derrame para llevar al trabajo.'
    }
  },

  // ==================== SEMANA 2 (DÍAS 8–14) ====================
  {
    dayNumber: 8,
    weekNumber: 2,
    title: 'Día 8: Pollo Dorado con Ahuyama',
    breakfast: {
      title: 'Huevos pericos rápidos con arepa',
      prepTime: '8–10 min',
      recipeId: 'desayuno-2',
      quickNote: 'Inicia la segunda semana con energía tradicional colombiana.'
    },
    lunch: {
      title: 'Sopa de pollo con papa y yuca',
      sourceDinnerDay: 7,
      isFreshOrPacked: 'Empacado anoche (Cena Día 7)',
      packingTip: 'Calienta en tazón hondo; caldo nutritivo y saciante.'
    },
    dinner: {
      title: 'Pollo con ahuyama, arroz pequeño y pepino',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '35–40 min',
      recipeId: 'cena-dia-8',
      carbohydrate: 'Arroz moderado (120 g crudo)',
      keyTip: 'Destapar al final para que la salsa de ahuyama y hogao caramelice.'
    },
    nextDayLunch: {
      title: 'Pollo con ahuyama y arroz pequeño',
      note: 'Empacado anoche; lleva pepino fresco cortado con limón.'
    }
  },
  {
    dayNumber: 9,
    weekNumber: 2,
    title: 'Día 9: Lentejas con Plátano Maduro Asado',
    breakfast: {
      title: 'Yogur con avena y papaya',
      prepTime: '2–3 min',
      recipeId: 'desayuno-1',
      quickNote: 'Digestivo y veloz.'
    },
    lunch: {
      title: 'Pollo con ahuyama, arroz y pepino',
      sourceDinnerDay: 8,
      isFreshOrPacked: 'Empacado anoche (Cena Día 8)',
      packingTip: 'Pollo jugoso con salsa natural de ahuyama.'
    },
    dinner: {
      title: 'Lentejas con calabacín, huevo y plátano asado (sin arroz)',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '40–45 min',
      recipeId: 'cena-dia-9',
      carbohydrate: 'Plátano maduro asado (Sin arroz)',
      keyTip: 'El contraste dulce del plátano maduro asado con las lentejas es insuperable.'
    },
    nextDayLunch: {
      title: 'Lentejas con calabacín, huevo y plátano asado',
      note: 'Empaca las lentejas con el huevo y el plátano a un costado.'
    }
  },
  {
    dayNumber: 10,
    weekNumber: 2,
    title: 'Día 10: Pollo Desmechado con Hogao Criollo',
    breakfast: {
      title: 'Arepa ya hecha, queso y fruta',
      prepTime: '7–8 min',
      recipeId: 'desayuno-5',
      quickNote: 'Arepa crujiente con queso campesino y mandarina.'
    },
    lunch: {
      title: 'Lentejas con calabacín, huevo y plátano asado',
      sourceDinnerDay: 9,
      isFreshOrPacked: 'Empacado anoche (Cena Día 9)',
      packingTip: 'Recalienta 2 min; no requiere cubiertos especiales.'
    },
    dinner: {
      title: 'Pollo desmechado con hogao, arroz y ensalada',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '35–40 min',
      recipeId: 'cena-dia-10',
      carbohydrate: 'Arroz moderado (120 g crudo)',
      keyTip: 'Cocina en el propio caldo concentrado para retener todos los jugos.'
    },
    nextDayLunch: {
      title: 'Pollo desmechado con hogao y arroz',
      note: 'Empacado anoche. Lleva ensalada de repollo y aguacate aparte.'
    }
  },
  {
    dayNumber: 11,
    weekNumber: 2,
    title: 'Día 11: Cazuela de Garbanzos y Pollo',
    breakfast: {
      title: 'Avena remojada con banano',
      prepTime: '2 min',
      recipeId: 'desayuno-3',
      quickNote: 'Avena cremosa lista desde la noche previa.'
    },
    lunch: {
      title: 'Pollo desmechado con hogao, arroz y aguacate',
      sourceDinnerDay: 10,
      isFreshOrPacked: 'Empacado anoche (Cena Día 10)',
      packingTip: 'Mezclar el pollo jugoso con el arroz al calentar.'
    },
    dinner: {
      title: 'Garbanzos con pollo y verduras (sin arroz)',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '45–50 min',
      recipeId: 'cena-dia-11',
      carbohydrate: 'Papa + Garbanzos (Sin arroz ni arepa)',
      keyTip: 'Termina con hojas frescas de espinaca en los últimos 2 minutos.'
    },
    nextDayLunch: {
      title: 'Garbanzos con pollo, papa y espinaca',
      note: 'Plato único reconfortante empacado anoche en refractaria.'
    }
  },
  {
    dayNumber: 12,
    weekNumber: 2,
    title: 'Día 12: Fríjoles con Ahuyama y Aguacate',
    breakfast: {
      title: 'Huevos cocidos, aguacate y fruta',
      prepTime: '3–5 min',
      recipeId: 'desayuno-4',
      quickNote: 'Desayuno alto en grasas buenas y proteína.'
    },
    lunch: {
      title: 'Garbanzos con pollo y verduras',
      sourceDinnerDay: 11,
      isFreshOrPacked: 'Empacado anoche (Cena Día 11)',
      packingTip: 'Súper completo; solo recalentar y disfrutar.'
    },
    dinner: {
      title: 'Fríjoles con ahuyama, arroz pequeño y aguacate',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '50–55 min',
      recipeId: 'cena-dia-12',
      carbohydrate: 'Arroz pequeño (100 g crudo) + Fríjol',
      keyTip: 'Ahuyama machacada para espesar salsa dorada y sedosa.'
    },
    nextDayLunch: {
      title: 'Fríjoles con ahuyama y arroz pequeño',
      note: 'Empacado anoche. Lleva el aguacate fresco para cortar al momento.'
    }
  },
  {
    dayNumber: 13,
    weekNumber: 2,
    title: 'Día 13: Sancocho Tradicional',
    breakfast: {
      title: 'Yogur con avena y fruta',
      prepTime: '2–3 min',
      recipeId: 'desayuno-1',
      quickNote: 'Rápido, fresco y listo en dos minutos.'
    },
    lunch: {
      title: 'Fríjoles con ahuyama, arroz y aguacate',
      sourceDinnerDay: 12,
      isFreshOrPacked: 'Empacado anoche (Cena Día 12)',
      packingTip: 'Calentar con 2 cucharadas de agua para revivir la cremosidad.'
    },
    dinner: {
      title: 'Sancocho de pollo (sin arroz)',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '45–55 min',
      recipeId: 'cena-dia-13',
      carbohydrate: 'Yuca + Mazorca + Plátano verde + Papa (Sin arroz)',
      keyTip: 'Sancocho campesino completo con hogao y cilantro cimarrón.'
    },
    nextDayLunch: {
      title: 'Sancocho de pollo con plátano y yuca',
      note: 'Empacado anoche en tarrinas herméticas anti-derrame.'
    }
  },
  {
    dayNumber: 14,
    weekNumber: 2,
    title: 'Día 14: Tortilla de Verduras & Cierre Quincenal',
    breakfast: {
      title: 'Arepa rápida con huevo y queso',
      prepTime: '8–10 min',
      recipeId: 'desayuno-7',
      quickNote: 'Desayuno caliente para completar el ciclo de 14 días.'
    },
    lunch: {
      title: 'Sancocho de pollo tradicional',
      sourceDinnerDay: 13,
      isFreshOrPacked: 'Empacado anoche (Cena Día 13)',
      packingTip: 'El sancocho sabe aún mejor al día siguiente.'
    },
    dinner: {
      title: 'Tortilla grande de verduras con arroz pequeño',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '25–30 min',
      recipeId: 'cena-dia-14',
      carbohydrate: 'Arroz pequeño (100 g crudo)',
      keyTip: 'Cierre saludable cargado de espinaca, calabacín, pimentón y tomate.'
    },
    nextDayLunch: {
      title: 'Tortilla de verduras con arroz pequeño',
      note: 'Quedan 2 porciones extra empacadas listas para el almuerzo siguiente.'
    }
  }
];
