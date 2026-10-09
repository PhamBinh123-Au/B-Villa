"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { Menu, X, Shield, Calendar, Phone } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#14171A]/90 backdrop-blur-md py-4 shadow-xl border-b border-white/10"
          : "bg-gradient-to-b from-black/70 via-black/30 to-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex flex-col">
          <span className="font-serif text-xl md:text-2xl font-bold tracking-widest text-white uppercase group-hover:text-[#C2A476] transition-colors">
            {siteConfig.name}
          </span>
          <span className="text-[10px] tracking-[0.25em] text-[#C2A476] uppercase">
            Da Nang • Vietnam
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wider uppercase text-neutral-200">
          <a
            href="#villas"
            className="hover:text-[#C2A476] transition-colors duration-200"
          >
            Villas
          </a>
          <a
            href="#experience"
            className="hover:text-[#C2A476] transition-colors duration-200"
          >
            Experience
          </a>
          <a
            href="#amenities"
            className="hover:text-[#C2A476] transition-colors duration-200"
          >
            Amenities
          </a>
          <a
            href="#contact"
            className="hover:text-[#C2A476] transition-colors duration-200"
          >
            Contact
          </a>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-2 py-1 rounded border border-white/10 hover:border-white/30 transition-all"
            title="Owner & Staff Portal"
          >
            <Shield className="w-3.5 h-3.5 text-[#C2A476]" />
            <span>Admin</span>
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center space-x-4">
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-300 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#C2A476]" />
            <span>{siteConfig.contact.phone}</span>
          </a>
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 bg-[#C2A476] hover:bg-[#a88a59] text-white text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Inquire Now</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-3">
          <button
            onClick={onOpenBooking}
            className="text-xs bg-[#C2A476] text-white px-3.5 py-1.5 rounded-full font-medium"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#C2A476] focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#14171A] border-b border-white/10 px-6 py-6 transition-all animate-fade-in">
          <nav className="flex flex-col space-y-4 text-sm font-medium tracking-wider uppercase text-neutral-200">
            <a
              href="#villas"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#C2A476] py-1 border-b border-white/5"
            >
              The Villa Collection
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#C2A476] py-1 border-b border-white/5"
            >
              The Experience
            </a>
            <a
              href="#amenities"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#C2A476] py-1 border-b border-white/5"
            >
              Signature Amenities
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#C2A476] py-1 border-b border-white/5"
            >
              Contact & Location
            </a>
            <div className="pt-2 flex items-center justify-between">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white"
              >
                <Shield className="w-4 h-4 text-[#C2A476]" />
                <span>Admin Management</span>
              </Link>
              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#C2A476] font-semibold"
              >
                WhatsApp Inquiry →
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
