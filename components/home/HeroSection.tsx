"use client";

import React, { memo, useCallback } from "react";
import Image from "next/image";
import SectionReveal from "@/components/shared/animation";
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
      className="relative flex min-h-[calc(100vh-64px)] items-center overflow-x-hidden bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      role="region"
      aria-label="Hero section">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side - Content */}
          <SectionReveal
            variant="fade-down"
            delayMs={60}
            durationMs={700}
            className="w-full">
            <div className="order-1 space-y-6 sm:space-y-8 lg:order-1 lg:pr-6 xl:pr-10">
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
                <p className="mx-auto max-w-2xl text-sm text-muted-foreground leading-relaxed sm:text-base lg:text-lg lg:mx-0">
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
                  className="w-full min-w-[180px] px-6 py-3 text-base font-medium shadow-sm transition-all duration-300 hover:scale-[1.02] sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
                  aria-label="Get started with Codagam services">
                  Get Started
                </Button>
              </div>
            </div>
          </SectionReveal>

          {/* Right Side - Visual */}
          <SectionReveal
            variant="slide-up"
            delayMs={100}
            durationMs={700}
            className="w-full">
            <div className="relative order-2 lg:order-2">
              <div className="relative h-[360px] w-full rounded-3xl sm:h-[460px] md:h-[520px] lg:h-[600px] xl:h-[680px]">
                <Image
                  src="/images/hero3.png"
                  alt="Illustration of Codagam's cloud and data solutions"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
