"use client";

import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ContactForm } from "@/components/shared/ContactForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SectionReveal from "@/components/shared/animation";
import { ChevronDown } from "lucide-react";
import {
  ContactFormDialogProps,
  ButtonClickHandler,
  AboutSlide,
} from "@/models/interfaces";
import { aboutSlides } from "@/lib/content/about";

// Memoized contact form dialog
const ContactFormDialog = memo(
  ({ isOpen, onClose, onSuccess }: ContactFormDialogProps) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Get in Touch</DialogTitle>
          <DialogDescription>
            We&apos;d love to hear from you. Send us a message and we&apos;ll
            respond as soon as possible.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <ContactForm
            showTitle={false}
            onSuccess={onSuccess}
            className="w-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
);

ContactFormDialog.displayName = "ContactFormDialog";

// Memoized about item component with collapsible
const AboutItem = memo(
  ({
    slide,
    isOpen,
    onToggle,
  }: {
    slide: AboutSlide;
    isOpen: boolean;
    onToggle: () => void;
  }) => (
    <div>
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={`group flex h-10 sm:h-11 md:h-12 lg:h-14 w-full items-center justify-between rounded-lg px-3 sm:px-4 md:px-4 lg:px-5 text-xs sm:text-sm md:text-base font-semibold transition-colors ${
              isOpen
                ? "bg-gray-50 dark:bg-gray-800"
                : "hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
            style={{ transitionDuration: "400ms" }}
            aria-label={`Toggle ${slide.title} details`}>
            <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
              {slide.title}
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-4 md:w-4 text-gray-600 dark:text-gray-400 transition-all group-hover:text-gray-900 dark:group-hover:text-gray-100 shrink-0 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              style={{
                transitionDuration: "400ms",
                transitionTimingFunction: isOpen
                  ? "cubic-bezier(0.12, 0, 0.38, 0)"
                  : "cubic-bezier(0.2, 0, 0.68, 0)",
              }}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="rounded-lg p-2 sm:p-2.5 md:p-3 mt-1 sm:mt-1.5">
            <p className="text-sm sm:text-base md:text-base leading-relaxed text-gray-700 dark:text-gray-300 font-normal">
              {slide.description}
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
);

AboutItem.displayName = "AboutItem";

const AboutSection = memo(() => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>("item-0");

  const handleContactClick: ButtonClickHandler = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleProductsClick: ButtonClickHandler = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleFormSuccess: ButtonClickHandler = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handleDialogClose: ButtonClickHandler = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return (
    <>
      <section
        id="about-section"
        className="overflow-x-hidden bg-background px-4 pt-2 pb-8 sm:px-6 sm:pb-10 lg:px-8 lg:pb-12"
        role="region"
        aria-label="About Codagam section">
        <div className="mx-auto w-full max-w-7xl">
          <SectionReveal
            variant="fade-down"
            durationMs={700}
            delayMs={70}
            className="mx-auto flex w-full flex-col gap-4 sm:gap-5 lg:gap-6">
            {/* Navigation Link */}
            <div className="text-center mb-2 sm:mb-3">
              <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-muted to-accent border border-border rounded-full">
                <span className="text-foreground text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  About Codagam
                </span>
              </div>
            </div>

            {/* Header Section */}
            <div className="mb-3 text-center sm:mb-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  mb-2 sm:mb-3 text-blue-900 dark:text-blue-900">
                Empowering businesses with innovative solutions
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                At Codagam, we pride ourselves on delivering transformative
                technology solutions. Our team of experts is dedicated to
                driving positive change and fostering sustainable growth.
              </p>
            </div>

            {/* Collapsible Content with Images */}
            <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5 bg-gray-50 dark:bg-gray-900 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 lg:p-5">
              {/* Large Image Container - Desktop Left */}
              <div
                className="hidden lg:block w-full lg:w-1/2 relative min-h-[350px] lg:min-h-[400px] xl:min-h-[450px] 2xl:min-h-[500px]"
                aria-hidden="false">
                {aboutSlides.map((slide, index) => {
                  const itemId = `item-${index}`;
                  const isActive = openItem === itemId;

                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 ${
                        isActive
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0 pointer-events-none"
                      }`}
                      style={{
                        transition:
                          "opacity 400ms cubic-bezier(0.12, 0, 0.38, 0), transform 400ms cubic-bezier(0.12, 0, 0.38, 0)",
                        transform: isActive ? "scale(1)" : "scale(0.98)",
                      }}
                      aria-hidden={!isActive}>
                      <div className="relative w-full h-full rounded-2xl overflow-hidden">
                        <Image
                          src={slide.image}
                          alt={slide.imageAlt}
                          fill
                          priority={index === 0}
                          className="object-cover rounded-2xl"
                          quality={90}
                          sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Image Container - Mobile/Tablet */}
              <div className="lg:hidden w-full relative h-[200px] sm:h-[240px] md:h-[260px]">
                {aboutSlides.map((slide, index) => {
                  const itemId = `item-${index}`;
                  const isActive = openItem === itemId;

                  return (
                    <div
                      key={`mobile-${index}`}
                      className={`absolute inset-0 ${
                        isActive
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0 pointer-events-none"
                      }`}
                      style={{
                        transition:
                          "opacity 400ms cubic-bezier(0.12, 0, 0.38, 0), transform 400ms cubic-bezier(0.12, 0, 0.38, 0)",
                        transform: isActive ? "scale(1)" : "scale(0.98)",
                      }}
                      aria-hidden={!isActive}>
                      <div className="relative w-full h-full rounded-2xl overflow-hidden">
                        <Image
                          src={slide.image}
                          alt={slide.imageAlt}
                          fill
                          priority={index === 0}
                          className="object-cover rounded-2xl"
                          quality={90}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Collapsible Items Section - Right */}
              <div className="w-full lg:w-1/2 flex flex-col justify-start">
                <div className="space-y-1.5 sm:space-y-2 md:space-y-2.5">
                  {aboutSlides.map((slide, index) => {
                    const itemId = `item-${index}`;
                    const isOpen = openItem === itemId;

                    return (
                      <AboutItem
                        key={index}
                        slide={slide}
                        isOpen={isOpen}
                        onToggle={() =>
                          setOpenItem(openItem === itemId ? null : itemId)
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Contact Form Dialog */}
      <ContactFormDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSuccess={handleFormSuccess}
      />
    </>
  );
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
