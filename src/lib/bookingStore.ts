import { BookingInquiry, InquiryStatus } from "@/types";

const STORAGE_KEY = "danang_villa_booking_inquiries_v1";

const SAMPLE_INITIAL_INQUIRIES: BookingInquiry[] = [
  {
    id: "INQ-9481",
    villaId: "b1-villa-4pn",
    villaName: "B1 Villa • 4 Bedrooms",
    guestName: "Alexander Wright",
    email: "alexander.wright@luxurytravel.co",
    phone: "+44 7700 900123",
    checkIn: "2026-11-15",
    checkOut: "2026-11-20",
    adults: 6,
    children: 2,
    specialRequests: "Requesting early check-in at 12:00 PM and airport chauffeur pickup.",
    status: "confirmed",
    createdAt: "2026-10-08T14:20:00.000Z",
  },
  {
    id: "INQ-9482",
    villaId: "b2-villa-4pn",
    villaName: "B2 Villa • 4 Bedrooms",
    guestName: "Elena Rostova",
    email: "elena.rostova@designstudio.ch",
    phone: "+41 79 123 4567",
    checkIn: "2026-12-02",
    checkOut: "2026-12-07",
    adults: 8,
    children: 0,
    specialRequests: "Celebrating birthday. Need private chef dining setup for one evening.",
    status: "pending",
    createdAt: "2026-10-09T08:15:00.000Z",
  },
  {
    id: "INQ-9483",
    villaId: "b3-villa-2pn",
    villaName: "B3 Villa • 2 Bedrooms",
    guestName: "Marcus & Chloe Vance",
    email: "chloe.vance@honeymoon.org",
    phone: "+61 400 123 987",
    checkIn: "2026-11-25",
    checkOut: "2026-11-30",
    adults: 2,
    children: 0,
    specialRequests: "Honeymoon stay. Would love flower arrangements by the plunge pool.",
    status: "contacted",
    createdAt: "2026-10-09T18:45:00.000Z",
  },
];

export const bookingStore = {
  getInquiries(): BookingInquiry[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_INITIAL_INQUIRIES));
        return SAMPLE_INITIAL_INQUIRIES;
      }
      return JSON.parse(data) as BookingInquiry[];
    } catch (err) {
      console.error("Failed to read inquiries from storage", err);
      return [];
    }
  },

  addInquiry(
    inquiryData: Omit<BookingInquiry, "id" | "createdAt" | "status">
  ): BookingInquiry {
    const inquiries = this.getInquiries();
    const newInquiry: BookingInquiry = {
      ...inquiryData,
      id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const updated = [newInquiry, ...inquiries];
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("storage_inquiries_updated"));
    }
    return newInquiry;
  },

  updateStatus(id: string, status: InquiryStatus): void {
    const inquiries = this.getInquiries();
    const updated = inquiries.map((item) =>
      item.id === id ? { ...item, status } : item
    );
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("storage_inquiries_updated"));
    }
  },

  deleteInquiry(id: string): void {
    const inquiries = this.getInquiries();
    const updated = inquiries.filter((item) => item.id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("storage_inquiries_updated"));
    }
  },

  resetSampleData(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_INITIAL_INQUIRIES));
      window.dispatchEvent(new Event("storage_inquiries_updated"));
    }
  },
};
