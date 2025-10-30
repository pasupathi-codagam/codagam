"use client";

import React, { useState, useCallback, memo } from "react";
import SectionReveal from "@/components/shared/animation";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BenefitCard as BenefitCardType } from "@/models/interfaces";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import { careerBenefits } from "@/lib/content/career";
import { CareerApplicationForm } from "@/components/shared/CareerApplicationForm";

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
    <div className="space-y-3 sm:space-y-4">
      <Button
        variant="outline"
        className={`w-full h-14 sm:h-16 text-sm sm:text-base lg:text-lg font-semibold rounded-2xl border-2 transition-all duration-300 group ${
          isOpen
            ? "border-ring bg-accent shadow-md"
            : "border-border hover:border-ring hover:bg-accent hover:shadow-sm"
        }`}
        onClick={onToggle}
        aria-label={`Toggle ${benefit.title} details`}>
        <div className="flex items-center justify-between w-full px-4 sm:px-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <benefit.icon
                className={`w-5 h-5 sm:w-6 sm:h-6 text-${benefit.color}-600`}
              />
            </div>
            <span className="text-foreground font-medium text-sm sm:text-base">
              {benefit.title}
            </span>
          </div>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
          ) : (
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
          )}
        </div>
      </Button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}>
        <div className="bg-linear-to-br from-background to-muted border border-border rounded-2xl p-4 sm:p-6 shadow-sm">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {benefit.description}
          </p>
        </div>
      </div>
    </div>
  )
);

BenefitCard.displayName = "BenefitCard";

export default function CareerSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [openBenefit, setOpenBenefit] = useState<string | null>(null);

  const benefits = careerBenefits as BenefitCardType[];

  return (
    <section
      id="career-section"
      className="pt-4 sm:pt-6 lg:pt-8 pb-6 sm:pb-8 lg:pb-10 px-4 sm:px-6 lg:px-8"
      role="region"
      aria-label="Career opportunities section">
      <SectionReveal
        variant="zoom-in"
        delayMs={80}
        durationMs={700}
        className="max-w-7xl mx-auto">
        {/* Navigation Link */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-muted to-accent border border-border rounded-full">
            <span className="text-foreground text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Careers
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
            Join our team
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            We&apos;re looking for passionate individuals who want to build the
            future of technology. Join us in creating innovative solutions that
            make a real impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Benefits Section */}
          <SectionReveal
            variant="slide-right"
            delayMs={90}
            durationMs={650}
            className="w-full">
            <div className="space-y-6 sm:space-y-8 lg:space-y-10 xl:space-y-12">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                Why work with us?
              </h3>

              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                {benefits.map((benefit) => (
                  <BenefitCard
                    key={benefit.id}
                    benefit={benefit}
                    isOpen={openBenefit === benefit.id}
                    onToggle={() =>
                      setOpenBenefit(
                        openBenefit === benefit.id ? null : benefit.id
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Application Form - Collapsible */}
          <SectionReveal
            variant="fade-up"
            delayMs={120}
            durationMs={700}
            className="w-full">
            <div className="space-y-3 sm:space-y-4">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight mb-3 sm:mb-4">
                  Ready to join us?
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                  Send us your application and let&apos;s start the
                  conversation.
                </p>
              </div>

              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <div className="space-y-4 sm:space-y-6">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-14 sm:h-16 text-base sm:text-lg font-semibold rounded-2xl border-2 border-border hover:border-ring hover:bg-accent hover:shadow-md transition-all duration-300 group"
                      aria-label="Toggle application form">
                      <div className="relative flex items-center justify-center w-full px-12 sm:px-14">
                        {/* Centered icon + label */}
                        <span className="inline-flex items-center gap-2 text-foreground font-medium text-sm sm:text-base">
                          <Send className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                          Apply Now
                        </span>
                        {/* Right chevron */}
                        {isOpen ? (
                          <ChevronUp className="absolute right-4 sm:right-6 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                        ) : (
                          <ChevronDown className="absolute right-4 sm:right-6 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                        )}
                      </div>
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="space-y-4 sm:space-y-6">
                    <CareerApplicationForm />
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </div>
          </SectionReveal>
        </div>
      </SectionReveal>
    </section>
  );
}
