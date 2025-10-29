"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import NavLinks from "./NavLinks";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    const element = document.getElementById("hero-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Button
            onClick={handleLogoClick}
            variant="ghost"
            className="flex items-center space-x-2 p-1">
            <span className="text-lg sm:text-xl font-bold text-blue-900">
              Codagam
            </span>
          </Button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Mobile Menu Button */}
          <Button
            onClick={toggleMobileMenu}
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 py-4 border-t border-gray-200"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}>
          <NavLinks onLinkClick={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
