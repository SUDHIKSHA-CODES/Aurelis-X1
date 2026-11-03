import { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import type { CarConfig } from '../../types';
import { CarModelLoader } from './CarModelLoader';
import { LightingStudio } from './LightingStudio';
import { CameraRig } from './CameraRig';

interface CarExperienceCanvasProps {
  config: CarConfig;
  className?: string;
  enableOrbit?: boolean;
  enableParallax?: boolean;
  autoRotateSpeed?: number;
  isDriving?: boolean;
  imageAlt?: string;
}

export const CarExperienceCanvas = ({
  config,
  className = 'w-full h-full min-h-[450px]',
  enableOrbit = true,
  enableParallax = false,
  autoRotateSpeed = 0,
  isDriving = false
}: CarExperienceCanvasProps) => {
  const [glbAvailable, setGlbAvailable] = useState<boolean | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if actual 3D GLB model exists at /public/models/AURELIS-X1.glb
  useEffect(() => {
    fetch('/models/AURELIS-X1.glb', { method: 'HEAD' })
      .then((res) => {
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && (contentType.includes('model') || contentType.includes('octet-stream') || res.status === 200)) {
          setGlbAvailable(true);
        } else {
          setGlbAvailable(false);
        }
      })
      .catch(() => {
        setGlbAvailable(false);
      });
  }, []);

  // Smooth mouse parallax movement for realistic depth
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // If actual GLB file exists, render full interactive Three.js 3D Canvas
  if (glbAvailable === true) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: true
          }}
          camera={{ position: [3.6, 1.25, 4.0], fov: 40 }}
        >
          <Suspense fallback={null}>
            <LightingStudio headlightsOn={config.headlightsOn} />
            <CarModelLoader config={config} autoRotate={false} isDriving={isDriving} />
            <CameraRig
              preset={config.activePreset}
              enableOrbit={enableOrbit}
              enableParallax={enableParallax}
              autoRotateSpeed={autoRotateSpeed}
            />
          </Suspense>
        </Canvas>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#040406] via-[#040406]/60 to-transparent pointer-events-none" />
      </div>
    );
  }

  // Mastercrafted Photorealistic Studio Presentation (Awaiting GLB)
  const tiltX = enableParallax ? mousePos.y * -8 : 0;
  const tiltY = enableParallax ? mousePos.x * 12 : 0;
  const transX = enableParallax ? mousePos.x * 18 : 0;
  const transY = enableParallax ? mousePos.y * 10 : 0;

  // Dynamic color tint overlay style
  const colorOverlayStyle: React.CSSProperties = {
    backgroundColor:
      config.color.id === 'aurelian-gold'
        ? 'rgba(212, 175, 55, 0.16)'
        : config.color.id === 'titanium-silver'
        ? 'rgba(180, 190, 205, 0.14)'
        : config.color.id === 'monaco-pearl'
        ? 'rgba(240, 240, 255, 0.18)'
        : config.color.id === 'emerald-carbon'
        ? 'rgba(15, 60, 40, 0.22)'
        : 'transparent',
    mixBlendMode: 'color-dodge' as const
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center overflow-hidden select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* 1. Dark Cinematic Studio Ambient Backing */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#040406]/70 to-[#040406] pointer-events-none z-10" />

      {/* 2. Overhead Softbox Studio Light Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px] bg-gradient-to-b from-white/10 via-gold-400/5 to-transparent blur-3xl rounded-full pointer-events-none transition-all duration-700"
        style={{
          transform: `translate(calc(-50% + ${transX * 0.5}px), calc(-50% + ${transY * 0.5}px))`
        }}
      />

      {/* 3. Golden Rim Light Accent Flare */}
      <div
        className="absolute top-1/3 right-1/4 w-[400px] h-[220px] bg-gold-500/10 blur-2xl rounded-full pointer-events-none transition-all duration-500"
        style={{
          transform: `translate(${transX * -0.6}px, ${transY * -0.6}px)`
        }}
      />

      {/* 4. Main Vehicle Visual Container with 3D Parallax Tilt */}
      <div
        className="relative z-20 w-full max-w-5xl px-4 flex flex-col items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${transX}px, ${transY}px, 0)`
        }}
      >
        {/* The Master Hypercar Image */}
        <div className="relative w-full max-w-4xl aspect-[16/9] flex items-center justify-center group">
          <img
            src="/images/aurelis_x1_hero_studio.jpg"
            alt="AURELIS X1 All-Electric Hypercar"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] contrast-[1.04] brightness-[0.98] transition-all duration-700"
          />

          {/* Dynamic Paint Tint Filter Overlay */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl transition-all duration-700"
            style={colorOverlayStyle}
          />

          {/* Dynamic Laser Headlight Glow Flares */}
          {config.headlightsOn && (
            <>
              {/* Left Laser Headlight Flare */}
              <div
                className="absolute top-[52%] left-[13.5%] w-16 h-8 bg-gradient-to-r from-[#FFF4BA] via-gold-400 to-transparent blur-md rounded-full pointer-events-none opacity-90 animate-pulse"
                style={{ transform: 'rotate(-8deg)' }}
              />
              <div className="absolute top-[53%] left-[14%] w-4 h-4 bg-white blur-[2px] rounded-full pointer-events-none" />

              {/* Right Laser Headlight Flare */}
              <div
                className="absolute top-[51.5%] left-[32%] w-24 h-9 bg-gradient-to-r from-gold-400 via-[#FFE58F] to-transparent blur-md rounded-full pointer-events-none opacity-95 animate-pulse"
                style={{ transform: 'rotate(-4deg)' }}
              />
              <div className="absolute top-[52.5%] left-[33%] w-5 h-4 bg-white blur-[2px] rounded-full pointer-events-none" />

              {/* Forward Studio Road Illumination Beam */}
              <div
                className="absolute top-[54%] left-[10%] w-[38%] h-24 bg-gradient-to-tr from-gold-400/20 via-white/5 to-transparent blur-2xl pointer-events-none"
                style={{ transform: 'rotate(12deg)' }}
              />
            </>
          )}

          {/* Active Aero Wing Glow Indicator when raised */}
          {config.spoilerRaised && (
            <div className="absolute top-[37%] right-[14%] px-2.5 py-1 rounded bg-gold-500/20 border border-gold-400/40 text-[9px] font-mono tracking-widest text-gold-300 uppercase animate-in fade-in duration-300">
              ACTIVE AERO: +25&deg; DOWNFORCE
            </div>
          )}
        </div>

        {/* 5. Realistic Studio Floor Mirror Reflection */}
        <div className="relative w-full max-w-4xl aspect-[16/4] overflow-hidden -mt-6 sm:-mt-10 opacity-40 pointer-events-none">
          <div className="w-full h-full transform scale-y-[-1] filter blur-[2px] contrast-125 brightness-75">
            <img
              src="/images/aurelis_x1_hero_studio.jpg"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          {/* Floor Reflection Gradient Mask */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040406]/70 to-[#040406]" />
        </div>
      </div>

      {/* 6. Studio Ground Contact Shadow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] max-w-4xl h-12 bg-black/90 blur-2xl rounded-[100%] pointer-events-none z-15" />

      {/* 7. Bottom Ambient Gradient Transition to Next Section */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#040406] via-[#040406]/80 to-transparent pointer-events-none z-20" />
    </div>
  );
};
