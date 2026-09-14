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
    action: 'Pasar del congelador a la nevera la proteína del día siguiente y poner leguminosas en remojo si corresponde. ¡Nunca descongeles sobre la mesa!',
    estimatedTime: '2–3 min',
    iconName: 'Moon'
  },
  {
    moment: 'Mañana al salir',
    action: 'Preparar el desayuno exprés nutritivo (7–10 min) con su bebida caliente o fresca. Sacar de la nevera las 2 porciones de almuerzo ya empacadas anoche.',
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
    action: 'Separar los 2 recipientes del almuerzo antes de empezar a comer. Dejar enfriar brevemente y refrigerar antes de 2 horas según normativa MinSalud/USDA.',
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
    beverage: {
      name: 'Chocolate colombiano de mesa espumoso',
      type: 'chocolate',
      quickPrep: '5 min • Batido con molinillo o licuador en leche descremada caliente',
      healthNote: 'Recomendación OMS: Consumir chocolate de mesa sin azúcar añadida o con moderación (máx. 2 veces por semana).'
    },
    prepAlert: {
      thaw: 'Saca los muslos de pollo del congelador a la nevera desde la mañana.',
      cook: 'Cocina 4 porciones al horno: 2 para cenar hoy + 2 para empacar al almuerzo de mañana.',
      pack: 'Guarda pollo, papas y verduras juntos en recipiente hermético en la nevera.'
    },
    breakfast: {
      title: 'Arepa con queso campesino, huevo cocido y papaya',
      prepTime: '8–10 min',
      recipeId: 'desayuno-1',
      quickNote: 'Arepa tostada, 2 huevos duros hervidos en batch, 40 g de queso campesino y papaya picada.',
      beverageName: 'Chocolate tradicional de mesa'
    },
    lunch: {
      title: 'Sándwich de huevo rápido (o porción previa)',
      sourceDinnerDay: null,
      isFreshOrPacked: 'Preparación inicial (5 min)',
      packingTip: 'Como no hay cena previa que haya dejado almuerzo, prepara este sándwich en 5 min o lleva una porción previamente congelada. Desde esta noche se activa el ciclo continuo.',
      recipeId: 'almuerzo-dia-1',
      reheatTip: 'Consumir fresco o a temperatura ambiente.'
    },
    dinner: {
      title: 'Pollo al horno con papas y calabacín asado',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '40 min',
      recipeId: 'cena-dia-1',
      carbohydrate: 'Papa criolla y pastusa (300 g)',
      proteinType: 'pollo',
      keyTip: 'Separa los 2 almuerzos antes de cenar. Guarda pollo, papas y calabacín juntos.'
    },
    nextDayLunch: {
      title: 'Pollo al horno con papas y calabacín asado',
      note: 'Listo en nevera. Al recalentar en el microondas del trabajo, añade unas gotas de limón fresco.'
    }
  },

  {
    dayNumber: 2,
    weekNumber: 1,
    title: 'Día 2: Leguminosas y Res',
    beverage: {
      name: 'Café con leche recién colado',
      type: 'cafe',
      quickPrep: '4 min • Café colombiano filtrado con leche baja en grasa',
      healthNote: 'El café negro o con poca leche estimula la energía matutina sin sumar azúcares libres.'
    },
    prepAlert: {
      thaw: 'Pasa la carne molida de res (500 g) del congelador a la nevera desde la noche anterior.',
      cook: 'Cocina el sudado de carne molida con papas y arvejas (rinde 4 porciones generosas).',
      pack: 'Empaca 2 porciones de carne con papa y arroz. Enfría antes de refrigerar.'
    },
    breakfast: {
      title: 'Huevos revueltos con tomate y cebolla, tostada y banano',
      prepTime: '8 min',
      recipeId: 'desayuno-2',
      quickNote: 'Huevos pericos jugosos en sartén con hogao rápido, pan integral tostado y banano en rodajas.',
      beverageName: 'Café con leche'
    },
    lunch: {
      title: 'Pollo al horno con papas y calabacín',
      sourceDinnerDay: 1,
      isFreshOrPacked: 'Empacado anoche (Cena Día 1)',
      packingTip: 'Recipiente hermético con 2 presas de pollo, papas y verduras asadas. Recalentar 2.5 min.',
      recipeId: 'cena-dia-1',
      reheatTip: 'Microondas 2–3 minutos hasta que el centro del pollo esté muy caliente.'
    },
    dinner: {
      title: 'Carne molida sudada con papa y verduras',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '35 min',
      recipeId: 'cena-dia-2',
      carbohydrate: 'Papa pastusa (350 g) y Arroz moderado (250 g)',
      proteinType: 'res',
      keyTip: 'Guiso jugoso tradicional. Los sabores concentran delicioso al reposar en nevera.'
    },
    nextDayLunch: {
      title: 'Carne molida sudada con papa y verduras',
      note: 'El guiso humedece el arroz de manera perfecta al calentarse en el trabajo.'
    }
  },

  {
    dayNumber: 3,
    weekNumber: 1,
    title: 'Día 3: Pescado Blanco y Puré',
    beverage: {
      name: 'Café negro campesino recién hecho',
      type: 'cafe',
      quickPrep: '3 min • Café tostado colombiano filtrado en greca o colador',
      healthNote: 'Excelente antioxidante natural, cero calorías si se toma sin endulzante.'
    },
    prepAlert: {
      thaw: 'Pasa 600 g de filetes de pescado blanco del congelador a la nevera desde la mañana.',
      cook: 'Dora los filetes a fuego medio-alto y saltea espinacas 3 minutos.',
      pack: 'Pescado y puré van juntos. Empaca un cuarto de limón fresco en bolsita para exprimir mañana.'
    },
    breakfast: {
      title: 'Huevos pericos sobre arepa y fruta fresca',
      prepTime: '7 min',
      recipeId: 'desayuno-3',
      quickNote: '2 huevos batidos con tomate y cebolla verde sobre arepa crocante, papaya en dados.',
      beverageName: 'Café campesino'
    },
    lunch: {
      title: 'Carne molida sudada con papa y arroz',
      sourceDinnerDay: 2,
      isFreshOrPacked: 'Empacado anoche (Cena Día 2)',
      packingTip: 'Listo en refractaria hermética. Incluye una porción de ensalada fresca empacada aparte.',
      recipeId: 'cena-dia-2',
      reheatTip: 'Calentar bien tapado en microondas 2 min.'
    },
    dinner: {
      title: 'Filete de pescado a la plancha con puré y espinacas',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '30 min',
      recipeId: 'cena-dia-3',
      carbohydrate: 'Puré de papa casero (500 g)',
      proteinType: 'pescado',
      keyTip: 'No sobrecocinar el pescado para que conserve su jugosidad en el recalentado.'
    },
    nextDayLunch: {
      title: 'Filete de pescado blanco con puré y espinacas',
      note: 'Recalentar a potencia media (60-70%) en microondas para mantener la textura suave del pescado.'
    }
  },

  {
    dayNumber: 4,
    weekNumber: 1,
    title: 'Día 4: Res Molida y Ahuyama',
    beverage: {
      name: 'Aromática caliente de hierbabuena y limón',
      type: 'aromatica',
      quickPrep: '3 min • Infusión de hojas frescas de hierbabuena o menta con rodaja de limón',
      healthNote: 'Digestiva, relajante y libre de azúcares procesados.'
    },
    prepAlert: {
      thaw: 'Pasa la carne molida para albóndigas (500 g) a la nevera temprano.',
      soak: 'Pon 350 g de fríjoles rojos en remojo con agua abundante desde esta noche para la cena de mañana.',
      cook: 'Forma las albóndigas y cocina el puré de ahuyama suave.',
      pack: 'Albóndigas y puré juntos. Ensalada de repollo y limón en bolsa/tarrina fría aparte.'
    },
    breakfast: {
      title: 'Huevos duros con aguacate sobre pan tostado',
      prepTime: '6 min',
      recipeId: 'desayuno-4',
      quickNote: '2 huevos duros hervidos en batch en rodajas, medio aguacate triturado con sal y pimienta sobre pan tostado.',
      beverageName: 'Aromática de hierbabuena'
    },
    lunch: {
      title: 'Filete de pescado a la plancha con puré de papa',
      sourceDinnerDay: 3,
      isFreshOrPacked: 'Empacado anoche (Cena Día 3)',
      packingTip: 'Lleva el cuarto de limón aparte. Calentar puré y pescado a potencia media 2 min.',
      recipeId: 'cena-dia-3',
      reheatTip: 'Potencia media en microondas 2 minutos; añadir limón después de calentar.'
    },
    dinner: {
      title: 'Albóndigas de res con puré de ahuyama y ensalada de repollo',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '40 min',
      recipeId: 'cena-dia-4',
      carbohydrate: 'Puré de ahuyama (500 g)',
      proteinType: 'res',
      keyTip: 'La ensalada de repollo debe empacarse en un recipiente frío separado con el limón aparte.'
    },
    nextDayLunch: {
      title: 'Albóndigas de res con puré de ahuyama y ensalada fresca',
      note: 'El puré de ahuyama recalienta cremoso y la ensalada fría aporta textura crocante.'
    }
  },

  {
    dayNumber: 5,
    weekNumber: 1,
    title: 'Día 5: Arroz con Pollo Tradicional',
    beverage: {
      name: 'Café con leche campesino espumoso',
      type: 'cafe',
      quickPrep: '4 min • Café colado con leche caliente espumada',
      healthNote: 'Aporte de calcio y proteínas matutinas para acompañar la avena o arepa.'
    },
    prepAlert: {
      thaw: 'Pasa la pechuga de pollo (700 g) a la nevera desde temprano para cocinar y desmechar.',
      cook: 'Prepara el arroz con pollo de una sola olla con verduras mixtas (rinde 4 porciones abundantes).',
      pack: 'Empaca directamente 2 porciones en recipientes herméticos una vez baje el vapor.'
    },
    breakfast: {
      title: 'Avena cremosa caliente con leche, canela y banano',
      prepTime: '7 min',
      recipeId: 'desayuno-5',
      quickNote: 'Hojuelas de avena cocidas con leche descremada, astilla de canela y banano maduro en rodajas.',
      beverageName: 'Café con leche'
    },
    lunch: {
      title: 'Albóndigas de res con puré de ahuyama',
      sourceDinnerDay: 4,
      isFreshOrPacked: 'Empacado anoche (Cena Día 4)',
      packingTip: 'Recalentar las albóndigas y puré. Incorporar la ensalada de repollo fría al momento de comer.',
      recipeId: 'cena-dia-4',
      reheatTip: 'Microondas 2.5 min tapado.'
    },
    dinner: {
      title: 'Arroz con pollo casero colombiano',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '45 min',
      recipeId: 'cena-dia-5',
      carbohydrate: 'Arroz blanco cocido con caldo casero (280 g)',
      proteinType: 'pollo',
      keyTip: 'Plato único balanceado. Almacenar bien tapado en la nevera para mantener el grano suelto.'
    },
    nextDayLunch: {
      title: 'Arroz con pollo casero colombiano',
      note: 'Uno de los mejores almuerzos para recalentar: los vegetales y el caldo impregnan cada grano.'
    }
  },

  {
    dayNumber: 6,
    weekNumber: 1,
    title: 'Día 6: Fríjoles Colombianos y Aguacate',
    beverage: {
      name: 'Chocolate tradicional caliente en agua o leche',
      type: 'chocolate',
      quickPrep: '5 min • Chocolate de mesa batido caliente con molinillo',
      healthNote: 'Bebida reconfortante de fin de semana, ideal con omelet o arepa con queso.'
    },
    prepAlert: {
      soak: 'Revisa que los fríjoles lleven al menos 8 horas en remojo con agua limpia.',
      cook: 'Cocina en olla a presión los fríjoles con plátano verde rallado, ahuyama y carne picada.',
      pack: 'Fríjoles y arroz van juntos en hermético hondo. Medio aguacate y limón van fríos aparte.'
    },
    breakfast: {
      title: 'Omelet de huevo con queso campesino, arepa y fruta',
      prepTime: '8 min',
      recipeId: 'desayuno-6',
      quickNote: '2 huevos batidos con sal, doblados con 40 g de queso campesino derretido, arepa y fruta.',
      beverageName: 'Chocolate tradicional'
    },
    lunch: {
      title: 'Arroz con pollo casero colombiano',
      sourceDinnerDay: 5,
      isFreshOrPacked: 'Empacado anoche (Cena Día 5)',
      packingTip: 'Listo en recipiente hermético. Añade salsa casera de tomate o limón al gusto.',
      recipeId: 'cena-dia-5',
      reheatTip: 'Microondas 2 min con tapa entreabierta.'
    },
    dinner: {
      title: 'Fríjoles rojos colombianos con carne picada y arroz',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '55 min',
      recipeId: 'cena-dia-6',
      carbohydrate: 'Plátano verde (300 g) y Arroz moderado (200 g)',
      proteinType: 'granos',
      keyTip: 'El plátano verde rallado y la ahuyama aportan espesor natural sin necesidad de harinas.'
    },
    nextDayLunch: {
      title: 'Fríjoles rojos con carne picada, arroz y aguacate',
      note: 'El caldo de los fríjoles toma aún más consistencia y sabor de un día para otro.'
    }
  },

  {
    dayNumber: 7,
    weekNumber: 1,
    title: 'Día 7: Camarones al Ajillo y Frescura',
    beverage: {
      name: 'Café campesino negro recién preparado',
      type: 'cafe',
      quickPrep: '3 min • Café tostado filtrado caliente',
      healthNote: 'Cero azúcares. Acompáñalo con arepa tostada y huevos pericos.'
    },
    prepAlert: {
      thaw: 'Pasa 500 g de camarones congelados a la nevera 4 horas antes de cocinar.',
      cook: 'Saltea el ajo y pimentón 2 minutos, añade camarones 4 minutos exactos.',
      pack: 'Camarones, arroz y calabacín juntos. Empaca un cuarto de limón para exprimir al recalentar.'
    },
    breakfast: {
      title: 'Arepa con queso campesino, huevo cocido y papaya',
      prepTime: '8 min',
      recipeId: 'desayuno-1',
      quickNote: 'Arepa delgada crocante con queso campesino, 2 huevos duros y papaya dulce picada.',
      beverageName: 'Café campesino'
    },
    lunch: {
      title: 'Fríjoles rojos con carne picada y arroz',
      sourceDinnerDay: 6,
      isFreshOrPacked: 'Empacado anoche (Cena Día 6)',
      packingTip: 'Recalentar fríjoles y arroz bien calientes. Cortar el aguacate fresco al momento.',
      recipeId: 'cena-dia-6',
      reheatTip: 'Microondas 2.5 min; agregar el aguacate frío encima tras calentar.'
    },
    dinner: {
      title: 'Camarones al ajillo con arroz blanco y calabacín',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '25 min',
      recipeId: 'cena-dia-7',
      carbohydrate: 'Arroz blanco (250 g)',
      proteinType: 'pescado',
      keyTip: 'Cocinar los camarones solo 3–4 minutos para que queden tiernos y jugosos.'
    },
    nextDayLunch: {
      title: 'Camarones al ajillo con arroz blanco y calabacín',
      note: 'Recalentar a potencia suave (60%) 1.5 a 2 minutos para no endurecer los camarones.'
    }
  },

  // ==================== SEMANA 2 (DÍAS 8–14) ====================
  {
    dayNumber: 8,
    weekNumber: 2,
    title: 'Día 8: Lomo de Res al Wok (Tanda 2 Frescos)',
    beverage: {
      name: 'Café con leche matutino caliente',
      type: 'cafe',
      quickPrep: '4 min • Café colombiano con leche descremada tibia',
      healthNote: 'Energía sostenida y calcio para iniciar la segunda semana.'
    },
    prepAlert: {
      thaw: 'Pasa 600 g de lomo de res en tiras del congelador a la nevera temprano.',
      cook: 'Saltea el lomo a fuego muy vivo 3 min con cebolla, pimentón y tomate.',
      pack: 'Lomo salteado con sus jugos y arroz juntos en refractaria hermética.'
    },
    breakfast: {
      title: 'Huevos revueltos con tomate y cebolla, tostada y banano',
      prepTime: '8 min',
      recipeId: 'desayuno-2',
      quickNote: 'Pericos colombianos jugosos en pan tostado integral con banano fresco.',
      beverageName: 'Café con leche'
    },
    lunch: {
      title: 'Camarones al ajillo con arroz y calabacín',
      sourceDinnerDay: 7,
      isFreshOrPacked: 'Empacado anoche (Cena Día 7)',
      packingTip: 'Listo en nevera. Recalentar brevemente y rociar gotas de limón fresco.',
      recipeId: 'cena-dia-7',
      reheatTip: 'Microondas potencia media 1.5–2 min.'
    },
    dinner: {
      title: 'Lomo de res en tiras salteado con vegetales y arroz',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '25 min',
      recipeId: 'cena-dia-8',
      carbohydrate: 'Arroz blanco (250 g)',
      proteinType: 'res',
      keyTip: 'Fuego muy alto al saltear para que los vegetales queden al dente y la carne jugosa.'
    },
    nextDayLunch: {
      title: 'Lomo de res en tiras con vegetales y arroz',
      note: 'El jugo del salteado con cebolla y tomate humedece el arroz de forma espectacular.'
    }
  },

  {
    dayNumber: 9,
    weekNumber: 2,
    title: 'Día 9: Posta Criolla al Fuego Lento',
    beverage: {
      name: 'Aromática caliente de manzanilla con toque cítrico',
      type: 'aromatica',
      quickPrep: '3 min • Infusión de flores de manzanilla con piel de limón',
      healthNote: 'Infusión digestiva reconfortante recomendada por la OMS para reducir bebidas azucaradas.'
    },
    prepAlert: {
      thaw: 'Pasa la carne de res para posta (700 g) a la nevera desde la noche anterior.',
      cook: 'Sella los cortes de carne y cocina a fuego lento en hogao 40 minutos hasta que ablande.',
      pack: 'Carne en salsa criolla con arroz y calabacín juntos.'
    },
    breakfast: {
      title: 'Huevos pericos sobre arepa y fruta fresca',
      prepTime: '7 min',
      recipeId: 'desayuno-3',
      quickNote: 'Huevos pericos con tomate y cebolla larga sobre arepa tostada y fruta fresca.',
      beverageName: 'Aromática de manzanilla'
    },
    lunch: {
      title: 'Lomo de res salteado con vegetales y arroz',
      sourceDinnerDay: 8,
      isFreshOrPacked: 'Empacado anoche (Cena Día 8)',
      packingTip: 'Refractaria hermética lista. Recalentar 2 minutos a potencia alta.',
      recipeId: 'cena-dia-8',
      reheatTip: 'Microondas 2 min tapado.'
    },
    dinner: {
      title: 'Posta de res en salsa criolla con arroz y calabacín',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '45 min',
      recipeId: 'cena-dia-9',
      carbohydrate: 'Arroz blanco (250 g)',
      proteinType: 'res',
      keyTip: 'La cocción lenta en el hogao concentra el sabor y ablanda las fibras de la posta.'
    },
    nextDayLunch: {
      title: 'Posta de res en salsa criolla con arroz y calabacín',
      note: 'La salsa criolla mantiene la carne húmeda y con gran sazón al recalentar en el trabajo.'
    }
  },

  {
    dayNumber: 10,
    weekNumber: 2,
    title: 'Día 10: Pollo Guisado en Hogao Casero',
    beverage: {
      name: 'Café campesino recién colado',
      type: 'cafe',
      quickPrep: '3 min • Café colombiano tostado colado en greca o filtro',
      healthNote: 'Aroma fresco matutino sin azúcar añadida.'
    },
    prepAlert: {
      thaw: 'Pasa las presas de pollo mixtas (800 g) a la nevera temprano.',
      soak: 'Pon 350 g de garbanzos secos en agua abundante con una pizca de sal desde esta noche para la cena de mañana.',
      cook: 'Dora las presas de pollo, añade el hogao, las papas y zanahorias; tapa 30 minutos.',
      pack: 'Pollo, papas y zanahorias en recipiente hermético con su caldito.'
    },
    breakfast: {
      title: 'Huevos duros con aguacate sobre pan tostado',
      prepTime: '6 min',
      recipeId: 'desayuno-4',
      quickNote: 'Huevos cocidos en rodajas con medio aguacate triturado con sal y limón sobre pan tostado.',
      beverageName: 'Café campesino'
    },
    lunch: {
      title: 'Posta de res en salsa criolla con arroz',
      sourceDinnerDay: 9,
      isFreshOrPacked: 'Empacado anoche (Cena Día 9)',
      packingTip: 'Lleva la refractaria hermética con posta y arroz bien sellada. Calentar 2.5 min.',
      recipeId: 'cena-dia-9',
      reheatTip: 'Microondas 2.5 min hasta que la salsa borbotee.'
    },
    dinner: {
      title: 'Pollo guisado en hogao tradicional con papa y zanahoria',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '40 min',
      recipeId: 'cena-dia-10',
      carbohydrate: 'Papa pastusa (350 g) y Zanahoria (200 g)',
      proteinType: 'pollo',
      keyTip: 'El caldo espeso del guiso se produce por la reducción lenta del tomate y cebolla.'
    },
    nextDayLunch: {
      title: 'Pollo guisado en hogao con papa y zanahoria',
      note: 'El guiso espeso de hogao es el rey del recalentado casero colombiano.'
    }
  },

  {
    dayNumber: 11,
    weekNumber: 2,
    title: 'Día 11: Cazuela de Garbanzos y Huevo',
    beverage: {
      name: 'Chocolate de mesa tradicional espumado',
      type: 'chocolate',
      quickPrep: '5 min • Chocolate batido con molinillo en leche tibia',
      healthNote: 'Consumo moderado de chocolate con leche descremada para energía limpia.'
    },
    prepAlert: {
      soak: 'Revisa que los garbanzos hayan cumplido mínimo 8 horas en remojo previo.',
      cook: 'Cocina los garbanzos en olla a presión 25 min; añade hogao, ahuyama y huevos duros en cuartos.',
      pack: 'Cazuela espesa con papas y huevo duro en hermético hondo.'
    },
    breakfast: {
      title: 'Avena cremosa caliente con leche, canela y banano',
      prepTime: '7 min',
      recipeId: 'desayuno-5',
      quickNote: 'Avena en hojuelas cocida con leche descremada, canela y rodajas de banano fresco.',
      beverageName: 'Chocolate tradicional'
    },
    lunch: {
      title: 'Pollo guisado en hogao con papa y zanahoria',
      sourceDinnerDay: 10,
      isFreshOrPacked: 'Empacado anoche (Cena Día 10)',
      packingTip: 'Listo en recipiente hermético. Recalentar 2.5 min en el trabajo.',
      recipeId: 'cena-dia-10',
      reheatTip: 'Microondas 2.5 min tapado.'
    },
    dinner: {
      title: 'Cazuela rápida de garbanzos con huevo cocido y papa',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '35 min',
      recipeId: 'cena-dia-11',
      carbohydrate: 'Papa criolla (300 g) y Ahuyama (300 g)',
      proteinType: 'granos',
      keyTip: 'La combinación de garbanzos con huevo cocido ofrece proteína vegetal y animal de alto valor.'
    },
    nextDayLunch: {
      title: 'Cazuela de garbanzos con huevo cocido y papa',
      note: 'La cazuela se asienta y adquiere una textura aterciopelada muy agradable.'
    }
  },

  {
    dayNumber: 12,
    weekNumber: 2,
    title: 'Día 12: Filete de Pescado al Ajillo Suave',
    beverage: {
      name: 'Café con leche recién preparado',
      type: 'cafe',
      quickPrep: '4 min • Café filtrado con leche baja en grasa',
      healthNote: 'Aporte matutino de proteína y cafeína suave.'
    },
    prepAlert: {
      thaw: 'Pasa 600 g de filetes de pescado blanco del congelador a la nevera desde la mañana.',
      cook: 'Dora el ajo laminado en aceite vegetal a fuego medio; dora los filetes 3 min por lado.',
      pack: 'Pescado, arroz y calabacín juntos. Empaca limón fresco aparte.'
    },
    breakfast: {
      title: 'Omelet de huevo con queso campesino, arepa y fruta',
      prepTime: '8 min',
      recipeId: 'desayuno-6',
      quickNote: 'Omelet esponjoso relleno de queso campesino fresco, arepa y rodajas de papaya.',
      beverageName: 'Café con leche'
    },
    lunch: {
      title: 'Cazuela de garbanzos con huevo cocido y papa',
      sourceDinnerDay: 11,
      isFreshOrPacked: 'Empacado anoche (Cena Día 11)',
      packingTip: 'Recalentar en plato hondo de microondas 2.5 min bien cubierto.',
      recipeId: 'cena-dia-11',
      reheatTip: 'Microondas 2–3 min.'
    },
    dinner: {
      title: 'Filete de pescado al ajillo suave con arroz y calabacín',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '25 min',
      recipeId: 'cena-dia-12',
      carbohydrate: 'Arroz blanco (250 g)',
      proteinType: 'pescado',
      keyTip: 'Ajo suave dorado sin quemar para no amargar el pescado; añadir limón al final.'
    },
    nextDayLunch: {
      title: 'Filete de pescado al ajillo suave con arroz y calabacín',
      note: 'Recalentar a potencia suave en microondas para preservar la delicadeza del pescado.'
    }
  },

  {
    dayNumber: 13,
    weekNumber: 2,
    title: 'Día 13: Sancocho Ligero Tradicional',
    beverage: {
      name: 'Café negro campesino caliente',
      type: 'cafe',
      quickPrep: '3 min • Café colado recién preparado sin azúcar',
      healthNote: 'Bebida digestiva ligera para iniciar la preparación del sancocho.'
    },
    prepAlert: {
      thaw: 'Pasa las presas de pollo (800 g) a la nevera desde la mañana.',
      cook: 'Cocina en olla amplia la mazorca, plátano verde, yuca y pollo con cilantro fresco.',
      pack: 'Usa termo para sopa o recipiente con cierre hermético antifugas para llevar el caldo y las presas.'
    },
    breakfast: {
      title: 'Arepa con queso campesino, huevo cocido y papaya',
      prepTime: '8 min',
      recipeId: 'desayuno-1',
      quickNote: 'Arepa caliente con queso campesino, 2 huevos duros y papaya dulce.',
      beverageName: 'Café campesino'
    },
    lunch: {
      title: 'Filete de pescado al ajillo suave con arroz',
      sourceDinnerDay: 12,
      isFreshOrPacked: 'Empacado anoche (Cena Día 12)',
      packingTip: 'Recipiente hermético con pescado y arroz. Exprimir limón tras calentar.',
      recipeId: 'cena-dia-12',
      reheatTip: 'Microondas 1.5–2 min potencia media.'
    },
    dinner: {
      title: 'Sancocho ligero de pollo con mazorca, plátano y yuca',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '50 min',
      recipeId: 'cena-dia-13',
      carbohydrate: 'Mazorca (500 g), Plátano verde (350 g) y Yuca (500 g)',
      proteinType: 'pollo',
      keyTip: 'Carbohidratos tradicionales en su punto; terminar con abundante cilantro fresco picado.'
    },
    nextDayLunch: {
      title: 'Sancocho ligero de pollo con mazorca, plátano y yuca',
      note: 'Llevar en termo o recipiente hermético hermético. El caldo caliente al mediodía es inigualable.'
    }
  },

  {
    dayNumber: 14,
    weekNumber: 2,
    title: 'Día 14: Tortilla Española con Calabacín',
    beverage: {
      name: 'Aromática caliente de hierbas de la huerta',
      type: 'aromatica',
      quickPrep: '3 min • Infusión de menta, hierbabuena y limón',
      healthNote: 'Cierre del plan quincenal con una infusión digestiva natural.'
    },
    prepAlert: {
      cook: 'Confita las papas y cebolla a fuego suave con calabacín rallado; cuaja la tortilla dorada por ambos lados.',
      pack: 'Corta la tortilla en cuartos generosos. Puede comerse tibia o a temperatura ambiente.'
    },
    breakfast: {
      title: 'Huevos revueltos con tomate y cebolla, tostada y banano',
      prepTime: '8 min',
      recipeId: 'desayuno-2',
      quickNote: 'Huevos revueltos jugosos con pan integral tostado y banano.',
      beverageName: 'Aromática de hierbas'
    },
    lunch: {
      title: 'Sancocho ligero de pollo con mazorca, plátano y yuca',
      sourceDinnerDay: 13,
      isFreshOrPacked: 'Empacado anoche (Cena Día 13)',
      packingTip: 'Calentar bien el caldo hasta que hierva suavemente en microondas o recipiente.',
      recipeId: 'cena-dia-13',
      reheatTip: 'Microondas 3 min hasta que esté muy caliente.'
    },
    dinner: {
      title: 'Tortilla española rápida con papa, huevo y calabacín',
      yieldPortions: 4,
      eatPortions: 2,
      packPortions: 2,
      prepTime: '30 min',
      recipeId: 'cena-dia-14',
      carbohydrate: 'Papa pastusa confitada (500 g)',
      proteinType: 'huevo',
      keyTip: 'Voltear con un plato llano con cuidado; dejar reposar 5 min antes de cortar las porciones.'
    },
    nextDayLunch: {
      title: 'Tortilla española rápida con ensalada fresca',
      note: 'Excelente plato para llevar: deliciosa tanto fría como tibia en el trabajo.'
    }
  }
];
