"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo,
  useRef,
} from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GalleryItem as GalleryItemType,
  ServiceCardProps,
} from "@/models/interfaces";
import { NavigationButton } from "@/components/shared";

// Memoized service card component
const ServiceCard = memo(({ item, index, currentIndex }: ServiceCardProps) => (
  <div
    key={item.id}
    className="flex-shrink-0 w-full max-w-5xl scroll-snap-start"
    role="listitem">
    <div className="px-8 lg:px-16">
      <div className="grid lg:grid-cols-2 gap-0 items-stretch min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]">
        {/* Image Background - Left Side */}
        <div className="order-1 lg:order-1">
          <div className="relative h-full min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] overflow-hidden rounded-l-3xl">
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

        {/* Content Card - Right Side */}
        <div className="order-2 lg:order-2">
          <Card
            className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white h-full min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]"
            style={{ borderRadius: "0 1.5rem 1.5rem 0" }}>
            <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center h-full">
              <div className="flex-1 flex flex-col justify-center">
                <CardHeader className="pb-6 px-0">
                  <CardTitle className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                    {item.title}.
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 px-0">
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
));

ServiceCard.displayName = "ServiceCard";

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Inline scroll functionality
  const scrollToItem = useCallback(
    (index: number) => {
      if (!scrollContainerRef.current || isScrolling) return;

      setIsScrolling(true);
      const container = scrollContainerRef.current;
      const scrollLeft = index * 800;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });

      setCurrentIndex(index);

      setTimeout(() => setIsScrolling(false), 500);
    },
    [isScrolling]
  );

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || isScrolling) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / 800);

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  }, [currentIndex, isScrolling]);

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
    <section
      id="services-section"
      className="flex items-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8"
      role="main"
      aria-label="Services section">
      <div className="w-full">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
            Our Services
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-4xl mx-auto">
            Empowering your digital journey with cutting-edge solutions
          </p>
        </div>

        <div>
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide scroll-smooth bg-gray-200 p-4 sm:p-6"
              style={{ scrollSnapType: "x mandatory" }}
              role="region"
              aria-label="Services gallery">
              <div
                className="flex gap-4 sm:gap-6 lg:gap-8 pb-4 sm:pb-6"
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
            <div className="absolute right-4 sm:right-6 lg:right-8 bottom-4 sm:bottom-6 lg:bottom-8 flex gap-4 sm:gap-6 z-10">
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
    </section>
  );
}
