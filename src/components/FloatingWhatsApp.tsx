"use client";

import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={siteConfig.contact.whatsapp}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group border border-white/20"
      aria-label="Direct WhatsApp Concierge"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline-block text-xs font-semibold tracking-wider uppercase">
        WhatsApp Concierge
      </span>
    </a>
  );
};
