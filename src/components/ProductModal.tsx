import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Product } from '../data/products';
import {
  X,
  MessageCircle,
  CheckCircle2,
  Shield,
  Droplets,
  Watch,
  Layers,
  Sparkles,
  Link2,
  Check
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const [copied, setCopied] = useState(false);

  // Close on ESC key and lock body scroll
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  // Reset copied state when product changes
  useEffect(() => {
    setCopied(false);
  }, [product]);

  if (!product) return null;

  const currentUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/${product.slug}`
      : `https://zeroformen.com/${product.slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Zero For Men, deseo consultar disponibilidad del modelo ${product.name} (${currentUrl})`
  );
  const whatsappUrl = `https://wa.me/584141934573?text=${whatsappMessage}`;

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      {/* Click outside backdrop */}
      <div
        className="fixed inset-0 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[90vh] my-auto z-10">
        {/* Header - Fixed at top of modal */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#E5E7EB] bg-[#FAFAFA]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-[#8B5A2B] font-semibold">
              Ficha Técnica Oficial
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-xs text-gray-700 font-medium">{product.brand}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Copy Link in Header */}
            <button
              onClick={handleCopyLink}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : 'bg-[#FFFFFF] text-gray-700 border border-gray-300 hover:border-[#8B5A2B] hover:text-[#8B5A2B]'
              }`}
              title="Copiar enlace directo de este modelo"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold">¡Enlace copiado!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copiar Enlace</span>
                </>
              )}
            </button>

            {/* Close Button with comfortable touch target */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-500 hover:text-[#0A0A0A] hover:bg-gray-200 transition-colors cursor-pointer"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content with comfortable bottom padding */}
        <div className="overflow-y-auto p-4 sm:p-8 pb-10 sm:pb-12 space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Image Container */}
            <div className="relative rounded-xl overflow-hidden bg-[#FAFAFA] border border-[#E5E7EB] aspect-square shadow-inner">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.badges.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFFFFF]/95 border border-[#8B5A2B]/40 text-[#8B5A2B] shadow-sm backdrop-blur-sm"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Product Quick Info */}
            <div className="space-y-4">
              <div>
                <h3
                  id="modal-product-title"
                  className="font-serif text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-1 leading-tight"
                >
                  {product.name}
                </h3>
                <p className="text-xs text-[#8B5A2B] font-medium">{product.tagline}</p>
              </div>

              <div className="flex items-baseline gap-2 py-2.5 border-y border-[#E5E7EB]">
                <span className="text-3xl font-bold text-[#0A0A0A]">{product.price}</span>
                {product.priceNote && (
                  <span className="text-xs text-gray-600 font-mono">({product.priceNote})</span>
                )}
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>

              <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#8B5A2B]/30 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#8B5A2B] shrink-0" />
                <div className="text-xs text-gray-700">
                  <span className="font-semibold text-[#8B5A2B]">Kit Zero Incluido:</span> Estuche
                  rígido, pañuelo de microfibra, ajustador de eslabones y batería de repuesto.
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="border-t border-[#E5E7EB] pt-6">
            <h4 className="text-xs uppercase font-mono tracking-wider text-gray-600 mb-4">
              Especificaciones de Ingeniería & Materiales
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] flex items-center gap-3">
                <Watch className="w-4 h-4 text-[#8B5A2B] shrink-0" />
                <div>
                  <span className="text-gray-500 block text-[11px]">Movimiento / Calibre</span>
                  <span className="text-[#0A0A0A] font-medium">{product.movement}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] flex items-center gap-3">
                <Layers className="w-4 h-4 text-[#8B5A2B] shrink-0" />
                <div>
                  <span className="text-gray-500 block text-[11px]">Material de la Caja</span>
                  <span className="text-[#0A0A0A] font-medium">{product.caseMaterial}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] flex items-center gap-3">
                <Droplets className="w-4 h-4 text-sky-600 shrink-0" />
                <div>
                  <span className="text-gray-500 block text-[11px]">Resistencia al Agua</span>
                  <span className="text-[#0A0A0A] font-medium">{product.waterResistance}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] flex items-center gap-3">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-gray-500 block text-[11px]">Cristal de Protección</span>
                  <span className="text-[#0A0A0A] font-medium">{product.glassType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Specs List */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-gray-600 mb-3">
              Puntos Clave Destacados
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5A2B] shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions - Fixed at bottom of modal */}
        <div className="shrink-0 p-4 sm:px-6 border-t border-[#E5E7EB] bg-[#FAFAFA] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-600 text-center sm:text-left">
            Envíos vía MRW / Zoom / Tealca o entregas hoy en Lechería.
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-semibold transition-colors flex-1 sm:flex-none"
            >
              Cerrar
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#8B5A2B] hover:bg-[#6F441F] text-[#FFFFFF] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-sm hover:scale-[1.02] flex-1 sm:flex-none"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Pedir por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
};
