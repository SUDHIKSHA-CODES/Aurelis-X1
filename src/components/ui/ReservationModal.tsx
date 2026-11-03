import { useState } from 'react';
import { X, ShieldCheck, Sparkles, CheckCircle2, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { CarConfig } from '../../types';
import { BRAND } from '../../constants/carData';
import { sounds } from '../../utils/soundEffects';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CarConfig;
}

export const ReservationModal = ({ isOpen, onClose, config }: ReservationModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('Geneva');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [allocationVin, setAllocationVin] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalPrice =
    BRAND.basePrice +
    config.color.priceDelta +
    config.wheels.priceDelta +
    config.interior.priceDelta;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    // Generate random luxury bespoke VIN
    const randomChassisNum = Math.floor(10 + Math.random() * 89);
    const vin = `AURELIS-X1-2027-CH#${randomChassisNum}`;
    setAllocationVin(vin);
    setIsSubmitted(true);
    sounds.playModeChime();

    // Trigger gold confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFF3C4', '#F6E27A', '#FFFFFF', '#AA820A']
      });
    } catch {}
  };

  const handleCopyVin = () => {
    navigator.clipboard.writeText(allocationVin);
    setCopied(true);
    sounds.playClick(900);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#08080C] border border-gold-500/40 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close Reservation Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-gold-400 uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CONFIDENTIAL CLIENT ALLOCATION</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white uppercase">
                RESERVE YOUR AURELIS X1
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
                Priority allocation window for 2027 delivery. Limited to 150 commissioned chassis.
              </p>
            </div>

            {/* Config Summary Card */}
            <div className="p-4 rounded-xl glass-panel border-white/10 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  COMMISSIONED SPECIFICATION
                </div>
                <div className="text-sm font-mono font-semibold text-white mt-0.5">
                  {config.color.name} &bull; {config.wheels.name}
                </div>
                <div className="text-xs text-gold-400 font-mono mt-0.5">
                  {config.interior.name}
                </div>
              </div>
              <div className="text-right sm:border-l sm:border-white/10 sm:pl-4">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">ESTIMATED TOTAL</div>
                <div className="text-lg font-mono font-bold text-gold-300">
                  ${totalPrice.toLocaleString()} USD
                </div>
              </div>
            </div>

            {/* Reservation Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                  Full Legal Name / Representative
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lord Alexander Vance"
                  className="w-full px-4 py-3 rounded bg-white/[0.04] border border-white/10 focus:border-gold-500 text-white placeholder-zinc-600 text-sm font-sans focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                  Private Concierge Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alexander@vance-holdings.com"
                  className="w-full px-4 py-3 rounded bg-white/[0.04] border border-white/10 focus:border-gold-500 text-white placeholder-zinc-600 text-sm font-sans focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                  Preferred Delivery Atelier & Region
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-3 rounded bg-[#0D0D12] border border-white/10 focus:border-gold-500 text-white text-sm font-sans focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="Geneva">Geneva Atelier (Switzerland)</option>
                  <option value="Monaco">Monaco Yacht Club Concierge (Monaco)</option>
                  <option value="London">Mayfair Private Lounge (London, UK)</option>
                  <option value="Zurich">Zurich Aerodrome (Switzerland)</option>
                  <option value="Dubai">Dubai DIFC Private Suite (UAE)</option>
                  <option value="BeverlyHills">Beverly Hills Private Atelier (USA)</option>
                  <option value="Tokyo">Tokyo Ginza Studio (Japan)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 p-3 rounded bg-white/[0.02] border border-white/5 mt-2">
                <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
                <p className="text-[11px] text-zinc-400 font-sans leading-tight">
                  No immediate commitment fee required. An AURELIS Private Client Executive will contact you within 24 hours with your commissioning packet.
                </p>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-4 rounded bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#C5A039] text-black font-mono font-bold text-xs tracking-[0.25em] uppercase hover:brightness-110 shadow-lg shadow-gold-500/20 transition-all hover:scale-[1.01] cursor-pointer"
              >
                SUBMIT BESPOKE ALLOCATION REQUEST
              </button>
            </form>
          </div>
        ) : (
          /* Allocation Certificate Success View */
          <div className="text-center py-6 animate-in zoom-in-95 duration-500 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/40 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-gold-400" />
            </div>

            <div className="text-xs font-mono tracking-widest text-gold-400 uppercase mb-2">
              COMMISSION ALLOCATION CONFIRMED
            </div>
            <h3 className="text-3xl font-serif font-bold text-white uppercase mb-2">
              WELCOME TO AURELIS, {name.toUpperCase()}
            </h3>
            <p className="text-sm text-zinc-300 font-sans max-w-md mb-6">
              Your official provisional chassis slot has been registered. An encrypted portfolio has been dispatched to <span className="text-white font-medium">{email}</span>.
            </p>

            {/* Digital VIN Plaque */}
            <div className="w-full p-6 rounded-xl glass-panel-gold border-gold-500/50 mb-6 flex flex-col items-center gap-3">
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                PROVISIONAL ALLOCATION VIN
              </span>
              <div className="text-xl sm:text-2xl font-mono font-bold text-gold-300 tracking-wider">
                {allocationVin}
              </div>
              <button
                onClick={handleCopyVin}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded glass-panel text-[11px] font-mono text-zinc-300 hover:text-white hover:border-gold-500/40 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-gold-400" />
                <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY VIN NUMBER'}</span>
              </button>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                setIsSubmitted(false);
                onClose();
              }}
              className="px-8 py-3 rounded glass-panel text-white hover:text-gold-300 text-xs font-mono tracking-widest uppercase border-white/20 transition-colors cursor-pointer"
            >
              RETURN TO SHOWROOM
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
