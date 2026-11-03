import { useState } from 'react';
import { Cpu, BatteryCharging, Shield, Radio, Flame, Sparkles } from 'lucide-react';
import { TECH_FEATURES } from '../../constants/carData';
import { sounds } from '../../utils/soundEffects';

export const TechnologySection = () => {
  const [selectedTech, setSelectedTech] = useState(0);

  const techIcons = [Cpu, BatteryCharging, Sparkles, Radio, Flame];

  return (
    <section id="technology" className="relative w-full py-28 md:py-36 bg-[#040407] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-gold-400 uppercase mb-3">
            <span className="w-6 h-[1px] bg-gold-400" />
            <span>NEURAL INNOVATION</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
            INTELLIGENCE <span className="text-gold-gradient">IN MOTION.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-sans">
            Beyond electric propulsion, the AURELIS X1 operates on a unified neural network that synchronizes battery chemistry, chassis dynamics, and real-time aerodynamics at 10,000 Hz.
          </p>
        </div>

        {/* Powertrain Blueprint Cutaway Showcase */}
        <div className="mb-16 rounded-xl overflow-hidden glass-panel border-white/10 relative group">
          <div className="relative h-80 sm:h-96 md:h-[480px] w-full overflow-hidden">
            <img
              src="/images/powertrain_architecture.jpg"
              alt="AURELIS X1 900V Architecture Skateboard Platform"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Overlay Specs Pill */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 glass-panel-gold p-4 sm:p-6 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gold-500 rounded-sm text-black">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                    900V SOLID-STATE SKATEBOARD PLATFORM
                  </h4>
                  <p className="text-xs text-zinc-300 font-sans mt-0.5">
                    140 kWh Net Energy Capacity &bull; Quad Inverter Pushrod Architecture &bull; 450 kW Charging
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xl font-mono font-bold text-gold-300">10–80%</div>
                  <div className="text-[9px] font-mono text-zinc-400 uppercase">IN 12 MINUTES</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-mono font-bold text-gold-300">10,000 HZ</div>
                  <div className="text-[9px] font-mono text-zinc-400 uppercase">NEURAL SAMPLING</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Feature Deep-Dive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {TECH_FEATURES.map((tech, idx) => {
            const Icon = techIcons[idx] || Cpu;
            const isSelected = selectedTech === idx;
            return (
              <div
                key={tech.id}
                onClick={() => {
                  sounds.playClick(700 + idx * 80);
                  setSelectedTech(idx);
                }}
                className={`p-6 rounded-lg transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                  isSelected
                    ? 'glass-panel-gold border-gold-500/50 -translate-y-1 shadow-xl'
                    : 'glass-panel border-white/5 hover:border-white/20 hover:bg-white/[0.03]'
                }`}
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-sm flex items-center justify-center mb-4 transition-colors ${
                      isSelected ? 'bg-gold-500 text-black' : 'bg-white/5 text-zinc-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-mono font-semibold text-white tracking-wider mb-1">
                    {tech.title}
                  </h3>
                  <p className="text-xs text-gold-400/90 font-mono mb-3">{tech.subtitle}</p>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {tech.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-zinc-500 uppercase">SPEC</span>
                  <span className="text-gold-300 font-semibold">{tech.stats}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
