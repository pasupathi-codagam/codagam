"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ProductItem {
  id: string;
  label: string;
  headline: string;
  description: string;
  image: string;
  alt: string;
  website: string;
  details: string;
  features: string[];
}

const productItems: ProductItem[] = [
  {
    id: "gobitoday",
    label: "GobiToday",
    headline: "Your digital marketplace platform.",
    description:
      "A comprehensive digital marketplace connecting buyers and sellers with seamless transactions and user-friendly interface.",
    image: "/images/gt_logo_bg_trans.png",
    alt: "GobiToday marketplace platform",
    website: "https://gobitoday.com/",
    details:
      "GobiToday is a modern digital marketplace platform that facilitates seamless transactions between buyers and sellers. Built with cutting-edge technology, it provides a secure and user-friendly environment for online commerce.",
    features: [
      "Secure payment processing",
      "User-friendly interface",
      "Mobile responsive design",
      "Real-time notifications",
      "Multi-vendor support",
    ],
  },
  {
    id: "aava-foundation",
    label: "AAVA Foundation",
    headline: "Empowering communities for change.",
    description:
      "A non-profit organization dedicated to healthcare, education, and environmental sustainability initiatives for underprivileged communities.",
    image: "/images/AAVA_Foundation_Logo.png",
    alt: "AAVA Foundation community initiatives",
    website: "https://www.aavafoundation.com/",
    details:
      "AAVA Foundation is committed to making a positive impact through healthcare, education, and environmental sustainability. We work tirelessly to create a more equitable and sustainable world for all communities.",
    features: [
      "Preventive Healthcare programs",
      "Educational Support initiatives",
      "Environmental Sustainability projects",
      "Community collaboration",
      "Volunteer engagement",
    ],
  },
  {
    id: "custom-software",
    label: "Custom Software",
    headline: "Build your perfect solution.",
    description:
      "We craft bespoke software solutions that address your unique business challenges. From enterprise applications to mobile apps, our team delivers scalable, secure, and efficient software.",
    image: "/images/WhatsApp Image 2025-09-18 at 14.09.42_e8607c7e.jpg",
    alt: "Custom software development solutions",
    website: "/services/custom-software",
    details:
      "Our custom software development services are tailored to meet your specific business requirements. We create scalable, secure, and efficient solutions that drive growth and innovation.",
    features: [
      "Enterprise applications",
      "Mobile app development",
      "Web applications",
      "API development",
      "Database design",
    ],
  },
  {
    id: "digital-transformation",
    label: "Digital Transformation",
    headline: "Transform your business digitally.",
    description:
      "Empower your business with our comprehensive digital transformation services. We help you leverage emerging technologies to streamline operations and enhance customer experiences.",
    image: "/images/logo.png",
    alt: "Digital transformation services",
    website: "/services/digital-transformation",
    details:
      "Transform your business with our comprehensive digital transformation services. We help organizations leverage emerging technologies to streamline operations and enhance customer experiences.",
    features: [
      "Process automation",
      "Cloud migration",
      "Data analytics",
      "Customer experience optimization",
      "Technology integration",
    ],
  },
  {
    id: "ai-solutions",
    label: "AI Solutions",
    headline: "Harness the power of AI.",
    description:
      "Revolutionize your business with our AI-driven solutions. From predictive analytics to intelligent automation, we help you boost efficiency and customer engagement.",
    image: "/images/Codagam_Img (7).jpg",
    alt: "AI-powered business solutions",
    website: "/services/ai-solutions",
    details:
      "Leverage the power of artificial intelligence to transform your business operations. Our AI solutions help you make data-driven decisions and automate complex processes.",
    features: [
      "Predictive analytics",
      "Intelligent automation",
      "Machine learning models",
      "Natural language processing",
      "Computer vision",
    ],
  },
  {
    id: "cloud-services",
    label: "Cloud Services",
    headline: "Scale with cloud technology.",
    description:
      "Leverage our cloud infrastructure and migration services. We provide scalable solutions that grow with your business and ensure optimal performance.",
    image: "/images/Codagam_Img (8).jpg",
    alt: "Cloud computing and infrastructure",
    website: "/services/cloud-services",
    details:
      "Scale your business with our comprehensive cloud services. We provide secure, scalable, and cost-effective cloud solutions that grow with your business needs.",
    features: [
      "Cloud migration",
      "Infrastructure as a Service",
      "Platform as a Service",
      "Cloud security",
      "Performance optimization",
    ],
  },
];

export default function ProductsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const handleCardClick = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleVisitWebsite = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
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
            // Only remove animation for header/gallery elements, not individual product cards
            // This prevents cards from hiding during horizontal scrolling
            if (!elementId.includes("product-card-")) {
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
    const currentCardId = `product-card-${currentIndex}`;

    setAnimatedElements((prev) => {
      const newSet = new Set(prev);
      // Add current card animation
      newSet.add(currentCardId);

      // Keep all previous cards visible (don't remove them when scrolling horizontally)
      for (let i = 0; i <= currentIndex; i++) {
        newSet.add(`product-card-${i}`);
      }

      return newSet;
    });
  }, [currentIndex]);

  // Initial animation for the first card
  useEffect(() => {
    // Trigger initial animations for the first card
    setAnimatedElements((prev) => {
      const newSet = new Set(prev);
      newSet.add("products-header");
      newSet.add("products-gallery");
      newSet.add("products-navigation");
      newSet.add("product-card-0");
      return newSet;
    });
  }, []);

  // Helper function to get animation class based on scroll trigger
  const getAnimationClass = (baseClass: string, elementId: string) => {
    // For product cards, always show them (don't hide during horizontal scroll)
    if (elementId.includes("product-card-")) {
      return animatedElements.has(elementId) ? baseClass : "opacity-100";
    }

    // For other elements (header, gallery, navigation), use normal scroll animation
    return animatedElements.has(elementId)
      ? baseClass
      : "scroll-animate-hidden";
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="min-h-screen bg-white flex items-center py-20">
        <div className="w-full px-8 lg:px-16">
          <div
            data-animate-id="products-header"
            className={`${getAnimationClass(
              "animate-fade-in-up",
              "products-header"
            )} text-center mb-20 transition-all duration-800`}>
            <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
              Our Products
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto">
              Solutions that drive results and transform businesses
            </p>
          </div>

          <div
            data-animate-id="products-gallery"
            className={`${getAnimationClass(
              "animate-fade-in-up",
              "products-gallery"
            )} transition-all duration-800`}>
            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide scroll-smooth"
                style={{ scrollSnapType: "x mandatory" }}>
                <div
                  className="flex gap-8 pb-6"
                  role="list"
                  aria-label="Products Gallery">
                  {productItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex-shrink-0 w-80 lg:w-96 scroll-snap-start"
                      role="listitem">
                      <Card
                        data-animate-id={`product-card-${index}`}
                        className={`${getAnimationClass(
                          "animate-fade-in-up",
                          `product-card-${index}`
                        )} h-full border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-3xl transition-all duration-500 hover:scale-105 rounded-3xl overflow-hidden cursor-pointer`}
                        onClick={() => handleCardClick(item)}>
                        <CardContent className="p-8 h-full flex flex-col">
                          {/* Content Section */}
                          <div className="flex-1 mb-8">
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                              {item.label}
                            </div>
                            <CardTitle className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                              {item.headline}
                            </CardTitle>
                            <p className="text-gray-600 text-lg leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          {/* Image Section */}
                          <div className="relative h-48 rounded-2xl overflow-hidden mb-8 bg-gray-50">
                            <Image
                              src={item.image}
                              alt={item.alt}
                              fill
                              className="object-contain transition-transform duration-300 hover:scale-110"
                              priority={index === currentIndex}
                            />
                          </div>

                          {/* Action Button */}
                          <div className="flex justify-center items-center">
                            <Button
                              variant="black"
                              size="icon"
                              className="rounded-full w-12 h-12 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCardClick(item);
                              }}>
                              <Plus className="w-5 h-5 text-white" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div
                data-animate-id="products-navigation"
                className={`${getAnimationClass(
                  "animate-slide-in-up",
                  "products-navigation"
                )} flex justify-center gap-4 mt-12 transition-all duration-800`}>
                <Button
                  variant="black"
                  size="icon"
                  className="h-14 w-14 rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl disabled:opacity-30 hover:bg-white hover:scale-110 transition-all duration-300"
                  onClick={() => scrollToItem(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                  aria-label="Previous products gallery">
                  <ChevronLeft className="h-6 w-6 text-gray-900" />
                </Button>
                <Button
                  variant="black"
                  size="icon"
                  className="h-14 w-14 rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl disabled:opacity-30 hover:bg-white hover:scale-110 transition-all duration-300"
                  onClick={() =>
                    scrollToItem(
                      Math.min(productItems.length - 1, currentIndex + 1)
                    )
                  }
                  disabled={currentIndex === productItems.length - 1}
                  aria-label="Next products gallery">
                  <ChevronRight className="h-6 w-6 text-gray-900" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl p-8 rounded-3xl">
          {selectedProduct && (
            <div className="space-y-8">
              {/* Product Label */}
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                {selectedProduct.label}
              </div>

              {/* Product Headline */}
              <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                {selectedProduct.headline}
              </h3>

              {/* Product Description */}
              <p className="text-gray-700 leading-relaxed text-lg">
                {selectedProduct.details}
              </p>

              {/* Features List */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Key Features:
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learn More Link */}
              <div className="pt-4">
                <Button
                  variant="black"
                  onClick={() => handleVisitWebsite(selectedProduct.website)}
                  className="rounded-full px-8 py-3 text-base font-medium inline-flex items-center gap-2">
                  Learn more
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
