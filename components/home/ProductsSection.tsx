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
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Plus, ExternalLink } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ProductItem as ProductItemType,
  ProductCardProps,
  ProductDetailsDialogProps,
  ButtonWithUrlHandler,
} from "@/models/interfaces";
import { NavigationButton } from "@/components/shared";

// Memoized product card component
const ProductCard = memo(
  ({ item, index, currentIndex, onCardClick }: ProductCardProps) => (
    <div
      key={item.id}
      className="flex-shrink-0 w-full max-w-5xl scroll-snap-start"
      role="listitem">
      <div className="px-8 lg:px-16">
        <Card
          className="h-full border-0 bg-white transition-all duration-500 hover:scale-105 rounded-3xl overflow-hidden cursor-pointer group"
          onClick={() => onCardClick(item)}>
          <div className="grid lg:grid-cols-2 gap-0 items-stretch min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]">
            {/* Content Section - Left Side */}
            <div className="order-2 lg:order-1 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                  {item.label}
                </div>
                <CardTitle className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  {item.headline}.
                </CardTitle>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Action Button */}
                <div className="flex justify-start items-center">
                  <Button
                    variant="black"
                    size="icon"
                    className="rounded-full  w-10 h-10 p-0 group-hover:scale-110 group-hover:rotate-90 transition-all duration-500 ease-out"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCardClick(item);
                    }}
                    aria-label={`Learn more about ${item.label}`}>
                    <Plus className="w-4 h-4 text-white transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Section - Right Side */}
            <div className="order-1 lg:order-2 relative h-full min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] flex items-center justify-center p-3 sm:p-4 lg:p-6">
              <div className="relative w-3/4 h-3/4 flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-contain"
                  priority={index === currentIndex}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/10 lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-white/20"></div>
            </div>
          </div>
        </Card>
      </div>
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
      <DialogContent className="max-w-2xl p-8 rounded-3xl">
        {selectedProduct && (
          <div className="space-y-8">
            {/* Product Label */}
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              {selectedProduct.label}
            </div>

            {/* Product Headline */}
            <h3 className="text-2xl font-bold text-gray-900 leading-tight">
              {selectedProduct.headline}
            </h3>

            {/* Product Description */}
            <p className="text-gray-700 leading-relaxed text-base">
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
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn More Link */}
            <div className="pt-4">
              <Button
                variant="black"
                onClick={() => onVisitWebsite(selectedProduct.website)}
                className="px-8 py-3 text-base font-medium inline-flex items-center gap-2"
                aria-label={`Visit ${selectedProduct.label} website`}>
                Learn more
                <ExternalLink className="w-4 h-4" />
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
  const [selectedProduct, setSelectedProduct] =
    useState<ProductItemType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  // Memoized product items data
  const productItems = useMemo(
    (): ProductItemType[] => [
      {
        id: "gobitoday",
        label: "GobiToday",
        headline: "Your digital marketplace platform.",
        description:
          "A comprehensive digital marketplace connecting buyers and sellers with seamless transactions and user-friendly interface.",
        image: "/images/gt_logo.png",
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

  const handleCardClick = useCallback((product: ProductItemType) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  }, []);

  const handleVisitWebsite: ButtonWithUrlHandler = useCallback(
    (url: string) => {
      window.open(url, "_blank", "noopener,noreferrer");
    },
    []
  );

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  }, []);

  const handlePrevClick = useCallback(() => {
    scrollToItem(Math.max(0, currentIndex - 1));
  }, [scrollToItem, currentIndex]);

  const handleNextClick = useCallback(() => {
    scrollToItem(Math.min(productItems.length - 1, currentIndex + 1));
  }, [scrollToItem, currentIndex, productItems.length]);

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
    <>
      <section
        id="products-section"
        className="flex items-center pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8"
        role="main"
        aria-label="Products section">
        <div className="w-full">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
              Our Products
            </h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-4xl mx-auto">
              Solutions that drive results and transform businesses
            </p>
          </div>

          <div>
            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide scroll-smooth bg-gray-200 p-4 sm:p-6"
                style={{ scrollSnapType: "x mandatory" }}
                role="region"
                aria-label="Products gallery">
                <div
                  className="flex gap-4 sm:gap-6 lg:gap-8 pb-4 sm:pb-6"
                  role="list"
                  aria-label="Products Gallery">
                  {productItems.map((item, index) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      index={index}
                      currentIndex={currentIndex}
                      onCardClick={handleCardClick}
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
                  ariaLabel="Previous products gallery"
                />
                <NavigationButton
                  direction="next"
                  onClick={handleNextClick}
                  disabled={currentIndex === productItems.length - 1}
                  ariaLabel="Next products gallery"
                />
              </div>
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
