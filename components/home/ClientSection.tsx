"use client";

import React, { useState, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ClientLogoCarousel } from "@/components/shared";

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

export default function ClientSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Optimized event handlers with useCallback
  const handleRequestCallback: ButtonClickHandler = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleFormSuccess: ButtonClickHandler = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handleDialogClose: ButtonClickHandler = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  // No animations needed - removed animation setup

  // No animations needed - removed animation effects

  return (
    <>
      <section
        id="client-section"
        className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8"
        role="main"
        aria-label="Client testimonials and partners section">
        <div className="w-full">
          {/* Client Logos Carousel */}
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <ClientLogoCarousel
              title="Our Partners"
              subtitle="We're proud to work with these industry-leading companies that trust us to deliver exceptional results"
              className="px-4 sm:px-6 lg:px-8"
            />
          </div>

          {/* Call to Action */}
          <div className="px-4 sm:px-6 lg:px-8">
            <Card className="max-w-4xl mx-auto border-0 bg-gradient-to-br from-white to-gray-50/50 transition-all duration-700">
              <CardContent className="p-8 sm:p-10 lg:p-12 text-center">
                <CardHeader className="pb-8">
                  <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    Ready to join our success stories?
                  </CardTitle>
                </CardHeader>

                <CardContent className="pb-8">
                  <p className="text-base text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                    Let&apos;s discuss how we can help your business achieve its
                    goals with innovative technology solutions.
                  </p>

                  <Button
                    className="px-12 py-4 text-lg font-semibold rounded-full transition-all duration-500 hover:scale-110"
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

      {/* Contact Form Dialog */}
      <ContactFormDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSuccess={handleFormSuccess}
      />
    </>
  );
}
