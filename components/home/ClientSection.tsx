"use client";

import React, { useState, useRef, useEffect } from "react";
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
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(
    new Set()
  );
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleRequestCallback = () => {
    setIsDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
  };

  // Modern scroll-triggered animations setup
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const elementId = entry.target.getAttribute("data-animate-id");
        if (elementId) {
          if (entry.isIntersecting) {
            // Add animation with a slight delay for smooth effect
            setTimeout(() => {
              setAnimatedElements((prev) => new Set([...prev, elementId]));
            }, 50);
          } else {
            // Element is out of view - remove animation (for scroll up effect)
            setTimeout(() => {
              setAnimatedElements((prev) => {
                const newSet = new Set(prev);
                newSet.delete(elementId);
                return newSet;
              });
            }, 100);
          }
        }
      });
    }, observerOptions);

    const section = sectionRef.current;
    if (section) {
      const elementsToObserve = section.querySelectorAll("[data-animate-id]");
      elementsToObserve.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }
  }, []);

  // Enhanced initial animations with staggered entrance
  useEffect(() => {
    const initialElements = [
      "client-header",
      "client-stats",
      "client-logos",
      "client-cta",
    ];

    // Staggered entrance for smooth visual flow
    initialElements.forEach((elementId, index) => {
      setTimeout(() => {
        setAnimatedElements((prev) => new Set([...prev, elementId]));
      }, index * 200);
    });
  }, []);

  // Modern animation class helper with enhanced effects
  const getAnimationClass = (baseClass: string, elementId: string) => {
    if (animatedElements.has(elementId)) {
      return baseClass;
    }

    // Enhanced hidden state with modern CSS
    return "opacity-0 translate-y-6 scale-95 transition-all duration-700 ease-out";
  };

  return (
    <>
      <section ref={sectionRef} className="min-h-screen bg-white py-32">
        <div className="w-full">
          {/* Header */}
          <div
            data-animate-id="client-header"
            className={`${getAnimationClass(
              "animate-fade-in-up",
              "client-header"
            )} text-center mb-24 px-8 lg:px-16 transition-all duration-800`}>
            <div
              data-animate-id="client-badge"
              className={`${getAnimationClass(
                "animate-slide-in-right",
                "client-badge"
              )} inline-flex items-center px-4 py-2 bg-gray-100 rounded-full mb-8 border border-gray-200 transition-all duration-800`}>
              <span className="text-gray-700 text-sm font-medium">
                Trusted Partners
              </span>
            </div>

            <h2
              data-animate-id="client-title"
              className={`${getAnimationClass(
                "animate-fade-in-up",
                "client-title"
              )} text-6xl lg:text-8xl font-bold text-gray-900 leading-tight mb-8 transition-all duration-800`}>
              Trusted by
              <br />
              <span
                data-animate-id="client-title-highlight"
                className={`${getAnimationClass(
                  "animate-bounce-slow",
                  "client-title-highlight"
                )} text-blue-600 transition-all duration-800`}>
                industry leaders
              </span>
            </h2>

            <p
              data-animate-id="client-description"
              className={`${getAnimationClass(
                "animate-slide-in-left",
                "client-description"
              )} text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-800`}>
              We partner with forward-thinking companies to deliver innovative
              solutions that drive growth and transform businesses.
            </p>
          </div>

          {/* Stats Section */}
          <div
            data-animate-id="client-stats"
            className={`${getAnimationClass(
              "animate-fade-in-up",
              "client-stats"
            )} px-8 lg:px-16 mb-20 transition-all duration-800`}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card
                data-animate-id="stat-1"
                className={`${getAnimationClass(
                  "animate-slide-in-left",
                  "stat-1"
                )} text-center group border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105 bg-gradient-to-br from-white to-blue-50/30 hover:from-blue-50 hover:to-white`}>
                <CardContent className="p-8">
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-all duration-500 group-hover:scale-110">
                    500+
                  </div>
                  <div className="text-gray-600 text-lg group-hover:text-gray-800 transition-colors duration-300 font-medium">
                    Projects Delivered
                  </div>
                </CardContent>
              </Card>

              <Card
                data-animate-id="stat-2"
                className={`${getAnimationClass(
                  "animate-fade-in-up",
                  "stat-2"
                )} text-center group border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105 bg-gradient-to-br from-white to-green-50/30 hover:from-green-50 hover:to-white`}>
                <CardContent className="p-8">
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-all duration-500 group-hover:scale-110">
                    50+
                  </div>
                  <div className="text-gray-600 text-lg group-hover:text-gray-800 transition-colors duration-300 font-medium">
                    Happy Clients
                  </div>
                </CardContent>
              </Card>

              <Card
                data-animate-id="stat-3"
                className={`${getAnimationClass(
                  "animate-fade-in-up",
                  "stat-3"
                )} text-center group border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105 bg-gradient-to-br from-white to-purple-50/30 hover:from-purple-50 hover:to-white`}>
                <CardContent className="p-8">
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-all duration-500 group-hover:scale-110">
                    4+
                  </div>
                  <div className="text-gray-600 text-lg group-hover:text-gray-800 transition-colors duration-300 font-medium">
                    Years Experience
                  </div>
                </CardContent>
              </Card>

              <Card
                data-animate-id="stat-4"
                className={`${getAnimationClass(
                  "animate-slide-in-right",
                  "stat-4"
                )} text-center group border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105 bg-gradient-to-br from-white to-orange-50/30 hover:from-orange-50 hover:to-white`}>
                <CardContent className="p-8">
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-all duration-500 group-hover:scale-110">
                    99%
                  </div>
                  <div className="text-gray-600 text-lg group-hover:text-gray-800 transition-colors duration-300 font-medium">
                    Success Rate
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Client Logos - Apple-style Design */}
          <div
            data-animate-id="client-logos"
            className={`${getAnimationClass(
              "animate-fade-in-up",
              "client-logos"
            )} px-8 lg:px-16 mb-20 transition-all duration-800`}>
            {/* Header Section */}
            <div
              data-animate-id="logos-header"
              className={`${getAnimationClass(
                "animate-slide-in-up",
                "logos-header"
              )} text-center mb-16 transition-all duration-800`}>
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full mb-8 border border-blue-100">
                <span className="text-blue-700 text-sm font-semibold uppercase tracking-wider">
                  Trusted Partners
                </span>
              </div>
              <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Our Partners
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We're proud to work with these industry-leading companies that
                trust us to deliver exceptional results
              </p>
            </div>

            {/* Logos Grid - Apple-style */}
            <div className="relative">
              {/* Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl"></div>

              {/* Main Container Card */}
              <Card className="relative bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-12 lg:p-20">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 items-center">
                    {clientLogos.map((client, index) => (
                      <Card
                        key={index}
                        data-animate-id={`logo-${index}`}
                        className={`${getAnimationClass(
                          "animate-scale-in",
                          `logo-${index}`
                        )} group border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105 bg-white/90 backdrop-blur-sm hover:bg-white relative overflow-hidden`}>
                        <CardContent className="p-8 lg:p-10 text-center">
                          {/* Logo Image */}
                          <div className="relative h-16 lg:h-20 flex items-center justify-center mb-4">
                            <Image
                              src={client.logo}
                              alt={client.alt}
                              width={160}
                              height={60}
                              className="h-12 lg:h-16 w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
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
          <div
            data-animate-id="client-cta"
            className={`${getAnimationClass(
              "animate-fade-in-up",
              "client-cta"
            )} px-8 lg:px-16 transition-all duration-800`}>
            <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50/50 hover:shadow-3xl transition-all duration-700">
              <CardContent className="p-12 lg:p-16 text-center">
                <CardHeader className="pb-8">
                  <CardTitle
                    data-animate-id="cta-title"
                    className={`${getAnimationClass(
                      "animate-slide-in-left",
                      "cta-title"
                    )} text-3xl lg:text-4xl font-bold text-gray-900 mb-6 transition-all duration-800`}>
                    Ready to join our success stories?
                  </CardTitle>
                </CardHeader>

                <CardContent className="pb-8">
                  <p
                    data-animate-id="cta-description"
                    className={`${getAnimationClass(
                      "animate-slide-in-right",
                      "cta-description"
                    )} text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-800`}>
                    Let's discuss how we can help your business achieve its
                    goals with innovative technology solutions.
                  </p>

                  <Button
                    data-animate-id="cta-button"
                    className={`${getAnimationClass(
                      "animate-bounce-slow",
                      "cta-button"
                    )} px-12 py-4 text-lg font-semibold rounded-full transition-all duration-500 hover:scale-110 hover:shadow-2xl`}
                    onClick={handleRequestCallback}
                    variant="black"
                    size="lg">
                    Start Your Project
                  </Button>
                </CardContent>
              </CardContent>
            </Card>
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
