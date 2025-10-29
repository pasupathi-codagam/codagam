"use client";
import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12"
          aria-label="Scroll to top"
          title="Scroll to top"
          variant="black">
          <ChevronUp size={20} className="sm:w-6 sm:h-6" />
        </Button>
      )}
    </>
  );
};

export default ScrollToTopButton;
