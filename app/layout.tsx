import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Mono, Bricolage_Grotesque, Caveat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/data";
import { ToastProvider } from "@/components/Toast";
import { CustomCursor } from "@/components/CustomCursor";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const caveat = Caveat({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#efe4c9",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "Sanghpal Bhakte",
    "Builder",
    "AI & Data Science Student",
    "Clarity Desk",
    "Smart India Hackathon",
    "Full Stack Developer",
    "Product Design",
    "Next.js",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: "Student & Builder",
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chhatrapati Sambhajinagar",
      addressCountry: "India",
    },
    sameAs: siteConfig.socials
      .map((s) => s.url)
      .filter((u) => !u.startsWith("mailto:")),
  };

  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable} ${bricolage.variable} ${caveat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; } .hero-label, .hero > h1, .hero-foot { animation: none !important; }`}</style>
        </noscript>
        <ToastProvider>
          {children}
          <CustomCursor />
        </ToastProvider>
      </body>
    </html>
  );
}
