import React, { useState } from 'react';
import { GALLERY_LOOKS } from '../../data/gallery';
import { GalleryLook, ServiceCategory } from '../../types';
import { LuxuryArtFrame } from '../common/LuxuryArtFrame';
import { X, Clock, Sparkles } from 'lucide-react';

interface LookbookViewProps {
  onOpenBooking: () => void;
}

export const LookbookView: React.FC<LookbookViewProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [activeModalLook, setActiveModalLook] = useState<GalleryLook | null>(null);
  const [showBeforeState, setShowBeforeState] = useState(false);

  const categories = [
    { id: 'all', label: 'All Portfolio' },
    { id: 'nails', label: 'Couture Nails' },
    { id: 'lashes', label: 'Lashes' },
    { id: 'brows', label: 'Brows' },
    { id: 'skincare', label: 'Skincare' },
    { id: 'makeup', label: 'Makeup' },
  ];

  const filteredLooks = activeCategory === 'all'
    ? GALLERY_LOOKS
    : GALLERY_LOOKS.filter((l) => l.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-16">
      
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#987547] font-medium block">
          Archives De Beauté
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1E1C1A] tracking-tight">
          The Atelier Lookbook
        </h1>
        <p className="text-xs md:text-sm text-[#7A736C] font-light leading-relaxed">
          A visual record of quiet transformations crafted across our Mayfair and Parisian suites. Explore precision nail apexes, featherlight lash maps, and buccal facial releases.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center overflow-x-auto pb-2">
        <div className="inline-flex p-1 bg-[#EFE9DF] border border-[#E0D7C9]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as ServiceCategory)}
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

      {/* Masonry-Style Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLooks.map((look) => (
          <div
            key={look.id}
            onClick={() => {
              setActiveModalLook(look);
              setShowBeforeState(false);
            }}
            className="group cursor-pointer bg-white border border-[#EAE2D8] hover:border-[#B89366] transition-all flex flex-col justify-between shadow-sm overflow-hidden"
          >
            <div>
              <div className="relative">
                <LuxuryArtFrame
                  type={look.category as any}
                  aspectRatio="4:3"
                  className="group-hover:scale-[1.02] transition-transform duration-700"
                />
                {look.isBeforeAfter && (
                  <span className="absolute top-4 right-4 bg-[#1E1C1A]/85 text-white text-[10px] uppercase tracking-widest px-2.5 py-1">
                    Before / After Study
                  </span>
                )}
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#7A736C]">
                  <span className="uppercase tracking-wider text-[#987547] font-medium">
                    {look.artisan}
                  </span>
                  <span className="tabular-nums">{look.timeRequired}</span>
                </div>

                <h3 className="font-serif text-xl text-[#1E1C1A] group-hover:text-[#987547] transition-colors leading-snug">
                  {look.title}
                </h3>

                <p className="text-xs text-[#7A736C] font-light line-clamp-2 leading-relaxed">
                  {look.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-[#F4EFEB] mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#7A736C] uppercase tracking-wider">Palette:</span>
                <div className="flex gap-1">
                  {look.palette.map((color, i) => (
                    <span
                      key={i}
                      className="w-3 h-3 rounded-full border border-black/10 inline-block"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <span className="text-xs text-[#1E1C1A] group-hover:text-[#987547] font-medium uppercase tracking-wider transition-colors">
                View Dossier →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {activeModalLook && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] border border-[#EAE2D8] max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveModalLook(null)}
              className="absolute top-4 right-4 p-2 text-[#7A736C] hover:text-[#1E1C1A]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-[#987547] font-medium">
                Artisan Dossier · {activeModalLook.artisan}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#1E1C1A]">
                {activeModalLook.title}
              </h3>
            </div>

            {/* Before/After Toggle if applicable */}
            {activeModalLook.isBeforeAfter && (
              <div className="flex gap-2 p-1 bg-[#EFE9DF] border border-[#E0D7C9] w-fit">
                <button
                  type="button"
                  onClick={() => setShowBeforeState(false)}
                  className={`px-3 py-1 text-xs font-medium uppercase tracking-wider ${
                    !showBeforeState ? 'bg-[#1E1C1A] text-white' : 'text-[#5E564F]'
                  }`}
                >
                  Completed Result
                </button>
                <button
                  type="button"
                  onClick={() => setShowBeforeState(true)}
                  className={`px-3 py-1 text-xs font-medium uppercase tracking-wider ${
                    showBeforeState ? 'bg-[#1E1C1A] text-white' : 'text-[#5E564F]'
                  }`}
                >
                  Initial State (Pre-Ritual)
                </button>
              </div>
            )}

            <div className="relative">
              <LuxuryArtFrame
                type={activeModalLook.category as any}
                title={showBeforeState ? 'Pre-Treatment Assessment' : activeModalLook.title}
                subtitle={showBeforeState ? activeModalLook.beforeNotes : activeModalLook.technique}
                aspectRatio="16:9"
              />
            </div>

            {showBeforeState ? (
              <div className="p-4 bg-white border border-[#EAE2D8] text-xs space-y-1">
                <strong className="text-[#1E1C1A] block">Initial Clinical State:</strong>
                <p className="text-[#7A736C] leading-relaxed">{activeModalLook.beforeNotes}</p>
              </div>
            ) : (
              <div className="p-4 bg-white border border-[#EAE2D8] text-xs space-y-2">
                <div>
                  <strong className="text-[#1E1C1A] block">Execution Technique:</strong>
                  <p className="text-[#7A736C] leading-relaxed">{activeModalLook.technique}</p>
                </div>
                {activeModalLook.afterNotes && (
                  <div>
                    <strong className="text-[#1E1C1A] block">Resulting Architecture:</strong>
                    <p className="text-[#7A736C] leading-relaxed">{activeModalLook.afterNotes}</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between items-center pt-2 border-t border-[#EAE2D8]">
              <span className="text-xs text-[#7A736C]">Duration: {activeModalLook.timeRequired}</span>
              <button
                onClick={() => {
                  setActiveModalLook(null);
                  onOpenBooking();
                }}
                className="px-6 py-2.5 bg-[#1E1C1A] hover:bg-[#34302C] text-white text-xs uppercase tracking-wider font-medium transition-colors"
              >
                Reserve This Look
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
