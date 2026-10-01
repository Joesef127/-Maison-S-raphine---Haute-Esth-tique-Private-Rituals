import React from 'react';
import { Sparkles, ArrowRight, Volume2, ShieldCheck, Clock, Award, Star } from 'lucide-react';
import { SERVICES } from '../../data/services';
import { TESTIMONIALS } from '../../data/testimonials';
import { ServiceItem } from '../../types';
import { LuxuryArtFrame } from '../common/LuxuryArtFrame';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  onSelectServiceToBook: (service: ServiceItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectServiceToBook
}) => {
  // Highlighted signature services for homepage
  const signatureServices = SERVICES.filter((s) => s.signature).slice(0, 4);

  return (
    <div className="space-y-24 md:space-y-32 pb-20">

      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.3em] text-[#987547] font-medium block">
                Haute Esthétique & Private Rituals
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1E1C1A] tracking-tight leading-[1.08] text-balance">
                The Art of Quiet Radiance.
              </h1>
            </div>

            <p className="text-sm md:text-base text-[#5E564F] leading-relaxed max-w-lg font-light">
              Maison Séraphine is a private sanctuary where modern biological science converges with couture craftsmanship. Specializing in anatomical Japanese gel nail architecture, weightless cashmere lashes, intra-oral buccal sculpting, and camera-calibrated complexion artistry.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => onSelectServiceToBook(SERVICES[0])}
                className="px-8 py-4 bg-[#1E1C1A] hover:bg-[#34302C] text-white text-xs uppercase tracking-widest font-medium transition-all shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Reserve Sanctuary</span>
                <ArrowRight className="w-4 h-4 text-[#B89366]" />
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="px-8 py-4 bg-transparent hover:bg-[#FAF6F0] text-[#1E1C1A] border border-[#D9D0C5] text-xs uppercase tracking-widest font-medium transition-all flex items-center justify-center whitespace-nowrap"
              >
                <span>Explore The Rituals</span>
              </button>
            </div>

            {/* Adjacent Trust Metric Proof (Claim-to-Proof Adjacency) */}
            <div className="pt-6 border-t border-[#EAE2D8] flex items-center gap-8 text-xs text-[#7A736C]">
              <div>
                <span className="font-serif text-xl text-[#1E1C1A] font-semibold block tabular-nums">
                  18+
                </span>
                <span>Years Master Heritage</span>
              </div>
              <div className="w-[1px] h-8 bg-[#EAE2D8]" />
              <div>
                <span className="font-serif text-xl text-[#1E1C1A] font-semibold block tabular-nums">
                  100%
                </span>
                <span>Waterless Precision Protocols</span>
              </div>
              <div className="w-[1px] h-8 bg-[#EAE2D8]" />
              <div>
                <span className="font-serif text-xl text-[#1E1C1A] font-semibold block tabular-nums">
                  4.98 / 5
                </span>
                <span>Mayfair Patron Rating</span>
              </div>
            </div>
          </div>

          {/* Right Visual Focal Anchor */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              <LuxuryArtFrame
                type="atelier"
                title="The Mayfair Sanctuary"
                subtitle="Travertine marble arches, private acoustic suites, and sterile hardware protocols"
                aspectRatio="4:3"
                badge="Private Suite 01"
                className="shadow-lg"
              />

              {/* Floating aesthetic feature card */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 bg-white p-5 border border-[#EAE2D8] shadow-md max-w-xs space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#987547] font-medium block">
                  Artisan Method
                </span>
                <p className="font-serif text-base text-[#1E1C1A]">
                  Japanese Builder Gel & Russian Hardware Cuticle Curation
                </p>
                <span className="text-[11px] text-[#7A736C]">Zero aggressive filing · 4+ weeks retention</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BRAND MANIFESTO & PHILOSOPHY */}
      <section className="bg-[#F4EFEB] py-20 px-6 border-y border-[#EAE2D8]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#987547] font-medium block">
            Our Manifesto
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1C1A] tracking-tight leading-tight text-balance">
            “Beauty is not a disguise layered over the face; it is an architectural clarity waiting to be unveiled.”
          </h2>
          <p className="text-sm text-[#5E564F] max-w-2xl mx-auto leading-relaxed font-light">
            In an era of rushed appointments and cookie-cutter trends, Maison Séraphine rejects synthetic excess. We treat the human face and hands with anatomical reverence—preserving the barrier of your skin, the health of your natural nail matrix, and the weightless movement of your lashes.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('about')}
              className="text-xs uppercase tracking-widest text-[#1E1C1A] hover:text-[#987547] font-medium border-b border-[#1E1C1A] pb-1 transition-colors"
            >
              Read The Full Philosophy & Heritage
            </button>
          </div>
        </div>
      </section>

      {/* SIGNATURE RITUALS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EAE2D8] pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#987547] font-medium block">
              Curated Menu
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1E1C1A] tracking-tight">
              Signature Atelier Offerings
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs uppercase tracking-widest text-[#1E1C1A] hover:text-[#987547] font-medium flex items-center gap-1.5 transition-colors"
          >
            <span>View Complete Service Dossier</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B89366]" />
          </button>
        </div>

        {/* 4 Featured Signature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white border border-[#EAE2D8] hover:border-[#B89366] transition-all flex flex-col justify-between group"
            >
              <div>
                <LuxuryArtFrame
                  type={srv.artStyle}
                  aspectRatio="4:3"
                  className="border-b border-[#EAE2D8]"
                />
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#7A736C]">
                    <span className="uppercase tracking-wider text-[#987547] font-medium">
                      {srv.categoryLabel}
                    </span>
                    <span className="tabular-nums">{srv.duration} mins</span>
                  </div>

                  <h3 className="font-serif text-xl text-[#1E1C1A] group-hover:text-[#987547] transition-colors leading-snug">
                    {srv.name}
                  </h3>

                  <p className="text-xs text-[#7A736C] line-clamp-2 font-light leading-relaxed">
                    {srv.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#F4EFEB] mt-4 flex items-center justify-between">
                <span className="font-serif text-xl text-[#1E1C1A] tabular-nums">
                  ${srv.price}
                </span>
                <button
                  onClick={() => onSelectServiceToBook(srv)}
                  className="text-xs uppercase tracking-wider font-medium text-[#1E1C1A] hover:text-[#987547] transition-colors"
                >
                  Reserve →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI AESTHETIC DIAGNOSTIC CALLOUT */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#1E1C1A] text-white p-8 md:p-14 border border-[#38332E] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-[#B89366] font-medium flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Consultation Technology</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] tracking-tight text-balance">
                Discover Your Harmonized Ritual with AI Aesthetic Understanding
              </h2>
              <p className="text-sm text-[#D8CFBF] max-w-xl font-light leading-relaxed">
                Upload a portrait selfie or nail reference. Our multimodal diagnostic engine, powered by Gemini 3.1 Pro, examines skin undertones, facial bone structure, and nail apex geometry to formulate an individualized treatment plan.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => onNavigate('consultation')}
                className="px-6 py-3.5 bg-[#B89366] hover:bg-[#987547] text-white text-xs uppercase tracking-widest font-medium transition-colors text-center whitespace-nowrap"
              >
                Launch Aesthetic Scanner
              </button>
              <button
                onClick={() => onNavigate('consultation')}
                className="px-6 py-3.5 border border-white/20 hover:border-white text-[#FAF8F5] text-xs uppercase tracking-widest font-medium transition-colors text-center whitespace-nowrap"
              >
                Converse with Concierge
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIAL JOURNALS */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#987547] font-medium block">
            Patron Praise
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1E1C1A] tracking-tight">
            Journals of Quiet Radiance
          </h2>
          <p className="text-xs text-[#7A736C]">
            Verified experiences from our Mayfair and Parisian sanctuaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#EAE2D8] p-8 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex gap-1 text-[#987547]">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="font-serif text-lg text-[#1E1C1A] leading-relaxed italic">
                  “{item.quote}”
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[#F4EFEB] space-y-1">
                <div className="font-medium text-xs text-[#1E1C1A]">{item.clientName}</div>
                <div className="text-[11px] text-[#7A736C]">{item.city}</div>
                <div className="text-[10px] text-[#987547]">{item.serviceName}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ATELIER SANCTUARY DETAILS & APPOINTMENT CALL */}
      <section className="bg-[#FAF6F0] border-t border-[#EAE2D8] py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#987547] font-medium block">
              Private Attendance
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-[#1E1C1A]">
              Reserve Your Private Suite
            </h3>
            <p className="text-sm text-[#7A736C] font-light leading-relaxed max-w-md">
              We welcome patrons strictly by prior appointment to safeguard acoustic tranquility and individualized focus. Valet assistance and organic tisane reception included with every reservation.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectServiceToBook(SERVICES[0])}
                className="px-8 py-3.5 bg-[#1E1C1A] hover:bg-[#34302C] text-white text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Schedule Sanctuary Visit
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-8 border border-[#EAE2D8]">
            <div className="space-y-2">
              <h4 className="font-serif text-lg text-[#1E1C1A]">Mayfair, London</h4>
              <p className="text-xs text-[#7A736C] leading-relaxed">
                42 Berkeley Square, London W1J 5AW<br />
                Tues – Sun · 09:30 – 19:30
              </p>
              <span className="text-[11px] text-[#987547] block pt-1">
                +44 (0)20 7946 0882
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-lg text-[#1E1C1A]">Paris 8ème</h4>
              <p className="text-xs text-[#7A736C] leading-relaxed">
                14 Rue de la Paix, 75002 Paris<br />
                Mon – Sat · 10:00 – 20:00
              </p>
              <span className="text-[11px] text-[#987547] block pt-1">
                +33 1 42 68 55 00
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
