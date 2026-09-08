import { REVIEWS } from '../data/products';
import { Star, MapPin, Truck, CheckCircle2, Heart } from 'lucide-react';

export const SocialProof = () => {
  return (
    <section id="testimonios" className="py-24 bg-[#FAFAFA] border-t border-[#E5E7EB] relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#8B5A2B]/40 text-[#8B5A2B] text-xs font-mono tracking-widest uppercase mb-4">
            <Truck className="w-3.5 h-3.5" />
            <span>Confianza & Cumplimiento</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0A] tracking-tight mb-4">
            Despachos Diarios & <span className="brand-gradient-text italic font-serif">Historias Reales</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            De Lechería para toda Venezuela. Cumplimos cada promesa de entrega embalando con triple protección para que recibas tu reloj en impecable estado.
          </p>
        </div>

        {/* Real Visual Proof Collage */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: MRW Dispatch Photo */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xl group">
            <div className="relative h-64 overflow-hidden bg-[#FAFAFA]">
              <img
                src="/assets/feed/06_despacho_envios.jpg"
                alt="Despachos de pedidos en MRW Nueva Barcelona para toda Venezuela"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent opacity-80" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FAFAFA]/90 text-[10px] font-mono text-emerald-400 border border-emerald-500/40">
                MRW • Zoom • Tealca
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-1">
                Despachos Diarios Protegidos
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Fotografía real en agencia de envíos. Cada paquete viaja con precinto de seguridad, plástico de burbuja reforzado y número de guía enviado al instante.
              </p>
            </div>
          </div>

          {/* Card 2: Surprise Flower Detail in Apure */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xl group">
            <div className="relative h-64 overflow-hidden bg-[#FAFAFA]">
              <img
                src="/assets/feed/04_detalle_ramo_poedagar930.jpg"
                alt="Detalle especial para novia en Apure con reloj Poedagar 930 y flores"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent opacity-80" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FAFAFA]/90 text-[10px] font-mono text-rose-400 border border-rose-500/40 flex items-center gap-1">
                <Heart className="w-3 h-3 fill-current" /> Historia en Apure
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-1">
                Cómplices de Fechas Especiales
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Coordinamos entregas sorpresa en cualquier rincón del país. Desde ramos con relojes camuflados hasta regalos de aniversario con notas personalizadas.
              </p>
            </div>
          </div>

          {/* Card 3: Personal Hand Delivery in Lechería */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xl group">
            <div className="relative h-64 overflow-hidden bg-[#FAFAFA]">
              <img
                src="/assets/feed/02_reloj_lecheria.jpg"
                alt="Entrega personal en Lechería y zona norte de Anzoátegui"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent opacity-80" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FAFAFA]/90 text-[10px] font-mono text-cyan-400 border border-cyan-500/40 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Entregas en Lechería
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-1">
                Entregas Personales Hoy Mismo
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Si te encuentras en Lechería, Barcelona o Puerto La Cruz, coordinamos tu entrega en puntos seguros como Plaza Mayor, Centro Lido o Nueva Barcelona.
              </p>
            </div>
          </div>

        </div>

        {/* Customer Testimonial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] flex flex-col justify-between hover:border-[#8B5A2B]/40 transition-colors shadow-sm"
            >
              <div>
                {/* 5-Stars rating */}
                <div className="flex items-center gap-1 mb-3 text-[#8B5A2B]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 italic mb-4 leading-relaxed">
                  "{review.text}"
                </p>
              </div>

              <div className="border-t border-[#E5E7EB] pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0A0A0A]">{review.author}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> Verificado
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-gray-600 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  <span>{review.city}</span>
                </div>
                <div className="text-[10px] text-[#8B5A2B] font-mono mt-1">
                  {review.product}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
