"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GalleryItem as GalleryItemType,
  ServiceCardProps,
  AnimationClassFunction,
  ScrollToItemFunction,
  HandleScrollFunction,
} from "@/models/interfaces";

// Memoized service card component
const ServiceCard = memo(({ 
  item, 
  index, 
  currentIndex, 
  getAnimationClass 
}: ServiceCardProps) => (
  <div
    key={item.id}
    className="flex-shrink-0 w-full max-w-5xl scroll-snap-start"
    role="listitem">
    <div
      data-animate-id={`service-container-${index}`}
      className={`${getAnimationClass(
        "animate-fade-in-up",
        `service-container-${index}`
      )} grid lg:grid-cols-2 gap-8 items-stretch min-h-[600px] px-8 lg:px-16 transition-all duration-800`}>
      {/* Content Card - Left Side */}
      <div
        data-animate-id={`service-content-${index}`}
        className={`${getAnimationClass(
          "animate-slide-in-left",
          `service-content-${index}`
        )} order-2 lg:order-1 transition-all duration-800`}>
        <Card className="h-full border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-3xl transition-all duration-500 hover:scale-105 rounded-3xl">
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
      </div>

      {/* Image - Right Side */}
      <div
        data-animate-id={`service-image-${index}`}
        className={`${getAnimationClass(
          "animate-slide-in-right",
          `service-image-${index}`
        )} order-1 lg:order-2 transition-all duration-800`}>
        <div className="relative h-full min-h-[600px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
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

// Memoized navigation button component
const NavigationButton = memo(({ 
  direction, 
  onClick, 
  disabled, 
  ariaLabel 
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
  ariaLabel: string;
}) => (
  <button
    className="group h-16 w-16 rounded-full bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200/50 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:scale-110 hover:shadow-3xl transition-all duration-300 flex items-center justify-center"
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}>
    <svg
      className="h-6 w-6 text-gray-700 group-hover:text-gray-900 transition-colors duration-300"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      fill="currentColor">
      <path d={direction === "prev" 
        ? "m13.4403 16.9375 5.5076-5.5c.5854-.5854 1.5323-.5825 2.1157.0039.5835.5869.5815 1.5366-.0039 2.1211l-4.4438 4.4375 4.4438 4.4375c.5854.5845.5874 1.5342.0039 2.1211-.2922.2944-.676.4414-1.0598.4414-.3818 0-.7637-.1455-1.0559-.4375l-5.5076-5.5c-.2815-.2812-.4403-.6636-.4403-1.0625s.1588-.7812.4403-1.0625z"
        : "m22.5597 16.9375-5.5076-5.5c-.5854-.5854-1.5323-.5825-2.1157.0039-.5835.5869-.5815 1.5366.0039 2.1211l4.4438 4.4375-4.4438 4.4375c-.5854.5845-.5874 1.5342-.0039 2.1211.2922.2944.676.4414 1.0598.4414.3818 0 .7637-.1455 1.0559-.4375l5.5076-5.5c.2815-.2812.4403-.6636.4403-1.0625s-.1588-.7812-.4403-1.0625z"
      } />
    </svg>
  </button>
));

NavigationButton.displayName = "NavigationButton";

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  // Memoized gallery items data
  const galleryItems = useMemo((): GalleryItemType[] => [
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
  ], []);

  // Optimized scroll functions with useCallback
  const scrollToItem: ScrollToItemFunction = useCallback((index: number) => {
    if (!scrollContainerRef.current || isScrolling) return;

    setIsScrolling(true);
    const container = scrollContainerRef.current;
    const itemWidth = container.offsetWidth;
    const scrollLeft = index * itemWidth;

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });

    setCurrentIndex(index);

    setTimeout(() => setIsScrolling(false), 500);
  }, [isScrolling]);

  const handleScroll: HandleScrollFunction = useCallback(() => {
    if (!scrollContainerRef.current || isScrolling) return;

    const container = scrollContainerRef.current;
    const itemWidth = container.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / itemWidth);

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  }, [currentIndex, isScrolling]);

  const handlePrevClick = useCallback(() => {
    scrollToItem(Math.max(0, currentIndex - 1));
  }, [scrollToItem, currentIndex]);

  const handleNextClick = useCallback(() => {
    scrollToItem(Math.min(galleryItems.length - 1, currentIndex + 1));
  }, [scrollToItem, currentIndex, galleryItems.length]);

  // Helper function to get animation class based on scroll trigger
  const getAnimationClass: AnimationClassFunction = useCallback((baseClass: string, elementId: string) => {
    // For service cards, always show them (don't hide during horizontal scroll)
    if (
      elementId.includes("service-container-") ||
      elementId.includes("service-content-") ||
      elementId.includes("service-image-")
    ) {
      return animatedElements.has(elementId) ? baseClass : "opacity-100";
    }

    // For other elements (header, gallery, navigation), use normal scroll animation
    return animatedElements.has(elementId)
      ? baseClass
      : "scroll-animate-hidden";
  }, [animatedElements]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // Scroll-triggered animations setup
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const elementId = entry.target.getAttribute("data-animate-id");
        if (elementId) {
          if (entry.isIntersecting) {
            setAnimatedElements((prev) => new Set([...prev, elementId]));
          } else {
            // Only remove animation for header/gallery elements, not individual service cards
            if (
              !elementId.includes("service-container-") &&
              !elementId.includes("service-content-") &&
              !elementId.includes("service-image-")
            ) {
              setTimeout(() => {
                setAnimatedElements((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(elementId);
                  return newSet;
                });
              }, 100);
            }
          }
        }
      });
    }, observerOptions);

    const section = sectionRef.current;
    if (section) {
      const animatedElements = section.querySelectorAll("[data-animate-id]");
      animatedElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }
  }, []);

  // Additional effect to trigger animations when currentIndex changes (for horizontal scroll)
  useEffect(() => {
    const currentContainerId = `service-container-${currentIndex}`;
    const currentContentId = `service-content-${currentIndex}`;
    const currentImageId = `service-image-${currentIndex}`;

    setAnimatedElements((prev) => {
      const newSet = new Set(prev);
      // Add current card animations
      newSet.add(currentContainerId);
      newSet.add(currentContentId);
      newSet.add(currentImageId);

      // Keep all previous cards visible (don't remove them when scrolling horizontally)
      for (let i = 0; i <= currentIndex; i++) {
        newSet.add(`service-container-${i}`);
        newSet.add(`service-content-${i}`);
        newSet.add(`service-image-${i}`);
      }

      return newSet;
    });
  }, [currentIndex]);

  // Initial animation for the first card
  useEffect(() => {
    setAnimatedElements((prev) => {
      const newSet = new Set(prev);
      newSet.add("services-header");
      newSet.add("services-gallery");
      newSet.add("services-navigation");
      newSet.add("service-container-0");
      newSet.add("service-content-0");
      newSet.add("service-image-0");
      return newSet;
    });
  }, []);

  return (
    <section
      id="services-section"
      ref={sectionRef}
      className="min-h-screen bg-white flex items-center py-20"
      role="main"
      aria-label="Services section">
      <div className="w-full">
        <div
          data-animate-id="services-header"
          className={`${getAnimationClass(
            "animate-fade-in-up",
            "services-header"
          )} text-center mb-20 px-8 lg:px-16 transition-all duration-800`}>
          <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
            Our Services
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto">
            Empowering your digital journey with cutting-edge solutions
          </p>
        </div>

        <div
          data-animate-id="services-gallery"
          className={`${getAnimationClass(
            "animate-fade-in-up",
            "services-gallery"
          )} transition-all duration-800`}>
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide scroll-smooth"
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
                    getAnimationClass={getAnimationClass}
                  />
                ))}
              </div>
            </div>

            {/* Navigation Buttons - Bottom Right */}
            <div
              data-animate-id="services-navigation"
              className={`${getAnimationClass(
                "animate-slide-in-right",
                "services-navigation"
              )} absolute right-8 flex gap-6 z-10 transition-all duration-800`}>
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