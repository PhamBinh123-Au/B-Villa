import { BookingInquiry, InquiryStatus } from "@/types";

const STORAGE_KEY = "danang_villa_booking_inquiries_v1";
export const SYNC_CHANNEL_NAME = "danang_villa_realtime_bookings";
export const LOCAL_EVENT_NAME = "danang_realtime_booking_event";

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

export interface RealtimeSyncPayload {
  action: "ADD" | "UPDATE" | "DELETE" | "RESET";
  inquiry?: BookingInquiry;
  id?: string;
  timestamp: number;
}

function broadcastSync(payload: RealtimeSyncPayload) {
  if (typeof window === "undefined") return;

  // 1. Dispatch custom event for current window
  try {
    window.dispatchEvent(
      new CustomEvent(LOCAL_EVENT_NAME, { detail: payload })
    );
  } catch (err) {
    console.warn("Local event dispatch error", err);
  }

  // 2. BroadcastChannel for instant cross-tab communication
  try {
    if (typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
      channel.postMessage(payload);
      channel.close();
    }
  } catch (err) {
    console.warn("BroadcastChannel error", err);
  }
}

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
      broadcastSync({
        action: "ADD",
        inquiry: newInquiry,
        timestamp: Date.now(),
      });
    }
    return newInquiry;
  },

  updateStatus(id: string, status: InquiryStatus): void {
    const inquiries = this.getInquiries();
    let updatedInquiry: BookingInquiry | undefined;
    const updated = inquiries.map((item) => {
      if (item.id === id) {
        updatedInquiry = { ...item, status };
        return updatedInquiry;
      }
      return item;
    });

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      broadcastSync({
        action: "UPDATE",
        id,
        inquiry: updatedInquiry,
        timestamp: Date.now(),
      });
    }
  },

  deleteInquiry(id: string): void {
    const inquiries = this.getInquiries();
    const updated = inquiries.filter((item) => item.id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      broadcastSync({
        action: "DELETE",
        id,
        timestamp: Date.now(),
      });
    }
  },

  resetSampleData(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_INITIAL_INQUIRIES));
      broadcastSync({
        action: "RESET",
        timestamp: Date.now(),
      });
    }
  },

  /**
   * Subscribe to real-time events across all tabs, local events, and storage updates
   */
  subscribe(callback: (payload: RealtimeSyncPayload) => void): () => void {
    if (typeof window === "undefined") return () => {};

    // 1. BroadcastChannel listener (cross-tab)
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof BroadcastChannel !== "undefined") {
        channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
        channel.onmessage = (event: MessageEvent<RealtimeSyncPayload>) => {
          if (event.data) {
            callback(event.data);
          }
        };
      }
    } catch (err) {
      console.warn("Failed to create BroadcastChannel", err);
    }

    // 2. Storage event listener (standard browser cross-tab event)
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        callback({
          action: "UPDATE",
          timestamp: Date.now(),
        });
      }
    };
    window.addEventListener("storage", handleStorage);

    // 3. Local custom event listener (same-tab)
    const handleLocal = (event: Event) => {
      const customEvent = event as CustomEvent<RealtimeSyncPayload>;
      if (customEvent.detail) {
        callback(customEvent.detail);
      }
    };
    window.addEventListener(LOCAL_EVENT_NAME, handleLocal);

    // Return cleanup function
    return () => {
      if (channel) {
        channel.close();
      }
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(LOCAL_EVENT_NAME, handleLocal);
    };
  },
};
