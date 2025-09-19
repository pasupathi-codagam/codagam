"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/shared/ContactForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Brain,
  Monitor,
  Smartphone,
  Database,
  Code,
  Server,
  Cloud,
  Globe,
  Star,
  Shield,
  BarChart3,
} from "lucide-react";
import {
  Feature as FeatureType,
  FloatingIcon as FloatingIconType,
  ContactFormDialogProps,
  ButtonClickHandler,
} from "@/models/interfaces";
import { SectionWrapper } from "@/components/shared";

// Memoized floating icon component for better performance
const FloatingIcon = memo(
  ({
    Icon,
    color,
    position,
    time,
    animationDelay = "0s",
  }: FloatingIconType & { time: number }) => {
    const style = useMemo(
      () => ({
        left: `${position.left + Math.sin(time * 0.001) * 8}%`,
        top: `${position.top + Math.cos(time * 0.0008) * 8}%`,
        transition: "all 0.1s linear",
        animationDelay,
      }),
      [position.left, position.top, time, animationDelay]
    );

    return (
      <div
        className="absolute w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float shadow-lg"
        style={style}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    );
  }
);

FloatingIcon.displayName = "FloatingIcon";

// Memoized feature card component
const FeatureCard = memo(
  ({ feature, index }: { feature: FeatureType; index: number }) => (
    <div
      key={feature.id}
      className={`group relative ${
        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
      } flex flex-col lg:flex items-center gap-16`}>
      {/* Content */}
      <div className="flex-1 space-y-8 relative z-10">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div
              className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-all duration-500`}>
              {feature.icon}
            </div>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">
              {feature.subtitle}
            </span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            {feature.title}
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            {feature.description}
          </p>
        </div>

        {/* Interactive Stats */}
        <div className="flex items-center space-x-8">
          <div className="group/stat">
            <div className="text-4xl font-bold text-gray-900 mb-2 group-hover/stat:scale-110 transition-transform duration-300">
              {feature.stats.number}
            </div>
            <div className="text-sm text-gray-500 font-medium">
              {feature.stats.label}
            </div>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="flex-1 relative">
        <div className="relative group/image">
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src={feature.image}
              alt={feature.title}
              width={800}
              height={500}
              className="w-full h-[500px] object-cover transition-all duration-700 group-hover/image:scale-110 group-hover/image:rotate-1"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  )
);

FeatureCard.displayName = "FeatureCard";

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const timeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Remove animation manager - no animations needed
  const sectionRef = useRef<HTMLDivElement>(null);

  // Memoized features data
  const features = useMemo(
    (): FeatureType[] => [
      {
        id: 1,
        title: "AI-Driven Solutions",
        subtitle: "Intelligent Automation",
        description:
          "Our AI-driven solutions are designed for sustained best practices, ensuring ethical standards while delivering pragmatic results. From predictive analytics to intelligent automation, we empower businesses with cutting-edge AI capabilities.",
        image: "/images/Codagam_Img (1).jpg",
        icon: <Brain className="w-8 h-8" />,
        color: "from-blue-500 to-blue-600",
        bgColor: "from-blue-50 to-cyan-50",
        stats: { number: "500+", label: "AI Solutions" },
      },
      {
        id: 2,
        title: "R&D Innovation",
        subtitle: "Future-Ready Technology",
        description:
          "Our R&D team is at the forefront of technological innovation, constantly exploring new ways to solve pressing challenges. We invest in cutting-edge research to develop products that anticipate future demands.",
        image: "/images/Codagam_Img (3).jpg",
        icon: <Monitor className="w-8 h-8" />,
        color: "from-purple-500 to-purple-600",
        bgColor: "from-purple-50 to-pink-50",
        stats: { number: "50+", label: "Innovations" },
      },
      {
        id: 3,
        title: "Partnership",
        subtitle: "Long-term Growth",
        description:
          "We don't just work for you; we work with you. Your success is our success, and we're committed to being a long-term partner in your growth journey, delivering transformative technology solutions.",
        image: "/images/Codagam_Img (4).jpg",
        icon: <Smartphone className="w-8 h-8" />,
        color: "from-green-500 to-green-600",
        bgColor: "from-green-50 to-emerald-50",
        stats: { number: "4+", label: "Years Partnership" },
      },
    ],
    []
  );

  // Memoized floating icons configuration
  const floatingIcons = useMemo(
    () => [
      {
        Icon: Smartphone,
        color: "text-blue-500",
        position: { left: 5, top: 20 },
      },
      {
        Icon: Database,
        color: "text-purple-500",
        position: { left: 85, top: 20 },
      },
      { Icon: Brain, color: "text-green-500", position: { left: 10, top: 35 } },
      { Icon: Code, color: "text-cyan-500", position: { left: 90, top: 35 } },
      {
        Icon: Server,
        color: "text-indigo-500",
        position: { left: 8, top: 50 },
        animationDelay: "1s",
      },
      {
        Icon: Cloud,
        color: "text-pink-500",
        position: { left: 92, top: 50 },
        animationDelay: "2s",
      },
      {
        Icon: Globe,
        color: "text-orange-500",
        position: { left: 12, top: 65 },
        animationDelay: "4s",
      },
      {
        Icon: Star,
        color: "text-teal-500",
        position: { left: 88, top: 65 },
        animationDelay: "3s",
      },
      {
        Icon: Shield,
        color: "text-red-500",
        position: { left: 15, top: 80 },
        animationDelay: "5s",
      },
      {
        Icon: BarChart3,
        color: "text-yellow-500",
        position: { left: 85, top: 80 },
        animationDelay: "6s",
      },
    ],
    []
  );

  // Optimized event handlers with useCallback and throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  const updateTime = useCallback(() => {
    setTime(Date.now());
  }, []);

  const handleContactClick: ButtonClickHandler = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleProductsClick: ButtonClickHandler = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleFormSuccess: ButtonClickHandler = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handleDialogClose: ButtonClickHandler = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  // Throttled scroll handler for better performance
  const throttledScrollHandler = useCallback(() => {
    let ticking = false;
    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("scroll", throttledScrollHandler, {
        passive: true,
      });

      // Update time for continuous movement with throttling
      timeIntervalRef.current = setInterval(updateTime, 200); // Reduced frequency

      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", throttledScrollHandler);
        if (timeIntervalRef.current) {
          clearInterval(timeIntervalRef.current);
        }
      };
    }
  }, [handleMouseMove, throttledScrollHandler, updateTime]);

  return (
    <>
      <SectionWrapper
        id="about-section"
        className="min-h-screen relative overflow-hidden"
        role="main"
        aria-label="About Codagam section">
        {/* Dynamic Animated Background */}
        <div className="absolute inset-0">
          {/* Animated Grid */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "60px 60px",
              transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.1}px)`,
              animation: "gridMove 20s linear infinite",
            }}
          />

          {/* Floating Orbs */}
          <div
            className="absolute w-72 h-72 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-30 blur-3xl animate-float"
            style={{
              left: mousePosition.x * 0.1,
              top: mousePosition.y * 0.1,
              transform: `translate3d(${mousePosition.x * 0.05}px, ${
                mousePosition.y * 0.05
              }px, 0)`,
              transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
          <div
            className="absolute w-96 h-96 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full opacity-25 blur-3xl animate-float"
            style={{
              right: mousePosition.x * 0.08,
              bottom: mousePosition.y * 0.08,
              transform: `translate3d(${mousePosition.x * -0.03}px, ${
                mousePosition.y * -0.03
              }px, 0)`,
              transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
              animationDelay: "2s",
            }}
          />
          <div
            className="absolute w-64 h-64 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full opacity-35 blur-2xl animate-float"
            style={{
              left: mousePosition.x * 0.06,
              bottom: mousePosition.y * 0.12,
              transform: `translate3d(${mousePosition.x * 0.04}px, ${
                mousePosition.y * 0.04
              }px, 0)`,
              transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
              animationDelay: "4s",
            }}
          />

          {/* Animated Tech Icons Background */}
          {floatingIcons.map((icon, index) => (
            <FloatingIcon
              key={index}
              Icon={icon.Icon}
              color={icon.color}
              position={icon.position}
              time={time}
              animationDelay={icon.animationDelay}
            />
          ))}
        </div>

        <div className="relative z-10 w-full px-6 lg:px-16 py-24">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-24">
              <div className="flex justify-center">
                <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full mb-8 border border-gray-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3"></div>
                  <span className="text-gray-700 text-sm font-medium">
                    About Codagam
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-center">
                  <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 text-center">
                    Empowering
                  </h1>
                </div>
                <div className="flex justify-center">
                  <h1 className="text-6xl lg:text-8xl font-bold text-blue-600 text-center">
                    businesses
                  </h1>
                </div>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="flex justify-center">
                  <p className="text-xl text-gray-600 leading-relaxed mb-16 text-center">
                    At Codagam, we pride ourselves on delivering transformative
                    technology solutions. Our team of experts is dedicated to
                    driving positive change and fostering sustainable growth.
                  </p>
                </div>

                {/* Stats */}
                <div className="flex justify-center items-center space-x-20 mb-20">
                  <div className="text-center group flex flex-col items-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                      <div className="text-2xl font-bold text-white leading-none">
                        500+
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 font-medium text-center">
                      AI Solutions
                    </div>
                  </div>

                  <div className="text-center group flex flex-col items-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                      <div className="text-2xl font-bold text-white leading-none">
                        50+
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 font-medium text-center">
                      Innovations
                    </div>
                  </div>

                  <div className="text-center group flex flex-col items-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                      <div className="text-2xl font-bold text-white leading-none">
                        4+
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 font-medium text-center">
                      Years Partnership
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="space-y-32">
              {features.map((feature, index) => (
                <FeatureCard key={feature.id} feature={feature} index={index} />
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-32">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-5xl font-bold text-gray-900 mb-8 text-center">
                  Ready to get started?
                </h2>

                <p className="text-xl text-gray-600 mb-12 leading-relaxed text-center">
                  Join hundreds of businesses that have transformed their
                  operations with our AI-driven solutions and R&D innovations.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button
                    onClick={handleContactClick}
                    variant="black"
                    size="lg"
                    className="px-10 py-5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-2xl"
                    aria-label="Start your project with Codagam">
                    Start your project
                  </Button>

                  <Button
                    onClick={handleProductsClick}
                    variant="black"
                    size="lg"
                    className="px-10 py-5 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                    aria-label="View our work and products">
                    View our work
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

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
