export interface Villa {
  id: string;
  name: string;
  code: string; // e.g. "B1", "B2", "B3", "B4"
  tagline: string;
  location: string;
  district: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  poolType: string;
  image: string;
  description: string;
  highlights: string[];
  amenities: string[];
}

export type InquiryStatus = "pending" | "contacted" | "confirmed" | "cancelled";

export interface BookingInquiry {
  id: string;
  villaId: string;
  villaName: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  specialRequests?: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface AmenityItem {
  icon: string;
  title: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
  };
  admin: {
    passcode: string;
  };
  social: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  villas: Villa[];
  amenities: AmenityItem[];
}
