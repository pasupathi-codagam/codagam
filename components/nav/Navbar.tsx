"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Modern scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    // Modern scroll method
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-2 focus:outline-none rounded-md p-1 transition-all duration-200 hover:scale-105">
            <span className="text-lg sm:text-xl font-bold text-blue-900">
              Codagam
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none transition-all duration-200 hover:scale-105">
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 py-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}>
          <NavLinks onLinkClick={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
