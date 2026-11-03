import { useState } from 'react';
import { RotateCw, Lightbulb, Sparkles, Layers, Compass, Move } from 'lucide-react';
import { CarExperienceCanvas } from '../3d/CarExperienceCanvas';
import type { CarConfig, CameraPreset } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface Viewer3DSectionProps {
  config: CarConfig;
  onUpdateConfig: (updater: (prev: CarConfig) => CarConfig) => void;
}

export const Viewer3DSection = ({ config, onUpdateConfig }: Viewer3DSectionProps) => {
  const [autoRotate, setAutoRotate] = useState(false);

  const presets: { id: CameraPreset; label: string; desc: string }[] = [
    { id: 'EXTERIOR', label: 'EXTERIOR', desc: '3/4 Perspective Hero' },
    { id: 'FRONT', label: 'FRONT', desc: 'Laser Optics & Splitter' },
    { id: 'SIDE', label: 'SIDE', desc: 'Aero Silhouette Profile' },
    { id: 'REAR', label: 'REAR', desc: 'Active Wing & Diffuser' },
    { id: 'COCKPIT', label: 'COCKPIT', desc: 'Glass Canopy Interior' },
    { id: 'WHEEL', label: 'WHEELS', desc: 'Bespoke Turbine Blades' },
  ];

  const handlePresetChange = (preset: CameraPreset) => {
    sounds.playClick(650);
    onUpdateConfig((prev) => ({ ...prev, activePreset: preset }));
  };

  const handleToggleHeadlights = () => {
    const nextState = !config.headlightsOn;
    sounds.playLaserLights(nextState);
    onUpdateConfig((prev) => ({ ...prev, headlightsOn: nextState }));
  };

  const handleToggleSpoiler = () => {
    sounds.playAeroServo();
    onUpdateConfig((prev) => ({ ...prev, spoilerRaised: !prev.spoilerRaised }));
  };

  const handleToggleWireframe = () => {
    sounds.playClick(900);
    onUpdateConfig((prev) => ({ ...prev, wireframeMode: !prev.wireframeMode }));
  };

  const handleToggleAutoRotate = () => {
    sounds.playClick(750);
    setAutoRotate(!autoRotate);
  };

  return (
    <section id="viewer3d" className="relative w-full py-28 md:py-36 bg-[#030305] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-gold-400 uppercase mb-3">
              <Compass className="w-4 h-4" />
              <span>INTERACTIVE 3D STUDIO</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
              THE 3D <span className="text-gold-gradient">EXPERIENCE.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-zinc-400 font-sans">
            Inspect the AURELIS X1 in full real-time three-dimensional detail. Rotate, zoom, trigger dynamic active aerodynamics, and toggle laser illumination.
          </p>
        </div>

        {/* 3D Canvas Stage Container */}
        <div className="relative w-full h-[580px] sm:h-[640px] md:h-[720px] rounded-2xl glass-panel border-white/10 overflow-hidden shadow-2xl bg-gradient-to-b from-[#08080C] to-[#040406]">
          {/* Main 3D Canvas */}
          <CarExperienceCanvas
            config={config}
            enableOrbit={true}
            enableParallax={false}
            autoRotateSpeed={autoRotate ? 1.2 : 0}
          />

          {/* Top Floating Control Bar: Angles / Presets */}
          <div className="absolute top-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-20">
            <div className="flex items-center gap-1.5 p-1.5 rounded-lg glass-panel-gold pointer-events-auto overflow-x-auto max-w-full">
              {presets.map((p) => {
                const isActive = config.activePreset === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handlePresetChange(p.id)}
                    className={`px-3 py-1.5 rounded text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-gold-500 text-black font-bold shadow-md shadow-gold-500/30'
                        : 'text-zinc-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            {/* Interaction Hint */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded glass-panel text-[10px] font-mono text-zinc-400 border-white/10">
              <Move className="w-3.5 h-3.5 text-gold-400" />
              <span>DRAG TO ROTATE &bull; PINCH / SCROLL TO ZOOM</span>
            </div>
          </div>

          {/* Bottom Floating Interactive Feature Buttons */}
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-20">
            <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
              {/* Headlights Toggle */}
              <button
                onClick={handleToggleHeadlights}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase border transition-all cursor-pointer ${
                  config.headlightsOn
                    ? 'bg-gold-500/20 text-gold-300 border-gold-500/60 shadow-lg shadow-gold-500/20'
                    : 'glass-panel text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <Lightbulb className={`w-4 h-4 ${config.headlightsOn ? 'text-gold-400 animate-pulse' : ''}`} />
                <span>LIGHTS: {config.headlightsOn ? 'ON' : 'OFF'}</span>
              </button>

              {/* Active Rear Aero Spoiler Toggle */}
              <button
                onClick={handleToggleSpoiler}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase border transition-all cursor-pointer ${
                  config.spoilerRaised
                    ? 'bg-gold-500/20 text-gold-300 border-gold-500/60 shadow-lg shadow-gold-500/20'
                    : 'glass-panel text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>AERO SPOILER: {config.spoilerRaised ? 'DEPLOYED (850KG)' : 'STOWED'}</span>
              </button>

              {/* CAD Wireframe Inspection Toggle */}
              <button
                onClick={handleToggleWireframe}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase border transition-all cursor-pointer ${
                  config.wireframeMode
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60'
                    : 'glass-panel text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>CAD MESH: {config.wireframeMode ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* Auto-Turntable Button */}
            <button
              onClick={handleToggleAutoRotate}
              className={`pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase border transition-all cursor-pointer ${
                autoRotate
                  ? 'bg-gold-500 text-black font-bold shadow-md shadow-gold-500/30'
                  : 'glass-panel text-zinc-400 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
              <span>{autoRotate ? 'TURNTABLE ACTIVE' : 'AUTO-ROTATE'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
