"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/shared/ContactForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StaggeredAnimation from "@/components/shared/StaggeredAnimation";

const clientLogos = [
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
];

export default function ClientSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRequestCallback = () => {
    setIsDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <section className="min-h-screen bg-gray-200 flex items-center py-20">
        <div className="w-full px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            {/* Main Content */}
            <StaggeredAnimation animationType="slideUp" delay={100}>
              <div className="text-center mb-20">
                <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
                  Trusted by Industry Leaders
                </h2>
                <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Our tailored solutions and data-driven strategies drive sales
                  and enhance customer engagement. We help businesses harness
                  automation, personalization, and analytics to streamline
                  operations.
                </p>
              </div>
            </StaggeredAnimation>

            {/* Client Logos */}
            <StaggeredAnimation animationType="fade" delay={200}>
              <div className="bg-white rounded-3xl p-12 shadow-lg mb-16">
                <div className="flex items-center justify-center gap-12 lg:gap-16 overflow-x-auto scrollbar-hide">
                  {clientLogos.map((client, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300">
                      <Image
                        src={client.logo}
                        alt={client.alt}
                        width={160}
                        height={60}
                        className="h-16 w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </StaggeredAnimation>

            {/* Request Callback Button */}
            <StaggeredAnimation animationType="bounce" delay={300}>
              <div className="text-center">
                <Button
                  onClick={handleRequestCallback}
                  size="lg"
                  className="px-12 py-4 text-lg font-medium bg-gray-900 hover:bg-gray-800 rounded-full">
                  Request a callback
                </Button>
              </div>
            </StaggeredAnimation>
          </div>
        </div>

        <style jsx global>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>

      {/* Contact Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              onSuccess={handleFormSuccess}
              className="w-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
