"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";
import { Sparkles, Calendar, Users, Home, ArrowRight } from "lucide-react";

interface HeroProps {
  onCheckAvailability: (query: {
    villaId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onCheckAvailability }) => {
  const [selectedVilla, setSelectedVilla] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      villaId: selectedVilla || undefined,
      checkIn: checkIn || undefined,
      checkOut: checkOut || undefined,
      guests: guests || 2,
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Hero Image with Ambient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/villas/b1-villa.jpg"
          alt="Luxury Villa Da Nang"
          fill
          priority
          className="object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite] opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1114] via-black/40 to-black/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24 text-center flex flex-col items-center">
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#EAE4D7] text-xs uppercase tracking-[0.2em] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#C2A476]" />
          <span>Exclusive Private Sanctuaries</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.1] text-white max-w-4xl drop-shadow-md">
          A Symphony of <span className="italic font-normal text-[#C2A476]">Light, Water</span> & Architectural Serenity
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 font-light max-w-2xl leading-relaxed">
          Four private, architecturally designed pool villas across Da Nang&apos;s coveted Son Tra and Ngu Hanh Son coastlines. Dedicated to absolute tranquility.
        </p>

        {/* Quick CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#villas"
            className="inline-flex items-center gap-2 bg-[#C2A476] hover:bg-[#a88a59] text-white text-xs md:text-sm uppercase tracking-widest font-semibold px-8 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <span>Explore The 4 Villas</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#experience"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm uppercase tracking-widest font-medium px-8 py-4 rounded-full transition-all duration-300"
          >
            <span>The Villa Lifestyle</span>
          </a>
        </div>

        {/* Floating Quick Availability Bar */}
        <div className="mt-14 w-full max-w-4xl bg-white/95 backdrop-blur-xl text-neutral-900 rounded-2xl md:rounded-full p-4 md:p-3 shadow-2xl border border-white/30">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center"
          >
            {/* Villa Selector */}
            <div className="flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-neutral-200">
              <Home className="w-5 h-5 text-[#C2A476] flex-shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                  Select Sanctuary
                </label>
                <select
                  value={selectedVilla}
                  onChange={(e) => setSelectedVilla(e.target.value)}
                  className="w-full text-xs sm:text-sm font-semibold bg-transparent focus:outline-none text-neutral-800 cursor-pointer"
                >
                  <option value="">All 4 Villas</option>
                  {siteConfig.villas.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.district})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Check-in Date */}
            <div className="flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-neutral-200">
              <Calendar className="w-5 h-5 text-[#C2A476] flex-shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full text-xs sm:text-sm font-semibold bg-transparent focus:outline-none text-neutral-800 cursor-pointer"
                />
              </div>
            </div>

            {/* Check-out Date */}
            <div className="flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-neutral-200">
              <Calendar className="w-5 h-5 text-[#C2A476] flex-shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full text-xs sm:text-sm font-semibold bg-transparent focus:outline-none text-neutral-800 cursor-pointer"
                />
              </div>
            </div>

            {/* Submit / Inquire Button */}
            <div className="px-2">
              <button
                type="submit"
                className="w-full bg-[#14171A] hover:bg-[#C2A476] text-white py-3.5 px-6 rounded-xl md:rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Check Dates</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
