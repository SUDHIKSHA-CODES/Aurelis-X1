import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const InteriorSection = () => {
  const [ambientColor, setAmbientColor] = useState('#D4AF37');

  const ambientThemes = [
    { name: 'Aurelian Gold', hex: '#D4AF37', glow: 'rgba(212,175,55,0.4)' },
    { name: 'Cyber Azure', hex: '#38BDF8', glow: 'rgba(56,189,248,0.4)' },
    { name: 'Alpine Glacier', hex: '#E2E8F0', glow: 'rgba(226,232,240,0.4)' },
    { name: 'Corsa Crimson', hex: '#EF4444', glow: 'rgba(239,68,68,0.4)' },
  ];

  const interiorFeatures = [
    {
      title: 'Aviation-Grade Carbon Yoke',
      desc: 'Formed from continuous forged carbon with integrated tactile touch-points and haptic force feedback.'
    },
    {
      title: 'Curved Floating OLED Cluster',
      desc: 'Driver-centric panoramic 8K display projecting navigation topography, G-meter, and thermal battery telemetry.'
    },
    {
      title: 'Acoustic Glass Photonic Canopy',
      desc: 'Multi-layer laminated smart glass provides 360-degree panoramic sky visibility with 99.4% IR UV thermal rejection.'
    },
    {
      title: 'Bespoke Hand-Stitched Leather',
      desc: 'Selected full-grain European hides stitched with 24-karat gold infused thread across lightweight carbon shells.'
    }
  ];

  return (
    <section id="interior" className="relative w-full py-28 md:py-36 bg-[#060609] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-gold-400 uppercase mb-3">
            <span className="w-6 h-[1px] bg-gold-400" />
            <span>COCKPIT ARCHITECTURE</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
            THE FUTURE, FROM THE <span className="text-gold-gradient">DRIVER'S SEAT.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-sans">
            An ergonomic sanctuary crafted around human intuition. Free of unnecessary clutter, every control is placed within millimetric reach.
          </p>
        </div>

        {/* Cinematic Cockpit Image with Ambient Light Glow Simulation */}
        <div className="relative rounded-2xl overflow-hidden glass-panel border-white/10 shadow-2xl mb-12 group">
          <div className="relative h-[420px] sm:h-[520px] md:h-[620px] w-full overflow-hidden">
            <img
              src="/images/interior_cockpit.jpg"
              alt="AURELIS X1 Cockpit"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dynamic ambient lighting tint overlay */}
            <div
              className="absolute inset-0 transition-all duration-500 pointer-events-none mix-blend-screen opacity-35"
              style={{
                background: `radial-gradient(circle at 50% 65%, ${ambientColor} 0%, transparent 60%)`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060609] via-transparent to-transparent opacity-70 pointer-events-none" />

            {/* Ambient Lighting Theme Selector Overlay */}
            <div className="absolute bottom-6 right-6 glass-panel-gold p-4 rounded-xl flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-widest text-zinc-300 uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                AMBIENT CABIN LIGHTING
              </span>
              <div className="flex items-center gap-2.5">
                {ambientThemes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => {
                      sounds.playClick(800);
                      setAmbientColor(theme.hex);
                    }}
                    className={`w-7 h-7 rounded-full border transition-all cursor-pointer ${
                      ambientColor === theme.hex
                        ? 'border-white scale-110 shadow-lg'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: theme.hex,
                      boxShadow: ambientColor === theme.hex ? `0 0 12px ${theme.hex}` : 'none'
                    }}
                    title={theme.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Architectural Cockpit Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {interiorFeatures.map((feat, idx) => (
            <div key={idx} className="p-6 rounded-xl glass-panel border-white/10 hover:border-gold-500/30 transition-colors">
              <div className="text-xs font-mono text-gold-400 mb-2">0{idx + 1} / COCKPIT</div>
              <h3 className="text-base font-mono font-semibold text-white tracking-wide mb-2">
                {feat.title}
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
