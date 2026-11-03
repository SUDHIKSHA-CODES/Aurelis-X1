import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import type { CameraPreset } from '../../types';

interface CameraRigProps {
  preset?: CameraPreset;
  enableOrbit?: boolean;
  enableParallax?: boolean;
  autoRotateSpeed?: number;
}

const PRESET_POSITIONS: Record<CameraPreset, { pos: [number, number, number]; target: [number, number, number] }> = {
  EXTERIOR: { pos: [3.6, 1.25, 4.0], target: [0, 0.28, 0] },
  FRONT: { pos: [0, 0.55, 3.8], target: [0, 0.28, 0.4] },
  SIDE: { pos: [4.4, 0.75, 0], target: [0, 0.32, 0] },
  REAR: { pos: [2.4, 1.15, -4.2], target: [0, 0.32, -0.3] },
  COCKPIT: { pos: [0.7, 2.1, 0.3], target: [0, 0.35, 0] },
  WHEEL: { pos: [2.0, 0.38, 1.45], target: [0.94, 0.33, 1.42] }
};

export const CameraRig = ({
  preset = 'EXTERIOR',
  enableOrbit = true,
  enableParallax = false,
  autoRotateSpeed = 0
}: CameraRigProps) => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const targetPos = useRef<THREE.Vector3>(new THREE.Vector3(...PRESET_POSITIONS.EXTERIOR.pos));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(...PRESET_POSITIONS.EXTERIOR.target));

  // Update target when preset changes
  useEffect(() => {
    const config = PRESET_POSITIONS[preset] || PRESET_POSITIONS.EXTERIOR;
    targetPos.current.set(...config.pos);
    targetLookAt.current.set(...config.target);

    if (controlsRef.current) {
      controlsRef.current.target.set(...config.target);
    }
  }, [preset]);

  useFrame((state, delta) => {
    if (!enableOrbit) {
      // Smooth lerp camera to target
      camera.position.lerp(targetPos.current, delta * 2.5);

      if (enableParallax) {
        const mouseX = state.pointer.x * 0.35;
        const mouseY = state.pointer.y * 0.2;
        camera.position.x += (mouseX - (camera.position.x - targetPos.current.x)) * 0.05;
        camera.position.y += (-mouseY - (camera.position.y - targetPos.current.y)) * 0.05;
      }

      camera.lookAt(targetLookAt.current);
    }
  });

  if (!enableOrbit) return null;

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={2.0}
      maxDistance={8.0}
      maxPolarAngle={Math.PI / 2 - 0.02} // Don't go below floor
      minPolarAngle={Math.PI / 6}
      autoRotate={autoRotateSpeed > 0}
      autoRotateSpeed={autoRotateSpeed}
      dampingFactor={0.06}
    />
  );
};
