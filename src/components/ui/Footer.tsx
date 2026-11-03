import { ArrowUp, Shield } from 'lucide-react';
import { BRAND } from '../../constants/carData';
import { sounds } from '../../utils/soundEffects';

const COPYRIGHT_YEAR = 2026;

export const Footer = () => {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#020204] border-t border-white/10 text-zinc-400 font-sans pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#FFF3C4] via-[#D4AF37] to-[#8A6D1C] p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#09090D] flex items-center justify-center">
                  <span className="font-serif text-sm font-bold text-gold-400">A</span>
                </div>
              </div>
              <span className="font-serif tracking-[0.25em] text-xl font-bold text-white uppercase">
                {BRAND.name}
              </span>
              <span className="text-[10px] tracking-widest font-mono uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-gold-400 border border-amber-500/25">
                {BRAND.model}
              </span>
            </div>
            <p className="font-display tracking-[0.3em] text-xs text-gold-400/90 uppercase font-semibold mb-4">
              {BRAND.tagline}
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mb-6 font-sans">
              The pinnacle of European electric hypercar engineering. Homologated worldwide in an ultra-exclusive production series of 150 commissioned chassis.
            </p>
            <div className="flex items-center gap-3">
              {/* Instagram SVG */}
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold-500/20 hover:text-gold-300 border border-white/10 hover:border-gold-500/40 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* X / Twitter SVG */}
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold-500/20 hover:text-gold-300 border border-white/10 hover:border-gold-500/40 flex items-center justify-center transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* YouTube SVG */}
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold-500/20 hover:text-gold-300 border border-white/10 hover:border-gold-500/40 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* LinkedIn SVG */}
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold-500/20 hover:text-gold-300 border border-white/10 hover:border-gold-500/40 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links Col */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-white uppercase mb-4">
              EXPLORATION
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-mono">
              <li>
                <a href="#hero" className="hover:text-gold-300 transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#the-x1" className="hover:text-gold-300 transition-colors">
                  The X1 Model
                </a>
              </li>
              <li>
                <a href="#design" className="hover:text-gold-300 transition-colors">
                  Design Architecture
                </a>
              </li>
              <li>
                <a href="#performance" className="hover:text-gold-300 transition-colors">
                  Performance Bench
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-gold-300 transition-colors">
                  900V Tech Core
                </a>
              </li>
            </ul>
          </div>

          {/* Experience Links Col */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-white uppercase mb-4">
              STUDIO & ATELIER
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-mono">
              <li>
                <a href="#viewer3d" className="hover:text-gold-300 transition-colors">
                  3D Real-Time Viewer
                </a>
              </li>
              <li>
                <a href="#configurator" className="hover:text-gold-300 transition-colors">
                  Hypercar Atelier
                </a>
              </li>
              <li>
                <a href="#interior" className="hover:text-gold-300 transition-colors">
                  Cockpit Ergonomics
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-gold-300 transition-colors">
                  Driving Modes
                </a>
              </li>
              <li>
                <span className="text-zinc-500">Private Concierge (Geneva)</span>
              </li>
            </ul>
          </div>

          {/* Private Client Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono tracking-widest text-white uppercase mb-2">
              AURELIS PRIVATE DISPATCH
            </h4>
            <p className="text-xs text-zinc-400 mb-4 font-sans">
              Subscribe for confidential prototype testing updates, private circuit invitations, and delivery bulletins.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); sounds.playModeChime(); alert('Thank you. You have been registered for private dispatch.'); }} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="client@domain.com"
                className="flex-1 px-4 py-2.5 rounded bg-white/[0.04] border border-white/10 focus:border-gold-500 text-white placeholder-zinc-600 text-xs font-sans focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded bg-gold-500 hover:bg-gold-400 text-black font-mono font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
              >
                JOIN
              </button>
            </form>
            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
              <Shield className="w-3 h-3 text-gold-400" />
              <span>STRICT 256-BIT CLIENT CONFIDENTIALITY</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-400">
          <div>
            &copy; {COPYRIGHT_YEAR} {BRAND.name} AUTOMOTIVE AG. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-zinc-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-zinc-400 transition-colors">
              Commissioning Terms
            </a>
            <a href="#legal" className="hover:text-zinc-400 transition-colors">
              Homologation Specs
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-gold-400 hover:text-gold-300 transition-colors cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
