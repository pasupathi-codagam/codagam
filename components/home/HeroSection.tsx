"use client";

import React, { memo } from "react";
import { HeroSectionProps } from "@/models/interfaces";
import { HeroClientCarousel } from "@/components/shared/HeroClientCarousel";

// Constants for better maintainability
const HERO_CONFIG = {
  title: "Codagam",
  tagline: "Consult | Code | Collaborate",
  headline: "Digital Transformation",
  subHeadline: "for Modern Business",
  description:
    "We help you establish and upscale your business online so that you don't miss any chance of serving a customer.",
  videoSrc: "/videos/ch.mp4",
  founderName: "Codagam Team",
} as const;

const HeroSection: React.FC<HeroSectionProps> = memo(() => {
  return (
    <section
      id="hero-section"
      className="homepage-section standalone-module w-full min-h-screen flex flex-col"
      data-module-template="hero-section"
      data-analytics-region="hero-section"
      role="banner"
      aria-label="Hero section">
      {/* Main Hero Content */}
      <div className="module-content w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8 items-center w-full pt-4 pb-4 sm:pt-6 sm:pb-6 md:pt-8 md:pb-8 lg:pt-12 lg:pb-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {/* Left Side - Content */}
          <div className="order-1 lg:order-1 flex flex-col justify-center space-y-4 sm:space-y-6 text-center lg:text-left lg:ml-8 xl:ml-12">
            {/* Brand Section */}
            <div className="space-y-3 sm:space-y-4 max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-blue-900 leading-tight">
                {HERO_CONFIG.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-900 font-medium">
                {HERO_CONFIG.tagline}
              </p>
            </div>

            {/* Main Headline Section */}
            <div className="space-y-4 sm:space-y-6 max-w-4xl">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-relaxed tracking-wide text-gray-900">
                {HERO_CONFIG.headline} {HERO_CONFIG.subHeadline}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl">
                {HERO_CONFIG.description}
              </p>
            </div>

            {/* Signature Section */}
            <div className="pt-4 sm:pt-6 max-w-4xl">
              <div className="text-black text-xl sm:text-2xl md:text-3xl font-handwriting mb-2">
                {HERO_CONFIG.founderName}
              </div>
              <div className="text-gray-600 text-sm sm:text-base">
                {HERO_CONFIG.founderName}
              </div>
            </div>
          </div>

          {/* Right Side - Video */}
          <div className="order-2 lg:order-2 flex items-center justify-center lg:justify-start lg:mr-8 xl:mr-12">
            <video
              src={HERO_CONFIG.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] object-contain"
              aria-label="Codagam team and technology solutions"
              preload="metadata">
              <track kind="captions" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Client Logos Carousel - Full width */}
        <div className="w-full mt-8 sm:mt-12 md:mt-16 lg:mt-20">
          <HeroClientCarousel className="w-full py-4 md:py-6" />
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
