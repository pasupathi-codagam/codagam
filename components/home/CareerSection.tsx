"use client";

import React, { useState, memo } from "react";
import SectionReveal from "@/components/shared/animation";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BenefitCard as BenefitCardType } from "@/models/interfaces";
import { ChevronDown, Send } from "lucide-react";
import { careerBenefits } from "@/lib/content/career";
import { CareerApplicationForm } from "@/components/shared/CareerApplicationForm";
import Image from "next/image";

const iconColorMap: Record<string, string> = {
  blue: "text-blue-500",
  green: "text-green-500",
  purple: "text-purple-500",
};

// Memoized benefit card component with collapsible
const BenefitCard = memo(
  ({
    benefit,
    isOpen,
    onToggle,
  }: {
    benefit: BenefitCardType;
    isOpen: boolean;
    onToggle: () => void;
  }) => (
    <div>
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className={`group relative overflow-hidden flex h-14 w-full items-center justify-between rounded-2xl border-2 px-4 text-sm font-semibold transition-all duration-300 sm:h-16 sm:px-6 sm:text-base lg:text-lg bg-[#F6F6F6] dark:bg-black ${
              isOpen
                ? "border-ring shadow-md"
                : "border-border hover:border-transparent hover:shadow-sm"
            }`}
            aria-label={`Toggle ${benefit.title} details`}>
            {benefit.hoverColor && (
              <div className={`hover-bg-career ${benefit.hoverColor}`}></div>
            )}
            <div className="relative z-10 flex items-center space-x-3 sm:space-x-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted transition-all duration-300 group-hover:scale-105 group-hover:bg-white/20 sm:h-11 sm:w-11">
                <benefit.icon
                  className={`h-5 w-5 transition-colors duration-300 ${
                    iconColorMap[benefit.color] ?? "text-primary"
                  } group-hover:text-white`}
                />
              </div>
              <span className="text-sm font-medium text-foreground sm:text-base group-hover:text-white transition-colors duration-300">
                {benefit.title}
              </span>
            </div>
            <div className="relative z-10">
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-white sm:h-5 sm:w-5 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                style={{
                  transitionDuration: "400ms",
                  transitionTimingFunction: isOpen
                    ? "cubic-bezier(0.12, 0, 0.38, 0)"
                    : "cubic-bezier(0.2, 0, 0.68, 0)",
                }}
              />
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="rounded-2xl border border-border/40 bg-card p-4 shadow-sm sm:p-6 mt-3 sm:mt-4">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {benefit.description}
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
);

BenefitCard.displayName = "BenefitCard";

export default function CareerSection() {
  const [isOpen, setIsOpen] = useState(false);
  // Set first benefit open by default (like AboutSection)
  const [openBenefit, setOpenBenefit] = useState<string | null>(
    careerBenefits[0]?.id || null
  );
  // Set first benefit selected by default to show image
  const [selectedBenefit, setSelectedBenefit] = useState<string | null>(
    careerBenefits[0]?.id || null
  );

  const benefits = React.useMemo(() => careerBenefits as BenefitCardType[], []);

  const handleBenefitClick = (benefitId: string) => {
    // Close form if open
    setIsOpen(false);
    // Toggle collapsible description on left
    const newOpenBenefit = openBenefit === benefitId ? null : benefitId;
    setOpenBenefit(newOpenBenefit);
    // Always set selected benefit for right side image - always show image when clicked
    setSelectedBenefit(benefitId);
  };

  const handleApplyClick = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    // Restore selected benefit when form closes
    if (!newIsOpen && !selectedBenefit) {
      setSelectedBenefit(careerBenefits[0]?.id || null);
    }
  };

  return (
    <section
      id="career-section"
      className="overflow-x-hidden bg-background px-4 pt-4 pb-8 sm:px-6 sm:pt-6 sm:pb-10 lg:px-8 lg:pt-8 lg:pb-12"
      role="region"
      aria-label="Career opportunities section">
      <div className="mx-auto w-full max-w-7xl">
        <SectionReveal
          variant="zoom-in"
          delayMs={80}
          durationMs={700}
          className="mx-auto flex w-full flex-col gap-4 sm:gap-5 lg:gap-6">
          {/* Navigation Link */}
          <div className="text-center mb-2 sm:mb-3">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-muted to-accent border border-border rounded-full">
              <span className="text-foreground text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Careers
              </span>
            </div>
          </div>

          {/* Header */}
          <div className="mb-3 text-center sm:mb-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-blue-900 dark:text-blue-900">
              Join our team
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              We&apos;re looking for passionate individuals who want to build
              the future of technology. Join us in creating innovative solutions
              that make a real impact.
            </p>
          </div>

          {/* Collapsible Content with Images */}
          <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5 bg-gray-50 dark:bg-gray-900 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 lg:p-5">
            {/* Collapsible Items Section - Left */}
            <div className="w-full lg:w-1/2 flex flex-col justify-start">
              <div className="space-y-1.5 sm:space-y-2 md:space-y-2.5">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight mb-3 sm:mb-4">
                  Why work with us?
                </h3>

                {benefits.map((benefit) => (
                  <BenefitCard
                    key={benefit.id}
                    benefit={benefit}
                    isOpen={openBenefit === benefit.id}
                    onToggle={() => handleBenefitClick(benefit.id)}
                  />
                ))}

                {/* Apply Button */}
                <div className="space-y-3 sm:space-y-4 pt-4">
                  <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <div className="space-y-4 sm:space-y-6">
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-14 sm:h-16 text-base sm:text-lg font-semibold rounded-2xl border-2 border-border hover:border-transparent hover:shadow-md transition-all duration-300 group relative overflow-hidden bg-[#F6F6F6] dark:bg-black"
                          onClick={handleApplyClick}
                          aria-label="Toggle application form">
                          <div className="hover-bg-career bg-blue-600"></div>
                          <div className="relative z-10 flex items-center justify-center w-full px-12 sm:px-14">
                            {/* Centered icon + label */}
                            <span className="inline-flex items-center gap-2 text-foreground font-medium text-sm sm:text-base group-hover:text-white transition-colors duration-300">
                              <Send className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-white transition-colors duration-300" />
                              Apply Now
                            </span>
                            {/* Right chevron */}
                            <ChevronDown
                              className={`absolute right-4 sm:right-6 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-white transition-all ${
                                isOpen ? "rotate-180" : "rotate-0"
                              }`}
                              style={{
                                transitionDuration: "400ms",
                                transitionTimingFunction: isOpen
                                  ? "cubic-bezier(0.12, 0, 0.38, 0)"
                                  : "cubic-bezier(0.2, 0, 0.68, 0)",
                              }}
                            />
                          </div>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </Collapsible>
                </div>
              </div>
            </div>

            {/* Large Image Container - Desktop Right */}
            <div
              className="hidden lg:block w-full lg:w-1/2 relative min-h-[350px] lg:min-h-[400px] xl:min-h-[450px] 2xl:min-h-[500px]"
              aria-hidden="false">
              {isOpen ? (
                // Show Form when Apply is clicked
                <div className="space-y-3 sm:space-y-4 h-full">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight mb-3 sm:mb-4">
                      Ready to join us?
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                      Send us your application and let&apos;s start the
                      conversation.
                    </p>
                  </div>
                  <CareerApplicationForm />
                </div>
              ) : (
                // Show all images stacked with opacity transitions (like AboutSection)
                benefits.map((benefit, index) => {
                  const isActive = selectedBenefit === benefit.id;
                  return (
                    <div
                      key={benefit.id}
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
                      {benefit.image && (
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                          <Image
                            src={benefit.image}
                            alt={benefit.imageAlt || benefit.title}
                            fill
                            priority={index === 0}
                            className="object-cover rounded-2xl"
                            quality={90}
                            sizes="(min-width: 1024px) 50vw, 100vw"
                          />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Image Container - Mobile/Tablet */}
            <div className="lg:hidden w-full relative h-[200px] sm:h-[240px] md:h-[260px]">
              {isOpen ? (
                // Show Form when Apply is clicked
                <div className="space-y-3 sm:space-y-4 h-full">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight mb-3 sm:mb-4">
                      Ready to join us?
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                      Send us your application and let&apos;s start the
                      conversation.
                    </p>
                  </div>
                  <CareerApplicationForm />
                </div>
              ) : (
                benefits.map((benefit, index) => {
                  const isActive = selectedBenefit === benefit.id;
                  return (
                    <div
                      key={`mobile-${benefit.id}`}
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
                      {benefit.image && (
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                          <Image
                            src={benefit.image}
                            alt={benefit.imageAlt || benefit.title}
                            fill
                            priority={index === 0}
                            className="object-cover rounded-2xl"
                            quality={90}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
