import { useState } from 'react';
import { Eye, Disc, Wind, Sparkles, Sliders } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const DesignSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const designHighlights = [
    {
      id: 'aero-body',
      icon: Wind,
      title: 'Sculpted Aerodynamic Body',
      subtitle: '0.19 Cd Drag Efficiency',
      description:
        'Continuous carbon weave surfacing curves fluidly from the front air extractors to the rear diffuser, creating laminar airflow channels that minimize atmospheric drag while generating immense lateral stability.',
      image: '/images/aerodynamics_tunnel.jpg',
      stat: '0.19 Cd',
      statLabel: 'Drag Coefficient'
    },
    {
      id: 'gold-leds',
      icon: Sparkles,
      title: 'Ultra-Thin Gold Laser Headlights',
      subtitle: '600m Adaptive Beam Projection',
      description:
        'Micro-laser optics framed by brushed Aurelian gold trim project crisp daytime signatures and intelligent corner-illuminating high beams with zero glare for oncoming traffic.',
      image: '/images/hero_hypercar.jpg',
      stat: '600 M',
      statLabel: 'Beam Range'
    },
    {
      id: 'active-aero',
      icon: Sliders,
      title: 'Active Aerodynamics System',
      subtitle: 'Dynamic Dual-Plane Wing & Venturi Tunnels',
      description:
        'Twin electro-hydraulic actuators adjust the rear carbon wing through 3 distinct aero modes: Low Drag (V-Max), High Downforce (850kg @ 300km/h), and Airbrake (60° tilt for emergency deceleration).',
      image: '/images/driving_scene.jpg',
      stat: '850 KG',
      statLabel: 'Peak Downforce'
    },
    {
      id: 'glass-cockpit',
      icon: Eye,
      title: 'Panoramic Glass Cockpit',
      subtitle: 'Electrochromic Photonic Canopy',
      description:
        'A single continuous sweep of dual-laminated acoustic glass curves over the cockpit, offering fighter-jet visibility with instant electrochromic opacity tinting at the touch of a sensor.',
      image: '/images/interior_cockpit.jpg',
      stat: '99.4%',
      statLabel: 'UV & IR Shield'
    },
    {
      id: 'futuristic-wheels',
      icon: Disc,
      title: 'Futuristic Turbine Wheels',
      subtitle: 'Forged Monoblock & Carbon Blades',
      description:
        'Directional carbon aero blades extract turbulent air directly from the wheel wells, cooling the 420mm carbon-ceramic brake discs while reducing unsprung mass by 19.2 kg across all four corners.',
      image: '/images/powertrain_architecture.jpg',
      stat: '19.2 KG',
      statLabel: 'Unsprung Mass Saved'
    }
  ];

  return (
    <section id="design" className="relative w-full py-28 md:py-36 bg-[#040407] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-gold-400 uppercase mb-3">
              <span className="w-6 h-[1px] bg-gold-400" />
              <span>EXTERIOR AESTHETICS</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
              FORM FOLLOWS <span className="text-gold-gradient">VELOCITY.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-zinc-400 font-sans">
            Every curve and contour is sculpted by high-speed airflow dynamics, marrying brutal aerodynamic necessity with timeless European elegance.
          </p>
        </div>

        {/* Interactive Feature Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Feature List Selector Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {designHighlights.map((feature, idx) => {
              const Icon = feature.icon;
              const isActive = activeFeature === idx;
              return (
                <button
                  key={feature.id}
                  onClick={() => {
                    sounds.playClick(600 + idx * 100);
                    setActiveFeature(idx);
                  }}
                  className={`text-left p-5 rounded-lg transition-all duration-300 border flex items-start gap-4 ${
                    isActive
                      ? 'glass-panel-gold border-gold-500/40 translate-x-2'
                      : 'glass-panel border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-sm transition-colors ${
                      isActive ? 'bg-gold-500 text-black' : 'bg-white/5 text-zinc-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-mono font-semibold tracking-wider ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                        {feature.title}
                      </h3>
                      {isActive && (
                        <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {feature.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feature Detail Showcase Card & Cinematic Image */}
          <div className="lg:col-span-7 rounded-xl overflow-hidden glass-panel border-white/10 relative flex flex-col justify-between min-h-[460px]">
            {/* Background Image of Selected Highlight */}
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <img
                src={designHighlights[activeFeature].image}
                alt={designHighlights[activeFeature].title}
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090E] via-[#09090E]/30 to-transparent pointer-events-none" />

              {/* Floating Stat Badge */}
              <div className="absolute top-4 right-4 glass-panel p-3 rounded-lg border-gold-500/30 text-right">
                <div className="text-2xl font-mono font-bold text-gold-300">
                  {designHighlights[activeFeature].stat}
                </div>
                <div className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
                  {designHighlights[activeFeature].statLabel}
                </div>
              </div>
            </div>

            {/* Description Body */}
            <div className="p-6 md:p-8 bg-[#09090E]/90 backdrop-blur-md border-t border-white/10">
              <div className="text-xs font-mono tracking-[0.2em] text-gold-400 uppercase mb-2">
                {designHighlights[activeFeature].subtitle}
              </div>
              <h4 className="text-xl md:text-2xl font-serif font-bold text-white mb-3">
                {designHighlights[activeFeature].title}
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                {designHighlights[activeFeature].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
