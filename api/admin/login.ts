import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHash } from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pin } = req.body as { pin: string };

  if (!pin || typeof pin !== 'string') {
    return res.status(400).json({ error: 'PIN is required' });
  }

  const hashedPin = createHash('sha256').update(pin).digest('hex');
  const adminSecret = process.env.ADMIN_SECRET_KEY;

  if (!adminSecret) {
    return res.status(500).json({ error: 'Admin secret not configured' });
  }

  if (hashedPin !== adminSecret && pin !== adminSecret) {
    return res.status(401).json({ error: 'PIN inválido' });
  }

  const token = createHash('sha256')
    .update(`${adminSecret}:${Date.now()}`)
    .digest('hex');

  return res.status(200).json({ token });
}
