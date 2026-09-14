import { MarketItem } from '@/types';

export const SHOPPING_LIST_INITIAL: MarketItem[] = [
  // ==================== PROTEÍNAS, GRANOS Y LÁCTEOS ====================
  {
    id: 'm-pollo',
    category: 'proteinas',
    name: 'Pollo (presas / pechuga / pulpa)',
    calculatedUsage: '7,6 kg = 15,2 lb',
    buyAmount: '8 kg = 16 lb',
    notes: 'Dividir en 12 paquetes exactos: 600g (x8), 500g (x1) y 400g (x3).',
    batch: 'inicio'
  },
  {
    id: 'm-huevos',
    category: 'proteinas',
    name: 'Huevos frescos tipo A o AA',
    calculatedUsage: '54 unidades',
    buyAmount: '60 huevos (2 cubetas de 30)',
    notes: 'Cocinar 6–8 huevos duros adelantados el domingo para los desayunos.',
    batch: 'inicio'
  },
  {
    id: 'm-lentejas',
    category: 'proteinas',
    name: 'Lentejas secas',
    calculatedUsage: '600 g = 1,2 lb',
    buyAmount: '750 g = 1,5 lb',
    notes: 'Rinde para 2 cenas grandes (Día 2 y Día 9).',
    batch: 'inicio'
  },
  {
    id: 'm-frijoles',
    category: 'proteinas',
    name: 'Fríjoles secos (cargamanto o rojo)',
    calculatedUsage: '700 g = 1,4 lb',
    buyAmount: '1 kg = 2 lb',
    notes: 'Remojar siempre de 8 a 12 horas antes de cocinar.',
    batch: 'inicio'
  },
  {
    id: 'm-garbanzos',
    category: 'proteinas',
    name: 'Garbanzos secos',
    calculatedUsage: '550 g = 1,1 lb',
    buyAmount: '750 g = 1,5 lb',
    notes: 'Para 2 preparaciones (Día 4 y Día 11). Remojo 8-12 horas.',
    batch: 'inicio'
  },
  {
    id: 'm-arroz',
    category: 'proteinas',
    name: 'Arroz blanco',
    calculatedUsage: '1,09 kg = 2,18 lb',
    buyAmount: '1,5 kg = 3 lb',
    notes: 'Porciones moderadas (100–120 g crudo total para 4 platos).',
    batch: 'inicio'
  },
  {
    id: 'm-harina-maiz',
    category: 'proteinas',
    name: 'Harina de maíz precocida (arepas)',
    calculatedUsage: '420 g = 0,84 lb',
    buyAmount: '1 kg = 2 lb',
    notes: 'Para las arepas caseras y complementar desayunos.',
    batch: 'inicio'
  },
  {
    id: 'm-avena',
    category: 'proteinas',
    name: 'Avena en hojuelas',
    calculatedUsage: '260 g = 0,52 lb',
    buyAmount: '500 g = 1 lb',
    notes: 'Avena trasnochada fría y complemento de yogur.',
    batch: 'inicio'
  },
  {
    id: 'm-yogur',
    category: 'proteinas',
    name: 'Yogur natural sin azúcar',
    calculatedUsage: '1,2 kg = 2,4 lb',
    buyAmount: '1,5 kg = 3 lb',
    notes: 'Comprar presentaciones grandes de 1L o 1.5L.',
    batch: 'inicio'
  },
  {
    id: 'm-leche',
    category: 'proteinas',
    name: 'Leche entera o descremada',
    calculatedUsage: '1 litro',
    buyAmount: '1,5 litros',
    notes: 'Para hidratar avena trasnochada.',
    batch: 'inicio'
  },
  {
    id: 'm-queso',
    category: 'proteinas',
    name: 'Queso campesino fresco',
    calculatedUsage: '240 g',
    buyAmount: '500 g = 1 lb',
    notes: 'Mantener bien tapado en refrigeración.',
    batch: 'inicio'
  },
  {
    id: 'm-mani',
    category: 'proteinas',
    name: 'Maní sin sal tostado',
    calculatedUsage: '120 g',
    buyAmount: '250 g = 0,5 lb',
    notes: 'Aporte de grasas saludables en desayunos.',
    batch: 'inicio'
  },

  // ==================== VERDURAS, TUBÉRCULOS Y PLÁTANOS ====================
  {
    id: 'm-papa',
    category: 'verduras',
    name: 'Papa (pastusa / sabanera / criolla)',
    calculatedUsage: '1,5 kg = 3 lb',
    buyAmount: '2 kg = 4 lb',
    notes: 'Para sopas, lentejas y sancocho.',
    batch: 'inicio'
  },
  {
    id: 'm-yuca',
    category: 'verduras',
    name: 'Yuca fresca o parafinada',
    calculatedUsage: '800 g = 1,6 lb',
    buyAmount: '1 kg = 2 lb',
    notes: 'Sopa día 7 y Sancocho día 13.',
    batch: 'inicio'
  },
  {
    id: 'm-platano',
    category: 'verduras',
    name: 'Plátano verde y maduro',
    calculatedUsage: '1,1 kg = 2,2 lb',
    buyAmount: '1,5 kg = 3 lb',
    notes: 'Verdes para fríjol/sancocho, maduro para asar día 9.',
    batch: 'inicio'
  },
  {
    id: 'm-ahuyama',
    category: 'verduras',
    name: 'Ahuyama (calabaza criolla)',
    calculatedUsage: '1,75 kg = 3,5 lb',
    buyAmount: '2 kg = 4 lb',
    notes: 'Clave para espesar naturalmente fríjoles, garbanzos y sudados.',
    batch: 'inicio'
  },
  {
    id: 'm-mazorca',
    category: 'verduras',
    name: 'Mazorca tierna',
    calculatedUsage: '500 g = 1 lb',
    buyAmount: '1 kg = 2 lb (aprox. 5–6 trozos)',
    notes: 'Imprescindible para el sancocho del Día 13.',
    batch: 'inicio'
  },
  {
    id: 'm-tomate',
    category: 'verduras',
    name: 'Tomate chonto maduro',
    calculatedUsage: '3,7 kg = 7,4 lb',
    buyAmount: '4 kg = 8 lb',
    notes: 'Base del hogao colombiano en casi todas las cenas.',
    batch: 'inicio'
  },
  {
    id: 'm-cebolla',
    category: 'verduras',
    name: 'Cebolla cabezona y larga',
    calculatedUsage: '1,85 kg = 3,7 lb',
    buyAmount: '2 kg = 4 lb',
    notes: 'Para hogao y sazón de caldos.',
    batch: 'inicio'
  },
  {
    id: 'm-ajo',
    category: 'verduras',
    name: 'Ajo fresco',
    calculatedUsage: 'Aprox. 28 dientes',
    buyAmount: '3 cabezas medianas',
    notes: 'Ajo machacado al momento para mejor aroma.',
    batch: 'inicio'
  },
  {
    id: 'm-zanahoria',
    category: 'verduras',
    name: 'Zanahoria fresca',
    calculatedUsage: '1,85 kg = 3,7 lb',
    buyAmount: '2 kg = 4 lb',
    notes: 'Uso versátil en ensaladas, sopas y sudados.',
    batch: 'inicio'
  },
  {
    id: 'm-repollo',
    category: 'verduras',
    name: 'Repollo blanco o morado',
    calculatedUsage: '1,5 kg = 3 lb',
    buyAmount: '2 kg = 4 lb (2 unidades medianas)',
    notes: 'Dura 2 semanas en nevera sin marchitarse.',
    batch: 'inicio'
  },
  {
    id: 'm-pepino',
    category: 'verduras',
    name: 'Pepino cohombro',
    calculatedUsage: '750 g = 1,5 lb',
    buyAmount: '1 kg = 2 lb',
    notes: 'Acompañamiento fresco en cenas 2, 8 y 14. Sugerido comprar en tanda 2.',
    batch: 'dia8'
  },
  {
    id: 'm-habichuela',
    category: 'verduras',
    name: 'Habichuela verde',
    calculatedUsage: '600 g = 1,2 lb',
    buyAmount: '750 g = 1,5 lb',
    notes: 'Para arroz con pollo, salteado y sopa.',
    batch: 'inicio'
  },
  {
    id: 'm-arveja',
    category: 'verduras',
    name: 'Arveja verde desgranada',
    calculatedUsage: '150 g',
    buyAmount: '250 g = 0,5 lb',
    notes: 'Para el arroz con pollo del Día 5.',
    batch: 'inicio'
  },
  {
    id: 'm-calabacin',
    category: 'verduras',
    name: 'Calabacín o zuchinni verde',
    calculatedUsage: '1,4 kg = 2,8 lb',
    buyAmount: '1,5 kg = 3 lb',
    notes: 'Para salteado (Día 3), lentejas (Día 9) y tortilla (Día 14).',
    batch: 'inicio'
  },
  {
    id: 'm-pimenton',
    category: 'verduras',
    name: 'Pimentón rojo grande',
    calculatedUsage: '650 g = 1,3 lb',
    buyAmount: '750 g = 1,5 lb',
    notes: 'Aporta color y sabor en salteados, arroz y hogao.',
    batch: 'inicio'
  },
  {
    id: 'm-espinaca',
    category: 'verduras',
    name: 'Espinaca bogotana fresca',
    calculatedUsage: '450 g = 0,9 lb',
    buyAmount: '500 g = 1 lb',
    notes: 'Para cazuela día 11 y tortilla día 14. Sugerido comprar en tanda 2.',
    batch: 'dia8'
  },
  {
    id: 'm-aguacate',
    category: 'verduras',
    name: 'Aguacate (Hass o criollo)',
    calculatedUsage: 'Cerca de 1,2 kg pulpa',
    buyAmount: '2 kg = 4 lb (6–7 medianos)',
    notes: 'Comprar 3 al inicio y 3 o 4 hacia el día 8 para que no se maduren todos juntos.',
    batch: 'dia8'
  },
  {
    id: 'm-cilantro',
    category: 'verduras',
    name: 'Cilantro fresco',
    calculatedUsage: '40–60 g',
    buyAmount: '3 manojos pequeños',
    notes: 'Lavar, secar muy bien y guardar en frasco con papel toalla o comprar en tanda 2.',
    batch: 'dia8'
  },

  // ==================== FRUTAS Y DESPENSA ====================
  {
    id: 'm-papaya',
    category: 'frutas_despensa',
    name: 'Papaya madura',
    calculatedUsage: 'Porciones de desayunos',
    buyAmount: '2 kg = 4 lb',
    notes: 'Comprar firme o en 2 tandas.',
    batch: 'dia8'
  },
  {
    id: 'm-banano',
    category: 'frutas_despensa',
    name: 'Banano maduro',
    calculatedUsage: 'Para avena trasnochada',
    buyAmount: '1,5 kg = 3 lb',
    notes: 'Endulzante natural para las mañanas.',
    batch: 'inicio'
  },
  {
    id: 'm-citricos',
    category: 'frutas_despensa',
    name: 'Naranja o mandarina',
    calculatedUsage: 'Acompañamiento desayunos',
    buyAmount: '2 kg = 4 lb',
    notes: 'Aporte de vitamina C y frescura.',
    batch: 'inicio'
  },
  {
    id: 'm-fruta-temporada',
    category: 'frutas_despensa',
    name: 'Fruta económica de temporada (mango, melón, etc.)',
    calculatedUsage: 'Desayunos varios',
    buyAmount: '2 kg = 4 lb',
    notes: 'Aprovechar ofertas del mercado local.',
    batch: 'dia8'
  },
  {
    id: 'm-aceite',
    category: 'frutas_despensa',
    name: 'Aceite vegetal',
    calculatedUsage: 'Uso medido por cucharaditas',
    buyAmount: '500 ml',
    notes: 'Cocción moderada en sofritos.',
    batch: 'inicio'
  },
  {
    id: 'm-limon',
    category: 'frutas_despensa',
    name: 'Limón mandarino o Tahití',
    calculatedUsage: 'Ensaladas y marinados',
    buyAmount: '10–12 unidades',
    notes: 'Esencial para evitar que el aguacate se oxide y aliñar.',
    batch: 'inicio'
  },
  {
    id: 'm-vinagre',
    category: 'frutas_despensa',
    name: 'Vinagre blanco o de manzana (opcional)',
    calculatedUsage: 'Aderezos',
    buyAmount: '250 ml',
    notes: 'Opcional para aliñar repollo.',
    batch: 'inicio'
  },
  {
    id: 'm-sal',
    category: 'frutas_despensa',
    name: 'Sal yodada',
    calculatedUsage: 'Condimento diario',
    buyAmount: '250–500 g',
    notes: 'Despensa básica.',
    batch: 'inicio'
  },
  {
    id: 'm-especias',
    category: 'frutas_despensa',
    name: 'Comino molido, pimienta negra y canela',
    calculatedUsage: 'Sazón tradicional colombiana',
    buyAmount: '1 sobre o frasco pequeño de cada uno',
    notes: 'El comino es el pilar aromático del hogao.',
    batch: 'inicio'
  },
  {
    id: 'm-color',
    category: 'frutas_despensa',
    name: 'Color o achiote molido (opcional)',
    calculatedUsage: 'Color dorado para arroces y sopas',
    buyAmount: '1 sobre pequeño',
    notes: 'Opcional según gusto.',
    batch: 'inicio'
  }
];

export interface OrganizationTip {
  title: string;
  description: string;
  badge: string;
}

export const ORGANIZATION_TIPS: OrganizationTip[] = [
  {
    title: 'Porciones de pollo congeladas el domingo',
    description: 'Divide el paquete de 8 kg en 12 bolsas marcadas con fecha: 600g (x8), 500g (x1) y 400g (x3). El margen extra te protege ante mermas de hueso o caldos.',
    badge: 'Ahorro de Tiempo'
  },
  {
    title: 'Compras en dos tandas (Perecederos)',
    description: 'Para garantizar frescura y evitar desperdicio: compra espinaca, cilantro, pepino, aguacates, papaya y frutas frágiles en dos momentos: una mitad al inicio y la segunda hacia el Día 8.',
    badge: 'Cero Desperdicio'
  },
  {
    title: 'Huevos y arepas listos con anticipación',
    description: 'Cocina 6–8 huevos duros en lote y déjalos con cáscara en la nevera. Ten arepas precocidas a mano para desayunar en menos de 5 minutos.',
    badge: 'Desayuno Exprés'
  },
  {
    title: 'Empacar ANTES de cenar',
    description: 'Apenas bajes la olla del fuego, sirve 2 porciones para la mesa y guarda de inmediato las 2 porciones en recipientes herméticos poco profundos para la nevera. Así garantizas que no se coma de más.',
    badge: 'Regla de Oro'
  },
  {
    title: 'Ensaladas y aguacate siempre aparte',
    description: 'No mezcles la verdura fresca ni el aguacate en el plato que vas a calentar en el microondas. Llévalos en recipientes pequeños con medio limón fresco.',
    badge: 'Textura Perfecta'
  }
];
