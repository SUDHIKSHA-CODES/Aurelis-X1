import { useState } from 'react';
import { ArrowDown, ChevronRight, Zap, Play, Eye } from 'lucide-react';
import { CarExperienceCanvas } from '../3d/CarExperienceCanvas';
import type { CarConfig } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface HeroProps {
  config: CarConfig;
  onExploreClick: () => void;
  onConfigureClick: () => void;
}

export const Hero = ({ config, onExploreClick, onConfigureClick }: HeroProps) => {
  const [isPlayingLaunch, setIsPlayingLaunch] = useState(false);

  const handleLaunchSound = () => {
    setIsPlayingLaunch(true);
    sounds.playAccelerationSpool();
    setTimeout(() => setIsPlayingLaunch(false), 2600);
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden pt-24 pb-12">
      {/* Background Subtle Gradient & Grid Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(212,175,55,0.08),transparent)] pointer-events-none" />
      <div className="absolute inset-0 subtle-grid opacity-20 pointer-events-none" />

      {/* Main Hero 3D Car Canvas Layer */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pt-16 md:pt-20">
        <CarExperienceCanvas
          config={config}
          className="w-full h-full"
          enableOrbit={false}
          enableParallax={true}
          autoRotateSpeed={0.8}
        />
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[#040406] via-transparent to-[#040406]/70" />

      {/* Top Hero Brand Typography */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-10 w-full pt-8 md:pt-12 text-center select-none pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/25 bg-gold-500/5 backdrop-blur-md mb-4 animate-in fade-in duration-700 pointer-events-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-gold-300 uppercase">
            FLAGSHIP ALL-ELECTRIC MONOCOQUE
          </span>
        </div>

        <h1 className="font-serif text-5xl sm:text-7xl md:text-9xl font-bold tracking-[0.18em] text-silver-gradient uppercase leading-none drop-shadow-2xl">
          AURELIS <span className="text-gold-gradient font-light">X1</span>
        </h1>

        <p className="mt-3 font-display tracking-[0.45em] text-base sm:text-xl md:text-2xl text-zinc-300 uppercase font-medium">
          BEYOND MOTION.
        </p>

        <p className="mt-2 text-xs sm:text-sm font-mono tracking-[0.25em] text-zinc-400 uppercase">
          Luxury Electric Hypercar &bull; Limited 150 Allocations
        </p>
      </div>

      {/* Bottom Hero HUD Telemetry & Actions */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-10 w-full flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
        {/* Left: Interactive Acoustic Launch Simulator */}
        <div className="flex flex-col gap-2 glass-panel p-4 rounded-lg border-white/10 max-w-xs w-full">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 tracking-wider">
            <span>ACOUSTIC SIMULATOR</span>
            <span className="text-gold-400">900V SPOOL</span>
          </div>
          <button
            onClick={handleLaunchSound}
            className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded bg-white/5 hover:bg-gold-500/15 border border-white/10 hover:border-gold-500/40 text-white hover:text-gold-300 text-xs font-mono tracking-widest uppercase transition-all duration-300 group cursor-pointer"
          >
            {isPlayingLaunch ? (
              <>
                <Zap className="w-3.5 h-3.5 text-gold-400 animate-bounce" />
                <span className="text-gold-300">LAUNCHING (1.9s)...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-gold-400 group-hover:scale-110 transition-transform" />
                <span>EXPERIENCE LAUNCH SOUND</span>
              </>
            )}
          </button>
        </div>

        {/* Center: Scroll Prompt */}
        <div className="flex flex-col items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer group select-none" onClick={onExploreClick}>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase group-hover:text-gold-300">
            DISCOVER THE X1
          </span>
          <div className="w-5 h-9 rounded-full border border-white/20 group-hover:border-gold-400/50 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-gold-400 animate-bounce" />
          </div>
          <ArrowDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-gold-300 animate-pulse" />
        </div>

        {/* Right: Quick Action CTAs */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={onExploreClick}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm glass-panel hover:bg-white/10 text-xs font-mono tracking-[0.2em] text-white uppercase border-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-zinc-300" />
            <span>EXPLORE</span>
          </button>

          <button
            onClick={onConfigureClick}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#C5A039] text-xs font-mono font-bold tracking-[0.2em] text-black uppercase hover:brightness-110 shadow-lg shadow-gold-500/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <span>CONFIGURE</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
