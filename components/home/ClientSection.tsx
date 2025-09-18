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
      <section className="min-h-screen bg-white py-32">
        <div className="w-full">
          {/* Header */}
          <div className="text-center mb-24 px-8 lg:px-16">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full mb-8">
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  500+
                </div>
                <div className="text-gray-600 text-lg">Projects Delivered</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                  50+
                </div>
                <div className="text-gray-600 text-lg">Happy Clients</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  4+
                </div>
                <div className="text-gray-600 text-lg">Years Experience</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                  99%
                </div>
                <div className="text-gray-600 text-lg">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Client Logos */}
          <div className="px-8 lg:px-16 mb-20">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12 lg:p-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Our Partners
                </h3>
                <p className="text-gray-600 text-lg">
                  We're proud to work with these industry-leading companies
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
                {clientLogos.map((client, index) => (
                  <div key={index} className="group flex justify-center">
                    <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                      <Image
                        src={client.logo}
                        alt={client.alt}
                        width={140}
                        height={50}
                        className="h-12 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center px-8 lg:px-16">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Ready to join our success stories?
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Let's discuss how we can help your business achieve its goals
                with innovative technology solutions.
              </p>
              <Button
                onClick={handleRequestCallback}
                variant="black"
                size="lg"
                className="px-12 py-4 text-lg font-semibold rounded-full transition-all duration-300">
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
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
