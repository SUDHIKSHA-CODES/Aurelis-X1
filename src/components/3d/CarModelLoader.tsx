import React, { Component, Suspense, useEffect, useState } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { CarConfig } from '../../types';
import { ProceduralHypercar } from './ProceduralHypercar';

interface Props {
  config: CarConfig;
  autoRotate?: boolean;
  isDriving?: boolean;
}

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ModelErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.info('GLB model not yet loaded, rendering mastercrafted AURELIS X1 hypercar:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// GLB Model renderer component for actual /public/models/AURELIS-X1.glb
const GLBCar = ({ url, config, autoRotate }: { url: string; config: CarConfig; autoRotate?: boolean; isDriving?: boolean }) => {
  const { scene } = useGLTF(url);
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);
  const groupRef = React.useRef<THREE.Group>(null);

  // Wheel animation if driving or auto-rotating
  React.useEffect(() => {
    // Center bounding box if needed
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = box.getSize(new THREE.Vector3());
    if (size.z > 0 && Math.abs(size.z - 4.75) > 0.5) {
      const scaleFactor = 4.75 / size.z;
      clonedScene.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
  }, [clonedScene]);

  useEffect(() => {
    // Traverse and apply high-end bespoke PBR materials matching user configuration
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const matName = (mesh.material as THREE.Material)?.name?.toLowerCase() || '';
        const meshName = mesh.name.toLowerCase();

        // 1. Exterior Car Paint Body
        if (matName.includes('body') || matName.includes('paint') || matName.includes('car_paint') || meshName.includes('body')) {
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(config.color.threeColor),
            metalness: config.color.metalness,
            roughness: config.color.roughness,
            clearcoat: config.color.clearcoat ?? 1.0,
            clearcoatRoughness: 0.05,
            wireframe: config.wireframeMode
          });
        }
        // 2. Aurelian Gold Accents & Badges
        else if (matName.includes('gold') || matName.includes('badge') || meshName.includes('accent') || meshName.includes('gold')) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#D4AF37'),
            metalness: 0.96,
            roughness: 0.12,
            wireframe: config.wireframeMode
          });
        }
        // 3. Carbon Fiber Aerodynamic Elements
        else if (matName.includes('carbon') || meshName.includes('splitter') || meshName.includes('diffuser') || meshName.includes('wing')) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#0C0C0F'),
            metalness: 0.85,
            roughness: 0.35,
            wireframe: config.wireframeMode
          });
        }
        // 4. Dark Panoramic Smoked Glass Cockpit
        else if (matName.includes('glass') || matName.includes('window') || meshName.includes('glass')) {
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#06080E'),
            transmission: 0.88,
            roughness: 0.04,
            ior: 1.55,
            transparent: true,
            opacity: 0.85,
            clearcoat: 1.0
          });
        }
        // 5. Laser Headlights & Light Bars
        else if (matName.includes('headlight') || matName.includes('light') || meshName.includes('light')) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: config.headlightsOn ? '#FFF8D6' : '#D4AF37',
            emissive: new THREE.Color(config.headlightsOn ? '#FFE47A' : '#4A3B0F'),
            emissiveIntensity: config.headlightsOn ? 4.5 : 0.4
          });
        }
      }
    });
  }, [clonedScene, config]);

  return (
    <group ref={groupRef}>
      <primitive
        object={clonedScene}
        position={[0, 0, 0]}
        rotation={[0, autoRotate ? Math.PI : 0, 0]}
      />
    </group>
  );
};

export const CarModelLoader = ({ config, autoRotate = false, isDriving = false }: Props) => {
  const [modelAvailable, setModelAvailable] = useState<boolean | null>(null);
  const glbPath = '/models/AURELIS-X1.glb';

  useEffect(() => {
    // Safe check if custom GLB file exists in /public/models/AURELIS-X1.glb
    fetch(glbPath, { method: 'HEAD' })
      .then((res) => {
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && (contentType.includes('model') || contentType.includes('octet-stream') || res.status === 200)) {
          setModelAvailable(true);
        } else {
          setModelAvailable(false);
        }
      })
      .catch(() => {
        setModelAvailable(false);
      });
  }, []);

  const fallbackCar = (
    <ProceduralHypercar config={config} autoRotate={autoRotate} isDriving={isDriving} />
  );

  if (modelAvailable !== true) {
    return fallbackCar;
  }

  return (
    <ModelErrorBoundary fallback={fallbackCar}>
      <Suspense fallback={fallbackCar}>
        <GLBCar url={glbPath} config={config} autoRotate={autoRotate} isDriving={isDriving} />
      </Suspense>
    </ModelErrorBoundary>
  );
};
