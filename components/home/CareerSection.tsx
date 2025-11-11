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
    <div className="space-y-3 sm:space-y-4">
      <Button
        variant="outline"
        className={`group flex h-14 w-full items-center justify-between rounded-2xl border-2 px-4 text-sm font-semibold transition-all duration-300 sm:h-16 sm:px-6 sm:text-base lg:text-lg ${
          isOpen
            ? "border-ring bg-accent shadow-md"
            : "border-border hover:border-ring hover:bg-accent hover:shadow-sm"
        }`}
        onClick={onToggle}
        aria-label={`Toggle ${benefit.title} details`}>
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11">
            <benefit.icon
              className={`h-5 w-5 ${
                iconColorMap[benefit.color] ?? "text-primary"
              }`}
            />
          </div>
          <span className="text-sm font-medium text-foreground sm:text-base">
            {benefit.title}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-foreground sm:h-5 sm:w-5" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-foreground sm:h-5 sm:w-5" />
        )}
      </Button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}>
        <div className="rounded-2xl border border-border/40 bg-card p-4 shadow-sm sm:p-6">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
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
      className="overflow-x-hidden bg-background px-4 pt-0 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20"
      role="region"
      aria-label="Career opportunities section">
      <SectionReveal
        variant="zoom-in"
        delayMs={80}
        durationMs={700}
        className="mx-auto w-full max-w-7xl">
        {/* Navigation Link */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-muted to-accent border border-border rounded-full">
            <span className="text-foreground text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Careers
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-6 text-center sm:mb-8 lg:mb-12">
          <h2 className="mb-4 text-2xl font-bold leading-tight text-blue-900 sm:text-3xl lg:text-4xl">
            Join our team
          </h2>

          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
            We&apos;re looking for passionate individuals who want to build the
            future of technology. Join us in creating innovative solutions that
            make a real impact.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
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
