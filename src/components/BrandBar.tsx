import { BRANDS } from '../data/products';

export const BrandBar = () => {
  return (
    <section className="py-8 bg-[#FAFAFA] border-y border-[#E5E7EB]/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 text-center sm:text-left">
          <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#8B5A2B]">
            Marcas & Fabricantes Seleccionados
          </span>
          <span className="text-xs text-gray-600">
            Piezas originales con garantía oficial e inspección directa en taller
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 items-stretch">
          {BRANDS.map((b) => (
            <div
              key={b.name}
              className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#8B5A2B]/50 transition-all duration-300 group text-center flex flex-col items-center justify-center hover:-translate-y-1 shadow-sm hover:shadow-[0_4px_20px_rgba(212,175,55,0.1)] last:col-span-2 sm:last:col-span-1"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-serif text-lg font-bold text-[#0A0A0A] group-hover:text-[#8B5A2B] transition-colors tracking-wide">
                  {b.name}
                </span>
              </div>
              <span className="text-[11px] text-gray-600 font-sans">{b.subtitle}</span>
              <span className="mt-2 inline-block text-[9px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#FAFAFA] border border-gray-700/60 text-[#8B5A2B]">
                {b.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
