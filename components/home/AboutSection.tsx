"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
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
import { Brain, Award, Users, Zap } from "lucide-react";
import {
  ContactFormDialogProps,
  ButtonClickHandler,
} from "@/models/interfaces";

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
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
      <CardContent className="p-8 text-center">
        <div
          className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
          {number}
        </div>
        <div className="text-sm text-gray-600 font-medium">{label}</div>
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

  // Stats data
  const stats = useMemo(
    () => [
      {
        icon: Brain,
        number: "500+",
        label: "AI Solutions",
        color: "from-blue-500 to-blue-600",
      },
      {
        icon: Award,
        number: "50+",
        label: "Innovations",
        color: "from-purple-500 to-purple-600",
      },
      {
        icon: Users,
        number: "100+",
        label: "Happy Clients",
        color: "from-green-500 to-green-600",
      },
      {
        icon: Zap,
        number: "4+",
        label: "Years Experience",
        color: "from-yellow-500 to-orange-500",
      },
    ],
    []
  );

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
        className="bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8"
        role="main"
        aria-label="About Codagam section">
        <div className="w-full">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gray-50 mb-8 border border-gray-100">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse mr-3"></div>
                <span className="text-gray-700 text-sm font-semibold">
                  About Codagam
                </span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Empowering <span className="text-black">businesses</span> with
                <br />
                <span className="text-gray-900">innovative solutions</span>
              </h1>

              <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8">
                At Codagam, we pride ourselves on delivering transformative
                technology solutions. Our team of experts is dedicated to
                driving positive change and fostering sustainable growth.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
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
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-gray-50 rounded-3xl p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12 lg:mb-16">
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
                {/* Left Side - Image */}
                <div className="order-2 lg:order-1">
                  <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden">
                    <Image
                      src="/images/Codagam_Img (2).jpg"
                      alt="Codagam team and technology solutions"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      priority={false}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      Why Us?
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      At Codagam, we pride ourselves on delivering
                      transformative technology solutions. Our team of experts
                      is dedicated to driving positive change and fostering
                      sustainable growth. With a focus on measurable impact and
                      differentiation, we lead by example, ensuring your
                      business not only survives but thrives.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        AI-Driven Excellence
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Our AI-driven solutions are designed for sustained best
                        practices, ensuring ethical standards while delivering
                        pragmatic results. From predictive analytics to
                        intelligent automation, we empower businesses with
                        cutting-edge AI capabilities.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Innovation at the Forefront
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
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
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
