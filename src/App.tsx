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
import { LegalModal, type LegalTab } from './components/LegalModal';
import { findProductBySlugOrId, type Product } from './data/products';
import { AlertCircle, X } from 'lucide-react';

const RESERVED_ROUTES = [
  '',
  'catalogo',
  'kit-zero',
  'mayoristas',
  'testimonios',
  'fundadores',
  'faq',
  'index.html'
];

function parseUrlProduct(): { product: Product | null; notFound: string | null } {
  if (typeof window === 'undefined') return { product: null, notFound: null };

  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get('reloj') || urlParams.get('p') || urlParams.get('modelo');
  const hash = window.location.hash.replace(/^#\/?/, '');

  const candidate = path || queryParam || hash;

  if (candidate && !RESERVED_ROUTES.includes(candidate)) {
    const found = findProductBySlugOrId(candidate);
    if (found) {
      return { product: found, notFound: null };
    }
    return { product: null, notFound: candidate };
  }

  return { product: null, notFound: null };
}

export function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(() => parseUrlProduct().product);
  const [notFoundSlug, setNotFoundSlug] = useState<string | null>(() => parseUrlProduct().notFound);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('garantia');

  // Sync state from URL when navigating history (back/forward buttons)
  const syncProductFromUrl = useCallback(() => {
    const { product, notFound } = parseUrlProduct();
    setSelectedProduct(product);
    setNotFoundSlug(notFound);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', syncProductFromUrl);
    return () => window.removeEventListener('popstate', syncProductFromUrl);
  }, [syncProductFromUrl]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setNotFoundSlug(null);
    window.history.pushState({ productId: product.id }, '', `/${product.slug}`);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      window.history.pushState(null, '', '/');
    }
  };

  const handleOpenLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] flex flex-col selection:bg-[#8B5A2B] selection:text-[#FFFFFF]">
      {/* Top Announcement Banner & Glass Header */}
      <Navbar />

      {/* Product Not Found Banner if invalid slug entered */}
      {notFoundSlug && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-amber-900 text-xs sm:text-sm sticky top-16 z-30 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 max-w-4xl mx-auto flex-1">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              El modelo solicitado (<strong>{notFoundSlug}</strong>) no se encuentra disponible actualmente. Te invitamos a explorar nuestra colección disponible abajo.
            </span>
          </div>
          <button
            onClick={() => {
              setNotFoundSlug(null);
              window.history.pushState(null, '', '/');
            }}
            className="p-1 text-amber-700 hover:text-amber-900 rounded-md ml-2 cursor-pointer"
            aria-label="Cerrar notificación"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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

      {/* Luxury Footer with Legal links */}
      <Footer onOpenLegal={handleOpenLegal} />

      {/* Floating Interactive WhatsApp Widget (hidden when product or legal modal is open) */}
      {!selectedProduct && !legalModalOpen && <WhatsAppFloating />}

      {/* Global Product Sheet Modal with Direct Link URL */}
      <ProductModal
        product={selectedProduct}
        onClose={handleCloseModal}
      />

      {/* Legal & Guarantee Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        initialTab={legalTab}
        onClose={() => setLegalModalOpen(false)}
      />
    </div>
  );
}

export default App;
