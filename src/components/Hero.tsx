"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import {
  Sparkles,
  Calendar,
  Home,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Building2,
  MapPin,
} from "lucide-react";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  // Automatic smooth slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDropdownOpen(false);
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

  const selectedVillaData = siteConfig.villas.find((v) => v.id === selectedVilla);

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

        {/* Cinematic Vignette Overlay */}
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
            href="#experience"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm uppercase tracking-widest font-medium px-8 py-4 rounded-full transition-all duration-300"
          >
            <span>The Villa Lifestyle</span>
          </a>
        </div>

        {/* Floating Luxury Availability Bar */}
        <div className="mt-14 w-full max-w-4xl bg-white/95 backdrop-blur-xl text-neutral-900 rounded-2xl md:rounded-full p-4 md:p-3 shadow-2xl border border-white/30 relative">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center"
          >
            {/* Custom Luxury Villa Selector (Smooth Animated Dropdown) */}
            <div
              ref={dropdownRef}
              className="relative px-3 py-1.5 border-b md:border-b-0 md:border-r border-neutral-200"
            >
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="w-full flex items-center gap-3 p-1.5 rounded-xl hover:bg-neutral-50/80 transition-all duration-200 text-left focus:outline-none group cursor-pointer"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
              >
                <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] border border-[#E8E0D2] flex items-center justify-center text-[#C2A476] flex-shrink-0 group-hover:scale-105 group-hover:bg-[#f5ede0] transition-all">
                  <Home className="w-4 h-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-neutral-400 group-hover:text-[#A6834F] transition-colors">
                    Select Sanctuary
                  </span>
                  <span className="block text-xs sm:text-sm font-semibold text-neutral-900 truncate mt-0.5">
                    {selectedVillaData ? selectedVillaData.name : "All 4 Villas"}
                  </span>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-[#C2A476] transition-transform duration-300 flex-shrink-0 ${
                    isDropdownOpen ? "rotate-180 text-[#A6834F]" : "group-hover:translate-y-0.5"
                  }`}
                />
              </button>

              {/* Animated Luxury Popover Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 sm:left-auto md:left-0 top-[calc(100%+14px)] w-[calc(100vw-3rem)] sm:w-84 md:w-96 max-w-sm bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-[#E8E2D5] p-2 z-50 text-neutral-900 overflow-hidden"
                  >
                    {/* Header inside popover */}
                    <div className="px-3 py-2 border-b border-neutral-100 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400">
                        Choose Your Sanctuary
                      </span>
                      <span className="text-[10px] font-semibold text-[#A6834F] bg-[#FAF6EE] px-2 py-0.5 rounded-full border border-[#E8E0D2]">
                        4 Residences
                      </span>
                    </div>

                    <div className="py-1 max-h-[340px] overflow-y-auto space-y-1">
                      {/* Option: All 4 Villas */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedVilla("");
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-200 group cursor-pointer ${
                          selectedVilla === ""
                            ? "bg-[#FAF7F2] text-neutral-900 font-semibold ring-1 ring-[#C2A476]/30"
                            : "hover:bg-[#FAF8F5] text-neutral-700"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] border border-[#E8E0D2] flex items-center justify-center text-[#C2A476] flex-shrink-0 group-hover:scale-105 transition-transform">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-semibold truncate group-hover:text-[#A6834F] transition-colors">
                              All 4 Villas
                            </p>
                            <p className="text-[11px] text-neutral-400 truncate">
                              Son Tra & Ngu Hanh Son Sanctuaries
                            </p>
                          </div>
                        </div>
                        {selectedVilla === "" && (
                          <div className="w-6 h-6 rounded-full bg-[#C2A476]/15 flex items-center justify-center text-[#A6834F] flex-shrink-0 ml-2">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>

                      {/* Each Villa Item with Thumbnail Preview */}
                      {siteConfig.villas.map((v) => {
                        const isSelected = selectedVilla === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => {
                              setSelectedVilla(v.id);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-200 group cursor-pointer ${
                              isSelected
                                ? "bg-[#FAF7F2] text-neutral-900 font-semibold ring-1 ring-[#C2A476]/40"
                                : "hover:bg-[#FAF8F5] text-neutral-700"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-11 h-11 rounded-xl overflow-hidden relative border border-[#EAE5DC] flex-shrink-0 shadow-sm bg-neutral-100">
                                <Image
                                  src={v.image}
                                  alt={v.name}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute top-0.5 left-0.5 bg-black/75 backdrop-blur-sm text-white text-[9px] font-bold px-1 rounded">
                                  {v.code}
                                </div>
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <p className="text-xs sm:text-sm font-semibold truncate group-hover:text-[#A6834F] transition-colors">
                                    {v.name}
                                  </p>
                                </div>
                                <p className="text-[11px] text-neutral-400 truncate">
                                  {v.district} • {v.bedrooms} PN • {v.poolType}
                                </p>
                              </div>
                            </div>
                            {isSelected && (
                              <div className="w-6 h-6 rounded-full bg-[#C2A476]/15 flex items-center justify-center text-[#A6834F] flex-shrink-0 ml-2">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Check-in Date */}
            <div
              onClick={() => {
                try {
                  checkInRef.current?.showPicker?.();
                } catch {
                  checkInRef.current?.focus();
                }
              }}
              className="flex items-center gap-3 px-3 py-1.5 border-b md:border-b-0 md:border-r border-neutral-200 cursor-pointer hover:bg-neutral-50/80 rounded-xl transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] border border-[#E8E0D2] flex items-center justify-center text-[#C2A476] flex-shrink-0 group-hover:scale-105 group-hover:bg-[#f5ede0] transition-all">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-left w-full min-w-0">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-400 group-hover:text-[#A6834F] transition-colors cursor-pointer">
                  Check-in Date
                </label>
                <input
                  ref={checkInRef}
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full text-xs sm:text-sm font-semibold bg-transparent focus:outline-none text-neutral-800 cursor-pointer"
                />
              </div>
            </div>

            {/* Check-out Date */}
            <div
              onClick={() => {
                try {
                  checkOutRef.current?.showPicker?.();
                } catch {
                  checkOutRef.current?.focus();
                }
              }}
              className="flex items-center gap-3 px-3 py-1.5 border-b md:border-b-0 md:border-r border-neutral-200 cursor-pointer hover:bg-neutral-50/80 rounded-xl transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] border border-[#E8E0D2] flex items-center justify-center text-[#C2A476] flex-shrink-0 group-hover:scale-105 group-hover:bg-[#f5ede0] transition-all">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-left w-full min-w-0">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-neutral-400 group-hover:text-[#A6834F] transition-colors cursor-pointer">
                  Check-out Date
                </label>
                <input
                  ref={checkOutRef}
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full text-xs sm:text-sm font-semibold bg-transparent focus:outline-none text-neutral-800 cursor-pointer"
                />
              </div>
            </div>

            {/* Submit CTA Button */}
            <div className="px-2">
              <button
                type="submit"
                className="w-full bg-[#14171A] hover:bg-[#C2A476] text-white py-3.5 px-6 rounded-xl md:rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Check Dates</span>
                <ArrowRight className="w-4 h-4 text-[#C2A476] group-hover:text-white group-hover:translate-x-1 transition-all" />
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
            className="p-1 hover:text-[#C2A476] transition-colors cursor-pointer"
            aria-label="Previous Hero Image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] text-neutral-300 font-mono px-1">
            0{currentSlide + 1} / 0{HERO_SLIDES.length}
          </span>
          <button
            onClick={nextSlide}
            className="p-1 hover:text-[#C2A476] transition-colors cursor-pointer"
            aria-label="Next Hero Image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
