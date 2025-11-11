"use client";

import React, { memo } from "react";
import SectionReveal from "@/components/shared/animation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import {
  GalleryItem as GalleryItemType,
  ServiceCardProps,
} from "@/models/interfaces";
import { servicesGalleryItems } from "@/lib/content/services";

// Memoized service card component
const ServiceCard = memo(
  ({ item }: Omit<ServiceCardProps, "index" | "currentIndex">) => (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch lg:min-h-[500px] transition-all duration-500 ease-out group rounded-2xl overflow-hidden lg:rounded-none lg:overflow-visible">
        {/* Image Background - Left Side */}
        <div className="order-1 lg:order-1">
          <div className="relative h-full min-h-[220px] sm:min-h-[260px] md:min-h-[320px] lg:min-h-[400px] overflow-hidden rounded-t-2xl lg:rounded-l-3xl lg:rounded-t-none group-hover:shadow-xl transition-all duration-500">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-500"></div>
          </div>
        </div>

        {/* Content Card - Right Side */}
        <div className="order-2 lg:order-2">
          <Card className="relative overflow-hidden border-0 shadow-lg bg-card h-full min-h-0 lg:min-h-[500px] group-hover:shadow-xl transition-all duration-500 rounded-none rounded-bl-2xl rounded-br-2xl lg:rounded-bl-none lg:rounded-tr-3xl lg:rounded-br-3xl cursor-pointer">
            <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center h-full">
              <div className="flex-1 flex flex-col justify-center">
                <CardHeader className="pb-4 sm:pb-6 px-0">
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-500">
                    {item.title}.
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 px-0">
                  <p className="text-xs sm:text-sm lg:text-base text-foreground leading-relaxed transition-colors duration-500">
                    {item.description}
                  </p>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
);

ServiceCard.displayName = "ServiceCard";

export default function ServicesSection() {
  const galleryItems: GalleryItemType[] = servicesGalleryItems;

  // marquee provides continuous motion

  return (
    <section
      id="services-section"
      className="w-full flex items-center pt-0 pb-6 sm:pt-0 sm:pb-8 lg:pt-0 lg:pb-10"
      role="region"
      aria-label="Services section">
      <div className="w-full">
        <SectionReveal
          variant="slide-left"
          delayMs={80}
          durationMs={700}
          className="w-full">
          {/* Navigation Link */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-muted to-accent border border-border rounded-full">
              <span className="text-foreground text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Services
              </span>
            </div>
          </div>

          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 dark:text-blue-900 mb-4">
              Empowering your digital journey with cutting-edge solutions
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              Our comprehensive suite of services is designed to accelerate your
              digital transformation and drive sustainable growth.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal
          variant="slide-up"
          delayMs={120}
          durationMs={700}
          className="w-full">
          <div className="relative w-full overflow-x-hidden">
            <Marquee
              className="w-full bg-gray-200 dark:bg-muted p-3 sm:p-4 lg:p-6"
              pauseOnHover>
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0 w-[calc(100vw-2rem)] sm:w-full max-w-[420px] sm:max-w-2xl lg:max-w-5xl px-4 sm:px-6 lg:px-8 xl:px-10 mx-auto">
                  <ServiceCard item={item} />
                </div>
              ))}
            </Marquee>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
