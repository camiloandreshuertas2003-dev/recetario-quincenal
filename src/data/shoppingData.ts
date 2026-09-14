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
    description: 'Al llegar del mercado, divide las proteínas en bolsas o recipientes rotulados con receta y fecha. Pasa del congelador a la nevera, la noche anterior, solamente la proteína que usarás al día siguiente. ¡Nunca descongeles carnes, pollo, pescado o camarones sobre la mesa a temperatura ambiente!'
  },
  {
    title: '2. Prepara bases dos veces por semana',
    badge: 'Prep Semanal',
    description: 'Haz hogao para 2–3 cenas (tomate, cebolla, ajo, pimentón, comino y poco aceite) y refrigera en porciones. Cocina 6–8 huevos duros el domingo y repite a mitad de semana para desayunos y leguminosas. Ten 6–8 arepas listas en nevera o congelador.'
  },
  {
    title: '3. Empaca correctamente el almuerzo',
    badge: 'Empaque Seguro',
    description: 'Calientes juntos: arroz, guisos, pollo, carne, pescado, camarones o sopas (usa recipientes herméticos). Fríos y aparte: aguacate, ensalada de repollo, pepino, limón y salsas frescas. Para el sancocho o sopas, usa termos de cierre seguro.'
  },
  {
    title: '4. Compra de frescos en dos tandas',
    badge: 'Frescos Día 8',
    description: 'Tanda 1 al inicio de la quincena. Tanda 2 en el Día 8 para reponer papaya, banano, aguacate, pepino, cilantro, espinaca y verduras frescas, evitando el desperdicio y garantizando el mejor sabor.'
  }
];

export const ORGANIZATION_TIPS = SHOPPING_ORGANIZATION_TIPS;

export const SHOPPING_LIST_INITIAL: MarketItem[] = [
  // ==================== PROTEÍNAS Y GRANOS ====================
  {
    id: 'mkt-1',
    category: 'proteinas',
    name: 'Muslos o contramuslos de pollo',
    calculatedUsage: '800 g para Cena Día 1 (4 presas al horno)',
    buyAmount: '800 g (aprox. 1.6 lb)',
    estimatedPriceCop: 14000,
    notes: 'Presas con o sin piel. Congelar porcionado.',
    batch: 'inicio'
  },
  {
    id: 'mkt-2',
    category: 'proteinas',
    name: 'Pechuga o contramuslo sin piel',
    calculatedUsage: '700 g para Arroz con pollo (Día 5)',
    buyAmount: '700 g (aprox. 1.4 lb)',
    estimatedPriceCop: 15000,
    notes: 'Para cocinar, desmechar y reservar caldo.',
    batch: 'inicio'
  },
  {
    id: 'mkt-3',
    category: 'proteinas',
    name: 'Presa mixta de pollo (pierna-pernil, alas)',
    calculatedUsage: '800 g para Pollo guisado (Día 10)',
    buyAmount: '800 g (aprox. 1.6 lb)',
    estimatedPriceCop: 13000,
    notes: 'Variedad de cortes para guiso criollo jugoso.',
    batch: 'inicio'
  },
  {
    id: 'mkt-4',
    category: 'proteinas',
    name: 'Pollo en presas con hueso (para sancocho)',
    calculatedUsage: '800 g para Sancocho de pollo (Día 13)',
    buyAmount: '800 g (aprox. 1.6 lb)',
    estimatedPriceCop: 13000,
    notes: 'Con hueso para dar máximo sabor y sazón al caldo.',
    batch: 'inicio'
  },
  {
    id: 'mkt-5',
    category: 'proteinas',
    name: 'Bistec de res magro (bola, muchacho, lomo)',
    calculatedUsage: '800 g para Bistec encebollado (Día 3)',
    buyAmount: '800 g (aprox. 1.6 lb / 4 filetes)',
    estimatedPriceCop: 24000,
    notes: 'Filetes de grosor uniforme para que no se resequen.',
    batch: 'inicio'
  },
  {
    id: 'mkt-6',
    category: 'proteinas',
    name: 'Carne molida de res magra',
    calculatedUsage: '1.6 kg (800 g Albóndigas Día 8 + 800 g Guisada Día 12)',
    buyAmount: '1.6 kg (aprox. 3.2 lb en 2 paquetes de 800 g)',
    estimatedPriceCop: 38000,
    notes: 'Congelar en dos paquetes rotulados de 800 g c/u.',
    batch: 'inicio'
  },
  {
    id: 'mkt-7',
    category: 'proteinas',
    name: 'Filete de pescado blanco (tilapia, basa, etc.)',
    calculatedUsage: '1.6 kg (800 g Sudado Día 4 + 800 g Al limón Día 11)',
    buyAmount: '1.6 kg (aprox. 3.2 lb en 2 paquetes de 800 g)',
    estimatedPriceCop: 32000,
    notes: 'Filetes firmes sin espinas. Mantener congelados.',
    batch: 'inicio'
  },
  {
    id: 'mkt-8',
    category: 'proteinas',
    name: 'Camarón crudo pelado y desvenado',
    calculatedUsage: '800 g para Camarones al ajillo (Día 7)',
    buyAmount: '800 g (o 1 kg con cáscara)',
    estimatedPriceCop: 28000,
    notes: 'Descongelar en la nevera la noche anterior.',
    batch: 'inicio'
  },
  {
    id: 'mkt-9',
    category: 'proteinas',
    name: 'Huevos frescos campesinos',
    calculatedUsage: 'Desayunos, Tortilla (10 unds), Lentejas, Garbanzos y Albóndigas',
    buyAmount: '34 unidades (1 cubeta + 4 adicionales)',
    estimatedPriceCop: 22000,
    notes: 'Hervir 6–8 huevos el domingo para tener listos en la semana.',
    batch: 'inicio'
  },
  {
    id: 'mkt-10',
    category: 'proteinas',
    name: 'Lentejas secas',
    calculatedUsage: '300 g para Cena Día 2',
    buyAmount: '500 g (1 libra)',
    estimatedPriceCop: 4500,
    notes: 'Lavar y revisar antes de cocinar con hogao.',
    batch: 'inicio'
  },
  {
    id: 'mkt-11',
    category: 'proteinas',
    name: 'Fríjoles secos (cargamanto, rojos o pintos)',
    calculatedUsage: '350 g para Cena Día 6',
    buyAmount: '500 g (1 libra)',
    estimatedPriceCop: 6500,
    notes: 'Remojar 8–12 horas la noche anterior.',
    batch: 'inicio'
  },
  {
    id: 'mkt-12',
    category: 'proteinas',
    name: 'Garbanzos secos',
    calculatedUsage: '300 g para Cena Día 9',
    buyAmount: '500 g (1 libra)',
    estimatedPriceCop: 5500,
    notes: 'Remojar 8–12 horas antes de cocinar.',
    batch: 'inicio'
  },
  {
    id: 'mkt-13',
    category: 'proteinas',
    name: 'Arroz blanco',
    calculatedUsage: 'Guarniciones de cenas y desayunos (aprox. 1.2 kg)',
    buyAmount: '1.5 kg (3 libras)',
    estimatedPriceCop: 7500,
    notes: 'Medir en crudo por receta para control de porciones.',
    batch: 'inicio'
  },
  {
    id: 'mkt-14',
    category: 'proteinas',
    name: 'Harina de maíz precocida o miga de pan',
    calculatedUsage: '50 g para aglutinar albóndigas (Día 8)',
    buyAmount: '500 g (1 paquete)',
    estimatedPriceCop: 3500,
    notes: 'Para textura suave y unión de las albóndigas.',
    batch: 'inicio'
  },

  // ==================== VERDURAS, TUBÉRCULOS Y ACOMPAÑAMIENTOS ====================
  {
    id: 'mkt-15',
    category: 'verduras',
    name: 'Papa (criolla y común pastusa)',
    calculatedUsage: 'Días 1, 2, 4, 11 y 13 (aprox. 1.8 kg en recetas)',
    buyAmount: '2.5 kg (5 libras)',
    estimatedPriceCop: 9000,
    notes: 'Lavar y almacenar en lugar fresco y oscuro.',
    batch: 'inicio'
  },
  {
    id: 'mkt-16',
    category: 'verduras',
    name: 'Yuca fresca o congelada',
    calculatedUsage: '500 g para Sancocho de pollo (Día 13)',
    buyAmount: '1 kg (2 libras)',
    estimatedPriceCop: 4000,
    notes: 'Si es fresca, pelar y trocear; o comprar congelada en trozos.',
    batch: 'dia8'
  },
  {
    id: 'mkt-17',
    category: 'verduras',
    name: 'Plátano verde',
    calculatedUsage: '300 g Fríjoles (Día 6) + 350 g Sancocho (Día 13)',
    buyAmount: '1 kg (2–3 plátanos verdes)',
    estimatedPriceCop: 4500,
    notes: 'Comprar 1 plátano en tanda 1 y los demás en tanda 2.',
    batch: 'dia8'
  },
  {
    id: 'mkt-18',
    category: 'verduras',
    name: 'Mazorcas de maíz tierno',
    calculatedUsage: '500 g para Sancocho (Día 13)',
    buyAmount: '2 unidades medianas (aprox. 600 g)',
    estimatedPriceCop: 3500,
    notes: 'Trocear en rodajas para el sancocho tradicional.',
    batch: 'dia8'
  },
  {
    id: 'mkt-19',
    category: 'verduras',
    name: 'Ahuyama fresca',
    calculatedUsage: '400g Fríjoles + 500g Puré albóndigas + 300g Garbanzos',
    buyAmount: '1.5 kg (en trozos o media ahuyama grande)',
    estimatedPriceCop: 4500,
    notes: 'Pelar y cortar en cubos para espesar y puré.',
    batch: 'inicio'
  },
  {
    id: 'mkt-20',
    category: 'verduras',
    name: 'Zanahorias frescas',
    calculatedUsage: 'Guisos, horneados y ensaladas de repollo (aprox. 1.7 kg)',
    buyAmount: '2 kg (4 libras)',
    estimatedPriceCop: 6000,
    notes: 'Duran muy bien toda la quincena en el cajón de verduras.',
    batch: 'inicio'
  },
  {
    id: 'mkt-21',
    category: 'verduras',
    name: 'Calabacín (zucchini)',
    calculatedUsage: 'Día 1 (250g), Día 7 (250g), Día 9 (250g), Día 12 (250g), Día 14 (500g)',
    buyAmount: '1.8 kg (4–5 unidades medianas)',
    estimatedPriceCop: 7500,
    notes: 'Aporta volumen y nutrientes con bajas calorías.',
    batch: 'inicio'
  },
  {
    id: 'mkt-22',
    category: 'verduras',
    name: 'Pimentón rojo y verde',
    calculatedUsage: 'Hogaos, pollo al horno, sudados, camarones y tortilla',
    buyAmount: '1.2 kg (5–6 pimentones medianos)',
    estimatedPriceCop: 7000,
    notes: 'Picar en cubos y julianas para los sofritos.',
    batch: 'inicio'
  },
  {
    id: 'mkt-23',
    category: 'verduras',
    name: 'Tomate chonto maduro',
    calculatedUsage: 'Base de hogaos para todas las cenas y desayunos',
    buyAmount: '3 kg (6 libras)',
    estimatedPriceCop: 11000,
    notes: 'Base imprescindible de salsa criolla colombiana.',
    batch: 'inicio'
  },
  {
    id: 'mkt-24',
    category: 'verduras',
    name: 'Cebolla cabezona y cebolla larga',
    calculatedUsage: 'Sofritos diarios, bistec encebollado y marinados',
    buyAmount: '2.5 kg (4 lb cabezona + 1 lb larga)',
    estimatedPriceCop: 9000,
    notes: 'Almacenar en lugar ventilado y fresco.',
    batch: 'inicio'
  },
  {
    id: 'mkt-25',
    category: 'verduras',
    name: 'Ajo fresco',
    calculatedUsage: 'Marinados de pollo, carne, pescado, ajillo y hogaos',
    buyAmount: '3 cabezas medianas',
    estimatedPriceCop: 3500,
    notes: 'Triturar fresco antes de cada preparación.',
    batch: 'inicio'
  },
  {
    id: 'mkt-26',
    category: 'verduras',
    name: 'Pepino cohombro fresco',
    calculatedUsage: 'Acompañamiento en Días 2, 4, 9 y 14 (aprox. 1.2 kg)',
    buyAmount: '1.5 kg (4 unidades medianas)',
    estimatedPriceCop: 4500,
    notes: 'Consumir fresco; reponer 2 unidades en Tanda 2.',
    batch: 'dia8'
  },
  {
    id: 'mkt-27',
    category: 'verduras',
    name: 'Repollo blanco',
    calculatedUsage: 'Ensaladas frescas en Días 3, 4, 6, 10 y 11 (aprox. 1.5 kg)',
    buyAmount: '1 repollo mediano grande (aprox. 1.8 kg)',
    estimatedPriceCop: 4000,
    notes: 'Muy duradero en la nevera. Picar fino y curar con limón.',
    batch: 'inicio'
  },
  {
    id: 'mkt-28',
    category: 'verduras',
    name: 'Arveja verde fresca o congelada',
    calculatedUsage: 'Arroz con pollo (150g) + Albóndigas (200g) + Carne (200g)',
    buyAmount: '600 g',
    estimatedPriceCop: 5000,
    notes: 'Preferir congelada para conservar color y frescura.',
    batch: 'inicio'
  },
  {
    id: 'mkt-29',
    category: 'verduras',
    name: 'Habichuela fresca',
    calculatedUsage: '150 g para Arroz con pollo (Día 5)',
    buyAmount: '250 g (media libra)',
    estimatedPriceCop: 2000,
    notes: 'Picar pequeña para integrar al arroz.',
    batch: 'inicio'
  },
  {
    id: 'mkt-30',
    category: 'verduras',
    name: 'Espinaca fresca en hojas',
    calculatedUsage: '300 g para Tortilla grande (Día 14)',
    buyAmount: '1 atado grande (aprox. 400 g)',
    estimatedPriceCop: 3000,
    notes: 'Comprar preferiblemente en Tanda 2 (Día 8) para máxima frescura.',
    batch: 'dia8'
  },
  {
    id: 'mkt-31',
    category: 'verduras',
    name: 'Cilantro y perejil fresco',
    calculatedUsage: 'Guisos, sancocho, ajillo y terminación de platos',
    buyAmount: '2 atados frescos (1 al inicio + 1 en Día 8)',
    estimatedPriceCop: 3000,
    notes: 'Lavar, secar muy bien y guardar en frasco con papel absorbente.',
    batch: 'dia8'
  },

  // ==================== LÁCTEOS, FRUTAS Y DESPENSA ====================
  {
    id: 'mkt-32',
    category: 'frutas_despensa',
    name: 'Queso campesino fresco',
    calculatedUsage: 'Desayunos pericos, arepas, avenas calientes y tortilla (aprox. 650 g)',
    buyAmount: '800 g (aprox. 1.6 lb)',
    estimatedPriceCop: 14000,
    notes: 'Mantener bien refrigerado en recipiente hermético.',
    batch: 'inicio'
  },
  {
    id: 'mkt-33',
    category: 'frutas_despensa',
    name: 'Leche entera o descremada',
    calculatedUsage: 'Avenas remojadas y avenas calientes (aprox. 2 litros)',
    buyAmount: '2 litros en bolsa o caja',
    estimatedPriceCop: 8000,
    notes: 'Para hidratar avena en la noche y cocciones calientes.',
    batch: 'inicio'
  },
  {
    id: 'mkt-34',
    category: 'frutas_despensa',
    name: 'Avena en hojuelas',
    calculatedUsage: 'Desayunos 2 y 4 (aprox. 400 g en quincena)',
    buyAmount: '500 g (1 bolsa o tarro)',
    estimatedPriceCop: 4500,
    notes: 'Fibra soluble y energía duradera para las mañanas.',
    batch: 'inicio'
  },
  {
    id: 'mkt-35',
    category: 'frutas_despensa',
    name: 'Maní tostado sin sal',
    calculatedUsage: 'Desayunos de avena con banano (aprox. 140 g)',
    buyAmount: '200 g',
    estimatedPriceCop: 4000,
    notes: 'Grasa saludable y textura crujiente saciante.',
    batch: 'inicio'
  },
  {
    id: 'mkt-36',
    category: 'frutas_despensa',
    name: 'Bananos medianos',
    calculatedUsage: 'Desayunos de avena (aprox. 8–10 bananos en quincena)',
    buyAmount: '2 kg (aprox. 10–12 bananos)',
    estimatedPriceCop: 6000,
    notes: 'Comprar la mitad verdes y reponer en Tanda 2.',
    batch: 'dia8'
  },
  {
    id: 'mkt-37',
    category: 'frutas_despensa',
    name: 'Papaya fresca',
    calculatedUsage: 'Desayunos 1 y 3 (aprox. 1.5 kg de pulpa)',
    buyAmount: '1 papaya mediana entera (aprox. 2 kg)',
    estimatedPriceCop: 6500,
    notes: 'Picar en cubos y guardar en refractaria hermética.',
    batch: 'inicio'
  },
  {
    id: 'mkt-38',
    category: 'frutas_despensa',
    name: 'Fruta fresca de temporada (mango, cítricos)',
    calculatedUsage: 'Acompañamiento en desayunos 1, 5 y 6',
    buyAmount: '1.5 kg',
    estimatedPriceCop: 7000,
    notes: 'Elegir fruta fresca local accesible en plaza o mercado.',
    batch: 'inicio'
  },
  {
    id: 'mkt-39',
    category: 'frutas_despensa',
    name: 'Aguacates maduros',
    calculatedUsage: '300 g Fríjoles (Día 6) y ensaladas adicionales',
    buyAmount: '2–3 aguacates medianos (aprox. 600 g)',
    estimatedPriceCop: 6000,
    notes: 'Comprar 1 maduro y 2 pintones para rotar maduración.',
    batch: 'dia8'
  },
  {
    id: 'mkt-40',
    category: 'frutas_despensa',
    name: 'Limones frescos',
    calculatedUsage: 'Marinados de pollo, pescado, camarones y aderezo de repollo',
    buyAmount: '1 kg (aprox. 10–12 limones)',
    estimatedPriceCop: 4000,
    notes: 'Aporta acidez, ablanda proteínas y da brillo a salsas.',
    batch: 'inicio'
  },
  {
    id: 'mkt-41',
    category: 'frutas_despensa',
    name: 'Arepas medianas delgadas campesinas',
    calculatedUsage: 'Desayunos 1, 3 y 6 (aprox. 12 arepas)',
    buyAmount: '2 paquetes de 6 unidades (o hacer masa casera)',
    estimatedPriceCop: 6000,
    notes: 'Tener congeladas o en nevera; calentar 3 min por lado.',
    batch: 'inicio'
  },
  {
    id: 'mkt-42',
    category: 'frutas_despensa',
    name: 'Aceite vegetal para cocinar',
    calculatedUsage: 'Sofritos de hogaos y sellado de carnes',
    buyAmount: '500 ml',
    estimatedPriceCop: 7000,
    notes: 'Usar con moderación (1 cucharada por cocción).',
    batch: 'inicio'
  },
  {
    id: 'mkt-43',
    category: 'frutas_despensa',
    name: 'Mantequilla',
    calculatedUsage: '25 g para Camarones al ajillo (Día 7) y sándwich inicial',
    buyAmount: '1 barra o tarrina pequeña (125 g)',
    estimatedPriceCop: 4500,
    notes: 'Para emulsión aromática en ajillo.',
    batch: 'inicio'
  },
  {
    id: 'mkt-44',
    category: 'frutas_despensa',
    name: 'Especias básicas (Comino, Paprika, Orégano, Canela, Sal y Pimienta)',
    calculatedUsage: 'Condimentación de las 14 cenas y desayunos',
    buyAmount: '1 juego o sobres de reposición',
    estimatedPriceCop: 6000,
    notes: 'Especias esenciales de la gastronomía colombiana.',
    batch: 'inicio'
  }
];
