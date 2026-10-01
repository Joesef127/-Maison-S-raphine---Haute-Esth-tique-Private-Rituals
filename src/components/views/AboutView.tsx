import React from 'react';
import { PRACTITIONERS } from '../../data/practitioners';
import { LuxuryArtFrame } from '../common/LuxuryArtFrame';
import { ShieldCheck, Award, HeartHandshake, Sparkles } from 'lucide-react';

interface AboutViewProps {
  onOpenBooking: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenBooking }) => {
  return (
    <div className="space-y-20 md:space-y-28 pb-20">

      {/* Hero Header */}
      <section className="max-w-4xl mx-auto text-center px-6 pt-12 md:pt-20 space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] text-[#987547] font-medium block">
          Notre Histoire
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#1E1C1A] tracking-tight leading-tight">
          The Architecture of Quiet Radiance
        </h1>
        <p className="text-sm md:text-base text-[#5E564F] leading-relaxed font-light">
          Founded in 2014 along the historic courtyards of Rue de la Paix, Maison Séraphine was created to dismantle the loud, aggressive paradigms of industrial cosmetology in favor of biological harmony, sculptural precision, and private sanctuary care.
        </p>
      </section>

      {/* Split Story Section */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <LuxuryArtFrame
            type="founder"
            title="Madame Éléonore Laurent"
            subtitle="Founder & Master Aesthetician in the Mayfair Private Suite"
            aspectRatio="4:3"
            badge="Founder Portrait"
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#987547] font-medium block">
            Founder’s Epistle
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] leading-snug">
            “When hands touch skin with intention rather than rush, the autonomic nervous system softens.”
          </h2>
          <div className="space-y-4 text-xs md:text-sm text-[#5E564F] leading-relaxed font-light">
            <p>
              I began my practice observing how conventional beauty salons operated: clients lined in rows beneath fluorescent bulbs, acrid fumes of chemical acrylics permeating the air, and aggressive treatments that eroded the natural epidermal moisture barrier.
            </p>
            <p>
              Maison Séraphine is our deliberate rebuttal. Here, every service occurs in a private, acoustically isolated suite. We eliminated toxic soaking vats, adopting surgical-grade dry Russian e-file hardware and non-acid Japanese mineral gels that fortify the natural keratin plate.
            </p>
            <p>
              Whether we are sculpting a 0.05mm cashmere lash or releasing chronic tension along the jawline with intra-oral buccal myofascial massage, our philosophy remains unwavering: quiet, structural perfection.
            </p>
          </div>
          <div className="pt-2 font-serif text-lg text-[#1E1C1A] italic">
            — Éléonore Laurent, Founder
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="bg-[#F4EFEB] py-16 px-6 border-y border-[#EAE2D8]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#987547] font-medium block">
              Sanctuary Standards
            </span>
            <h3 className="font-serif text-3xl text-[#1E1C1A]">
              Our Four Inviolable Commitments
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Biological Reverence',
                desc: 'We never compromise natural tissue integrity. Zero harsh acrylics, zero acid primers, and no aggressive mechanical trauma to the dermis.'
              },
              {
                title: 'Acoustic & Sensory Discretion',
                desc: 'Private single-guest suites with filtered acoustic baffles, low circadian lighting, and custom organic aromatherapy.'
              },
              {
                title: 'Medical-Grade Sterility',
                desc: 'Every hardware bit and implement passes three-stage hospital autoclave sterilization, unsealed from sterile pouches in your presence.'
              },
              {
                title: 'Master Artisans Only',
                desc: 'Every practitioner possesses a minimum of 8 years specialized residency in Tokyo, Zurich, Paris, or London.'
              }
            ].map((p, idx) => (
              <div key={idx} className="bg-white p-6 border border-[#EAE2D8] space-y-3">
                <span className="text-xs font-serif text-[#987547] font-semibold block">0{idx + 1}.</span>
                <h4 className="font-serif text-xl text-[#1E1C1A]">{p.title}</h4>
                <p className="text-xs text-[#7A736C] font-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Master Team */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#987547] font-medium block">
            Artisan Directors
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-[#1E1C1A]">
            The Hands Behind The Mastery
          </h3>
          <p className="text-xs text-[#7A736C]">
            Trained across the world’s most demanding aesthetic academies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRACTITIONERS.map((pr) => (
            <div
              key={pr.id}
              className="bg-white border border-[#EAE2D8] p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#FAF6F0] border border-[#B89366] text-[#987547] font-serif text-lg font-semibold flex items-center justify-center">
                  {pr.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h4 className="font-serif text-xl text-[#1E1C1A]">{pr.name}</h4>
                  <span className="text-[11px] text-[#987547] font-medium block">{pr.role}</span>
                  <span className="text-[10px] text-[#7A736C]">{pr.experience}</span>
                </div>
                <p className="text-xs text-[#524B45] font-light leading-relaxed">
                  {pr.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F4EFEB]">
                <blockquote className="font-serif text-xs text-[#7A736C] italic">
                  “{pr.quote}”
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Experience */}
      <section className="max-w-5xl mx-auto px-6 text-center space-y-6">
        <h3 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A]">
          Step Across The Threshold
        </h3>
        <p className="text-xs md:text-sm text-[#7A736C] max-w-lg mx-auto font-light leading-relaxed">
          Allow our master practitioners to curate your personal beauty journey in Mayfair or Paris.
        </p>
        <button
          onClick={onOpenBooking}
          className="px-8 py-3.5 bg-[#1E1C1A] hover:bg-[#34302C] text-white text-xs uppercase tracking-widest font-medium transition-colors"
        >
          Reserve Sanctuary Consultation
        </button>
      </section>

    </div>
  );
};
