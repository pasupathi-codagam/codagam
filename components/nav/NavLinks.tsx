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
      // Get actual navbar height dynamically
      const navbar = document.querySelector('nav[aria-label="Primary navigation"]');
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 64;
      
      // Calculate scroll position using getBoundingClientRect for more accuracy
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;
      
      // For about section, ensure we scroll to the very top (accounting for navbar)
      // For other sections, use a small gap
      const gap = sectionKey === 'about' ? 0 : 8;
      
      const offsetTop = elementTop - navbarHeight - gap;
      
      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: "smooth",
      });
    }

    onLinkClick?.(); // Close mobile menu if callback provided
  };

  // Check if this is mobile menu (has onLinkClick callback)
  const isMobileMenu = !!onLinkClick;

  return (
    <div
      className={`w-full flex ${
        isMobileMenu ? "flex-col" : "flex-col sm:flex-row"
      } ${
        isMobileMenu
          ? "space-y-2"
          : "space-y-1 sm:space-y-0 sm:space-x-1 md:space-x-2 lg:space-x-3"
      }`}>
      {navItems.map((item) => (
        <Button
          key={item.key}
          onClick={() => handleNavClick(item.key)}
          variant="ghost"
          className={`relative text-sm sm:text-base font-medium transition-all duration-300 ${
            isMobileMenu
              ? "py-3 px-4 justify-start w-full text-left hover:bg-accent rounded-md"
              : "py-2 sm:py-1 hover:bg-transparent"
          } ${
            activeSection === item.key
              ? "text-blue-900 dark:text-blue-900"
              : "text-muted-foreground hover:text-blue-900 dark:hover:text-blue-900"
          }`}>
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default NavLinks;
