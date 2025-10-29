"use client";

import React, { useCallback, useMemo, memo } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  GalleryItem as GalleryItemType,
  ServiceCardProps,
} from "@/models/interfaces";

// Memoized service card component
const ServiceCard = memo(
  ({ item }: Omit<ServiceCardProps, "index" | "currentIndex">) => (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] group-hover:scale-[1.02] transition-all duration-500 ease-out group">
        {/* Image Background - Left Side */}
        <div className="order-1 lg:order-1">
          <div className="relative h-full min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] overflow-hidden rounded-t-2xl lg:rounded-l-3xl lg:rounded-t-none group-hover:shadow-xl transition-all duration-500">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-500"></div>
          </div>
        </div>

        {/* Content Card - Right Side */}
        <div className="order-2 lg:order-2">
          <Card
            className="relative overflow-hidden border-0 shadow-lg bg-card h-full min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] group-hover:shadow-xl group-hover:bg-accent transition-all duration-500 rounded-b-2xl lg:rounded-r-3xl lg:rounded-b-none"
            style={{ borderRadius: "0 1.5rem 1.5rem 0" }}>
            <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center h-full">
              <div className="flex-1 flex flex-col justify-center">
                <CardHeader className="pb-4 sm:pb-6 px-0">
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-500">
                    {item.title}.
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 px-0">
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-500">
                    {item.description}
                  </p>
                </CardContent>
              </div>
            </div>
            {/* Hover overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </Card>
        </div>
      </div>
    </div>
  )
);

ServiceCard.displayName = "ServiceCard";

export default function ServicesSection() {
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
      className="flex items-center pt-4 sm:pt-6 lg:pt-8 pb-6 sm:pb-8 lg:pb-10 px-4 sm:px-6 lg:px-8"
      role="main"
      aria-label="Services section">
      <div className="w-full">
        <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
            Our Services
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-4xl mx-auto">
            Empowering your digital journey with cutting-edge solutions
          </p>
        </div>

        <div>
          <div className="relative">
            <Carousel
              className="bg-gray-200 dark:bg-muted p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl"
              opts={{
                align: "start",
                loop: false,
              }}>
              <CarouselContent className="gap-3 sm:gap-4 lg:gap-6 xl:gap-8 pb-3 sm:pb-4 lg:pb-6">
                {galleryItems.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="flex-shrink-0 w-full max-w-4xl lg:max-w-5xl">
                    <ServiceCard item={item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="right-16 sm:right-20 lg:right-24 xl:right-28 bottom-3 sm:bottom-4 lg:bottom-6 xl:bottom-8 h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-full bg-card/95 backdrop-blur-sm border border-border/50 hover:bg-card hover:scale-110 transition-all duration-300" />
              <CarouselNext className="right-3 sm:right-4 lg:right-6 xl:right-8 bottom-3 sm:bottom-4 lg:bottom-6 xl:bottom-8 h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-full bg-card/95 backdrop-blur-sm border border-border/50 hover:bg-card hover:scale-110 transition-all duration-300" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
