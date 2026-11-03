import { useState } from 'react';
import { Check, Shield, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { COLOR_OPTIONS, WHEEL_OPTIONS, INTERIOR_OPTIONS, BRAND } from '../../constants/carData';
import type { CarConfig, ColorOption, WheelOption, InteriorOption } from '../../types';
import { CarExperienceCanvas } from '../3d/CarExperienceCanvas';
import { sounds } from '../../utils/soundEffects';

interface ConfiguratorSectionProps {
  config: CarConfig;
  onUpdateConfig: (updater: (prev: CarConfig) => CarConfig) => void;
  onOpenReserve: () => void;
}

export const ConfiguratorSection = ({ config, onUpdateConfig, onOpenReserve }: ConfiguratorSectionProps) => {
  const [activeTab, setActiveTab] = useState<'paint' | 'wheels' | 'interior'>('paint');

  const totalPrice =
    BRAND.basePrice +
    config.color.priceDelta +
    config.wheels.priceDelta +
    config.interior.priceDelta;

  const handleSelectColor = (color: ColorOption) => {
    sounds.playClick(600);
    onUpdateConfig((prev) => ({ ...prev, color }));
  };

  const handleSelectWheel = (wheels: WheelOption) => {
    sounds.playClick(750);
    onUpdateConfig((prev) => ({ ...prev, wheels }));
  };

  const handleSelectInterior = (interior: InteriorOption) => {
    sounds.playClick(900);
    onUpdateConfig((prev) => ({ ...prev, interior }));
  };

  return (
    <section id="configurator" className="relative w-full py-28 md:py-36 bg-[#040407] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-gold-400 uppercase mb-3">
              <SlidersHorizontal className="w-4 h-4" />
              <span>ATELIER STUDIO</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
              MAKE IT <span className="text-gold-gradient">YOURS.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-zinc-400 font-sans">
            Tailor every bespoke aspect of your AURELIS X1. Selected finishes and materials render instantly on the live 3D chassis.
          </p>
        </div>

        {/* Configurator 2-Column Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive 3D Real-time Stage */}
          <div className="lg:col-span-7 rounded-2xl glass-panel border-white/10 overflow-hidden relative h-[440px] sm:h-[500px] lg:h-[580px] bg-[#07070B] shadow-2xl">
            <CarExperienceCanvas
              config={config}
              enableOrbit={true}
              enableParallax={false}
              autoRotateSpeed={0.5}
            />

            {/* Floating Live Spec Tag */}
            <div className="absolute top-4 left-4 glass-panel px-4 py-2 rounded-lg border-white/10 flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full border border-white/40 shadow-inner"
                style={{ backgroundColor: config.color.hex }}
              />
              <div className="flex flex-col">
                <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
                  {config.color.name}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  {config.wheels.name} &bull; {config.interior.name}
                </span>
              </div>
            </div>

            {/* Floating Price Pill */}
            <div className="absolute bottom-4 right-4 glass-panel-gold px-5 py-2.5 rounded-lg text-right">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                ESTIMATED MSRP
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-gold-300">
                ${totalPrice.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">USD</span>
              </div>
            </div>
          </div>

          {/* Right: Atelier Customization Controls */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Customization Tabs */}
            <div className="flex rounded-lg p-1 glass-panel border-white/10">
              {(['paint', 'wheels', 'interior'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    sounds.playClick(600);
                    setActiveTab(tab);
                  }}
                  className={`flex-1 py-2.5 rounded text-xs font-mono tracking-widest uppercase transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-gold-500 text-black font-bold shadow-md shadow-gold-500/20'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: Paint Finishes */}
            {activeTab === 'paint' && (
              <div className="flex flex-col gap-3 animate-in fade-in duration-300">
                <div className="text-xs font-mono text-zinc-400 tracking-wider uppercase mb-1">
                  EXTERIOR LACQUER FINISH
                </div>
                {COLOR_OPTIONS.map((color) => {
                  const isSelected = config.color.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => handleSelectColor(color)}
                      className={`text-left p-4 rounded-lg border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'glass-panel-gold border-gold-500/50 shadow-lg'
                          : 'glass-panel border-white/5 hover:border-white/20 hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-8 h-8 rounded-full border border-white/20 shadow-md relative"
                          style={{ backgroundColor: color.hex }}
                        >
                          {isSelected && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Check className="w-4 h-4 text-white drop-shadow-md" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-mono font-semibold text-white tracking-wide">
                            {color.name}
                          </div>
                          <div className="text-[11px] text-zinc-400 font-sans mt-0.5 max-w-xs">
                            {color.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-right pl-3 shrink-0">
                        <span className="text-xs font-mono text-gold-300 font-medium">
                          {color.priceDelta === 0 ? 'INCLUDED' : `+$${color.priceDelta.toLocaleString()}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* TAB CONTENT: Wheels Selection */}
            {activeTab === 'wheels' && (
              <div className="flex flex-col gap-3 animate-in fade-in duration-300">
                <div className="text-xs font-mono text-zinc-400 tracking-wider uppercase mb-1">
                  WHEEL & BRAKE ARCHITECTURE
                </div>
                {WHEEL_OPTIONS.map((wheel) => {
                  const isSelected = config.wheels.id === wheel.id;
                  return (
                    <button
                      key={wheel.id}
                      onClick={() => handleSelectWheel(wheel)}
                      className={`text-left p-4 rounded-lg border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'glass-panel-gold border-gold-500/50 shadow-lg'
                          : 'glass-panel border-white/5 hover:border-white/20 hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/20 flex items-center justify-center text-gold-400 font-mono text-xs">
                          {isSelected ? <Check className="w-4 h-4 text-gold-400" /> : '21"'}
                        </div>
                        <div>
                          <div className="text-sm font-mono font-semibold text-white tracking-wide">
                            {wheel.name}
                          </div>
                          <div className="text-[11px] text-zinc-400 font-sans mt-0.5 max-w-xs">
                            {wheel.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-right pl-3 shrink-0">
                        <span className="text-xs font-mono text-gold-300 font-medium">
                          {wheel.priceDelta === 0 ? 'INCLUDED' : `+$${wheel.priceDelta.toLocaleString()}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* TAB CONTENT: Interior Selection */}
            {activeTab === 'interior' && (
              <div className="flex flex-col gap-3 animate-in fade-in duration-300">
                <div className="text-xs font-mono text-zinc-400 tracking-wider uppercase mb-1">
                  COCKPIT BESPOKE UPHOLSTERY
                </div>
                {INTERIOR_OPTIONS.map((interior) => {
                  const isSelected = config.interior.id === interior.id;
                  return (
                    <button
                      key={interior.id}
                      onClick={() => handleSelectInterior(interior)}
                      className={`text-left p-4 rounded-lg border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'glass-panel-gold border-gold-500/50 shadow-lg'
                          : 'glass-panel border-white/5 hover:border-white/20 hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-8 h-8 rounded-full border border-white/20 shadow-md relative"
                          style={{ backgroundColor: interior.hex }}
                        >
                          {isSelected && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Check className="w-4 h-4 text-gold-400 drop-shadow-md" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-mono font-semibold text-white tracking-wide">
                            {interior.name}
                          </div>
                          <div className="text-[11px] text-zinc-400 font-sans mt-0.5 max-w-xs">
                            {interior.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-right pl-3 shrink-0">
                        <span className="text-xs font-mono text-gold-300 font-medium">
                          {interior.priceDelta === 0 ? 'INCLUDED' : `+$${interior.priceDelta.toLocaleString()}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Configurator Final CTA */}
            <div className="p-6 rounded-xl glass-panel-gold border-gold-500/40 mt-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">TOTAL CONFIGURATION</div>
                  <div className="text-2xl font-mono font-bold text-white">${totalPrice.toLocaleString()} USD</div>
                </div>
                <div className="text-right text-[11px] font-mono text-gold-400">
                  BUILD ALLOCATION: AX1-2027
                </div>
              </div>

              <button
                onClick={() => {
                  sounds.playModeChime();
                  onOpenReserve();
                }}
                className="w-full py-3.5 rounded bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#C5A039] text-black font-mono font-bold text-xs tracking-[0.2em] uppercase hover:brightness-110 shadow-lg shadow-gold-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
              >
                <Shield className="w-4 h-4" />
                <span>REQUEST ALLOCATION FOR THIS SPEC</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
