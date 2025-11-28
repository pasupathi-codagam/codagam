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
        className="overflow-x-hidden bg-background px-4 pt-0 pb-8 sm:px-6 sm:pb-10 lg:px-8 lg:pb-12"
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

            {/* Stats Grid */}
            <SectionReveal
              variant="slide-up"
              delayMs={100}
              durationMs={650}
              className="w-full mb-3 sm:mb-4">
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

            {/* Why Choose Us Section */}
            <div className="group relative overflow-hidden rounded-3xl border border-border/40 bg-gray-100 dark:bg-black p-4 shadow-sm sm:p-5 lg:p-6 transition-all duration-500 hover:border-transparent hover:shadow-xl hover:-translate-y-1">
              <div className="hover-bg bg-indigo-600"></div>
              <div className="relative z-10 grid grid-cols-1 items-center gap-6 sm:gap-7 lg:grid-cols-2 lg:gap-8">
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
                <div className="order-1 lg:order-2 space-y-3 sm:space-y-4 lg:space-y-5">
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-white transition-colors duration-300">
                      Why Us?
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-3 sm:mb-4 group-hover:text-white/90 transition-colors duration-300">
                      At Codagam, we pride ourselves on delivering
                      transformative technology solutions. Our team of experts
                      is dedicated to driving positive change and fostering
                      sustainable growth. With a focus on measurable impact and
                      differentiation, we lead by example, ensuring your
                      business not only survives but thrives.
                    </p>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 group-hover:text-white transition-colors duration-300">
                        AI-Driven Excellence
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                        Our AI-driven solutions are designed for sustained best
                        practices, ensuring ethical standards while delivering
                        pragmatic results. From predictive analytics to
                        intelligent automation, we empower businesses with
                        cutting-edge AI capabilities.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 group-hover:text-white transition-colors duration-300">
                        Innovation at the Forefront
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed group-hover:text-white/90 transition-colors duration-300">
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
