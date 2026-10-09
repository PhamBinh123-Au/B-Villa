import { SiteConfig } from "@/types";

/**
 * =========================================================================
 * MASTER SITE CONFIGURATION (EDIT YOUR DETAILS HERE)
 * -------------------------------------------------------------------------
 * You can customize the villa collection name, phone numbers, WhatsApp,
 * email, social links, admin passcode, and villa descriptions right here!
 * =========================================================================
 */
export const siteConfig: SiteConfig = {
  // BRANDING
  name: "Serene Da Nang Villa Collection",
  tagline: "Curated Coastal Sanctuaries in Da Nang",
  description:
    "Discover an exceptional collection of private pool villas designed with contemporary minimalism, pure architectural light, and bespoke hospitality in Da Nang.",

  // CONTACT INFORMATION
  contact: {
    phone: "+84 905 123 456", // Your Hotline
    whatsapp: "https://wa.me/84905123456", // WhatsApp Direct Link
    email: "reservations@serenedanangvillas.com", // Inquiries Email
    address: "Son Tra & Ngu Hanh Son Districts, Da Nang City, Vietnam",
  },

  // ADMIN PORTAL PASSCODE (Used to unlock /admin dashboard)
  admin: {
    passcode: "admin123", // Change this to your preferred secret passcode
  },

  // SOCIAL MEDIA CHANNELS
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },

  // THE 4 CURATED VILLAS (From your actual photos)
  villas: [
    {
      id: "b1-villa-4pn",
      code: "B1",
      name: "B1 Villa • 4 Bedrooms",
      tagline: "Garden Path Sanctuary with Private Swimming Pool",
      location: "Thanh Vinh 3, Son Tra District, Da Nang",
      district: "Son Tra",
      bedrooms: 4,
      bathrooms: 4,
      maxGuests: 10,
      poolType: "Private Garden Lap Pool",
      image: "/images/villas/b1-villa.jpg",
      description:
        "B1 Villa features a breathtaking linear swimming pool flanked by tropical green palms, pristine stone garden paths, and an expansive chef's open kitchen and dining area. Designed for discerning families and groups seeking a sunlit, peaceful beach retreat.",
      highlights: [
        "Private swimming pool with garden path view",
        "Spacious open-concept kitchen & dining hall",
        "All 4 king en-suite bedrooms with natural light",
        "Just 350 meters stroll to the Son Tra coastline",
      ],
      amenities: [
        "Private Pool",
        "Full Kitchen & BBQ",
        "High-speed Wi-Fi",
        "Smart TVs",
        "Air Conditioning",
        "Daily Housekeeping",
      ],
    },
    {
      id: "b2-villa-4pn",
      code: "B2",
      name: "B2 Villa • 4 Bedrooms",
      tagline: "Skylight Atrium Pool & Architectural Minimalist Luxury",
      location: "Nuoc Man 3, Ngu Hanh Son District, Da Nang",
      district: "Ngu Hanh Son",
      bedrooms: 4,
      bathrooms: 4,
      maxGuests: 10,
      poolType: "Indoor Skylight Waterfall Pool",
      image: "/images/villas/b2-villa.jpg",
      description:
        "A masterpiece of clean architectural lines and luminous white spaces. B2 Villa showcases a dramatic indoor swimming pool beneath a naturally illuminated skylight atrium, with direct visual flow into the master bedroom suites and gourmet kitchen.",
      highlights: [
        "Stunning skylight atrium indoor swimming pool",
        "Ultra-minimalist all-white architectural interior",
        "Direct pool-facing master bedroom suites",
        "Grand banquet dining table for 10 guests",
      ],
      amenities: [
        "Skylight Pool",
        "Designer Kitchen",
        "Air Conditioning",
        "Smart TVs",
        "High-speed Wi-Fi",
        "Dedicated Concierge",
      ],
    },
    {
      id: "b3-villa-2pn",
      code: "B3",
      name: "B3 Villa • 2 Bedrooms",
      tagline: "Curved Plunge Pool & Intimate Romantic Sanctuaries",
      location: "Nuoc Man 7, Ngu Hanh Son District, Da Nang",
      district: "Ngu Hanh Son",
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 5,
      poolType: "Circular Curved Plunge Pool",
      image: "/images/villas/b3-villa.jpg",
      description:
        "Designed specifically for couples, honeymooners, and smaller families, B3 Villa offers an intimate sanctuary featuring a signature circular plunge pool, an airy open-plan living lounge, and serene master suites opening directly onto sunlit waters.",
      highlights: [
        "Signature circular curved plunge pool with sun deck",
        "Cozy Scandinavian living lounge with smart entertainment",
        "Master suite with direct pool terrace access",
        "Peaceful residential retreat in Ngu Hanh Son",
      ],
      amenities: [
        "Curved Plunge Pool",
        "Cozy Lounge",
        "Kitchenette",
        "High-speed Wi-Fi",
        "In-room Safe",
        "Housekeeping",
      ],
    },
    {
      id: "b4-villa-4pn",
      code: "B4",
      name: "B4 Villa • 4 Bedrooms",
      tagline: "Lush Enclosed Courtyard & Poolside Master Suites",
      location: "Thanh Vinh 2, Son Tra District, Da Nang",
      district: "Son Tra",
      bedrooms: 4,
      bathrooms: 4,
      maxGuests: 10,
      poolType: "Private Courtyard Pool",
      image: "/images/villas/b4-villa.jpg",
      description:
        "B4 Villa welcomes you through a picturesque white stone facade surrounded by blooming bougainvillea into an exclusive sanctuary. Enjoy private courtyard swimming, poolside master bedrooms, and an elegant black-and-white dining area.",
      highlights: [
        "Private swimming pool with floor-to-ceiling glass doors",
        "Gated private courtyard with blooming bougainvillea",
        "Contemporary monochromatic kitchen & dining design",
        "Prime location near Son Tra Peninsula and pristine beaches",
      ],
      amenities: [
        "Private Courtyard Pool",
        "Modern Chef Kitchen",
        "High-speed Wi-Fi",
        "Washing Machine",
        "Air Conditioning",
        "24/7 Security Support",
      ],
    },
  ],

  // SIGNATURE AMENITIES (Client showcase)
  amenities: [
    {
      icon: "Waves",
      title: "Private Swimming Pools",
      description:
        "Each villa is equipped with its own crystal-clear private pool, from sunlit garden lap pools to indoor skylight atriums.",
    },
    {
      icon: "ShieldCheck",
      title: "24/7 Dedicated Concierge",
      description:
        "Our local host is on standby around the clock to arrange private transfers, dining recommendations, and bespoke requests.",
    },
    {
      icon: "Wifi",
      title: "High-Speed Seamless Wi-Fi",
      description:
        "Enterprise-grade high-speed wireless network coverage across every bedroom, terrace, and living space.",
    },
    {
      icon: "Sparkles",
      title: "Daily Housekeeping",
      description:
        "Professional housekeeping service maintaining impeccable cleanliness, fresh linen, and luxury bath amenities.",
    },
    {
      icon: "Car",
      title: "Airport Chauffeur Service",
      description:
        "Seamless door-to-door private airport pickups and city transfers upon reservation inquiry.",
    },
    {
      icon: "UtensilsCrossed",
      title: "Fully Equipped Gourmet Kitchen",
      description:
        "Complete with high-end appliances, microwave, refrigerator, cookware, and barbecue setup for private feasts.",
    },
  ],
};
