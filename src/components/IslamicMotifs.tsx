import React from 'react';

/**
 * Islamic 8-Pointed Star (Rub el Hizb) Motif
 */
export const RubElHizb: React.FC<{ className?: string; size?: number; style?: React.CSSProperties }> = ({ className = "text-[#D4AF37]", size = 24, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <rect x="5" y="5" width="14" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <rect
      x="5"
      y="5"
      width="14"
      height="14"
      rx="1"
      transform="rotate(45 12 12)"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <circle cx="12" cy="12" r="2.2" fill="currentColor" />
  </svg>
);

/**
 * Symmetrical Luxury Gold Divider with Central Islamic Ornament
 */
export const GoldFlourishDivider: React.FC<{ className?: string; light?: boolean }> = ({ className = "", light = false }) => {
  const strokeColor = light ? "#E6C875" : "#AA8232";
  const mutedStroke = light ? "rgba(230, 200, 117, 0.35)" : "rgba(170, 130, 50, 0.35)";

  return (
    <div className={`flex items-center justify-center gap-3 my-5 ${className}`} aria-hidden="true">
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
      <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="text-[#D4AF37]">
        <path
          d="M2 10C8 10 12 13 16 16C17 11 19 6 20 2C21 6 23 11 24 16C28 13 32 10 38 10"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="10" r="2" fill={strokeColor} />
        <circle cx="10" cy="10" r="1.2" fill={mutedStroke} />
        <circle cx="30" cy="10" r="1.2" fill={mutedStroke} />
      </svg>
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
    </div>
  );
};

/**
 * Delicate Islamic Mihrab / Arch Outline Frame Header
 */
export const MihrabArch: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 100 40" fill="none" className={`w-28 sm:w-36 mx-auto ${className}`} aria-hidden="true">
    <path
      d="M5 40V18C5 12 18 3 50 3C82 3 95 12 95 18V40"
      stroke="#D4AF37"
      strokeWidth="1"
      strokeDasharray="2 2"
      opacity="0.6"
    />
    <path
      d="M12 40V22C12 16 24 8 50 8C76 8 88 16 88 22V40"
      stroke="#D4AF37"
      strokeWidth="1.2"
    />
    <circle cx="50" cy="8" r="2" fill="#D4AF37" />
  </svg>
);

/**
 * Luxury Corner Ornamental Flourish for Cards
 */
export const CardCornerFlourish: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = "" }) => {
  const transform = {
    'top-left': '',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)',
  }[position];

  return (
    <div
      className={`absolute w-8 h-8 pointer-events-none opacity-70 ${
        position.includes('top') ? 'top-2' : 'bottom-2'
      } ${position.includes('left') ? 'left-2' : 'right-2'} ${className}`}
      style={{ transform }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full text-[#D4AF37]">
        <path d="M2 30V10C2 5.57843 5.57843 2 10 2H30" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6 26V12C6 8.68629 8.68629 6 12 6H26" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
};

/**
 * Islamic Floral Vine Ornament for Name Separators
 */
export const FloralNameDivider: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex items-center justify-center gap-2 py-1 ${className}`} aria-hidden="true">
    <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
    <span className="text-[#D4AF37] font-serif text-lg leading-none italic select-none">&amp;</span>
    <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
  </div>
);
