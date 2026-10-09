import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://serenedanangvillas.vercel.app"),
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: [
    "Da Nang luxury villas",
    "Da Nang villa rental",
    "Son Tra villa",
    "Ngu Hanh Son villa",
    "Private pool villa Da Nang",
    "Vietnam luxury hospitality",
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.tagline,
    images: ["/images/villas/b1-villa.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col bg-[#FAF8F5]">
        {children}
      </body>
    </html>
  );
}
