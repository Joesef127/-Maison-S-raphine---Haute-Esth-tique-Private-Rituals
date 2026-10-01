import React from 'react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-[#181615] text-[#D8CFBF] border-t border-[#292522]">
      {/* Editorial Newsletter & Private Society */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 border-b border-[#292522]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B89366] font-medium">
              The Maison Journal
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-[#FAF8F5] tracking-tight">
              Quiet Radiance & Seasonal Private Releases
            </h3>
            <p className="text-sm text-[#998E82] max-w-lg leading-relaxed font-light">
              Receive private invitations to guest aesthetician residencies, seasonal nail art editions, and cellular dermatology monographs.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to the Maison Séraphine Journal.');
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                placeholder="Enter your personal email"
                className="bg-[#24211E] border border-[#3D3732] px-4 py-3 text-sm text-[#FAF8F5] placeholder-[#736B63] focus:outline-none focus:border-[#B89366] flex-1"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#B89366] hover:bg-[#987547] text-white text-xs uppercase tracking-widest font-medium transition-colors whitespace-nowrap"
              >
                Request Access
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm font-light">
        {/* Brand identity column */}
        <div className="space-y-4">
          <span className="font-serif text-2xl tracking-tight text-[#FAF8F5] block">
            Maison Séraphine
          </span>
          <p className="text-xs text-[#998E82] leading-relaxed">
            Haute Esthétique sanctuary committed to structural beauty, biological cell renewal, and bespoke Japanese nail & cashmere lash architecture.
          </p>
          <div className="text-xs text-[#B89366]">
            London · Paris
          </div>
        </div>

        {/* Rituals column */}
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#FAF8F5] font-medium">
            Rituals & Artistry
          </div>
          <ul className="space-y-2 text-xs text-[#998E82]">
            <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Japanese Gel Sculpting</button></li>
            <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Cashmere Featherweight Lashes</button></li>
            <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">French Buccal Sculpting</button></li>
            <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Architectural Brow Stain</button></li>
            <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Red Carpet Glow Artistry</button></li>
            <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">The Grand Soirée Suite</button></li>
          </ul>
        </div>

        {/* Sanctuaries column */}
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#FAF8F5] font-medium">
            Atelier Locations
          </div>
          <div className="space-y-3 text-xs text-[#998E82]">
            <div>
              <strong className="text-[#FAF8F5] block font-normal">Mayfair Sanctuary</strong>
              <span>42 Berkeley Square, London W1J 5AW</span>
              <span className="block text-[#736B63] mt-0.5">Tues – Sun · 09:30 – 19:30</span>
            </div>
            <div>
              <strong className="text-[#FAF8F5] block font-normal">Parisian Atelier</strong>
              <span>14 Rue de la Paix, 75002 Paris</span>
              <span className="block text-[#736B63] mt-0.5">Mon – Sat · 10:00 – 20:00</span>
            </div>
          </div>
        </div>

        {/* Legal & Concierge */}
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#FAF8F5] font-medium">
            Direct Concierge
          </div>
          <div className="space-y-2 text-xs text-[#998E82]">
            <p>Private Line: +44 (0)20 7946 0882</p>
            <p>Direct Inquiries: concierge@maisonseraphine.com</p>
            <button
              onClick={onOpenBooking}
              className="mt-2 inline-block px-4 py-2 border border-[#B89366] text-[#B89366] hover:bg-[#B89366] hover:text-white transition-colors uppercase tracking-wider text-[11px]"
            >
              Reserve an Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-[#24211E] flex flex-col sm:flex-row items-center justify-between text-xs text-[#736B63]">
        <p>© 2026 Maison Séraphine Haute Esthétique Ltd. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <span>Discretion & Privacy Protocol</span>
          <span>·</span>
          <span>Terms of Sanctuary</span>
        </div>
      </div>
    </footer>
  );
};
