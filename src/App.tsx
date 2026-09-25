import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Clock,
  Calendar,
  Heart,
  Share2,
  ExternalLink,
  ChevronDown,
  Check,
  RotateCcw
} from 'lucide-react';
import {
  GOOGLE_MAPS_URL,
  WEDDING_DETAILS
} from './weddingConfig';
import defaultWeddingCoupleImg from './assets/images/wedding_couple.jpg';
import { OpeningSplitScreen } from './components/OpeningSplitScreen';
import { TapToRevealScreen } from './components/TapToRevealScreen';
import { AudioPlayer } from './components/AudioPlayer';
import { CountdownTimer } from './components/CountdownTimer';
import { GuestBlessingSection } from './components/GuestBlessingSection';
import {
  RubElHizb,
  GoldFlourishDivider,
  CardCornerFlourish,
  MihrabArch,
  FloralNameDivider
} from './components/IslamicMotifs';
import { getGoogleCalendarUrl, downloadIcsFile } from './utils/calendar';

const IMAGE_STORAGE_KEY = 'wedding_invitation_custom_image';

export default function App() {
  const [appState, setAppState] = useState<'split' | 'reveal' | 'card'>('split');
  const [shareToast, setShareToast] = useState(false);
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);
  
  // Custom image state (defaults to original couple image, with localStorage persistence)
  const [coupleImage, setCoupleImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(IMAGE_STORAGE_KEY);
      return saved || defaultWeddingCoupleImg;
    } catch {
      return defaultWeddingCoupleImg;
    }
  });

  const [imageToast, setImageToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (appState === 'card') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [appState]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageToast('Please select a valid image file');
      setTimeout(() => setImageToast(null), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setCoupleImage(dataUrl);
        try {
          localStorage.setItem(IMAGE_STORAGE_KEY, dataUrl);
        } catch {
          // localStorage quote limit reached, still works in memory
        }
        setImageToast('Photo updated successfully! Synchronized across loading screen & card.');
        setTimeout(() => setImageToast(null), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleShare = async () => {
    const shareData = {
      title: `Baraat Invitation — ${WEDDING_DETAILS.groomName} & ${WEDDING_DETAILS.brideName}`,
      text: `You are cordially invited to celebrate the Baraat ceremony of ${WEDDING_DETAILS.groomName} and ${WEDDING_DETAILS.brideName} on ${WEDDING_DETAILS.eventDateFormatted} at ${WEDDING_DETAILS.venueName}, Lahore.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or share unhandled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#140306] text-[#2D1217] relative selection:bg-[#7D1327] selection:text-[#FFFDF9]">
      {/* 1. INITIAL LOADING / OPENING SPLIT SCREEN (SLOWER ANIMATION & CUSTOM IMAGE) */}
      {appState === 'split' && (
        <OpeningSplitScreen imageSrc={coupleImage} onComplete={() => setAppState('reveal')} />
      )}

      {/* 2. TAP TO REVEAL SCREEN */}
      {appState === 'reveal' && (
        <TapToRevealScreen onReveal={() => setAppState('card')} />
      )}

      {/* 3. MAIN WEDDING INVITATION */}
      {appState === 'card' && (
        <main className="relative min-h-screen overflow-x-hidden pb-16">
          <AudioPlayer />
          
          {/* Top Bar Actions: Share */}
          <div className="fixed top-4 left-4 z-40 flex items-center gap-2">
            <button
              onClick={handleShare}
              aria-label="Share Wedding Invitation"
              title="Share with Family & Friends"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#2A060F]/80 hover:bg-[#3D0A17] border border-[#D4AF37]/50 text-[#E6C875] backdrop-blur-md shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
            >
              <Share2 size={15} />
              <span className="text-[11px] font-cinzel tracking-wider uppercase hidden sm:inline">Share</span>
            </button>
          </div>

          {shareToast && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#180307] border border-[#D4AF37] text-[#F5E1A4] text-xs font-cinzel tracking-wider shadow-2xl flex items-center gap-2 animate-bounce">
              <Check size={14} className="text-emerald-400" />
              <span>Invitation Link Copied!</span>
            </div>
          )}

          {/* Hidden file input for programmatically or secretly updating photo if needed via console or custom trigger */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
            aria-hidden="true"
          />

          {imageToast && (
            <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#1A0408] border border-[#D4AF37] text-[#FFFDF9] text-xs font-sans tracking-wide shadow-2xl flex items-center gap-2 max-w-sm text-center">
              <Check size={14} className="text-[#E6C875] shrink-0" />
              <span>{imageToast}</span>
            </div>
          )}

          {/* Luxury Background Wallpaper Overlay */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3A0713] via-[#1D040A] to-[#120205]" />
            <div
              className="absolute inset-0 opacity-[0.035] bg-repeat"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l15 15-15 15L15 15zM0 30l15 15-15 15-15-15zM60 30l15 15-15 15-15-15zM30 60l15 15-15 15-15-15z' fill='%23D4AF37' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          <div className="relative z-10 max-w-xl mx-auto px-3 sm:px-6 pt-16 sm:pt-20">
            {/* INVITATION CARD FRAME */}
            <article className="relative rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5ECE0] p-6 sm:p-10 border-[1.5px] border-[#D4AF37]/60 shadow-[0_20px_60px_rgba(0,0,0,0.65)] overflow-hidden">
              <CardCornerFlourish position="top-left" />
              <CardCornerFlourish position="top-right" />
              <CardCornerFlourish position="bottom-left" />
              <CardCornerFlourish position="bottom-right" />

              <div className="absolute inset-2.5 sm:inset-3 border border-[#D4AF37]/35 rounded-[22px] pointer-events-none" />

              {/* 3. TOP SECTION: BISMILLAH */}
              <header className="text-center pt-2 sm:pt-4">
                <MihrabArch className="mb-2" />
                <h1
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#6D0E20] font-normal leading-[1.8] tracking-wide select-none drop-shadow-sm px-2"
                >
                  {WEDDING_DETAILS.bismillahArabic}
                </h1>
                <p className="font-serif-cormorant text-xs sm:text-sm text-[#7D4830] tracking-wider italic mt-1 max-w-md mx-auto">
                  "{WEDDING_DETAILS.bismillahEnglish}"
                </p>
                <GoldFlourishDivider />
              </header>

              {/* 4. ISLAMIC BLESSING FOR THE COUPLE */}
              <section className="text-center px-2 sm:px-6 my-4">
                <p className="font-serif-cormorant text-base sm:text-lg text-[#4A161E] italic leading-relaxed">
                  "{WEDDING_DETAILS.coupleBlessing}"
                </p>
              </section>

              {/* CEREMONY TITLE BANNER */}
              <div className="text-center my-6">
                <span className="font-cinzel text-xs sm:text-sm tracking-[0.35em] uppercase text-[#AA8232] font-semibold">
                  Together With Their Families
                </span>
                <p className="font-sans text-xs tracking-widest text-[#725447] uppercase mt-1">
                  Invite You to Grace the Auspicious Occasion of the
                </p>
                <div className="inline-block mt-2 px-6 py-1.5 rounded-full bg-[#690D1F] border border-[#D4AF37] shadow-sm">
                  <span className="font-cinzel text-sm sm:text-base tracking-[0.25em] text-[#FFF4D4] uppercase font-medium">
                    {WEDDING_DETAILS.eventType} Ceremony
                  </span>
                </div>
              </div>

              {/* 5. COUPLE NAMES (PRIMARY VISUAL FOCAL POINT) */}
              <section className="text-center my-8 py-4 relative">
                <div className="space-y-1">
                  <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#570918]">
                    {WEDDING_DETAILS.groomName}
                  </h2>
                  <FloralNameDivider />
                  <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#570918]">
                    {WEDDING_DETAILS.brideName}
                  </h2>
                </div>
              </section>

              {/* COUPLE PHOTOGRAPH FRAME */}
              <section className="my-8 px-2">
                <div
                  onDoubleClick={() => fileInputRef.current?.click()}
                  title="Kashif Raza Khan & Sajila Batool"
                  className="relative mx-auto max-w-xs sm:max-w-sm rounded-2xl overflow-hidden p-1.5 bg-gradient-to-tr from-[#D4AF37] via-[#F8E7BE] to-[#AA8232] shadow-xl group select-none cursor-default"
                >
                  <div className="relative rounded-[14px] overflow-hidden aspect-[3/4] bg-[#2A060E]">
                    <img
                      src={coupleImage}
                      alt="Kashif Raza Khan & Sajila Batool"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Name Badge */}
                    <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
                      <p className="font-cinzel text-xs tracking-[0.2em] uppercase text-[#F8E7BE] drop-shadow-md">
                        Kashif &amp; Sajila
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <GoldFlourishDivider />

              {/* 6. BARAAT DETAILS SECTION */}
              <section className="my-8 text-center" id="baraat-details">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <RubElHizb size={16} className="text-[#C59B27]" />
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#630B1C] uppercase">
                    {WEDDING_DETAILS.eventType}
                  </h3>
                  <RubElHizb size={16} className="text-[#C59B27]" />
                </div>

                {/* DATE */}
                <div className="my-4 py-3 px-4 rounded-xl bg-[#F6EDE0] border border-[#D4AF37]/50 max-w-sm mx-auto shadow-inner">
                  <div className="flex items-center justify-center gap-2 text-[#7B1327] mb-1">
                    <Calendar size={18} />
                    <span className="font-cinzel text-xs tracking-wider uppercase font-semibold">
                      Date
                    </span>
                  </div>
                  <p className="font-cormorant text-xl sm:text-2xl font-bold text-[#440813]">
                    {WEDDING_DETAILS.eventDateFormatted}
                  </p>
                </div>

                {/* VENUE & ADDRESS */}
                <div className="my-5 px-3 max-w-sm mx-auto">
                  <div className="flex items-center justify-center gap-1.5 text-[#7B1327] mb-1">
                    <MapPin size={18} />
                    <span className="font-cinzel text-xs tracking-wider uppercase font-semibold">
                      Venue
                    </span>
                  </div>
                  <h4 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#440813]">
                    {WEDDING_DETAILS.venueName}
                  </h4>
                  <p className="font-serif-cormorant text-sm sm:text-base text-[#684C3E] italic mt-1">
                    {WEDDING_DETAILS.venueAddress}
                  </p>
                </div>

                {/* 7. WELCOME / BLESSING MESSAGE FOR GUESTS */}
                <div className="my-6 px-4 py-3 bg-[#FAF2E6] rounded-xl border-y border-[#D4AF37]/40 max-w-md mx-auto">
                  <p className="font-serif-cormorant text-sm sm:text-base text-[#571B26] italic leading-relaxed">
                    "{WEDDING_DETAILS.guestBlessing}"
                  </p>
                </div>

                {/* 8. EVENT TIMINGS */}
                <div className="my-6 max-w-sm mx-auto p-4 rounded-xl bg-gradient-to-b from-[#F9EFE2] to-[#F3E5D4] border border-[#D4AF37]/60 shadow-sm">
                  <div className="flex items-center justify-center gap-1.5 text-[#7B1327] mb-2">
                    <Clock size={18} />
                    <span className="font-cinzel text-xs tracking-widest uppercase font-semibold">
                      Event Schedule
                    </span>
                  </div>
                  <p className="font-cormorant text-2xl sm:text-3xl font-bold text-[#550A17]">
                    {WEDDING_DETAILS.receptionTime}
                  </p>
                  <div className="w-16 h-[1px] bg-[#D4AF37]/60 mx-auto my-2" />
                  <p className="font-cinzel text-xs sm:text-sm tracking-wider uppercase text-[#732434] font-medium">
                    {WEDDING_DETAILS.rukhsatiTime}
                  </p>
                </div>

                {/* COUNTDOWN TO CELEBRATION */}
                <div className="pt-2">
                  <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#885F18] mb-1">
                    Countdown to the Auspicious Day
                  </p>
                  <CountdownTimer />
                </div>

                {/* 9. LOCATION BUTTON & CALENDAR */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  {/* CONFIGURABLE GOOGLE MAPS LOCATION BUTTON */}
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-1 min-h-[44px] py-3 px-6 rounded-xl bg-gradient-to-r from-[#7D1226] via-[#9B1733] to-[#7D1226] hover:from-[#8E152C] hover:to-[#8E152C] text-[#FFFDF9] font-cinzel text-xs tracking-[0.2em] uppercase font-semibold border border-[#D4AF37] shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
                  >
                    <MapPin size={16} className="text-[#F8E7BE]" />
                    <span>View Location</span>
                    <ExternalLink size={13} className="text-[#F8E7BE]/80" />
                  </a>

                  {/* CALENDAR REMINDER BUTTON */}
                  <div className="relative w-full sm:w-auto flex-1">
                    <button
                      onClick={() => setShowCalendarMenu(!showCalendarMenu)}
                      className="w-full min-h-[44px] py-3 px-5 rounded-xl bg-[#FAF0E2] hover:bg-[#F4E4D0] text-[#550B18] font-cinzel text-xs tracking-[0.2em] uppercase font-semibold border border-[#D4AF37]/80 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Calendar size={16} className="text-[#885F18]" />
                      <span>Add to Calendar</span>
                      <ChevronDown size={14} className={`transition-transform duration-200 ${showCalendarMenu ? 'rotate-180' : ''}`} />
                    </button>

                    {showCalendarMenu && (
                      <div className="absolute bottom-full mb-2 left-0 right-0 sm:w-56 bg-[#FFFDF9] border border-[#D4AF37] rounded-xl shadow-xl overflow-hidden z-30 p-1">
                        <a
                          href={getGoogleCalendarUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShowCalendarMenu(false)}
                          className="block px-4 py-2.5 text-xs font-sans text-[#4A161E] hover:bg-[#F7EFE4] rounded-lg transition-colors text-left"
                        >
                          Google Calendar (Android / Web)
                        </a>
                        <button
                          onClick={() => {
                            downloadIcsFile();
                            setShowCalendarMenu(false);
                          }}
                          className="w-full block px-4 py-2.5 text-xs font-sans text-[#4A161E] hover:bg-[#F7EFE4] rounded-lg transition-colors text-left cursor-pointer"
                        >
                          Apple / Outlook Calendar (.ics)
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <GoldFlourishDivider />

              {/* 10. FINAL CELEBRATION SECTION */}
              <section className="my-10 text-center px-2 sm:px-4">
                <h3 className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-bold text-[#550A18] tracking-tight leading-tight">
                  {WEDDING_DETAILS.finalCelebrationHeading}
                </h3>

                <p className="font-serif-cormorant text-base sm:text-lg text-[#5E2B20] italic mt-3 max-w-md mx-auto leading-relaxed">
                  "{WEDDING_DETAILS.finalCelebrationMessage}"
                </p>

                <div className="mt-8 space-y-0.5">
                  <p className="font-cormorant text-2xl sm:text-3xl font-bold text-[#570918]">
                    {WEDDING_DETAILS.groomName}
                  </p>
                  <p className="text-[#C59B27] font-serif text-lg italic">&amp;</p>
                  <p className="font-cormorant text-2xl sm:text-3xl font-bold text-[#570918]">
                    {WEDDING_DETAILS.brideName}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center mt-6 gap-2" aria-hidden="true">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
                    <Heart size={16} className="text-[#91142A] fill-[#91142A]" />
                    <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
                  </div>
                  <RubElHizb size={14} className="text-[#C59B27] opacity-75 mt-1" />
                </div>
              </section>
            </article>

            {/* INTERACTIVE GUESTBOOK & DUAS SECTION */}
            <GuestBlessingSection />

            {/* FOOTER ACTIONS */}
            <footer className="text-center mt-8 pb-10 space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setAppState('split')}
                  className="inline-flex items-center gap-1.5 text-xs font-cinzel text-[#E6C875]/90 hover:text-[#FFF] transition-colors py-2 px-3.5 rounded-lg bg-[#25050D] border border-[#D4AF37]/40 cursor-pointer shadow-md"
                >
                  <RotateCcw size={13} />
                  <span>Replay Opening Animation</span>
                </button>
              </div>

              <p className="text-xs text-[#E6C875]/60 font-serif-cormorant italic">
                In Celebration of Kashif Raza Khan &amp; Sajila Batool • Lahore, Pakistan
              </p>
            </footer>
          </div>
        </main>
      )}
    </div>
  );
}
