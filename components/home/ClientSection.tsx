"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import Image from "next/image";
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
  ClientLogo as ClientLogoType,
  ContactFormDialogProps,
  ButtonClickHandler,
} from "@/models/interfaces";
import { SectionWrapper } from "@/components/shared";
import { Marquee } from "@/components/ui/marquee";

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

  // Memoized client logos data
  const clientLogos = useMemo(
    (): ClientLogoType[] => [
      {
        name: "Facebook",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/facebook.png",
        alt: "logo of facebook",
      },
      {
        name: "Google",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/google.png",
        alt: "logo of google",
      },
      {
        name: "GoodFirms",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/goodfirms.png",
        alt: "logo of goodfirms",
      },
      {
        name: "Clutch",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/clutch.png",
        alt: "logo of clutch",
      },
      {
        name: "Upwork",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/upwork.png",
        alt: "logo of upwork",
      },
      {
        name: "Codeable",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/codeable.png",
        alt: "logo of codeable",
      },
      {
        name: "Facebook",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/facebook.png",
        alt: "logo of facebook",
      },
      {
        name: "Google",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/google.png",
        alt: "logo of google",
      },
      {
        name: "GoodFirms",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/goodfirms.png",
        alt: "logo of goodfirms",
      },
      {
        name: "Clutch",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/clutch.png",
        alt: "logo of clutch",
      },
      {
        name: "Upwork",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/upwork.png",
        alt: "logo of upwork",
      },
      {
        name: "Codeable",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/codeable.png",
        alt: "logo of codeable",
      },
    ],
    []
  );

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
      <SectionWrapper
        id="client-section"
        className=""
        role="main"
        aria-label="Client testimonials and partners section">
        <div className="w-full">
          {/* Client Logos - Marquee Effect */}
          <div className="px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 lg:mb-20">
            {/* Header Section */}
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full mb-8 border border-gray-100">
                <span className="text-gray-700 text-sm font-semibold uppercase tracking-wider">
                  Trusted Partners
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                Our Partners
              </h3>
              <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We&apos;re proud to work with these industry-leading companies
                that trust us to deliver exceptional results
              </p>
            </div>

            {/* Marquee Container */}
            <div className="relative overflow-hidden bg-white rounded-3xl p-4 sm:p-6 lg:p-8">
              <Marquee pauseOnHover className="[--duration:20s]">
                {clientLogos.map((client, index) => (
                  <div
                    key={index}
                    className="mx-8 flex items-center justify-center">
                    <div className="relative h-16 w-32 flex items-center justify-center">
                      <Image
                        src={client.logo}
                        alt={client.alt}
                        width={120}
                        height={60}
                        className="h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                        sizes="120px"
                      />
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>
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
      </SectionWrapper>

      {/* Contact Form Dialog */}
      <ContactFormDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSuccess={handleFormSuccess}
      />
    </>
  );
}
