import React, { useState } from 'react';
import { SERVICES, ADD_ONS } from '../../data/services';
import { ChevronDown, ChevronUp, Check, Clock } from 'lucide-react';
import { ServiceItem } from '../../types';

interface PricingViewProps {
  onSelectServiceToBook: (service: ServiceItem) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onSelectServiceToBook }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What distinguishes Japanese builder gel from conventional acrylics or soft gels?',
      a: 'Japanese builder gel is formulated with non-toxic, cosmetic-grade oligomers that cure to an organic semi-flexible state mimicking the natural keratin flex of the nail. It does not require acidic dehydrators or aggressive surface filing, and maintains retention for 4 to 6 weeks without lifting.'
    },
    {
      q: 'What should I know before my first Buccal Sculpting facial?',
      a: 'The Buccal ritual incorporates external myofascial massage followed by internal intra-oral palpation (using sterile medical silicone gloves). It releases deep muscular contractions in the masseter and pterygoid muscles. We advise waiting at least 4 weeks if you have recently received neuromodulators (Botox) or dermal fillers.'
    },
    {
      q: 'How should I care for my Cashmere Featherweight lash extensions?',
      a: 'Because our cashmere fibers are porous and weigh 70% less than synthetic mink, they place zero tensile strain on natural follicles. Avoid steam and saunas for the first 24 hours while our nano-mist bond finalizes. Cleanse daily with oil-free botanical lash foam.'
    },
    {
      q: 'What is your cancellation and rescheduling protocol?',
      a: 'We reserve suites exclusively for one patron at a time. We kindly request at least 24 hours advance notification for cancellations or rescheduling. Adjustments within 24 hours incur a 50% courtesy retention fee.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-20">
      
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#987547] font-medium block">
          Tarifs & Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1E1C1A] tracking-tight">
          Service Menu & Sanctuary Rates
        </h1>
        <p className="text-xs md:text-sm text-[#7A736C] font-light leading-relaxed">
          Transparent, inclusive fees for private suite attendance. No gratuity expected; all bespoke consultations, organic refreshments, and take-home care essentials are included.
        </p>
      </div>

      {/* Structured Category Pricing Lists */}
      <div className="space-y-12">
        {['nails', 'lashes', 'brows', 'skincare', 'makeup', 'packages'].map((catKey) => {
          const categoryServices = SERVICES.filter((s) => s.category === catKey);
          if (categoryServices.length === 0) return null;
          const categoryTitle = categoryServices[0].categoryLabel;

          return (
            <div key={catKey} className="bg-white border border-[#EAE2D8] p-6 md:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D8]">
                <h3 className="font-serif text-2xl text-[#1E1C1A]">{categoryTitle}</h3>
                <span className="text-xs text-[#987547] uppercase tracking-wider font-medium">
                  Private Suite Service
                </span>
              </div>

              <div className="divide-y divide-[#F4EFEB]">
                {categoryServices.map((srv) => (
                  <div
                    key={srv.id}
                    className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-3">
                        <h4 className="font-serif text-lg text-[#1E1C1A] group-hover:text-[#987547] transition-colors">
                          {srv.name}
                        </h4>
                        {srv.signature && (
                          <span className="text-[10px] text-[#987547] font-medium tracking-wider uppercase">
                            · Signature
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#7A736C] font-light leading-relaxed">
                        {srv.tagline}
                      </p>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0">
                      <div className="text-right">
                        <span className="font-serif text-xl font-medium text-[#1E1C1A] block tabular-nums">
                          ${srv.price}
                        </span>
                        <span className="text-[11px] text-[#7A736C] tabular-nums">
                          {srv.duration} mins
                        </span>
                      </div>

                      <button
                        onClick={() => onSelectServiceToBook(srv)}
                        className="px-4 py-2 bg-[#FAF6F0] hover:bg-[#1E1C1A] text-[#1E1C1A] hover:text-white border border-[#D9D0C5] text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sanctuary Memberships */}
      <div className="bg-[#1E1C1A] text-white p-8 md:p-12 border border-[#38332E] space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B89366] font-medium block">
            Société Séraphine
          </span>
          <h3 className="font-serif text-3xl text-[#FAF8F5]">
            Sanctuary Privilege Memberships
          </h3>
          <p className="text-xs text-[#C5BBAE] font-light">
            Guaranteed monthly suite access, priority holiday reservations, and complimentary bespoke homecare formulas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              tier: 'L’Éclat Member',
              fee: '$290 / Month',
              benefits: [
                'One Monthly Japanese Gel Sculpting or Feather Lash Infusion',
                'Complimentary LED Phototherapy add-on per visit',
                '10% Courtesy on all additional rituals',
                'Quarterly bespoke camellia oil formulation'
              ]
            },
            {
              tier: 'La Reine Privilege',
              fee: '$560 / Month',
              popular: true,
              benefits: [
                'Two Monthly Visits (Nails + Cellular Facial or Lashes)',
                'Priority weekend & evening booking guarantees',
                '15% Courtesy on all additional services',
                'Private chauffeur drop-off within 5 miles of Mayfair'
              ]
            },
            {
              tier: 'Le Monolithe Haute VIP',
              fee: '$980 / Month',
              benefits: [
                'Unlimited monthly maintenance sessions',
                'Dedicated suite access with guest privileges',
                'Private Master Director residency appointments',
                'Bespoke luxury seasonal skincare travel wardrobe'
              ]
            }
          ].map((mem, idx) => (
            <div
              key={idx}
              className={`p-6 border flex flex-col justify-between ${
                mem.popular ? 'bg-[#292522] border-[#B89366]' : 'bg-[#201D1A] border-white/10'
              }`}
            >
              <div className="space-y-4">
                <div>
                  {mem.popular && (
                    <span className="text-[10px] uppercase tracking-widest text-[#B89366] font-medium block mb-1">
                      Most Selected
                    </span>
                  )}
                  <h4 className="font-serif text-2xl text-white">{mem.tier}</h4>
                  <span className="font-serif text-lg text-[#B89366] block mt-1">{mem.fee}</span>
                </div>

                <ul className="space-y-2 text-xs text-[#D8CFBF]">
                  {mem.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B89366] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => alert(`Thank you for your interest in ${mem.tier}. Our concierge desk will contact you with admission availability.`)}
                className="mt-6 w-full py-2.5 bg-[#FAF8F5] hover:bg-white text-[#1E1C1A] text-xs uppercase tracking-wider font-medium transition-colors"
              >
                Inquire for Admission
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs uppercase tracking-[0.3em] text-[#987547] font-medium block">
            Protocol Guidance
          </span>
          <h3 className="font-serif text-3xl text-[#1E1C1A]">Frequently Asked Questions</h3>
        </div>

        <div className="divide-y divide-[#EAE2D8] border-y border-[#EAE2D8]">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-serif text-lg text-[#1E1C1A]">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#987547] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#7A736C] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs md:text-sm text-[#5E564F] font-light leading-relaxed pr-6">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
