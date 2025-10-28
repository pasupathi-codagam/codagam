"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
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
    rootMargin = "0px 0px -50px 0px", // Apple-like trigger point
    triggerOnce = true, // Changed back to true for first-scroll-only animations
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
          // Element is entering viewport
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              if (triggerOnce) {
                setHasAnimated(true);
              }
            }, delay);
          } else {
            setIsVisible(true);
            if (triggerOnce) {
              setHasAnimated(true);
            }
          }
        } else {
          // Element is leaving viewport
          if (!triggerOnce) {
            setIsVisible(false);
          }
          // Don't reset hasAnimated - keep animation state once triggered
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    // Check if element is already in view on mount
    const rect = element.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInView) {
      if (delay > 0) {
        setTimeout(() => {
          setIsVisible(true);
          if (triggerOnce) {
            setHasAnimated(true);
          }
        }, delay);
      } else {
        setIsVisible(true);
        if (triggerOnce) {
          setHasAnimated(true);
        }
      }
    }

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return {
    ref: elementRef,
    isVisible: triggerOnce ? hasAnimated : isVisible,
  };
};

// Hook for staggered animations
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
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }, index * staggerDelay);
          }
          // Don't reset visibility - keep animation state once triggered
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [itemCount, staggerDelay]);

  const setRef = (index: number) => (element: T | null) => {
    elementRefs.current[index] = element;
  };

  return {
    setRef,
    visibleItems,
  };
};

// Hook for parallax effects
export const useParallax = <T extends HTMLElement = HTMLElement>(
  speed: number = 0.5
) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        // const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        setOffset(rate);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed]);

  return {
    ref: elementRef,
    offset,
  };
};
