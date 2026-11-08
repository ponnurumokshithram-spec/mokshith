export type CameraCategory = 'all' | 'flagship' | 'high_res' | 'hybrid' | 'compact' | 'aps_c' | 'cinema';

export interface ScoreBreakdown {
  autofocus: number; // e.g. 9.8 / 10
  imageQuality: number;
  video: number;
  ergonomics: number;
  value: number;
  overall: number;
}

export interface RetailerPrice {
  id: string;
  name: string;
  shortName: string;
  price: number;
  originalPrice: number;
  stockStatus: 'in_stock' | 'low_stock' | 'backorder' | 'preorder';
  stockCountText?: string;
  bundleIncludes?: string;
  shipping: string;
  url: string;
  lastUpdated: string;
  isLowestPrice?: boolean;
}

export interface SampleShot {
  title: string;
  genre: string;
  lensUsed: string;
  settings: {
    aperture: string;
    shutter: string;
    iso: string;
    focalLength: string;
  };
  description: string;
}

export interface CameraModel {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  category: CameraCategory;
  categoryLabel: string;
  releaseYear: number;
  sensor: string;
  sensorType: 'Full-Frame' | 'APS-C';
  megapixels: number;
  autofocusPoints: number;
  ibisStops: number;
  burstFps: number;
  videoSpecs: string;
  evfResolution: string;
  screenType: string;
  batteryLifeCipa: number;
  weightGrams: number;
  cardSlots: string;
  msrp: number;
  image: string;
  reviewSummary: string;
  editorialVerdict: string;
  scores: ScoreBreakdown;
  pros: string[];
  cons: string[];
  idealFor: string[];
  retailers: RetailerPrice[];
  sampleShots: SampleShot[];
  priceHistory: { month: string; price: number }[];
}

export type LensMount = 'FE' | 'E';
export type LensCategory = 'all' | 'prime' | 'standard_zoom' | 'wide_zoom' | 'telephoto_zoom' | 'macro';

export interface LensModel {
  id: string;
  name: string;
  brand: 'Sony G Master' | 'Sony G' | 'Sony Zeiss' | 'Sigma Art' | 'Tamron';
  mount: LensMount;
  category: LensCategory;
  categoryLabel: string;
  focalLength: string;
  maxAperture: string;
  apertureVal: number;
  filterDiameterMm: number;
  weightGrams: number;
  hasOss: boolean; // Optical SteadyShot
  burstFpsLimitWithSony: number; // e.g. 30 on GM, 15 on Sigma/Tamron
  supportsBreathingCompensation: boolean;
  linearXdMotors: boolean;
  price: number;
  image: string;
  overview: string;
  bestUses: string[];
  recommendedBodyIds: string[];
}

export interface TutorialStep {
  stepNumber: number;
  title: string;
  summary: string;
  details: string[];
  sonyMenuPath?: string;
  proTip: string;
}

export interface TutorialGuide {
  id: string;
  title: string;
  level: 'Beginner' | 'Essential' | 'Intermediate';
  estimatedMinutes: number;
  category: 'Autofocus' | 'Exposure' | 'Sony Menus' | 'Video & S-Log' | 'RAW Workflow';
  summary: string;
  heroTip: string;
  steps: TutorialStep[];
}

export interface ForumComment {
  id: string;
  author: string;
  authorRole?: string;
  avatarSeed: string;
  createdAt: string;
  content: string;
  upvotes: number;
}

export interface ForumThread {
  id: string;
  title: string;
  category: 'AF & Settings' | 'Street & Travel' | 'Video & Color' | 'Gear Chat';
  author: string;
  authorBadge: string;
  avatarSeed: string;
  createdAt: string;
  content: string;
  tags: string[];
  upvotes: number;
  repliesCount: number;
  comments: ForumComment[];
}

export interface GearListing {
  id: string;
  title: string;
  itemType: 'Camera Body' | 'E-Mount Lens' | 'Accessory / Cage';
  brand: 'Sony' | 'Sigma' | 'Tamron' | 'Other';
  condition: 'Mint (Like New)' | 'Excellent (9/10)' | 'Good (8/10)' | 'User (Functional)';
  askingPrice: number;
  originalPrice: number;
  shutterCount?: number;
  location: string;
  shippingOption: 'Free Insured Shipping' | 'Local Pickup Only' | 'Buyer Pays Shipping';
  sellerName: string;
  sellerRating: number;
  sellerDealsCount: number;
  tradeOffersAccepted: boolean;
  includesList: string[];
  description: string;
  postedAt: string;
  isUserCreated?: boolean;
}
