"use client";

import React from "react";
import { siteConfig } from "@/config/siteConfig";
import {
  Waves,
  ShieldCheck,
  Wifi,
  Sparkles,
  Car,
  UtensilsCrossed,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Waves: <Waves className="w-6 h-6 text-[#C2A476]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#C2A476]" />,
  Wifi: <Wifi className="w-6 h-6 text-[#C2A476]" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#C2A476]" />,
  Car: <Car className="w-6 h-6 text-[#C2A476]" />,
  UtensilsCrossed: <UtensilsCrossed className="w-6 h-6 text-[#C2A476]" />,
};

export const AmenitiesSection: React.FC = () => {
  return (
    <section id="amenities" className="py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C2A476] font-semibold">
          Uncompromised Comfort
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-neutral-900 mt-2 mb-4">
          Signature Amenities
        </h2>
        <div className="w-16 h-0.5 bg-[#C2A476] mx-auto mb-6" />
        <p className="text-neutral-600 text-sm sm:text-base font-light leading-relaxed">
          From the temperature-controlled plunge waters to the highest standard of daily housekeeping, every detail is tuned for pure relaxation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {siteConfig.amenities.map((item, index) => (
          <div
            key={index}
            className="p-8 rounded-3xl bg-white border border-[#EAE5DC] hover:border-[#C2A476]/50 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#14171A] group-hover:border-[#14171A] transition-all duration-300">
                {iconMap[item.icon] || <Sparkles className="w-6 h-6 text-[#C2A476]" />}
              </div>
              <h3 className="font-serif text-xl font-normal text-neutral-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center text-[11px] uppercase tracking-wider text-[#C2A476] font-semibold">
              <span>Included in your stay</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
