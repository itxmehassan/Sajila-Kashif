import React, { useState, useEffect } from 'react';
import weddingCoupleImg from '../assets/images/wedding_couple.jpg';
import { RubElHizb } from './IslamicMotifs';

interface OpeningSplitScreenProps {
  onComplete: () => void;
  imageSrc: string;
}

export const OpeningSplitScreen: React.FC<OpeningSplitScreenProps> = ({ onComplete, imageSrc }) => {
  const [isSplitting, setIsSplitting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Slower, more majestic loading pause so guests can admire the full portrait
    const splitTimer = setTimeout(() => {
      setIsSplitting(true);
    }, 2800);

    // Complete transition after the smooth 2.6s split animation finishes (total 5.4s)
    const finishTimer = setTimeout(() => {
      setIsMounted(false);
      onComplete();
    }, 5400);

    return () => {
      clearTimeout(splitTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  const handleManualTrigger = () => {
    if (!isSplitting) {
      setIsSplitting(true);
      setTimeout(() => {
        setIsMounted(false);
        onComplete();
      }, 2600);
    }
  };

  if (!isMounted) return null;

  return (
    <div
      onClick={handleManualTrigger}
      className="fixed inset-0 z-50 overflow-hidden bg-[#160408] select-none cursor-pointer"
      role="dialog"
      aria-label="Wedding Invitation Opening Ceremony"
    >
      {/* LEFT HALF */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full overflow-hidden transition-all duration-[2600ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
        style={{
          transform: isSplitting ? 'translateX(-100%)' : 'translateX(0)',
          opacity: isSplitting ? 0 : 1,
        }}
      >
        <img
          src={imageSrc}
          alt="Kashif Raza Khan & Sajila Batool"
          referrerPolicy="no-referrer"
          className="absolute top-0 left-0 w-[100vw] h-full object-cover object-center max-w-none"
        />
        {/* Subtle dark edge vignette to softly blend with mobile viewport */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* RIGHT HALF */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full overflow-hidden transition-all duration-[2600ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
        style={{
          transform: isSplitting ? 'translateX(100%)' : 'translateX(0)',
          opacity: isSplitting ? 0 : 1,
        }}
      >
        <img
          src={imageSrc}
          alt="Kashif Raza Khan & Sajila Batool"
          referrerPolicy="no-referrer"
          className="absolute top-0 right-0 w-[100vw] h-full object-cover object-center max-w-none"
        />
        {/* Subtle dark edge vignette to softly blend with mobile viewport */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* CENTER DIVIDER SEAM & EMBLEM (Fades out when splitting starts) */}
      <div
        className={`absolute inset-0 pointer-events-none z-20 flex flex-col items-center justify-center transition-all duration-700 ${
          isSplitting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
      >
        {/* Fine gold vertical hairline */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#DFC07A]/80 to-transparent shadow-[0_0_8px_rgba(223,192,122,0.8)]" />

        {/* Central Royal Invitation Badge */}
        <div className="relative px-6 py-4 rounded-full bg-[#20050B]/85 border border-[#D4AF37]/70 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex items-center gap-3">
          <RubElHizb size={18} className="text-[#E6C875] animate-spin" style={{ animationDuration: '14s' }} />
          <div className="text-center">
            <p className="font-cinzel text-xs tracking-[0.25em] text-[#E6C875] uppercase font-medium">
              Baraat Invitation
            </p>
            <p className="font-serif-cormorant text-sm italic text-stone-200">
              Kashif &amp; Sajila
            </p>
          </div>
          <RubElHizb size={18} className="text-[#E6C875] animate-spin" style={{ animationDuration: '14s' }} />
        </div>

        {/* Bottom subtle hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
          <p className="text-[11px] tracking-widest text-[#F5E1A4] font-cinzel uppercase">
            Opening Celebration...
          </p>
        </div>
      </div>
    </div>
  );
};
