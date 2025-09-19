"use client";

import React, { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { smoothScrollTo, sections } from "@/lib/smooth-scroll";
import { HeroSectionProps, ButtonClickHandler } from "@/models/interfaces";

const HeroSection: React.FC<HeroSectionProps> = memo(() => {
  const handleGetStarted: ButtonClickHandler = useCallback(() => {
    smoothScrollTo(sections.contact, 80);
  }, []);

  return (
    <section
      id="hero-section"
      className="min-h-screen bg-white flex items-center"
      role="banner"
      aria-label="Hero section">
      <div className="w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div className="px-8 lg:px-16 space-y-8 animate-fade-in-up">
              {/* Brand */}
              <div className="space-y-3 animate-slide-in-left">
                <h1 className="text-5xl lg:text-7xl font-bold text-blue-600 leading-none animate-bounce-slow">
                  Codagam
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 font-medium animate-slide-in-right">
                  Consult | Code | Collaborate
                </p>
              </div>

              {/* Main Headline */}
              <div className="space-y-4 animate-slide-in-up">
                <h2 className="text-2xl lg:text-4xl font-semibold text-gray-900 leading-tight animate-slide-in-left">
                  Digital Transformation
                  <br />
                  <span className="text-gray-600 animate-slide-in-right">
                    for Modern Business
                  </span>
                </h2>
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed animate-fade-in-up">
                  We help you establish and upscale your business online so that
                  you don&apos;t miss any chance of serving a customer.
                </p>
              </div>

              {/* CTA */}
              <div className="pt-2 animate-slide-in-up">
                <Button
                  onClick={handleGetStarted}
                  variant="black"
                  size="lg"
                  className="px-8 py-4 rounded-full text-lg font-medium animate-pulse-slow hover:animate-bounce transition-all duration-300 hover:scale-105"
                  aria-label="Get started with Codagam services">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Right Side - Video */}
            <div className="relative">
              <video
                src="/images/codagam hero section.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[700px] object-cover rounded-2xl shadow-2xl"
                aria-label="Codagam team and technology solutions"
                preload="metadata"
                poster="/images/hero-poster.jpg">
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