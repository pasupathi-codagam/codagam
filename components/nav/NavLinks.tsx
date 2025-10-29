"use client";

import React, { useState, useEffect, useMemo } from "react";

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
      contact: "client-section",
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
    <div className="w-full flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 md:space-x-2 lg:space-x-3">
      {navItems.map((item) => (
        <button
          key={item.key}
          onClick={() => handleNavClick(item.key)}
          className={`relative  px-4 py-2 text-md font-medium transition-all duration-300 focus:outline-none ${
            activeSection === item.key
              ? "text-blue-900"
              : "text-gray-700 hover:text-blue-900"
          }`}>
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default NavLinks;
