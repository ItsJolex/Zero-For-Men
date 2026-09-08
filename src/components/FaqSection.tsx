import { useState } from 'react';
import { FAQS } from '../data/products';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#FAFAFA] border-t border-[#E5E7EB] relative overflow-hidden scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#8B5A2B]/40 text-[#8B5A2B] text-xs font-mono tracking-widest uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Transparencia Total</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0A] tracking-tight mb-4">
            Preguntas <span className="brand-gradient-text italic font-serif">Frecuentes</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Resolvemos tus dudas sobre medios de pago en Venezuela, tiempos de despacho, garantías y el ajuste de tu brazalete.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#FFFFFF] border-[#8B5A2B]/60 shadow-[0_4px_20px_rgba(212,175,55,0.08)]'
                    : 'bg-[#FFFFFF]/40 border-[#E5E7EB] hover:border-gray-700'
                }`}
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#0A0A0A]">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-full border transition-transform duration-300 shrink-0 ${
                      isOpen
                        ? 'bg-[#8B5A2B] text-[#FAFAFA] border-[#8B5A2B] rotate-180'
                        : 'bg-[#FAFAFA] text-gray-600 border-[#E5E7EB]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-gray-700 leading-relaxed border-t border-[#E5E7EB]/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-semibold text-[#0A0A0A]">¿Tienes alguna pregunta específica?</h4>
            <p className="text-xs text-gray-600">Atendemos directamente en WhatsApp con fotos y videos al instante.</p>
          </div>
          <a
            href="https://wa.me/584141934573?text=Hola%20Zero%20For%20Men,%20tengo%20una%20pregunta%20sobre%20un%20reloj"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-[#8B5A2B] hover:bg-[#E5BE3B] text-[#FAFAFA] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
