"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonClickHandler } from "@/models/interfaces";
import { ClientLogoCarousel } from "@/components/shared";

export default function ClientSection() {
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
      role="main"
      aria-label="Client testimonials and partners section">
      <div className="w-full">
        {/* Client Logos Carousel */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <ClientLogoCarousel
            title="Our Partners"
            subtitle="We're proud to work with these industry-leading companies that trust us to deliver exceptional results"
            className=""
          />
        </div>

        {/* Call to Action */}
        <div className="px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto border-0 bg-gradient-to-br from-white to-gray-50/50 transition-all duration-700 rounded-2xl sm:rounded-3xl">
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
      </div>
    </section>
  );
}
