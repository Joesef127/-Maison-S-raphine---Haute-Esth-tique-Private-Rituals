import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sanctuary, setSanctuary] = useState('Mayfair, London');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-16">
      
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#987547] font-medium block">
          Concierge & Sanctuaires
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1E1C1A] tracking-tight">
          Connect With Our Concierge
        </h1>
        <p className="text-xs md:text-sm text-[#7A736C] font-light leading-relaxed">
          For private bridal parties, VIP suite buyouts, and press inquiries, our direct concierge team is available to assist you in London and Paris.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border border-[#EAE2D8] p-8 space-y-6 shadow-sm">
          <div className="space-y-1 pb-4 border-b border-[#EAE2D8]">
            <h3 className="font-serif text-2xl text-[#1E1C1A]">Direct Inquiry</h3>
            <p className="text-xs text-[#7A736C]">Replies are dispatched within 4 operational hours.</p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#987547] mx-auto" />
              <h4 className="font-serif text-2xl text-[#1E1C1A]">Inquiry Received</h4>
              <p className="text-xs text-[#7A736C] max-w-sm mx-auto leading-relaxed">
                Thank you, {name}. Our Head Concierge has received your missive and will respond directly to {email}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 border border-[#D9D0C5] text-xs uppercase tracking-wider text-[#1E1C1A]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#1E1C1A] block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Madame / Monsieur"
                    className="w-full p-3 bg-[#FAF8F5] border border-[#D9D0C5] text-xs text-[#1E1C1A] focus:outline-none focus:border-[#B89366]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#1E1C1A] block">
                    Personal Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@domain.com"
                    className="w-full p-3 bg-[#FAF8F5] border border-[#D9D0C5] text-xs text-[#1E1C1A] focus:outline-none focus:border-[#B89366]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#1E1C1A] block">
                    Contact Telephone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 ..."
                    className="w-full p-3 bg-[#FAF8F5] border border-[#D9D0C5] text-xs text-[#1E1C1A] focus:outline-none focus:border-[#B89366]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#1E1C1A] block">
                    Sanctuary of Choice
                  </label>
                  <select
                    value={sanctuary}
                    onChange={(e) => setSanctuary(e.target.value)}
                    className="w-full p-3 bg-[#FAF8F5] border border-[#D9D0C5] text-xs text-[#1E1C1A] focus:outline-none focus:border-[#B89366]"
                  >
                    <option value="Mayfair, London">Mayfair Sanctuary (Berkeley Sq)</option>
                    <option value="Rue de la Paix, Paris">Paris Atelier (Rue de la Paix)</option>
                    <option value="Private Home Care">Private Suite / Residence Protocol</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#1E1C1A] block">
                  Your Inquiries, Ritual Requests or Preferences <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Inquire regarding bespoke bridal rehearsals, corporate events, or specific treatment consultations..."
                  className="w-full p-3 bg-[#FAF8F5] border border-[#D9D0C5] text-xs text-[#1E1C1A] focus:outline-none focus:border-[#B89366]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1E1C1A] hover:bg-[#34302C] text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-[#B89366]" />
                <span>Transmit To Concierge</span>
              </button>
            </form>
          )}
        </div>

        {/* Location & Hours Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF6F0] border border-[#EAE2D8] p-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#987547] font-medium block">
              Flagship Sanctuary
            </span>
            <h4 className="font-serif text-2xl text-[#1E1C1A]">Mayfair, London</h4>
            
            <div className="space-y-2 text-xs text-[#524B45]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#987547] shrink-0 mt-0.5" />
                <span>42 Berkeley Square, Mayfair, London W1J 5AW</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#987547] shrink-0" />
                <span>+44 (0)20 7946 0882</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#987547] shrink-0" />
                <span>mayfair@maisonseraphine.com</span>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#987547] shrink-0 mt-0.5" />
                <span>Tuesday – Sunday · 09:30 – 19:30 (Mondays reserved for private buyout)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E0D7C9] text-[11px] text-[#7A736C]">
              Valet parking available via Berkeley Square court entrance.
            </div>
          </div>

          <div className="bg-[#FAF6F0] border border-[#EAE2D8] p-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#987547] font-medium block">
              Parisian Atelier
            </span>
            <h4 className="font-serif text-2xl text-[#1E1C1A]">Place Vendôme / Paix</h4>
            
            <div className="space-y-2 text-xs text-[#524B45]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#987547] shrink-0 mt-0.5" />
                <span>14 Rue de la Paix, 75002 Paris</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#987547] shrink-0" />
                <span>+33 1 42 68 55 00</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#987547] shrink-0" />
                <span>paris@maisonseraphine.com</span>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#987547] shrink-0 mt-0.5" />
                <span>Monday – Saturday · 10:00 – 20:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
