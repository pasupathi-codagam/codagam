"use client";

import { useEffect, useRef } from "react";

interface StaggeredAnimationProps {
  children: React.ReactNode;
  className?: string;
  animationType?:
    | "fade"
    | "slideUp"
    | "slideLeft"
    | "slideRight"
    | "scale"
    | "bounce";
  delay?: number;
  duration?: number;
}

const StaggeredAnimation = ({
  children,
  className = "",
  animationType = "fade",
  delay = 0,
  duration = 600,
}: StaggeredAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.style.animationDelay = `${delay}ms`;
            element.style.animationDuration = `${duration}ms`;
            element.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [delay, duration]);

  const getAnimationClass = () => {
    const baseClass = "opacity-0 transition-all ease-out";

    switch (animationType) {
      case "fade":
        return `${baseClass} animate-fade-in`;
      case "slideUp":
        return `${baseClass} translate-y-8 animate-slide-up`;
      case "slideLeft":
        return `${baseClass} translate-x-8 animate-slide-left`;
      case "slideRight":
        return `${baseClass} -translate-x-8 animate-slide-right`;
      case "scale":
        return `${baseClass} scale-95 animate-scale-up`;
      case "bounce":
        return `${baseClass} animate-bounce-in`;
      default:
        return `${baseClass} animate-fade-in`;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${getAnimationClass()} ${className}`}
      style={{
        animationFillMode: "forwards",
      }}>
      {children}
    </div>
  );
};

export default StaggeredAnimation;
