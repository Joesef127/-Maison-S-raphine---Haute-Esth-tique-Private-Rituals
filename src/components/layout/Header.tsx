import React, { useState } from 'react';
import { Sparkles, Menu, X, Volume2, Calendar, Compass } from 'lucide-react';

interface HeaderProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Atelier' },
    { id: 'services', label: 'Services' },
    { id: 'lookbook', label: 'Lookbook' },
    { id: 'consultation', label: 'AI Diagnostic' },
    { id: 'pricing', label: 'Menu & Rates' },
    { id: 'about', label: 'Philosophy' },
    { id: 'contact', label: 'Sanctuary' },
  ];

  return (
    <>
      {/* Editorial Announcement Banner */}
      <div className="bg-[#1E1C1A] text-[#E8DFD3] text-xs py-2 px-4 text-center tracking-widest uppercase font-light border-b border-[#2C2926]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span>Haute Esthétique Sanctuaries in Mayfair & Paris 8ème</span>
          <span aria-hidden="true" className="text-[#B89366]">·</span>
          <span className="hidden sm:inline text-[#C5A880]">Private Suites Available</span>
        </div>
      </div>

      {/* Main Strict Top Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE2D8] transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => onNavigate('home')}
            className="text-left group focus:outline-none"
          >
            <span className="font-serif text-2xl md:text-3xl tracking-tight text-[#1E1C1A] group-hover:text-[#987547] transition-colors">
              Maison Séraphine
            </span>
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#524B45]">
            {navLinks.map((link) => {
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap focus:outline-none ${
                    isActive
                      ? 'text-[#1E1C1A] font-semibold'
                      : 'hover:text-[#1E1C1A]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#987547]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('consultation')}
              className="hidden sm:flex items-center gap-1.5 text-xs tracking-wider uppercase font-medium text-[#7A736C] hover:text-[#1E1C1A] transition-colors py-2 px-3"
              title="Open AI Aesthetic Consultation Suite"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B89366]" />
              <span>Consultation</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white bg-[#1E1C1A] hover:bg-[#34302C] transition-all rounded-none border border-[#1E1C1A] shadow-sm whitespace-nowrap"
            >
              Reserve Sanctuary
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1E1C1A] hover:text-[#987547] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[113px] bottom-0 z-50 bg-[#FAF8F5] border-t border-[#EAE2D8] p-6 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#7A736C] pb-2 border-b border-[#EAE2D8]">
              Sanctuary Navigation
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-3 font-serif text-2xl ${
                  activeView === link.id ? 'text-[#987547] font-medium' : 'text-[#1E1C1A]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-[#EAE2D8] space-y-3">
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3.5 text-xs font-medium uppercase tracking-wider text-white bg-[#1E1C1A] text-center"
            >
              Reserve Sanctuary
            </button>
            <p className="text-center text-xs text-[#7A736C]">
              Mayfair: 42 Berkeley Sq · Paris: 14 Rue de la Paix
            </p>
          </div>
        </div>
      )}
    </>
  );
};
