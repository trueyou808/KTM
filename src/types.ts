export interface BikeSpec {
  displacement: string;
  maxPower: string;
  maxTorque: string;
  dryWeight: string;
  seatHeight: string;
  fuelCapacity: string;
  topSpeed: string;
  acceleration: string; // 0-100 or 0-60
  transmission: string;
  brakes: string;
  suspension: string;
}

export interface Bike {
  id: string;
  name: string;
  tagline: string;
  category: 'Urban Naked' | 'Streetfighter' | 'Corner Rocket';
  price: string;
  startingPriceNumber: number;
  specs: BikeSpec;
  image: string;
  shortDesc: string;
  longDesc: string;
  highlights: string[];
  colorOptions: { name: string; hex: string }[];
  revPitch: number; // For the audio rev engine
}

export interface TestRideSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  bikeModel: string;
  location: string;
  date: string;
  timeSlot: string;
  hasValidLicense: boolean;
  ridingExperience: 'beginner' | 'intermediate' | 'expert';
  submittedAt: string;
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  discount: string;
  code: string;
  validTill: string;
  description: string;
  eligibleBikes: string[];
}

export interface Showroom {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  features: string[];
  isFlagship?: boolean;
}
