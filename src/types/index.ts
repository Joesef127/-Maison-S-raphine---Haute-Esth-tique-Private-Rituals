export type ServiceCategory = 
  | 'all'
  | 'nails'
  | 'lashes'
  | 'brows'
  | 'skincare'
  | 'makeup'
  | 'packages';

export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  category: ServiceCategory;
  categoryLabel: string;
  price: number;
  duration: number; // in minutes
  description: string;
  included: string[];
  preparation: string;
  aftercare: string;
  popular?: boolean;
  signature?: boolean;
  accentNote: string;
  audioGuideScript: string;
  artStyle: 'nails' | 'lashes' | 'brows' | 'skincare' | 'makeup' | 'package';
}

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  applicableCategories: ServiceCategory[];
}

export interface Practitioner {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  bio: string;
  quote: string;
  availableDays: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  city: string;
  serviceName: string;
  quote: string;
  rating: number;
  verifiedVisit: string;
  portraitInitials: string;
}

export interface GalleryLook {
  id: string;
  title: string;
  category: ServiceCategory;
  artisan: string;
  technique: string;
  description: string;
  palette: string[];
  timeRequired: string;
  isBeforeAfter?: boolean;
  beforeNotes?: string;
  afterNotes?: string;
}

export interface BookingState {
  service: ServiceItem | null;
  selectedAddOns: AddOnItem[];
  practitioner: Practitioner | null;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  specialNotes: string;
  bookingCode?: string;
  totalPrice: number;
  totalDuration: number;
}
