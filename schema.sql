CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  price TEXT NOT NULL,
  numeric_price REAL NOT NULL,
  price_note TEXT,
  tagline TEXT,
  description TEXT,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT 1,
  featured BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
