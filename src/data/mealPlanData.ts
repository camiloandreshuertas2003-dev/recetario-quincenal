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
    action: 'Preparar la avena remojada o pasar del congelador a la nevera la proteína del día siguiente. ¡Nunca descongeles sobre la mesa!',
    estimatedTime: '3–5 min',
    iconName: 'Moon'
  },
  {
    moment: 'Mañana al salir',
    action: 'Preparar el desayuno exprés nutritivo (7–10 min). Sacar de la nevera las 2 porciones de almuerzo ya empacadas anoche.',
    estimatedTime: '5–10 min',
    iconName: 'Sun'
  },
  {
    moment: 'Al llegar del trabajo',
    action: 'Cocinar la cena variada (4 porciones completas). 2 porciones para cenar rico hoy + 2 porciones para el almuerzo de mañana.',
    estimatedTime: '25–45 min',
    iconName: 'Utensils'
  },
  {
    moment: 'Antes de cenar',
    action: 'Separar los 2 recipientes del almuerzo antes de empezar a comer. Refrigerar antes de 2 horas según normativa MinSalud/USDA.',
    estimatedTime: '3 min',
    iconName: 'PackageCheck'
  }
];

export const MEAL_PLAN_14_DAYS: DayMealPlan[] = [
  // ==================== SEMANA 1 (DÍAS 1–7) ====================
  {
    dayNumber: 1,
    weekNumber: 1,
    title: 'Día 1: Arranque del Plan',
    breakfast: {
      title: 'Arepa con huevos pericos, queso y fruta',
      prepTime: '8–10 min',
      recipeId: 'desayuno-1',
      quickNote: 'Arepa con pericos rápidos de tomate y cebolla, 40 g de queso campesino y fruta fresca.'
    },
    lunch: {
      title: 'Sándwich de huevo rápido (o porción previa)',
      sourceDinnerDay: null,
      isFreshOrPacked: 'Preparación inicial (5 min)',
      packingTip: 'Como no hay cena previa que haya dejado almuerzo, prepara este sándwich en 5 min o lleva una porción previamente congelada. Desde esta noche se activa el ciclo continuo.',
      recipeId: 'almuerzo-dia-1'
    },
    dinner: {
      title: 'Muslos de pollo al horno con verduras y arroz',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '40 min',
      recipeId: 'cena-dia-1',
      carbohydrate: 'Papa criolla y Arroz moderado',
      keyTip: 'Separa los 2 almuerzos antes de cenar. Guarda pollo, papas y arroz juntos.'
    },
    nextDayLunch: {
      title: 'Muslos de pollo al horno con verduras y arroz',
      note: 'Listo en nevera. Al recalentar en el trabajo, añade unas gotas de limón fresco.'
    }
  },

  {
    dayNumber: 2,
    weekNumber: 1,
    title: 'Día 2: Leguminosas y Energía',
    breakfast: {
      title: 'Avena remojada con banano, maní y huevo cocido',
      prepTime: '2–3 min',
      recipeId: 'desayuno-2',
      quickNote: 'Base dejada en la nevera desde anoche. Solo añade banano en rodajas, maní y el huevo cocido.'
    },
    lunch: {
      title: 'Muslos de pollo al horno con verduras y arroz',
      sourceDinnerDay: 1,
      isFreshOrPacked: 'Empacado anoche (Cena Día 1)',
      packingTip: 'Pollo y verduras asadas con arroz. Recalienta bien en el trabajo (74 °C).'
    },
    dinner: {
      title: 'Lentejas criollas con huevo, arroz pequeño y ensalada',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '35 min',
      recipeId: 'cena-dia-2',
      carbohydrate: 'Papa en cubos y Arroz pequeño',
      keyTip: 'Lentejas ricas en hierro con hogao, papa y huevo duro. Empaca el pepino fresco aparte.'
    },
    nextDayLunch: {
      title: 'Lentejas criollas con huevo duro y arroz',
      note: 'Lentejas jugosas con huevo duro. El pepino cohombro fresco va en recipiente independiente.'
    }
  },

  {
    dayNumber: 3,
    weekNumber: 1,
    title: 'Día 3: Carne de Res y Salsa Criolla',
    breakfast: {
      title: 'Arepa, huevo, queso y papaya',
      prepTime: '7–8 min',
      recipeId: 'desayuno-3',
      quickNote: 'Arepa doradita, huevo al gusto, 50 g de queso campesino y cubos de papaya dulce.'
    },
    lunch: {
      title: 'Lentejas criollas con huevo, arroz y pepino',
      sourceDinnerDay: 2,
      isFreshOrPacked: 'Empacado anoche (Cena Día 2)',
      packingTip: 'Lentejas caseras con huevo y arroz. Agrega el pepino fresco al momento de comer.'
    },
    dinner: {
      title: 'Bistec encebollado con arroz y ensalada de repollo',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '30 min',
      recipeId: 'cena-dia-3',
      carbohydrate: 'Arroz blanco moderado',
      keyTip: 'Sella los bistecs rápido para que no se resequen y termínalos dentro de la salsa criolla.'
    },
    nextDayLunch: {
      title: 'Bistec encebollado con salsa criolla y arroz',
      note: 'Carne jugosa bañada en salsa con arroz. La ensalada de repollo y zanahoria viaja aparte.'
    }
  },

  {
    dayNumber: 4,
    weekNumber: 1,
    title: 'Día 4: Pescado Blanco y Papas al Vapor',
    breakfast: {
      title: 'Avena caliente con banano, maní y queso',
      prepTime: '8–10 min',
      recipeId: 'desayuno-4',
      quickNote: 'Avena cocida en leche con canela, rodajas de banano, maní crujiente y queso campesino.'
    },
    lunch: {
      title: 'Bistec encebollado con salsa criolla y arroz',
      sourceDinnerDay: 3,
      isFreshOrPacked: 'Empacado anoche (Cena Día 3)',
      packingTip: 'Recalienta la carne con su salsita sobre el arroz. Acompaña con la ensalada fresca.'
    },
    dinner: {
      title: 'Sudado de pescado con papa y ensalada fresca',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '30 min',
      recipeId: 'cena-dia-4',
      carbohydrate: 'Papa en rodajas al guiso',
      keyTip: 'Coloca el pescado sobre la cama de papas y guiso; no revuelvas con cuchara para no romperlo.'
    },
    nextDayLunch: {
      title: 'Sudado de pescado con papa y salsa',
      note: 'Usa recipiente rígido hermético. Recalienta a fuego o potencia media en el trabajo.'
    }
  },

  {
    dayNumber: 5,
    weekNumber: 1,
    title: 'Día 5: Arroz con Pollo Clásico',
    breakfast: {
      title: 'Calentado pequeño con huevo, queso y fruta',
      prepTime: '8–10 min',
      recipeId: 'desayuno-5',
      quickNote: 'Aprovecha fríjoles o lentejas con arroz bien refrigerados, sofrito, huevo y fruta.'
    },
    lunch: {
      title: 'Sudado de pescado con papas y salsa',
      sourceDinnerDay: 4,
      isFreshOrPacked: 'Empacado anoche (Cena Día 4)',
      packingTip: 'Pescado blanco con papa criolla o pastusa. Acompaña con pepino o repollo fresco.'
    },
    dinner: {
      title: 'Arroz con pollo desmechado y verduras',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '45 min',
      recipeId: 'cena-dia-5',
      carbohydrate: 'Arroz con verduras variadas',
      keyTip: 'Usa el caldo del pollo colado para cocinar el arroz. Mucha zanahoria, habichuela y pimentón.'
    },
    nextDayLunch: {
      title: 'Arroz con pollo desmechado y verduras',
      note: 'Uno de los almuerzos más prácticos para calentar en oficina; conserva aroma y jugosidad.'
    }
  },

  {
    dayNumber: 6,
    weekNumber: 1,
    title: 'Día 6: Tradición Colombiana y Aguacate',
    breakfast: {
      title: 'Arepa con huevo, queso y fruta de temporada',
      prepTime: '7–8 min',
      recipeId: 'desayuno-6',
      quickNote: 'Arepa tostada con huevo tierno, 50 g de queso campesino y fruta picada.'
    },
    lunch: {
      title: 'Arroz con pollo desmechado y verduras',
      sourceDinnerDay: 5,
      isFreshOrPacked: 'Empacado anoche (Cena Día 5)',
      packingTip: 'Porción generosa de arroz con pollo y vegetales. Listo en 2 min de microondas.'
    },
    dinner: {
      title: 'Fríjoles con ahuyama, plátano y aguacate',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '50 min',
      recipeId: 'cena-dia-6',
      carbohydrate: 'Plátano verde y Ahuyama (Sin arroz)',
      keyTip: 'Espesa el caldo machacando cubos de ahuyama contra la olla. No sirvas arroz este día.'
    },
    nextDayLunch: {
      title: 'Fríjoles espesos con plátano y aguacate',
      note: 'Fríjoles espesos en refractaria antiderrames. Lleva el aguacate en cuartos con limón aparte.'
    }
  },

  {
    dayNumber: 7,
    weekNumber: 1,
    title: 'Día 7: Mariscos Especiales de Fin de Semana',
    breakfast: {
      title: 'Arepa con huevos pericos, queso y fruta',
      prepTime: '8–10 min',
      recipeId: 'desayuno-1',
      quickNote: 'Pericos colombianos recién hechos con arepa caliente y fruta fresca de temporada.'
    },
    lunch: {
      title: 'Fríjoles con ahuyama, plátano y aguacate',
      sourceDinnerDay: 6,
      isFreshOrPacked: 'Empacado anoche (Cena Día 6)',
      packingTip: 'Fríjoles criollos sin arroz. Agrega el aguacate fresco y repollo al momento de comer.'
    },
    dinner: {
      title: 'Camarones al ajillo con verduras y arroz',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '25 min',
      recipeId: 'cena-dia-7',
      carbohydrate: 'Arroz blanco moderado',
      keyTip: 'Saltea los camarones solo 1–2 min por lado. Saltea calabacín, zanahoria y pimentón al dente.'
    },
    nextDayLunch: {
      title: 'Camarones al ajillo con verduras y arroz',
      note: 'Camarones tiernos con vegetales salteados. Recalienta solo 1 minuto en microondas.'
    }
  },

  // ==================== SEMANA 2 (DÍAS 8–14) ====================
  {
    dayNumber: 8,
    weekNumber: 2,
    title: 'Día 8: Albóndigas y Puré Dorado',
    breakfast: {
      title: 'Avena remojada con banano, maní y huevo cocido',
      prepTime: '2–3 min',
      recipeId: 'desayuno-2',
      quickNote: 'Desayuno fresco listo en segundos. Proteína, fibra y energía para comenzar la semana.'
    },
    lunch: {
      title: 'Camarones al ajillo con verduras y arroz',
      sourceDinnerDay: 7,
      isFreshOrPacked: 'Empacado anoche (Cena Día 7)',
      packingTip: 'Almuerzo gourmet de camarón y verduras. Calienta brevemente para mantener la terneza.'
    },
    dinner: {
      title: 'Albóndigas criollas en salsa con puré de ahuyama',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '40 min',
      recipeId: 'cena-dia-8',
      carbohydrate: 'Puré de ahuyama suave',
      keyTip: 'Forma 16 albóndigas parejas. Cocínalas en la salsa criolla y sirve sobre puré de ahuyama.'
    },
    nextDayLunch: {
      title: 'Albóndigas criollas en salsa con puré de ahuyama',
      note: 'Base de puré de ahuyama con 4 albóndigas y salsa por porción. Muy reconfortante.'
    }
  },

  {
    dayNumber: 9,
    weekNumber: 2,
    title: 'Día 9: Garbanzos Criollos y Huevo',
    breakfast: {
      title: 'Arepa, huevo, queso y papaya',
      prepTime: '7–8 min',
      recipeId: 'desayuno-3',
      quickNote: 'Arepa caliente, huevo tierno, queso campesino y plato de papaya dulce.'
    },
    lunch: {
      title: 'Albóndigas criollas en salsa con puré de ahuyama',
      sourceDinnerDay: 8,
      isFreshOrPacked: 'Empacado anoche (Cena Día 8)',
      packingTip: 'Cuatro albóndigas jugosas con puré de ahuyama y salsa de arvejas y zanahorias.'
    },
    dinner: {
      title: 'Garbanzos con verduras, huevo y arroz pequeño',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '45 min',
      recipeId: 'cena-dia-9',
      carbohydrate: 'Ahuyama y Arroz pequeño',
      keyTip: 'Machaca una taza de garbanzos y ahuyama para espesar el caldo de forma natural.'
    },
    nextDayLunch: {
      title: 'Garbanzos con verduras, huevo duro y arroz',
      note: 'Garbanzos espesos con huevo y arroz en refractaria hermética; pepino fresco aparte.'
    }
  },

  {
    dayNumber: 10,
    weekNumber: 2,
    title: 'Día 10: Pollo Guisado en Presa Mixta',
    breakfast: {
      title: 'Avena caliente con banano, maní y queso',
      prepTime: '8–10 min',
      recipeId: 'desayuno-4',
      quickNote: 'Avena tibia aromática con canela, banano maduro, maní y cubos de queso campesino.'
    },
    lunch: {
      title: 'Garbanzos con verduras, huevo duro y arroz',
      sourceDinnerDay: 9,
      isFreshOrPacked: 'Empacado anoche (Cena Día 9)',
      packingTip: 'Garbanzos criollos con huevo y arroz. Acompaña con las rodajas de pepino fresco.'
    },
    dinner: {
      title: 'Pollo guisado con presa mixta, arroz y ensalada',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '45 min',
      recipeId: 'cena-dia-10',
      carbohydrate: 'Arroz blanco moderado',
      keyTip: 'Usa presas mixtas (pierna-pernil, alas, contramuslo) para variar sabores y texturas.'
    },
    nextDayLunch: {
      title: 'Pollo guisado con presa mixta, salsa y arroz',
      note: 'Presa tierna bañada en salsa criolla con zanahorias y arroz. Ensalada de repollo aparte.'
    }
  },

  {
    dayNumber: 11,
    weekNumber: 2,
    title: 'Día 11: Pescado al Limón y Papas',
    breakfast: {
      title: 'Calentado pequeño con huevo, queso y fruta',
      prepTime: '8–10 min',
      recipeId: 'desayuno-5',
      quickNote: 'Calentado de garbanzos o leguminosas con arroz, sofrito, huevos y fruta fresca.'
    },
    lunch: {
      title: 'Pollo guisado con presa mixta, salsa y arroz',
      sourceDinnerDay: 10,
      isFreshOrPacked: 'Empacado anoche (Cena Día 10)',
      packingTip: 'Presa de pollo jugosa con arroz y zanahoria. Acompaña con repollo aderezado.'
    },
    dinner: {
      title: 'Filete de pescado al limón con papa y ensalada',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '25 min',
      recipeId: 'cena-dia-11',
      carbohydrate: 'Papa cocida al vapor',
      keyTip: 'Cocina los filetes 3–4 min por lado sin moverlos hasta dorar. Haz salsa ligera con limón.'
    },
    nextDayLunch: {
      title: 'Filete de pescado al limón con papas al vapor',
      note: 'Filete de pescado bañado en jugo de limón con papas. Recalienta tapado a potencia media.'
    }
  },

  {
    dayNumber: 12,
    weekNumber: 2,
    title: 'Día 12: Carne Molida Criolla con Verduras',
    breakfast: {
      title: 'Arepa con huevo, queso y fruta de temporada',
      prepTime: '7–8 min',
      recipeId: 'desayuno-6',
      quickNote: 'Arepa de maíz caliente con huevo frito o revuelto, queso campesino y fruta dulce.'
    },
    lunch: {
      title: 'Filete de pescado al limón con papas al vapor',
      sourceDinnerDay: 11,
      isFreshOrPacked: 'Empacado anoche (Cena Día 11)',
      packingTip: 'Pescado blanco con papas al vapor y ensalada fresca de repollo y zanahoria.'
    },
    dinner: {
      title: 'Carne molida guisada con verduras y arroz',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '35 min',
      recipeId: 'cena-dia-12',
      carbohydrate: 'Arroz blanco moderado',
      keyTip: 'Carne molida bien jugosa con calabacín, arveja y zanahoria en salsa de hogao.'
    },
    nextDayLunch: {
      title: 'Carne molida guisada con verduras y arroz',
      note: 'Almuerzo sumamente fácil de calentar en la oficina; la carne molida se mantiene jugosa.'
    }
  },

  {
    dayNumber: 13,
    weekNumber: 2,
    title: 'Día 13: Sancocho Tradicional de Pollo',
    breakfast: {
      title: 'Arepa con huevos pericos, queso y fruta',
      prepTime: '8–10 min',
      recipeId: 'desayuno-1',
      quickNote: 'Desayuno colombiano reconfortante para el fin de semana con arepa y pericos.'
    },
    lunch: {
      title: 'Carne molida guisada con verduras y arroz',
      sourceDinnerDay: 12,
      isFreshOrPacked: 'Empacado anoche (Cena Día 12)',
      packingTip: 'Carne molida abundante con arroz y verduras. Listo en 2 minutos.'
    },
    dinner: {
      title: 'Sancocho de pollo con yuca, papa y mazorca',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '55 min',
      recipeId: 'cena-dia-13',
      carbohydrate: 'Yuca, Papa, Plátano verde y Mazorca (Sin arroz)',
      keyTip: 'Las presas con hueso dan todo el sazón al caldo. No cocines arroz este día.'
    },
    nextDayLunch: {
      title: 'Sancocho de pollo con yuca, papa y mazorca',
      note: 'Transporta en termo para sopa hermético o recipiente de silicona antiderrames.'
    }
  },

  {
    dayNumber: 14,
    weekNumber: 2,
    title: 'Día 14: Tortilla Campesina de Cierre',
    breakfast: {
      title: 'Avena remojada con banano, maní y huevo cocido',
      prepTime: '2–3 min',
      recipeId: 'desayuno-2',
      quickNote: 'Desayuno frío nutritivo con avena en leche, banano, maní tostado y huevo duro.'
    },
    lunch: {
      title: 'Sancocho de pollo con yuca, papa y mazorca',
      sourceDinnerDay: 13,
      isFreshOrPacked: 'Empacado anoche (Cena Día 13)',
      packingTip: 'Sancocho colombiano caliente en termo. Disfruta los tubérculos tiernos y el pollo.'
    },
    dinner: {
      title: 'Tortilla grande de verduras, queso y arroz pequeño',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '25 min',
      recipeId: 'cena-dia-14',
      carbohydrate: 'Arroz blanco pequeño',
      keyTip: 'Tortilla gruesa de 10 huevos con calabacín, espinaca y queso campesino fundido.'
    },
    nextDayLunch: {
      title: 'Tortilla de verduras con queso y arroz',
      note: 'Empaca 2 cuartos de tortilla con arroz pequeño y pepino. Deliciosa fría o caliente.'
    }
  }
];
