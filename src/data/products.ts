export interface Product {
  id: string;
  name: string;
  brand: 'Pagani Design' | 'Poedagar' | 'Curren' | 'Nibosi' | 'Casio' | 'Pablo Raez' | 'Zero Mayoristas' | 'Zero For Men';
  tagline: string;
  description: string;
  image: string;
  category: 'automaticos' | 'deportivos' | 'elegantes' | 'parejas' | 'mayoristas' | 'dama';
  price: string;
  priceNote?: string;
  specs: string[];
  badges: string[];
  movement: string;
  caseMaterial: string;
  waterResistance: string;
  glassType: string;
  isPopular?: boolean;
  slug: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'poedagar-930-blanca',
    name: 'Poedagar 930 Cara Blanca',
    brand: 'Poedagar',
    tagline: 'Lujo ejecutivo con dial blanco inmaculado.',
    description: 'Características: Mecanismo de cuarzo, acero inoxidable, resistente al agua, cristal mineral antirrayaduras, fechero y dia de la semana 100% funcional. ⌚️ Recibimos a BCV, envio gratis a nivel nacional atraves de MRW.',
    image: '/assets/catalog/poedagar-930-blanca.webp',
    category: 'elegantes',
    price: '$35',
    priceNote: 'Bs.S 40,00',
    specs: ['Fechador y Día Funcional', 'Acero Inoxidable', 'Cristal Mineral Antirrayaduras'],
    badges: ['Más Vendido', 'Envío Gratis'],
    movement: 'Cuarzo',
    caseMaterial: 'Acero Inoxidable',
    waterResistance: 'Resistente al agua',
    glassType: 'Cristal Mineral Antirrayaduras',
    isPopular: true,
    slug: 'poedagar-930-cara-blanca',
  },
  {
    id: 'poedagar-930-verde',
    name: 'Poedagar 930 Verde Esmeralda',
    brand: 'Poedagar',
    tagline: 'Elegancia atemporal con dial esmeralda.',
    description: 'Características: Mecanismo de cuarzo, acero inoxidable, resistente al agua, cristal mineral antirrayaduras, fechero y dia de la semana 100% funcional.',
    image: '/assets/catalog/poedagar-930-verde.webp',
    category: 'elegantes',
    price: '$35',
    priceNote: 'Bs.S 40,00',
    specs: ['Dial Verde Esmeralda', 'Fechador y Día Funcional', 'Acero Inoxidable'],
    badges: ['Top Tendencia', 'Envío Gratis'],
    movement: 'Cuarzo',
    caseMaterial: 'Acero Inoxidable',
    waterResistance: 'Resistente al agua',
    glassType: 'Cristal Mineral Antirrayaduras',
    isPopular: true,
    slug: 'poedagar-930-cara-verde-esmeralda',
  },
  {
    id: 'poedagar-date-day-oro',
    name: 'Poedagar Date/Day Bisel Dorado',
    brand: 'Poedagar',
    tagline: 'Presencia de alto perfil con bisel dorado.',
    description: 'Características: Mecanismo de cuarzo, acero inoxidable, resistente al agua, cristal mineral antirrayaduras, fechero y dia de la semana 100% funcional.',
    image: '/assets/catalog/poedagar-date-day-oro.webp',
    category: 'elegantes',
    price: '$35',
    priceNote: 'Bs.S 40,00',
    specs: ['Bisel Dorado', 'Fechador y Día Funcional', 'Acero Inoxidable'],
    badges: ['Edición Dorado', 'Envío Gratis'],
    movement: 'Cuarzo',
    caseMaterial: 'Acero Inoxidable',
    waterResistance: 'Resistente al agua',
    glassType: 'Cristal Mineral Antirrayaduras',
    isPopular: false,
    slug: 'poedagar-date-day-bisel-dorado',
  },
  {
    id: 'pablo-raez-tank',
    name: 'Pablo Raez Tank Marrón ⌚',
    brand: 'Pablo Raez',
    tagline: 'Diseño Tank clásico atemporal.',
    description: 'Características: Correa de Poliuretano y Nailon, Caja de acero inoxidable, Resistente al agua 5 ATM. Incluye caja original y envío gratuito.',
    image: '/assets/catalog/pablo-raez-tank.webp',
    category: 'elegantes',
    price: '$30',
    priceNote: 'Bs.S 30,00',
    specs: ['Correa Poliuretano/Nailon', 'Estilo Tank', 'Resistencia 5 ATM'],
    badges: ['Clásico', 'Envío Gratis'],
    movement: 'Cuarzo',
    caseMaterial: 'Acero Inoxidable',
    waterResistance: '5 ATM',
    glassType: 'Cristal Mineral',
    isPopular: true,
    slug: 'pablo-raez-tank-marron',
  },
  {
    id: 'pablo-raez-classic-redondo',
    name: 'Pablo Raez Classic Redondo',
    brand: 'Pablo Raez',
    tagline: 'Minimalismo y clase en formato redondo.',
    description: 'Características: Correa de Poliuretano y Nailon (marrón), Caja de acero inoxidable, Resistente al agua 5 ATM. Incluye caja original y envío gratuito.',
    image: '/assets/catalog/pablo-raez-classic-redondo.webp',
    category: 'elegantes',
    price: '$30',
    priceNote: 'Bs.S 30,00',
    specs: ['Dial Redondo Clásico', 'Correa Marrón', 'Resistencia 5 ATM'],
    badges: ['Elegante', 'Envío Gratis'],
    movement: 'Cuarzo',
    caseMaterial: 'Acero Inoxidable',
    waterResistance: '5 ATM',
    glassType: 'Cristal Mineral',
    isPopular: false,
    slug: 'pablo-raez-classic-redondo',
  },
  {
    id: 'pablo-raez-milanese',
    name: 'Pablo Raez Milanese Acero',
    brand: 'Pablo Raez',
    tagline: 'Tejido de acero para una sujeción perfecta.',
    description: 'Características: Correa de Acero Inoxidable estilo Milanese, Caja de acero inoxidable, Resistente al agua 5 ATM.',
    image: '/assets/catalog/pablo-raez-milanese.webp',
    category: 'elegantes',
    price: '$35',
    priceNote: 'Bs.S 35,00',
    specs: ['Correa Milanese Acero', 'Brazalete Ajustable', 'Resistencia 5 ATM'],
    badges: ['Moderno', 'Envío Gratis'],
    movement: 'Cuarzo',
    caseMaterial: 'Acero Inoxidable',
    waterResistance: '5 ATM',
    glassType: 'Cristal Mineral',
    isPopular: false,
    slug: 'pablo-raez-milanese-acero',
  },
  {
    id: 'nibosi-aquanaut-choc',
    name: 'Nibosi Aquanaut (Homenaje al Patek)',
    brand: 'Nibosi',
    tagline: 'Lujo deportivo con silicona chocolate.',
    description: 'Movimiento de cuarzo, Material de la caja: Aleación (Acabado en Oro Rosa), Cristal mineral, Silicona / Caucho (Chocolate), Fechero funcional.',
    image: '/assets/catalog/nibosi-aquanaut-choc.webp',
    category: 'deportivos',
    price: '$40',
    priceNote: 'Bs.S 40,00',
    specs: ['Correa de Caucho Chocolate', 'Acabado Oro Rosa', 'Pequeño Segundero'],
    badges: ['Homenaje', 'Envío Gratis MRW'],
    movement: 'Cuarzo',
    caseMaterial: 'Aleación (Acabado Oro Rosa)',
    waterResistance: '3 ATM (30 metros)',
    glassType: 'Cristal Mineral',
    isPopular: true,
    slug: 'nibosi-aquanaut-oro-rosa-chocolate',
  },
  {
    id: 'nibosi-aquanaut-black',
    name: 'Nibosi Aquanaut Correa Negra',
    brand: 'Nibosi',
    tagline: 'Versatilidad urbana con silicona negra.',
    description: 'Movimiento de cuarzo, Material de la caja: Aleación, Cristal mineral, Silicona / Caucho negro. Fechero funcional. Resistencia al agua 3 ATM.',
    image: '/assets/catalog/nibosi-aquanaut-black.webp',
    category: 'deportivos',
    price: '$40',
    priceNote: 'Bs.S 40,00',
    specs: ['Correa de Caucho Negro', 'Acero pulido', 'Pequeño Segundero'],
    badges: ['Deportivo', 'Envío Gratis MRW'],
    movement: 'Cuarzo',
    caseMaterial: 'Aleación',
    waterResistance: '3 ATM (30 metros)',
    glassType: 'Cristal Mineral',
    isPopular: false,
    slug: 'nibosi-aquanaut-correa-negra',
  },
  {
    id: 'poedagar-dama',
    name: 'Poedagar Dama',
    brand: 'Poedagar',
    tagline: 'Delicadeza y precisión femenina.',
    description: 'Acero inoxidable, Cristal mineral antirayaduras. El complemento perfecto para la mujer moderna.',
    image: '/assets/catalog/poedagar-dama.webp',
    category: 'dama',
    price: '$40',
    priceNote: 'Bs.S 40,00',
    specs: ['Diseño Femenino', 'Acero Inoxidable', 'Cristal Mineral Antirayaduras'],
    badges: ['Damas', 'Elegante'],
    movement: 'Cuarzo',
    caseMaterial: 'Acero Inoxidable',
    waterResistance: 'Resistente al agua',
    glassType: 'Cristal Mineral',
    isPopular: true,
    slug: 'poedagar-dama-oro-rosa',
  },
  {
    id: 'reloj-dama-roja',
    name: 'Reloj Dama Cara Roja',
    brand: 'Poedagar',
    tagline: 'Un toque de pasión y audacia.',
    description: 'Características: Mecanismo de cuarzo, acero inoxidable, resistente al agua, cristal mineral antirrayaduras, fechero funcional.',
    image: '/assets/catalog/reloj-dama-roja.webp',
    category: 'dama',
    price: '$40',
    priceNote: 'Bs.S 40,00',
    specs: ['Dial Cara Roja', 'Acero Inoxidable', 'Fechero Funcional'],
    badges: ['Damas', 'Envío Gratis MRW'],
    movement: 'Cuarzo',
    caseMaterial: 'Acero Inoxidable',
    waterResistance: 'Resistente al agua',
    glassType: 'Cristal Mineral',
    isPopular: false,
    slug: 'poedagar-dama-cara-roja',
  },
  {
    id: 'poedagar-dama-rosegold',
    name: 'Poedagar de dama Rose Gold ✨',
    brand: 'Poedagar',
    tagline: 'Brillo y lujo en tono oro rosa.',
    description: 'Acero inoxidable, Cristal mineral antirayaduras. Incluye caja y envío gratis. Elegancia absoluta en Rose Gold.',
    image: '/assets/catalog/poedagar-dama-rosegold.webp',
    category: 'dama',
    price: '$40',
    priceNote: 'Bs.S 40,00',
    specs: ['Acabado Rose Gold', 'Acero Inoxidable', 'Cristal Mineral'],
    badges: ['Damas', 'Rose Gold'],
    movement: 'Cuarzo',
    caseMaterial: 'Acero Inoxidable',
    waterResistance: 'Resistente al agua',
    glassType: 'Cristal Mineral',
    isPopular: true,
    slug: 'poedagar-dama-rose-gold',
  },
  {
    id: 'pablo-raez-classic-marron',
    name: 'Pablo Raez Classic Marrón',
    brand: 'Pablo Raez',
    tagline: 'Estética clásica para el día a día.',
    description: 'Características: Correa de Poliuretano y Nailon, Caja de acero inoxidable, Resistente al agua 5 ATM. Incluye caja original y envío gratuito.',
    image: '/assets/catalog/pablo-raez-classic-marron.webp',
    category: 'elegantes',
    price: '$30',
    priceNote: 'Bs.S 30,00',
    specs: ['Correa Marrón Clásica', 'Dial Blanco', 'Resistencia 5 ATM'],
    badges: ['Elegante', 'Diario'],
    movement: 'Cuarzo',
    caseMaterial: 'Acero Inoxidable',
    waterResistance: '5 ATM',
    glassType: 'Cristal Mineral',
    isPopular: false,
    slug: 'pablo-raez-classic-marron',
  },
  {
    id: 'pablo-raez-classic-negro',
    name: 'Pablo Raez Classic Negro',
    brand: 'Pablo Raez',
    tagline: 'Elegancia profunda con correa negra.',
    description: 'Características: Correa de Poliuretano y Nailon negra, Caja de acero inoxidable, Resistente al agua 5 ATM.',
    image: '/assets/catalog/pablo-raez-classic-negro.webp',
    category: 'elegantes',
    price: '$30',
    priceNote: 'Bs.S 30,00',
    specs: ['Correa Negra', 'Dial Plateado', 'Resistencia 5 ATM'],
    badges: ['Ejecutivo', 'Envío Gratis'],
    movement: 'Cuarzo',
    caseMaterial: 'Acero Inoxidable',
    waterResistance: '5 ATM',
    glassType: 'Cristal Mineral',
    isPopular: false,
    slug: 'pablo-raez-classic-negro',
  }
];

export const BRANDS = [
  { name: 'Poedagar', subtitle: 'Lujo Ejecutivo & Calidad', badge: 'Top Ventas' },
  { name: 'Nibosi', subtitle: 'Diseño Suizo & Deportivo', badge: 'Elegancia' },
  { name: 'Pablo Raez', subtitle: 'Clásico & Minimalista', badge: 'Diario' },
];

export const KIT_ITEMS = [
  {
    title: 'Estuche Rígido de Colección',
    description: 'Caja premium texturizada con almohadilla protectora aterciopelada que cuida la pieza y la protege de impactos o polvo.',
    icon: 'Package'
  },
  {
    title: 'Garantía Oficial',
    description: 'Certificado físico que respalda la autenticidad y el funcionamiento mecánico de tu reloj.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Herramienta Ajustadora',
    description: 'Para modelos de acero: Perno extractor de pasadores metálicos para que ajustes el brazalete a tu muñeca.',
    icon: 'Wrench'
  },
  {
    title: 'Paño de Microfibra',
    description: 'Tejido antiestático de fibras ultrafinas para limpiar huellas, sudor y polvo del cristal y bisel.',
    icon: 'Sparkles'
  }
];

export const REVIEWS = [
  {
    id: 1,
    author: 'Carlos Mendoza',
    city: 'Lechería, Anzoátegui',
    rating: 5,
    text: 'Compré el Poedagar 930 Cara Blanca y la presencia que tiene en la mano es brutal. La entrega en Lechería fue rapidísima.',
    product: 'Poedagar 930 Cara Blanca',
    verified: true
  },
  {
    id: 2,
    author: 'Gabriel Arismendi',
    city: 'Caracas, Dto. Capital',
    rating: 5,
    text: 'El Nibosi Aquanaut superó mis expectativas por completo. Se ve de un reloj de más de 200$. El envío por MRW llegó en 24 horas exactas.',
    product: 'Nibosi Aquanaut (Homenaje al Patek)',
    verified: true
  },
  {
    id: 3,
    author: 'Vanessa R.',
    city: 'San Fernando, Apure',
    rating: 5,
    text: 'Encargué el Poedagar Dama Rose Gold y es hermoso. Llegó en perfectas condiciones con todo su kit.',
    product: 'Poedagar Dama Rose Gold',
    verified: true
  }
];

export const FAQS = [
  {
    question: '¿Cuáles son los métodos de pago aceptados?',
    answer: 'Aceptamos Pago Móvil en Bolívares a tasa BCV, Efectivo, Zelle, y USDT vía Binance Pay.'
  },
  {
    question: '¿Hacen envíos a todo el país y cuánto tardan?',
    answer: 'Sí, despachamos a toda Venezuela a través de MRW (¡Envío GRATIS en la mayoría de los modelos!). Los envíos suelen tardar entre 24 y 48 horas hábiles.'
  },
  {
    question: '¿Dónde realizan entregas personales?',
    answer: 'Realizamos entregas personales en Lechería, Anzoátegui.'
  },
  {
    question: '¿Qué incluye la compra de mi reloj?',
    answer: 'Todos los relojes incluyen su caja original, pañuelo de microfibra, y en los modelos de acero incluimos el recortador (ajustador de eslabones).'
  }
];

export function findProductBySlugOrId(identifier: string): Product | undefined {
  if (!identifier) return undefined;
  // Clean path, remove leading/trailing slashes, remove ? or # parts if passed
  const clean = identifier
    .toLowerCase()
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')
    .replace(/^reloj\//, '')
    .trim();

  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/oe/g, 'o') // handle podegar vs poedagar
      .replace(/[^a-z0-9]/g, '');

  const cleanNorm = normalize(clean);

  return PRODUCTS.find((p) => {
    return (
      p.slug.toLowerCase() === clean ||
      p.id.toLowerCase() === clean ||
      normalize(p.slug) === cleanNorm ||
      normalize(p.id) === cleanNorm ||
      normalize(p.name) === cleanNorm
    );
  });
}
