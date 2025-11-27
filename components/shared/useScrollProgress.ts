"use client";

import { useEffect, useState, RefCallback } from "react";

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  const elementRef: RefCallback<HTMLElement> = (el) => {
    setElement(el);
  };

  useEffect(() => {
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Calculate scroll progress (0 to 1)
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight))
      );
      setScrollProgress(progress);

      // Check if element is in viewport
      const inView =
        elementTop < windowHeight * 0.8 && elementTop + elementHeight > 0;
      setIsInView(inView);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [element]);

  return { elementRef, scrollProgress, isInView };
}

