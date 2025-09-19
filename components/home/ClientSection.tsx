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
import { SectionWrapper, StatsCard } from "@/components/shared";

// Memoized client logo card component
const ClientLogoCard = memo(
  ({ client, index }: { client: ClientLogoType; index: number }) => (
    <Card
      key={index}
      className="group border-0 transition-all duration-700 hover:scale-105 bg-white/90 backdrop-blur-sm hover:bg-white relative overflow-hidden">
      <CardContent className="p-8 lg:p-10 text-center">
        {/* Logo Image */}
        <div className="relative h-16 lg:h-20 flex items-center justify-center mb-4">
          <Image
            src={client.logo}
            alt={client.alt}
            width={160}
            height={60}
            className="h-12 lg:h-16 w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
            sizes="(max-width: 768px) 120px, 160px"
          />
        </div>

        {/* Company Name */}
        <CardTitle className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
          {client.name}
        </CardTitle>

        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 via-transparent to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-500"></div>
      </CardContent>
    </Card>
  )
);

ClientLogoCard.displayName = "ClientLogoCard";

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
    ],
    []
  );

  // Memoized stats data
  const statsData = useMemo(
    () => [
      {
        number: "500+",
        label: "Projects Delivered",
        color: "blue",
        elementId: "stat-1",
      },
      {
        number: "50+",
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
        number: "99%",
        label: "Success Rate",
        color: "orange",
        elementId: "stat-4",
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
        className="min-h-screen"
        role="main"
        aria-label="Client testimonials and partners section">
        <div className="w-full">
          {/* Header */}
          <div className="text-center mb-24 px-8 lg:px-16">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full mb-8 border border-gray-200">
              <span className="text-gray-700 text-sm font-medium">
                Trusted Partners
              </span>
            </div>

            <h2 className="text-6xl lg:text-8xl font-bold text-gray-900 leading-tight mb-8">
              Trusted by
              <br />
              <span className="text-blue-600">industry leaders</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We partner with forward-thinking companies to deliver innovative
              solutions that drive growth and transform businesses.
            </p>
          </div>

          {/* Stats Section */}
          <div className="px-8 lg:px-16 mb-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {statsData.map((stat) => (
                <StatsCard
                  key={stat.elementId}
                  number={stat.number}
                  label={stat.label}
                  color={stat.color}
                  elementId={stat.elementId}
                />
              ))}
            </div>
          </div>

          {/* Client Logos - Apple-style Design */}
          <div className="px-8 lg:px-16 mb-20">
            {/* Header Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full mb-8 border border-blue-100">
                <span className="text-blue-700 text-sm font-semibold uppercase tracking-wider">
                  Trusted Partners
                </span>
              </div>
              <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Our Partners
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We&apos;re proud to work with these industry-leading companies
                that trust us to deliver exceptional results
              </p>
            </div>

            {/* Logos Grid - Apple-style */}
            <div className="relative">
              {/* Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl"></div>

              {/* Main Container Card */}
              <Card className="relative bg-white/80 backdrop-blur-sm border-0 rounded-3xl overflow-hidden">
                <CardContent className="p-12 lg:p-20">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 items-center">
                    {clientLogos.map((client, index) => (
                      <ClientLogoCard
                        key={index}
                        client={client}
                        index={index}
                      />
                    ))}
                  </div>

                  {/* Bottom Accent */}
                  <div className="mt-12 flex justify-center">
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-60"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="px-8 lg:px-16">
            <Card className="max-w-4xl mx-auto border-0 bg-gradient-to-br from-white to-gray-50/50 transition-all duration-700">
              <CardContent className="p-12 lg:p-16 text-center">
                <CardHeader className="pb-8">
                  <CardTitle className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    Ready to join our success stories?
                  </CardTitle>
                </CardHeader>

                <CardContent className="pb-8">
                  <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
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
