"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";
import { Sparkles, Calendar, Home, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroProps {
  onCheckAvailability: (query: {
    villaId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }) => void;
}

const HERO_SLIDES = [
  {
    image: "/images/hero/hero-luxury-villa.jpg",
    title: "Crystal Turquoise Swimming Pool",
    subtitle: "Son Tra Coastline Sanctuary",
  },
  {
    image: "/images/gallery/garden-exterior.jpg",
    title: "Architectural Stone Facade & Tropical Lawn",
    subtitle: "Private Gated Coastal Living",
  },
  {
    image: "/images/gallery/bedroom-poolview.jpg",
    title: "Poolside En-Suite Master Residence",
    subtitle: "Floor-to-Ceiling Glass Harmony",
  },
];

export const Hero: React.FC<HeroProps> = ({ onCheckAvailability }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVilla, setSelectedVilla] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  // Automatic smooth slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      villaId: selectedVilla || undefined,
      checkIn: checkIn || undefined,
      checkOut: checkOut || undefined,
      guests: guests || 2,
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0f12] text-white">
      {/* Background Hero Image Slides with Smooth Cross-fade */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover object-center scale-105 transition-transform duration-[8000ms] ease-out"
            />
          </div>
        ))}

        {/* Cinematic Vignette Overlay (Ensures headline is 100% crisp without image text interference) */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0e1114] via-black/45 to-black/75 backdrop-brightness-95" />
      </div>

      {/* Hero Content */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 pt-32 pb-24 text-center flex flex-col items-center">
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#EAE4D7] text-xs uppercase tracking-[0.2em] mb-6 shadow-sm">
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
            href="#gallery"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm uppercase tracking-widest font-medium px-8 py-4 rounded-full transition-all duration-300"
          >
            <span>View Villa Spaces</span>
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

      {/* Bottom Corner Slide Controls */}
      <div className="hidden sm:flex absolute bottom-8 right-8 z-30 items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs">
        <span className="text-[11px] text-neutral-400">
          {HERO_SLIDES[currentSlide].title}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={prevSlide}
            className="p-1 hover:text-[#C2A476] transition-colors"
            aria-label="Previous Hero Image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] text-neutral-300 font-mono px-1">
            0{currentSlide + 1} / 0{HERO_SLIDES.length}
          </span>
          <button
            onClick={nextSlide}
            className="p-1 hover:text-[#C2A476] transition-colors"
            aria-label="Next Hero Image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
