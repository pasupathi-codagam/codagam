"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  memo,
  useEffect,
  useRef,
} from "react";
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
import { type CarouselApi } from "@/components/ui/carousel";
import {
  ProductItem as ProductItemType,
  ProductCardProps,
  ProductDetailsDialogProps,
  ButtonWithUrlHandler,
} from "@/models/interfaces";
import SectionReveal from "@/components/shared/animation";

// Memoized product card component
const ProductCard = memo(
  ({ item, onCardClick }: Omit<ProductCardProps, "index" | "currentIndex">) => (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-16">
      <Card
        className="h-full border-0 bg-card transition-all duration-500 hover:scale-105 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group"
        onClick={() => onCardClick(item)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
          {/* Content Section - Left Side */}
          <div className="order-2 lg:order-1 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
                {item.label}
              </div>
              <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-500 mb-2 sm:mb-3">
                {item.headline}.
              </CardTitle>
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base leading-relaxed mb-3 sm:mb-4">
                {item.description}
              </p>

              {/* Action Button */}
              <div className="flex justify-start items-center mt-4 sm:mt-6">
                <Button
                  variant="black"
                  size="icon"
                  className="rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 group-hover:scale-110 group-hover:rotate-90 transition-all duration-500 ease-out"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCardClick(item);
                  }}
                  aria-label={`Learn more about ${item.label}`}>
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white dark:text-black transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </div>

          {/* Image Section - Right Side */}
          <div className="order-1 lg:order-2 relative h-full min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] flex items-center justify-center p-3 sm:p-4 lg:p-6">
            <div className="relative w-3/4 h-3/4 flex items-center justify-center">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
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
      <DialogContent className="max-w-2xl p-8 rounded-3xl">
        {selectedProduct && (
          <div className="space-y-8">
            {/* Product Label */}
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {selectedProduct.label}
            </div>

            {/* Product Headline */}
            <h3 className="text-2xl font-bold text-foreground leading-tight">
              {selectedProduct.headline}
            </h3>

            {/* Product Description */}
            <p className="text-foreground leading-relaxed text-base">
              {selectedProduct.details}
            </p>

            {/* Features List */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">
                Key Features:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedProduct.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full mr-3 shrink-0"></div>
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
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>(
    undefined
  );
  const autoplayRef = useRef<number | null>(null);

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

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (!carouselApi || autoplayRef.current !== null) return;
    autoplayRef.current = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 3500);
  }, [carouselApi]);

  // Auto-advance using shadcn Carousel API (no external plugin)
  useEffect(() => {
    if (!carouselApi) return;
    startAutoplay();
    return () => stopAutoplay();
  }, [carouselApi, startAutoplay, stopAutoplay]);

  return (
    <>
      <section
        id="products-section"
        className="w-full flex items-center pt-4 sm:pt-6 lg:pt-8 pb-2 sm:pb-4 lg:pb-6"
        role="region"
        aria-label="Products section">
        <div className="w-full">
          <SectionReveal
            variant="slide-right"
            delayMs={80}
            durationMs={700}
            className="w-full">
            {/* Navigation Link */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-muted to-accent border border-border rounded-full">
                <span className="text-foreground text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  Products
                </span>
              </div>
            </div>

            <div className="text-center mb-6 sm:mb-8 lg:mb-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Solutions that drive results and transform businesses
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Discover our innovative products designed to accelerate your
                business growth and digital transformation.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal
            variant="zoom-in"
            delayMs={120}
            durationMs={700}
            className="w-full">
            <div
              className="relative w-full"
              onMouseEnter={stopAutoplay}
              onMouseLeave={startAutoplay}>
              <Carousel
                className="w-full bg-gray-200 dark:bg-muted p-3 sm:p-4 lg:p-6"
                aria-label="Products carousel"
                opts={{
                  align: "start",
                  loop: true,
                }}
                setApi={setCarouselApi}>
                <CarouselContent className="w-full gap-3 sm:gap-4 lg:gap-6 xl:gap-8 pb-3 sm:pb-4 lg:pb-6">
                  {productItems.map((item) => (
                    <CarouselItem
                      key={item.id}
                      className="shrink-0 w-full max-w-4xl lg:max-w-5xl">
                      <ProductCard item={item} onCardClick={handleCardClick} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="right-16 sm:right-20 lg:right-24 xl:right-28 bottom-3 sm:bottom-4 lg:bottom-6 xl:bottom-8 h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-full bg-card/95 backdrop-blur-sm border border-border/50 hover:bg-card hover:scale-110 transition-all duration-300" />
                <CarouselNext className="right-3 sm:right-4 lg:right-6 xl:right-8 bottom-3 sm:bottom-4 lg:bottom-6 xl:bottom-8 h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-full bg-card/95 backdrop-blur-sm border border-border/50 hover:bg-card hover:scale-110 transition-all duration-300" />
              </Carousel>
            </div>
          </SectionReveal>
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
