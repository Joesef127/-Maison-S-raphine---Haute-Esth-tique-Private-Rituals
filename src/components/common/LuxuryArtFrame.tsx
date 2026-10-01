import React from 'react';

interface LuxuryArtFrameProps {
  type: 'nails' | 'lashes' | 'brows' | 'skincare' | 'makeup' | 'package' | 'atelier' | 'founder' | 'ambiance';
  title?: string;
  subtitle?: string;
  aspectRatio?: '16:9' | '4:3' | '3:4' | '1:1';
  className?: string;
  badge?: string;
}

export const LuxuryArtFrame: React.FC<LuxuryArtFrameProps> = ({
  type,
  title,
  subtitle,
  aspectRatio = '4:3',
  className = '',
  badge
}) => {
  const aspectClass = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '3:4': 'aspect-[3/4]',
    '1:1': 'aspect-square',
  }[aspectRatio];

  return (
    <div
      className={`relative overflow-hidden bg-[#FAF6F0] border border-[#EAE2D8]/80 select-none group transition-all duration-700 ${aspectClass} ${className}`}
      role="img"
      aria-label={title || 'Maison Séraphine Haute Esthétique visual'}
    >
      {/* Background subtle noise and gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F2] via-[#F4ECE1] to-[#EAE0D2] opacity-90" />

      {/* Domain-specific SVG Illustration */}
      {type === 'nails' && (
        <svg
          className="absolute inset-0 w-full h-full text-[#B89366]/40 transition-transform duration-1000 group-hover:scale-105"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="150" r="110" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
          <circle cx="200" cy="150" r="85" stroke="#C5A880" strokeWidth="1" opacity="0.6" />
          {/* Stylized elegant hand silhouette & sculpted nails */}
          <path
            d="M130 250 C140 190, 160 140, 190 100 C194 94, 202 94, 206 100 C212 110, 218 135, 222 170 C226 210, 230 250, 232 260"
            stroke="#635951"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          {/* Precision almond nail tip apex */}
          <path
            d="M192 98 C194 80, 204 80, 206 98 Z"
            fill="url(#goldLuster)"
            stroke="#B89366"
            strokeWidth="1"
          />
          {/* Secondary fingers */}
          <path
            d="M165 240 C170 180, 178 125, 184 110 C186 104, 192 104, 194 110"
            stroke="#8C7F74"
            strokeWidth="1"
            opacity="0.7"
          />
          <path
            d="M216 112 C222 118, 235 150, 245 220"
            stroke="#8C7F74"
            strokeWidth="1"
            opacity="0.7"
          />
          {/* Subtle gold foil particle accents */}
          <circle cx="198" cy="88" r="1.5" fill="#B89366" />
          <circle cx="202" cy="92" r="1.2" fill="#D4AF37" />
          <circle cx="160" cy="130" r="1" fill="#C5A880" />
          <circle cx="240" cy="160" r="1.5" fill="#B89366" />
          <defs>
            <linearGradient id="goldLuster" x1="190" y1="80" x2="210" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F5E4C3" />
              <stop offset="0.5" stopColor="#D4B07B" />
              <stop offset="1" stopColor="#A67C47" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {type === 'lashes' && (
        <svg
          className="absolute inset-0 w-full h-full text-[#B89366]/40 transition-transform duration-1000 group-hover:scale-105"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Curvilinear orbital eyelid arc */}
          <path
            d="M90 160 C140 100, 260 100, 310 160"
            stroke="#4A413A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M100 162 C150 120, 250 120, 300 162"
            stroke="#B89366"
            strokeWidth="0.75"
            opacity="0.5"
          />
          {/* Individual featherlight cashmere lash fans */}
          <path d="M120 152 Q125 105 138 90" stroke="#2B2623" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M135 145 Q144 95 160 82" stroke="#2B2623" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M150 138 Q162 88 182 76" stroke="#2B2623" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M170 132 Q185 80 205 72" stroke="#2B2623" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M190 128 Q208 78 230 72" stroke="#2B2623" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M210 127 Q232 78 255 75" stroke="#2B2623" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M230 130 Q255 82 280 82" stroke="#2B2623" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M250 136 Q278 92 305 92" stroke="#2B2623" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M270 144 Q298 108 318 112" stroke="#2B2623" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M285 152 Q312 124 326 130" stroke="#2B2623" strokeWidth="1" strokeLinecap="round" />

          {/* Wispy wet-look secondary spikes */}
          <path d="M165 135 Q178 75 195 65" stroke="#B89366" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
          <path d="M225 130 Q245 72 268 62" stroke="#B89366" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
          
          <circle cx="200" cy="150" r="120" stroke="#E2D4C3" strokeWidth="0.5" strokeDasharray="3 6" />
        </svg>
      )}

      {type === 'brows' && (
        <svg
          className="absolute inset-0 w-full h-full text-[#B89366]/40 transition-transform duration-1000 group-hover:scale-105"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Golden ratio architectural lines */}
          <line x1="100" y1="210" x2="300" y2="210" stroke="#C5A880" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="240" y1="70" x2="240" y2="230" stroke="#C5A880" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="120" y1="200" x2="240" y2="100" stroke="#B89366" strokeWidth="0.5" opacity="0.6" />
          <line x1="240" y1="100" x2="310" y2="165" stroke="#B89366" strokeWidth="0.5" opacity="0.6" />
          
          {/* Feathered architectural brow arch */}
          <path
            d="M110 175 C150 145, 210 102, 242 102 C265 102, 290 135, 315 168 C290 148, 260 115, 240 115 C205 115, 150 155, 110 175 Z"
            fill="#3B322C"
            opacity="0.85"
          />
          {/* Micro-feathered hair strokes */}
          <path d="M125 170 Q130 152 135 145" stroke="#26201C" strokeWidth="1" strokeLinecap="round" />
          <path d="M145 160 Q152 140 160 132" stroke="#26201C" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M170 150 Q180 128 190 120" stroke="#26201C" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M200 138 Q212 118 225 112" stroke="#26201C" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M230 125 Q242 108 250 106" stroke="#26201C" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M260 125 Q275 125 288 140" stroke="#26201C" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M285 145 Q298 152 308 162" stroke="#26201C" strokeWidth="1" strokeLinecap="round" />
        </svg>
      )}

      {type === 'skincare' && (
        <svg
          className="absolute inset-0 w-full h-full text-[#B89366]/40 transition-transform duration-1000 group-hover:scale-105"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cellular ripples and botanical drops */}
          <circle cx="200" cy="150" r="115" stroke="#C5A880" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="200" cy="150" r="85" stroke="#D1B898" strokeWidth="1" opacity="0.5" />
          <circle cx="200" cy="150" r="50" stroke="#B89366" strokeWidth="1.25" opacity="0.7" />
          
          {/* Radiant botanical droplet */}
          <path
            d="M200 85 C185 120, 160 150, 160 175 C160 200, 178 215, 200 215 C222 215, 240 200, 240 175 C240 150, 215 120, 200 85 Z"
            fill="url(#skinDew)"
            opacity="0.8"
          />
          {/* Gua sha obsidian curve line */}
          <path
            d="M130 180 C150 230, 250 240, 270 170"
            stroke="#5A5048"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="skinDew" x1="160" y1="85" x2="240" y2="215" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF8F0" />
              <stop offset="0.6" stopColor="#EAD8C3" />
              <stop offset="1" stopColor="#C5A880" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {type === 'makeup' && (
        <svg
          className="absolute inset-0 w-full h-full text-[#B89366]/40 transition-transform duration-1000 group-hover:scale-105"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sculptural silhouette of lips and cheek highlight sweep */}
          <path
            d="M140 190 C170 170, 200 180, 200 180 C200 180, 230 170, 260 190 C235 215, 165 215, 140 190 Z"
            fill="#B3655D"
            opacity="0.85"
          />
          <path
            d="M165 186 C180 180, 200 184, 200 184 C200 184, 220 180, 235 186 C215 195, 185 195, 165 186 Z"
            fill="#F6D4CD"
            opacity="0.7"
          />
          {/* Luminescent cheekbone light brush stroke */}
          <path
            d="M110 110 C160 115, 230 85, 280 75"
            stroke="url(#highlighterSweep)"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="highlighterSweep" x1="110" y1="110" x2="280" y2="75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F8EDE1" stopOpacity="0" />
              <stop offset="0.5" stopColor="#F5DFCA" stopOpacity="0.8" />
              <stop offset="1" stopColor="#C5A880" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {(type === 'package' || type === 'atelier' || type === 'ambiance' || type === 'founder') && (
        <svg
          className="absolute inset-0 w-full h-full text-[#B89366]/40 transition-transform duration-1000 group-hover:scale-105"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Architectural Parisian arch & travertine columns */}
          <rect x="130" y="50" width="140" height="210" rx="70" stroke="#7A6F65" strokeWidth="1" />
          <rect x="145" y="65" width="110" height="195" rx="55" stroke="#B89366" strokeWidth="0.75" opacity="0.6" />
          <line x1="80" y1="260" x2="320" y2="260" stroke="#4A413A" strokeWidth="1.25" />
          <line x1="60" y1="270" x2="340" y2="270" stroke="#B89366" strokeWidth="0.75" />
          {/* Center crystal / chandelier droplet motif */}
          <circle cx="200" cy="120" r="16" stroke="#C5A880" strokeWidth="0.75" />
          <line x1="200" y1="50" x2="200" y2="104" stroke="#C5A880" strokeWidth="0.75" />
          <circle cx="200" cy="145" r="2" fill="#B89366" />
          <circle cx="200" cy="160" r="1.5" fill="#D4AF37" />
        </svg>
      )}

      {/* Editorial overlay & typography */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#7A736C]">
            Maison Séraphine
          </span>
          {badge && (
            <span className="text-[11px] tracking-wide text-[#987547] font-medium">
              {badge}
            </span>
          )}
        </div>

        <div className="space-y-1">
          {title && (
            <h4 className="font-serif text-xl md:text-2xl text-[#1E1C1A] tracking-tight leading-snug">
              {title}
            </h4>
          )}
          {subtitle && (
            <p className="text-xs text-[#7A736C] font-light tracking-wide line-clamp-2">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Subtle border highlight */}
      <div className="absolute inset-0 border border-black/[0.04] pointer-events-none" />
    </div>
  );
};
