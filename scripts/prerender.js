import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { imageSize as _imageSize } from 'image-size';

// Helper: image-size en ESM espera un Buffer, no un path string
function getImageDims(filePath) {
  const buffer = fs.readFileSync(filePath);
  return _imageSize(new Uint8Array(buffer));
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const indexHtmlPath = path.resolve(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('Error: dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(indexHtmlPath, 'utf-8');

// Import products dynamically using Node's native ESM and TS support
const { PRODUCTS } = await import('../src/data/products.ts');

console.log(`\n🚀 Iniciando pre-renderizado SSG para ${PRODUCTS.length} productos...`);

const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL 
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://zeroformen.com');

// Actualizar dist/index.html raíz con el dominio activo y etiquetas OG completas
let rootHtml = template.replaceAll('https://zeroformen.com', SITE_URL);
const avatarPath = path.resolve(rootDir, 'public/assets/linktree_avatar.jpeg');
const avatarDims = fs.existsSync(avatarPath) ? getImageDims(avatarPath) : { width: 512, height: 512 };
rootHtml = rootHtml.replace(
  /<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/?>/i,
  `<meta property="og:image" content="${SITE_URL}/assets/linktree_avatar.jpeg" />\n    <meta property="og:image:secure_url" content="${SITE_URL}/assets/linktree_avatar.jpeg" />\n    <meta property="og:image:type" content="image/jpeg" />\n    <meta property="og:image:width" content="${avatarDims.width}" />\n    <meta property="og:image:height" content="${avatarDims.height}" />`
);
fs.writeFileSync(indexHtmlPath, rootHtml, 'utf-8');
console.log(`  ✓ Actualizado dist/index.html con dominio activo: ${SITE_URL}`);

for (const product of PRODUCTS) {
  const productUrl = `${SITE_URL}/${product.slug}`;
  const imageUrl = product.image.startsWith('http')
    ? product.image.replace(/\.webp$/, '.jpg')
    : `${SITE_URL}${product.image.replace(/\.webp$/, '.jpg')}`;
  
  // Leer dimensiones reales de la imagen JPG
  const localJpgPath = path.resolve(rootDir, 'public', product.image.replace(/^\//, '').replace(/\.webp$/, '.jpg'));
  const imgDims = fs.existsSync(localJpgPath) ? getImageDims(localJpgPath) : { width: 600, height: 800 };
  
  const title = `${product.name} - ${product.price} | Zero For Men Venezuela`;
  const rawDescription = `${product.tagline} ${product.description}`.replace(/"/g, '&quot;');
  const cleanDesc = rawDescription.length > 155 ? `${rawDescription.slice(0, 152)}...` : rawDescription;
  const numericPrice = product.price.replace(/[^0-9.]/g, '') || '35';

  let html = template;

  // Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);

  // Replace Meta Description
  html = html.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="description" content="${cleanDesc}" />`
  );

  // Replace Canonical Link
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i,
    `<link rel="canonical" href="${productUrl}" />`
  );

  // Replace Open Graph Tags
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:url" content="${productUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:title" content="${product.name} - ${product.price} | Zero For Men" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:description" content="${cleanDesc}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:image" content="${imageUrl}" />\n    <meta property="og:image:secure_url" content="${imageUrl}" />\n    <meta property="og:image:type" content="image/jpeg" />\n    <meta property="og:image:width" content="${imgDims.width}" />\n    <meta property="og:image:height" content="${imgDims.height}" />`
  );

  // Replace Twitter Card Tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="twitter:title" content="${product.name} - ${product.price} | Zero For Men" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="twitter:description" content="${cleanDesc}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="twitter:image" content="${imageUrl}" />`
  );

  // Inyectar Schema Product individual especifico para crawlers
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'image': imageUrl,
    'description': cleanDesc,
    'brand': {
      '@type': 'Brand',
      'name': product.brand
    },
    'offers': {
      '@type': 'Offer',
      'price': numericPrice,
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock',
      'url': productUrl,
      'seller': {
        '@type': 'Organization',
        'name': 'Zero For Men'
      }
    }
  };

  const schemaTag = `<script type="application/ld+json">\n${JSON.stringify(productSchema, null, 2)}\n</script>\n</head>`;
  html = html.replace('</head>', schemaTag);

  // Output to dist/[slug]/index.html
  const productDir = path.resolve(distDir, product.slug);
  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir, { recursive: true });
  }
  fs.writeFileSync(path.resolve(productDir, 'index.html'), html, 'utf-8');

  // Also write dist/[slug].html for servers that match route.html
  fs.writeFileSync(path.resolve(distDir, `${product.slug}.html`), html, 'utf-8');

  console.log(`  ✓ Generado HTML estático para: /${product.slug}`);
}

// Generación dinámica de sitemap.xml con el dominio activo
let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Pagina Principal -->
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

for (const product of PRODUCTS) {
  sitemapContent += `  <url>
    <loc>${SITE_URL}/${product.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
}
sitemapContent += `</urlset>\n`;

fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapContent, 'utf-8');
console.log(`  ✓ Sitemap dinámico generado en dist/sitemap.xml con dominio: ${SITE_URL}`);

console.log(`\n✨ Pre-renderizado SSG y Sitemap completados exitosamente para los ${PRODUCTS.length} productos.\n`);
