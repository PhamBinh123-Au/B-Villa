"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";
import { Villa } from "@/types";
import { bookingStore } from "@/lib/bookingStore";
import { X, Calendar, Users, Mail, Phone, User, CheckCircle2, Sparkles, MessageCircle } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedVilla?: Villa | null;
  initialDates?: { checkIn?: string; checkOut?: string; guests?: number };
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedVilla,
  initialDates,
}) => {
  const [villaId, setVillaId] = useState<string>("");
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

  useEffect(() => {
    if (preSelectedVilla) {
      setVillaId(preSelectedVilla.id);
    } else if (!villaId && siteConfig.villas.length > 0) {
      setVillaId(siteConfig.villas[0].id);
    }

    if (initialDates?.checkIn) setCheckIn(initialDates.checkIn);
    if (initialDates?.checkOut) setCheckOut(initialDates.checkOut);
    if (initialDates?.guests) setAdults(initialDates.guests);
  }, [preSelectedVilla, initialDates, isOpen]);

  if (!isOpen) return null;

  const currentVilla = siteConfig.villas.find((v) => v.id === villaId) || siteConfig.villas[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newInquiry = bookingStore.addInquiry({
        villaId: currentVilla.id,
        villaName: currentVilla.name,
        guestName,
        email,
        phone,
        checkIn: checkIn || new Date().toISOString().split("T")[0],
        checkOut: checkOut || new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
        adults: Number(adults),
        children: Number(children),
        specialRequests,
      });

      setSubmittedInquiryId(newInquiry.id);
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving your inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedInquiryId(null);
    setGuestName("");
    setEmail("");
    setPhone("");
    setSpecialRequests("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EAE5DC] overflow-hidden my-8">
        {/* Header Bar */}
        <div className="bg-[#14171A] text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C2A476] font-semibold">
              Direct Reservation Inquiry
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-light text-white">
              Reserve Your Sanctuary
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {submittedInquiryId ? (
            /* Success Confirmation State */
            <div className="text-center py-8 px-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border-2 border-[#C2A476] flex items-center justify-center mx-auto mb-6 text-[#C2A476]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-light mb-2">
                Inquiry Successfully Received
              </h4>
              <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6">
                Thank you, <span className="font-semibold text-neutral-900">{guestName}</span>. Your reservation inquiry for <span className="font-semibold text-neutral-900">{currentVilla.name}</span> has been logged directly with our concierge team.
              </p>

              <div className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 max-w-md mx-auto mb-8 text-left">
                <div className="flex justify-between items-center text-xs text-neutral-500 pb-2 border-b border-neutral-200">
                  <span>Reference Number:</span>
                  <span className="font-mono font-bold text-[#C2A476]">{submittedInquiryId}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-600 pt-2">
                  <span>Villa Selected:</span>
                  <span className="font-medium text-neutral-900">{currentVilla.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-600 pt-1">
                  <span>Dates:</span>
                  <span>{checkIn} to {checkOut}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-600 pt-1">
                  <span>Status:</span>
                  <span className="text-amber-600 font-medium uppercase text-[10px] bg-amber-50 px-2 py-0.5 rounded">
                    Sent to Host Dashboard
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`${siteConfig.contact.whatsapp}?text=Hello!%20I%20just%20submitted%20inquiry%20${submittedInquiryId}%20for%20${encodeURIComponent(currentVilla.name)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb355] text-white py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Now</span>
                </a>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center bg-[#14171A] hover:bg-neutral-800 text-white py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Villa Selection */}
              <div>
                <label className="block text-xs uppercase font-semibold tracking-wider text-neutral-700 mb-2">
                  Select Villa Residence
                </label>
                <select
                  value={villaId}
                  onChange={(e) => setVillaId(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C2A476] transition-all"
                  required
                >
                  {siteConfig.villas.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} — {v.poolType} ({v.district})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-neutral-500 mt-1 italic">
                  Max capacity: {currentVilla.maxGuests} guests • {currentVilla.bedrooms} En-suite Bedrooms
                </p>
              </div>

              {/* Check-in & Check-out Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold tracking-wider text-neutral-700 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C2A476]" />
                    <span>Check-in Date</span>
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C2A476]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold tracking-wider text-neutral-700 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C2A476]" />
                    <span>Check-out Date</span>
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C2A476]"
                    required
                  />
                </div>
              </div>

              {/* Guest Counts */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold tracking-wider text-neutral-700 mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#C2A476]" />
                    <span>Adults</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={currentVilla.maxGuests}
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C2A476]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold tracking-wider text-neutral-700 mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#C2A476]" />
                    <span>Children</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="6"
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C2A476]"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold tracking-wider text-neutral-700 mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#C2A476]" />
                    <span>Your Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. David Harrison"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C2A476]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold tracking-wider text-neutral-700 mb-2 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#C2A476]" />
                    <span>Phone or WhatsApp</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +84 905 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C2A476]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold tracking-wider text-neutral-700 mb-2 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#C2A476]" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C2A476]"
                  required
                />
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs uppercase font-semibold tracking-wider text-neutral-700 mb-2">
                  Special Requests / Arrival Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Airport pickup, early check-in, BBQ arrangement, etc."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C2A476] resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#14171A] hover:bg-[#C2A476] text-white py-4 px-6 rounded-2xl text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-[#C2A476] group-hover:text-white" />
                  <span>{isSubmitting ? "Submitting Inquiry..." : "Submit Reservation Inquiry"}</span>
                </button>
                <p className="text-[11px] text-center text-neutral-400 mt-2">
                  No payment required now. Our team will verify availability and confirm within 1 hour.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
