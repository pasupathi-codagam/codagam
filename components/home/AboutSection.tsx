"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Brain, Monitor, Smartphone } from "lucide-react";
import {
  Feature,
  ContactFormDialogProps,
  ButtonClickHandler,
} from "@/models/interfaces";
import {
  useScrollAnimation,
  // useStaggeredScrollAnimation,
  ContactForm,
} from "@/components/shared";

// Memoized gallery item component
const GalleryItem = memo(
  ({
    feature,
    index,
    isActive,
    isVisible,
  }: {
    feature: Feature;
    index: number;
    isActive: boolean;
    isVisible: boolean;
  }) => (
    <div
      id={`codagam-gallery-item-${index + 1}`}
      className={`gallery-item theme-dark ${
        isActive ? "current" : ""
      } flex-shrink-0 w-[280px] sm:w-[400px] md:w-[600px] lg:w-[800px] h-full`}
      role="tabpanel"
      aria-labelledby={`codagam-gallery-item-${index + 1}-trigger`}
      style={
        {
          zIndex: isActive ? 1 : 0,
          opacity: isVisible ? 1 : 0.7,
        } as React.CSSProperties
      }
      aria-hidden={!isActive}>
      <a
        href="#"
        className="block w-full h-full relative overflow-hidden rounded-3xl">
        {/* Image Background */}
        <div className="absolute inset-0">
          <img
            src={feature.image}
            alt={feature.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              console.log("Image failed to load:", feature.image);
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        {/* Content Overlay */}
        <div className="inner absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
          <div className="info-top">
            <figure className="codagam-icon show-icon w-12 h-12 flex items-center justify-center mb-4">
              <div
                className={`w-8 h-8 flex items-center justify-center text-white`}
                style={{
                  color: feature.color.includes("blue")
                    ? "#3b82f6"
                    : feature.color.includes("purple")
                    ? "#8b5cf6"
                    : "#10b981",
                }}>
                {feature.icon}
              </div>
            </figure>
            <figure className="logo text-white text-3xl sm:text-4xl font-bold leading-tight">
              {feature.title}
            </figure>
          </div>

          <div className="info-bottom">
            <p className="typography-shows-genre text-white/90 text-sm sm:text-base leading-relaxed max-w-sm">
              <span className="genre font-semibold text-white text-base sm:text-lg">
                {feature.subtitle}
              </span>
              <span className="m-dot mx-2 sm:mx-3" aria-hidden="true">
                ·
              </span>
              <span className="line-clamp-3 text-sm">
                {feature.description}
              </span>
            </p>
          </div>
        </div>
      </a>
    </div>
  )
);

GalleryItem.displayName = "GalleryItem";

// Memoized contact form dialog
const ContactFormDialog = memo(
  ({ isOpen, onClose, onSuccess }: ContactFormDialogProps) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Get in Touch</DialogTitle>
          <DialogDescription>
            We&apos;d love to hear from you. Send us a message and we&apos;ll
            respond as soon as possible.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <ContactForm
            showTitle={false}
            onSuccess={onSuccess}
            className="w-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
);

ContactFormDialog.displayName = "ContactFormDialog";

const AboutSection = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with middle item
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024); // Default fallback
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Apple-like scroll animations
  const headerAnimation = useScrollAnimation<HTMLDivElement>({ delay: 100 });
  const galleryAnimation = useScrollAnimation<HTMLDivElement>({ delay: 300 });

  // Memoized features data
  const features = useMemo(
    (): Feature[] => [
      {
        id: 1,
        title: "AI-Driven Solutions",
        subtitle: "Intelligent Automation",
        description:
          "Our AI-driven solutions are designed for sustained best practices, ensuring ethical standards while delivering pragmatic results. From predictive analytics to intelligent automation, we empower businesses with cutting-edge AI capabilities.",
        image: "/images/expertise.jpg",
        icon: <Brain className="w-8 h-8" />,
        color: "from-blue-500 to-blue-600",
        bgColor: "from-blue-50 to-cyan-50",
      },
      {
        id: 2,
        title: "R&D Innovation",
        subtitle: "Future-Ready Technology",
        description:
          "Our R&D team is at the forefront of technological innovation, constantly exploring new ways to solve pressing challenges. We invest in cutting-edge research to develop products that anticipate future demands.",
        image: "/images/idea.jpg",
        icon: <Monitor className="w-8 h-8" />,
        color: "from-purple-500 to-purple-600",
        bgColor: "from-purple-50 to-pink-50",
      },
      {
        id: 3,
        title: "Partnership",
        subtitle: "Long-term Growth",
        description:
          "We don't just work for you; we work with you. Your success is our success, and we're committed to being a long-term partner in your growth journey, delivering transformative technology solutions.",
        image: "/images/commit.jpg",
        icon: <Smartphone className="w-8 h-8" />,
        color: "from-green-500 to-green-600",
        bgColor: "from-green-50 to-emerald-50",
      },
    ],
    []
  );

  // Create extended features array for infinite scroll effect
  const extendedFeatures = useMemo(() => {
    return [features[features.length - 1], ...features, features[0]];
  }, [features]);

  // Navigation handlers
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  }, [features.length]);

  const handleFormSuccess: ButtonClickHandler = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handleDialogClose: ButtonClickHandler = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  // Window width tracking for responsive calculations
  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    updateWindowWidth();

    // Add event listener
    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  // Auto-play functionality - continuous loop
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(goToNext, 6000); // 6 seconds per slide for reading time
  }, [goToNext]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [startAutoPlay]);

  return (
    <>
      <section
        id="about-section"
        className="homepage-section standalone-module w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen pt-2 pb-8 sm:pt-3 sm:pb-12 md:pt-4 md:pb-16 lg:pt-6 lg:pb-24"
        data-module-template="codagam-gallery"
        data-analytics-region="codagam-gallery">
        <div className="module-content">
          {/* Header Section */}
          <div
            ref={headerAnimation.ref}
            className={`text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-4 sm:px-6 md:px-8 scroll-animate-fade ${
              headerAnimation.isVisible ? "animate-in" : ""
            }`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight scroll-mt-32 sm:scroll-mt-32 md:scroll-mt-32 lg:scroll-mt-28">
              About
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-3 sm:mt-4">
              Discover our innovative approach to digital transformation
            </p>
          </div>

          {/* Services Gallery */}
          <div
            ref={galleryAnimation.ref}
            className={`w-full px-4 sm:px-6 md:px-8 lg:px-0 max-w-7xl mx-auto lg:max-w-none scroll-animate-scale ${
              galleryAnimation.isVisible ? "animate-in" : ""
            }`}>
            <div
              data-analytics-gallery-id="Codagam Gallery"
              data-analytics-section-engagement="name:codagam-gallery"
              aria-label="Gallery of About Us and solutions."
              role="group"
              className="gallery relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] overflow-hidden rounded-2xl gpu-accelerated">
              {/* Gallery Items Container */}
              <div
                ref={carouselRef}
                className="item-container flex h-full gap-4 sm:gap-6 md:gap-8 transition-transform duration-1000 ease-out"
                style={{
                  transform: `translate3d(calc(50vw - 50% - ${
                    currentIndex *
                    (windowWidth < 640
                      ? 280
                      : windowWidth < 768
                      ? 400
                      : windowWidth < 1024
                      ? 600
                      : 800)
                  }px), 0px, 0px)`,
                }}>
                {extendedFeatures.map((feature, index) => (
                  <GalleryItem
                    key={`${feature.id}-${index}`}
                    feature={feature}
                    index={index}
                    isActive={index === currentIndex + 1}
                    isVisible={Math.abs(index - (currentIndex + 1)) <= 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Dialog */}
      <ContactFormDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSuccess={handleFormSuccess}
      />
    </>
  );
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
