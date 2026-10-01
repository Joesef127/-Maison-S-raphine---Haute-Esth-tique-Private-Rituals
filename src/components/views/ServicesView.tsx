import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  Clock, 
  CheckCircle2, 
  Info, 
  ChevronRight, 
  ArrowRight,
  Loader2,
  X
} from 'lucide-react';
import { ServiceItem, ServiceCategory } from '../../types';
import { SERVICES, ADD_ONS } from '../../data/services';
import { LuxuryArtFrame } from '../common/LuxuryArtFrame';

interface ServicesViewProps {
  onSelectServiceToBook: (service: ServiceItem) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onSelectServiceToBook }) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [isLoadingAudioId, setIsLoadingAudioId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'nails', label: 'Couture Nails' },
    { id: 'lashes', label: 'Bespoke Lashes' },
    { id: 'brows', label: 'Sculpted Brows' },
    { id: 'skincare', label: 'Cellular Skincare' },
    { id: 'makeup', label: 'Occasion Artistry' },
    { id: 'packages', label: 'Signature Suites' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === selectedCategory);

  // Play TTS audio guide for service
  const handlePlayServiceAudio = async (srv: ServiceItem) => {
    if (playingAudioId === srv.id) {
      setPlayingAudioId(null);
      return;
    }

    setIsLoadingAudioId(srv.id);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: srv.audioGuideScript,
          speaker: 'Concierge',
          style: 'Poised, serene, luxury aesthetician'
        })
      });

      const data = await res.json();
      if (!res.ok || !data.audioBase64) {
        throw new Error(data.error || 'Failed to generate audio overview.');
      }

      const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
      audio.onended = () => setPlayingAudioId(null);
      audio.onerror = () => setPlayingAudioId(null);
      await audio.play();
      setPlayingAudioId(srv.id);
    } catch (err: any) {
      console.error(err);
      alert('Audio guide could not be played: ' + err.message);
    } finally {
      setIsLoadingAudioId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#987547] font-medium block">
          Menu Des Rituels
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1E1C1A] tracking-tight">
          Haute Esthétique Services
        </h1>
        <p className="text-xs md:text-sm text-[#7A736C] font-light leading-relaxed">
          Every ritual at Maison Séraphine is executed with medical-grade sterility, organic active compounds, and tailored anatomical engineering.
        </p>
      </div>

      {/* Category Tabs (Segmented Button Controls, Clean Typography) */}
      <div className="flex justify-center overflow-x-auto pb-2">
        <div className="inline-flex p-1 bg-[#EFE9DF] border border-[#E0D7C9]">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ServiceCategory)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1E1C1A] text-white shadow-sm'
                    : 'text-[#5E564F] hover:text-[#1E1C1A]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((srv) => (
          <div
            key={srv.id}
            className="bg-white border border-[#EAE2D8] hover:border-[#B89366] transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              {/* Art Frame */}
              <LuxuryArtFrame
                type={srv.artStyle}
                title={srv.name}
                aspectRatio="4:3"
                className="border-b border-[#EAE2D8]"
              />

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-[#7A736C] pb-2 border-b border-[#F4EFEB]">
                  <span className="uppercase tracking-wider text-[#987547] font-medium">
                    {srv.categoryLabel}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 tabular-nums">
                      <Clock className="w-3 h-3 text-[#987547]" />
                      {srv.duration} mins
                    </span>
                    <span className="font-serif text-base font-semibold text-[#1E1C1A] tabular-nums">
                      ${srv.price}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-xl text-[#1E1C1A] leading-snug">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-[#7A736C] font-light leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                {/* Inclusions summary */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#1E1C1A] font-medium block">
                    What is Included:
                  </span>
                  <ul className="space-y-1 text-[11px] text-[#524B45]">
                    {srv.included.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#987547] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="p-6 pt-0 border-t border-[#F4EFEB] mt-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePlayServiceAudio(srv)}
                  className="p-2 border border-[#D9CEBF] hover:border-[#1E1C1A] text-[#1E1C1A] hover:bg-[#FAF6F0] transition-colors"
                  title="Listen to audio overview with Gemini TTS"
                >
                  {isLoadingAudioId === srv.id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#987547]" />
                  ) : (
                    <Volume2 className={`w-3.5 h-3.5 ${playingAudioId === srv.id ? 'text-[#987547]' : ''}`} />
                  )}
                </button>

                <button
                  onClick={() => setActiveModalService(srv)}
                  className="text-xs text-[#7A736C] hover:text-[#1E1C1A] underline underline-offset-4 transition-colors"
                >
                  Protocol Details
                </button>
              </div>

              <button
                onClick={() => onSelectServiceToBook(srv)}
                className="px-4 py-2 bg-[#1E1C1A] hover:bg-[#34302C] text-white text-xs uppercase tracking-wider font-medium transition-colors"
              >
                Reserve Ritual
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SERVICE DETAILS MODAL (Preparation & Aftercare) */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] border border-[#EAE2D8] max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 p-2 text-[#7A736C] hover:text-[#1E1C1A]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-[#987547] font-medium">
                {activeModalService.categoryLabel}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#1E1C1A]">
                {activeModalService.name}
              </h3>
              <div className="flex gap-4 text-xs text-[#7A736C] pt-1">
                <span>Duration: {activeModalService.duration} Minutes</span>
                <span>·</span>
                <span>Fee: ${activeModalService.price}</span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-[#524B45] leading-relaxed font-light">
              {activeModalService.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#1E1C1A] font-medium block">
                Complete Ceremony Inclusions:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#524B45]">
                {activeModalService.included.map((inc, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#987547] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 border border-[#EAE2D8] text-xs">
              <div className="space-y-1">
                <strong className="text-[#1E1C1A] block">Arrival Preparation:</strong>
                <p className="text-[#7A736C] font-light leading-relaxed">{activeModalService.preparation}</p>
              </div>
              <div className="space-y-1">
                <strong className="text-[#1E1C1A] block">Aftercare & Longevity:</strong>
                <p className="text-[#7A736C] font-light leading-relaxed">{activeModalService.aftercare}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => handlePlayServiceAudio(activeModalService)}
                className="flex items-center gap-1.5 text-xs text-[#987547] hover:underline"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Audio Guide</span>
              </button>

              <button
                onClick={() => {
                  const s = activeModalService;
                  setActiveModalService(null);
                  onSelectServiceToBook(s);
                }}
                className="px-6 py-2.5 bg-[#1E1C1A] hover:bg-[#34302C] text-white text-xs uppercase tracking-wider font-medium transition-colors"
              >
                Proceed to Reservation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
