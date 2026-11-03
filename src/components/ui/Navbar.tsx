import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ShieldCheck } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface NavbarProps {
  onOpenReserve: () => void;
}

export const Navbar = ({ onOpenReserve }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sounds.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { label: 'OVERVIEW', href: '#hero' },
    { label: 'THE X1', href: '#the-x1' },
    { label: 'DESIGN', href: '#design' },
    { label: 'PERFORMANCE', href: '#performance' },
    { label: 'TECHNOLOGY', href: '#technology' },
    { label: '3D VIEWER', href: '#viewer3d' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CONFIGURATOR', href: '#configurator' },
  ];

  const handleNavClick = (href: string) => {
    sounds.playClick();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#060608]/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#040406]/90 via-[#040406]/40 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Brand Logo & Model */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="group flex items-center gap-3 cursor-pointer select-none"
        >
          {/* Gold Monogram Icon */}
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#FFF3C4] via-[#D4AF37] to-[#8A6D1C] p-[1px] flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#09090D] flex items-center justify-center">
              <span className="font-serif text-sm font-bold text-gold-400 tracking-wider">A</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif tracking-[0.28em] text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                AURELIS
              </span>
              <span className="text-[10px] tracking-widest font-mono uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-gold-400 border border-amber-500/25">
                X1
              </span>
            </div>
            <span className="text-[8px] tracking-[0.35em] uppercase text-zinc-400 font-mono">
              BEYOND MOTION
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-xs font-mono tracking-[0.2em] text-zinc-400 hover:text-white transition-all duration-300 relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound Effects"
            className="p-2 rounded-full border border-white/10 hover:border-gold-500/40 text-zinc-400 hover:text-gold-400 bg-white/5 transition-all duration-300"
            title={isMuted ? 'Unmute Audio Experience' : 'Mute Audio Experience'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-gold-400" />}
          </button>

          {/* Reserve / Configure CTA */}
          <button
            onClick={() => {
              sounds.playClick(1000);
              onOpenReserve();
            }}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-sm text-xs font-mono font-medium tracking-[0.18em] uppercase text-black bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#C5A039] hover:brightness-110 shadow-lg shadow-gold-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>RESERVE X1</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              sounds.playClick();
              setMobileOpen(!mobileOpen);
            }}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 text-zinc-300 hover:text-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#07070A]/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4 animate-in fade-in duration-300">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-sm font-mono tracking-[0.2em] text-zinc-300 hover:text-gold-400 py-2 border-b border-white/5"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenReserve();
            }}
            className="w-full mt-2 py-3 rounded-sm text-center text-xs font-mono font-bold tracking-[0.2em] uppercase text-black bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#C5A039]"
          >
            RESERVE AURELIS X1
          </button>
        </div>
      )}
    </header>
  );
};
