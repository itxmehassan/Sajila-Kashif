import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

/**
 * Optional Audio Player using Web Audio API synthesis
 * Provides an authentic, meditative Eastern wedding sitar & tanpura ambient drone.
 * Guaranteed 100% offline, zero external broken audio links, zero autoplay violations.
 */
interface AudioPlayerProps {
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  // Traditional Pentatonic / Raag Yaman notes (frequencies in Hz)
  const notes = [
    220.00, // A3 (Sa)
    246.94, // B3 (Re)
    277.18, // C#4 (Ga)
    329.63, // E4 (Pa)
    369.99, // F#4 (Dha)
    440.00, // A4 (Sa')
    493.88, // B4
    554.37  // C#5
  ];

  const playSitarPluck = (ctx: AudioContext, masterGain: GainNode, freq: number) => {
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const noteGain = ctx.createGain();

    // Harmonics for rich string timbre
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, ctx.currentTime);

    noteGain.gain.setValueAtTime(0.001, ctx.currentTime);
    noteGain.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

    osc.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(masterGain);

    osc.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 2.4);
    osc2.stop(ctx.currentTime + 2.4);
  };

  const startMusic = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.6, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Base Tanpura Drone (Sa & Pa)
      const droneOsc1 = ctx.createOscillator();
      const droneOsc2 = ctx.createOscillator();
      const droneGain = ctx.createGain();
      droneOsc1.type = 'sawtooth';
      droneOsc1.frequency.setValueAtTime(110, ctx.currentTime); // Low A2
      droneOsc2.type = 'sine';
      droneOsc2.frequency.setValueAtTime(165, ctx.currentTime); // Low E3 (Pa)

      const droneFilter = ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(320, ctx.currentTime);

      droneGain.gain.setValueAtTime(0.035, ctx.currentTime);

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(masterGain);

      droneOsc1.start();
      droneOsc2.start();

      // Gentle recurring acoustic melody
      let noteIndex = 0;
      const melodySequence = [0, 2, 3, 5, 4, 2, 0, 1, 2, 3, 5, 7, 5, 3, 2, 0];

      const playNextMelodicNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const note = notes[melodySequence[noteIndex % melodySequence.length]];
        playSitarPluck(ctx, masterGain, note);
        noteIndex++;
        const nextDelay = 1200 + Math.random() * 800;
        timerRef.current = window.setTimeout(playNextMelodicNote, nextDelay);
      };

      playNextMelodicNote();
      setIsPlaying(true);
    } catch {
      // Audio fallback in case Web Audio is restricted
      setIsPlaying(false);
    }
  };

  const stopMusic = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.6);
        setTimeout(() => {
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
        }, 700);
      } catch {
        audioCtxRef.current = null;
      }
    }
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      aria-label={isPlaying ? "Mute celebratory ambient music" : "Play celebratory ambient music"}
      title={isPlaying ? "Mute Music" : "Play Festive Music"}
      className={className || "fixed top-4 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-full bg-[#2A060F]/80 hover:bg-[#3D0A17] border border-[#D4AF37]/50 text-[#E6C875] backdrop-blur-md shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"}
    >
      {isPlaying ? (
        <>
          <Volume2 size={16} className="text-[#E6C875] animate-pulse" />
          <span className="text-[11px] font-cinzel tracking-wider uppercase hidden sm:inline">Music On</span>
        </>
      ) : (
        <>
          <Music size={16} className="text-[#E6C875]/70" />
          <span className="text-[11px] font-cinzel tracking-wider uppercase hidden sm:inline">Play Melody</span>
        </>
      )}
    </button>
  );
};
