"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, ExternalLink } from "lucide-react";
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
    image: "/images/Codagam_Img (5).jpg",
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
    image: "/images/Codagam_Img (1).jpg",
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

  return (
    <>
      <section className="min-h-screen bg-white flex items-center py-20">
        <div className="w-full px-8 lg:px-16">
          <div className="animate-slide-up text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
              Our Products
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto">
              Solutions that drive results and transform businesses
            </p>
          </div>

          <div className="animate-fade-in">
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
                      <div
                        className="h-full bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                        onClick={() => handleCardClick(item)}>
                        <div className="p-8 h-full flex flex-col">
                          {/* Content Section */}
                          <div className="flex-1 mb-8">
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                              {item.label}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                              {item.headline}
                            </h3>
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
                              className="object-contain transition-transform duration-300 hover:scale-105"
                              priority={index === currentIndex}
                            />
                          </div>

                          {/* Action Button */}
                          <div className="flex justify-end">
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 mt-12">
                <Button
                  variant="black"
                  size="icon"
                  className="h-14 w-14 rounded-full bg-white border-gray-300 shadow-lg disabled:opacity-50"
                  onClick={() => scrollToItem(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                  aria-label="Previous products gallery">
                  <ChevronLeft className="h-6 w-6 text-gray-900" />
                </Button>
                <Button
                  variant="black"
                  size="icon"
                  className="h-14 w-14 rounded-full bg-white border-gray-300 shadow-lg disabled:opacity-50"
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
        <DialogContent className="max-w-lg p-8">
          {selectedProduct && (
            <div className="space-y-6">
              {/* Product Label */}
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                {selectedProduct.label}
              </div>

              {/* Product Headline */}
              <h3 className="text-2xl font-semibold text-gray-900 leading-tight">
                {selectedProduct.headline}
              </h3>

              {/* Product Description */}
              <p className="text-gray-700 leading-relaxed">
                {selectedProduct.details}
              </p>

              {/* Learn More Link */}
              <div className="pt-2">
                <Button
                  variant="black"
                  onClick={() => handleVisitWebsite(selectedProduct.website)}
                  className=" p-0 h-auto font-normal text-base inline-flex items-center gap-2">
                  Learn more
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm text-white ml-2">
                    ({selectedProduct.website})
                  </span>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
