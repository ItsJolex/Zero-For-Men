import { useState } from 'react';
import { PRODUCTS, type Product } from '../data/products';
import { ProductModal } from './ProductModal';
import { MessageCircle, Info, Sparkles, Search, CheckCircle2, ChevronRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useBcvRate } from '../hooks/useBcvRate';

interface CatalogProps {
  onSelectProduct?: (product: Product) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [internalModalProduct, setInternalModalProduct] = useState<Product | null>(null);
  const { addItem } = useCart();
  const { rate: bcvRate, loading: bcvLoading, error: bcvError } = useBcvRate();

  const formatVesPrice = (usdPrice: string): string | null => {
    if (!bcvRate) return null;
    
    const numericPrice = parseFloat(usdPrice.replace(/[^0-9.]/g, ''));
    if (isNaN(numericPrice)) return null;
    
    const vesAmount = numericPrice * bcvRate;
    return `Bs. ${vesAmount.toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const handleOpenProduct = (product: Product) => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      setInternalModalProduct(product);
    }
  };

  const categories = [
    { id: 'todos', name: 'Todos los Relojes' },
    { id: 'automaticos', name: 'Automáticos & GMT' },
    { id: 'elegantes', name: 'Elegantes & Ejecutivos' },
    { id: 'deportivos', name: 'Deportivos & Cronógrafos' },
    { id: 'parejas', name: 'Parejas' },
    { id: 'dama', name: 'Damas' },
    { id: 'mayoristas', name: 'Al Mayor / Lote' },
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'todos' || product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.specs.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="catalogo" className="py-20 bg-[#FAFAFA] relative scroll-mt-32">
      {/* Glow highlight */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#8B5A2B]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#8B5A2B]/30 text-[#8B5A2B] text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catálogo Exclusivo</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0A] tracking-tight mb-4">
            Ingeniería que Impone Respeto
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Cada reloj es seleccionado e inspeccionado individualmente. Incluye el <span className="text-[#8B5A2B] font-semibold">Kit Zero</span> completo para que no tengas que gastar en relojeros ni herramientas.
          </p>
        </div>

        {/* Filters and Search Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10">
          {/* Categories Pill Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none flex-nowrap lg:flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#8B5A2B] to-[#5C4033] text-[#FAFAFA] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'bg-[#FFFFFF] text-gray-700 border border-[#E5E7EB] hover:border-[#8B5A2B]/50 hover:text-[#0A0A0A]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72 shrink-0">
            <input
              type="text"
              aria-label="Buscar reloj por marca, modelo o estilo"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por marca, modelo o zafiro..."
              className="w-full bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#8B5A2B] text-xs sm:text-sm text-[#0A0A0A] rounded-xl pl-9 pr-4 py-2.5 outline-none transition-colors"
            />
            <Search className="w-4 h-4 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#E5E7EB] rounded-2xl bg-[#FFFFFF]/40">
            <p className="text-gray-600 text-sm mb-4">No se encontraron relojes que coincidan con tu búsqueda.</p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="text-xs text-[#8B5A2B] underline hover:text-[#0A0A0A] transition-colors cursor-pointer"
            >
              Restablecer filtros de búsqueda
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {filteredProducts.map((product) => {
              const whatsappMessage = encodeURIComponent(
                `Hola Zero For Men, deseo consultar disponibilidad del modelo ${product.name}`
              );
              const whatsappUrl = `https://wa.me/584141934573?text=${whatsappMessage}`;

              return (
                <article
                  key={product.id}
                  className="bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#8B5A2B]/60 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group hover:-translate-y-1.5 shadow-md hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
                >
                  {/* Image Container with Badges */}
                  <div
                    onClick={() => handleOpenProduct(product)}
                    className="relative h-56 sm:h-80 overflow-hidden bg-[#FAFAFA] cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent opacity-80" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {product.badges.map((b) => (
                        <span
                          key={b}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FAFAFA]/90 backdrop-blur-md border border-[#8B5A2B]/40 text-[#8B5A2B]"
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    {/* Brand Pill */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-mono tracking-wider bg-[#FAFAFA]/90 text-gray-700 border border-gray-300">
                        {product.brand}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between gap-2 mb-1.5">
                        <h3
                          onClick={() => handleOpenProduct(product)}
                          className="font-serif text-lg sm:text-xl font-bold text-[#0A0A0A] group-hover:text-[#8B5A2B] transition-colors leading-tight cursor-pointer"
                        >
                          {product.name}
                        </h3>
                      </div>

                      <p className="text-xs text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                        {product.tagline}
                      </p>

                      {/* Top 3 Specs List - Hidden on mobile to prevent infinite vertical fatigue */}
                      <ul className="hidden sm:block space-y-1.5 mb-6 text-xs text-gray-700 border-t border-[#E5E7EB] pt-3">
                        {product.specs.slice(0, 3).map((spec, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5A2B] shrink-0" />
                            <span className="truncate">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price and CTA Buttons */}
                    <div>
                      <div className="flex items-baseline justify-between border-t border-[#E5E7EB] pt-3 sm:pt-4 mb-3 sm:mb-4">
                        <div>
                          <span className="text-xs text-gray-600 block font-mono">Precio Oficial</span>
                          <span className="text-2xl font-bold text-[#0A0A0A]">{product.price}</span>
                          {bcvRate && (
                            <div className="mt-1">
                              <span className="text-xs text-gray-500">
                                ≈ {formatVesPrice(product.price)}
                              </span>
                              {bcvLoading && (
                                <span className="text-xs text-gray-400 ml-1">(actualizando...)</span>
                              )}
                            </div>
                          )}
                          {bcvError && (
                            <div className="mt-1">
                              <span className="text-[10px] text-amber-600">
                                Tasa no disponible
                              </span>
                            </div>
                          )}
                        </div>
                        {product.priceNote && (
                          <span className="text-[11px] text-[#8B5A2B] font-medium text-right max-w-[140px]">
                            {product.priceNote}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => handleOpenProduct(product)}
                          className="inline-flex items-center justify-center gap-1.5 px-2 py-3 sm:py-2.5 rounded-xl bg-[#FAFAFA] border border-gray-300 hover:border-[#8B5A2B] text-gray-800 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Info className="w-3.5 h-3.5 text-[#8B5A2B]" />
                          <span className="hidden sm:inline">Ficha</span>
                        </button>

                        <button
                          onClick={() => addItem(product)}
                          className="inline-flex items-center justify-center gap-1.5 px-2 py-3 sm:py-2.5 rounded-xl bg-[#FAFAFA] border border-[#8B5A2B]/40 hover:border-[#8B5A2B] hover:bg-[#8B5A2B]/10 text-[#8B5A2B] text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Añadir</span>
                        </button>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 bg-[#8B5A2B] hover:bg-[#6F441F] text-[#FFFFFF] font-bold text-xs uppercase tracking-wider px-2 py-3 sm:py-2.5 rounded-xl transition-all shadow-sm hover:scale-[1.02]"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          <span>Pedir</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Fallback internal modal if not controlled from parent */}
        {!onSelectProduct && (
          <ProductModal
            product={internalModalProduct}
            onClose={() => setInternalModalProduct(null)}
          />
        )}

        {/* Wholesale callout banner beneath catalog */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#FFFFFF] via-[#FAFAFA] to-[#FFFFFF] border border-[#8B5A2B]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-left">
            <span className="inline-block text-xs uppercase font-mono tracking-widest text-[#8B5A2B] mb-1">
              ¿Deseas emprender en tu ciudad?
            </span>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#0A0A0A] mb-1">
              Lleva Lotes al Mayor a partir de 3 unidades
            </h4>
            <p className="text-xs sm:text-sm text-gray-700 max-w-xl">
              Accede a márgenes comerciales del 40% al 60% con stock garantizado, empaques de lujo y asesoría de venta directa.
            </p>
          </div>
          <a
            href="#mayoristas"
            className="shrink-0 inline-flex items-center gap-2 bg-[#8B5A2B] hover:bg-[#6F441F] text-[#FAFAFA] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all"
          >
            <span>Ver Beneficios Mayoristas</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
