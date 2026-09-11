import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@libsql/client';

function getDb() {
  return createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN || undefined,
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = getDb();
    const includeHidden = req.query.include_hidden === 'true';
    
    // Si es para la tienda pública, no mostrar los ocultos
    const sql = includeHidden 
      ? 'SELECT * FROM products ORDER BY created_at DESC'
      : 'SELECT * FROM products WHERE is_hidden = 0 OR is_hidden IS NULL ORDER BY created_at DESC';

    const result = await db.execute(sql);
    
    const products = result.rows.map(row => ({
      ...row,
      specs: row.specs ? JSON.parse(row.specs as string) : [],
      badges: row.badges ? JSON.parse(row.badges as string) : []
    }));
    
    // Si la petición es del admin (?include_hidden=true o con token), NUNCA cachear
    if (includeHidden || req.headers.authorization) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    } else {
      res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
    }

    return res.status(200).json({ products });
  } catch (error) {
    console.error('DB error:', error);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
}