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

  // Enhanced horizontal scroll animations
  useEffect(() => {
    const currentCardId = `product-card-${currentIndex}`;

    // Add current card with smooth transition
    setAnimatedElements((prev) => {
      const newSet = new Set(prev);
      newSet.add(currentCardId);
      return newSet;
    });

    // Add a subtle bounce effect for the current card
    const currentCard = document.querySelector(
      `[data-animate-id="${currentCardId}"]`
    );
    if (currentCard) {
      currentCard.classList.add("animate-bounce-slow");
      setTimeout(() => {
        currentCard.classList.remove("animate-bounce-slow");
      }, 1000);
    }
  }, [currentIndex]);

  // Enhanced initial animations with staggered entrance
  useEffect(() => {
    const initialElements = [
      "products-header",
      "products-gallery",
      "products-navigation",
      "product-card-0",
    ];

    // Staggered entrance for smooth visual flow
    initialElements.forEach((elementId, index) => {
      setTimeout(() => {
        setAnimatedElements((prev) => new Set([...prev, elementId]));
      }, index * 150);
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
      <section
        id="products-section"
        ref={sectionRef}
        className="min-h-screen bg-white flex items-center py-20">
        <div className="w-full">
          <div
            data-animate-id="products-header"
            className={`${getAnimationClass(
              "animate-fade-in-up",
              "products-header"
            )} text-center mb-20 px-8 lg:px-16 transition-all duration-800`}>
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
                  className="flex gap-8 pb-6 px-8 lg:px-16"
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
                        )} h-full border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-3xl transition-all duration-700 ease-out hover:scale-105 hover:-translate-y-2 rounded-3xl overflow-hidden cursor-pointer group`}
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
                          <div className="relative h-48 rounded-2xl overflow-hidden mb-8 bg-gray-50 group-hover:bg-gray-100 transition-colors duration-500">
                            <Image
                              src={item.image}
                              alt={item.alt}
                              fill
                              className="object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                              priority={index === currentIndex}
                            />
                          </div>

                          {/* Action Button */}
                          <div className="flex justify-center items-center">
                            <Button
                              variant="black"
                              size="icon"
                              className="rounded-full w-12 h-12 p-0 group-hover:scale-110 group-hover:rotate-90 transition-all duration-500 ease-out"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCardClick(item);
                              }}>
                              <Plus className="w-5 h-5 text-white transition-transform duration-300" />
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
                )} flex justify-center gap-6 mt-12 transition-all duration-800`}>
                <button
                  className="group h-16 w-16 rounded-full bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200/50 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:scale-110 hover:shadow-3xl transition-all duration-300 flex items-center justify-center"
                  onClick={() => scrollToItem(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                  aria-label="Previous products gallery">
                  <svg
                    className="h-6 w-6 text-gray-700 group-hover:text-gray-900 transition-colors duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 36 36"
                    fill="currentColor">
                    <path d="m13.4403 16.9375 5.5076-5.5c.5854-.5854 1.5323-.5825 2.1157.0039.5835.5869.5815 1.5366-.0039 2.1211l-4.4438 4.4375 4.4438 4.4375c.5854.5845.5874 1.5342.0039 2.1211-.2922.2944-.676.4414-1.0598.4414-.3818 0-.7637-.1455-1.0559-.4375l-5.5076-5.5c-.2815-.2812-.4403-.6636-.4403-1.0625s.1588-.7812.4403-1.0625z" />
                  </svg>
                </button>
                <button
                  className="group h-16 w-16 rounded-full bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200/50 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:scale-110 hover:shadow-3xl transition-all duration-300 flex items-center justify-center"
                  onClick={() =>
                    scrollToItem(
                      Math.min(productItems.length - 1, currentIndex + 1)
                    )
                  }
                  disabled={currentIndex === productItems.length - 1}
                  aria-label="Next products gallery">
                  <svg
                    className="h-6 w-6 text-gray-700 group-hover:text-gray-900 transition-colors duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 36 36"
                    fill="currentColor">
                    <path d="m22.5597 16.9375-5.5076-5.5c-.5854-.5854-1.5323-.5825-2.1157.0039-.5835.5869-.5815 1.5366.0039 2.1211l4.4438 4.4375-4.4438 4.4375c-.5854.5845-.5874 1.5342-.0039 2.1211.2922.2944.676.4414 1.0598.4414.3818 0 .7637-.1455 1.0559-.4375l5.5076-5.5c.2815-.2812.4403-.6636.4403-1.0625s-.1588-.7812-.4403-1.0625z" />
                  </svg>
                </button>
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
