"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const galleryItems: GalleryItem[] = [
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
];

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(
    new Set()
  );
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToItem = (index: number) => {
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
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current || isScrolling) return;

    const container = scrollContainerRef.current;
    const itemWidth = container.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / itemWidth);

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [currentIndex, isScrolling]);

  // Scroll-triggered animations setup
  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const elementId = entry.target.getAttribute("data-animate-id");
        if (elementId) {
          if (entry.isIntersecting) {
            // Element is in view - add animation
            setAnimatedElements((prev) => new Set([...prev, elementId]));
          } else {
            // Only remove animation for header/gallery elements, not individual service cards
            // This prevents cards from hiding during horizontal scrolling
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
      // Observe all elements with data-animate-id
      const animatedElements = section.querySelectorAll("[data-animate-id]");
      animatedElements.forEach((el) => observer.observe(el));

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  // Additional effect to trigger animations when currentIndex changes (for horizontal scroll)
  useEffect(() => {
    // Trigger animations for the current visible card and keep all previous cards visible
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
    // Trigger initial animations for the first card
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

  // Helper function to get animation class based on scroll trigger
  const getAnimationClass = (baseClass: string, elementId: string) => {
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
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-white flex items-center py-20">
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
              style={{ scrollSnapType: "x mandatory" }}>
              <div
                className="flex gap-8 pb-6"
                role="list"
                aria-label="Services Gallery">
                {galleryItems.map((item, index) => (
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
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons - Bottom Right */}
            <div
              data-animate-id="services-navigation"
              className={`${getAnimationClass(
                "animate-slide-in-right",
                "services-navigation"
              )} absolute right-8 flex gap-4 z-10 transition-all duration-800`}>
              <Button
                variant="black"
                size="icon"
                className="h-14 w-14 rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl disabled:opacity-30 hover:bg-white hover:scale-110 transition-all duration-300"
                onClick={() => scrollToItem(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                aria-label="Previous services gallery">
                <ChevronLeft className="h-6 w-6 text-gray-900" />
              </Button>

              <Button
                variant="black"
                size="icon"
                className="h-14 w-14 rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl disabled:opacity-30 hover:bg-white hover:scale-110 transition-all duration-300"
                onClick={() =>
                  scrollToItem(
                    Math.min(galleryItems.length - 1, currentIndex + 1)
                  )
                }
                disabled={currentIndex === galleryItems.length - 1}
                aria-label="Next services gallery">
                <ChevronRight className="h-6 w-6 text-gray-900" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
