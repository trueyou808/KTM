import { Bike } from '../types';

import duke125Img from '../assets/images/duke_125_rider_1789319819786.jpg';
import duke200Img from '../assets/images/duke_200_pulse_1789319804878.jpg';
import duke250Img from '../assets/images/duke_250_street_1789319791678.jpg';
import duke390Img from '../assets/images/duke_390_beast_1789319777936.jpg';

export const bikesData: Bike[] = [
  {
    id: 'ktm-125-duke',
    name: 'KTM 125 Duke',
    tagline: 'THE YOUNG BEAST',
    category: 'Urban Naked',
    price: '$4,899',
    startingPriceNumber: 4899,
    image: duke125Img,
    shortDesc: 'The ultimate entry ticket into the Naked streetfighter domain. Lightweight, razor-sharp chassis with punchy 4-stroke performance.',
    longDesc: 'The KTM 125 Duke packs ferocious racing attitude into an agile, A1-compliant chassis. Engineered with an ultralight trellis subframe, high-spec inverted WP APEX 43mm front forks, and Bosch dual-channel ABS, it delivers unfiltered track-bred agility for street navigation.',
    specs: {
      displacement: '124.7 cc',
      maxPower: '15 HP (11 kW) @ 10,000 RPM',
      maxTorque: '12 Nm @ 7,500 RPM',
      dryWeight: '139 kg',
      seatHeight: '830 mm',
      fuelCapacity: '13.4 L',
      topSpeed: '120 km/h',
      acceleration: '0-60 km/h in 4.9s',
      transmission: '6-speed claw shifted',
      brakes: 'ByBre 300mm radial 4-piston disc, ABS',
      suspension: 'WP APEX 43mm upside-down forks'
    },
    highlights: [
      'High-grade WP APEX inverted front forks',
      'Bosch 9.1 MB Dual Channel ABS with Supermoto mode',
      'Ultra-rigid steel tubular trellis frame',
      'Aggressive aerodynamic split LED daytime running lights'
    ],
    colorOptions: [
      { name: 'Electronic Orange', hex: '#FF6600' },
      { name: 'Ceramic White & Black', hex: '#E5E7EB' }
    ],
    revPitch: 145
  },
  {
    id: 'ktm-200-duke',
    name: 'KTM 200 Duke',
    tagline: 'STREET PRECISION',
    category: 'Streetfighter',
    price: '$5,499',
    startingPriceNumber: 5499,
    image: duke200Img,
    shortDesc: 'Pure adrenaline with class-leading power-to-weight ratio. Unflinching streetfighter dynamics built to slice through urban gridlock.',
    longDesc: 'The KTM 200 Duke embodies unfiltered performance. Equipped with a high-revving 199.5cc single-cylinder DOHC engine, ultra-compact underbelly exhaust, and razor-sharp geometric bodywork, it launches off the line with visceral punch and unflinching chassis feedback.',
    specs: {
      displacement: '199.5 cc',
      maxPower: '25 HP (18.4 kW) @ 10,000 RPM',
      maxTorque: '19.3 Nm @ 8,000 RPM',
      dryWeight: '148 kg',
      seatHeight: '822 mm',
      fuelCapacity: '13.5 L',
      topSpeed: '138 km/h',
      acceleration: '0-100 km/h in 9.2s',
      transmission: '6-speed sequential',
      brakes: '300mm Front Disc with ByBre caliper, Dual-channel ABS',
      suspension: 'WP APEX 43mm USD + Rear Monoshock'
    },
    highlights: [
      'Class-leading 25 HP power output',
      'Compact underslung exhaust system with low center of gravity',
      'Dual-channel ABS with Supermoto disengagement',
      'Sculpted 13.5L steel fuel tank with knee grip geometry'
    ],
    colorOptions: [
      { name: 'Dark Galvano Orange', hex: '#FF6600' },
      { name: 'Metallic Silver Stealth', hex: '#9CA3AF' }
    ],
    revPitch: 130
  },
  {
    id: 'ktm-250-duke',
    name: 'KTM 250 Duke',
    tagline: 'THE THRILL CHASER',
    category: 'Streetfighter',
    price: '$6,299',
    startingPriceNumber: 6299,
    image: duke250Img,
    shortDesc: 'The sweet spot of high-octane torque, modern LCD tech, and Quickshifter+ capability in a formidable mid-weight street weapon.',
    longDesc: 'Bridging everyday practicality with uncompromising sport ergonomics, the KTM 250 Duke brings a refined 248.8cc engine with power assist slipper clutch (PASC). Redesigned with aerodynamic tank shrouds, cast aluminum swingarm, and enhanced pillion ergonomics, it turns every commute into a high-speed sprint.',
    specs: {
      displacement: '248.8 cc',
      maxPower: '30 HP (22.1 kW) @ 9,250 RPM',
      maxTorque: '25 Nm @ 7,250 RPM',
      dryWeight: '163 kg',
      seatHeight: '820 mm',
      fuelCapacity: '15.0 L',
      topSpeed: '150 km/h',
      acceleration: '0-100 km/h in 7.4s',
      transmission: '6-speed with PASC Slipper Clutch',
      brakes: '320mm Front Rotor, ByBre 4-piston radial caliper',
      suspension: 'WP APEX Big Piston USD forks'
    },
    highlights: [
      'Quickshifter+ clutchless up & down gear shifts',
      'Power Assist Slipper Clutch (PASC) prevents rear wheel chatter',
      'Full LCD instrumentation with gear indicator & shift light',
      'Curved die-cast lightweight swingarm'
    ],
    colorOptions: [
      { name: 'Atlantic Blue & Orange', hex: '#1E3A8A' },
      { name: 'Ceramic Orange Carbon', hex: '#FF6600' }
    ],
    revPitch: 115
  },
  {
    id: 'ktm-390-duke',
    name: 'KTM 390 Duke',
    tagline: 'THE CORNER ROCKET',
    category: 'Corner Rocket',
    price: '$6,999',
    startingPriceNumber: 6999,
    image: duke390Img,
    shortDesc: 'The undisputed master of the mid-capacity jungle. 45 HP powerhouse, 5" bonded glass TFT display, Launch Control, and Cornering ABS.',
    longDesc: 'The KTM 390 Duke redefines corner-carving supremacy. Featuring the LC4c high-output single, compression and rebound adjustable WP APEX suspension, lean-angle sensitive traction control, and segment-first Launch Control, this machine is bred without compromises for adrenaline purists.',
    specs: {
      displacement: '398.7 cc (LC4c Engine)',
      maxPower: '45 HP (33 kW) @ 8,500 RPM',
      maxTorque: '39 Nm @ 6,500 RPM',
      dryWeight: '165 kg',
      seatHeight: '800 / 820 mm (Adjustable)',
      fuelCapacity: '15.0 L',
      topSpeed: '172 km/h',
      acceleration: '0-100 km/h in 4.8s',
      transmission: '6-speed with bi-directional Quickshifter+',
      brakes: '320mm radial rotor, Cornering ABS with Supermoto',
      suspension: 'WP APEX 43mm Open Cartridge with 5-click adjust'
    },
    highlights: [
      'Track Mode & Segment-First Launch Control',
      '5-click Compression & Rebound adjustable WP APEX suspension',
      '5-inch bonded glass full color TFT display with Bluetooth smartphone pairing',
      'Motorcycle Traction Control (MTC) with Lean-Angle Sensitivity'
    ],
    colorOptions: [
      { name: 'Iconic Duke Electric Orange', hex: '#FF6600' },
      { name: 'Atlantic Blue Racing Livery', hex: '#2563EB' }
    ],
    revPitch: 98
  }
];
