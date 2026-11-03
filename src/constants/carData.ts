import type { ColorOption, WheelOption, InteriorOption, DrivingMode } from '../types';

export const BRAND = {
  name: 'AURELIS',
  model: 'X1',
  tagline: 'BEYOND MOTION.',
  subtitle: 'Luxury Electric Hypercar',
  basePrice: 2450000, // $2.45M USD
  productionLimit: '150 Bespoke Units Worldwide',
  headquarters: 'Geneva / Modena / Zurich',
};

export const SPECS = {
  hp: { value: '1,200', unit: 'HP', label: 'Power Output', sub: 'Quad Axial-Flux Motors' },
  acceleration: { value: '1.9', unit: 'SEC', label: '0–100 KM/H', sub: 'Sub-2.0s Launch Control' },
  topSpeed: { value: '380', unit: 'KM/H', label: 'Top Speed', sub: 'Active Aero V-Max Mode' },
  range: { value: '800', unit: 'KM', label: 'WLTP Range', sub: '900V Solid-State Cell Architecture' },
  torque: { value: '1,650', unit: 'NM', label: 'Instant Torque', sub: 'Individual Wheel Vectoring' },
  weight: { value: '1,680', unit: 'KG', label: 'Curb Weight', sub: 'Full Carbon Monocoque' },
  dragCoeff: { value: '0.19', unit: 'Cd', label: 'Drag Coefficient', sub: 'Morphing Aero Profile' },
  charging: { value: '12', unit: 'MIN', label: '10–80% Fast Charge', sub: '450kW DC Hypercharging' }
};

export const COLOR_OPTIONS: ColorOption[] = [
  {
    id: 'obsidian-black',
    name: 'Obsidian Black',
    hex: '#0A0A0C',
    threeColor: '#0c0c0f',
    roughness: 0.12,
    metalness: 0.95,
    clearcoat: 1.0,
    description: 'Deep carbon metallic obsidian finish with deep gloss lacquer and Aurelian gold aero accents.',
    priceDelta: 0
  },
  {
    id: 'aurelian-gold',
    name: 'Aurelian Gold',
    hex: '#D4AF37',
    threeColor: '#C5A039',
    roughness: 0.2,
    metalness: 0.92,
    clearcoat: 0.9,
    description: 'Liquid 24-karat infused metallic gold lacquer reflecting pure luminous energy under studio lights.',
    priceDelta: 45000
  },
  {
    id: 'titanium-silver',
    name: 'Titanium Silver',
    hex: '#8E939D',
    threeColor: '#8a909c',
    roughness: 0.15,
    metalness: 0.9,
    clearcoat: 1.0,
    description: 'Brushed liquid aerospace titanium with icy micro-flakes and dark smoked glass accents.',
    priceDelta: 25000
  },
  {
    id: 'monaco-pearl',
    name: 'Monaco Pearl White',
    hex: '#E8E8EE',
    threeColor: '#e0e0e8',
    roughness: 0.1,
    metalness: 0.4,
    clearcoat: 1.0,
    description: 'Multi-stage iridescent pearl white with deep gold flake reflection under sunlight.',
    priceDelta: 30000
  },
  {
    id: 'emerald-carbon',
    name: 'Emerald Carbon Weave',
    hex: '#0F2820',
    threeColor: '#0a221a',
    roughness: 0.18,
    metalness: 0.85,
    clearcoat: 1.0,
    description: 'Exposed dark tinted carbon weave with deep emerald undertones and bespoke satin clearcoat.',
    priceDelta: 55000
  }
];

export const WHEEL_OPTIONS: WheelOption[] = [
  {
    id: 'aero-blade',
    name: 'Aero Blade Carbon',
    type: 'aero',
    finish: 'Forged Carbon with Gold Lip',
    description: 'Turbine-inspired carbon blades for active brake cooling and reduced drag at high velocity.',
    priceDelta: 0
  },
  {
    id: 'performance-forged',
    name: 'Performance Monoblock',
    type: 'performance',
    finish: 'Satin Aurelian Gold Forged Aluminum',
    description: 'Ultra-lightweight multi-spoke motorsport design saving 4.8kg per corner in unsprung mass.',
    priceDelta: 18000
  },
  {
    id: 'carbon-stealth',
    name: 'Carbon Matrix Stealth',
    type: 'carbon',
    finish: 'Matte Carbon with Titanium Fasteners',
    description: 'Full one-piece carbon fiber rim with titanium center-lock mechanism for ultimate rigidity.',
    priceDelta: 32000
  }
];

export const INTERIOR_OPTIONS: InteriorOption[] = [
  {
    id: 'obsidian-alcantara',
    name: 'Obsidian & Gold Stitch',
    hex: '#141416',
    accentHex: '#D4AF37',
    material: 'Full-Grain Nappa Leather & Perforated Alcantara',
    description: 'Deep midnight black leather with precision geometric Aurelian gold hand-stitching and exposed matte carbon trim.',
    priceDelta: 0
  },
  {
    id: 'ivory-minimalist',
    name: 'Ivory Horizon',
    hex: '#ECE7DE',
    accentHex: '#8C7A54',
    material: 'Ethical Bio-Engineered Silk Leather',
    description: 'Ultra-refined light ivory leather cockpit with satin titanium appointments and subtle warm amber ambient highlights.',
    priceDelta: 22000
  },
  {
    id: 'aurelian-bespoke',
    name: 'Aurelian Bespoke Heritage',
    hex: '#4A3518',
    accentHex: '#E5C158',
    material: 'Aniline Cognac Saddle Leather & Solid Gold Inlays',
    description: 'Hand-dyed rich saddle cognac leather with 24k gold leaf inlays along the center console tunnel.',
    priceDelta: 48000
  }
];

export const DRIVING_MODES: DrivingMode[] = [
  {
    id: 'night-city',
    name: 'NEURAL CRUISE',
    environment: 'Nocturnal Metropolis',
    location: 'Zurich / Monaco Bay',
    topSpeedReached: '140 KM/H',
    torqueDistribution: '30% Front / 70% Rear',
    image: '/images/hero_hypercar.jpg',
    description: 'Silently gliding through nocturnal skyline corridors with adaptive regenerative suspension and quiet cabin isolation.',
    ambientTone: '#D4AF37'
  },
  {
    id: 'alpine-pass',
    name: 'APEX CORNERING',
    environment: 'Alpine Mountain Passes',
    location: 'Gotthard Pass, Switzerland',
    topSpeedReached: '245 KM/H',
    torqueDistribution: '50% Front / 50% Rear Torque Vectoring',
    image: '/images/driving_scene.jpg',
    description: 'Active rear-wheel steering and instant millisecond torque vectoring carving hairpin curves with unshakable precision.',
    ambientTone: '#38BDF8'
  },
  {
    id: 'autobahn-velocity',
    name: 'HYPER VELOCITY (V-MAX)',
    environment: 'Unlimited Highway',
    location: 'German Autobahn A95',
    topSpeedReached: '380 KM/H',
    torqueDistribution: '25% Front / 75% Rear Quad-Motor Maximum',
    image: '/images/aerodynamics_tunnel.jpg',
    description: 'Active aerodynamic spoiler adjusts to negative angle, lowering chassis by 25mm to slice air with 0.19 Cd drag.',
    ambientTone: '#EF4444'
  }
];

export const TECH_FEATURES = [
  {
    id: 'ai-neural',
    title: 'AI Neural Driving Core',
    subtitle: 'Self-Evolving Vehicle Dynamics',
    description: 'Dual neural processing units evaluate 10,000 surface inputs per second, adjusting individual wheel torque and active damper stiffness before the vehicle even enters the apex.',
    stats: '10,000 Hz Sampling'
  },
  {
    id: 'solid-state',
    title: '900V Solid-State Battery',
    subtitle: '140 kWh Energy Density',
    description: 'Proprietary silicon-anode solid electrolyte cells with zero thermal runaway risk. Delivers 1,200 continuous horsepower with virtually no thermal degradation.',
    stats: '450 kW Charging Speed'
  },
  {
    id: 'active-aero',
    title: 'Morphing Aerodynamics',
    subtitle: 'Dynamic Surface Vectoring',
    description: 'Electro-actuated carbon front diffusers and dual-plane active rear spoiler provide up to 850 kg of downforce at 300 km/h with air-brake deceleration.',
    stats: '850 kg Downforce'
  },
  {
    id: 'cockpit-hologram',
    title: 'Spatial Cockpit Display',
    subtitle: 'Curved Floating OLED Cluster',
    description: 'Anti-reflective OLED panoramic glass cluster with real-time biometric driver monitoring, heads-up path projection, and tactile haptic controls.',
    stats: '8K Curved Glass'
  },
  {
    id: 'quad-motor',
    title: 'Quad Axial-Flux Powertrain',
    subtitle: 'Independent 4-Wheel Drive',
    description: 'Four bespoke ultra-compact axial flux motors mounted directly inside each subframe, providing true mechanical 4-wheel independent torque vectoring.',
    stats: '1,650 Nm Torque'
  }
];
