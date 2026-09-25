import React, { useState } from 'react';
import { Heart, Send, Sparkles, Check } from 'lucide-react';
import { GoldFlourishDivider } from './IslamicMotifs';

interface Blessing {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

const INITIAL_BLESSINGS: Blessing[] = [
  {
    id: '1',
    name: 'Uncle Tariq & Family',
    message: 'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ — May Allah fill your home with immense happiness and barakah.',
    timestamp: 'Just now',
  },
  {
    id: '2',
    name: 'Zainab & Hamza',
    message: 'Heartiest congratulations to our dearest Kashif & Sajila! May your journey together be illuminated with peace and joy.',
    timestamp: '2 hours ago',
  },
];

export const GuestBlessingSection: React.FC = () => {
  const [blessings, setBlessings] = useState<Blessing[]>(INITIAL_BLESSINGS);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    const newBlessing: Blessing = {
      id: Date.now().toString(),
      name: senderName.trim(),
      message: message.trim(),
      timestamp: 'Just now',
    };

    setBlessings([newBlessing, ...blessings]);
    setSenderName('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const quickPrayers = [
    "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا",
    "May Allah bless this beautiful union with endless love & peace.",
    "Congratulations to both families! Wishing you eternal barakah."
  ];

  return (
    <div className="w-full max-w-lg mx-auto my-12 px-4 sm:px-6">
      <div className="relative rounded-2xl bg-gradient-to-b from-[#23050C] to-[#180307] p-6 sm:p-8 border border-[#D4AF37]/40 shadow-2xl backdrop-blur-md">
        {/* Header */}
        <div className="text-center">
          <span className="font-cinzel text-xs tracking-[0.25em] text-[#E6C875] uppercase">
            Guestbook &amp; Prayers
          </span>
          <h3 className="font-cormorant text-2xl sm:text-3xl text-[#FFFDF9] font-medium mt-1">
            Send Your Duas to the Couple
          </h3>
          <GoldFlourishDivider light className="!my-3 scale-90" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="guest-name" className="block text-xs font-cinzel tracking-wider text-[#E6C875]/80 uppercase mb-1">
              Your Name
            </label>
            <input
              id="guest-name"
              type="text"
              required
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g. Dr. Salman & Family"
              className="w-full px-4 py-2.5 rounded-lg bg-[#140206] border border-[#D4AF37]/35 text-[#FFFDF9] placeholder-stone-500 text-sm focus:outline-none focus:border-[#E6C875] focus:ring-1 focus:ring-[#E6C875]"
            />
          </div>

          <div>
            <label htmlFor="guest-message" className="block text-xs font-cinzel tracking-wider text-[#E6C875]/80 uppercase mb-1">
              Your Blessing / Dua
            </label>
            <textarea
              id="guest-message"
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your prayers and warm wishes..."
              className="w-full px-4 py-2.5 rounded-lg bg-[#140206] border border-[#D4AF37]/35 text-[#FFFDF9] placeholder-stone-500 text-sm focus:outline-none focus:border-[#E6C875] focus:ring-1 focus:ring-[#E6C875] resize-none"
            />
          </div>

          {/* Quick prayer suggestions */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {quickPrayers.map((prayer, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMessage(prayer)}
                className="text-[11px] text-[#E6C875]/85 hover:text-[#FFF] bg-[#2E0711] hover:bg-[#420A19] border border-[#D4AF37]/30 px-2.5 py-1 rounded-md text-left transition-colors"
              >
                + {prayer.slice(0, 32)}...
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#93152C] via-[#B81F3E] to-[#93152C] hover:from-[#A81A34] hover:to-[#A81A34] text-[#FFFDF9] font-cinzel text-xs tracking-[0.2em] uppercase font-semibold border border-[#E6C875]/50 shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
          >
            {submitted ? (
              <>
                <Check size={16} className="text-emerald-400" />
                <span>Blessing Sent With Love</span>
              </>
            ) : (
              <>
                <Send size={15} />
                <span>Send Wedding Dua</span>
              </>
            )}
          </button>
        </form>

        {/* Recent Wishes Feed */}
        <div className="mt-8 border-t border-[#D4AF37]/20 pt-6">
          <p className="text-[11px] font-cinzel tracking-wider text-[#E6C875]/70 uppercase mb-3 flex items-center gap-1.5">
            <Heart size={12} className="text-[#E6C875] fill-[#E6C875]" />
            Blessings from Loved Ones ({blessings.length})
          </p>
          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {blessings.map((b) => (
              <div
                key={b.id}
                className="p-3 rounded-lg bg-[#140206]/80 border border-[#D4AF37]/20 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs text-[#E6C875] font-medium">{b.name}</span>
                  <span className="text-[10px] text-stone-400">{b.timestamp}</span>
                </div>
                <p className="text-xs text-stone-200 mt-1 font-serif-cormorant italic text-[14px] leading-relaxed">
                  "{b.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
