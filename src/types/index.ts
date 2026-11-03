export type ColorOption = {
  id: string;
  name: string;
  hex: string;
  threeColor: string;
  roughness: number;
  metalness: number;
  clearcoat?: number;
  description: string;
  priceDelta: number;
};

export type WheelOption = {
  id: string;
  name: string;
  type: 'aero' | 'performance' | 'carbon';
  finish: string;
  description: string;
  priceDelta: number;
};

export type InteriorOption = {
  id: string;
  name: string;
  hex: string;
  accentHex: string;
  material: string;
  description: string;
  priceDelta: number;
};

export type CameraPreset = 'EXTERIOR' | 'FRONT' | 'SIDE' | 'REAR' | 'COCKPIT' | 'WHEEL';

export type CarConfig = {
  color: ColorOption;
  wheels: WheelOption;
  interior: InteriorOption;
  headlightsOn: boolean;
  spoilerRaised: boolean;
  wireframeMode: boolean;
  activePreset: CameraPreset;
};

export type DrivingMode = {
  id: string;
  name: string;
  environment: string;
  location: string;
  topSpeedReached: string;
  torqueDistribution: string;
  image: string;
  description: string;
  ambientTone: string;
};
