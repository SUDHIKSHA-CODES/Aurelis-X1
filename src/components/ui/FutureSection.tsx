import { Sparkles, Globe, ShieldCheck } from 'lucide-react';
import { BRAND } from '../../constants/carData';

export const FutureSection = () => {
  return (
    <section className="relative w-full py-28 md:py-36 bg-[#060609] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Vision Statement */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-gold-400 uppercase mb-3">
              <Sparkles className="w-4 h-4" />
              <span>THE PHILOSOPHY</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
              THE FUTURE IS <span className="text-gold-gradient">ALREADY MOVING.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
              At {BRAND.name}, we do not believe in incremental evolution. The X1 is an uncompromising testament to zero-emission hyper-performance — combining recyclable aerospace-grade carbon structures, conflict-free solid electrolytes, and timeless artisan coachbuilding.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-6 pt-6 border-t border-white/10">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-gold-400 mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-mono font-semibold text-white">100% CIRCULAR CARBON</h4>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">Recycled autoclave fibers with bio-resin matrix.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-gold-400 mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-mono font-semibold text-white">150 BESPOKE COMMISSIONS</h4>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">Each chassis individually numbered and certified.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Quote / Bespoke Plaque Card */}
          <div className="lg:col-span-6 glass-panel-gold p-8 sm:p-12 rounded-2xl relative overflow-hidden">
            <div className="text-6xl font-serif text-gold-400/20 absolute top-4 left-6 pointer-events-none select-none">
              “
            </div>
            <blockquote className="text-xl sm:text-2xl font-serif italic text-zinc-200 relative z-10 leading-relaxed pt-6">
              True luxury in the post-electric era is not merely speed, but the absolute harmony between razor-sharp aerodynamic precision and soulful emotional connection.
            </blockquote>
            <div className="mt-8 pt-6 border-t border-gold-500/30 flex items-center justify-between">
              <div>
                <div className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                  MARCUS VON AUREL
                </div>
                <div className="text-xs font-mono text-gold-400">Chief Design Director &bull; Geneva Atelier</div>
              </div>
              <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center text-gold-400 font-serif font-bold text-lg">
                A
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
