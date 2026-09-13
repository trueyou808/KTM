import { Showroom } from '../types';

export const showroomsData: Showroom[] = [
  {
    id: 'showroom-apex-downtown',
    name: 'Apex Central Flagship Showroom',
    city: 'Downtown Motor Hub',
    address: '420 Orange Boulevard, Speed District, Metro City 90015',
    phone: '+1 (800) 555-DUKE / +1 (213) 555-0199',
    email: 'flagship@ktm-inspired.motorcycles',
    hours: {
      weekdays: '09:00 AM - 08:00 PM',
      weekends: '10:00 AM - 06:00 PM'
    },
    features: [
      'Full Duke Lineup On Display',
      'VIP Dyno Testing Bay',
      'PowerWear Gear & Helmet Fitting Lounge',
      'Express Master Service Workshop'
    ],
    isFlagship: true
  },
  {
    id: 'showroom-trackside-circuit',
    name: 'Trackside Pro Experience Center',
    city: 'Circuit Point Raceway',
    address: '88 Apex Turn Way, Grand Prix Complex, Speedway CA 91761',
    phone: '+1 (800) 555-0144 / +1 (909) 555-0182',
    email: 'trackside@ktm-inspired.motorcycles',
    hours: {
      weekdays: '08:30 AM - 07:00 PM',
      weekends: '08:00 AM - 07:00 PM'
    },
    features: [
      'Paddock Test Track Access',
      'WP Suspension Setup Tuning Lab',
      'Race ECU Diagnostics',
      'Certified Riding Academy'
    ],
    isFlagship: false
  },
  {
    id: 'showroom-metro-coastal',
    name: 'Westcoast Performance Studio',
    city: 'Harbor Marina District',
    address: '1504 Coastal Highway, Pier 12, Oceanport CA 92663',
    phone: '+1 (800) 555-0177 / +1 (949) 555-0163',
    email: 'westcoast@ktm-inspired.motorcycles',
    hours: {
      weekdays: '09:30 AM - 07:30 PM',
      weekends: '10:00 AM - 05:00 PM'
    },
    features: [
      'Urban Test Ride Street Loop',
      'Customized Decal & Livery Studio',
      'Same-Day Delivery Hub',
      'Finance & Insurance Desk'
    ],
    isFlagship: false
  }
];
