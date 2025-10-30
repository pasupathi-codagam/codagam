"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  once?: boolean;
  variant?:
    | "fade-up"
    | "fade-down"
    | "fade"
    | "slide-left"
    | "slide-right"
    | "slide-up"
    | "zoom-in"
    | "scale";
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
        y: prefersReducedMotion ? 0 : 24,
        scale: prefersReducedMotion ? 1 : 0.992,
        filter: "blur(1px)",
      },
      visible: { opacity: 1, y: 0, scale: 1, filter: "none" },
    },
    "fade-down": {
      hidden: {
        opacity: 0,
        y: prefersReducedMotion ? 0 : -24,
        scale: prefersReducedMotion ? 1 : 0.992,
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
      hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -36 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-right": {
      hidden: { opacity: 0, x: prefersReducedMotion ? 0 : 36 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-up": {
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 36 },
      visible: { opacity: 1, y: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 },
      visible: { opacity: 1, scale: 1 },
    },
    "zoom-in": {
      hidden: {
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 0.9,
        filter: prefersReducedMotion ? "none" : "blur(1px)",
      },
      visible: { opacity: 1, scale: 1, filter: "none" },
    },
  };

  const transition = prefersReducedMotion
    ? {
        type: "tween" as const,
        duration: Math.max(0.001, (durationMs ?? 0.3) / 1000),
        delay: delayMs / 1000,
        ease: "linear" as const,
      }
    : {
        type: "spring" as const,
        stiffness: 180,
        damping: 22,
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

// Integrated legacy hooks: useScrollAnimation, useStaggeredScrollAnimation, useParallax
export interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(
  options: UseScrollAnimationOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
    delay = 0,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              if (triggerOnce) setHasAnimated(true);
            }, delay);
          } else {
            setIsVisible(true);
            if (triggerOnce) setHasAnimated(true);
          }
        } else {
          if (!triggerOnce) setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    const rect = element.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (isInView) {
      if (delay > 0) {
        setTimeout(() => {
          setIsVisible(true);
          if (triggerOnce) setHasAnimated(true);
        }, delay);
      } else {
        setIsVisible(true);
        if (triggerOnce) setHasAnimated(true);
      }
    }

    return () => observer.unobserve(element);
  }, [threshold, rootMargin, triggerOnce, delay]);

  return {
    ref: elementRef,
    isVisible: triggerOnce ? hasAnimated : isVisible,
  };
};

export const useStaggeredScrollAnimation = <
  T extends HTMLElement = HTMLElement
>(
  itemCount: number,
  staggerDelay: number = 100
) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(itemCount).fill(false)
  );
  const elementRefs = useRef<(T | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    elementRefs.current.forEach((element, index) => {
      if (!element) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }, index * staggerDelay);
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );
      observer.observe(element);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [itemCount, staggerDelay]);

  const setRef = (index: number) => (element: T | null) => {
    elementRefs.current[index] = element;
  };

  return { setRef, visibleItems };
};

export const useParallax = <T extends HTMLElement = HTMLElement>(
  speed: number = 0.5
) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        setOffset(rate);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref: elementRef, offset };
};
