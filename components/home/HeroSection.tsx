"use client";

import React, { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { HeroSectionProps, ButtonClickHandler } from "@/models/interfaces";

const HeroSection: React.FC<HeroSectionProps> = memo(() => {
  const handleGetStarted: ButtonClickHandler = useCallback(() => {
    const element = document.getElementById("footer-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      id="hero-section"
      className="min-h-screen bg-background flex items-center py-4 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8"
      role="banner"
      aria-label="Hero section">
      <div className="w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="px-4 sm:px-6 lg:px-8 xl:px-16 space-y-6 sm:space-y-8 order-1 lg:order-1">
              {/* Brand */}
              <div className="space-y-2 sm:space-y-3 text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-none">
                  Codagam
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-medium">
                  Consult | Code | Collaborate
                </p>
              </div>

              {/* Main Headline */}
              <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight">
                  Digital Transformation
                  <br />
                  <span className="text-muted-foreground">
                    for Modern Business
                  </span>
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  We help you establish and upscale your business online so that
                  you don&apos;t miss any chance of serving a customer.
                </p>
              </div>

              {/* CTA */}
              <div className="pt-2 text-center lg:text-left">
                <Button
                  onClick={handleGetStarted}
                  variant="black"
                  size="lg"
                  className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                  aria-label="Get started with Codagam services">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Right Side - Video */}
            <div className="relative order-2 lg:order-2">
              <video
                src="/videos/ch.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover rounded-2xl shadow-lg"
                aria-label="Codagam team and technology solutions"
                preload="metadata">
                <track kind="captions" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
