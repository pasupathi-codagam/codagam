import type { Metadata, Viewport } from "next";
import { Noto_Sans_Tamil, Livvic, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ScrollToTopButton from "@/components/shared/ScrollToTopButton";
import { Footer } from "@/components/nav/Footer";
import Navbar from "@/components/nav/Navbar";
// Define Noto Sans Tamil as primary font
const notoSansTamil = Noto_Sans_Tamil({
  variable: "--font-noto-tamil",
  subsets: ["tamil", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// Define Livvic as secondary font
const livvic = Livvic({
  variable: "--font-livvic",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "Codagam Software Labs Private Limited - Leading Software Solutions",
  description:
    "Codagam Software Labs Private Limited provides innovative software development, digital transformation, and cloud solutions. We build cutting-edge software products that drive business growth.",
  keywords:
    "software development, digital transformation, cloud solutions, software company, technology services, codagam, software labs",
  openGraph: {
    title: "Codagam Software Labs Private Limited - Leading Software Solutions",
    description:
      "Innovative software development, digital transformation, and cloud solutions for modern businesses.",
    type: "website",
    locale: "en_US",
    url: "https://codagam.com",
    siteName: "Codagam",
    images: [
      {
        url: "https://codagam.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Codagam - Connecting Local Communities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@codagam",
    creator: "@codagam",
  },
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-screen flex flex-col bg-white ${notoSansTamil.variable} ${livvic.variable} ${geistSans.variable} ${geistMono.variable}  antialiased`}>
        <div className="overflow-y-auto">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
