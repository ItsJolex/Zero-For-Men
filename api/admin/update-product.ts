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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id, ...fields } = req.body as Record<string, unknown>;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  const allowedFields = ['name', 'brand', 'price', 'numeric_price', 'price_note', 'tagline', 'description', 'image', 'category', 'in_stock', 'featured'];
  const updates: string[] = [];
  const values: unknown[] = [];

  for (const [key, value] of Object.entries(fields)) {
    if (allowedFields.includes(key)) {
      updates.push(`${key} = ?`);
      values.push(value);
    }
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  values.push(id);

  try {
    const db = getDb();
    await db.execute({
      sql: `UPDATE products SET ${updates.join(', ')} WHERE id = ?`,
      args: values as (string | number | bigint | boolean | null | ArrayBuffer | Date)[]
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('DB update error:', error);
    return res.status(500).json({ error: 'Failed to update product' });
  }
}
