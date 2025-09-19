"use client";

import React, { useEffect, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GalleryItem as GalleryItemType,
  ServiceCardProps,
} from "@/models/interfaces";
import {
  SectionWrapper,
  useScrollContainer,
  NavigationButton,
} from "@/components/shared";

// Memoized service card component
const ServiceCard = memo(({ item, index, currentIndex }: ServiceCardProps) => (
  <div
    key={item.id}
    className="flex-shrink-0 w-full max-w-5xl scroll-snap-start "
    role="listitem">
    <div className="grid lg:grid-cols-2 gap-8 items-stretch min-h-[600px] px-8 lg:px-16 ">
      {/* Content Card - Left Side */}
      <Card className="order-2 lg:order-1 h-full border-0 transition-all duration-500 hover:scale-105 rounded-3xl bg-white">
        <CardHeader className="pb-6">
          <CardTitle className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {item.title}.
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-lg text-gray-600 leading-relaxed">
            {item.description}
          </p>
        </CardContent>
      </Card>

      {/* Image - Right Side */}
      <div className="order-1 lg:order-2">
        <div className="relative h-full min-h-[600px] rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
            priority={index === currentIndex}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>
      </div>
    </div>
  </div>
));

ServiceCard.displayName = "ServiceCard";

export default function ServicesSection() {
  // Use the reusable scroll container
  const { currentIndex, scrollContainerRef, scrollToItem, handleScroll } =
    useScrollContainer(800);

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

  const handlePrevClick = useCallback(() => {
    scrollToItem(Math.max(0, currentIndex - 1));
  }, [scrollToItem, currentIndex]);

  const handleNextClick = useCallback(() => {
    scrollToItem(Math.min(galleryItems.length - 1, currentIndex + 1));
  }, [scrollToItem, currentIndex, galleryItems.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll, scrollContainerRef]);

  // No animations needed - removed animation setup

  // No animations needed - removed animation effects

  return (
    <SectionWrapper
      id="services-section"
      className="min-h-screen flex items-center "
      role="main"
      aria-label="Services section">
      <div className="w-full">
        <div className="text-center mb-20 px-8 lg:px-16">
          <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
            Our Services
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto">
            Empowering your digital journey with cutting-edge solutions
          </p>
        </div>

        <div>
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide scroll-smooth bg-gray-200 p-6"
              style={{ scrollSnapType: "x mandatory" }}
              role="region"
              aria-label="Services gallery">
              <div
                className="flex gap-8 pb-6"
                role="list"
                aria-label="Services Gallery">
                {galleryItems.map((item, index) => (
                  <ServiceCard
                    key={item.id}
                    item={item}
                    index={index}
                    currentIndex={currentIndex}
                  />
                ))}
              </div>
            </div>

            {/* Navigation Buttons - Bottom Right */}
            <div className="absolute right-8 bottom-8 flex gap-6 z-10">
              <NavigationButton
                direction="prev"
                onClick={handlePrevClick}
                disabled={currentIndex === 0}
                ariaLabel="Previous services gallery"
              />
              <NavigationButton
                direction="next"
                onClick={handleNextClick}
                disabled={currentIndex === galleryItems.length - 1}
                ariaLabel="Next services gallery"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
