import { useState } from 'react';
import { Navbar } from './components/ui/Navbar';
import { Hero } from './components/ui/Hero';
import { TheX1 } from './components/ui/TheX1';
import { DesignSection } from './components/ui/DesignSection';
import { PerformanceSection } from './components/ui/PerformanceSection';
import { TechnologySection } from './components/ui/TechnologySection';
import { Viewer3DSection } from './components/ui/Viewer3DSection';
import { ConfiguratorSection } from './components/ui/ConfiguratorSection';
import { InteriorSection } from './components/ui/InteriorSection';
import { ExperienceSection } from './components/ui/ExperienceSection';
import { FutureSection } from './components/ui/FutureSection';
import { FinalCTA } from './components/ui/FinalCTA';
import { Footer } from './components/ui/Footer';
import { ReservationModal } from './components/ui/ReservationModal';
import { COLOR_OPTIONS, WHEEL_OPTIONS, INTERIOR_OPTIONS } from './constants/carData';
import type { CarConfig } from './types';
import { sounds } from './utils/soundEffects';

export function App() {
  const [config, setConfig] = useState<CarConfig>({
    color: COLOR_OPTIONS[0],
    wheels: WHEEL_OPTIONS[0],
    interior: INTERIOR_OPTIONS[0],
    headlightsOn: true,
    spoilerRaised: false,
    wireframeMode: false,
    activePreset: 'EXTERIOR'
  });

  const [reserveModalOpen, setReserveModalOpen] = useState(false);

  const handleOpenReserve = () => {
    setReserveModalOpen(true);
  };

  const handleCloseReserve = () => {
    setReserveModalOpen(false);
  };

  const scrollToSection = (id: string) => {
    sounds.playClick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#040406] text-[#EDEDED] font-sans antialiased selection:bg-[#D4AF37] selection:text-black">
      {/* Dynamic Floating Navbar */}
      <Navbar onOpenReserve={handleOpenReserve} />

      {/* Main Page Sections */}
      <main>
        {/* 1. Full Viewport Hero with 3D Car Model */}
        <Hero
          config={config}
          onExploreClick={() => scrollToSection('the-x1')}
          onConfigureClick={() => scrollToSection('configurator')}
        />

        {/* 2. The X1 Introduction & Animated Specs */}
        <TheX1 />

        {/* 3. Exterior Design Highlights & Aerodynamics */}
        <DesignSection />

        {/* 4. Performance Bench & 0–100 Launch Simulator */}
        <PerformanceSection />

        {/* 5. 900V Architecture & Neural Technology */}
        <TechnologySection />

        {/* 6. Dedicated Interactive 3D Studio Viewer */}
        <Viewer3DSection
          config={config}
          onUpdateConfig={setConfig}
        />

        {/* 7. Hypercar Atelier 3D Configurator */}
        <ConfiguratorSection
          config={config}
          onUpdateConfig={setConfig}
          onOpenReserve={handleOpenReserve}
        />

        {/* 8. Ergonomic Cockpit Interior Exploration */}
        <InteriorSection />

        {/* 9. Dynamic Driving Modes & Environments */}
        <ExperienceSection />

        {/* 10. The Future & Sustainability Philosophy */}
        <FutureSection />

        {/* 11. Final Cinematic Call-to-Action */}
        <FinalCTA
          onConfigureClick={() => scrollToSection('configurator')}
          onExploreClick={() => scrollToSection('the-x1')}
          onOpenReserve={handleOpenReserve}
        />
      </main>

      {/* 12. European Luxury Footer */}
      <Footer />

      {/* Bespoke Reservation & Allocation Dialog */}
      <ReservationModal
        isOpen={reserveModalOpen}
        onClose={handleCloseReserve}
        config={config}
      />
    </div>
  );
}

export default App;
