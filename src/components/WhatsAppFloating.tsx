import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const WhatsAppFloating = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const quickPrompts = [
    {
      label: '💼 Catálogo al Mayor (desde 3 unidades)',
      text: 'Hola Zero For Men, solicito el catálogo y lista de precios al mayor para revendedores'
    },
    {
      label: '⌚ Consultar disponibilidad de un modelo',
      text: 'Hola Zero For Men, deseo consultar disponibilidad y precio de un reloj'
    },
    {
      label: '📍 Entregas personales en Lechería',
      text: 'Hola Zero For Men, me gustaría coordinar una entrega personal en Lechería / Barcelona'
    }
  ];

  const handleSend = (text: string) => {
    const url = `https://wa.me/584141934573?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-xs sm:max-w-sm sm:w-88 bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FAFAFA] to-[#FFFFFF] p-4 border-b border-[#E5E7EB] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#8B5A2B]">
                <img
                  src="/assets/linktree_avatar.jpeg"
                  alt="Asesor Zero For Men"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-black" />
              </div>
              <div>
                <span className="font-serif text-sm font-bold text-[#0A0A0A] block">
                  Zero For Men
                </span>
                <span className="text-[10px] text-emerald-600 font-mono flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Asesor Activo en WhatsApp
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-500 hover:text-[#0A0A0A] rounded-lg transition-colors cursor-pointer"
              aria-label="Cerrar chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-[#FAFAFA]/50">
            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] text-xs text-gray-700 leading-relaxed">
              👋 ¡Hola! Bienvenido a Zero For Men. ¿En qué podemos ayudarte hoy? Selecciona una opción o escribe directo a nuestro WhatsApp:
            </div>

            <div className="space-y-2">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt.text)}
                  className="w-full text-left p-2.5 rounded-xl bg-[#FFFFFF] hover:bg-gray-50 border border-[#E5E7EB] hover:border-[#8B5A2B]/60 text-xs text-[#0A0A0A] transition-all duration-200 flex items-center justify-between group cursor-pointer shadow-sm"
                >
                  <span className="truncate pr-2 font-medium">{prompt.label}</span>
                  <Send className="w-3.5 h-3.5 text-[#8B5A2B] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Direct Action */}
          <div className="p-3 bg-[#FAFAFA] border-t border-[#E5E7EB] text-center">
            <button
              onClick={() => handleSend('Hola Zero For Men, deseo más información')}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Abrir WhatsApp Directo</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-3.5 sm:p-4 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-[0_4px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-105 flex items-center justify-center cursor-pointer"
        aria-label="Abrir WhatsApp"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
        
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10" />

        {/* Desktop floating tooltip when closed */}
        {!isOpen && (
          <span className="hidden sm:inline-block absolute right-16 whitespace-nowrap bg-[#FFFFFF] text-[#0A0A0A] border border-[#E5E7EB] px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            ¿Dudas o Pedidos? Escríbenos
          </span>
        )}
      </button>
    </div>
  );
};
