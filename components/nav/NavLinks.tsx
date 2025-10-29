"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";

interface NavLinksProps {
  onLinkClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ onLinkClick }) => {
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { key: "home" as const, label: "Home" },
    { key: "about" as const, label: "About" },
    { key: "services" as const, label: "Services" },
    { key: "products" as const, label: "Products" },
    { key: "careers" as const, label: "Careers" },
    { key: "contact" as const, label: "Contact" },
  ];

  const sections = useMemo(
    () => ({
      home: "hero-section",
      about: "about-section",
      services: "services-section",
      products: "products-section",
      careers: "career-section",
      contact: "footer-section",
    }),
    []
  );

  // Modern scroll spy for active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const [key, sectionId] of Object.entries(sections)) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(key);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleNavClick = (sectionKey: keyof typeof sections) => {
    const elementId = sections[sectionKey];
    const element = document.getElementById(elementId);

    if (element) {
      // Modern scroll method with offset for navbar
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }

    onLinkClick?.(); // Close mobile menu if callback provided
  };

  return (
    <div className="w-full flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 md:space-x-2 lg:space-x-3">
      {navItems.map((item) => (
        <Button
          key={item.key}
          onClick={() => handleNavClick(item.key)}
          variant="ghost"
          className={`relative text-sm sm:text-base font-medium transition-all duration-300 py-2 sm:py-1 ${
            activeSection === item.key
              ? "text-primary"
              : "text-muted-foreground hover:text-primary"
          }`}>
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default NavLinks;
