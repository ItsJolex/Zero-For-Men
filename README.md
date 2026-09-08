# ⌚ Zero For Men — Tienda Web Oficial

Aplicación web de alta conversión y catálogo interactivo para **Zero For Men** (`@zerooformen`), boutique de relojería masculina con base en Lechería / Anzoátegui y cobertura a toda Venezuela.

---

## 🚀 Tecnologías
- **Framework:** React 19 + TypeScript + Vite 8
- **Estilos & Diseño:** Tailwind CSS v4 + Lucide Icons + Google Fonts (Bodoni Moda / Inter / Space Grotesk)
- **Paleta de Identidad:** Clean Pearl White (`#FAFAFA`), Deep Pitch (`#0A0A0A`), Saddle Leather Brown (`#8B5A2B`), Slate Gray (`#4B5563`)
- **Assets:** Recursos WebP ultra-livianos de alta fidelidad ubicados en `public/assets/` (~500 KB en total)

---

## 🛠️ Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo local
npm run dev

# Compilar para producción (TypeScript estricto + Vite Bundle)
npm run build

# Previsualizar el build de producción localmente
npm run preview
```

---

## 🌐 Despliegue en la Nube (Cloudflare Pages & Vercel)

### 1. Cloudflare Pages (Recomendado)
- **Framework Preset:** Vite
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/`
- El archivo `public/_redirects` (incluido en `dist/_redirects`) garantiza el enrutamiento SPA y enlaces directos por slug (`/poedagar-930-cara-verde-esmeralda`) sin errores 404 en el Edge de Cloudflare.

### 2. Vercel (Fallback)
- **Framework Preset:** Vite
- **Root Directory:** `/`
- **Build command:** `npm run build`
- **Output Directory:** `dist`
- El archivo `vercel.json` redirige todas las rutas hacia `/index.html`.

---

## 📱 Canales de Conversión Integrados
- Enlace directo de compra a WhatsApp con mensaje dinámico por modelo: `+58 414-1934573`
- Módulo de unboxing con la **Experiencia Kit Zero**
- Módulo de captación de distribuidores y compras al mayor desde 3 unidades
- Módulo de prueba social con fotos reales en MRW y testimonios en Venezuela
