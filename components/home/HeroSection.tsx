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
      className="min-h-screen bg-white flex items-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8"
      role="banner"
      aria-label="Hero section">
      <div className="w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div className="px-8 lg:px-16 space-y-8">
              {/* Brand */}
              <div className="space-y-3">
                <h1 className="text-5xl lg:text-7xl font-bold text-blue-900 leading-none">
                  Codagam
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 font-medium">
                  Consult | Code | Collaborate
                </p>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h2 className="text-2xl lg:text-4xl font-semibold text-gray-900 leading-tight">
                  Digital Transformation
                  <br />
                  <span className="text-gray-600">for Modern Business</span>
                </h2>
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                  We help you establish and upscale your business online so that
                  you don&apos;t miss any chance of serving a customer.
                </p>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Button
                  onClick={handleGetStarted}
                  variant="black"
                  size="lg"
                  className="px-8 py-4  text-lg font-medium transition-all duration-300 hover:scale-105"
                  aria-label="Get started with Codagam services">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Right Side - Video */}
            <div className="relative">
              <video
                src="/videos/ch.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[500px] object-cover rounded-2xl"
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
