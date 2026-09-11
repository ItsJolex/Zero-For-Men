import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@libsql/client';

function getDb() {
  return createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN || undefined,
  });
}

function verifyAuth(req: VercelRequest): boolean {
  const authHeader = req.headers.authorization;
  return Boolean(authHeader && authHeader.startsWith('Bearer '));
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .trim()
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/[^\w-]+/g, '') // Eliminar caracteres no alfanuméricos excepto guión
    .replace(/--+/g, '-'); // Reemplazar guiones múltiples
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const {
    name,
    brand,
    numeric_price,
    compare_at_price,
    numeric_compare_at_price,
    discount_percent,
    price_note,
    tagline,
    description,
    image,
    category,
    in_stock = 1,
    is_hidden = 0,
    featured = 0,
    movement,
    case_material,
    water_resistance,
    glass_type,
    specs = [],
    badges = []
  } = req.body as Record<string, any>;

  // Validaciones obligatorias
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'El nombre del reloj es obligatorio' });
  }

  if (!image || typeof image !== 'string' || !image.trim()) {
    return res.status(400).json({ error: 'La imagen del producto es obligatoria' });
  }

  const numPrice = Number(numeric_price);
  if (isNaN(numPrice) || numPrice <= 0) {
    return res.status(400).json({ error: 'El precio debe ser un número mayor a 0' });
  }

  const formattedPrice = `$${numPrice}`;
  const baseSlug = slugify(name);
  const uniqueSuffix = Date.now().toString(36).slice(-4);
  const id = `${baseSlug}-${uniqueSuffix}`;
  const slug = `${baseSlug}-${uniqueSuffix}`;

  const finalSpecs = Array.isArray(specs) ? specs : [];
  const finalBadges = Array.isArray(badges) ? badges : [];

  try {
    const db = getDb();
    await db.execute({
      sql: `INSERT INTO products (
        id, slug, name, brand, price, numeric_price, 
        compare_at_price, numeric_compare_at_price, discount_percent, 
        price_note, tagline, description, image, category, 
        in_stock, is_hidden, featured, movement, case_material, 
        water_resistance, glass_type, specs, badges
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        slug,
        name.trim(),
        brand || 'Zero For Men',
        formattedPrice,
        numPrice,
        compare_at_price ? String(compare_at_price) : null,
        numeric_compare_at_price ? Number(numeric_compare_at_price) : null,
        discount_percent ? Number(discount_percent) : null,
        price_note || 'Tasa BCV',
        tagline || null,
        description || null,
        image,
        category || 'elegantes',
        in_stock ? 1 : 0,
        is_hidden ? 1 : 0,
        featured ? 1 : 0,
        movement || null,
        case_material || null,
        water_resistance || null,
        glass_type || null,
        JSON.stringify(finalSpecs),
        JSON.stringify(finalBadges)
      ]
    });

    return res.status(201).json({
      success: true,
      product: {
        id,
        slug,
        name,
        brand: brand || 'Zero For Men',
        price: formattedPrice,
        numeric_price: numPrice,
        image,
        category: category || 'elegantes'
      }
    });
  } catch (error) {
    console.error('Error creating product in DB:', error);
    return res.status(500).json({ error: 'Error al registrar el producto en la base de datos' });
  }
}
