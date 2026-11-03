import { useState } from 'react';
import { Play, RotateCcw, Activity } from 'lucide-react';
import { SPECS } from '../../constants/carData';
import { sounds } from '../../utils/soundEffects';

export const PerformanceSection = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gForce, setGForce] = useState(0);
  const [simCompleted, setSimCompleted] = useState(false);

  const startLaunchTest = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimCompleted(false);
    setSpeed(0);
    setElapsedTime(0);
    setGForce(0);

    sounds.playAccelerationSpool();

    const startTime = performance.now();

    const interval = setInterval(() => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;

      if (elapsed >= 1.9) {
        setSpeed(100);
        setElapsedTime(1.90);
        setGForce(1.48);
        setIsSimulating(false);
        setSimCompleted(true);
        clearInterval(interval);
      } else {
        const progress = elapsed / 1.9;
        // Non-linear electric torque curve: exponential bite
        const currentSpeed = Math.min(100, Math.floor(Math.pow(progress, 0.85) * 100));
        const currentG = Number((1.2 + Math.sin(progress * Math.PI) * 0.35).toFixed(2));
        setSpeed(currentSpeed);
        setElapsedTime(Number(elapsed.toFixed(2)));
        setGForce(currentG);
      }
    }, 25);
  };

  const resetTest = () => {
    sounds.playClick(500);
    setSpeed(0);
    setElapsedTime(0);
    setGForce(0);
    setSimCompleted(false);
  };

  return (
    <section id="performance" className="relative w-full py-28 md:py-36 bg-[#06060A] border-t border-white/5 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute right-0 top-1/3 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-gold-400 uppercase mb-3">
            <span className="w-6 h-[1px] bg-gold-400" />
            <span>DYNAMIC CAPABILITIES</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white uppercase leading-none">
            PURE ELECTRIC <span className="text-gold-gradient">FORCE.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-sans">
            Four bespoke axial-flux electric motors deliver instant, unhesitating torque to all four wheels. Zero turbo lag. Zero gear changes. Pure instantaneous momentum.
          </p>
        </div>

        {/* 4 Massive Typographic Stat Banners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-8 rounded-xl glass-panel border-white/10 relative overflow-hidden group hover:border-gold-500/30 transition-all">
            <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-2">MAXIMUM OUTPUT</div>
            <div className="text-5xl sm:text-6xl font-mono font-bold text-white tracking-tight">
              {SPECS.hp.value} <span className="text-xl text-gold-400 font-light">{SPECS.hp.unit}</span>
            </div>
            <p className="text-xs text-zinc-400 mt-3 font-sans">{SPECS.hp.sub}</p>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          </div>

          <div className="p-8 rounded-xl glass-panel border-white/10 relative overflow-hidden group hover:border-gold-500/30 transition-all">
            <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-2">ACCELERATION (0–100)</div>
            <div className="text-5xl sm:text-6xl font-mono font-bold text-white tracking-tight">
              {SPECS.acceleration.value} <span className="text-xl text-gold-400 font-light">{SPECS.acceleration.unit}</span>
            </div>
            <p className="text-xs text-zinc-400 mt-3 font-sans">{SPECS.acceleration.sub}</p>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          </div>

          <div className="p-8 rounded-xl glass-panel border-white/10 relative overflow-hidden group hover:border-gold-500/30 transition-all">
            <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-2">TERMINAL VELOCITY</div>
            <div className="text-5xl sm:text-6xl font-mono font-bold text-white tracking-tight">
              {SPECS.topSpeed.value} <span className="text-xl text-gold-400 font-light">{SPECS.topSpeed.unit}</span>
            </div>
            <p className="text-xs text-zinc-400 mt-3 font-sans">{SPECS.topSpeed.sub}</p>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          </div>

          <div className="p-8 rounded-xl glass-panel border-white/10 relative overflow-hidden group hover:border-gold-500/30 transition-all">
            <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-2">WLTP CRUISE RANGE</div>
            <div className="text-5xl sm:text-6xl font-mono font-bold text-white tracking-tight">
              {SPECS.range.value} <span className="text-xl text-gold-400 font-light">{SPECS.range.unit}</span>
            </div>
            <p className="text-xs text-zinc-400 mt-3 font-sans">{SPECS.range.sub}</p>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          </div>
        </div>

        {/* Live Launch Control Telemetry Simulator Card */}
        <div className="rounded-2xl glass-panel border-gold-500/30 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Info */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-mono mb-4">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>INTERACTIVE LAUNCH TELEMETRY BENCH</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white uppercase mb-3">
                0–100 KM/H BENCHMARK IN 1.9 SECONDS
              </h3>
              <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                Test the sub-2.0s launch acceleration under full torque vectoring load. Watch the digital speedometer and longitudinal G-Force curve ramp in real-time.
              </p>
              
              {/* Simulator Action Controls */}
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={startLaunchTest}
                  disabled={isSimulating}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-lg cursor-pointer ${
                    isSimulating
                      ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#C5A039] text-black hover:brightness-110 shadow-gold-500/20 hover:scale-105'
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isSimulating ? 'ACCELERATING...' : 'ENGAGE LAUNCH CONTROL'}</span>
                </button>

                {(simCompleted || speed > 0) && (
                  <button
                    onClick={resetTest}
                    className="p-3 rounded border border-white/15 hover:border-white/40 text-zinc-300 hover:text-white bg-white/5 transition-colors cursor-pointer"
                    title="Reset Simulator"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Telemetry Dial & Digital Gauges */}
            <div className="w-full lg:w-96 flex flex-col gap-4 bg-[#08080C] p-6 rounded-xl border border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">TELEMETRY DATA</span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  900V READY
                </span>
              </div>

              {/* Digital Speedometer */}
              <div className="text-center py-4 bg-white/[0.02] rounded-lg border border-white/5">
                <div className="text-6xl font-mono font-bold text-white tracking-tighter tabular-nums">
                  {speed}
                </div>
                <div className="text-xs font-mono tracking-widest text-gold-400 uppercase mt-1">KM / H</div>
              </div>

              {/* Progress Speed Bar */}
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-gold-400 to-yellow-200 transition-all duration-75"
                  style={{ width: `${speed}%` }}
                />
              </div>

              {/* Sub Gauges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded bg-white/[0.03] border border-white/5">
                  <div className="text-[9px] font-mono text-zinc-400 uppercase">TIME ELAPSED</div>
                  <div className="text-xl font-mono font-bold text-white mt-0.5 tabular-nums">
                    {elapsedTime.toFixed(2)}s
                  </div>
                </div>
                <div className="p-3 rounded bg-white/[0.03] border border-white/5">
                  <div className="text-[9px] font-mono text-zinc-400 uppercase">PEAK G-FORCE</div>
                  <div className="text-xl font-mono font-bold text-gold-300 mt-0.5 tabular-nums">
                    {gForce} G
                  </div>
                </div>
              </div>

              {simCompleted && (
                <div className="text-center text-xs font-mono text-gold-300 bg-gold-500/10 py-2 rounded border border-gold-500/30 animate-in fade-in">
                  TARGET ACHIEVED: 0–100 IN 1.90 SEC
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
