"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import {
  Sparkles,
  Calendar as CalendarIcon,
  Home,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Building2,
  X,
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

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Format "YYYY-MM-DD" to "Thu, 15 Oct"
function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3) return dateStr;
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function getTodayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDaysToString(dateStr: string, days: number): string {
  const parts = dateStr.split("-").map(Number);
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export const Hero: React.FC<HeroProps> = ({ onCheckAvailability }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVilla, setSelectedVilla] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  // Active open dropdown: null | 'villa' | 'checkIn' | 'checkOut'
  const [activeDropdown, setActiveDropdown] = useState<"villa" | "checkIn" | "checkOut" | null>(null);

  // Calendar month/year navigation state
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth());
  const [calYear, setCalYear] = useState(() => new Date().getFullYear());

  const barRef = useRef<HTMLDivElement>(null);

  const todayStr = getTodayString();

  // Automatic slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Close all popovers when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Update calendar view when opening date picker
  const openCalendar = (type: "checkIn" | "checkOut") => {
    const refDate = type === "checkIn" ? checkIn : checkOut;
    if (refDate) {
      const parts = refDate.split("-").map(Number);
      setCalYear(parts[0]);
      setCalMonth(parts[1] - 1);
    } else {
      const now = new Date();
      setCalYear(now.getFullYear());
      setCalMonth(now.getMonth());
    }
    setActiveDropdown((prev) => (prev === type ? null : type));
  };

  const handlePrevCalMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else {
      setCalMonth((m) => m - 1);
    }
  };

  const handleNextCalMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else {
      setCalMonth((m) => m + 1);
    }
  };

  const handleSelectCheckIn = (dateStr: string) => {
    setCheckIn(dateStr);
    // If checkOut is earlier or equal to new checkIn, automatically set checkOut = checkIn + 1 day
    if (!checkOut || checkOut <= dateStr) {
      setCheckOut(addDaysToString(dateStr, 1));
    }
    // Automatically transition to Check-Out calendar smoothly
    setActiveDropdown("checkOut");
  };

  const handleSelectCheckOut = (dateStr: string) => {
    setCheckOut(dateStr);
    setActiveDropdown(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveDropdown(null);
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

  // Calendar Day Grid calculations
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0d0f12] text-white z-30">
      {/* Background Hero Image Slides with Smooth Cross-fade (Overflow clipped strictly here) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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
      <div className="relative z-30 max-w-5xl mx-auto px-6 pt-32 pb-36 text-center flex flex-col items-center">
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
            className="inline-flex items-center gap-2 bg-[#C2A476] hover:bg-[#a88a59] text-white text-xs md:text-sm uppercase tracking-widest font-semibold px-8 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <span>Explore The 4 Villas</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#experience"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm uppercase tracking-widest font-medium px-8 py-4 rounded-full transition-all duration-300 cursor-pointer"
          >
            <span>The Villa Lifestyle</span>
          </a>
        </div>

        {/* Floating Luxury Availability Bar (100% Solid White Surface) */}
        <div
          ref={barRef}
          style={{ backgroundColor: "#ffffff" }}
          className="mt-14 w-full max-w-4xl bg-white text-neutral-900 rounded-2xl md:rounded-full p-4 md:p-3 shadow-[0_25px_70px_rgba(0,0,0,0.38)] border-2 border-[#E2D9CC] relative z-40"
        >
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center"
          >
            {/* 1. VILLA SELECTOR (100% Solid White Popover) */}
            <div className="relative px-3 py-1.5 border-b md:border-b-0 md:border-r border-neutral-200">
              <button
                type="button"
                onClick={() => setActiveDropdown((prev) => (prev === "villa" ? null : "villa"))}
                className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all duration-200 text-left focus:outline-none group cursor-pointer ${
                  activeDropdown === "villa" ? "bg-[#FAF6EE] ring-1 ring-[#C2A476]/50" : "hover:bg-neutral-50"
                }`}
                aria-haspopup="listbox"
                aria-expanded={activeDropdown === "villa"}
              >
                <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] border border-[#E8E0D2] flex items-center justify-center text-[#C2A476] flex-shrink-0 group-hover:scale-105 transition-all">
                  <Home className="w-4 h-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-neutral-600 group-hover:text-[#8A6B3D] transition-colors">
                    Select Sanctuary
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-neutral-900 truncate mt-0.5">
                    {selectedVillaData ? selectedVillaData.name : "All 4 Villas"}
                  </span>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-[#C2A476] transition-transform duration-300 flex-shrink-0 ${
                    activeDropdown === "villa" ? "rotate-180 text-[#8A6B3D]" : "group-hover:translate-y-0.5"
                  }`}
                />
              </button>

              {/* Villa Dropdown Popover (100% Solid White Background) */}
              <AnimatePresence>
                {activeDropdown === "villa" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ backgroundColor: "#ffffff" }}
                    className="absolute left-0 sm:left-auto md:left-0 top-[calc(100%+14px)] w-[calc(100vw-3rem)] sm:w-84 md:w-96 max-w-sm bg-white rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.38)] border-2 border-[#E2D9CC] p-3 z-50 text-neutral-900 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="px-3 py-2 bg-[#FAF7F2] border border-[#EAE2D5] rounded-xl mb-2 flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-700">
                        Choose Your Sanctuary
                      </span>
                      <span className="text-[10px] font-bold text-[#8A6B3D] bg-white px-2 py-0.5 rounded-full border border-[#E8E0D2]">
                        4 Residences
                      </span>
                    </div>

                    <div className="py-1 max-h-[360px] overflow-y-auto space-y-1.5">
                      {/* Option: All 4 Villas */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedVilla("");
                          setActiveDropdown(null);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-200 group cursor-pointer border ${
                          selectedVilla === ""
                            ? "bg-[#FAF7F2] border-[#C2A476] shadow-sm text-neutral-900 font-semibold"
                            : "bg-white border-transparent hover:bg-[#FAF8F5] text-neutral-700"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] border border-[#E8E0D2] flex items-center justify-center text-[#C2A476] flex-shrink-0 group-hover:scale-105 transition-transform">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold truncate group-hover:text-[#8A6B3D] transition-colors text-neutral-900">
                              All 4 Villas
                            </p>
                            <p className="text-[11px] text-neutral-600 truncate">
                              Son Tra & Ngu Hanh Son Sanctuaries
                            </p>
                          </div>
                        </div>
                        {selectedVilla === "" && (
                          <div className="w-6 h-6 rounded-full bg-[#C2A476] flex items-center justify-center text-white flex-shrink-0 ml-2 shadow-sm">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                        )}
                      </button>

                      {/* All 4 Villas strictly listed */}
                      {siteConfig.villas.map((v) => {
                        const isSelected = selectedVilla === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => {
                              setSelectedVilla(v.id);
                              setActiveDropdown(null);
                            }}
                            className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-200 group cursor-pointer border ${
                              isSelected
                                ? "bg-[#FAF7F2] border-[#C2A476] shadow-sm text-neutral-900 font-semibold"
                                : "bg-white border-transparent hover:bg-[#FAF8F5] text-neutral-700"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-12 h-12 rounded-xl overflow-hidden relative border border-[#EAE5DC] flex-shrink-0 shadow-sm bg-neutral-100">
                                <Image
                                  src={v.image}
                                  alt={v.name}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute top-0.5 left-0.5 bg-black/85 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                  {v.code}
                                </div>
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-bold truncate group-hover:text-[#8A6B3D] transition-colors text-neutral-900">
                                  {v.name}
                                </p>
                                <p className="text-[11px] text-neutral-600 truncate mt-0.5 font-medium">
                                  {v.district} • {v.bedrooms} PN • {v.poolType}
                                </p>
                              </div>
                            </div>
                            {isSelected && (
                              <div className="w-6 h-6 rounded-full bg-[#C2A476] flex items-center justify-center text-white flex-shrink-0 ml-2 shadow-sm">
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
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

            {/* 2. CHECK-IN DATE (100% Solid White Popover) */}
            <div className="relative px-3 py-1.5 border-b md:border-b-0 md:border-r border-neutral-200">
              <button
                type="button"
                onClick={() => openCalendar("checkIn")}
                className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all duration-200 text-left focus:outline-none group cursor-pointer ${
                  activeDropdown === "checkIn" ? "bg-[#FAF6EE] ring-1 ring-[#C2A476]/50" : "hover:bg-neutral-50"
                }`}
                aria-haspopup="dialog"
                aria-expanded={activeDropdown === "checkIn"}
              >
                <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] border border-[#E8E0D2] flex items-center justify-center text-[#C2A476] flex-shrink-0 group-hover:scale-105 transition-all">
                  <CalendarIcon className="w-4 h-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-neutral-600 group-hover:text-[#8A6B3D] transition-colors">
                    Check-in Date
                  </span>
                  <span
                    className={`block text-xs sm:text-sm truncate mt-0.5 ${
                      checkIn
                        ? "font-bold text-neutral-900"
                        : "text-neutral-500 font-medium"
                    }`}
                  >
                    {checkIn ? formatDisplayDate(checkIn) : "Select Arrival"}
                  </span>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-[#C2A476] transition-transform duration-300 flex-shrink-0 ${
                    activeDropdown === "checkIn" ? "rotate-180 text-[#8A6B3D]" : "group-hover:translate-y-0.5"
                  }`}
                />
              </button>

              {/* Check-in Calendar Popover (100% Solid White Background) */}
              <AnimatePresence>
                {activeDropdown === "checkIn" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ backgroundColor: "#ffffff" }}
                    className="absolute left-0 sm:left-auto md:left-0 top-[calc(100%+14px)] w-[calc(100vw-3rem)] sm:w-84 max-w-sm bg-white rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.38)] border-2 border-[#E2D9CC] p-4 z-50 text-neutral-900"
                  >
                    {/* Calendar Month Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#EAE2D5] mb-3 bg-[#FAF7F2] -m-4 mb-3 p-3.5 rounded-t-2xl">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#8A6B3D] block">
                          Check-in Date
                        </span>
                        <h4 className="font-serif font-bold text-lg text-neutral-900 leading-tight">
                          {MONTH_NAMES[calMonth]} {calYear}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handlePrevCalMonth}
                          className="p-2 rounded-xl bg-white hover:bg-neutral-100 border border-[#E2D9CC] text-neutral-800 transition-colors cursor-pointer shadow-sm"
                          aria-label="Previous month"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextCalMonth}
                          className="p-2 rounded-xl bg-white hover:bg-neutral-100 border border-[#E2D9CC] text-neutral-800 transition-colors cursor-pointer shadow-sm"
                          aria-label="Next month"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Weekday labels */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                      {DAY_LABELS.map((label) => (
                        <span
                          key={label}
                          className="text-xs font-bold text-neutral-600 py-1"
                        >
                          {label}
                        </span>
                      ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {/* Empty leading slots */}
                      {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-9" />
                      ))}

                      {/* Day cells */}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dayNum = i + 1;
                        const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                        const isPast = dateStr < todayStr;
                        const isSelected = dateStr === checkIn;
                        const isToday = dateStr === todayStr;

                        return (
                          <button
                            key={dateStr}
                            type="button"
                            disabled={isPast}
                            onClick={() => handleSelectCheckIn(dateStr)}
                            className={`h-9 w-9 mx-auto rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#C2A476] text-white font-bold shadow-md scale-105"
                                : isPast
                                ? "text-neutral-300 cursor-not-allowed"
                                : isToday
                                ? "border-2 border-[#C2A476] text-[#8A6B3D] hover:bg-[#FAF6EE] font-bold"
                                : "text-neutral-900 hover:bg-[#FAF6EE] hover:text-[#8A6B3D]"
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>

                    {/* Quick Preset Shortcuts */}
                    <div className="mt-3.5 pt-3 border-t border-[#EAE2D5] flex items-center justify-between text-xs">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleSelectCheckIn(todayStr)}
                          className="px-3 py-1.5 rounded-lg bg-[#FAF6EE] text-[#8A6B3D] border border-[#E8E0D2] hover:bg-[#f5ede0] font-semibold transition-colors cursor-pointer"
                        >
                          Today
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectCheckIn(addDaysToString(todayStr, 1))}
                          className="px-3 py-1.5 rounded-lg bg-[#FAF6EE] text-[#8A6B3D] border border-[#E8E0D2] hover:bg-[#f5ede0] font-semibold transition-colors cursor-pointer"
                        >
                          Tomorrow
                        </button>
                      </div>

                      {checkIn && (
                        <button
                          type="button"
                          onClick={() => {
                            setCheckIn("");
                            setActiveDropdown(null);
                          }}
                          className="text-neutral-500 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. CHECK-OUT DATE (100% Solid White Popover) */}
            <div className="relative px-3 py-1.5 border-b md:border-b-0 md:border-r border-neutral-200">
              <button
                type="button"
                onClick={() => openCalendar("checkOut")}
                className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all duration-200 text-left focus:outline-none group cursor-pointer ${
                  activeDropdown === "checkOut" ? "bg-[#FAF6EE] ring-1 ring-[#C2A476]/50" : "hover:bg-neutral-50"
                }`}
                aria-haspopup="dialog"
                aria-expanded={activeDropdown === "checkOut"}
              >
                <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] border border-[#E8E0D2] flex items-center justify-center text-[#C2A476] flex-shrink-0 group-hover:scale-105 transition-all">
                  <CalendarIcon className="w-4 h-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-neutral-600 group-hover:text-[#8A6B3D] transition-colors">
                    Check-out Date
                  </span>
                  <span
                    className={`block text-xs sm:text-sm truncate mt-0.5 ${
                      checkOut
                        ? "font-bold text-neutral-900"
                        : "text-neutral-500 font-medium"
                    }`}
                  >
                    {checkOut ? formatDisplayDate(checkOut) : "Select Departure"}
                  </span>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-[#C2A476] transition-transform duration-300 flex-shrink-0 ${
                    activeDropdown === "checkOut" ? "rotate-180 text-[#8A6B3D]" : "group-hover:translate-y-0.5"
                  }`}
                />
              </button>

              {/* Check-out Calendar Popover (100% Solid White Background) */}
              <AnimatePresence>
                {activeDropdown === "checkOut" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ backgroundColor: "#ffffff" }}
                    className="absolute left-0 sm:left-auto md:right-0 md:left-auto top-[calc(100%+14px)] w-[calc(100vw-3rem)] sm:w-84 max-w-sm bg-white rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.38)] border-2 border-[#E2D9CC] p-4 z-50 text-neutral-900"
                  >
                    {/* Calendar Month Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#EAE2D5] mb-3 bg-[#FAF7F2] -m-4 mb-3 p-3.5 rounded-t-2xl">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#8A6B3D] block">
                          Check-out Date
                        </span>
                        <h4 className="font-serif font-bold text-lg text-neutral-900 leading-tight">
                          {MONTH_NAMES[calMonth]} {calYear}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handlePrevCalMonth}
                          className="p-2 rounded-xl bg-white hover:bg-neutral-100 border border-[#E2D9CC] text-neutral-800 transition-colors cursor-pointer shadow-sm"
                          aria-label="Previous month"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextCalMonth}
                          className="p-2 rounded-xl bg-white hover:bg-neutral-100 border border-[#E2D9CC] text-neutral-800 transition-colors cursor-pointer shadow-sm"
                          aria-label="Next month"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Weekday labels */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                      {DAY_LABELS.map((label) => (
                        <span
                          key={label}
                          className="text-xs font-bold text-neutral-600 py-1"
                        >
                          {label}
                        </span>
                      ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {/* Empty leading slots */}
                      {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-9" />
                      ))}

                      {/* Day cells */}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dayNum = i + 1;
                        const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                        const minCheckout = checkIn ? addDaysToString(checkIn, 1) : addDaysToString(todayStr, 1);
                        const isPast = dateStr < minCheckout;
                        const isSelected = dateStr === checkOut;

                        return (
                          <button
                            key={dateStr}
                            type="button"
                            disabled={isPast}
                            onClick={() => handleSelectCheckOut(dateStr)}
                            className={`h-9 w-9 mx-auto rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#C2A476] text-white font-bold shadow-md scale-105"
                                : isPast
                                ? "text-neutral-300 cursor-not-allowed"
                                : "text-neutral-900 hover:bg-[#FAF6EE] hover:text-[#8A6B3D]"
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>

                    {/* Quick Preset Shortcuts */}
                    <div className="mt-3.5 pt-3 border-t border-[#EAE2D5] flex items-center justify-between text-xs">
                      <div className="flex gap-2">
                        {checkIn ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleSelectCheckOut(addDaysToString(checkIn, 2))}
                              className="px-2.5 py-1.5 rounded-lg bg-[#FAF6EE] text-[#8A6B3D] border border-[#E8E0D2] hover:bg-[#f5ede0] font-semibold transition-colors cursor-pointer"
                            >
                              +2 Nights
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSelectCheckOut(addDaysToString(checkIn, 3))}
                              className="px-2.5 py-1.5 rounded-lg bg-[#FAF6EE] text-[#8A6B3D] border border-[#E8E0D2] hover:bg-[#f5ede0] font-semibold transition-colors cursor-pointer"
                            >
                              +3 Nights
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSelectCheckOut(addDaysToString(checkIn, 5))}
                              className="px-2.5 py-1.5 rounded-lg bg-[#FAF6EE] text-[#8A6B3D] border border-[#E8E0D2] hover:bg-[#f5ede0] font-semibold transition-colors cursor-pointer"
                            >
                              +5 Nights
                            </button>
                          </>
                        ) : (
                          <span className="text-neutral-500 font-medium italic">
                            Select check-in first
                          </span>
                        )}
                      </div>

                      {checkOut && (
                        <button
                          type="button"
                          onClick={() => {
                            setCheckOut("");
                            setActiveDropdown(null);
                          }}
                          className="text-neutral-500 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. SUBMIT CTA BUTTON */}
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
