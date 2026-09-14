import { MarketItem } from '@/types';

export interface ShoppingTip {
  title: string;
  badge: string;
  description: string;
}

export const SHOPPING_ORGANIZATION_TIPS: ShoppingTip[] = [
  {
    title: '1. Porciona y congela proteínas',
    badge: 'Proteínas',
    description: 'Al llegar del mercado, divide las carnes, pollo, pescado y camarones en bolsas rotuladas con fecha y receta. Baja del congelador a la nevera la noche anterior solo lo que usarás. ¡Nunca descongeles carnes sobre la mesa a temperatura ambiente!'
  },
  {
    title: '2. Prepara bases dos veces por semana',
    badge: 'Prep Semanal',
    description: 'Haz hogao para 2–3 cenas (tomate, cebolla, ajo, pimentón, comino y poco aceite) y refrigera en frascos limpios. Hierve 6–8 huevos duros el domingo para tener listos los desayunos en 2 minutos.'
  },
  {
    title: '3. Empaca correctamente el almuerzo',
    badge: 'Empaque Seguro',
    description: 'Calientes juntos en refractaria hermética: arroz, carnes, pollo, pescado, purés o guisos. Fríos y aparte: aguacate entero o con limón, ensalada de repollo o pepino y salsas frescas.'
  },
  {
    title: '4. Compra en dos tandas (Inicio y Día 8)',
    badge: 'Frescos Día 8',
    description: 'Tanda 1 al inicio para congelados, granos y despensa. Tanda 2 en el Día 8 para reponer papaya, banano, aguacate, pepino, cilantro y espinaca fresca, garantizando cero desperdicio y máximo sabor.'
  },
  {
    title: '5. Bebidas inteligentes y moderación',
    badge: 'Bebidas OMS',
    description: 'Acompaña los desayunos con café con leche, café negro o aromáticas naturales. Limita el chocolate de mesa a 2 veces por semana y prioriza agua o infusiones sin azúcar sobre jugos azucarados.'
  }
];

export const ORGANIZATION_TIPS = SHOPPING_ORGANIZATION_TIPS;

export const SHOPPING_LIST_INITIAL: MarketItem[] = [
  // ==================== CARNES Y POLLO ====================
  {
    id: 'mkt-1',
    category: 'carnes_pollo',
    name: 'Muslos o contramuslos de pollo',
    calculatedUsage: '800 g para Cena Día 1 (4 presas al horno con papas)',
    buyAmount: '800 g (aprox. 1.6 lb)',
    unitConversion: '0.8 kg / 1.6 lb',
    estimatedPriceCop: 14000,
    notes: 'Presas con o sin piel. Congelar porcionado.',
    batch: 'inicio'
  },
  {
    id: 'mkt-2',
    category: 'carnes_pollo',
    name: 'Pechuga o contramuslos sin piel',
    calculatedUsage: '700 g para Arroz con pollo (Día 5)',
    buyAmount: '700 g (aprox. 1.4 lb)',
    unitConversion: '0.7 kg / 1.4 lb',
    estimatedPriceCop: 15000,
    notes: 'Para cocinar, desmechar y reservar caldo.',
    batch: 'inicio'
  },
  {
    id: 'mkt-3',
    category: 'carnes_pollo',
    name: 'Presas de pollo mixtas (pierna-pernil, alas)',
    calculatedUsage: '800 g para Pollo guisado en hogao (Día 10)',
    buyAmount: '800 g (aprox. 1.6 lb)',
    unitConversion: '0.8 kg / 1.6 lb',
    estimatedPriceCop: 13000,
    notes: 'Presas con hueso para dar más sabor al guiso.',
    batch: 'inicio'
  },
  {
    id: 'mkt-4',
    category: 'carnes_pollo',
    name: 'Presas de pollo con hueso para sancocho',
    calculatedUsage: '800 g para Sancocho ligero (Día 13)',
    buyAmount: '800 g (aprox. 1.6 lb)',
    unitConversion: '0.8 kg / 1.6 lb',
    estimatedPriceCop: 13000,
    notes: 'Comprar congelado o fresco en tanda 2.',
    batch: 'dia8'
  },
  {
    id: 'mkt-5',
    category: 'carnes_pollo',
    name: 'Carne molida de res magra (mín. 85/15)',
    calculatedUsage: '500 g Sudada (Día 2) + 500 g Albóndigas (Día 4)',
    buyAmount: '1 kg (2 libras)',
    unitConversion: '1.0 kg / 2.0 lb',
    estimatedPriceCop: 26000,
    notes: 'Dividir en 2 bolsas de 500 g y congelar plano para descongelar rápido.',
    batch: 'inicio'
  },
  {
    id: 'mkt-6',
    category: 'carnes_pollo',
    name: 'Lomo de res en tiras (o cadera tierna)',
    calculatedUsage: '600 g para Lomo salteado con vegetales (Día 8)',
    buyAmount: '600 g (aprox. 1.2 lb)',
    unitConversion: '0.6 kg / 1.2 lb',
    estimatedPriceCop: 19000,
    notes: 'Pedir cortado en tiras o trozos para salteado al wok.',
    batch: 'inicio'
  },
  {
    id: 'mkt-7',
    category: 'carnes_pollo',
    name: 'Carne de res para posta / guisar (paletero o murillo)',
    calculatedUsage: '350 g Fríjoles (Día 6) + 700 g Posta criolla (Día 9)',
    buyAmount: '1.1 kg (aprox. 2.2 lb)',
    unitConversion: '1.1 kg / 2.2 lb',
    estimatedPriceCop: 28000,
    notes: 'Dividir en: 350 g en cubitos para fríjoles y 700 g en filetes/trozos para posta.',
    batch: 'inicio'
  },

  // ==================== PESCADOS Y MARISCOS ====================
  {
    id: 'mkt-8',
    category: 'pescados_mariscos',
    name: 'Filetes de pescado blanco (tilapia, basa o merluza)',
    calculatedUsage: '600 g Plancha (Día 3) + 600 g Ajillo suave (Día 12)',
    buyAmount: '1.2 kg (aprox. 2.5 lb / 6–8 filetes)',
    unitConversion: '1.2 kg / 2.5 lb',
    estimatedPriceCop: 24000,
    notes: 'Comprar congelados al vacío; descongelar siempre en nevera.',
    batch: 'inicio'
  },
  {
    id: 'mkt-9',
    category: 'pescados_mariscos',
    name: 'Camarones crudos limpios o precocidos congelados',
    calculatedUsage: '500 g para Camarones al ajillo (Día 7)',
    buyAmount: '500 g (1 libra)',
    unitConversion: '0.5 kg / 1.0 lb',
    estimatedPriceCop: 22000,
    notes: 'Tamaño mediano o grande. Mantener en congelador hasta el Día 7.',
    batch: 'inicio'
  },

  // ==================== HUEVOS Y LÁCTEOS ====================
  {
    id: 'mkt-10',
    category: 'huevos_lacteos',
    name: 'Huevos de gallina frescos (tipo AA)',
    calculatedUsage: 'Desayunos diarios + Cazuela garbanzos + Tortilla española (aprox. 36 huevos)',
    buyAmount: '1 cubeta / panal de 30 + 1 docena (o 40 unidades)',
    unitConversion: '40 unidades',
    estimatedPriceCop: 22000,
    notes: 'Cocinar 6–8 huevos duros en batch el domingo para ahorrar tiempo.',
    batch: 'inicio'
  },
  {
    id: 'mkt-11',
    category: 'huevos_lacteos',
    name: 'Queso campesino fresco o cuajada baja en sal',
    calculatedUsage: '40 g por desayuno en Días 1, 6, 7, 12 y 13 (aprox. 500 g)',
    buyAmount: '500 g (1 libra)',
    unitConversion: '0.5 kg / 1.0 lb',
    estimatedPriceCop: 11000,
    notes: 'Mantener bien refrigerado en recipiente con rejilla escurridora.',
    batch: 'inicio'
  },
  {
    id: 'mkt-12',
    category: 'huevos_lacteos',
    name: 'Leche entera o descremada',
    calculatedUsage: 'Para avena caliente, puré de papa, cafés y chocolate espumoso',
    buyAmount: '3 bolsas / litros',
    unitConversion: '3 litros',
    estimatedPriceCop: 12000,
    notes: 'Leche pasteurizada para consumo quincenal.',
    batch: 'inicio'
  },

  // ==================== GRANOS Y CEREALES ====================
  {
    id: 'mkt-13',
    category: 'granos_cereales',
    name: 'Fríjoles rojos secos (cargamanto o bola roja)',
    calculatedUsage: '350 g para Cena Día 6 (4 porciones)',
    buyAmount: '500 g (1 libra)',
    unitConversion: '0.5 kg / 1.0 lb',
    estimatedPriceCop: 7500,
    notes: 'Remojar mínimo 8 horas en agua abundante antes de la cocción.',
    batch: 'inicio'
  },
  {
    id: 'mkt-14',
    category: 'granos_cereales',
    name: 'Garbanzos secos',
    calculatedUsage: '350 g para Cazuela con huevo (Día 11)',
    buyAmount: '500 g (1 libra)',
    unitConversion: '0.5 kg / 1.0 lb',
    estimatedPriceCop: 7000,
    notes: 'Remojar la noche anterior con una pizca de sal.',
    batch: 'inicio'
  },
  {
    id: 'mkt-15',
    category: 'granos_cereales',
    name: 'Arroz blanco de grano largo',
    calculatedUsage: 'Días 1, 2, 5, 6, 7, 8, 9 y 12 (aprox. 2 kg en crudo)',
    buyAmount: '2.5 kg (5 libras)',
    unitConversion: '2.5 kg / 5.0 lb',
    estimatedPriceCop: 11500,
    notes: 'Porciones moderadas calculadas (60–70 g crudo por persona).',
    batch: 'inicio'
  },
  {
    id: 'mkt-16',
    category: 'granos_cereales',
    name: 'Avena en hojuelas entera',
    calculatedUsage: 'Desayunos Días 5 y 11 (aprox. 160 g)',
    buyAmount: '500 g (1 bolsa)',
    unitConversion: '0.5 kg / 1.0 lb',
    estimatedPriceCop: 4500,
    notes: 'Aporta fibra soluble y saciedad prolongada.',
    batch: 'inicio'
  },

  // ==================== TUBÉRCULOS, PLÁTANOS Y HARINAS ====================
  {
    id: 'mkt-17',
    category: 'tuberculos_harinas',
    name: 'Papa (criolla y pastusa)',
    calculatedUsage: 'Días 1, 2, 3, 4, 10, 11 y 14 (aprox. 3 kg en recetas)',
    buyAmount: '3.5 kg (7 libras)',
    unitConversion: '3.5 kg / 7.0 lb',
    estimatedPriceCop: 13000,
    notes: 'Almacenar en lugar fresco, seco y oscuro para evitar que brote.',
    batch: 'inicio'
  },
  {
    id: 'mkt-18',
    category: 'tuberculos_harinas',
    name: 'Yuca fresca o congelada en trozos',
    calculatedUsage: '500 g para Sancocho ligero de pollo (Día 13)',
    buyAmount: '1 kg (2 libras)',
    unitConversion: '1.0 kg / 2.0 lb',
    estimatedPriceCop: 4000,
    notes: 'Pelar y congelar en trozos o comprar bolsa congelada.',
    batch: 'dia8'
  },
  {
    id: 'mkt-19',
    category: 'tuberculos_harinas',
    name: 'Plátano verde campesino',
    calculatedUsage: '300 g Fríjoles (Día 6) + 350 g Sancocho (Día 13)',
    buyAmount: '1 kg (2–3 plátanos verdes)',
    unitConversion: '1.0 kg / 2.0 lb',
    estimatedPriceCop: 4500,
    notes: 'Comprar 1 plátano en Tanda 1 y los demás en Tanda 2.',
    batch: 'dia8'
  },
  {
    id: 'mkt-20',
    category: 'tuberculos_harinas',
    name: 'Mazorcas de maíz tierno',
    calculatedUsage: '500 g para Sancocho tradicional (Día 13)',
    buyAmount: '2 unidades medianas (aprox. 600 g)',
    unitConversion: '2 unidades',
    estimatedPriceCop: 3500,
    notes: 'Trocear en rodajas para cocción con pollo y plátano.',
    batch: 'dia8'
  },
  {
    id: 'mkt-21',
    category: 'tuberculos_harinas',
    name: 'Arepas de maíz medianas campesinas',
    calculatedUsage: 'Desayunos Días 1, 3, 6, 7, 12 y 13 (aprox. 14 arepas)',
    buyAmount: '3 paquetes de 5 unidades',
    unitConversion: '15 unidades',
    estimatedPriceCop: 9000,
    notes: 'Arepas delgadas de maíz blanco o amarillo sin sal añadida.',
    batch: 'inicio'
  },
  {
    id: 'mkt-22',
    category: 'tuberculos_harinas',
    name: 'Pan integral tajado de panadería',
    calculatedUsage: 'Desayunos Días 2, 4, 8, 10 y 14 + Sándwich inicial',
    buyAmount: '1 paquete grande (aprox. 18 tajadas)',
    unitConversion: '1 paquete',
    estimatedPriceCop: 6500,
    notes: 'Tostar 2 minutos para que quede crocante.',
    batch: 'inicio'
  },

  // ==================== VERDURAS Y HIERBAS ====================
  {
    id: 'mkt-23',
    category: 'verduras_hierbas',
    name: 'Tomate chonto maduro',
    calculatedUsage: 'Hogaos, sudados, pericos y salteados (aprox. 3 kg)',
    buyAmount: '3.5 kg (7 libras)',
    unitConversion: '3.5 kg / 7.0 lb',
    estimatedPriceCop: 12000,
    notes: 'Comprar 2 kg maduros en Tanda 1 y reponer 1.5 kg en Tanda 2.',
    batch: 'inicio'
  },
  {
    id: 'mkt-24',
    category: 'verduras_hierbas',
    name: 'Cebolla larga (junca) y cabezona',
    calculatedUsage: 'Base de todos los hogaos y guisos quincenales (aprox. 2.5 kg)',
    buyAmount: '1.5 kg cebolla larga + 1 kg cebolla cabezona',
    unitConversion: '2.5 kg / 5.0 lb',
    estimatedPriceCop: 9000,
    notes: 'Lavar, picar y guardar porciones en recipientes herméticos.',
    batch: 'inicio'
  },
  {
    id: 'mkt-25',
    category: 'verduras_hierbas',
    name: 'Calabacín (zucchini) verde',
    calculatedUsage: 'Días 1, 7, 8, 9, 12 y 14 (aprox. 2 kg)',
    buyAmount: '2 kg (4–5 unidades medianas)',
    unitConversion: '2.0 kg / 4.0 lb',
    estimatedPriceCop: 8000,
    notes: 'Aporta volumen de vegetales y gran saciedad con pocas calorías.',
    batch: 'inicio'
  },
  {
    id: 'mkt-26',
    category: 'verduras_hierbas',
    name: 'Ahuyama fresca',
    calculatedUsage: 'Puré Día 4 + Espesar fríjoles Día 6 + Cazuela garbanzos Día 11',
    buyAmount: '1.5 kg (trozo grande limpio)',
    unitConversion: '1.5 kg / 3.0 lb',
    estimatedPriceCop: 4500,
    notes: 'Pelar y cortar en cubos para purés y espesantes.',
    batch: 'inicio'
  },
  {
    id: 'mkt-27',
    category: 'verduras_hierbas',
    name: 'Zanahorias frescas',
    calculatedUsage: 'Guisos, arroz con pollo, pollo al horno y ensaladas (aprox. 1.8 kg)',
    buyAmount: '2 kg (4 libras)',
    unitConversion: '2.0 kg / 4.0 lb',
    estimatedPriceCop: 6000,
    notes: 'Se conservan perfectamente en el cajón de la nevera.',
    batch: 'inicio'
  },
  {
    id: 'mkt-28',
    category: 'verduras_hierbas',
    name: 'Pimentón rojo y verde',
    calculatedUsage: 'Hogaos, pollo al horno, lomo salteado y camarones',
    buyAmount: '1.2 kg (5–6 pimentones medianos)',
    unitConversion: '1.2 kg / 2.4 lb',
    estimatedPriceCop: 7000,
    notes: 'Picar en tiras o cubos según la receta.',
    batch: 'inicio'
  },
  {
    id: 'mkt-29',
    category: 'verduras_hierbas',
    name: 'Ajo fresco en cabezas',
    calculatedUsage: 'Marinados, salteados, purés y ajillos',
    buyAmount: '3 cabezas medianas',
    unitConversion: '3 unidades',
    estimatedPriceCop: 3500,
    notes: 'Picar finamente antes de cocinar para activar la alicina.',
    batch: 'inicio',
    isPantryDefault: true
  },
  {
    id: 'mkt-30',
    category: 'verduras_hierbas',
    name: 'Espinacas frescas en hojas',
    calculatedUsage: '250 g Salteadas con pescado (Día 3)',
    buyAmount: '1 atado grande (aprox. 400 g)',
    unitConversion: '0.4 kg / 0.8 lb',
    estimatedPriceCop: 3500,
    notes: 'Lavar y escurrir muy bien; saltear 2 minutos.',
    batch: 'inicio'
  },
  {
    id: 'mkt-31',
    category: 'verduras_hierbas',
    name: 'Repollo blanco o morado fresco',
    calculatedUsage: '300 g para ensalada crujiente con limón (Día 4)',
    buyAmount: '1 repollo mediano (aprox. 800 g)',
    unitConversion: '0.8 kg',
    estimatedPriceCop: 3000,
    notes: 'Rallar fino y aderezar con limón en el momento de comer.',
    batch: 'inicio'
  },
  {
    id: 'mkt-32',
    category: 'verduras_hierbas',
    name: 'Cilantro fresco campesino',
    calculatedUsage: 'Terminado de sancocho, fríjoles, cazuelas y sopas',
    buyAmount: '2 atados frescos',
    unitConversion: '2 atados',
    estimatedPriceCop: 2500,
    notes: 'Comprar 1 atado en tanda 1 y otro en tanda 2.',
    batch: 'dia8'
  },

  // ==================== FRUTAS ====================
  {
    id: 'mkt-33',
    category: 'frutas',
    name: 'Papaya madura fresca',
    calculatedUsage: 'Desayunos Días 1, 3, 7, 9 y 13 (aprox. 2.5 kg)',
    buyAmount: '1 papaya grande o 2 medianas',
    unitConversion: '2.5 kg',
    estimatedPriceCop: 8000,
    notes: 'Comprar 1 mediana al inicio y otra en Tanda 2.',
    batch: 'inicio'
  },
  {
    id: 'mkt-34',
    category: 'frutas',
    name: 'Bananos frescos',
    calculatedUsage: 'Desayunos Días 2, 5, 8, 10, 11 y 14 (aprox. 14 bananos)',
    buyAmount: '2 gajos medianos (aprox. 2 kg)',
    unitConversion: '14 unidades',
    estimatedPriceCop: 6000,
    notes: 'Comprar un racimo semiverde para que madure gradualmente.',
    batch: 'inicio'
  },
  {
    id: 'mkt-35',
    category: 'frutas',
    name: 'Limones frescos tahití o común',
    calculatedUsage: 'Marinados, pescado, ensaladas, camarones y aderezos',
    buyAmount: '1.2 kg (aprox. 12–15 limones)',
    unitConversion: '1.2 kg',
    estimatedPriceCop: 5000,
    notes: 'Aportan acidez y conservan frescos los almuerzos.',
    batch: 'inicio'
  },
  {
    id: 'mkt-36',
    category: 'frutas',
    name: 'Aguacates maduros hass o papelillo',
    calculatedUsage: 'Día 4 (huevos con aguacate), Día 6 (fríjoles) y Día 10',
    buyAmount: '4 aguacates medianos',
    unitConversion: '4 unidades',
    estimatedPriceCop: 8000,
    notes: 'Comprar 2 para la semana 1 y 2 en tanda 2 (Día 8).',
    batch: 'dia8'
  },

  // ==================== BEBIDAS E INFUSIONES ====================
  {
    id: 'mkt-37',
    category: 'bebidas',
    name: 'Café colombiano tostado y molido',
    calculatedUsage: 'Desayunos diarios (café con leche, campesino o negro)',
    buyAmount: '1 libra (500 g)',
    unitConversion: '500 g / 1 lb',
    estimatedPriceCop: 16000,
    notes: 'Café suave de origen colombiano para colar en greca o filtro.',
    batch: 'inicio',
    isPantryDefault: true
  },
  {
    id: 'mkt-38',
    category: 'bebidas',
    name: 'Chocolate tradicional colombiano en pastillas',
    calculatedUsage: 'Desayunos Días 1, 6 y 11 (chocolatadas espumosas)',
    buyAmount: '1 paquete de 250 g (pastillas para batir)',
    unitConversion: '250 g (1 paquete)',
    estimatedPriceCop: 7500,
    notes: 'Batir caliente con molinillo tradicional o licuadora.',
    batch: 'inicio',
    isPantryDefault: true
  },
  {
    id: 'mkt-39',
    category: 'bebidas',
    name: 'Hierbas para infusión aromática (hierbabuena, menta o manzanilla)',
    calculatedUsage: 'Desayunos Días 4, 9 y 14 (infusiones digestivas sin azúcar)',
    buyAmount: '1 caja de sobres o atado de hierbas frescas',
    unitConversion: '1 caja / 20 sobres',
    estimatedPriceCop: 4500,
    notes: 'Recomendación OMS para hidratarse saludablemente sin azúcares libres.',
    batch: 'inicio',
    isPantryDefault: true
  },

  // ==================== DESPENSA Y CONDIMENTOS ====================
  {
    id: 'mkt-40',
    category: 'despensa_condimentos',
    name: 'Aceite vegetal para cocinar (girasol o maíz)',
    calculatedUsage: 'Sofritos, sellados y confitado de papa (aprox. 400 ml)',
    buyAmount: '1 botella (500 ml o 900 ml)',
    unitConversion: '500 ml',
    estimatedPriceCop: 8500,
    notes: 'Usar con moderación (1 cucharada por cocción).',
    batch: 'inicio',
    isPantryDefault: true
  },
  {
    id: 'mkt-41',
    category: 'despensa_condimentos',
    name: 'Mantequilla de vaca o ghee',
    calculatedUsage: 'Camarones al ajillo (Día 7) y sándwich inicial (50 g)',
    buyAmount: '1 barra pequeña (125 g)',
    unitConversion: '125 g',
    estimatedPriceCop: 4500,
    notes: 'Para dorar con suavidad y emulsionar ajillos.',
    batch: 'inicio',
    isPantryDefault: true
  },
  {
    id: 'mkt-42',
    category: 'despensa_condimentos',
    name: 'Sal común de cocina iodada',
    calculatedUsage: 'Condimentación general quincenal',
    buyAmount: '1 bolsa (500 g o 1 kg)',
    unitConversion: '500 g',
    estimatedPriceCop: 2000,
    notes: 'Ingrediente básico de alacena.',
    batch: 'inicio',
    isPantryDefault: true
  },
  {
    id: 'mkt-43',
    category: 'despensa_condimentos',
    name: 'Especias básicas: Comino, Paprika, Orégano, Canela y Pimienta',
    calculatedUsage: 'Sazón típica de las 14 cenas colombianas',
    buyAmount: 'Juego de sobres surtidos',
    unitConversion: '5 sobres',
    estimatedPriceCop: 6000,
    notes: 'Especias tradicionales de la cocina colombiana.',
    batch: 'inicio',
    isPantryDefault: true
  }
];
