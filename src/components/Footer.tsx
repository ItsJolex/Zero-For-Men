import { MessageCircle } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

interface FooterProps {
  onOpenLegal?: (tab: 'terminos' | 'privacidad' | 'garantia') => void;
}

export const Footer = ({ onOpenLegal }: FooterProps) => {
  return (
    <footer className="bg-[#FFFFFF] border-t border-[#E5E7EB] pt-16 pb-12 text-gray-600 text-xs relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E5E7EB]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#8B5A2B] flex items-center justify-center text-[#FAFAFA] font-serif font-bold text-sm">
                0
              </div>
              <span className="font-serif text-lg font-bold tracking-wider text-[#0A0A0A]">
                ZERO FOR MEN
              </span>
            </div>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-sm">
              Boutique de relojería de precisión, homenajes de alta gama y accesorios de presencia masculina. Cada pieza se entrega con el Kit Zero completo e inspección técnica previa.
            </p>

            <div className="pt-2 text-gray-600">
              <span className="text-[#8B5A2B] font-semibold">Ubicación:</span> Lechería, Estado Anzoátegui, Venezuela 🇻🇪
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#0A0A0A] uppercase tracking-wider mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#catalogo" className="hover:text-[#8B5A2B] transition-colors">
                  Catálogo Completo
                </a>
              </li>
              <li>
                <a href="#kit-zero" className="hover:text-[#8B5A2B] transition-colors">
                  La Experiencia Kit Zero
                </a>
              </li>
              <li>
                <a href="#mayoristas" className="hover:text-[#8B5A2B] transition-colors">
                  Emprende / Ventas al Mayor
                </a>
              </li>
              <li>
                <a href="#testimonios" className="hover:text-[#8B5A2B] transition-colors">
                  Despachos & Envíos
                </a>
              </li>
              <li>
                <a href="#fundadores" className="hover:text-[#8B5A2B] transition-colors">
                  Nuestra Historia
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#8B5A2B] transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Payment & Logistics Badges */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#0A0A0A] uppercase tracking-wider mb-4">
              Métodos de Pago
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5A2B]" /> Pago Móvil (Tasa Oficial BCV)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5A2B]" /> Zelle (Cuentas verificadas)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5A2B]" /> USDT vía Binance Pay
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5A2B]" /> Transferencias Bancarias en Bs
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5A2B]" /> Efectivo $ (Entregas Lechería)
              </li>
            </ul>
          </div>

          {/* Social Channels & Legal */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#0A0A0A] uppercase tracking-wider mb-4">
              Políticas & Soporte
            </h4>
            <ul className="space-y-2.5 text-gray-700 mb-6">
              <li>
                <button
                  onClick={() => onOpenLegal?.('garantia')}
                  className="hover:text-[#8B5A2B] transition-colors text-left cursor-pointer"
                >
                  Garantías & Envíos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal?.('terminos')}
                  className="hover:text-[#8B5A2B] transition-colors text-left cursor-pointer"
                >
                  Términos del Servicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal?.('privacidad')}
                  className="hover:text-[#8B5A2B] transition-colors text-left cursor-pointer"
                >
                  Política de Privacidad
                </button>
              </li>
            </ul>

            <h4 className="font-serif text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-2">
              Canales Oficiales
            </h4>
            <div className="space-y-2">
              <a
                href="https://instagram.com/zerooformen"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-[#8B5A2B] transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#8B5A2B]" />
                <span>@zerooformen</span>
              </a>

              <a
                href="https://wa.me/584141934573"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-[#8B5A2B] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>+58 414-1934573</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-gray-600 text-[11px]">
          <div>
            © {new Date().getFullYear()} Zero For Men. Todos los derechos reservados. Anzoátegui, Venezuela.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Hecho con pasión por la alta relojería</span>
            <span className="text-gray-500">•</span>
            <span className="text-[#8B5A2B] font-mono">Kit Zero Incluido</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
