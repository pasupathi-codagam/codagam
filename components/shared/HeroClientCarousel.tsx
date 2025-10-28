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

interface HeroClientCarouselProps {
  className?: string;
}

export const HeroClientCarousel: React.FC<HeroClientCarouselProps> = ({
  className = "",
}) => {
  // Client logos data using local images
  const clientLogos = useMemo(
    (): ClientLogo[] => [
      {
        name: "AAVA Foundation",
        logo: "/images/AAVA_Foundation_Logo.png",
        alt: "AAVA Foundation logo",
        width: 150,
        height: 80,
      },
      {
        name: "GT Logo",
        logo: "/images/gt_logo_bg_trans.png",
        alt: "GT logo",
        width: 150,
        height: 80,
      },
      {
        name: "Survey Machi",
        logo: "/images/WhatsApp Image 2025-09-18 at 14.09.42_e8607c7e.jpg",
        alt: "Survey Machi logo",
        width: 150,
        height: 80,
      },
      {
        name: "Codagam",
        logo: "/images/logo.png",
        alt: "Codagam logo",
        width: 150,
        height: 80,
      },

      {
        name: "Handil",
        logo: "/images/handle-logo.jpg",
        alt: "Handil logo",
        width: 150,
        height: 80,
      },

      {
        name: "Untitled Design",
        logo: "/images/Untitled design.png",
        alt: "Untitled Design logo",
        width: 150,
        height: 80,
      },
      {
        name: "AAVA Foundation",
        logo: "/images/AAVA_Foundation_Logo.png",
        alt: "AAVA Foundation logo",
        width: 150,
        height: 80,
      },
      {
        name: "GT Logo",
        logo: "/images/gt_logo_bg_trans.png",
        alt: "GT logo",
        width: 150,
        height: 80,
      },
      {
        name: "Survey Machi",
        logo: "/images/WhatsApp Image 2025-09-18 at 14.09.42_e8607c7e.jpg",
        alt: "Survey Machi logo",
        width: 150,
        height: 80,
      },
      {
        name: "Codagam",
        logo: "/images/logo.png",
        alt: "Codagam logo",
        width: 150,
        height: 80,
      },

      {
        name: "Handil",
        logo: "/images/handle-logo.jpg",
        alt: "Handil logo",
        width: 150,
        height: 80,
      },

      {
        name: "Untitled Design",
        logo: "/images/Untitled design.png",
        alt: "Untitled Design logo",
        width: 150,
        height: 80,
      },
    ],
    []
  );

  return (
    <div className={`w-full ${className}`}>
      {/* Marquee Container */}
      <div className="relative">
        {/* Marquee with logos */}
        <Marquee pauseOnHover className="[--duration:60s] smooth-marquee">
          {clientLogos.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 mx-3 md:mx-4 lg:mx-6">
              <div className="relative w-32 md:w-36 lg:w-40 h-20 md:h-24 lg:h-28 flex items-center justify-center group transition-all duration-300">
                <Image
                  src={client.logo}
                  alt={client.alt}
                  width={client.width || 150}
                  height={client.height || 80}
                  className="max-w-[120px] md:max-w-[140px] lg:max-w-[160px] max-h-[60px] md:max-h-[70px] lg:max-h-[80px] object-contain"
                  sizes="(max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};
