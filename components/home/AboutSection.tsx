"use client";

import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/shared/ContactForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SectionReveal from "@/components/shared/animation";
import {
  ContactFormDialogProps,
  ButtonClickHandler,
} from "@/models/interfaces";
import { aboutStats } from "@/lib/content/about";

// Stats card component
const StatsCard = memo(
  ({
    icon: Icon,
    number,
    label,
    color,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    number: string;
    label: string;
    color: string;
  }) => (
    <Card className="group relative overflow-hidden border border-border/40 bg-card shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-6 text-center sm:p-7 lg:p-8">
        <div
          className={`w-16 h-16 mx-auto mb-4 bg-linear-to-r ${color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="text-3xl font-bold text-foreground mb-2 group-hover:scale-110 transition-transform duration-300">
          {number}
        </div>
        <div className="text-sm text-muted-foreground font-medium">{label}</div>
      </CardContent>
    </Card>
  )
);

StatsCard.displayName = "StatsCard";

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

const AboutSection = memo(() => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const stats = aboutStats;

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
        className="overflow-x-hidden bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        role="region"
        aria-label="About Codagam section">
        <div className="mx-auto w-full max-w-7xl">
          <SectionReveal
            variant="fade-down"
            durationMs={700}
            delayMs={70}
            className="mx-auto flex w-full flex-col gap-12">
            {/* Navigation Link */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-muted to-accent border border-border rounded-full">
                <span className="text-foreground text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  About Codagam
                </span>
              </div>
            </div>

            {/* Header Section */}
            <div className="mb-10 text-center sm:mb-12 lg:mb-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Empowering businesses with innovative solutions
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                At Codagam, we pride ourselves on delivering transformative
                technology solutions. Our team of experts is dedicated to
                driving positive change and fostering sustainable growth.
              </p>

              {/* Stats Grid */}
              <SectionReveal
                variant="slide-up"
                delayMs={100}
                durationMs={650}
                className="w-full">
                <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 px-2 sm:gap-6 sm:px-0 lg:grid-cols-4 lg:gap-8">
                  {stats.map((stat, index) => (
                    <StatsCard
                      key={index}
                      icon={stat.icon}
                      number={stat.number}
                      label={stat.label}
                      color={stat.color}
                    />
                  ))}
                </div>
              </SectionReveal>
            </div>

            {/* Why Choose Us Section */}
            <div className="mb-10 rounded-3xl border border-border/40 bg-card p-4 shadow-sm sm:p-6 lg:p-10">
              <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
                {/* Left Side - Image */}
                <div className="order-2 lg:order-1">
                  <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden">
                    <Image
                      src="/images/Codagam_Img (2).jpg"
                      alt="Codagam team and technology solutions"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      priority={false}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="order-1 lg:order-2 space-y-4 sm:space-y-6 lg:space-y-8">
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                      Why Us?
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                      At Codagam, we pride ourselves on delivering
                      transformative technology solutions. Our team of experts
                      is dedicated to driving positive change and fostering
                      sustainable growth. With a focus on measurable impact and
                      differentiation, we lead by example, ensuring your
                      business not only survives but thrives.
                    </p>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                        AI-Driven Excellence
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        Our AI-driven solutions are designed for sustained best
                        practices, ensuring ethical standards while delivering
                        pragmatic results. From predictive analytics to
                        intelligent automation, we empower businesses with
                        cutting-edge AI capabilities.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                        Innovation at the Forefront
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        Our R&D team is at the forefront of technological
                        innovation, constantly exploring new ways to solve
                        pressing challenges. We invest in cutting-edge research
                        to develop products that not only meet current needs but
                        anticipate future demands, ensuring our clients remain
                        ahead of the curve.
                      </p>
                    </div>
                  </div>
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
