import { Heart, MessageCircle } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

export const FoundersStory = () => {
  return (
    <section id="fundadores" className="py-24 bg-[#FAFAFA] border-t border-[#E5E7EB] relative overflow-hidden scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#8B5A2B]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Photo Column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#8B5A2B]/40 to-blue-500/20 rounded-3xl blur-lg opacity-60" />
              
              <div className="relative rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#FFFFFF] p-3 shadow-2xl">
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#FAFAFA]">
                  <img
                    src="/assets/feed/02_reloj_lecheria.jpg"
                    alt="Jota Rodríguez y Valeria Vallera, fundadores de Zero For Men en Anzoátegui"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent opacity-80" />
                  
                  {/* Photo details overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E5E7EB] shadow-md">
                    <div className="text-xs uppercase font-mono text-[#8B5A2B] tracking-widest mb-0.5 font-semibold">
                      Fundadores de Zero For Men
                    </div>
                    <div className="text-base font-bold text-[#0A0A0A]">
                      Jota Rodríguez & Valeria Vallera
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Emprendimiento nacido en el estado Anzoátegui para toda Venezuela 🇻🇪
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story & Manifesto Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#8B5A2B]/40 text-[#8B5A2B] text-xs font-mono tracking-widest uppercase mb-6">
              <Heart className="w-3.5 h-3.5" />
              <span>Nuestra Historia & Propósito</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0A] tracking-tight mb-6">
              Detrás de Cada Reloj, Hay <span className="brand-gradient-text italic font-serif">Pulsaciones Reales</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
              <p>
                Zero For Men nació de una necesidad clara: en Venezuela resultaba sumamente difícil encontrar relojería de estatus y presencia que equilibrara <strong className="text-[#0A0A0A]">precisión mecánica, materiales nobles y un precio justo</strong>, sin descuidar la experiencia del cliente.
              </p>

              <p>
                Muchas tiendas convencionales despachaban relojes frágiles en bolsas plásticas sin manuales, sin baterías de respaldo ni herramientas para graduar el brazalete. Nosotros decidimos cambiar las reglas.
              </p>

              <p>
                Diseñamos la <strong className="text-[#8B5A2B]">Experiencia Kit Zero</strong>: cada pieza que sale de nuestro taller en Anzoátegui va protegida en estuche rígido, probada en hermeticidad, con ajustador de eslabones y su certificado de garantía por escrito.
              </p>

              <p className="text-gray-600 text-sm">
                Hoy no solo vestimos muñecas con elegancia en Lechería, Caracas, Valencia o San Cristóbal; también impulsamos a decenas de jóvenes y familias a emprender su propio negocio con ventas al mayor.
              </p>
            </div>

            {/* Founders Social Connect */}
            <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-wrap items-center gap-4">
              <a
                href="https://instagram.com/zerooformen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#8B5A2B] text-xs font-semibold text-gray-700 hover:text-[#0A0A0A] transition-all shadow-sm"
              >
                <InstagramIcon className="w-4 h-4 text-[#8B5A2B]" />
                <span>@zerooformen (Instagram)</span>
              </a>

              <a
                href="https://wa.me/584141934573?text=Hola%20Jota%20y%20Valeria,%20me%20encant%C3%B3%20su%20historia%20en%20la%20tienda%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5A2B] to-[#5C4033] text-[#FAFAFA] text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Conversar con Nosotros</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
