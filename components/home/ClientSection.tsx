"use client";

import React, { useCallback } from "react";
import SectionReveal from "@/components/shared/animation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonClickHandler } from "@/models/interfaces";
import { getClientSectionContent } from "@/lib/content/clients";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";

export default function ClientSection() {
  const { title, subtitle, logos } = getClientSectionContent();
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
      <SectionReveal
        variant="scale"
        delayMs={70}
        durationMs={700}
        className="w-full">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 w-full px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            {title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Client Logos Marquee */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="relative w-full overflow-x-hidden">
            <Marquee
              pauseOnHover
              className="[--duration:60s] smooth-marquee w-full">
              {logos.map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="flex-shrink-0 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
                  <div className="relative w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 flex items-center justify-center group transition-all duration-300">
                    <Image
                      src={client.logo}
                      alt={client.alt}
                      width={client.width || 200}
                      height={client.height || 120}
                      className="max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[200px] xl:max-w-[220px] max-h-[60px] sm:max-h-[80px] md:max-h-[100px] lg:max-h-[120px] xl:max-h-[140px] object-contain"
                      sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, (max-width: 1024px) 180px, (max-width: 1280px) 200px, 220px"
                    />
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        {/* Call to Action */}
        <div className="px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto border-0 transition-all duration-700 rounded-2xl sm:rounded-3xl">
            <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 sm:mb-3">
                  Ready to join our success stories?
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-3 sm:pb-4">
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-3 sm:mb-4 max-w-2xl mx-auto leading-relaxed">
                  Let&apos;s discuss how we can help your business achieve its
                  goals with innovative technology solutions.
                </p>

                <Button
                  className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-500 hover:scale-110 w-full sm:w-auto"
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
