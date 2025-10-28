"use client";

import React, { useMemo, memo } from "react";
import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GalleryItem as GalleryItemType } from "@/models/interfaces";
import { useScrollAnimation, ContactForm } from "@/components/shared";

// Constants for better maintainability
const SERVICES_CONFIG = {
  title: "Services",
  scrollMargin: "scroll-mt-32 sm:scroll-mt-32 md:scroll-mt-32 lg:scroll-mt-28",
} as const;

// Memoized service card component
const ServiceCard = memo(({ item }: { item: GalleryItemType }) => (
  <div className="w-full h-full">
    <div className="h-full w-full transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer group">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-0 items-stretch h-[500px] sm:h-[500px] md:h-[500px] lg:h-[420px] rounded-xl sm:rounded-2xl overflow-hidden">
        {/* Image Section - Left Side - No Card Background */}
        <div className="relative h-[250px] w-full flex-shrink-0 sm:h-[250px] md:h-[250px] lg:h-full">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/20" />
        </div>

        {/* Content Section - Right Side - With Card Background */}
        <Card className="h-[250px] w-full border-0 bg-white shadow-lg rounded-none flex-shrink-0 sm:h-[250px] md:h-[250px] lg:h-full">
          <div className="p-3 sm:p-4 md:p-5 lg:p-7 flex flex-col justify-center h-full w-full">
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Service
              </div>
              <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-black mb-2 sm:mb-3 leading-tight">
                {item.title}.
              </CardTitle>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
));

ServiceCard.displayName = "ServiceCard";

export default function ServicesSection() {
  // Apple-like scroll animations
  const headerAnimation = useScrollAnimation<HTMLDivElement>({ delay: 100 });
  const galleryAnimation = useScrollAnimation<HTMLDivElement>({ delay: 300 });

  // Memoized gallery items data
  const galleryItems = useMemo(
    (): GalleryItemType[] => [
      {
        id: "digital-transformation",
        title: "Digital Transformation",
        description:
          "Empower your business with our comprehensive digital transformation services. We help you leverage emerging technologies to streamline operations, enhance customer experiences, and stay ahead in the digital age.",
        image: "/images/digitran.jpg",
        alt: "Digital transformation services for modern businesses",
      },
      {
        id: "ai-marketing",
        title: "AI-Powered Marketing Solutions",
        description:
          "Revolutionize your marketing efforts with our AI-driven solutions. From predictive analytics to personalized customer experiences, we help you harness the power of AI to boost your marketing ROI and customer engagement.",
        image: "/images/Codagam_Img (3).jpg",
        alt: "AI-powered marketing solutions and analytics",
      },
      {
        id: "custom-software",
        title: "Custom Software Solutions",
        description:
          "We craft bespoke solutions that address your unique business challenges. From enterprise applications to mobile apps, our team delivers scalable, secure, and efficient software that drives your business forward.",
        image: "/images/Codagam_Bespoke.jpg",
        alt: "Custom software development and solutions",
      },
      {
        id: "quality-assurance",
        title: "Quality Assurance and Testing",
        description:
          "We conduct rigorous testing to ensure optimal performance across all platforms. Our QA experts use cutting-edge tools and methodologies to deliver bug-free, user-friendly software that exceeds expectations.",
        image: "/images/Codagam_Img (4).jpg",
        alt: "Quality assurance and software testing services",
      },
      {
        id: "design-thinking",
        title: "Design Thinking and Innovation",
        description:
          "Unlock your organization's innovative potential with our design thinking workshops and innovation consulting. We help you cultivate a culture of creativity and problem-solving that drives continuous improvement and breakthrough ideas.",
        image: "/images/idea.jpg",
        alt: "Design thinking and innovation consulting",
      },
      {
        id: "tech-venture",
        title: "Tech Venture Launch Support",
        description:
          "Turn your startup vision into reality with our comprehensive launch support. From MVP development to scaling strategies, we provide the technical expertise and business insights you need to succeed in the competitive tech landscape.",
        image: "/images/launch.jpg",
        alt: "Tech venture launch and startup support",
      },
      {
        id: "remote-teams",
        title: "Remote Software Development Teams",
        description:
          "Leverage our curated teams of skilled developers tailored to your specific needs. Our global talent pool ensures you get the best expertise for your project, regardless of geographical boundaries.",
        image: "/images/commonWork.jpg",
        alt: "Remote software development teams",
      },
      {
        id: "agile-management",
        title: "Agile Project Management",
        description:
          "Our Agile approach ensures transparent communication, rapid iterations, and continuous improvement. We adapt quickly to changes, delivering value at every sprint and keeping your project on track.",
        image: "/images/agile.jpg",
        alt: "Agile project management and development",
      },
    ],
    []
  );

  return (
    <section
      id="services-section"
      className="homepage-section standalone-module w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen pt-0 pb-8 sm:pt-0 sm:pb-12 md:pt-0 md:pb-16 lg:pt-0 lg:pb-24"
      data-module-template="services-section"
      data-analytics-region="services-section"
      role="main"
      aria-label="Services section">
      <div className="module-content">
        {/* Header Section */}
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-4 sm:px-6 md:px-8 scroll-animate-slide-down ${
            headerAnimation.isVisible ? "animate-in" : ""
          }`}>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight ${SERVICES_CONFIG.scrollMargin}`}>
            {SERVICES_CONFIG.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-3 sm:mt-4">
            Comprehensive solutions to accelerate your business growth
          </p>
        </div>

        {/* Services Gallery */}
        <div
          ref={galleryAnimation.ref}
          className={`scroll-animate-slide-up ${
            galleryAnimation.isVisible ? "animate-in" : ""
          }`}>
          <div className="relative bg-gray-200 py-8 min-h-[600px] sm:min-h-[600px] md:min-h-[600px] lg:min-h-[600px] h-[600px] sm:h-[600px] md:h-[600px] lg:h-[600px] overflow-hidden w-full mt-8 mb-8">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full h-full">
              <CarouselContent className="px-4 py-4 pb-24 sm:pb-28 md:pb-28 lg:pb-24">
                {galleryItems.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="basis-full sm:basis-full md:basis-full lg:basis-1/2 w-full px-2">
                    <ServiceCard item={item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Contact Button */}
          <div className="text-center mt-8 sm:mt-12">
            <ContactForm
              asDialog={true}
              triggerText="Get Started with Our Services"
              triggerVariant="black"
              triggerSize="lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
