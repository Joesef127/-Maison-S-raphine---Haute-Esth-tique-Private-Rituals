import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/views/HomeView';
import { ServicesView } from './components/views/ServicesView';
import { LookbookView } from './components/views/LookbookView';
import { AboutView } from './components/views/AboutView';
import { PricingView } from './components/views/PricingView';
import { ContactView } from './components/views/ContactView';
import { ConsultationSuite } from './components/consultation/ConsultationSuite';
import { BookingModal } from './components/booking/BookingModal';
import { ServiceItem } from './types';
import { Sparkles, Calendar, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<string>('home');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedServiceToBook, setSelectedServiceToBook] = useState<ServiceItem | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (view: string) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (service?: ServiceItem) => {
    if (service) {
      setSelectedServiceToBook(service);
    } else {
      setSelectedServiceToBook(null);
    }
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1C1A]">
      {/* Top Header */}
      <Header
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectServiceToBook={handleOpenBooking}
          />
        )}
        {activeView === 'services' && (
          <ServicesView onSelectServiceToBook={handleOpenBooking} />
        )}
        {activeView === 'lookbook' && (
          <LookbookView onOpenBooking={() => handleOpenBooking()} />
        )}
        {activeView === 'consultation' && (
          <ConsultationSuite onSelectServiceToBook={handleOpenBooking} />
        )}
        {activeView === 'pricing' && (
          <PricingView onSelectServiceToBook={handleOpenBooking} />
        )}
        {activeView === 'about' && (
          <AboutView onOpenBooking={() => handleOpenBooking()} />
        )}
        {activeView === 'contact' && <ContactView />}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Booking Modal Flow */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedService={selectedServiceToBook}
      />

      {/* Discrete Floating Concierge & Scroll Buttons */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3 pointer-events-none">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="pointer-events-auto p-2.5 bg-[#FAF8F5] border border-[#D9D0C5] text-[#1E1C1A] hover:bg-[#1E1C1A] hover:text-white transition-all shadow-md focus:outline-none"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {activeView !== 'consultation' && (
          <button
            onClick={() => handleNavigate('consultation')}
            className="pointer-events-auto px-4 py-2.5 bg-[#1E1C1A] hover:bg-[#34302C] text-white border border-[#292522] shadow-xl text-xs uppercase tracking-wider font-medium flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B89366]" />
            <span>AI Diagnostic</span>
          </button>
        )}
      </div>
    </div>
  );
}
