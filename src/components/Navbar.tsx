import { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, MapPin, Truck, Sparkles, ChevronRight } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Colección', href: '#catalogo' },
    { name: 'Kit Zero', href: '#kit-zero' },
    { name: 'Ventas al Mayor', href: '#mayoristas' },
    { name: 'Reseñas & Envíos', href: '#testimonios' },
    { name: 'Historia', href: '#fundadores' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      {/* Top Announcement Bar - Sleek on mobile, comprehensive on desktop */}
      <div className="relative z-30 bg-[#FAFAFA] border-b border-[#E5E7EB] text-xs py-1.5 px-3 sm:py-2 sm:px-4 text-[#4B5563]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Mobile view: concise single line */}
          <div className="flex sm:hidden items-center justify-center w-full gap-2 text-[11px] font-medium truncate">
            <span className="inline-flex items-center gap-1 text-[#8B5A2B] font-semibold">
              <Truck className="w-3 h-3" /> Envíos Gratis MRW
            </span>
            <span className="text-gray-400">•</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 truncate">
              <MapPin className="w-3 h-3 shrink-0" /> Entregas en Lechería
            </span>
          </div>

          {/* Desktop view */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[#8B5A2B] font-semibold tracking-wider uppercase text-[11px]">
              <Truck className="w-3.5 h-3.5" /> Envíos Nacionales:
            </span>
            <span className="text-gray-700 font-medium">MRW • Zoom • Tealca a toda Venezuela</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
              <MapPin className="w-3.5 h-3.5" /> Entregas hoy en Lechería, Barcelona & PLC
            </span>
            <span className="text-gray-300">|</span>
            <span className="inline-flex items-center gap-1 text-[#8B5A2B] font-medium">
              <Sparkles className="w-3 h-3" /> Kit Zero incluido
            </span>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <header
        className={`sticky top-0 z-20 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFFFF]/95 backdrop-blur-md shadow-md border-b border-[#E5E7EB]'
            : 'bg-[#FAFAFA]/90 backdrop-blur-sm border-b border-[#E5E7EB]/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#8B5A2B]/60 group-hover:border-[#8B5A2B] transition-all shadow-sm group-hover:shadow-[0_0_15px_rgba(139,90,43,0.3)] shrink-0">
              <img
                src="/assets/linktree_avatar.jpeg"
                alt="Logo Zero For Men"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-xl font-bold tracking-tight text-[#0A0A0A] leading-none group-hover:text-[#8B5A2B] transition-colors">
                ZERO <span className="font-light text-gray-700">FOR MEN</span>
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#8B5A2B] font-mono mt-0.5 sm:mt-1">
                Horology & Presence
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-wider text-gray-700 hover:text-[#8B5A2B] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTA (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/584141934573?text=Hola%20Zero%20For%20Men,%20quisiera%20consultar%20el%20cat%C3%A1logo%20disponible"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8B5A2B] to-[#5C4033] hover:from-[#6F441F] hover:to-[#4A2E1B] text-[#FAFAFA] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Pedir por WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-800 hover:text-[#8B5A2B] focus:outline-none cursor-pointer rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={mobileMenuOpen ? 'Cerrar Menú' : 'Abrir Menú'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer - High Contrast and Auto-Close */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FFFFFF] border-b border-[#E5E7EB] px-5 py-5 transition-all animate-fadeIn shadow-2xl">
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-[#0A0A0A] hover:text-[#8B5A2B] py-3.5 border-b border-[#E5E7EB] transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </a>
              ))}
              <div className="pt-4 pb-2">
                <a
                  href="https://wa.me/584141934573?text=Hola%20Zero%20For%20Men,%20quisiera%20consultar%20el%20cat%C3%A1logo%20disponible"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#8B5A2B] hover:bg-[#6F441F] text-[#FFFFFF] font-bold text-sm uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Contactar Asesor por WhatsApp</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
