"use client";

import React, { useCallback, memo } from "react";
import SectionReveal from "@/components/shared/animation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonClickHandler } from "@/models/interfaces";
import { getClientSectionContent, aboutStats } from "@/lib/content/clients";
import ClientLogoCarousel from "@/components/shared/ClientLogoCarousel";

// Stats card component
const StatsCard = memo(
  ({
    icon: Icon,
    number,
    label,
    color,
    hoverColor,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    number: string;
    label: string;
    color: string;
    hoverColor: string;
  }) => (
    <Card
      className={`group relative overflow-hidden border border-border/40 ${hoverColor} shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-transparent hover:bg-white`}>
      <div className={`hover-bg ${hoverColor}`}></div>
      <CardContent className="relative z-10 p-4 text-center sm:p-5 lg:p-6">
        <div
          className={`w-16 h-16 mx-auto mb-3 bg-linear-to-r ${color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500`}>
          <Icon className="w-8 h-8 text-white group-hover:text-white" />
        </div>
        <div className="text-3xl font-bold text-white mb-1.5 group-hover:scale-110 group-hover:text-foreground transition-all duration-300">
          {number}
        </div>
        <div className="text-sm text-white/90 font-medium group-hover:text-muted-foreground transition-colors duration-300">
          {label}
        </div>
      </CardContent>
    </Card>
  )
);

StatsCard.displayName = "StatsCard";

export default function ClientSection() {
  const { title, subtitle, logos } = getClientSectionContent();
  const stats = aboutStats;

  // Optimized event handlers with useCallback
  const handleRequestCallback: ButtonClickHandler = useCallback(() => {
    const element = document.getElementById("footer-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      id="client-section"
      className="pt-2 sm:pt-4 lg:pt-6 pb-4 sm:pb-6 lg:pb-8"
      role="region"
      aria-label="Client testimonials and partners section">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <SectionReveal
          variant="slide-up"
          delayMs={100}
          durationMs={650}
          className="w-full mb-6 sm:mb-8">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 px-2 sm:gap-4 sm:px-0 lg:grid-cols-4 lg:gap-5">
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                icon={stat.icon}
                number={stat.number}
                label={stat.label}
                color={stat.color}
                hoverColor={stat.hoverColor}
              />
            ))}
          </div>
        </SectionReveal>
      </div>

      <SectionReveal
        variant="scale"
        delayMs={70}
        durationMs={700}
        className="w-full">
        {/* Header */}

        {/* Call to Action */}
        <div className="px-4 sm:px-6 lg:px-8">
          <Card className="group relative overflow-hidden max-w-4xl mx-auto border-0 bg-blue-900 transition-all duration-700 rounded-2xl sm:rounded-3xl hover:bg-white">
            <div className="hover-bg-client bg-blue-900"></div>
            <CardContent className="relative z-10 p-4 sm:p-6 lg:p-8 text-center">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 transition-colors duration-300">
                  Ready to join our success stories?
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-3 sm:pb-4">
                <p className="text-xs sm:text-sm lg:text-base text-white/90 mb-3 sm:mb-4 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
                  Let&apos;s discuss how we can help your business achieve its
                  goals with innovative technology solutions.
                </p>

                <Button
                  className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-500 hover:scale-110 w-full sm:w-auto bg-white text-black hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black"
                  onClick={handleRequestCallback}
                  variant="black"
                  size="lg"
                  aria-label="Start your project with Codagam">
                  Start Your Project
                </Button>
              </CardContent>
            </CardContent>
          </Card>
        </div>
      </SectionReveal>
    </section>
  );
}
