import { ShieldCheck, Sparkles, MessageCircle, ArrowRight, Clock, Award, CheckCircle2 } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-8 pb-16 bg-[#FAFAFA]">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5A2B]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#8B5A2B]/40 text-[#8B5A2B] text-xs font-mono tracking-widest uppercase mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Relojería Masculina • Lechería &amp; Envíos a Toda Venezuela</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A0A0A] leading-[1.2] pb-1.5 mb-6">
              El Reloj que <br />
              <span className="brand-gradient-text italic font-serif">Define tu Presencia</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal mb-8">
              Boutique especializada en relojes de hombre en Venezuela. Acabados premium, maquinaria de precisión y modelos en acero inoxidable (Poedagar, Nibosi, Pablo Raez y más). Cada pieza incluye el exclusivo <strong className="text-[#8B5A2B] font-semibold">Kit Zero de Regalo</strong>, entregas personales en Lechería y envíos rápidos a todo el país.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <a
                href="#catalogo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#6F441F] via-[#8B5A2B] to-[#7B4B22] hover:from-[#5C3818] hover:via-[#7A4E24] hover:to-[#6A3F1D] text-[#FAFAFA] font-semibold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl border border-[#A0522D]/40 shadow-[0_10px_25px_-5px_rgba(139,90,43,0.35)] hover:shadow-[0_15px_30px_-5px_rgba(139,90,43,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
              >
                <span>Explorar Colección</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <a
                href="https://wa.me/584141934573?text=Hola%20Zero%20For%20Men,%20quiero%20conocer%20la%20disponibilidad%20de%20los%20relojes%20y%20m%C3%A9todos%20de%20pago"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#FFFFFF] hover:bg-gray-100 text-[#0A0A0A] border border-[#E5E7EB] hover:border-[#8B5A2B]/50 font-semibold text-sm px-7 py-4 rounded-xl transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>Pedir por WhatsApp</span>
              </a>
            </div>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6 border-t border-[#E5E7EB] pt-8">
              <div className="flex items-center gap-3 p-2.5 sm:p-0 rounded-xl bg-[#FFFFFF] sm:bg-transparent border sm:border-0 border-[#E5E7EB]">
                <div className="p-2 rounded-lg bg-[#FAFAFA] sm:bg-[#FFFFFF] border border-[#E5E7EB] text-[#8B5A2B] shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-semibold text-[#0A0A0A]">Kit Zero Gratis</div>
                  <div className="text-[11px] sm:text-xs text-gray-600">Estuche + Ajustador</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 sm:p-0 rounded-xl bg-[#FFFFFF] sm:bg-transparent border sm:border-0 border-[#E5E7EB]">
                <div className="p-2 rounded-lg bg-[#FAFAFA] sm:bg-[#FFFFFF] border border-[#E5E7EB] text-[#8B5A2B] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-semibold text-[#0A0A0A]">Entregas 24/48h</div>
                  <div className="text-[11px] sm:text-xs text-gray-600">MRW Toda Venezuela</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 sm:p-0 rounded-xl bg-[#FFFFFF] sm:bg-transparent border sm:border-0 border-[#E5E7EB]">
                <div className="p-2 rounded-lg bg-[#FAFAFA] sm:bg-[#FFFFFF] border border-[#E5E7EB] text-[#8B5A2B] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-semibold text-[#0A0A0A]">Garantía Real</div>
                  <div className="text-[11px] sm:text-xs text-gray-600">Inspección en Taller</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#8B5A2B]/30 via-transparent to-blue-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000" />

              {/* Main Card */}
              <div className="relative bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-2xl p-3">
                <div className="relative h-[360px] sm:h-[440px] rounded-xl overflow-hidden bg-[#FAFAFA]">
                  <img
                    src="/assets/catalog/poedagar-930-verde.webp"
                    alt="Poedagar 930 Verde Esmeralda en Venezuela"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent opacity-85" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAFA]/90 backdrop-blur-md border border-[#8B5A2B]/50 text-[#8B5A2B] text-xs font-semibold shadow-lg">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Pieza Destacada • Top Bestseller</span>
                  </div>

                  {/* Water Resistance Badge */}
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAFAFA]/90 backdrop-blur-md border border-cyan-500/40 text-cyan-600 text-[11px] font-mono">
                    <span>30M WR</span>
                  </div>

                  {/* Bottom Card Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E5E7EB] shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs uppercase font-mono tracking-wider text-[#8B5A2B] font-semibold">
                        Poedagar 930
                      </span>
                      <span className="text-base font-bold text-[#0A0A0A]">$35</span>
                    </div>
                    <div className="text-sm font-semibold text-[#0A0A0A] mb-2">
                      Verde Esmeralda Ejecutivo
                    </div>
                    <div className="flex flex-wrap gap-2 text-[10px] text-gray-700">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FAFAFA] border border-[#E5E7EB]">
                        <CheckCircle2 className="w-3 h-3 text-[#8B5A2B]" /> Fechero & Día
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FAFAFA] border border-[#E5E7EB]">
                        <CheckCircle2 className="w-3 h-3 text-[#8B5A2B]" /> Acero Inoxidable
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FAFAFA] border border-[#E5E7EB]">
                        <CheckCircle2 className="w-3 h-3 text-[#8B5A2B]" /> Kit Zero Incluido
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
