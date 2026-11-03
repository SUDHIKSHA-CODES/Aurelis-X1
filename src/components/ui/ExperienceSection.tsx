import { useState } from 'react';
import { Compass, MapPin, Gauge, Shield } from 'lucide-react';
import { DRIVING_MODES } from '../../constants/carData';
import { sounds } from '../../utils/soundEffects';

export const ExperienceSection = () => {
  const [activeModeIdx, setActiveModeIdx] = useState(0);

  const activeMode = DRIVING_MODES[activeModeIdx];

  const handleSelectMode = (idx: number) => {
    sounds.playModeChime();
    setActiveModeIdx(idx);
  };

  return (
    <section id="experience" className="relative w-full py-28 md:py-36 bg-[#040407] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-gold-400 uppercase mb-3">
              <Compass className="w-4 h-4" />
              <span>DYNAMIC ENVIRONMENTS</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
              FEEL THE <span className="text-gold-gradient">DIFFERENCE.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-zinc-400 font-sans">
            Whether gliding silently across city esplanades or carving alpine passes at high lateral Gs, the X1 dynamically adapts chassis height, damping, and torque bias in milliseconds.
          </p>
        </div>

        {/* Driving Mode Selector Pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {DRIVING_MODES.map((mode, idx) => {
            const isSelected = activeModeIdx === idx;
            return (
              <button
                key={mode.id}
                onClick={() => handleSelectMode(idx)}
                className={`px-6 py-3 rounded-lg text-xs font-mono tracking-widest uppercase transition-all duration-300 border flex items-center gap-2.5 cursor-pointer ${
                  isSelected
                    ? 'glass-panel-gold border-gold-500/50 text-white font-bold shadow-lg'
                    : 'glass-panel border-white/5 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: mode.ambientTone }}
                />
                <span>{mode.name}</span>
              </button>
            );
          })}
        </div>

        {/* Cinematic Large Scene Showcase */}
        <div className="relative rounded-2xl overflow-hidden glass-panel border-white/10 shadow-2xl min-h-[500px] flex flex-col justify-end">
          {/* Background Scene Image with Smooth Crossfade */}
          <div className="absolute inset-0 z-0">
            <img
              src={activeMode.image}
              alt={activeMode.name}
              className="w-full h-full object-cover transition-all duration-700 filter brightness-90 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040407] via-[#040407]/40 to-transparent" />
          </div>

          {/* Floating Telemetry & Scene Description HUD */}
          <div className="relative z-10 p-8 sm:p-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-gold-400 uppercase tracking-widest mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeMode.location} &bull; {activeMode.environment}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white uppercase mb-3">
                {activeMode.name}
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
                {activeMode.description}
              </p>
            </div>

            {/* Live Mode Telemetry Cards */}
            <div className="flex flex-wrap gap-4 glass-panel-gold p-4 sm:p-6 rounded-xl shrink-0">
              <div className="pr-4 border-r border-white/10">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 uppercase">
                  <Gauge className="w-3 h-3 text-gold-400" />
                  <span>TARGET SPEED</span>
                </div>
                <div className="text-xl font-mono font-bold text-white mt-1">
                  {activeMode.topSpeedReached}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 uppercase">
                  <Shield className="w-3 h-3 text-gold-400" />
                  <span>TORQUE SPLIT</span>
                </div>
                <div className="text-xs font-mono font-semibold text-gold-300 mt-1.5 max-w-[140px]">
                  {activeMode.torqueDistribution}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
