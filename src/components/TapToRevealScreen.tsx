import React, { useState } from 'react';
import { RubElHizb } from './IslamicMotifs';
import { WEDDING_DETAILS } from '../weddingConfig';

interface TapToRevealScreenProps {
  onReveal: () => void;
}

export const TapToRevealScreen: React.FC<TapToRevealScreenProps> = ({ onReveal }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleHeartClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Smooth transition delay to allow the elegant exit animation
    setTimeout(() => {
      onReveal();
    }, 750);
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#180408] via-[#24060E] to-[#120306] overflow-hidden transition-all duration-700 ${
        isOpening ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle Ambient Radial Gold Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#8E172E]/15 blur-[120px] pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[#D4AF37]/10 blur-[90px] pointer-events-none" />

      {/* Floating Gold Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#E6C875] opacity-60"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${15 + (i * 6) % 70}%`,
              left: `${10 + (i * 7) % 80}%`,
              animation: `floatDust ${4 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.4)}s`,
              boxShadow: '0 0 6px rgba(230,200,117,0.8)',
            }}
          />
        ))}
      </div>

      {/* Top Header Flourish */}
      <div className="relative z-10 text-center mb-8 flex flex-col items-center">
        <RubElHizb size={20} className="text-[#D4AF37] mb-2 opacity-80" />
        <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#E6C875]/80">
          The Baraat Ceremony Of
        </p>
        <h2 className="font-cormorant text-2xl sm:text-3xl text-[#FFFDF9] tracking-wide mt-1 font-light italic">
          {WEDDING_DETAILS.groomName} &amp; {WEDDING_DETAILS.brideName}
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mt-3" />
      </div>

      {/* CENTERPIECE: ELEGANT BURGUNDY HEART BUTTON */}
      <button
        onClick={handleHeartClick}
        aria-label="Tap to reveal the wedding invitation"
        className={`relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-full transition-transform duration-700 ${
          isOpening ? 'scale-125 opacity-0' : 'animate-heartbeat'
        }`}
      >
        {/* Exterior Golden Aura Halo */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#9B1530]/40 to-[#D4AF37]/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

        {/* SVG Premium Heart Structure */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
          >
            <defs>
              {/* Rich Velvet Burgundy Gradient */}
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8F152C" />
                <stop offset="50%" stopColor="#670C1E" />
                <stop offset="100%" stopColor="#430612" />
              </linearGradient>

              {/* Gold Rim Stroke Gradient */}
              <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5E1A4" />
                <stop offset="35%" stopColor="#D4AF37" />
                <stop offset="70%" stopColor="#AA8232" />
                <stop offset="100%" stopColor="#E6C875" />
              </linearGradient>

              {/* Inner Shadow Filter */}
              <filter id="innerGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff" />
                <feFlood floodColor="#FFAEBF" floodOpacity="0.25" />
                <feComposite in2="shadowDiff" operator="in" />
                <feComposite in2="SourceGraphic" operator="over" />
              </filter>
            </defs>

            {/* Heart Path */}
            <path
              d="M100,175 C30,125 10,85 10,50 C10,22 32,5 60,5 C78,5 92,16 100,28 C108,16 122,5 140,5 C168,5 190,22 190,50 C190,85 170,125 100,175 Z"
              fill="url(#heartGradient)"
              stroke="url(#goldRim)"
              strokeWidth="2.2"
              filter="url(#innerGlow)"
            />

            {/* Subtle inner decorative hairline */}
            <path
              d="M100,165 C38,118 20,82 20,52 C20,28 38,13 62,13 C78,13 90,22 100,34 C110,22 122,13 138,13 C162,13 180,28 180,52 C180,82 162,118 100,165 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="0.8"
              strokeDasharray="3 3"
              opacity="0.6"
            />
          </svg>

          {/* Heart Inner Content: "Tap to Reveal" */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none select-none -translate-y-1">
            <span className="text-[#F5E1A4] text-xs font-cinzel tracking-[0.25em] uppercase opacity-90 mb-1">
              ✦ Bismillah ✦
            </span>
            <span className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#FFFDF9] tracking-wider drop-shadow-md">
              Tap to Reveal
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#E6C875] to-transparent my-1.5 opacity-70" />
            <span className="font-cinzel text-[10px] sm:text-xs text-[#E6C875]/90 tracking-[0.2em] uppercase">
              Open Invitation
            </span>
          </div>
        </div>
      </button>

      {/* Subtle Hint Below */}
      <p className="mt-8 text-xs font-sans tracking-wider text-[#E6C875]/70 uppercase">
        Touch the heart to begin
      </p>
    </div>
  );
};
