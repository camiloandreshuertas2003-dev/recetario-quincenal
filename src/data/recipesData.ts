import { Recipe } from '@/types';

export const RECIPES: Recipe[] = [
  // ==================== ALMUERZO INICIAL (DÍA 1) ====================
  {
    id: 'almuerzo-dia-1',
    title: 'Sándwich de huevo rápido (o porción previa)',
    category: 'almuerzo',
    yieldServings: 2,
    prepTime: '5 min',
    highlightTag: 'Almuerzo Inicial / 5 min',
    carbType: 'Pan integral o arepa delgada',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Fresh homemade Colombian egg sandwich with melted campesino cheese, ripe tomato slices, toasted bread, natural morning light, rustic wooden table.',
    ingredients: [
      { name: 'Tajadas de pan integral o arepas delgadas', amount: '4 tajadas (2 porciones)' },
      { name: 'Huevos frescos', amount: '4 unidades' },
      { name: 'Tomate maduro en rodajas finas', amount: '80 g', grams: 80 },
      { name: 'Mantequilla o aceite de oliva', amount: '1 cucharadita' },
      { name: 'Queso campesino o tajado (opcional)', amount: '60 g', grams: 60 },
      { name: 'Sal y pimienta negra', amount: 'Al gusto' }
    ],
    steps: [
      'Tuesta las 4 tajadas de pan o arepas en la sartén hasta que estén crujientes.',
      'Bate los 4 huevos con una pizca de sal y pimienta. En una sartén con la cucharadita de mantequilla a fuego medio, vierte los huevos y revuelve suavemente 2–3 minutos hasta que cuajen de forma cremosa.',
      'Arma el sándwich: coloca sobre el pan rodajas de tomate maduro, el queso campesino y los huevos recién preparados.',
      'Tapa y corta diagonalmente en mitades para facilitar el consumo.',
      'Si tienes una porción congelada de antemano de un menú previo, puedes optar por llevarla. Desde la cena de hoy, el ciclo habitual de comidas queda 100% activo.'
    ],
    packingInstructions: 'Deja reposar el sándwich 2 minutos destapado antes de empacar en papel aluminio o refractaria, evitando que el vapor humedezca el pan.'
  },

  // ==================== DESAYUNOS EXPRÉS ====================
  {
    id: 'desayuno-1',
    title: 'Yogur con avena, papaya y maní',
    category: 'desayuno',
    yieldServings: 2,
    prepTime: '2–3 min',
    highlightTag: 'Frío / Adelantable',
    imageUrl: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Bowl of Greek natural yogurt topped with rolled oats, fresh diced orange papaya, and toasted peanuts, morning breakfast setting, healthy vibrant.',
    ingredients: [
      { name: 'Yogur natural sin azúcar', amount: '400 g', grams: 400 },
      { name: 'Avena en hojuelas', amount: '60 g', grams: 60 },
      { name: 'Papaya fresca en cubos', amount: '350 g', grams: 350 },
      { name: 'Maní sin sal', amount: '30 g', grams: 30 }
    ],
    steps: [
      'Preparación nocturna opcional: reparte el yogur y la avena en dos recipientes con tapa hermética; déjalos hidratar en la nevera durante la noche.',
      'En la mañana: añade la papaya en cubos frescos y el maní por encima para dar textura crujiente.',
      'Si tienes prisa para salir al trabajo, tápalo y llévalo para comer en la oficina.'
    ],
    packingInstructions: 'Ideal para transportar en vaso o tarro hermético de vidrio/plástico. Mantener refrigerado hasta consumir.'
  },
  {
    id: 'desayuno-2',
    title: 'Arepa con huevos pericos rápidos',
    category: 'desayuno',
    yieldServings: 2,
    prepTime: '8–10 min',
    highlightTag: 'Caliente / Tradicional',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Traditional Colombian scrambled eggs huevos pericos with diced tomatoes and scallions served with golden thin arepa, coffee cup in background.',
    videoUrl: 'https://www.youtube.com/watch?v=y_TyEhcejbE',
    recipeUrl: 'https://www.mycolombianrecipes.com/es/huevos-pericos/',
    recipeSourceName: 'My Colombian Recipes',
    ingredients: [
      { name: 'Arepas delgadas ya hechas o congeladas', amount: '2 unidades' },
      { name: 'Huevos', amount: '4 unidades' },
      { name: 'Tomate maduro picado fino (adelantable)', amount: '80 g', grams: 80 },
      { name: 'Cebolla picada fina', amount: '30 g', grams: 30 },
      { name: 'Aceite vegetal', amount: '1 cucharadita' },
      { name: 'Fruta fresca para compartir (naranja/mandarina)', amount: '1 porción' }
    ],
    steps: [
      'Coloca las arepas en una sartén o tostadora a fuego medio, calentando 3–4 minutos por cada lado hasta que doren.',
      'En otra sartén, calienta la cucharadita de aceite y sofríe la cebolla con el tomate durante 2 minutos con una pizca de sal.',
      'Bate ligeramente los 4 huevos con una pizca de sal y viértelos sobre el sofrito.',
      'Revuelve suavemente a fuego medio-bajo por 3–4 minutos hasta que alcancen el punto cremoso deseado.',
      'Sirve 2 huevos pericos y 1 arepa por persona, acompañados de fruta fresca.'
    ],
    packingInstructions: 'Consumo inmediato caliente en la mañana.'
  },
  {
    id: 'desayuno-3',
    title: 'Avena trasnochada (Overnight oats) con banano',
    category: 'desayuno',
    yieldServings: 2,
    prepTime: '2 min en la mañana',
    highlightTag: 'Cero fuego / Rápido',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Glass jar of overnight soaked oats with milk, sprinkled cinnamon, sliced fresh bananas, and roasted peanuts, breakfast meal prep.',
    ingredients: [
      { name: 'Avena en hojuelas', amount: '80 g', grams: 80 },
      { name: 'Leche', amount: '500 ml' },
      { name: 'Banano en rodajas', amount: '300 g', grams: 300 },
      { name: 'Maní sin sal', amount: '30 g', grams: 30 },
      { name: 'Canela en polvo', amount: 'Al gusto' }
    ],
    steps: [
      'Preparación nocturna: en dos frascos o recipientes mezcla la avena con la leche y una pizca generosa de canela. Tapa y refrigera toda la noche.',
      'En la mañana: la avena habrá absorbido la leche quedando cremosa. Añade las rodajas de banano y el maní.',
      'No hace falta cocinar ni calentar.'
    ],
    packingInstructions: 'Llévalo listo en su propio frasco al trabajo si no alcanzas a desayunar en casa.'
  },
  {
    id: 'desayuno-4',
    title: 'Huevos cocidos, queso campesino, aguacate y fruta',
    category: 'desayuno',
    yieldServings: 2,
    prepTime: '3–5 min',
    highlightTag: 'Proteico / Adelantable',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Platter of hard-boiled eggs halved, fresh white campesino cheese cubes, ripe sliced avocado, orange slices, clean healthy breakfast.',
    ingredients: [
      { name: 'Huevos cocidos', amount: '4 unidades' },
      { name: 'Queso campesino fresco', amount: '80 g', grams: 80 },
      { name: 'Aguacate', amount: '150 g', grams: 150 },
      { name: 'Fruta de temporada (naranja, mandarina o papaya)', amount: '400 g', grams: 400 }
    ],
    steps: [
      'Truco de organización: cocina 6 a 8 huevos duros con anticipación un par de noches antes y guárdalos con su cáscara en la nevera.',
      'En la mañana: pela dos huevos por persona y córtalos por la mitad con un toque de sal.',
      'Acompaña con 40 g de queso campesino por persona, rebanadas de aguacate y la fruta fresca.'
    ],
    packingInstructions: 'Se puede empacar en un contenedor con divisiones para comer en el trabajo.'
  },
  {
    id: 'desayuno-5',
    title: 'Arepa lista, queso campesino y huevo',
    category: 'desayuno',
    yieldServings: 2,
    prepTime: '7–8 min',
    highlightTag: 'Clásico colombiano',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Toasted white corn arepa topped with melted campesino cheese and a fried egg with golden yolk, alongside fresh fruit.',
    ingredients: [
      { name: 'Arepas delgadas ya preparadas', amount: '2 unidades' },
      { name: 'Queso campesino', amount: '80 g', grams: 80 },
      { name: 'Huevos', amount: '2 unidades' },
      { name: 'Fruta de temporada', amount: '400 g', grams: 400 }
    ],
    steps: [
      'Calienta las arepas en la sartén o comal hasta que estén crocantes por fuera y suaves por dentro.',
      'Cocina un huevo por persona (frito con poco aceite, pochado o revuelto) en la misma sartén.',
      'Coloca 40 g de queso campesino sobre cada arepa caliente para que se ablande y corona con el huevo.',
      'Sirve de inmediato acompañado de fruta fresca picada.'
    ],
    packingInstructions: 'Consumir caliente antes de salir.'
  },
  {
    id: 'desayuno-6',
    title: 'Yogur con fruta de temporada y maní',
    category: 'desayuno',
    yieldServings: 2,
    prepTime: '2–3 min',
    highlightTag: 'Ligero y digestivo',
    imageUrl: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Glass bowl filled with thick white yogurt, fresh diced tropical fruits, topped with roasted peanuts and oat flakes.',
    ingredients: [
      { name: 'Yogur natural sin azúcar', amount: '400 g', grams: 400 },
      { name: 'Papaya o banano', amount: '300 g', grams: 300 },
      { name: 'Maní sin sal', amount: '30 g', grams: 30 },
      { name: 'Avena en hojuelas (opcional)', amount: '40 g', grams: 40 }
    ],
    steps: [
      'Reparte 200 g de yogur en cada tazón.',
      'Agrega la fruta cortada en bocados y espolvorea el maní (y la avena si deseas más fibra).',
      'Listo para disfrutar en 2 minutos.'
    ],
    packingInstructions: 'Si debes madrugar antes de lo previsto, déjalo empacado desde la noche anterior en la nevera.'
  },
  {
    id: 'desayuno-7',
    title: 'Arepa rápida con huevo y queso campesino',
    category: 'desayuno',
    yieldServings: 2,
    prepTime: '8–10 min',
    highlightTag: 'Energía sostenida',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Crispy warm arepas served with fried eggs, sliced white campesino cheese, and tropical fruit slices.',
    ingredients: [
      { name: 'Arepas pequeñas listas o congeladas', amount: '2 unidades' },
      { name: 'Huevos', amount: '2 unidades' },
      { name: 'Queso campesino', amount: '80 g', grams: 80 },
      { name: 'Fruta de temporada', amount: '400 g', grams: 400 }
    ],
    steps: [
      'Calienta las arepas 3–4 minutos por lado.',
      'Prepara un huevo por persona al gusto.',
      'Añade 40 g de queso campesino a cada arepa y sirve con la fruta fresca.'
    ],
    packingInstructions: 'Ideal para tomar con café o infusión recién preparada.'
  },

  // ==================== CENAS (4 PORCIONES) ====================
  {
    id: 'cena-dia-1',
    title: 'Sudado de pollo con ahuyama, arroz pequeño y ensalada',
    category: 'cena',
    yieldServings: 4,
    prepTime: '35–40 min',
    highlightTag: 'Pollo / Carbohidrato moderado',
    carbType: 'Arroz pequeño (120 g crudo total)',
    imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Colombian chicken stew sudado de pollo in a deep ceramic dish with tender yellow ahuyama squash chunks, tomato-onion hogao sauce, white rice, shredded cabbage salad.',
    videoUrl: 'https://www.youtube.com/watch?v=BVQzPdoeoTg',
    recipeUrl: 'https://chatelet.com.co/blogs/news/como-hacer-sudado-de-pollo-colombiano-receta-tradicional-y-su-historia',
    recipeSourceName: 'Châtelet Gastronomía',
    ingredients: [
      { name: 'Pollo en presas o trozos', amount: '600 g', grams: 600 },
      { name: 'Ahuyama cortada en cubos', amount: '400 g', grams: 400 },
      { name: 'Tomate maduro picado', amount: '250 g', grams: 250 },
      { name: 'Cebolla picada fina', amount: '120 g', grams: 120 },
      { name: 'Dientes de ajo picados', amount: '2 unidades' },
      { name: 'Arroz crudo (porción moderada)', amount: '120 g', grams: 120 },
      { name: 'Repollo rebanado', amount: '300 g', grams: 300 },
      { name: 'Zanahoria rallada', amount: '150 g', grams: 150 },
      { name: 'Agua', amount: '500 ml' },
      { name: 'Aceite vegetal', amount: '1 cucharada' },
      { name: 'Comino, pimienta y sal', amount: 'Al gusto' }
    ],
    steps: [
      'Pica finamente la cebolla, el ajo y el tomate. Corta la ahuyama en cubos medianos. Rebana el repollo y ralla la zanahoria.',
      'En una olla o sartén profunda calienta el aceite y sofríe la cebolla con el ajo 3 minutos; añade el tomate, comino y pimienta y cocina el hogao durante 5 minutos.',
      'Incorpora los trozos de pollo sazonados y dóralos 3 minutos por lado para sellar sabor.',
      'Agrega los 500 ml de agua y los cubos de ahuyama.',
      'Tapa y cocina a fuego medio-bajo durante 25–30 minutos, hasta que el pollo esté bien cocido y la ahuyama tierna y cremosa.',
      'Cocina los 120 g de arroz aparte (30 g crudo por porción). Mezcla el repollo con la zanahoria y adereza con limón o vinagre.',
      'Sirve 2 porciones para la cena. Inmediatamente empaca las 2 porciones restantes (pollo con ahuyama y arroz) en recipientes herméticos poco profundos para el almuerzo de mañana. Deja la ensalada sin aderezo o empácala por separado.'
    ],
    packingInstructions: 'Refrigera antes de 2 horas. Empaca el pollo con ahuyama y arroz juntos para calentar en microondas; lleva la ensalada cruda en un recipiente aparte con medio limón para exprimir al momento de comer.'
  },
  {
    id: 'cena-dia-2',
    title: 'Lentejas con verduras, arroz pequeño, huevo y pepino',
    category: 'cena',
    yieldServings: 4,
    prepTime: '40–45 min',
    highlightTag: 'Leguminosa / ICBF Recomendado',
    carbType: 'Papa + Arroz pequeño (100 g crudo)',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Bowl of Colombian lentil stew with carrots and potatoes, topped with a sliced boiled egg, served alongside white rice and crisp cucumber slices.',
    videoUrl: 'https://www.youtube.com/watch?v=9fCPmz1_GwA',
    recipeSourceName: 'YouTube Receta Tradicional',
    ingredients: [
      { name: 'Lentejas secas seleccionadas', amount: '300 g', grams: 300 },
      { name: 'Papa cortada en cubos', amount: '250 g', grams: 250 },
      { name: 'Zanahoria en cubitos', amount: '200 g', grams: 200 },
      { name: 'Tomate maduro picado', amount: '250 g', grams: 250 },
      { name: 'Cebolla picada fina', amount: '120 g', grams: 120 },
      { name: 'Dientes de ajo picados', amount: '2 unidades' },
      { name: 'Arroz crudo', amount: '100 g', grams: 100 },
      { name: 'Huevos cocidos', amount: '4 unidades' },
      { name: 'Pepino cohombro fresco', amount: '300 g', grams: 300 },
      { name: 'Agua', amount: '1,2 litros' },
      { name: 'Comino, sal y aceite', amount: 'Al gusto' }
    ],
    steps: [
      'Lava bien las lentejas bajo el grifo. Pela y corta la papa y la zanahoria en cubos pequeños.',
      'En la olla prepara un hogao sofríendo cebolla, ajo y tomate con comino y sal durante 7 minutos.',
      'Añade las lentejas, la zanahoria, el agua y un toque extra de comino. Cocina tapado a fuego medio durante 20 minutos.',
      'Agrega los cubos de papa y cocina 15–20 minutos más, hasta que las lentejas y las papas estén completamente blandas y el caldo espese de forma natural.',
      'Cocina el arroz aparte con poca sal. Cocina los 4 huevos en agua hirviendo durante 9–10 minutos y pélalos.',
      'Cena dos porciones con rebanadas frescas de pepino cohombro.',
      'Para el almuerzo de mañana: reparte en 2 refractarias las lentejas con el arroz y un huevo cocido por porción.'
    ],
    packingInstructions: 'El pepino cohombro córtalo fresco en la mañana o llévalo entero/sin aderezo para evitar que suelte líquido sobre el plato caliente.'
  },
  {
    id: 'cena-dia-3',
    title: 'Pollo salteado con verduras y arepa',
    category: 'cena',
    yieldServings: 4,
    prepTime: '25–30 min',
    highlightTag: 'Salteado rápido / Arepa',
    carbType: 'Arepa de maíz (160 g harina para 4 arepas)',
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Sizzling wok stir fry with diced seasoned chicken breast, zucchini ribbons, carrots, red bell pepper, green beans, served with warm Colombian arepa.',
    videoUrl: 'https://www.youtube.com/watch?v=jSiZzQ7hepc',
    recipeSourceName: 'YouTube Técnicas de Cocina',
    ingredients: [
      { name: 'Pechuga o muslo sin hueso en cubos', amount: '600 g', grams: 600 },
      { name: 'Calabacín en bastones o medias lunas', amount: '400 g', grams: 400 },
      { name: 'Zanahoria en julianas finas', amount: '200 g', grams: 200 },
      { name: 'Pimentón en tiras', amount: '200 g', grams: 200 },
      { name: 'Cebolla en plumas', amount: '150 g', grams: 150 },
      { name: 'Habichuela blanqueada', amount: '300 g', grams: 300 },
      { name: 'Harina de maíz precocida', amount: '160 g', grams: 160 },
      { name: 'Dientes de ajo', amount: '2 unidades' },
      { name: 'Limón', amount: '1 unidad' },
      { name: 'Aceite vegetal', amount: '1 cucharada' },
      { name: 'Comino, pimienta y sal', amount: 'Al gusto' }
    ],
    steps: [
      'Marina los cubos de pollo con el ajo machacado, jugo de limón, comino, pimienta y sal. Deja reposar mientras cortas los vegetales.',
      'Corta la habichuela en trozos y hiérvela 5 minutos en agua con sal; escurre bien.',
      'Calienta una sartén o wok grande con aceite a fuego vivo y dora el pollo por 5 minutos hasta que esté bien sellado. Retira y reserva.',
      'En la misma sartén saltea la cebolla y la zanahoria 3 minutos. Añade el pimentón, la habichuela cocida y el calabacín; saltea 4–5 minutos manteniendo los vegetales crocantes.',
      'Devuelve el pollo a la sartén, mezcla todo por 2 minutos para unificar sabores y verifica sazón.',
      'Amasa la harina de maíz con agua tibia y sal, y forma 4 arepas delgadas en la plancha.',
      'Cena 2 porciones de salteado con 2 arepas. Empaca las 2 porciones de salteado restantes y las 2 arepas por separado para el almuerzo.'
    ],
    packingInstructions: 'Guarda las arepas envueltas en servilleta o papel aluminio fuera de la nevera o aparte del pollo, para calentarlas en tostadora o sartén en el trabajo.'
  },
  {
    id: 'cena-dia-4',
    title: 'Garbanzos con ahuyama, arroz pequeño y repollo',
    category: 'cena',
    yieldServings: 4,
    prepTime: '45–50 min',
    highlightTag: 'Leguminosa rica en fibra',
    carbType: 'Arroz pequeño (100 g crudo)',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Creamy Colombian garbanzo chickpea stew with sweet golden squash ahuyama, chopped cilantro garnish, white rice side, shredded cabbage.',
    videoUrl: 'https://www.youtube.com/watch?v=0bNYniy3unQ',
    recipeUrl: 'https://vecinavegetariana.com/es/garbanzos-colombianos/',
    recipeSourceName: 'Vecina Vegetariana',
    ingredients: [
      { name: 'Garbanzos secos (remojados 8-12 h)', amount: '300 g', grams: 300 },
      { name: 'Ahuyama en cubos', amount: '300 g', grams: 300 },
      { name: 'Tomate maduro picado', amount: '250 g', grams: 250 },
      { name: 'Cebolla picada fina', amount: '120 g', grams: 120 },
      { name: 'Zanahoria picada', amount: '150 g', grams: 150 },
      { name: 'Dientes de ajo', amount: '2 unidades' },
      { name: 'Arroz crudo', amount: '100 g', grams: 100 },
      { name: 'Repollo fresco en tiritas', amount: '300 g', grams: 300 },
      { name: 'Cilantro fresco picado', amount: 'Al gusto' },
      { name: 'Comino, sal y aceite', amount: 'Al gusto' }
    ],
    steps: [
      'Remoja los garbanzos la noche previa o desde la mañana (8 a 12 horas). Desecha el agua de remojo, enjuaga y cocina con abundante agua limpia hasta que estén tiernos.',
      'Prepara un hogao en sartén con la cebolla, ajo, comino y tomate durante 6–8 minutos.',
      'Agrega el hogao, la ahuyama y la zanahoria a los garbanzos cocidos. Cocina todo junto 15–20 minutos a fuego medio.',
      'Truco de sabor y espesor: machaca una taza del guiso de garbanzos y ahuyama contra la pared de la olla con una cuchara de palo para que el caldo tome textura cremosa. Termina con cilantro picado.',
      'Cocina el arroz pequeño y ralla el repollo fresco con limón.',
      'Cena dos porciones. Empaca garbanzos y arroz para el almuerzo del día 5; lleva el repollo por separado.'
    ],
    packingInstructions: 'Los garbanzos recalientan extraordinariamente bien, mejorando su sabor al día siguiente.'
  },
  {
    id: 'cena-dia-5',
    title: 'Arroz con pollo cargado de verduras',
    category: 'cena',
    yieldServings: 4,
    prepTime: '40–45 min',
    highlightTag: 'Plato único balanceado',
    carbType: 'Arroz (200 g crudo para 4 porciones)',
    imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Traditional Colombian arroz con pollo loaded with shredded chicken, green peas, carrots, green beans, red bell peppers, fragrant yellow rice.',
    videoUrl: 'https://www.youtube.com/watch?v=2eKYzlGgTvQ',
    recipeUrl: 'https://campollo.com/recetas/arroz-pollo-colombiano/',
    recipeSourceName: 'Campollo Recetas Colombianas',
    ingredients: [
      { name: 'Pollo sin hueso en trozos', amount: '600 g', grams: 600 },
      { name: 'Arroz crudo', amount: '200 g', grams: 200 },
      { name: 'Zanahoria en cubitos pequeños', amount: '200 g', grams: 200 },
      { name: 'Arvejas frescas o congeladas', amount: '150 g', grams: 150 },
      { name: 'Habichuela picada fina', amount: '150 g', grams: 150 },
      { name: 'Tomate maduro picado', amount: '250 g', grams: 250 },
      { name: 'Cebolla cabezona picada', amount: '120 g', grams: 120 },
      { name: 'Pimentón rojo en cubitos', amount: '150 g', grams: 150 },
      { name: 'Dientes de ajo machacados', amount: '2 unidades' },
      { name: 'Caldo de la cocción del pollo', amount: '500 ml' },
      { name: 'Comino, sal y aceite', amount: 'Al gusto' }
    ],
    steps: [
      'Cocina el pollo en agua hirviendo con 1 diente de ajo y un trozo de cebolla durante 20–25 minutos. Retira, desmecha o corta en cubos medianos y cuela el caldo caliente (reserva 500 ml).',
      'En un caldero grande sofríe el tomate, la cebolla y el ajo con una pizca de comino durante 5 minutos. Agrega el arroz, la zanahoria y la habichuela, sofriendo 2 minutos.',
      'Vierte los 500 ml de caldo hirviendo. Cuando rompa hervor y empiece a secar la superficie, baja el fuego al mínimo y tapa la olla.',
      'A los 15 minutos destapa con cuidado y esparce el pollo desmechado, la arveja y el pimentón. Tapa y deja cocinar 5–10 minutos más al vapor hasta que el grano esté en su punto.',
      'Apaga el fuego y deja reposar 5 minutos tapado para que los aromas se integren.',
      'Cena dos porciones y divide inmediatamente las dos restantes en refractarias con tapa.'
    ],
    packingInstructions: 'Uno de los platos más fáciles de transportar y recalentar en el trabajo. Acompaña con rodajas de tomate fresco si gustas.'
  },
  {
    id: 'cena-dia-6',
    title: 'Fríjoles con ahuyama y plátano verde (sin arroz)',
    category: 'cena',
    yieldServings: 4,
    prepTime: '50–60 min',
    highlightTag: 'Plato fuerte sin arroz',
    carbType: 'Plátano verde + Fríjol + Ahuyama (Sin arroz)',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Deep clay bowl of Colombian red beans frijoles cargamanto cooked with green plantain chunks and sweet ahuyama squash, side of avocado and cabbage.',
    videoUrl: 'https://www.youtube.com/watch?v=QAXcXL9Hy2A',
    recipeUrl: 'https://www.directoalpaladar.com/recetas-de-legumbres/frijoles-colombianos-cremoso-plato-cuchara-tradicional-muy-facil-repleto-sabor',
    recipeSourceName: 'Directo al Paladar',
    ingredients: [
      { name: 'Fríjoles secos (remojados 8-12 h)', amount: '350 g', grams: 350 },
      { name: 'Ahuyama en cubos', amount: '400 g', grams: 400 },
      { name: 'Plátano verde en trozos', amount: '300 g', grams: 300 },
      { name: 'Tomate picado', amount: '250 g', grams: 250 },
      { name: 'Cebolla picada', amount: '120 g', grams: 120 },
      { name: 'Dientes de ajo', amount: '2 unidades' },
      { name: 'Repollo fresco rebanado', amount: '300 g', grams: 300 },
      { name: 'Aguacate fresco', amount: '300 g', grams: 300 },
      { name: 'Comino, cilantro y sal', amount: 'Al gusto' }
    ],
    steps: [
      'Remoja los fríjoles durante 8 a 12 horas. Escurre, enjuaga y llévalos a cocinar con agua fresca (en olla a presión 25 min o tradicional 50 min) hasta que comiencen a ablandar.',
      'Prepara un sofrito de hogao con cebolla, ajo, tomate y comino.',
      'Cuando los fríjoles estén casi tiernos, añade los cubos de ahuyama y el plátano verde pelado y cortado.',
      'Incorpora el hogao y cocina a fuego medio hasta que el plátano esté suave y el caldo tome una textura espesa y deliciosa.',
      'Finaliza con abundante cilantro fresco picado.',
      'Sirve con ensalada de repollo y aguacate. NO se añade arroz este día, ya que el plátano y el fríjol cubren con creces la energía necesaria.',
      'Empaca solo los fríjoles con plátano y ahuyama para el almuerzo; el aguacate se corta fresco en la mañana o se protege con limón.'
    ],
    packingInstructions: 'El fríjol espesará al enfriarse; al calentar en el microondas agrega 2 cucharadas de agua para devolverle su textura sedosa.'
  },
  {
    id: 'cena-dia-7',
    title: 'Sopa de pollo con papa criolla/pastusa y yuca',
    category: 'cena',
    yieldServings: 4,
    prepTime: '40–45 min',
    highlightTag: 'Reconfortante fin de semana',
    carbType: 'Papa + Yuca + Ahuyama (Sin arroz)',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Steaming Colombian country style chicken soup sopa de pollo with yuca root, tender potatoes, carrots, green beans, fresh cilantro garnish in rustic bowl.',
    videoUrl: 'https://www.youtube.com/watch?v=WFodAqWBMiM',
    recipeUrl: 'https://www.colombia.com/gastronomia/recetas-colombianas/sopa-de-pollo-vegetales-y-pasta-r104',
    recipeSourceName: 'Colombia.com Gastronomía',
    ingredients: [
      { name: 'Pollo en presas con hueso para sabor', amount: '500 g', grams: 500 },
      { name: 'Papa cortada en cubos medianos', amount: '300 g', grams: 300 },
      { name: 'Yuca pelada y cortada', amount: '300 g', grams: 300 },
      { name: 'Zanahoria en rodajas', amount: '200 g', grams: 200 },
      { name: 'Ahuyama en cubos', amount: '250 g', grams: 250 },
      { name: 'Habichuela en trozos', amount: '150 g', grams: 150 },
      { name: 'Cebolla picada', amount: '120 g', grams: 120 },
      { name: 'Tomate picado', amount: '200 g', grams: 200 },
      { name: 'Dientes de ajo machacados', amount: '2 unidades' },
      { name: 'Agua', amount: '1,5 litros' },
      { name: 'Cilantro fresco, comino y sal', amount: 'Al gusto' }
    ],
    steps: [
      'En la olla sofríe ligeramente la cebolla, el ajo y el tomate con comino. Agrega el pollo y el litro y medio de agua caliente.',
      'Cocina a fuego medio durante 15 minutos desde que rompa a hervir.',
      'Agrega la yuca, la zanahoria y la ahuyama. Diez minutos más tarde incorpora la papa y la habichuela para que no se deshagan.',
      'Cocina hasta que la yuca y la papa estén tiernas (unos 15 minutos más).',
      'Aplasta algunos trozos de ahuyama contra el borde para darle consistencia cremosa y color dorado al caldo. Apaga y agrega cilantro picado.',
      'Cena 2 porciones calientes. Empaca las 2 porciones restantes en recipientes con buen cierre hermético (anti-derrame) para el almuerzo.'
    ],
    packingInstructions: 'Asegúrate de usar recipientes herméticos de goma o rosca para evitar fugas de caldo en la lonchera.'
  },
  {
    id: 'cena-dia-8',
    title: 'Pollo con ahuyama, arroz pequeño y pepino',
    category: 'cena',
    yieldServings: 4,
    prepTime: '35–40 min',
    highlightTag: 'Inicio Semana 2 / Ligero',
    carbType: 'Arroz pequeño (120 g crudo)',
    imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Golden browned chicken pieces simmering in a rich squash and carrot sauce, served with white rice and fresh cucumber salad.',
    videoUrl: 'https://www.youtube.com/watch?v=gBhZ0jQNaa0',
    recipeSourceName: 'YouTube Cocina Hogareña',
    ingredients: [
      { name: 'Pollo en cubos o presas', amount: '600 g', grams: 600 },
      { name: 'Ahuyama en cubos', amount: '400 g', grams: 400 },
      { name: 'Zanahoria en rodajas', amount: '200 g', grams: 200 },
      { name: 'Tomate maduro picado', amount: '250 g', grams: 250 },
      { name: 'Cebolla picada', amount: '120 g', grams: 120 },
      { name: 'Dientes de ajo', amount: '2 unidades' },
      { name: 'Arroz crudo', amount: '120 g', grams: 120 },
      { name: 'Pepino cohombro fresco', amount: '300 g', grams: 300 },
      { name: 'Agua', amount: '500 ml' },
      { name: 'Comino, pimienta, sal y aceite', amount: 'Al gusto' }
    ],
    steps: [
      'Prepara un hogao tradicional con cebolla, ajo y tomate durante 8 minutos en sartén amplia.',
      'Sazona el pollo con sal, pimienta y comino; incorpóralo y dóralo ligeramente 3 minutos.',
      'Agrega la ahuyama en cubos, la zanahoria y 500 ml de agua.',
      'Tapa y cocina a fuego medio durante 25–30 minutos. Destapa los últimos 5 minutos para que la salsa reduzca y la ahuyama suelte su dulzor natural.',
      'Cocina el arroz aparte (30 g crudo por ración) y corta rodajas finas de pepino con sal y limón para acompañar.',
      'Cena 2 porciones y empaca las otras 2 de pollo y arroz para el almuerzo del día 9.'
    ],
    packingInstructions: 'Lleva el pepino cohombro en una bolsita o tarrina separada para colocarlo frío sobre el plato caliente.'
  },
  {
    id: 'cena-dia-9',
    title: 'Lentejas con calabacín, huevo y plátano asado (sin arroz)',
    category: 'cena',
    yieldServings: 4,
    prepTime: '40–45 min',
    highlightTag: 'Leguminosa con plátano dulce',
    carbType: 'Plátano maduro asado (Sin arroz)',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Savory lentil stew with diced green zucchini, soft boiled eggs, caramelized roasted ripe sweet plantains plátano maduro, hearty healthy plate.',
    videoUrl: 'https://www.youtube.com/watch?v=2y71buT5v7w',
    recipeSourceName: 'YouTube Recetas Colombianas',
    ingredients: [
      { name: 'Lentejas secas lavadas', amount: '300 g', grams: 300 },
      { name: 'Zanahoria en cubitos', amount: '200 g', grams: 200 },
      { name: 'Calabacín en medias lunas', amount: '300 g', grams: 300 },
      { name: 'Tomate picado', amount: '250 g', grams: 250 },
      { name: 'Cebolla picada', amount: '120 g', grams: 120 },
      { name: 'Dientes de ajo', amount: '2 unidades' },
      { name: 'Plátano maduro con cáscara', amount: '400 g', grams: 400 },
      { name: 'Huevos cocidos', amount: '4 unidades' },
      { name: 'Agua', amount: '1,1 litros' },
      { name: 'Comino, sal y aceite', amount: 'Al gusto' }
    ],
    steps: [
      'Haz el hogao con cebolla, ajo, tomate y comino en la olla principal.',
      'Agrega las lentejas lavadas, los cubos de zanahoria y el agua. Cocina tapado 25 minutos.',
      'Incorpora el calabacín en rodajas o cubos y cocina 8–10 minutos más para que quede tierno sin deshacerse.',
      'Corta el plátano maduro en cuatro partes y ásalo en sartén con tapa, freidora de aire u horno sin aceite añadido hasta que caramelice.',
      'Cocina los 4 huevos en agua hirviendo 9 minutos.',
      'Cena 2 porciones combinando lentejas calientes, huevo cocido y plátano maduro asado.',
      'Empaca las 2 porciones de almuerzo en recipientes con tapa.'
    ],
    packingInstructions: 'Guarda el plátano asado en un costado del recipiente; combina de manera espectacular con las lentejas.'
  },
  {
    id: 'cena-dia-10',
    title: 'Pollo desmechado con hogao, arroz y ensalada fresca',
    category: 'cena',
    yieldServings: 4,
    prepTime: '35–40 min',
    highlightTag: 'Sabor casero tradicional',
    carbType: 'Arroz moderado (120 g crudo)',
    imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Juicy shredded chicken cooked in rich Colombian tomato onion hogao sauce, served with white fluffy rice, avocado slices, cabbage salad.',
    recipeUrl: 'https://chatelet.com.co/blogs/news/como-hacer-sudado-de-pollo-colombiano-receta-tradicional-y-su-historia',
    recipeSourceName: 'Châtelet Gastronomía',
    ingredients: [
      { name: 'Pechuga o posta de pollo', amount: '600 g', grams: 600 },
      { name: 'Arroz crudo', amount: '120 g', grams: 120 },
      { name: 'Tomate maduro picado fino', amount: '300 g', grams: 300 },
      { name: 'Cebolla cabezona picada', amount: '150 g', grams: 150 },
      { name: 'Pimentón picado', amount: '150 g', grams: 150 },
      { name: 'Repollo rebanado', amount: '300 g', grams: 300 },
      { name: 'Zanahoria rallada', amount: '150 g', grams: 150 },
      { name: 'Aguacate fresco', amount: '300 g', grams: 300 },
      { name: 'Dientes de ajo', amount: '2 unidades' },
      { name: 'Comino, pimienta y sal', amount: 'Al gusto' }
    ],
    steps: [
      'Cocina el pollo en agua con ajo y un trozo de cebolla durante 20–25 minutos. Reserva una taza de caldo y desmecha la carne.',
      'En una sartén grande prepara un hogao espeso con tomate, cebolla, pimentón, comino y pimienta cocinando a fuego lento 8 minutos.',
      'Agrega el pollo desmechado y 150 ml del caldo reservado; cocina destapado 8–10 minutos para que absorba todo el sofrito y quede jugoso.',
      'Cocina el arroz blanco suelto y ralla el repollo con zanahoria para la ensalada.',
      'Cena 2 porciones de pollo con arroz, ensalada y aguacate.',
      'Empaca el pollo y el arroz en 2 refractarias para el almuerzo del día 11. Lleva el aguacate y ensalada aparte.'
    ],
    packingInstructions: 'Al recalentar, el pollo con hogao se mantiene sumamente húmedo y sabroso.'
  },
  {
    id: 'cena-dia-11',
    title: 'Garbanzos con pollo y verduras (sin arroz ni arepa)',
    category: 'cena',
    yieldServings: 4,
    prepTime: '45–50 min',
    highlightTag: 'Cazuela completa y nutritiva',
    carbType: 'Papa + Garbanzo (Sin arroz ni arepa)',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Hearty chickpea and chicken stew cazuela de garbanzos with potato cubes, zucchini, carrots, and wilted fresh dark green spinach leaves.',
    videoUrl: 'https://www.youtube.com/watch?v=0bNYniy3unQ',
    recipeUrl: 'https://vecinavegetariana.com/es/garbanzos-colombianos/',
    recipeSourceName: 'Vecina Vegetariana',
    ingredients: [
      { name: 'Pollo en cubos', amount: '400 g', grams: 400 },
      { name: 'Garbanzos secos (remojados y cocidos)', amount: '250 g', grams: 250 },
      { name: 'Papa en cubos', amount: '250 g', grams: 250 },
      { name: 'Zanahoria en rodajas', amount: '200 g', grams: 200 },
      { name: 'Calabacín en cubos', amount: '300 g', grams: 300 },
      { name: 'Tomate maduro picado', amount: '250 g', grams: 250 },
      { name: 'Cebolla picada', amount: '120 g', grams: 120 },
      { name: 'Espinaca fresca lavada', amount: '250 g', grams: 250 },
      { name: 'Dientes de ajo', amount: '2 unidades' },
      { name: 'Comino, sal y aceite', amount: 'Al gusto' }
    ],
    steps: [
      'Remoja y cocina previamente los garbanzos hasta que estén al dente.',
      'En una cacerola haz hogao con tomate, cebolla y ajo. Añade el pollo en cubos y sofríe 6–8 minutos.',
      'Agrega la papa, la zanahoria y una taza del caldo de los garbanzos; cocina tapado 12 minutos.',
      'Incorpora los garbanzos tiernos y el calabacín; cocina 8 minutos más.',
      'En los últimos 2 minutos añade las hojas de espinaca lavadas para que se marchiten con el calor residual manteniendo sus vitaminas.',
      'Cena dos porciones directamente en plato hondo. Empaca las otras 2 porciones para mañana (no requiere arroz adicional).'
    ],
    packingInstructions: 'Plato único todo-en-uno que ahorra recipientes en la lonchera.'
  },
  {
    id: 'cena-dia-12',
    title: 'Fríjoles con ahuyama, arroz pequeño y aguacate',
    category: 'cena',
    yieldServings: 4,
    prepTime: '50–55 min',
    highlightTag: 'Fuerza proteica vegetal',
    carbType: 'Arroz pequeño (100 g crudo) + Fríjol',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Bowl of Colombian red beans frijoles thickened with mashed ahuyama squash, side of fluffy white rice, fresh avocado, shredded cabbage.',
    videoUrl: 'https://www.youtube.com/watch?v=QAXcXL9Hy2A',
    recipeSourceName: 'YouTube Receta Tradicional',
    ingredients: [
      { name: 'Fríjoles secos (remojados 8-12 h)', amount: '350 g', grams: 350 },
      { name: 'Ahuyama en cubos', amount: '400 g', grams: 400 },
      { name: 'Tomate maduro picado', amount: '250 g', grams: 250 },
      { name: 'Cebolla picada', amount: '120 g', grams: 120 },
      { name: 'Dientes de ajo', amount: '2 unidades' },
      { name: 'Arroz crudo', amount: '100 g', grams: 100 },
      { name: 'Repollo rallado', amount: '300 g', grams: 300 },
      { name: 'Aguacate', amount: '300 g', grams: 300 },
      { name: 'Comino, cilantro y sal', amount: 'Al gusto' }
    ],
    steps: [
      'Cocina los fríjoles remojados en agua hasta que estén casi tiernos.',
      'Agrega los cubos de ahuyama y cocina hasta que ambos estén perfectamente blandos.',
      'Incorpora el hogao sofrito de tomate, cebolla, ajo y comino, y cocina a fuego suave 10 minutos. Aplasta parte de la ahuyama contra las paredes de la olla para lograr una salsa espesa y brillante.',
      'Cocina el arroz blanco y ralla el repollo.',
      'No agregues papa ni plátano esta noche, pues el fríjol y el arroz proveen la dosis ideal de carbohidrato.',
      'Cena 2 porciones con repollo y aguacate fresco.',
      'Empaca los fríjoles con arroz para el almuerzo del día 13.'
    ],
    packingInstructions: 'Lleva el aguacate entero o protegido con limón en un recipiente separado para cortarlo al momento de almorzar.'
  },
  {
    id: 'cena-dia-13',
    title: 'Sancocho tradicional de pollo',
    category: 'cena',
    yieldServings: 4,
    prepTime: '45–55 min',
    highlightTag: 'Patrimonio gastronómico',
    carbType: 'Yuca + Plátano verde + Papa + Mazorca (Sin arroz)',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Traditional Colombian sancocho de pollo soup in an authentic clay pot with corn on the cob pieces, green plantain, yuca root, potatoes, and cilantro.',
    videoUrl: 'https://www.youtube.com/watch?v=efL_CU49ae8',
    recipeUrl: 'https://pollocolombiano.com/sancocho-de-pollo/',
    recipeSourceName: 'Pollo Colombiano Oficial',
    ingredients: [
      { name: 'Pollo campesino en presas', amount: '600 g', grams: 600 },
      { name: 'Yuca pelada en trozos', amount: '500 g', grams: 500 },
      { name: 'Papa pastusa o criolla', amount: '300 g', grams: 300 },
      { name: 'Plátano verde en trozos', amount: '400 g', grams: 400 },
      { name: 'Mazorcas tiernas partidas', amount: '500 g', grams: 500 },
      { name: 'Cebolla larga o cabezona', amount: '120 g', grams: 120 },
      { name: 'Tomate maduro', amount: '200 g', grams: 200 },
      { name: 'Dientes de ajo', amount: '2 unidades' },
      { name: 'Cilantro fresco', amount: '40 g', grams: 40 },
      { name: 'Agua', amount: '2 litros' },
      { name: 'Comino, pimienta y sal', amount: 'Al gusto' }
    ],
    steps: [
      'En una olla grande coloca las presas de pollo, cebolla, ajo, cilantro cimarrón/común y los 2 litros de agua. Lleva a hervor durante 15 minutos.',
      'Agrega los trozos de mazorca y plátano verde (partido con las uñas o cuchillo). Cocina 10 minutos.',
      'Incorpora la yuca y las papas. Cocina a fuego medio-bajo hasta que todos los tubérculos estén suaves sin revolver bruscamente para no deshacer la yuca.',
      'Prepara un hogao rápido con el tomate y cebolla, y viértelo en el sancocho durante los últimos 5 minutos de hervor para teñir y sazonar el caldo.',
      'Cena 2 porciones humeantes con cilantro espolvoreado. No requiere arroz.',
      'Deja enfriar un poco y empaca 2 porciones en recipientes herméticos anti-derrames para el almuerzo del día 14.'
    ],
    packingInstructions: 'Utilizar recipientes herméticos de sello hermético de silicona. El sancocho asienta su sabor al día siguiente.'
  },
  {
    id: 'cena-dia-14',
    title: 'Tortilla grande de verduras con arroz pequeño',
    category: 'cena',
    yieldServings: 4,
    prepTime: '25–30 min',
    highlightTag: 'Cierre de ciclo / Vegetales',
    carbType: 'Arroz pequeño (100 g crudo)',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    aiPrompt: 'Thick golden Spanish style vegetable omelette tortilla de verduras packed with green zucchini, fresh spinach, red peppers, sliced on a plate with rice side.',
    videoUrl: 'https://www.youtube.com/watch?v=ga4NBo6JPXU',
    recipeUrl: 'https://www.gourmet.cl/recetas/tortilla-de-verduras/',
    recipeSourceName: 'Gourmet Recetas',
    ingredients: [
      { name: 'Huevos frescos', amount: '8 unidades' },
      { name: 'Calabacín en dados finos', amount: '400 g', grams: 400 },
      { name: 'Espinaca fresca picada', amount: '250 g', grams: 250 },
      { name: 'Tomate maduro en cubos', amount: '200 g', grams: 200 },
      { name: 'Cebolla picada', amount: '120 g', grams: 120 },
      { name: 'Pimentón en tiritas', amount: '150 g', grams: 150 },
      { name: 'Arroz crudo', amount: '100 g', grams: 100 },
      { name: 'Pepino cohombro', amount: '300 g', grams: 300 },
      { name: 'Aceite vegetal, pimienta, comino y sal', amount: 'Al gusto' }
    ],
    steps: [
      'En una sartén antiadherente amplia sofríe la cebolla y el pimentón 4 minutos.',
      'Añade el calabacín y cocina hasta que comience a dorar y pierda el exceso de agua. Añade el tomate y la espinaca picada, salteando 2 minutos más.',
      'En un tazón bate los 8 huevos con pimienta y sal al gusto. Vierte las verduras salteadas sobre los huevos batidos e integra.',
      'En la misma sartén con un hilo de aceite a fuego medio-bajo, vierte la mezcla. Tapa y cocina 8–10 minutos hasta que el borde esté firme y el centro casi cuajado.',
      'Voltea con la ayuda de un plato llano grande y cocina 3–5 minutos por el otro lado.',
      'Cocina el arroz suelto y acompaña con pepino.',
      'Cena 2 porciones (la mitad de la tortilla) y guarda las otras 2 porciones para el almuerzo posterior.'
    ],
    packingInstructions: 'La tortilla de verduras viaja excelente fría o a temperatura ambiente, o se calienta 1 minuto en microondas.'
  }
];
