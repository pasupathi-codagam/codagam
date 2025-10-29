import type { Metadata, Viewport } from "next";
import "./globals.css";

import ScrollToTopButton from "@/components/shared/ScrollToTopButton";
import { Footer } from "@/components/nav/Footer";
import Navbar from "@/components/nav/Navbar";
import { ThemeProvider } from "@/components/shared/themeSwitch/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background text-foreground font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          <Navbar />
          <main className="flex-1">{children}</main>
          <ScrollToTopButton />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
