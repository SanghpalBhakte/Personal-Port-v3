import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
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

export const viewport: Viewport = {
  themeColor: "#f4f2ed",
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
    card: "summary",
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
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ToastProvider>
          {children}
          <CustomCursor />
        </ToastProvider>
      </body>
    </html>
  );
}
