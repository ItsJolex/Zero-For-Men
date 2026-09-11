CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  price TEXT NOT NULL,
  numeric_price REAL NOT NULL,
  compare_at_price TEXT,
  numeric_compare_at_price REAL,
  discount_percent INTEGER,
  price_note TEXT,
  tagline TEXT,
  description TEXT,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT 1,
  is_hidden BOOLEAN DEFAULT 0,
  featured BOOLEAN DEFAULT 0,
  movement TEXT,
  case_material TEXT,
  water_resistance TEXT,
  glass_type TEXT,
  specs TEXT, -- JSON array
  badges TEXT, -- JSON array
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
