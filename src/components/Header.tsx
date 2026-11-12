import React, { useState, useEffect } from 'react';
import { CONFIG } from '../config';
import { Menu, X, Phone, Calendar, Sparkles } from 'lucide-react';

interface HeaderProps {
  onBookNowClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookNowClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Bridal Studio', href: '#bridal' },
    { name: 'Transformations', href: '#gallery' },
    { name: 'Artists', href: '#team' },
    { name: 'Client Words', href: '#reviews' },
    { name: 'Privileges', href: '#offers' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F6F1E7]/95 backdrop-blur-md shadow-sm border-b border-[#E8DCC8]'
          : 'bg-[#F6F1E7]/80 backdrop-blur-xs border-b border-[#E8DCC8]/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5F7155] rounded-lg p-1"
            aria-label={`${CONFIG.businessName} - Home`}
          >
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-2xl sm:text-3xl tracking-tight text-[#2B2B28] group-hover:text-[#5F7155] transition-colors">
                {CONFIG.businessName.split(' ')[0]}
              </span>
              <span className="font-serif italic text-2xl sm:text-3xl text-[#B89B5E]">
                {CONFIG.businessName.split(' ').slice(1).join(' ')}
              </span>
            </div>
            <span className="text-[10px] tracking-[0.25em] text-[#5F7155] uppercase font-medium">
              Varanasi • Sigra
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#2B2B28]/80 hover:text-[#5F7155] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#8A9A7B] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2B2B28] hover:text-[#5F7155] px-3 py-2 rounded-full border border-[#E8DCC8] hover:border-[#8A9A7B] transition-all min-h-[44px]"
              aria-label={`Call salon at ${CONFIG.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#5F7155]" />
              <span className="hidden md:inline">{CONFIG.phone}</span>
              <span className="md:hidden">Call</span>
            </a>

            <button
              onClick={onBookNowClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#8A9A7B] text-[#F6F1E7] text-sm font-medium hover:bg-[#5F7155] shadow-xs hover:shadow-md transition-all transform active:scale-95 min-h-[44px] cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onBookNowClick}
              className="px-4 py-2 rounded-full bg-[#8A9A7B] text-[#F6F1E7] text-xs font-medium hover:bg-[#5F7155] min-h-[44px] inline-flex items-center"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border border-[#E8DCC8] text-[#2B2B28] hover:bg-[#E8DCC8]/40 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#2B2B28]/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#F6F1E7] shadow-2xl p-6 flex flex-col justify-between border-l border-[#E8DCC8]"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8DCC8]">
                <div>
                  <h3 className="font-serif text-xl text-[#2B2B28]">{CONFIG.businessName}</h3>
                  <p className="text-xs text-[#5F7155] font-medium">{CONFIG.area}</p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-[#E8DCC8]/50 text-[#2B2B28] min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col space-y-3" aria-label="Mobile Navigation">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.href)}
                    className="text-left py-2.5 px-3 rounded-lg text-base font-medium text-[#2B2B28] hover:bg-[#E8DCC8]/40 hover:text-[#5F7155] transition-all min-h-[44px] flex items-center"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E8DCC8] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookNowClick();
                }}
                className="w-full py-3 rounded-full bg-[#8A9A7B] text-[#F6F1E7] text-sm font-medium hover:bg-[#5F7155] flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
              <a
                href={`tel:${CONFIG.phoneRaw}`}
                className="w-full py-2.5 rounded-full border border-[#E8DCC8] text-[#2B2B28] text-xs font-medium flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Phone className="w-3.5 h-3.5 text-[#5F7155]" />
                <span>Call {CONFIG.phone}</span>
              </a>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#5F7155] pt-2">
                <Sparkles className="w-3 h-3 text-[#B89B5E]" />
                <span>Sigra, Varanasi • Ladies Exclusive</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
