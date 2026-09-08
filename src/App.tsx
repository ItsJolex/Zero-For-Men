import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandBar } from './components/BrandBar';
import { Catalog } from './components/Catalog';
import { KitZeroSection } from './components/KitZeroSection';
import { WholesaleSection } from './components/WholesaleSection';
import { SocialProof } from './components/SocialProof';
import { FoundersStory } from './components/FoundersStory';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { ProductModal } from './components/ProductModal';
import { findProductBySlugOrId, type Product } from './data/products';

export function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sync state from URL (direct link support for customers)
  const syncProductFromUrl = useCallback(() => {
    if (typeof window === 'undefined') return;

    // 1. Pathname support: /poedagar-930-cara-verde-esmeralda
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    
    // 2. Query param support: ?reloj=... or ?p=...
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('reloj') || urlParams.get('p') || urlParams.get('modelo');

    // 3. Hash support: #poedagar-930...
    const hash = window.location.hash.replace(/^#\/?/, '');

    const candidate = path || queryParam || hash;
    const reservedRoutes = [
      '',
      'catalogo',
      'kit-zero',
      'mayoristas',
      'testimonios',
      'fundadores',
      'faq',
      'index.html'
    ];

    if (candidate && !reservedRoutes.includes(candidate)) {
      const found = findProductBySlugOrId(candidate);
      if (found) {
        setSelectedProduct(found);
        return;
      }
    }

    // If navigated back to home or a section anchor
    if (!candidate || reservedRoutes.includes(candidate)) {
      setSelectedProduct(null);
    }
  }, []);

  useEffect(() => {
    syncProductFromUrl();
    window.addEventListener('popstate', syncProductFromUrl);
    return () => window.removeEventListener('popstate', syncProductFromUrl);
  }, [syncProductFromUrl]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    // Push clean URL to browser address bar
    window.history.pushState({ productId: product.id }, '', `/${product.slug}`);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    // Revert URL to home without reloading
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      window.history.pushState(null, '', '/');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] flex flex-col selection:bg-[#8B5A2B] selection:text-[#FFFFFF]">
      {/* Top Announcement Banner & Glass Header */}
      <Navbar />

      {/* Main Page Content Flow */}
      <main className="flex-1">
        {/* Cinematic Hero */}
        <Hero />

        {/* Watch Brands Trust Bar */}
        <BrandBar />

        {/* Interactive Catalog with Categorization */}
        <Catalog onSelectProduct={handleSelectProduct} />

        {/* The Kit Zero Unboxing Experience */}
        <KitZeroSection />

        {/* Wholesale & Entrepreneurship (B2B) */}
        <WholesaleSection />

        {/* Social Proof, Real Dispatches & Customer Feedback */}
        <SocialProof />

        {/* Brand Founders Story */}
        <FoundersStory />

        {/* Interactive FAQ Accordion */}
        <FaqSection />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Floating Interactive WhatsApp Widget (hidden when modal is open) */}
      {!selectedProduct && <WhatsAppFloating />}

      {/* Global Product Sheet Modal with Direct Link URL & High Z-Index */}
      <ProductModal
        product={selectedProduct}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
