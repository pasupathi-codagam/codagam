"use client";

import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import {
  ScrollToItemFunction,
  HandleScrollFunction,
} from "@/models/interfaces";

interface ScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  itemWidth?: number;
  onIndexChange?: (index: number) => void;
}

// Reusable scroll container hook
export const useScrollContainer = (itemWidth: number = 320) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToItem: ScrollToItemFunction = useCallback(
    (index: number) => {
      if (!scrollContainerRef.current || isScrolling) return;

      setIsScrolling(true);
      const container = scrollContainerRef.current;
      const scrollLeft = index * itemWidth;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });

      setCurrentIndex(index);

      setTimeout(() => setIsScrolling(false), 500);
    },
    [isScrolling, itemWidth]
  );

  // Throttled scroll handler for better performance
  const handleScroll: HandleScrollFunction = useCallback(() => {
    if (!scrollContainerRef.current || isScrolling) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / itemWidth);

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  }, [currentIndex, isScrolling, itemWidth]);

  // Throttled scroll handler using requestAnimationFrame
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
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", throttledScrollHandler, {
        passive: true,
      });
      return () =>
        container.removeEventListener("scroll", throttledScrollHandler);
    }
  }, [throttledScrollHandler]);

  return {
    currentIndex,
    setCurrentIndex,
    isScrolling,
    scrollContainerRef,
    scrollToItem,
    handleScroll,
  };
};

// Reusable Scroll Container Component
const ScrollContainer = memo(
  ({
    children,
    className = "",
    itemWidth = 320,
    onIndexChange,
  }: ScrollContainerProps) => {
    const { currentIndex, scrollContainerRef } = useScrollContainer(itemWidth);

    useEffect(() => {
      if (onIndexChange) {
        onIndexChange(currentIndex);
      }
    }, [currentIndex, onIndexChange]);

    return (
      <div
        ref={scrollContainerRef}
        className={`flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory ${className}`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {children}
      </div>
    );
  }
);

ScrollContainer.displayName = "ScrollContainer";

export default ScrollContainer;
