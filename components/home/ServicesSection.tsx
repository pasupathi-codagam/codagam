"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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

  return (
    <section className="min-h-screen bg-white flex items-center py-20">
      <div className="w-full">
        <div className="animate-slide-up text-center mb-20 px-8 lg:px-16">
          <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
            Our Services
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto">
            Empowering your digital journey with cutting-edge solutions
          </p>
        </div>

        <div className="animate-fade-in">
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollSnapType: "x mandatory" }}>
              <div
                className="flex gap-12 pb-6"
                role="list"
                aria-label="Services Gallery">
                {galleryItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 w-full max-w-6xl scroll-snap-start"
                    role="listitem">
                    <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[700px] px-8 lg:px-16">
                      {/* Content Section - Left Side */}
                      <div className="space-y-8 order-2 lg:order-1">
                        <div className="space-y-6">
                          <h3 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            {item.title}.
                          </h3>
                          <p className="text-xl text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Image Section - Right Side */}
                      <div className="relative order-1 lg:order-2">
                        <div className="relative h-96 lg:h-[600px] rounded-3xl overflow-hidden bg-gray-50">
                          <Image
                            src={item.image}
                            alt={item.alt}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                            priority={index === currentIndex}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons - Bottom Right */}
            <div className="absolute  right-8 flex gap-4 z-10">
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full bg-white/90 backdrop-blur-sm border-gray-200 shadow-xl disabled:opacity-30 hover:bg-white transition-all duration-300"
                onClick={() => scrollToItem(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                aria-label="Previous services gallery">
                <ChevronLeft className="h-6 w-6 text-gray-900" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full bg-white/90 backdrop-blur-sm border-gray-200 shadow-xl disabled:opacity-30 hover:bg-white transition-all duration-300"
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
