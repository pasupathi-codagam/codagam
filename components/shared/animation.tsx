"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  once?: boolean;
  variant?: "fade-up" | "fade" | "slide-left" | "slide-right" | "scale";
  delayMs?: number;
  durationMs?: number;
  aura?: boolean;
};

// Lightweight scroll-reveal + subtle gradient aura, no external deps
export function SectionReveal({
  children,
  className = "",
  threshold = 0.12,
  once = true,
  variant = "fade-up",
  delayMs = 80,
  durationMs = 700,
  aura = false,
}: SectionRevealProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  const variants: Record<string, Variants> = {
    "fade-up": {
      hidden: {
        opacity: 0,
        y: prefersReducedMotion ? 0 : 16,
        scale: prefersReducedMotion ? 1 : 0.995,
        filter: "blur(1px)",
      },
      visible: { opacity: 1, y: 0, scale: 1, filter: "none" },
    },
    fade: {
      hidden: {
        opacity: 0,
        filter: prefersReducedMotion ? "none" : "blur(2px)",
      },
      visible: { opacity: 1, filter: "none" },
    },
    "slide-left": {
      hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -24 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-right": {
      hidden: { opacity: 0, x: prefersReducedMotion ? 0 : 24 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  const transition = prefersReducedMotion
    ? {
        type: "tween" as const,
        duration: 0.001,
        delay: delayMs / 1000,
        ease: "linear" as const,
      }
    : {
        type: "spring" as const,
        stiffness: 140,
        damping: 18,
        mass: 0.9,
        delay: delayMs / 1000,
      };

  return (
    <motion.div
      ref={rootRef}
      className={`sr-root ${aura ? "sr-aura" : ""} ${className}`}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants[variant] || variants["fade-up"]}
      transition={transition}>
      {children}
    </motion.div>
  );
}

export default SectionReveal;
