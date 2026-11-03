import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { CarConfig } from '../../types';

interface ProceduralHypercarProps {
  config: CarConfig;
  autoRotate?: boolean;
  isDriving?: boolean;
}

// Helper to create smooth curved hypercar geometries
function createNoseHoodGeometry(): THREE.BufferGeometry {
  const geom = new THREE.CylinderGeometry(0.85, 1.02, 1.5, 32, 16, false, -Math.PI / 2, Math.PI);
  geom.rotateZ(Math.PI / 2);
  geom.scale(1.0, 0.22, 1.2);
  geom.computeVertexNormals();
  return geom;
}

function createCanopyGeometry(): THREE.BufferGeometry {
  const geom = new THREE.SphereGeometry(1.0, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2);
  geom.scale(0.72, 0.44, 1.55);
  geom.computeVertexNormals();
  return geom;
}

export const ProceduralHypercar = ({ config, autoRotate = false, isDriving = false }: ProceduralHypercarProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const spoilerRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);

  // Wheel indices for rotation
  const setWheelRef = (index: number, el: THREE.Group | null) => {
    if (el) wheelsRef.current[index] = el;
  };

  // Precomputed custom geometries
  const hoodGeom = useMemo(() => createNoseHoodGeometry(), []);
  const canopyGeom = useMemo(() => createCanopyGeometry(), []);

  // Frame animations
  useFrame((_state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.35;
    }

    // Smooth active aerodynamic spoiler deployment
    if (spoilerRef.current) {
      const targetY = config.spoilerRaised ? 0.32 : 0.04;
      const targetRotX = config.spoilerRaised ? -0.18 : 0;
      spoilerRef.current.position.y = THREE.MathUtils.lerp(spoilerRef.current.position.y, targetY, delta * 5);
      spoilerRef.current.rotation.x = THREE.MathUtils.lerp(spoilerRef.current.rotation.x, targetRotX, delta * 5);
    }

    // High speed wheel rotation
    if (isDriving) {
      wheelsRef.current.forEach((wheel) => {
        if (wheel) wheel.rotation.x += delta * 14;
      });
    }
  });

  const wireframe = config.wireframeMode;

  // Dynamic PBR Materials
  const paintColor = new THREE.Color(config.color.threeColor);
  const goldColor = new THREE.Color('#D4AF37');
  const brightGold = new THREE.Color('#FFE066');
  const darkCarbon = new THREE.Color('#0A0A0D');
  const tireRubber = new THREE.Color('#111215');
  const brakeDiscColor = new THREE.Color('#8E939D');

  const wheelFinishColor =
    config.wheels.type === 'performance'
      ? '#D4AF37'
      : config.wheels.type === 'carbon'
      ? '#18181C'
      : '#7A808C';

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ================================================================= */}
      {/* 1. MONOCOQUE CHASSIS & LOWER UNDERBODY                            */}
      {/* ================================================================= */}
      {/* Ultra-low aerodynamic flat carbon undertray */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.96, 0.05, 4.65]} />
        <meshStandardMaterial color={darkCarbon} roughness={0.6} metalness={0.7} wireframe={wireframe} />
      </mesh>

      {/* Coke-bottle Central Body Tub */}
      <mesh position={[0, 0.28, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[1.72, 0.32, 3.8]} />
        <meshPhysicalMaterial
          color={paintColor}
          metalness={config.color.metalness}
          roughness={config.color.roughness}
          clearcoat={config.color.clearcoat ?? 1.0}
          clearcoatRoughness={0.06}
          wireframe={wireframe}
        />
      </mesh>

      {/* Front Sculpted Low Hood (Parametric Curved) */}
      <mesh geometry={hoodGeom} position={[0, 0.36, 1.45]} rotation={[0.08, 0, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={paintColor}
          metalness={config.color.metalness}
          roughness={config.color.roughness}
          clearcoat={config.color.clearcoat ?? 1.0}
          clearcoatRoughness={0.05}
          wireframe={wireframe}
        />
      </mesh>

      {/* Front Hood Central Aero Vent Extraction Channel */}
      <mesh position={[0, 0.42, 1.35]} rotation={[-0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.65, 0.03, 0.75]} />
        <meshStandardMaterial color={darkCarbon} roughness={0.4} metalness={0.8} />
      </mesh>
      {/* Vent Gold Aerodynamic Strake */}
      <mesh position={[0, 0.435, 1.35]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.02, 0.04, 0.7]} />
        <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.15} />
      </mesh>

      {/* ================================================================= */}
      {/* 2. MUSCULAR FRONT WHEEL ARCHES & NOSE CONE                        */}
      {/* ================================================================= */}
      {/* Left Front Fender Arch */}
      <mesh position={[-0.92, 0.42, 1.42]} rotation={[0, 0.05, -0.05]} castShadow receiveShadow>
        <cylinderGeometry args={[0.39, 0.41, 0.32, 24, 1, false, 0, Math.PI]} />
        <meshPhysicalMaterial
          color={paintColor}
          metalness={config.color.metalness}
          roughness={config.color.roughness}
          clearcoat={1.0}
          wireframe={wireframe}
        />
      </mesh>
      {/* Right Front Fender Arch */}
      <mesh position={[0.92, 0.42, 1.42]} rotation={[0, -0.05, 0.05]} castShadow receiveShadow>
        <cylinderGeometry args={[0.39, 0.41, 0.32, 24, 1, false, 0, Math.PI]} />
        <meshPhysicalMaterial
          color={paintColor}
          metalness={config.color.metalness}
          roughness={config.color.roughness}
          clearcoat={1.0}
          wireframe={wireframe}
        />
      </mesh>

      {/* Low-slung Shark Nose Tip */}
      <mesh position={[0, 0.26, 2.25]} rotation={[-0.2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.35, 0.14, 0.55]} />
        <meshPhysicalMaterial
          color={paintColor}
          metalness={config.color.metalness}
          roughness={config.color.roughness}
          clearcoat={1.0}
          wireframe={wireframe}
        />
      </mesh>

      {/* Aurelis Gold Nose Badge */}
      <mesh position={[0, 0.34, 2.28]} rotation={[-0.35, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.008, 16]} />
        <meshStandardMaterial color={brightGold} metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Front Carbon Splitter Blade */}
      <mesh position={[0, 0.11, 2.32]} castShadow>
        <boxGeometry args={[2.08, 0.04, 0.62]} />
        <meshStandardMaterial color={darkCarbon} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Front Splitter Aurelis Gold Leading Edge */}
      <mesh position={[0, 0.11, 2.62]} castShadow>
        <boxGeometry args={[1.96, 0.02, 0.04]} />
        <meshStandardMaterial color={brightGold} metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Splitter Endplate Vertical Winglets */}
      <mesh position={[-1.03, 0.17, 2.38]} rotation={[0, 0, 0.1]} castShadow>
        <boxGeometry args={[0.03, 0.14, 0.35]} />
        <meshStandardMaterial color={darkCarbon} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[1.03, 0.17, 2.38]} rotation={[0, 0, -0.1]} castShadow>
        <boxGeometry args={[0.03, 0.14, 0.35]} />
        <meshStandardMaterial color={darkCarbon} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* ================================================================= */}
      {/* 3. ULTRA-THIN AURELIAN-GOLD LASER HEADLIGHTS                      */}
      {/* ================================================================= */}
      {/* Left Laser Headlight Blade */}
      <group position={[-0.72, 0.35, 2.05]} rotation={[-0.18, 0.25, -0.12]}>
        {/* Glowing LED Laser Light Guide */}
        <mesh>
          <boxGeometry args={[0.42, 0.022, 0.18]} />
          <meshStandardMaterial
            color={config.headlightsOn ? '#FFF8D6' : '#D4AF37'}
            emissive={config.headlightsOn ? '#FFE47A' : '#4A3B0F'}
            emissiveIntensity={config.headlightsOn ? 4.5 : 0.4}
            toneMapped={false}
          />
        </mesh>
        {/* Transparent Polycarbonate Headlight Lens */}
        <mesh position={[0, 0.005, 0.02]}>
          <boxGeometry args={[0.44, 0.03, 0.2]} />
          <meshPhysicalMaterial color="#ffffff" transmission={0.95} roughness={0.05} ior={1.5} transparent opacity={0.6} />
        </mesh>
        {/* Subtle Gold Accent Trim */}
        <mesh position={[0, -0.015, -0.02]}>
          <boxGeometry args={[0.43, 0.01, 0.02]} />
          <meshStandardMaterial color={brightGold} metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Right Laser Headlight Blade */}
      <group position={[0.72, 0.35, 2.05]} rotation={[-0.18, -0.25, 0.12]}>
        <mesh>
          <boxGeometry args={[0.42, 0.022, 0.18]} />
          <meshStandardMaterial
            color={config.headlightsOn ? '#FFF8D6' : '#D4AF37'}
            emissive={config.headlightsOn ? '#FFE47A' : '#4A3B0F'}
            emissiveIntensity={config.headlightsOn ? 4.5 : 0.4}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0.005, 0.02]}>
          <boxGeometry args={[0.44, 0.03, 0.2]} />
          <meshPhysicalMaterial color="#ffffff" transmission={0.95} roughness={0.05} ior={1.5} transparent opacity={0.6} />
        </mesh>
        <mesh position={[0, -0.015, -0.02]}>
          <boxGeometry args={[0.43, 0.01, 0.02]} />
          <meshStandardMaterial color={brightGold} metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Dynamic Forward Headlight Projection Cones */}
      {config.headlightsOn && (
        <>
          <spotLight
            position={[-0.72, 0.36, 2.1]}
            target-position={[-0.72, 0.0, 10.0]}
            color="#FFF4CE"
            intensity={4.5}
            distance={16}
            angle={0.4}
            penumbra={0.6}
          />
          <spotLight
            position={[0.72, 0.36, 2.1]}
            target-position={[0.72, 0.0, 10.0]}
            color="#FFF4CE"
            intensity={4.5}
            distance={16}
            angle={0.4}
            penumbra={0.6}
          />
        </>
      )}

      {/* ================================================================= */}
      {/* 4. JET-FIGHTER COCKPIT CANOPY & INTERIOR SILHOUETTE               */}
      {/* ================================================================= */}
      {/* Panoramic Teardrop Glass Cockpit */}
      <mesh geometry={canopyGeom} position={[0, 0.48, -0.08]} castShadow>
        <meshPhysicalMaterial
          color="#06080E"
          transmission={0.88}
          roughness={0.04}
          ior={1.55}
          thickness={0.6}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Cockpit Windshield Frame / A-Pillars in Gloss Carbon */}
      <mesh position={[0, 0.62, 0.45]} rotation={[-0.6, 0, 0]}>
        <boxGeometry args={[1.22, 0.03, 0.04]} />
        <meshStandardMaterial color={darkCarbon} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Interior Cockpit Silhouette (Visible through Glass) */}
      <group position={[0, 0.36, -0.05]}>
        {/* Carbon Interior Tub */}
        <mesh position={[0, -0.08, 0]}>
          <boxGeometry args={[1.3, 0.12, 1.6]} />
          <meshStandardMaterial color="#0A0A0C" roughness={0.8} />
        </mesh>

        {/* Left Lightweight Carbon Bucket Racing Seat */}
        <mesh position={[-0.34, 0.12, -0.18]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.42, 0.52, 0.38]} />
          <meshStandardMaterial
            color={config.interior.id === 'ivory-minimalist' ? '#DCD8CF' : config.interior.id === 'aurelian-bespoke' ? '#483318' : '#141416'}
            roughness={0.7}
          />
        </mesh>
        {/* Left Seat Gold Harness Accent */}
        <mesh position={[-0.34, 0.22, -0.1]}>
          <boxGeometry args={[0.25, 0.32, 0.02]} />
          <meshStandardMaterial color={goldColor} metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Right Lightweight Carbon Bucket Racing Seat */}
        <mesh position={[0.34, 0.12, -0.18]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.42, 0.52, 0.38]} />
          <meshStandardMaterial
            color={config.interior.id === 'ivory-minimalist' ? '#DCD8CF' : config.interior.id === 'aurelian-bespoke' ? '#483318' : '#141416'}
            roughness={0.7}
          />
        </mesh>
        {/* Right Seat Gold Harness Accent */}
        <mesh position={[0.34, 0.22, -0.1]}>
          <boxGeometry args={[0.25, 0.32, 0.02]} />
          <meshStandardMaterial color={goldColor} metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Formula 1 Inspired Steering Yoke */}
        <mesh position={[-0.34, 0.24, 0.32]} rotation={[-0.35, 0, 0]}>
          <boxGeometry args={[0.24, 0.12, 0.03]} />
          <meshStandardMaterial color={darkCarbon} roughness={0.4} metalness={0.9} />
        </mesh>
        {/* Yoke Center Aurelis Gold Emblem */}
        <mesh position={[-0.34, 0.24, 0.34]} rotation={[-0.35, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.01, 12]} />
          <meshStandardMaterial color={brightGold} metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Curved Floating OLED Holographic Instrument Display */}
        <mesh position={[-0.34, 0.31, 0.44]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.36, 0.08, 0.01]} />
          <meshStandardMaterial
            color="#081E2E"
            emissive="#1CE0E0"
            emissiveIntensity={1.4}
            roughness={0.1}
          />
        </mesh>

        {/* Center Tunnel Console with Gold Trim */}
        <mesh position={[0, 0.04, 0.05]}>
          <boxGeometry args={[0.18, 0.15, 1.1]} />
          <meshStandardMaterial color="#121216" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.12, 0.05]}>
          <boxGeometry args={[0.03, 0.02, 0.9]} />
          <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* 5. SCULPTED SIDE AIR CHANNELS & CARBON ROCKER PANELS              */}
      {/* ================================================================= */}
      {/* Left Sculpted Side Pod & Air Intake Tunnel */}
      <group position={[-0.88, 0.28, -0.05]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.26, 2.1]} />
          <meshPhysicalMaterial
            color={paintColor}
            metalness={config.color.metalness}
            roughness={config.color.roughness}
            clearcoat={1.0}
            wireframe={wireframe}
          />
        </mesh>
        {/* Deep Radiator Air Scoop Channel */}
        <mesh position={[0.08, 0.02, -0.45]} rotation={[0, -0.25, 0]}>
          <boxGeometry args={[0.12, 0.18, 0.65]} />
          <meshStandardMaterial color="#020204" roughness={0.9} />
        </mesh>
        {/* Carbon Side Skirt */}
        <mesh position={[-0.08, -0.15, 0]} castShadow>
          <boxGeometry args={[0.14, 0.04, 2.2]} />
          <meshStandardMaterial color={darkCarbon} roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Aurelis Gold Side Skirt Pinstripe */}
        <mesh position={[-0.14, -0.14, 0]}>
          <boxGeometry args={[0.02, 0.018, 2.15]} />
          <meshStandardMaterial color={brightGold} metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Rear Side Skirt Winglet */}
        <mesh position={[-0.12, -0.06, -1.05]} castShadow>
          <boxGeometry args={[0.04, 0.16, 0.25]} />
          <meshStandardMaterial color={darkCarbon} roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* Right Sculpted Side Pod & Air Intake Tunnel */}
      <group position={[0.88, 0.28, -0.05]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.26, 2.1]} />
          <meshPhysicalMaterial
            color={paintColor}
            metalness={config.color.metalness}
            roughness={config.color.roughness}
            clearcoat={1.0}
            wireframe={wireframe}
          />
        </mesh>
        {/* Deep Radiator Air Scoop Channel */}
        <mesh position={[-0.08, 0.02, -0.45]} rotation={[0, 0.25, 0]}>
          <boxGeometry args={[0.12, 0.18, 0.65]} />
          <meshStandardMaterial color="#020204" roughness={0.9} />
        </mesh>
        {/* Carbon Side Skirt */}
        <mesh position={[0.08, -0.15, 0]} castShadow>
          <boxGeometry args={[0.14, 0.04, 2.2]} />
          <meshStandardMaterial color={darkCarbon} roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Aurelis Gold Side Skirt Pinstripe */}
        <mesh position={[0.14, -0.14, 0]}>
          <boxGeometry args={[0.02, 0.018, 2.15]} />
          <meshStandardMaterial color={brightGold} metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Rear Side Skirt Winglet */}
        <mesh position={[0.12, -0.06, -1.05]} castShadow>
          <boxGeometry args={[0.04, 0.16, 0.25]} />
          <meshStandardMaterial color={darkCarbon} roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* Aerodynamic Virtual Camera Side Mirrors with Gold Indicators */}
      <group position={[-0.82, 0.52, 0.62]}>
        <mesh rotation={[0, 0.35, 0.1]} castShadow>
          <boxGeometry args={[0.22, 0.04, 0.08]} />
          <meshStandardMaterial color={darkCarbon} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[-0.08, 0, 0.01]} rotation={[0, 0.35, 0.1]}>
          <boxGeometry args={[0.1, 0.012, 0.01]} />
          <meshStandardMaterial color={brightGold} emissive={brightGold} emissiveIntensity={1.8} />
        </mesh>
      </group>
      <group position={[0.82, 0.52, 0.62]}>
        <mesh rotation={[0, -0.35, -0.1]} castShadow>
          <boxGeometry args={[0.22, 0.04, 0.08]} />
          <meshStandardMaterial color={darkCarbon} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0.08, 0, 0.01]} rotation={[0, -0.35, -0.1]}>
          <boxGeometry args={[0.1, 0.012, 0.01]} />
          <meshStandardMaterial color={brightGold} emissive={brightGold} emissiveIntensity={1.8} />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* 6. MUSCULAR REAR HAUNCHES & ENGINE SPINE                          */}
      {/* ================================================================= */}
      {/* Left Flared Rear Muscle Fender */}
      <mesh position={[-0.98, 0.44, -1.35]} rotation={[0, -0.08, -0.04]} castShadow receiveShadow>
        <cylinderGeometry args={[0.43, 0.46, 0.36, 28, 1, false, 0, Math.PI]} />
        <meshPhysicalMaterial
          color={paintColor}
          metalness={config.color.metalness}
          roughness={config.color.roughness}
          clearcoat={1.0}
          wireframe={wireframe}
        />
      </mesh>

      {/* Right Flared Rear Muscle Fender */}
      <mesh position={[0.98, 0.44, -1.35]} rotation={[0, 0.08, 0.04]} castShadow receiveShadow>
        <cylinderGeometry args={[0.43, 0.46, 0.36, 28, 1, false, 0, Math.PI]} />
        <meshPhysicalMaterial
          color={paintColor}
          metalness={config.color.metalness}
          roughness={config.color.roughness}
          clearcoat={1.0}
          wireframe={wireframe}
        />
      </mesh>

      {/* Rear Engine Deck Taper */}
      <mesh position={[0, 0.42, -1.25]} rotation={[-0.08, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.52, 0.22, 1.55]} />
        <meshPhysicalMaterial
          color={paintColor}
          metalness={config.color.metalness}
          roughness={config.color.roughness}
          clearcoat={1.0}
          wireframe={wireframe}
        />
      </mesh>

      {/* Carbon Fiber Engine Cooling Louvers */}
      {[-0.8, -1.0, -1.2, -1.4, -1.6].map((zPos, idx) => (
        <mesh key={idx} position={[0, 0.53 + idx * -0.02, zPos]} rotation={[-0.18, 0, 0]}>
          <boxGeometry args={[0.68 - idx * 0.08, 0.02, 0.06]} />
          <meshStandardMaterial color={darkCarbon} roughness={0.4} metalness={0.8} />
        </mesh>
      ))}

      {/* Aerodynamic Dorsal Shark Fin with Gold Illuminated Edge */}
      <mesh position={[0, 0.62, -1.1]} castShadow>
        <boxGeometry args={[0.025, 0.16, 0.95]} />
        <meshStandardMaterial color={darkCarbon} roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.705, -1.1]}>
        <boxGeometry args={[0.015, 0.015, 0.92]} />
        <meshStandardMaterial color={brightGold} emissive={brightGold} emissiveIntensity={2.0} />
      </mesh>

      {/* ================================================================= */}
      {/* 7. WIDE FUTURISTIC REAR FASCIA, LIGHT BLADE & DIFFUSER            */}
      {/* ================================================================= */}
      {/* Rear Tail Trailing Edge */}
      <mesh position={[0, 0.36, -2.18]} castShadow receiveShadow>
        <boxGeometry args={[1.92, 0.2, 0.35]} />
        <meshPhysicalMaterial
          color={paintColor}
          metalness={config.color.metalness}
          roughness={config.color.roughness}
          clearcoat={1.0}
          wireframe={wireframe}
        />
      </mesh>

      {/* Full-Width Futuristic Photonic LED Taillight Blade */}
      <group position={[0, 0.42, -2.32]}>
        {/* Main Glowing Red Light Bar */}
        <mesh>
          <boxGeometry args={[1.94, 0.03, 0.04]} />
          <meshStandardMaterial
            color="#FF1A2A"
            emissive="#FF0A1A"
            emissiveIntensity={4.2}
            toneMapped={false}
          />
        </mesh>
        {/* Outer Clear Red Lens Housing */}
        <mesh position={[0, 0, -0.01]}>
          <boxGeometry args={[1.98, 0.045, 0.03]} />
          <meshPhysicalMaterial color="#FF0000" transmission={0.9} roughness={0.05} transparent opacity={0.7} />
        </mesh>
        {/* Center Illuminated Aurelis Script Plate */}
        <mesh position={[0, -0.06, 0.01]}>
          <boxGeometry args={[0.35, 0.04, 0.01]} />
          <meshStandardMaterial color="#0A0A0E" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.06, 0.018]}>
          <boxGeometry args={[0.22, 0.015, 0.005]} />
          <meshStandardMaterial color={brightGold} emissive={brightGold} emissiveIntensity={2.5} />
        </mesh>
      </group>

      {/* Dramatic Carbon Venturi Rear Diffuser */}
      <group position={[0, 0.15, -2.15]}>
        {/* Diffuser Tunnel Base Ramp */}
        <mesh rotation={[0.18, 0, 0]} castShadow>
          <boxGeometry args={[1.98, 0.06, 0.72]} />
          <meshStandardMaterial color={darkCarbon} roughness={0.3} metalness={0.8} />
        </mesh>

        {/* 6 Vertical Aerodynamic Diffuser Strakes */}
        {[-0.82, -0.48, -0.16, 0.16, 0.48, 0.82].map((xOffset, idx) => (
          <group key={idx} position={[xOffset, -0.03, -0.15]} rotation={[0.18, 0, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.025, 0.16, 0.65]} />
              <meshStandardMaterial color={darkCarbon} roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Gold Tip on Center Strakes */}
            {(idx === 2 || idx === 3) && (
              <mesh position={[0, -0.075, -0.3]}>
                <boxGeometry args={[0.026, 0.02, 0.08]} />
                <meshStandardMaterial color={brightGold} metalness={0.95} roughness={0.1} />
              </mesh>
            )}
          </group>
        ))}

        {/* Formula 1 Center Rain Light */}
        <mesh position={[0, -0.05, -0.42]}>
          <boxGeometry args={[0.08, 0.05, 0.02]} />
          <meshStandardMaterial color="#FF0000" emissive="#FF1122" emissiveIntensity={3.5} />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* 8. ACTIVE CARBON AERODYNAMIC DUAL-PLANE SPOILER                   */}
      {/* ================================================================= */}
      <group ref={spoilerRef} position={[0, 0.52, -2.05]}>
        {/* Left Carbon Swan-Neck Mounting Pylon */}
        <mesh position={[-0.45, 0.14, 0.08]} rotation={[-0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.035, 0.28, 0.1]} />
          <meshStandardMaterial color={darkCarbon} roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Right Carbon Swan-Neck Mounting Pylon */}
        <mesh position={[0.45, 0.14, 0.08]} rotation={[-0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.035, 0.28, 0.1]} />
          <meshStandardMaterial color={darkCarbon} roughness={0.3} metalness={0.9} />
        </mesh>

        {/* Main Aerodynamic Airfoil Wing Blade */}
        <mesh position={[0, 0.28, 0]} rotation={[0.02, 0, 0]} castShadow>
          <boxGeometry args={[1.96, 0.035, 0.38]} />
          <meshStandardMaterial color={darkCarbon} roughness={0.25} metalness={0.85} />
        </mesh>

        {/* Wing Blade Aurelis Gold Trailing Edge */}
        <mesh position={[0, 0.285, -0.18]}>
          <boxGeometry args={[1.94, 0.015, 0.025]} />
          <meshStandardMaterial color={brightGold} metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Left Wing Endplate with Gold Accent Line */}
        <mesh position={[-0.99, 0.28, 0]} castShadow>
          <boxGeometry args={[0.025, 0.15, 0.42]} />
          <meshStandardMaterial color={darkCarbon} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[-1.0, 0.28, 0]}>
          <boxGeometry args={[0.008, 0.02, 0.4]} />
          <meshStandardMaterial color={brightGold} metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Right Wing Endplate with Gold Accent Line */}
        <mesh position={[0.99, 0.28, 0]} castShadow>
          <boxGeometry args={[0.025, 0.15, 0.42]} />
          <meshStandardMaterial color={darkCarbon} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[1.0, 0.28, 0]}>
          <boxGeometry args={[0.008, 0.02, 0.4]} />
          <meshStandardMaterial color={brightGold} metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* 9. WHEELS, LOW-PROFILE TIRES & CERAMIC BRAKES                     */}
      {/* ================================================================= */}
      {/* Front-Left Wheel (21-inch) */}
      <WheelAssembly
        refCallback={(el) => setWheelRef(0, el)}
        position={[-0.94, 0.33, 1.42]}
        isLeft={true}
        wheelColor={wheelFinishColor}
        wheelType={config.wheels.type}
        tireRubber={tireRubber}
        brakeDiscColor={brakeDiscColor}
        goldColor={goldColor}
        radius={0.34}
        width={0.28}
      />

      {/* Front-Right Wheel (21-inch) */}
      <WheelAssembly
        refCallback={(el) => setWheelRef(1, el)}
        position={[0.94, 0.33, 1.42]}
        isLeft={false}
        wheelColor={wheelFinishColor}
        wheelType={config.wheels.type}
        tireRubber={tireRubber}
        brakeDiscColor={brakeDiscColor}
        goldColor={goldColor}
        radius={0.34}
        width={0.28}
      />

      {/* Rear-Left Wheel (22-inch Wide Competition Stance) */}
      <WheelAssembly
        refCallback={(el) => setWheelRef(2, el)}
        position={[-1.01, 0.35, -1.35]}
        isLeft={true}
        wheelColor={wheelFinishColor}
        wheelType={config.wheels.type}
        tireRubber={tireRubber}
        brakeDiscColor={brakeDiscColor}
        goldColor={goldColor}
        radius={0.36}
        width={0.34}
      />

      {/* Rear-Right Wheel (22-inch Wide Competition Stance) */}
      <WheelAssembly
        refCallback={(el) => setWheelRef(3, el)}
        position={[1.01, 0.35, -1.35]}
        isLeft={false}
        wheelColor={wheelFinishColor}
        wheelType={config.wheels.type}
        tireRubber={tireRubber}
        brakeDiscColor={brakeDiscColor}
        goldColor={goldColor}
        radius={0.36}
        width={0.34}
      />
    </group>
  );
};

// =====================================================================
// BESPOKE WHEEL, TIRE & CARBON CERAMIC BRAKE ASSEMBLY
// =====================================================================
interface WheelAssemblyProps {
  refCallback: (el: THREE.Group | null) => void;
  position: [number, number, number];
  isLeft: boolean;
  wheelColor: string;
  wheelType: 'aero' | 'performance' | 'carbon';
  tireRubber: THREE.Color;
  brakeDiscColor: THREE.Color;
  goldColor: THREE.Color;
  radius: number;
  width: number;
}

const WheelAssembly = ({
  refCallback,
  position,
  isLeft,
  wheelColor,
  wheelType,
  tireRubber,
  brakeDiscColor,
  goldColor,
  radius,
  width
}: WheelAssemblyProps) => {
  const rotationZ = isLeft ? Math.PI / 2 : -Math.PI / 2;

  return (
    <group position={position}>
      {/* 1. Static Brake Rotor & 6-Piston Caliper */}
      <group>
        {/* Cross-Drilled Carbon Ceramic Brake Disc */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[isLeft ? 0.04 : -0.04, 0, 0]}>
          <cylinderGeometry args={[radius * 0.72, radius * 0.72, 0.035, 32]} />
          <meshStandardMaterial color={brakeDiscColor} metalness={0.92} roughness={0.25} />
        </mesh>

        {/* Aurelis 6-Piston Monoblock Gold Brake Caliper */}
        <mesh position={[isLeft ? 0.05 : -0.05, radius * 0.42, 0]} rotation={[0, 0, isLeft ? 0.35 : -0.35]} castShadow>
          <boxGeometry args={[0.07, 0.16, 0.08]} />
          <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.12} />
        </mesh>
      </group>

      {/* 2. Rotating Wheel Rim & Tire Group */}
      <group ref={refCallback}>
        {/* Competition Low-Profile Performance Tire with Rounded Shoulder */}
        <mesh rotation={[0, 0, rotationZ]} castShadow>
          <cylinderGeometry args={[radius, radius, width, 36, 1]} />
          <meshStandardMaterial color={tireRubber} roughness={0.88} metalness={0.08} />
        </mesh>

        {/* Tire Inner Rim Seating Bead */}
        <mesh rotation={[0, 0, rotationZ]}>
          <torusGeometry args={[radius * 0.94, 0.025, 16, 36]} />
          <meshStandardMaterial color="#0A0A0C" roughness={0.9} />
        </mesh>

        {/* Forged Outer Wheel Barrel / Lip */}
        <mesh rotation={[0, 0, rotationZ]}>
          <cylinderGeometry args={[radius * 0.82, radius * 0.82, width * 0.96, 32, 1, true]} />
          <meshStandardMaterial color={wheelColor} metalness={0.92} roughness={0.18} />
        </mesh>

        {/* Wheel Design Variants */}
        {wheelType === 'aero' ? (
          // Aero Blade Design: Carbon Disc with Gold Outer Ring & Directional Turbine Vanes
          <group position={[isLeft ? -width / 2 + 0.02 : width / 2 - 0.02, 0, 0]} rotation={[0, 0, rotationZ]}>
            {/* Carbon Turbine Base Disc */}
            <mesh>
              <cylinderGeometry args={[radius * 0.78, radius * 0.78, 0.025, 32]} />
              <meshStandardMaterial color="#121215" roughness={0.4} metalness={0.8} />
            </mesh>
            {/* Satin Gold Machined Outer Lip Ring */}
            <mesh position={[0, 0.015, 0]}>
              <torusGeometry args={[radius * 0.76, 0.016, 16, 32]} />
              <meshStandardMaterial color={goldColor} metalness={0.96} roughness={0.12} />
            </mesh>
            {/* 5 Directional Carbon Blades */}
            {[0, 1, 2, 3, 4].map((i) => {
              const angle = (i * (Math.PI * 2)) / 5;
              return (
                <mesh key={i} position={[Math.cos(angle) * radius * 0.42, 0.02, Math.sin(angle) * radius * 0.42]} rotation={[0, angle + 0.4, 0]}>
                  <boxGeometry args={[radius * 0.44, 0.018, 0.06]} />
                  <meshStandardMaterial color="#1A1A1E" roughness={0.3} metalness={0.9} />
                </mesh>
              );
            })}
          </group>
        ) : wheelType === 'performance' ? (
          // Performance Monoblock: Double 5-Spoke Lightweight Forged Gold Rim
          <group position={[isLeft ? -width / 2 + 0.02 : width / 2 - 0.02, 0, 0]} rotation={[0, 0, rotationZ]}>
            {/* Outer Gold Rim Lip */}
            <mesh>
              <torusGeometry args={[radius * 0.78, 0.02, 16, 32]} />
              <meshStandardMaterial color={goldColor} metalness={0.96} roughness={0.12} />
            </mesh>
            {/* 10 Forged Spokes (5 Pairs) */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
              const angle = (i * (Math.PI * 2)) / 10;
              return (
                <mesh key={i} position={[Math.cos(angle) * radius * 0.38, -0.015, Math.sin(angle) * radius * 0.38]} rotation={[0, angle, 0]}>
                  <boxGeometry args={[radius * 0.68, 0.022, 0.038]} />
                  <meshStandardMaterial color={goldColor} metalness={0.96} roughness={0.12} />
                </mesh>
              );
            })}
          </group>
        ) : (
          // Carbon Matrix Stealth: Matte Carbon 10-Spoke Matrix with Titanium Hardware
          <group position={[isLeft ? -width / 2 + 0.02 : width / 2 - 0.02, 0, 0]} rotation={[0, 0, rotationZ]}>
            <mesh>
              <torusGeometry args={[radius * 0.78, 0.02, 16, 32]} />
              <meshStandardMaterial color="#141416" roughness={0.3} metalness={0.8} />
            </mesh>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const angle = (i * (Math.PI * 2)) / 8;
              return (
                <mesh key={i} position={[Math.cos(angle) * radius * 0.38, -0.015, Math.sin(angle) * radius * 0.38]} rotation={[0, angle, 0]}>
                  <boxGeometry args={[radius * 0.68, 0.024, 0.045]} />
                  <meshStandardMaterial color="#18181D" roughness={0.3} metalness={0.8} />
                </mesh>
              );
            })}
          </group>
        )}

        {/* Center Lock Hub with Aurelis Gold Nut */}
        <mesh position={[isLeft ? -width / 2 + 0.035 : width / 2 - 0.035, 0, 0]} rotation={[0, 0, rotationZ]}>
          <cylinderGeometry args={[0.065, 0.075, 0.035, 24]} />
          <meshStandardMaterial color={goldColor} metalness={0.98} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
};
