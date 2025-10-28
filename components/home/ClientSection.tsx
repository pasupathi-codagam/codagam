"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import { ContactForm } from "@/components/shared/ContactForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ContactFormDialogProps,
  ButtonClickHandler,
} from "@/models/interfaces";
import {
  StatsCard,
  ClientLogoCarousel,
  useScrollAnimation,
} from "@/components/shared";

// Constants for better maintainability
const CLIENT_CONFIG = {
  title: "Clients",
  scrollMargin: "scroll-mt-32 sm:scroll-mt-32 md:scroll-mt-32 lg:scroll-mt-28",
} as const;

// Stats configuration
const STATS_CONFIG = [
  {
    number: "6",
    label: "Projects Delivered",
    color: "blue",
    elementId: "stat-1",
  },
  {
    number: "2+",
    label: "Happy Clients",
    color: "green",
    elementId: "stat-2",
  },
  {
    number: "4+",
    label: "Years Experience",
    color: "purple",
    elementId: "stat-3",
  },
  {
    number: "100%",
    label: "Success Rate",
    color: "orange",
    elementId: "stat-4",
  },
] as const;

// Custom hook for dialog management
const useDialogManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRequestCallback: ButtonClickHandler = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleFormSuccess: ButtonClickHandler = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handleDialogClose: ButtonClickHandler = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return {
    isDialogOpen,
    handleRequestCallback,
    handleFormSuccess,
    handleDialogClose,
  };
};

// Memoized contact form dialog
const ContactFormDialog = memo(
  ({ isOpen, onClose, onSuccess }: ContactFormDialogProps) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-4 sm:p-5">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-black">
            Get in Touch
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            We&apos;d love to hear from you. Send us a message and we&apos;ll
            respond as soon as possible.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 sm:mt-6">
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

export default function ClientSection() {
  // Dialog management
  const { isDialogOpen, handleFormSuccess, handleDialogClose } =
    useDialogManagement();

  // Apple-like scroll animations
  const headerAnimation = useScrollAnimation<HTMLDivElement>({ delay: 0 });
  const statsAnimation = useScrollAnimation<HTMLDivElement>({ delay: 100 });
  const carouselAnimation = useScrollAnimation<HTMLDivElement>({ delay: 200 });

  // Memoized stats data
  const statsData = useMemo(() => STATS_CONFIG, []);

  return (
    <>
      <section
        id="client-section"
        className="homepage-section standalone-module w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen pt-0 pb-8 sm:pt-0 sm:pb-12 md:pt-0 md:pb-16 lg:pt-0 lg:pb-24"
        data-module-template="client-section"
        data-analytics-region="client-section"
        role="main"
        aria-label="Client testimonials and partners section">
        <div className="module-content">
          {/* Header */}
          <div
            ref={headerAnimation.ref}
            className={`text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-4 sm:px-6 md:px-8 scroll-animate-fade ${
              headerAnimation.isVisible ? "animate-in" : ""
            }`}>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight ${CLIENT_CONFIG.scrollMargin}`}>
              {CLIENT_CONFIG.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-3 sm:mt-4">
              Trusted by leading organizations worldwide
            </p>
          </div>

          {/* Enhanced Stats Section */}
          <div
            ref={statsAnimation.ref}
            className={`mb-8 scroll-animate-slide-up ${
              statsAnimation.isVisible ? "animate-in" : ""
            }`}>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {statsData.map((stat, index) => (
                <div
                  key={stat.elementId}
                  className="transform transition-all duration-700 hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}>
                  <StatsCard
                    number={stat.number}
                    label={stat.label}
                    color={stat.color}
                    elementId={stat.elementId}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Client Logos - Horizontal Scrolling Carousel */}
          <div
            ref={carouselAnimation.ref}
            className={`mb-8 scroll-animate-scale ${
              carouselAnimation.isVisible ? "animate-in" : ""
            }`}>
            <ClientLogoCarousel
              title="Our Partners"
              subtitle="We're proud to work with these industry-leading companies that trust us to deliver exceptional results"
            />
          </div>
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
}
