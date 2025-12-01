"use client";

import React, { useState, useCallback, memo, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Plus, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { productItemsContent } from "@/lib/content/products";

// Memoized product card component
const ProductCard = memo(
  ({ item, onCardClick }: Omit<ProductCardProps, "index" | "currentIndex">) => (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16">
      <Card
        className="relative overflow-hidden border-0 bg-[#F6F6F6] dark:bg-black transition-all duration-500 rounded-2xl sm:rounded-3xl cursor-pointer group h-[460px] sm:h-[480px] md:h-[500px] lg:h-[520px] w-full"
        onClick={() => onCardClick(item)}>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch h-full">
          {/* Content Section - Left Side */}
          <div className="order-2 lg:order-1 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-[10px] sm:text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3 md:mb-4">
                {item.label}
              </div>
              <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground leading-tight mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3">
                {item.headline}.
              </CardTitle>
              <p className="text-muted-foreground text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed mb-3 sm:mb-4 line-clamp-4 overflow-hidden text-ellipsis">
                {item.description}
              </p>

              {/* Action Button */}
              <div className="flex justify-start items-center mt-4 sm:mt-6">
                <Button
                  variant="black"
                  size="icon"
                  className="rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 transition-all duration-500 ease-out"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCardClick(item);
                  }}
                  aria-label={`Learn more about ${item.label}`}>
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white dark:text-black transition-colors duration-300" />
                </Button>
              </div>
            </div>
          </div>

          {/* Image Section - Right Side */}
          <div className="order-1 lg:order-2 relative h-full flex items-center justify-center p-3 sm:p-4 lg:p-6">
            <div className="relative w-4/5 h-4/5 flex items-center justify-center">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={item.image === "/images/gt_logo.png"}
                loading={
                  item.image === "/images/gt_logo.png" ? "eager" : "lazy"
                }
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
      <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
            {selectedProduct ? selectedProduct.headline : "Product overview"}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm md:text-base">
            {selectedProduct
              ? `Key information about ${selectedProduct.label}.`
              : "Review the product details."}
          </DialogDescription>
        </DialogHeader>
        {selectedProduct && (
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Product Label */}
            <div className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">
              {selectedProduct.label}
            </div>

            {/* Product Headline */}
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              {selectedProduct.headline}
            </h3>

            {/* Product Description */}
            <p className="text-foreground leading-relaxed text-sm sm:text-base md:text-lg">
              {selectedProduct.details}
            </p>

            {/* Features List */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-base sm:text-lg md:text-xl font-semibold text-foreground">
                Key Features:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {selectedProduct.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start text-xs sm:text-sm md:text-base text-muted-foreground">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full mr-2 sm:mr-3 shrink-0 mt-1.5 sm:mt-2"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn More Link */}
            <div className="pt-2 sm:pt-4">
              <Button
                variant="black"
                onClick={() => onVisitWebsite(selectedProduct.website)}
                className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-medium inline-flex items-center justify-center gap-2"
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
  const [selectedProduct, setSelectedProduct] =
    useState<ProductItemType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>(
    undefined
  );
  const autoplayRef = useRef<number | null>(null);

  const productItems: ProductItemType[] = productItemsContent;

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
        className="w-full flex items-center pt-0 pb-2 sm:pt-0 sm:pb-3 lg:pt-0 lg:pb-4"
        role="region"
        aria-label="Products section">
        <div className="w-full">
          <SectionReveal
            variant="slide-right"
            delayMs={80}
            durationMs={700}
            className="w-full">
            {/* Navigation Link */}
            <div className="text-center mb-3 sm:mb-4">
              <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-muted to-accent border border-border rounded-full">
                <span className="text-foreground text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  Products
                </span>
              </div>
            </div>

            <div className="text-center mb-3 sm:mb-4 lg:mb-5">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 dark:text-blue-900 mb-3 sm:mb-4">
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
              className="relative w-full cursor-pointer overflow-x-hidden"
              onMouseEnter={stopAutoplay}
              onMouseLeave={startAutoplay}>
              <Carousel
                className="w-full overflow-hidden max-w-full relative"
                aria-label="Products carousel"
                opts={{
                  align: "start",
                  loop: true,
                }}
                setApi={setCarouselApi}>
                {/* Gray background area with matching top and bottom padding */}
                <div className="bg-blue-950 dark:bg-muted pt-3 sm:pt-4 lg:pt-6 px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6">
                  <div className="max-w-[1920px] mx-auto relative">
                    <CarouselContent className="ml-0 flex! flex-nowrap! items-start gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
                      {productItems.map((item) => (
                        <CarouselItem
                          key={item.id}
                          className="shrink-0 basis-full sm:basis-3/4 lg:basis-1/2 xl:basis-[45%] m-0">
                          <ProductCard
                            item={item}
                            onCardClick={handleCardClick}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </div>
                </div>
                {/* Navigation buttons outside gray area */}
                <div className="max-w-[1920px] mx-auto px-3 sm:px-4 lg:px-6">
                  <div className="flex justify-end items-center gap-2 mt-2 sm:mt-3 lg:mt-4 w-full mr-4 sm:mr-6 lg:mr-8">
                    <CarouselPrevious className="relative! left-0! right-0! top-0! translate-y-0! translate-x-0! h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 border-0 shadow-sm p-1.5 sm:p-2 text-gray-900 dark:text-gray-100" />
                    <CarouselNext className="relative! left-0! right-0! top-0! translate-y-0! translate-x-0! h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 border-0 shadow-sm p-1.5 sm:p-2 text-gray-900 dark:text-gray-100" />
                  </div>
                </div>
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
