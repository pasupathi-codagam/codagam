"use client";

import React from "react";

interface NavLinksProps {
  onLinkClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ onLinkClick }) => {
  const navItems = [
    { key: "home" as const, label: "Home" },
    { key: "about" as const, label: "About" },
    { key: "services" as const, label: "Services" },
    { key: "products" as const, label: "Products" },
    { key: "careers" as const, label: "Careers" },
    { key: "contact" as const, label: "Contact" },
  ];

  const sections = {
    home: "hero-section",
    about: "about-section",
    services: "services-section",
    products: "products-section",
    careers: "career-section",
    contact: "client-section",
  };

  const handleNavClick = (sectionKey: keyof typeof sections) => {
    const elementId = sections[sectionKey];
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    onLinkClick?.(); // Close mobile menu if callback provided
  };

  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-6 lg:space-x-8">
      {navItems.map((item) => (
        <button
          key={item.key}
          onClick={() => handleNavClick(item.key)}
          className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default NavLinks;
