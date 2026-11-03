import { Shield, ChevronRight, Eye } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface FinalCTAProps {
  onConfigureClick: () => void;
  onExploreClick: () => void;
  onOpenReserve: () => void;
}

export const FinalCTA = ({ onConfigureClick, onOpenReserve }: FinalCTAProps) => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center py-28 bg-[#030305] border-t border-white/5 overflow-hidden">
      {/* Dramatic Atmospheric Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_hypercar.jpg"
          alt="AURELIS X1 Launch Silhouette"
          className="w-full h-full object-cover filter brightness-[0.35] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/60 to-[#030305]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.12),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center flex flex-col items-center">
        {/* Allocation Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-gold mb-6 animate-pulse-subtle">
          <span className="w-2 h-2 rounded-full bg-gold-400" />
          <span className="text-xs font-mono tracking-[0.25em] text-gold-300 uppercase">
            GLOBAL ALLOCATION WINDOW ACTIVE &bull; 2027 DELIVERIES
          </span>
        </div>

        {/* Massive Headline */}
        <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white uppercase leading-none mb-6">
          READY TO GO <br />
          <span className="text-gold-gradient">BEYOND?</span>
        </h2>

        <p className="max-w-xl text-base sm:text-lg text-zinc-300 font-sans mb-10 leading-relaxed">
          Commission your bespoke AURELIS X1. Access private studio consultations, virtual wind-tunnel tailoring, and dedicated concierge delivery.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => {
              sounds.playClick(1000);
              onOpenReserve();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#C5A039] text-black font-mono font-bold text-xs tracking-[0.25em] uppercase hover:brightness-110 shadow-xl shadow-gold-500/25 transition-all hover:scale-105 cursor-pointer"
          >
            <Shield className="w-4 h-4" />
            <span>RESERVE YOUR X1</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sounds.playClick(600);
              onConfigureClick();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded glass-panel text-white hover:text-gold-300 font-mono text-xs tracking-[0.25em] uppercase border-white/15 hover:border-gold-500/40 transition-all hover:bg-white/10 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-zinc-400" />
            <span>CONFIGURE SPEC</span>
          </button>
        </div>

        {/* Supporting Legal Note */}
        <p className="mt-8 text-[11px] font-mono text-zinc-500 tracking-wider uppercase">
          Worldwide Homologation &bull; Direct Factory Delivery &bull; Bespoke Warranty
        </p>
      </div>
    </section>
  );
};
