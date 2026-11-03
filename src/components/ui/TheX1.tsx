import { useEffect, useRef, useState } from 'react';
import { Shield, Zap, Gauge, Navigation, Cpu } from 'lucide-react';
import { SPECS, BRAND } from '../../constants/carData';

export const TheX1 = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="the-x1"
      ref={sectionRef}
      className="relative w-full py-28 md:py-36 bg-[#060609] border-t border-white/5 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-gold-400 uppercase mb-3">
            <span className="w-6 h-[1px] bg-gold-400" />
            <span>THE ARCHITECTURE</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
            ENGINEERED <span className="text-gold-gradient">BEYOND LIMITS.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-sans leading-relaxed">
            The {BRAND.name} {BRAND.model} represents the uncompromised synthesis of raw electric force and bespoke European craftsmanship. Designed without legacy constraints, every millimeter serves a singular objective: pure, uninterrupted velocity.
          </p>
        </div>

        {/* Split Cinematic Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: High-Res Cinematic Visual */}
          <div className="lg:col-span-7 relative group rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-[#0B0B10]">
            <img
              src="/images/hero_hypercar.jpg"
              alt="Aurelis X1 Studio Profile"
              className="w-full h-auto object-cover transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060609] via-transparent to-transparent opacity-60 pointer-events-none" />
            
            {/* Technical Watermark */}
            <div className="absolute top-4 left-4 glass-panel px-3 py-1.5 rounded text-[10px] font-mono tracking-widest text-zinc-300">
              CHASSIS CODE: <span className="text-gold-400">AX1-CARBON-01</span>
            </div>
          </div>

          {/* Right Column: Concept Specifications & Performance Metrics */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-lg glass-panel border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-4 flex items-center justify-between">
                <span>KEY SPECIFICATIONS</span>
                <span className="text-gold-400 font-semibold">HOMOLOGATED METRICS</span>
              </div>

              {/* 4 Primary Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* 1200 HP */}
                <div className="p-4 rounded bg-white/[0.03] border border-white/5 hover:border-gold-500/30 transition-colors">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                    <Zap className="w-3.5 h-3.5 text-gold-400" />
                    <span>{SPECS.hp.label}</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-white">
                    {hasAnimated ? SPECS.hp.value : '0'} <span className="text-sm text-gold-400 font-normal">{SPECS.hp.unit}</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-1">{SPECS.hp.sub}</div>
                </div>

                {/* 0-100 1.9 SEC */}
                <div className="p-4 rounded bg-white/[0.03] border border-white/5 hover:border-gold-500/30 transition-colors">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                    <Gauge className="w-3.5 h-3.5 text-gold-400" />
                    <span>{SPECS.acceleration.label}</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-white">
                    {hasAnimated ? SPECS.acceleration.value : '0.0'} <span className="text-sm text-gold-400 font-normal">{SPECS.acceleration.unit}</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-1">{SPECS.acceleration.sub}</div>
                </div>

                {/* 380 KM/H */}
                <div className="p-4 rounded bg-white/[0.03] border border-white/5 hover:border-gold-500/30 transition-colors">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                    <Cpu className="w-3.5 h-3.5 text-gold-400" />
                    <span>{SPECS.topSpeed.label}</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-white">
                    {hasAnimated ? SPECS.topSpeed.value : '0'} <span className="text-sm text-gold-400 font-normal">{SPECS.topSpeed.unit}</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-1">{SPECS.topSpeed.sub}</div>
                </div>

                {/* 800 KM RANGE */}
                <div className="p-4 rounded bg-white/[0.03] border border-white/5 hover:border-gold-500/30 transition-colors">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                    <Navigation className="w-3.5 h-3.5 text-gold-400" />
                    <span>{SPECS.range.label}</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-white">
                    {hasAnimated ? SPECS.range.value : '0'} <span className="text-sm text-gold-400 font-normal">{SPECS.range.unit}</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-1">{SPECS.range.sub}</div>
                </div>
              </div>
            </div>

            {/* Monocoque Build Spec Banner */}
            <div className="flex items-center gap-4 p-4 rounded-lg border border-white/10 bg-white/[0.02]">
              <Shield className="w-8 h-8 text-gold-400 shrink-0" />
              <div>
                <h4 className="text-sm font-mono font-semibold text-white tracking-wider">FULL T1000 CARBON MONOCOQUE</h4>
                <p className="text-xs text-zinc-400 mt-0.5 font-sans">
                  Torsional rigidity of 65,000 Nm/degree with an ultra-lightweight dry chassis mass of only 198 kg.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
