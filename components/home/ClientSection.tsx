"use client";

import React, { useCallback } from "react";
import SectionReveal from "@/components/shared/animation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonClickHandler } from "@/models/interfaces";
import { getClientSectionContent } from "@/lib/content/clients";
import ClientLogoCarousel from "@/components/shared/ClientLogoCarousel";

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

        {/* Call to Action */}
        <div className="px-4 sm:px-6 lg:px-8">
          <Card className="group relative overflow-hidden max-w-4xl mx-auto border-0 bg-gray-100 dark:bg-black transition-all duration-700 rounded-2xl sm:rounded-3xl">
            <div className="hover-bg-client bg-purple-600"></div>
            <CardContent className="relative z-10 p-4 sm:p-6 lg:p-8 text-center">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-white transition-colors duration-300">
                  Ready to join our success stories?
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-3 sm:pb-4">
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-3 sm:mb-4 max-w-2xl mx-auto leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  Let&apos;s discuss how we can help your business achieve its
                  goals with innovative technology solutions.
                </p>

                <Button
                  className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-500 hover:scale-110 w-full sm:w-auto hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black group-hover:bg-white group-hover:text-foreground"
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
