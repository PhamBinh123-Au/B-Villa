"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Sun, Compass, HeartHandshake, Eye, Waves } from "lucide-react";

const EXPERIENCE_PHOTOS = [
  {
    src: "/images/experience/experience-pool-main.jpg",
    tag: "Private Pool Living",
    title: "Crystal Turquoise Waters & Cascading Waterfall",
    description: "Sunlit linear swimming pool bordered by lush tropical greens and privacy walls.",
  },
  {
    src: "/images/experience/experience-lounge.jpg",
    tag: "Alfresco Serenity",
    title: "Sun-Drenched Poolside Relaxation Deck",
    description: "Pristine white architectural facade with seamless floor-to-ceiling glass access.",
  },
  {
    src: "/images/experience/experience-bath.jpg",
    tag: "Bespoke Wellness",
    title: "Sculpted Freestanding Soaking Bathtub",
    description: "Serene en-suite bathrooms with illuminated organic mirrors and walk-in showers.",
  },
  {
    src: "/images/experience/experience-waterfall.jpg",
    tag: "Architectural Stillness",
    title: "Lush Poolside Garden & Waterfall Jets",
    description: "The gentle acoustic sound of cascading water for meditative coastal peace.",
  },
];

export const ExperienceSection: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Auto-rotate experience photos gently
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % EXPERIENCE_PHOTOS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const currentPhoto = EXPERIENCE_PHOTOS[activePhotoIndex];

  return (
    <section id="experience" className="py-24 bg-[#14171A] text-white relative overflow-hidden">
      {/* Decorative Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C2A476]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C2A476]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Story & Philosophy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#C2A476] text-xs uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Sanctuary Philosophy</span>
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
                <Waves className="w-5 h-5 text-[#C2A476] mb-2" />
                <h3 className="font-serif text-lg text-white font-medium">Pure Seclusion</h3>
                <p className="text-xs text-neutral-400 mt-1 font-light">
                  High privacy walls, gated entrances, and dedicated self or host check-in.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase (Collection-wide High-Res Photos) */}
          <div className="relative">
            {/* Main Interactive Image Frame */}
            <div className="relative h-[480px] sm:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-neutral-900 group">
              {EXPERIENCE_PHOTOS.map((photo, idx) => (
                <div
                  key={photo.src}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === activePhotoIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              ))}

              {/* Gradient Vignette for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30 z-20 pointer-events-none" />

              {/* Top Badge: General Collection Tag */}
              <div className="absolute top-6 left-6 z-30">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#EAE4D7] text-[11px] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-[#C2A476]" />
                  <span>Curated Sanctuary Collection</span>
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-30">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#C2A476] font-semibold">
                    {currentPhoto.tag}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {EXPERIENCE_PHOTOS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePhotoIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          i === activePhotoIndex
                            ? "w-6 bg-[#C2A476]"
                            : "w-2 bg-white/40 hover:bg-white/70"
                        }`}
                        aria-label={`View photo ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-white font-medium leading-snug">
                  {currentPhoto.title}
                </h3>
                <p className="text-xs text-neutral-300 font-light mt-1 line-clamp-2">
                  {currentPhoto.description}
                </p>

                {/* Thumbnail Previews Bar */}
                <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-white/15">
                  {EXPERIENCE_PHOTOS.map((thumb, tIdx) => (
                    <button
                      key={thumb.src}
                      type="button"
                      onClick={() => setActivePhotoIndex(tIdx)}
                      className={`relative h-12 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                        tIdx === activePhotoIndex
                          ? "border-[#C2A476] ring-2 ring-[#C2A476]/50 scale-105"
                          : "border-white/20 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={thumb.src}
                        alt={thumb.tag}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Overlapping Guest Review Card */}
            <div className="hidden sm:block absolute -bottom-6 -left-6 z-40 bg-[#1e2329]/95 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl max-w-xs">
              <p className="text-[11px] text-[#C2A476] uppercase tracking-widest font-semibold mb-1">
                Verified Guest Experience
              </p>
              <p className="text-xs text-neutral-200 italic font-light leading-relaxed">
                &ldquo;Waking up to the morning sun reflecting off our private pool was the highlight of our Da Nang vacation.&rdquo;
              </p>
              <p className="text-[10px] text-neutral-400 mt-2 font-medium">
                — Private Villa Guest Review
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
