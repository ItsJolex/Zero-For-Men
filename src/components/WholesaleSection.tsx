import { TrendingUp, PackageCheck, Image, Users, MessageCircle, ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const WholesaleSection = () => {
  const wholesalePerks = [
    {
      title: 'Mínimo de Solo 3 Unidades',
      description: 'No requieres miles de dólares para empezar. Puedes comenzar tu negocio o surtir tu tienda combinando marcas y modelos desde 3 piezas.',
      icon: TrendingUp
    },
    {
      title: 'Kits de Empaque Incluidos',
      description: 'Cada reloj que compres al mayor incluye su estuche rígido, ajustador de eslabones y tarjeta de garantía, maximizando el valor percibido por tus clientes.',
      icon: PackageCheck
    },
    {
      title: 'Material Gráfico Publicitario HD',
      description: 'Te entregamos fotos y videos de alta calidad creados por nosotros listos para que subas a tus historias de Instagram, WhatsApp y TikTok.',
      icon: Image
    },
    {
      title: 'Asesoría Directa de Venta',
      description: 'Te orientamos directamente sobre cuáles son los modelos de más rápida rotación y mayor rentabilidad según tu ciudad o nicho de mercado.',
      icon: Users
    }
  ];

  return (
    <section id="mayoristas" className="py-24 bg-[#FAFAFA] border-t border-[#E5E7EB] relative overflow-hidden scroll-mt-20">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8B5A2B]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#8B5A2B]/40 text-[#8B5A2B] text-xs font-mono tracking-widest uppercase mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Oportunidad de Negocio B2B</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0A] tracking-tight mb-4">
            Emprende con Zero: <span className="brand-gradient-text italic font-serif">Ventas al Mayor</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            La relojería de alta gama es uno de los rubros con mayor margen comercial en Venezuela. Únete a nuestra red de revendedores autorizados en Caracas, Valencia, Maracaibo, Barquisimeto y el Oriente del país.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {wholesalePerks.map((perk) => {
            const IconComp = perk.icon;
            return (
              <div
                key={perk.title}
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#8B5A2B]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] text-[#8B5A2B] w-fit mb-4 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#0A0A0A] mb-2 group-hover:text-[#8B5A2B] transition-colors">
                    {perk.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {perk.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center text-[11px] text-gray-600 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5A2B] mr-1.5" />
                  <span>Beneficio Garantizado</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Wholesale Box Offer */}
        <div className="rounded-3xl bg-gradient-to-br from-[#FFFFFF] via-[#161B23] to-[#FAFAFA] border border-[#8B5A2B]/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest text-[#8B5A2B] mb-2">
                <ShieldCheck className="w-4 h-4" /> Stock 100% Disponible en Anzoátegui
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-4">
                Solicita Hoy Nuestro Catálogo Mayorista y Lista de Precios
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-6 max-w-2xl">
                Te enviamos por WhatsApp el PDF interactivo con el stock en tiempo real, descuentos por volumen (3, 6, 12 y 24 piezas) y el calculador de margen sugerido para tu zona.
              </p>

              <div className="flex flex-wrap gap-4 text-xs text-gray-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Despacho en 24h a cualquier agencia MRW
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Pagos en Bs (BCV), Zelle y USDT
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Garantía de cambio por defectos
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <a
                href="https://wa.me/584141934573?text=Hola%20Zero%20For%20Men,%20solicito%20el%20cat%C3%A1logo%20y%20lista%20de%20precios%20al%20mayor%20para%20revendedores"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#8B5A2B] via-[#E5BE3B] to-[#C6A02A] hover:scale-105 text-[#FAFAFA] font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)] w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Pedir Catálogo Mayorista</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <span className="block text-[11px] text-gray-600 mt-2">
                Respuesta en menos de 15 minutos en horario comercial
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
