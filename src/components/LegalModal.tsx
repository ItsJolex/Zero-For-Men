import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, FileText, Lock, Truck } from 'lucide-react';

export type LegalTab = 'terminos' | 'privacidad' | 'garantia';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

export const LegalModal = ({ isOpen, initialTab = 'garantia', onClose }: LegalModalProps) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);
  const [prevInitialTab, setPrevInitialTab] = useState<LegalTab>(initialTab);

  if (initialTab !== prevInitialTab) {
    setPrevInitialTab(initialTab);
    setActiveTab(initialTab);
  }

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[85vh] animate-fadeIn"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E5E7EB] flex items-center justify-between bg-[#FAFAFA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#8B5A2B]/10 border border-[#8B5A2B]/20 flex items-center justify-center text-[#8B5A2B]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 id="legal-modal-title" className="font-serif text-lg font-bold text-[#0A0A0A]">
                Información Legal & Garantías
              </h3>
              <p className="text-xs text-gray-600">Zero For Men • Anzoátegui, Venezuela</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-500 hover:text-[#0A0A0A] hover:bg-[#E5E7EB]/50 transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#E5E7EB] bg-[#FAFAFA]/50 px-5 sm:px-6 gap-2 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('garantia')}
            className={`py-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'garantia'
                ? 'border-[#8B5A2B] text-[#8B5A2B]'
                : 'border-transparent text-gray-600 hover:text-[#0A0A0A]'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Garantías & Envíos</span>
          </button>

          <button
            onClick={() => setActiveTab('terminos')}
            className={`py-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'terminos'
                ? 'border-[#8B5A2B] text-[#8B5A2B]'
                : 'border-transparent text-gray-600 hover:text-[#0A0A0A]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Términos del Servicio</span>
          </button>

          <button
            onClick={() => setActiveTab('privacidad')}
            className={`py-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'privacidad'
                ? 'border-[#8B5A2B] text-[#8B5A2B]'
                : 'border-transparent text-gray-600 hover:text-[#0A0A0A]'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Privacidad de Datos</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
          {activeTab === 'garantia' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-[#0A0A0A] text-sm sm:text-base mb-1">
                  1. Garantía por Defectos de Fabricación (30 Días)
                </h4>
                <p>
                  Cada reloj despachado por Zero For Men es sometido a una inspección previa de hermeticidad y maquinaria. Cubrimos 30 días continuos de garantía contra cualquier defecto de fabricación atribuible al mecanismo interno o movimiento.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0A0A0A] text-sm sm:text-base mb-1">
                  2. Exclusiones de la Garantía
                </h4>
                <p>
                  La garantía no cubre daños por golpes, rotura intencional del cristal, apertura no autorizada del fondo de la caja, sumersión de modelos no aptos para buceo, o desgaste natural de la correa de cuero/malla por uso prolongado.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0A0A0A] text-sm sm:text-base mb-1">
                  3. Política de Envíos y Tiempos de Entrega
                </h4>
                <p>
                  Los despachos nacionales se procesan por agencias aliadas (MRW, Zoom o Tealca). El tiempo estimado de tránsito es de 24 a 48 horas hábiles. Se envía el número de guía inmediatamente luego del depósito en agencia para su seguimiento en línea.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0A0A0A] text-sm sm:text-base mb-1">
                  4. Entregas Personales en Lechería
                </h4>
                <p>
                  Para clientes en la zona norte del estado Anzoátegui (Lechería, Barcelona, Puerto La Cruz), coordinamos entregas personales en puntos comerciales seguros (Plaza Mayor, Centro Lido, Nueva Barcelona).
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terminos' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-[#0A0A0A] text-sm sm:text-base mb-1">
                  1. Canales de Venta y Transacciones
                </h4>
                <p>
                  La presente plataforma web funciona como catálogo interactivo oficial. El cierre de órdenes, verificación de existencias y emisión de recibos se realiza de manera personalizada a través de nuestro canal oficial de WhatsApp (+58 414-1934573).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0A0A0A] text-sm sm:text-base mb-1">
                  2. Precios y Tasas de Cambio
                </h4>
                <p>
                  Los precios exhibidos en dólares (USD) son de carácter referencial. Todo pago en Bolívares se calcula con base en la tasa oficial vigente del Banco Central de Venezuela (BCV) del día de la operación.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0A0A0A] text-sm sm:text-base mb-1">
                  3. Pedidos al Mayor y Emprendedores
                </h4>
                <p>
                  Las órdenes al por mayor aplican a partir de tres (3) unidades combinadas. Cada pieza mayorista incluye su caja protectora y tarjeta de garantía para su comercialización.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'privacidad' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-[#0A0A0A] text-sm sm:text-base mb-1">
                  1. Tratamiento de Datos del Cliente
                </h4>
                <p>
                  Zero For Men solicita únicamente la información estrictamente necesaria para el procesamiento logístico de envíos (nombre, número de cédula, teléfono celular y agencia MRW/Zoom receptora).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0A0A0A] text-sm sm:text-base mb-1">
                  2. Confidencialidad Absoluta
                </h4>
                <p>
                  Bajo ninguna circunstancia comercializamos, alquilamos ni compartimos la información de nuestros clientes con terceras partes o empresas publicitarias. Tus datos quedan archivados únicamente para respaldo de tu garantía y atención de soporte.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#E5E7EB] bg-[#FAFAFA] flex items-center justify-between">
          <span className="text-[11px] text-gray-500">
            Última actualización: Septiembre 2026
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0A0A0A] hover:bg-[#8B5A2B] text-[#FFFFFF] text-xs font-semibold transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
