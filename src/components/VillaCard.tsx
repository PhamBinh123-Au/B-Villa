"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Villa } from "@/types";
import { MapPin, Users, Bed, Bath, Waves, Sparkles, Check, ChevronRight } from "lucide-react";

interface VillaCardProps {
  villa: Villa;
  onInquire: (villa: Villa) => void;
}

export const VillaCard: React.FC<VillaCardProps> = ({ villa, onInquire }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-[#EAE5DC] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between">
      {/* Image Container with Hover Scale */}
      <div className="relative h-72 sm:h-80 md:h-96 w-full overflow-hidden bg-neutral-100 cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
        <Image
          src={villa.image}
          alt={villa.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 flex gap-2 items-center">
          <span className="bg-[#14171A]/80 backdrop-blur-md text-[#C2A476] border border-[#C2A476]/30 text-xs font-serif font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
            {villa.code}
          </span>
          <span className="bg-white/85 backdrop-blur-md text-neutral-800 text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {villa.district}
          </span>
        </div>

        {/* Bottom Image Overlay Tagline */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-xs text-[#EAE4D7] tracking-wider uppercase font-medium">
            {villa.poolType}
          </p>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mt-0.5">
            {villa.name}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#C2A476] flex-shrink-0" />
            <span className="truncate">{villa.location}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-6 font-light">
            {villa.description}
          </p>

          {/* Key Property Specs (No Price, Focus on Luxury Capacity) */}
          <div className="grid grid-cols-4 gap-2 py-4 border-y border-[#EAE5DC] text-center mb-6 bg-[#FAF8F5]/60 rounded-xl">
            <div className="flex flex-col items-center justify-center p-1">
              <Bed className="w-4 h-4 text-[#C2A476] mb-1" />
              <span className="text-xs font-semibold text-neutral-800">{villa.bedrooms} Beds</span>
              <span className="text-[10px] text-neutral-400 uppercase">Suites</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1">
              <Bath className="w-4 h-4 text-[#C2A476] mb-1" />
              <span className="text-xs font-semibold text-neutral-800">{villa.bathrooms} Baths</span>
              <span className="text-[10px] text-neutral-400 uppercase">En-suite</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1">
              <Users className="w-4 h-4 text-[#C2A476] mb-1" />
              <span className="text-xs font-semibold text-neutral-800">{villa.maxGuests} Guests</span>
              <span className="text-[10px] text-neutral-400 uppercase">Capacity</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1">
              <Waves className="w-4 h-4 text-[#C2A476] mb-1" />
              <span className="text-xs font-semibold text-neutral-800">Private</span>
              <span className="text-[10px] text-neutral-400 uppercase">Pool</span>
            </div>
          </div>

          {/* Highlights */}
          <ul className="space-y-2 mb-6">
            {villa.highlights.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-neutral-600">
                <Check className="w-3.5 h-3.5 text-[#C2A476] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions (Strictly Inquiry & Reservation - NO PRICE) */}
        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={() => onInquire(villa)}
            className="flex-1 bg-[#14171A] hover:bg-[#C2A476] text-white py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-lg active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Request Availability</span>
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-3 rounded-xl border border-neutral-300 hover:border-neutral-900 text-neutral-700 hover:text-neutral-900 transition-colors"
            title="View Details"
          >
            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${showDetails ? "rotate-90" : ""}`} />
          </button>
        </div>

        {/* Expandable Details Drawer */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-neutral-200 text-xs text-neutral-600 animate-fade-in">
            <h4 className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px] mb-2">
              All Included Amenities:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {villa.amenities.map((amenity, i) => (
                <span
                  key={i}
                  className="bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md text-[11px]"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
