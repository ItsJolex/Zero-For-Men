import { Truck, PackageCheck, Gift, ShieldCheck } from 'lucide-react';

export const SocialProof = () => {
  const features = [
    {
      icon: PackageCheck,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      title: 'Despachos Diarios Protegidos',
      description: 'Cada pedido se prepara con triple protección y precinto de seguridad. Número de guía MRW, Zoom o Tealca enviado al instante para rastreo en tiempo real.',
      badge: 'MRW • Zoom • Tealca',
    },
    {
      icon: Gift,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      title: 'Cómplices de Fechas Especiales',
      description: 'Coordinamos entregas sorpresa en cualquier rincón de Venezuela. Regalos de aniversario, cumpleaños o logros con notas personalizadas y empaque premium.',
      badge: 'Regalos Especiales',
    },
    {
      icon: ShieldCheck,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      title: 'Garantía Real & Soporte',
      description: 'Inspección técnica previa a cada envío. Garantía contra defectos de fábrica y soporte post-venta directo por WhatsApp para cualquier consulta.',
      badge: 'Inspección + Garantía',
    },
  ];

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
            Compromiso Real & <span className="brand-gradient-text italic font-serif">Entregas Seguras</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            De Venezuela para toda Venezuela. Cumplimos cada promesa de entrega con embalaje de grado logístico para que recibas tu reloj en impecable estado.
          </p>
        </div>

        {/* Feature Cards with Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-500"
            >
              <div className={`p-8 h-64 flex flex-col items-center justify-center ${feature.bgColor} ${feature.borderColor} border-t-0 relative`}>
                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#FAFAFA]/90 text-[10px] font-mono font-semibold ${feature.color} border ${feature.borderColor}`}>
                  {feature.badge}
                </div>
                <feature.icon className={`w-16 h-16 ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-500`} />
              </div>
              <div className="p-6">
                <h4 className="font-serif text-base font-bold text-[#0A0A0A] mb-2">
                  {feature.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
