"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
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
  Zap,
  Terminal,
  FileCode,
  Container,
} from "lucide-react";

const AboutSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(
    new Set()
  );
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const updateTime = () => {
      setTime(Date.now());
    };

    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const elementId = entry.target.getAttribute("data-animate-id");
        if (elementId) {
          if (entry.isIntersecting) {
            // Element is in view - add animation
            setAnimatedElements((prev) => new Set([...prev, elementId]));
          } else {
            // Element is out of view - remove animation (for scroll up effect)
            // Add a small delay to make scroll-up animation more visible
            setTimeout(() => {
              setAnimatedElements((prev) => {
                const newSet = new Set(prev);
                newSet.delete(elementId);
                return newSet;
              });
            }, 100);
          }
        }
      });
    }, observerOptions);

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("scroll", handleScroll);

      // Update time for continuous movement
      const timeInterval = setInterval(updateTime, 50);

      // Observe all elements with data-animate-id
      const animatedElements = section.querySelectorAll("[data-animate-id]");
      animatedElements.forEach((el) => observer.observe(el));

      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
        clearInterval(timeInterval);
        observer.disconnect();
      };
    }
  }, []);

  // Helper function to get animation class based on scroll trigger
  const getAnimationClass = (baseClass: string, elementId: string) => {
    return animatedElements.has(elementId)
      ? baseClass
      : "scroll-animate-hidden";
  };

  const features = [
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
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen bg-white relative overflow-hidden">
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

        {/* Animated Tech Icons Background - Distributed Throughout Full Section */}

        {/* TOP ROW */}
        {/* 1. Mobile App Icon - Moving */}
        <div
          className="absolute w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center animate-spin-slow shadow-lg"
          style={{
            left: `${5 + Math.sin(time * 0.001) * 8}%`,
            top: `${20 + Math.cos(time * 0.0008) * 8}%`,
            transition: "all 0.1s linear",
          }}>
          <Smartphone className="w-6 h-6 text-blue-500" />
        </div>

        {/* 2. Database Icon - Moving */}
        <div
          className="absolute w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center animate-pulse shadow-lg"
          style={{
            left: `${85 + Math.sin(time * 0.0012) * 5}%`,
            top: `${20 + Math.cos(time * 0.0009) * 6}%`,
            transition: "all 0.1s linear",
          }}>
          <Database className="w-6 h-6 text-purple-500" />
        </div>

        {/* 3. AI/Brain Icon - Moving */}
        <div
          className="absolute w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center animate-bounce-slow shadow-lg"
          style={{
            left: `${10 + Math.sin(time * 0.0008) * 6}%`,
            top: `${35 + Math.cos(time * 0.0011) * 8}%`,
            transition: "all 0.1s linear",
          }}>
          <Brain className="w-6 h-6 text-green-500" />
        </div>

        {/* 4. Code/Programming Icon - Moving */}
        <div
          className="absolute w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float shadow-lg"
          style={{
            left: `${90 + Math.sin(time * 0.0013) * 6}%`,
            top: `${35 + Math.cos(time * 0.0007) * 8}%`,
            transition: "all 0.1s linear",
          }}>
          <Code className="w-6 h-6 text-cyan-500" />
        </div>

        {/* 5. Server Icon - Moving */}
        <div
          className="absolute w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float shadow-lg"
          style={{
            left: `${8 + Math.sin(time * 0.0009) * 8}%`,
            top: `${50 + Math.cos(time * 0.0012) * 10}%`,
            transition: "all 0.1s linear",
            animationDelay: "1s",
          }}>
          <Server className="w-6 h-6 text-indigo-500" />
        </div>

        {/* 6. Cloud Computing Icon - Moving */}
        <div
          className="absolute w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float shadow-lg"
          style={{
            left: `${92 + Math.sin(time * 0.0011) * 6}%`,
            top: `${50 + Math.cos(time * 0.0008) * 8}%`,
            transition: "all 0.1s linear",
            animationDelay: "2s",
          }}>
          <Cloud className="w-6 h-6 text-pink-500" />
        </div>

        {/* 7. Web Development Icon - Moving */}
        <div
          className="absolute w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float shadow-lg"
          style={{
            left: `${12 + Math.sin(time * 0.0014) * 8}%`,
            top: `${65 + Math.cos(time * 0.001) * 6}%`,
            transition: "all 0.1s linear",
            animationDelay: "4s",
          }}>
          <Globe className="w-6 h-6 text-orange-500" />
        </div>

        {/* 8. API Icon - Moving */}
        <div
          className="absolute w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float shadow-lg"
          style={{
            left: `${88 + Math.sin(time * 0.0006) * 8}%`,
            top: `${65 + Math.cos(time * 0.0013) * 6}%`,
            transition: "all 0.1s linear",
            animationDelay: "3s",
          }}>
          <Star className="w-6 h-6 text-teal-500" />
        </div>

        {/* 9. Security Icon - Moving */}
        <div
          className="absolute w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float shadow-lg"
          style={{
            left: `${15 + Math.sin(time * 0.0015) * 8}%`,
            top: `${80 + Math.cos(time * 0.0009) * 8}%`,
            transition: "all 0.1s linear",
            animationDelay: "5s",
          }}>
          <Shield className="w-6 h-6 text-red-500" />
        </div>

        {/* 10. Analytics Icon - Moving */}
        <div
          className="absolute w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float shadow-lg"
          style={{
            left: `${85 + Math.sin(time * 0.0007) * 8}%`,
            top: `${80 + Math.cos(time * 0.0014) * 6}%`,
            transition: "all 0.1s linear",
            animationDelay: "6s",
          }}>
          <BarChart3 className="w-6 h-6 text-yellow-500" />
        </div>

        {/* HEADER SECTION ICONS - 4 Additional Icons */}
        {/* 11. React Icon - Header Left */}
        <div
          className="absolute w-10 h-10 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center animate-float shadow-lg"
          style={{
            left: `${8 + Math.sin(time * 0.0016) * 6}%`,
            top: `${12 + Math.cos(time * 0.0017) * 4}%`,
            transition: "all 0.1s linear",
            animationDelay: "7s",
          }}>
          <Zap className="w-5 h-5 text-cyan-400" />
        </div>

        {/* 12. Node.js Icon - Header Right */}
        <div
          className="absolute w-10 h-10 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center animate-float shadow-lg"
          style={{
            left: `${92 + Math.sin(time * 0.0018) * 6}%`,
            top: `${12 + Math.cos(time * 0.0019) * 4}%`,
            transition: "all 0.1s linear",
            animationDelay: "8s",
          }}>
          <Terminal className="w-5 h-5 text-green-400" />
        </div>

        {/* 13. Python Icon - Stats Left */}
        <div
          className="absolute w-10 h-10 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center animate-float shadow-lg"
          style={{
            left: `${6 + Math.sin(time * 0.002) * 8}%`,
            top: `${28 + Math.cos(time * 0.0021) * 5}%`,
            transition: "all 0.1s linear",
            animationDelay: "9s",
          }}>
          <FileCode className="w-5 h-5 text-yellow-400" />
        </div>

        {/* 14. Docker Icon - Stats Right */}
        <div
          className="absolute w-10 h-10 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center animate-float shadow-lg"
          style={{
            left: `${94 + Math.sin(time * 0.0022) * 6}%`,
            top: `${28 + Math.cos(time * 0.0023) * 5}%`,
            transition: "all 0.1s linear",
            animationDelay: "10s",
          }}>
          <Container className="w-5 h-5 text-blue-400" />
        </div>
      </div>

      <div className="relative z-10 w-full px-6 lg:px-16 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Animated Header */}
          <div className="text-center mb-24">
            <div className="flex justify-center">
              <div
                data-animate-id="about-badge"
                className={`${getAnimationClass(
                  "animate-slide-in-right",
                  "about-badge"
                )} inline-flex items-center px-4 py-2 bg-gray-100 rounded-full mb-8 border border-gray-200 transition-all duration-800`}>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3"></div>
                <span className="text-gray-700 text-sm font-medium">
                  About Codagam
                </span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-center">
                <h1
                  data-animate-id="title-1"
                  className={`${getAnimationClass(
                    "animate-slide-in-left",
                    "title-1"
                  )} text-6xl lg:text-8xl font-bold text-blue-600 text-center transition-all duration-800`}>
                  Empowering
                </h1>
              </div>
              <div className="flex justify-center">
                <h1
                  data-animate-id="title-2"
                  className={`${getAnimationClass(
                    "animate-slide-in-right",
                    "title-2"
                  )} text-6xl lg:text-8xl font-bold text-blue-600 text-center transition-all duration-800`}>
                  businesses
                </h1>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center">
                <p
                  data-animate-id="about-description"
                  className={`${getAnimationClass(
                    "animate-fade-in-up",
                    "about-description"
                  )} text-xl text-gray-600 leading-relaxed mb-16 text-center transition-all duration-800`}>
                  At Codagam, we pride ourselves on delivering transformative
                  technology solutions. Our team of experts is dedicated to
                  driving positive change and fostering sustainable growth.
                </p>
              </div>

              {/* Animated Stats */}
              <div className="flex justify-center items-center space-x-20 mb-20">
                <div
                  data-animate-id="stat-1"
                  className={`${getAnimationClass(
                    "animate-slide-in-right",
                    "stat-1"
                  )} text-center group flex flex-col items-center transition-all duration-800`}>
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                    <div className="text-2xl font-bold text-white leading-none">
                      500+
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 font-medium text-center">
                    AI Solutions
                  </div>
                </div>

                <div
                  data-animate-id="stat-2"
                  className={`${getAnimationClass(
                    "animate-fade-in-up",
                    "stat-2"
                  )} text-center group flex flex-col items-center transition-all duration-800`}>
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                    <div className="text-2xl font-bold text-white leading-none">
                      50+
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 font-medium text-center">
                    Innovations
                  </div>
                </div>

                <div
                  data-animate-id="stat-3"
                  className={`${getAnimationClass(
                    "animate-slide-in-left",
                    "stat-3"
                  )} text-center group flex flex-col items-center transition-all duration-800`}>
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

          {/* Interactive Feature Cards */}
          <div className="space-y-32">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`group relative ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } flex flex-col lg:flex items-center gap-16`}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}>
                {/* Content */}
                <div className="flex-1 space-y-8 relative z-10">
                  <div className="space-y-6">
                    <div
                      data-animate-id={`feature-${feature.id}-header`}
                      className={`${getAnimationClass(
                        `animate-slide-in-${
                          index % 2 === 0 ? "right" : "left"
                        }`,
                        `feature-${feature.id}-header`
                      )} flex items-center space-x-4 transition-all duration-800`}>
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                        {feature.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">
                        {feature.subtitle}
                      </span>
                    </div>

                    <h2
                      data-animate-id={`feature-${feature.id}-title`}
                      className={`${getAnimationClass(
                        `animate-slide-in-${
                          index % 2 === 0 ? "left" : "right"
                        }`,
                        `feature-${feature.id}-title`
                      )} text-5xl lg:text-6xl font-bold text-blue-600 leading-tight transition-all duration-800`}>
                      {feature.title}
                    </h2>

                    <p
                      data-animate-id={`feature-${feature.id}-description`}
                      className={`${getAnimationClass(
                        "animate-fade-in-up",
                        `feature-${feature.id}-description`
                      )} text-lg text-gray-600 leading-relaxed max-w-2xl transition-all duration-800`}>
                      {feature.description}
                    </p>
                  </div>

                  {/* Interactive Stats */}
                  <div
                    data-animate-id={`feature-${feature.id}-stats`}
                    className={`${getAnimationClass(
                      `animate-slide-in-${index % 2 === 0 ? "right" : "left"}`,
                      `feature-${feature.id}-stats`
                    )} flex items-center space-x-8 transition-all duration-800`}>
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

                {/* Animated Image */}
                <div
                  data-animate-id={`feature-${feature.id}-image`}
                  className={`${getAnimationClass(
                    `animate-slide-in-${index % 2 === 0 ? "left" : "right"}`,
                    `feature-${feature.id}-image`
                  )} flex-1 relative transition-all duration-800`}>
                  <div className="relative group/image">
                    <div className="relative overflow-hidden rounded-3xl">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-[500px] object-cover transition-all duration-700 group-hover/image:scale-110 group-hover/image:rotate-1"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Animated Call to Action */}
          <div className="text-center mt-32">
            <div className="max-w-3xl mx-auto">
              <h2
                data-animate-id="cta-title"
                className={`${getAnimationClass(
                  "animate-fade-in-up",
                  "cta-title"
                )} text-5xl font-bold text-blue-600 mb-8 text-center transition-all duration-800`}>
                Ready to get started?
              </h2>

              <p
                data-animate-id="cta-description"
                className={`${getAnimationClass(
                  "animate-fade-in-up",
                  "cta-description"
                )} text-xl text-gray-600 mb-12 leading-relaxed text-center transition-all duration-800`}>
                Join hundreds of businesses that have transformed their
                operations with our AI-driven solutions and R&D innovations.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  variant="black"
                  size="lg"
                  data-animate-id="cta-button-1"
                  className={`${getAnimationClass(
                    "animate-slide-in-right",
                    "cta-button-1"
                  )} px-10 py-5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-2xl`}>
                  Start your project
                </Button>

                <Button
                  variant="black"
                  size="lg"
                  data-animate-id="cta-button-2"
                  className={`${getAnimationClass(
                    "animate-slide-in-left",
                    "cta-button-2"
                  )} px-10 py-5 rounded-full font-medium transition-all duration-300 transform hover:scale-105`}>
                  View our work
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
