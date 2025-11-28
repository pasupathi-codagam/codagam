"use client";

import React, { memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroSectionProps, ButtonClickHandler } from "@/models/interfaces";
import ClientLogoCarousel from "@/components/shared/ClientLogoCarousel";
import { getClientSectionContent } from "@/lib/content/clients";
import { heroContents } from "@/lib/content/hero";

const HeroSection: React.FC<HeroSectionProps> = memo(() => {
  const clientContent = getClientSectionContent();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleGetStarted: ButtonClickHandler = useCallback(() => {
    const element = document.getElementById("footer-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroContents.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Preload all hero images on mount
  useEffect(() => {
    heroContents.forEach((content) => {
      const img = new window.Image();
      img.src = content.image;
    });
  }, []);

  return (
    <section
      id="hero-section"
      className="relative overflow-x-hidden -mt-[60px] sm:-mt-[68px] md:-mt-[74px] lg:-mt-[80px] pt-[60px] sm:pt-[68px] md:pt-[74px] lg:pt-[80px]"
      style={{
        backgroundImage: "url('/images/launch.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
      role="region"
      aria-label="Hero section">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-blue-950/30 dark:bg-black/30"></div>
      {/* Main Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-12 pb-6 sm:px-6 sm:pt-16 sm:pb-8 lg:px-8 lg:pt-20 lg:pb-10">
        <div className="relative w-full overflow-hidden min-h-[450px] sm:min-h-[500px] lg:min-h-[550px]">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="absolute inset-0 w-full"
              style={{ willChange: "opacity" }}>
              <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-8">
                {/* Left Side - Content */}
                <div className="order-1 space-y-4 sm:space-y-5 lg:order-1 lg:pr-6 xl:pr-10">
                  {/* Brand */}
                  <div className="text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-none text-white">
                      Codagam
                    </h1>
                    <p className="inline-flex items-center gap-2 sm:gap-4 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg text-white font-medium">
                      <span>Consult</span>
                      <span className="text-white">|</span>
                      <span>Code</span>
                      <span className="text-white">|</span>
                      <span>Collaborate</span>
                    </p>
                  </div>

                  {/* Main Headline */}
                  <div className="space-y-2 sm:space-y-3 text-center lg:text-left">
                    <div>
                      <p className="text-sm sm:text-base text-white font-semibold mb-2">
                        {heroContents[currentIndex].subtitle}
                      </p>
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight text-white">
                        {heroContents[currentIndex].title}
                      </h2>
                    </div>
                    <p className="mx-auto max-w-2xl text-xs sm:text-base text-white leading-relaxed lg:mx-0">
                      {heroContents[currentIndex].description}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="pt-1 text-center lg:text-left">
                    <Button
                      onClick={handleGetStarted}
                      variant="black"
                      className="w-auto min-w-[120px] px-4 py-2 text-xs font-medium shadow-sm transition-all duration-300 hover:scale-[1.02] sm:min-w-[140px] sm:px-5 sm:py-2.5 sm:text-sm md:px-8 md:py-3 md:text-base group relative overflow-hidden"
                      aria-label="Get started with Codagam services">
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                        Get Started
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Right Side - Visual */}
                <div className="relative order-2 lg:order-2">
                  <div className="relative h-[280px] w-full rounded-3xl sm:h-[320px] md:h-[360px] lg:h-[400px] xl:h-[450px]">
                    <Image
                      src={heroContents[currentIndex].image}
                      alt={heroContents[currentIndex].imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={currentIndex === 0}
                      className="object-contain"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Client Logo Carousel - Below Hero Content, Full Width */}
      <div className="w-full pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-10 lg:pb-8">
        <ClientLogoCarousel
          logos={clientContent?.logos || []}
          pauseOnHover={true}
          duration="60s"
          repeat={2}
        />
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
