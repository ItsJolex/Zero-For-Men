import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isWholesale,
  } = useCart();

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  const buildWhatsAppMessage = () => {
    const lines = ['Hola Zero For Men, deseo confirmar este pedido:'];
    items.forEach((item, i) => {
      const price = item.product.price;
      lines.push(`${i + 1}. ${item.product.name} (x${item.quantity}) - ${price}`);
    });
    lines.push('---------------------------------');
    lines.push(
      `Total (${totalItems} producto${totalItems > 1 ? 's' : ''}): $${totalPrice.toFixed(2)} USD`
    );
    if (isWholesale) {
      lines.push('¡Califico para precio mayorista!');
    }
    lines.push('Método de entrega preferido: [Lechería / MRW]');
    return encodeURIComponent(lines.join('\n'));
  };

  const whatsappUrl = `https://wa.me/584141934573?text=${buildWhatsAppMessage()}`;

  const drawerContent = (
    <div className="fixed inset-0 z-[110] flex">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={closeDrawer}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#FFFFFF] shadow-2xl flex flex-col animate-slideInRight">
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB] bg-[#FAFAFA]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#8B5A2B]" />
            <h2 className="font-serif text-lg font-bold text-[#0A0A0A]">Tu Carrito</h2>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#8B5A2B] text-[#FAFAFA] text-xs font-bold">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="p-2 rounded-lg text-gray-500 hover:text-[#0A0A0A] hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isWholesale && (
          <div className="shrink-0 mx-5 mt-4 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-300 flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs text-amber-800 font-medium">
              ¡Felicidades! Calificas para <span className="font-bold">precio mayorista</span> con 5+ unidades.
            </p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-sm mb-2">Tu carrito está vacío</p>
              <p className="text-gray-400 text-xs">Explora nuestro catálogo y añade tus relojes favoritos.</p>
              <button
                onClick={closeDrawer}
                className="mt-6 px-5 py-2.5 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] text-gray-700 text-xs font-semibold hover:border-[#8B5A2B] transition-colors cursor-pointer"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F3F4F6] shrink-0 border border-[#E5E7EB]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-[#0A0A0A] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-[#8B5A2B] font-mono">{item.product.brand}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-lg border border-[#E5E7EB] flex items-center justify-center text-gray-600 hover:border-[#8B5A2B] hover:text-[#8B5A2B] transition-colors cursor-pointer"
                          aria-label="Reducir cantidad"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-[#0A0A0A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-lg border border-[#E5E7EB] flex items-center justify-center text-gray-600 hover:border-[#8B5A2B] hover:text-[#8B5A2B] transition-colors cursor-pointer"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#0A0A0A]">
                        ${(parseFloat(item.product.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="shrink-0 border-t border-[#E5E7EB] bg-[#FAFAFA] p-5 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-gray-600 font-medium">Total</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#0A0A0A]">
                  ${totalPrice.toFixed(2)}
                </span>
                <span className="block text-[10px] text-gray-500 font-mono mt-0.5">USD</span>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#8B5A2B] hover:bg-[#6F441F] text-[#FFFFFF] font-bold text-sm uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md hover:scale-[1.02]"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Finalizar Pedido por WhatsApp</span>
            </a>

            <button
              onClick={clearCart}
              className="w-full text-center text-xs text-gray-500 hover:text-red-500 transition-colors cursor-pointer py-1"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(drawerContent, document.body)
    : null;
};
