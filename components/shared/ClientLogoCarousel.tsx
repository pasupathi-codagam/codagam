"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";

interface ClientLogo {
  name: string;
  logo: string;
  alt: string;
  width?: number;
  height?: number;
}

interface ClientLogoCarouselProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ClientLogoCarousel: React.FC<ClientLogoCarouselProps> = ({
  title = "Our Partners",
  subtitle = "We're proud to work with these industry-leading companies that trust us to deliver exceptional results",
  className = "",
}) => {
  // Client logos data extracted from your HTML example
  const clientLogos = useMemo(
    (): ClientLogo[] => [
      // Partners section logos
      {
        name: "Facebook",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/facebook.png",
        alt: "logo of facebook",
        width: 183,
        height: 145,
      },
      {
        name: "Google",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/google.png",
        alt: "logo of google",
        width: 183,
        height: 145,
      },
      {
        name: "GoodFirms",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/goodfirms.png",
        alt: "logo of goodfirms",
        width: 183,
        height: 145,
      },
      {
        name: "Clutch",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/clutch.png",
        alt: "logo of clutch",
        width: 183,
        height: 145,
      },
      {
        name: "Upwork",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/upwork.png",
        alt: "logo of upwork",
        width: 183,
        height: 145,
      },
      {
        name: "Codeable",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/codeable.png",
        alt: "logo of codeable",
        width: 183,
        height: 145,
      },
      // Additional client logos from the carousel
      {
        name: "Uni Wines",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/uni-wines.svg",
        alt: "Uni Wines logo",
        width: 182,
        height: 145,
      },
      {
        name: "Vital Healthcare",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/vital-healthcare.svg",
        alt: "Vital Healthcare logo",
        width: 182,
        height: 145,
      },
      {
        name: "Svanz",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/Svanz.svg",
        alt: "Svanz logo",
        width: 182,
        height: 145,
      },
      {
        name: "Rasta",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/Rasta.svg",
        alt: "Rasta logo",
        width: 182,
        height: 145,
      },
      {
        name: "NRI Legal Services",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/NRI-Legal-Services.svg",
        alt: "NRI Legal Services logo",
        width: 182,
        height: 145,
      },
      {
        name: "NavTech Industries",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/NavTech-Industries.svg",
        alt: "NavTech Industries logo",
        width: 182,
        height: 145,
      },
      {
        name: "Nautica",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/Nautica.svg",
        alt: "Nautica logo",
        width: 182,
        height: 145,
      },
      {
        name: "Mekosha",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/Mekosha.svg",
        alt: "Mekosha logo",
        width: 182,
        height: 145,
      },
      {
        name: "Dr. Nanadas Homeclinic",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/Dr.-Nanadas-Homeclinic.svg",
        alt: "Dr. Nanadas Homeclinic logo",
        width: 182,
        height: 145,
      },
      {
        name: "Chukde",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/Chukde.svg",
        alt: "Chukde logo",
        width: 182,
        height: 145,
      },
      {
        name: "Body Mind Alliance",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/Body-Mind-Alliance.svg",
        alt: "Body Mind Alliance logo",
        width: 182,
        height: 145,
      },
      {
        name: "Asian Paints",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/Asian-paints-logo.jpg",
        alt: "Asian Paints logo",
        width: 182,
        height: 145,
      },
      {
        name: "Honeywell Connection",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/honeywell-connection-logo.jpg",
        alt: "Honeywell Connection logo",
        width: 182,
        height: 145,
      },
      {
        name: "Albaik",
        logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/Albaik-logo.jpg",
        alt: "Albaik logo",
        width: 182,
        height: 145,
      },
    ],
    []
  );

  // No need to duplicate logos - Marquee handles this automatically

  return (
    <section className={`w-full py-4 sm:py-6 md:py-8 lg:py-10 ${className}`}>
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6 md:mb-8 w-full px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6">
          {title}
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full">
        {/* Marquee with logos */}
        <Marquee
          pauseOnHover
          className="[--duration:60s] smooth-marquee w-full">
          {clientLogos.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
              <div className="relative w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 flex items-center justify-center group transition-all duration-300">
                <Image
                  src={client.logo}
                  alt={client.alt}
                  width={client.width || 200}
                  height={client.height || 120}
                  className="max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[200px] xl:max-w-[220px] max-h-[60px] sm:max-h-[80px] md:max-h-[100px] lg:max-h-[120px] xl:max-h-[140px] object-contain"
                  sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, (max-width: 1024px) 180px, (max-width: 1280px) 200px, 220px"
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
