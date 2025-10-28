"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Plus, ExternalLink } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ProductItem as ProductItemType,
  ProductDetailsDialogProps,
  ButtonWithUrlHandler,
} from "@/models/interfaces";
import { useScrollAnimation } from "@/components/shared";

// Constants for better maintainability
const PRODUCTS_CONFIG = {
  title: "Products",
  scrollMargin: "scroll-mt-32 sm:scroll-mt-32 md:scroll-mt-32 lg:scroll-mt-28",
} as const;

// Custom hook for dialog management
const useDialogManagement = () => {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductItemType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = useCallback((product: ProductItemType) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  }, []);

  const handleVisitWebsite: ButtonWithUrlHandler = useCallback(
    (url: string) => {
      window.open(url, "_blank", "noopener,noreferrer");
    },
    []
  );

  return {
    selectedProduct,
    isDialogOpen,
    handleCardClick,
    handleDialogClose,
    handleVisitWebsite,
  };
};

// Memoized product card component
const ProductCard = memo(
  ({
    item,
    onCardClick,
  }: {
    item: ProductItemType;
    onCardClick: (item: ProductItemType) => void;
  }) => (
    <div className="w-full">
      <Card
        className="h-full w-full border-0 bg-white transition-all duration-500 hover:scale-[1.02] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group"
        onClick={() => onCardClick(item)}>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-0 items-stretch h-[500px] sm:h-[500px] md:h-[500px] lg:h-[420px]">
          {/* Content Section - Left Side */}
          <div className="order-2 lg:order-1 p-3 sm:p-4 md:p-5 lg:p-7 flex flex-col justify-center h-[250px] sm:h-[250px] md:h-[250px] lg:h-full">
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                {item.label}
              </div>
              <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-black mb-2 sm:mb-3 leading-tight">
                {item.headline}.
              </CardTitle>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4">
                {item.description}
              </p>

              {/* Action Button */}
              <div className="flex justify-start items-center">
                <Button
                  variant="black"
                  size="icon"
                  className="rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 p-0 group-hover:scale-110 group-hover:rotate-90 transition-all duration-500 ease-out"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCardClick(item);
                  }}
                  aria-label={`Learn more about ${item.label}`}>
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </div>

          {/* Image Section - Right Side */}
          <div className="order-1 lg:order-2 relative h-[250px] sm:h-[250px] md:h-[250px] lg:h-full flex items-center justify-center p-3 sm:p-4 md:p-5 lg:p-7">
            <div className="relative w-3/4 h-3/4 rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/10 lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-white/20" />
          </div>
        </div>
      </Card>
    </div>
  )
);

ProductCard.displayName = "ProductCard";

// Memoized product details dialog
const ProductDetailsDialog = memo(
  ({
    selectedProduct,
    isOpen,
    onClose,
    onVisitWebsite,
  }: ProductDetailsDialogProps) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl">
        {selectedProduct && (
          <div className="space-y-6 sm:space-y-8">
            {/* Product Label */}
            <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
              {selectedProduct.label}
            </div>

            {/* Product Headline */}
            <h3 className="text-2xl sm:text-3xl font-bold text-black leading-tight">
              {selectedProduct.headline}
            </h3>

            {/* Product Description */}
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              {selectedProduct.details}
            </p>

            {/* Features List */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-base sm:text-lg font-semibold text-blue-900">
                Key Features:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedProduct.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm sm:text-base text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 sm:mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn More Link */}
            <div className="pt-3 sm:pt-4">
              <Button
                variant="black"
                onClick={() => onVisitWebsite(selectedProduct.website)}
                className="rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-medium inline-flex items-center gap-2"
                aria-label={`Visit ${selectedProduct.label} website`}>
                Learn more
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
);

ProductDetailsDialog.displayName = "ProductDetailsDialog";

export default function ProductsSection() {
  // Apple-like scroll animations
  const headerAnimation = useScrollAnimation<HTMLDivElement>({ delay: 100 });
  const galleryAnimation = useScrollAnimation<HTMLDivElement>({ delay: 300 });

  // Dialog management
  const {
    selectedProduct,
    isDialogOpen,
    handleCardClick,
    handleDialogClose,
    handleVisitWebsite,
  } = useDialogManagement();

  // Memoized product items data
  const productItems = useMemo(
    (): ProductItemType[] => [
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
    ],
    []
  );

  return (
    <>
      <section
        id="products-section"
        className="homepage-section standalone-module w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen pt-0 pb-8 sm:pt-0 sm:pb-12 md:pt-0 md:pb-16 lg:pt-0 lg:pb-24"
        data-module-template="products-section"
        data-analytics-region="products-section"
        role="main"
        aria-label="Products section">
        <div className="module-content">
          {/* Header Section */}
          <div
            ref={headerAnimation.ref}
            className={`text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-4 sm:px-6 md:px-8 scroll-animate-scale ${
              headerAnimation.isVisible ? "animate-in" : ""
            }`}>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight ${PRODUCTS_CONFIG.scrollMargin}`}>
              {PRODUCTS_CONFIG.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-3 sm:mt-4">
              Innovative platforms and solutions for modern businesses
            </p>
          </div>

          {/* Products Gallery */}
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
                  {productItems.map((item) => (
                    <CarouselItem
                      key={item.id}
                      className="basis-full sm:basis-full md:basis-full lg:basis-1/2 w-full px-2">
                      <ProductCard item={item} onCardClick={handleCardClick} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        selectedProduct={selectedProduct}
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onVisitWebsite={handleVisitWebsite}
      />
    </>
  );
}
