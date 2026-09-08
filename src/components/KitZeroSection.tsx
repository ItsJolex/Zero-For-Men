import { useState } from 'react';
import { KIT_ITEMS } from '../data/products';
import { Package, ShieldCheck, Wrench, Sparkles, BatteryCharging, Check, ArrowRight } from 'lucide-react';

export const KitZeroSection = () => {
  const [activeItem, setActiveItem] = useState<number>(0);

  const icons = [
    Package,
    ShieldCheck,
    Wrench,
    Sparkles,
    BatteryCharging,
  ];

  return (
    <section id="kit-zero" className="py-24 bg-[#FAFAFA] border-t border-[#E5E7EB] relative overflow-hidden scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#8B5A2B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#8B5A2B]/40 text-[#8B5A2B] text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unboxing de Alta Gama</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0A] tracking-tight mb-4">
            La Experiencia <span className="brand-gradient-text italic font-serif">Kit Zero</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Otras tiendas te entregan un reloj en una bolsa plástica sin protección. En Zero For Men, cada pedido incluye un set integral de herramientas y empaque para que disfrutes de tu pieza desde el primer minuto.
          </p>
        </div>

        {/* Interactive Grid & Visual Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Interactive Kit Feature Selector */}
          <div className="lg:col-span-6 space-y-3">
            {KIT_ITEMS.map((item, index) => {
              const IconComponent = icons[index];
              const isSelected = activeItem === index;

              return (
                <div
                  key={item.title}
                  onClick={() => setActiveItem(index)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFFFFF] border-[#8B5A2B] shadow-[0_4px_25px_rgba(212,175,55,0.15)] -translate-x-1'
                      : 'bg-[#FFFFFF]/40 border-[#E5E7EB] hover:border-gray-700 hover:bg-[#FFFFFF]/70'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2.5 rounded-xl border transition-colors shrink-0 ${
                        isSelected
                          ? 'bg-[#8B5A2B] text-[#FAFAFA] border-[#8B5A2B]'
                          : 'bg-[#FAFAFA] text-[#8B5A2B] border-[#E5E7EB]'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`font-serif text-base sm:text-lg font-bold transition-colors ${
                            isSelected ? 'text-[#0A0A0A]' : 'text-gray-700'
                          }`}
                        >
                          {item.title}
                        </h3>
                        {isSelected && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#8B5A2B] uppercase bg-[#FAFAFA] px-2 py-0.5 rounded-full border border-[#8B5A2B]/30">
                            <Check className="w-3 h-3" /> Incluido
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#E5E7EB] bg-[#FFFFFF] shadow-2xl p-4 sm:p-6">
              
              {/* Image Collage / Main Visual */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#FAFAFA] mb-6">
                <img
                  src="/assets/feed/01_coleccion_al_mayor.jpg"
                  alt="Colección Kit Zero con estuche y accesorios"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent opacity-70" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#FAFAFA]/90 backdrop-blur-md border border-[#E5E7EB]">
                  <div className="text-xs font-mono text-[#8B5A2B] uppercase tracking-wider mb-1">
                    Cero Gastos Adicionales
                  </div>
                  <div className="text-sm font-semibold text-[#0A0A0A]">
                    Ajusta tu correa en casa sin necesidad de ir a un relojero
                  </div>
                </div>
              </div>

              {/* Value Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]">
                  <span className="block text-base font-bold text-[#8B5A2B]">100%</span>
                  <span className="text-[11px] text-gray-600">Protección Rígida</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]">
                  <span className="block text-base font-bold text-[#8B5A2B]">2 min</span>
                  <span className="text-[11px] text-gray-600">Ajuste de Correa</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]">
                  <span className="block text-base font-bold text-[#8B5A2B]">+2 Años</span>
                  <span className="text-[11px] text-gray-600">Pila de Repuesto</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]">
                  <span className="block text-base font-bold text-[#8B5A2B]">Garantía</span>
                  <span className="text-[11px] text-gray-600">Oficial Zero</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 text-center">
                <a
                  href="https://wa.me/584141934573?text=Hola%20Zero%20For%20Men,%20quisiera%20pedir%20un%20reloj%20con%20el%20Kit%20Zero%20completo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#8B5A2B] hover:bg-[#E5BE3B] text-[#FAFAFA] font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md"
                >
                  <span>Pedir Reloj con Kit Zero Incluido</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
