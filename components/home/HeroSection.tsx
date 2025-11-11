"use client";

import React, { memo, useCallback } from "react";
import Image from "next/image";
import SectionReveal from "@/components/shared/animation";
import { Button } from "@/components/ui/button";
import { HeroSectionProps, ButtonClickHandler } from "@/models/interfaces";
import ClientLogoCarousel from "@/components/shared/ClientLogoCarousel";
import { getClientSectionContent } from "@/lib/content/clients";

const HeroSection: React.FC<HeroSectionProps> = memo(() => {
  const clientContent = getClientSectionContent();

  const handleGetStarted: ButtonClickHandler = useCallback(() => {
    const element = document.getElementById("footer-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      id="hero-section"
      className="relative overflow-x-hidden bg-background"
      role="region"
      aria-label="Hero section">
      {/* Main Content Container */}
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Hero Content Grid - Left Text & Right Image */}
        <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-8 mb-6 sm:mb-8 lg:mb-10">
          {/* Left Side - Content */}
          <SectionReveal
            variant="fade-down"
            delayMs={60}
            durationMs={700}
            className="w-full">
            <div className="order-1 space-y-4 sm:space-y-5 lg:order-1 lg:pr-6 xl:pr-10">
              {/* Brand */}
              <div className="text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-none text-slate-900 dark:text-slate-100">
                  Codagam
                </h1>
                <p className="inline-flex items-center gap-2 sm:gap-3 mt-1 sm:mt-1.5 text-sm sm:text-base lg:text-lg text-muted-foreground font-medium">
                  <span>Consult</span>
                  <span className="text-primary">|</span>
                  <span>Code</span>
                  <span className="text-primary">|</span>
                  <span>Collaborate</span>
                </p>
              </div>

              {/* Main Headline */}
              <div className="space-y-2 sm:space-y-3 text-center lg:text-left">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                  Digital Transformation
                  <br />
                  <span className="text-muted-foreground">
                    for Modern Business
                  </span>
                </h2>
                <p className="mx-auto max-w-2xl text-xs sm:text-base text-muted-foreground leading-relaxed lg:mx-0">
                  We help you establish and upscale your business online so that
                  you don&apos;t miss any chance of serving a customer.
                </p>
              </div>

              {/* CTA */}
              <div className="pt-1 text-center lg:text-left">
                <Button
                  onClick={handleGetStarted}
                  variant="black"
                  size="lg"
                  className="w-full min-w-[180px] px-6 py-2.5 text-sm font-medium shadow-sm transition-all duration-300 hover:scale-[1.02] sm:w-auto sm:px-8 sm:py-3 sm:text-base"
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
              <div className="relative h-[280px] w-full rounded-3xl sm:h-[320px] md:h-[360px] lg:h-[400px] xl:h-[450px]">
                <Image
                  src="/images/hero3.png"
                  alt="Illustration of Codagam's cloud and data solutions"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>

      {/* Client Logo Carousel - Below Hero Content, Full Width */}
      <div className="w-full pt-6 sm:pt-8 lg:pt-24 pb-10 sm:pb-10 lg:pb-20">
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
