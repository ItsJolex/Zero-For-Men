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
    const result = await db.execute('SELECT * FROM products ORDER BY created_at DESC');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    return res.status(200).json({ products: result.rows });
  } catch (error) {
    console.error('DB error:', error);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
}
