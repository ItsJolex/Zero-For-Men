import { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, MapPin, Truck, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
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
      {/* Top Announcement Bar */}
      <div className="bg-[#FAFAFA] border-b border-[#E5E7EB] text-xs py-2 px-4 text-[#4B5563] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <span className="inline-flex items-center gap-1.5 text-[#8B5A2B] font-semibold tracking-wider uppercase text-[11px]">
              <Truck className="w-3.5 h-3.5" /> Envíos Nacionales:
            </span>
            <span className="text-gray-700">MRW • Zoom • Tealca a toda Venezuela</span>
          </div>
          <div className="flex items-center gap-3 justify-center text-[11px]">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <MapPin className="w-3.5 h-3.5" /> Entregas hoy en Lechería, Barcelona & PLC
            </span>
            <span className="hidden md:inline text-gray-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-[#8B5A2B]">
              <Sparkles className="w-3 h-3" /> Kit Zero incluido
            </span>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <header
        className={`sticky top-[33px] sm:top-[33px] z-20 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAFAFA]/95 backdrop-blur-md shadow-2xl border-b border-[#E5E7EB]'
            : 'bg-[#FAFAFA]/80 backdrop-blur-sm border-b border-[#E5E7EB]/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#8B5A2B]/60 group-hover:border-[#8B5A2B] transition-all shadow-md group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <img
                src="/assets/linktree_avatar.jpeg"
                alt="Logo Zero For Men"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0A0A0A] group-hover:text-[#8B5A2B] transition-colors">
                ZERO <span className="text-[#8B5A2B] font-light">FOR MEN</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#6B7280] uppercase font-mono">
                Horology & Presence
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#4B5563] hover:text-[#8B5A2B] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#8B5A2B] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/584141934573?text=Hola%20Zero%20For%20Men,%20quisiera%20consultar%20el%20cat%C3%A1logo%20disponible"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8B5A2B] to-[#5C4033] hover:from-[#E5BE3B] hover:to-[#C6A02A] text-[#FAFAFA] font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Pedir por WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#8B5A2B] focus:outline-none"
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAFAFA]/98 border-b border-[#E5E7EB] px-6 py-6 transition-all animate-fadeIn">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-gray-200 hover:text-[#8B5A2B] py-2 border-b border-gray-800/60"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3">
                <a
                  href="https://wa.me/584141934573?text=Hola%20Zero%20For%20Men,%20quisiera%20consultar%20el%20cat%C3%A1logo%20disponible"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#8B5A2B] hover:bg-[#E5BE3B] text-[#FAFAFA] font-semibold text-sm uppercase tracking-wider py-3 rounded-xl transition-all"
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
