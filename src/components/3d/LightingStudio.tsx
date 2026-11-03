import { ContactShadows, Environment } from '@react-three/drei';

interface LightingStudioProps {
  headlightsOn?: boolean;
}

export const LightingStudio = ({ headlightsOn = true }: LightingStudioProps) => {
  return (
    <>
      {/* Studio Ambient Base */}
      <ambientLight intensity={0.45} />

      {/* Main Overhead Studio Light Tube */}
      <directionalLight
        position={[0, 8, 1]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />

      {/* Aurelian Gold Key Rim / Specular Accent Light */}
      <directionalLight
        position={[5, 3.5, -3.5]}
        intensity={2.8}
        color="#FFE082"
      />

      {/* Cool Titanium Studio Rim Light (Brings out Carbon Weave & Edge Highlights) */}
      <directionalLight
        position={[-5, 3, 3]}
        intensity={1.2}
        color="#C8D8E8"
      />

      {/* Front Nose Key Spotlight */}
      <spotLight
        position={[0, 3.5, 6]}
        angle={0.55}
        penumbra={0.7}
        intensity={headlightsOn ? 3.0 : 1.4}
        color="#FFF6DE"
        castShadow
      />

      {/* Rear Haunch Diffuser Accent Light */}
      <spotLight
        position={[0, 2.5, -5.5]}
        angle={0.5}
        penumbra={0.8}
        intensity={1.8}
        color="#FFAA66"
      />

      {/* Studio Ceiling Softbox Emissive Light Strips (Reflected in Gloss Car Paint) */}
      <mesh position={[0, 4.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 6.0]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-2.4, 3.8, 0]} rotation={[Math.PI / 2, 0.4, 0]}>
        <planeGeometry args={[0.5, 6.0]} />
        <meshBasicMaterial color="#FFE8A3" />
      </mesh>
      <mesh position={[2.4, 3.8, 0]} rotation={[Math.PI / 2, -0.4, 0]}>
        <planeGeometry args={[0.5, 6.0]} />
        <meshBasicMaterial color="#E2E8F0" />
      </mesh>

      {/* Soft Contact Shadows on Ground */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.85}
        scale={10}
        blur={1.6}
        far={3.5}
        color="#000000"
      />

      {/* HDRI Studio Reflections */}
      <Environment preset="city" />

      {/* Luxury Showroom Studio Floor Disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <circleGeometry args={[12, 64]} />
        <meshStandardMaterial
          color="#050508"
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>

      {/* Studio Circular Ground Ring (Aurelian Gold Accent) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.008, 0]}>
        <ringGeometry args={[3.8, 3.84, 64]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.35} />
      </mesh>
    </>
  );
};
