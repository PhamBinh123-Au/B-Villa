"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Sun, Compass, HeartHandshake } from "lucide-react";

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-[#14171A] text-white relative overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C2A476]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C2A476]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Story & Philosophy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#C2A476] text-xs uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Philosophy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight mb-6">
              Where Coastal Architecture Meets <span className="italic text-[#C2A476]">Soulful Solitude</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed mb-6">
              Our residences were conceived as an escape from the conventional hotel paradigm. Here, no lobbies crowd your arrival. Instead, you step directly into a private realm of serene swimming pools, luminous open-plan kitchens, and whisper-quiet bedrooms framed by tropical greenery.
            </p>
            <p className="text-neutral-400 text-sm font-light leading-relaxed mb-10">
              Whether you choose our 4-bedroom sanctuaries in Son Tra or the intimate 2-bedroom plunge pool villa in Ngu Hanh Son, every hour is shaped around stillness, comfort, and gracious local hospitality.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-l-2 border-[#C2A476] pl-4">
                <Sun className="w-5 h-5 text-[#C2A476] mb-2" />
                <h3 className="font-serif text-lg text-white font-medium">Endless Natural Light</h3>
                <p className="text-xs text-neutral-400 mt-1 font-light">
                  Floor-to-ceiling glass sliding doors bridging indoor living with poolside decks.
                </p>
              </div>

              <div className="border-l-2 border-[#C2A476] pl-4">
                <Compass className="w-5 h-5 text-[#C2A476] mb-2" />
                <h3 className="font-serif text-lg text-white font-medium">Prime Enclaves</h3>
                <p className="text-xs text-neutral-400 mt-1 font-light">
                  Quiet residential streets minutes from My Khe Beach and Son Tra Peninsula.
                </p>
              </div>

              <div className="border-l-2 border-[#C2A476] pl-4">
                <HeartHandshake className="w-5 h-5 text-[#C2A476] mb-2" />
                <h3 className="font-serif text-lg text-white font-medium">Bespoke Concierge</h3>
                <p className="text-xs text-neutral-400 mt-1 font-light">
                  Direct support for airport chauffeurs, grocery stocking, and private BBQ setups.
                </p>
              </div>

              <div className="border-l-2 border-[#C2A476] pl-4">
                <Sparkles className="w-5 h-5 text-[#C2A476] mb-2" />
                <h3 className="font-serif text-lg text-white font-medium">Pure Seclusion</h3>
                <p className="text-xs text-neutral-400 mt-1 font-light">
                  High privacy walls, gated entrances, and dedicated self or host check-in.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition */}
          <div className="relative">
            <div className="relative h-[480px] sm:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/images/villas/b2-villa.jpg"
                alt="Architectural Skylight Pool Villa"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase tracking-widest text-[#C2A476] font-semibold">
                  Featured Space • B2 Villa
                </span>
                <p className="font-serif text-xl sm:text-2xl text-white mt-1">
                  Indoor Skylight Waterfall Pool & Dining Pavilion
                </p>
              </div>
            </div>

            {/* Overlapping Small Card */}
            <div className="hidden sm:block absolute -bottom-8 -left-8 bg-[#1e2329]/95 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-2xl max-w-xs">
              <p className="text-xs text-[#C2A476] uppercase tracking-widest font-semibold mb-1">
                Guest Experience
              </p>
              <p className="text-xs text-neutral-300 italic font-light">
                &ldquo;Waking up to the morning sun reflecting off our private pool was the highlight of our Da Nang vacation.&rdquo;
              </p>
              <p className="text-[10px] text-neutral-400 mt-2 font-medium">
                — Verified Private Guest
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
