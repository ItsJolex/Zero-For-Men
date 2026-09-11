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
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.body as { id: string };

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    const db = getDb();
    await db.execute({
      sql: 'DELETE FROM products WHERE id = ?',
      args: [id]
    });

    return res.status(200).json({ success: true, message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('DB delete error:', error);
    return res.status(500).json({ error: 'Failed to delete product' });
  }
}
