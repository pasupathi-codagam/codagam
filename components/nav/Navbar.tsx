"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import NavLinks from "./NavLinks";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/themeSwitch/theme-toggle";

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Button
            onClick={handleLogoClick}
            variant="ghost"
            className="flex items-center space-x-2 p-1">
            <span className="text-base sm:text-lg md:text-xl font-bold text-primary">
              Codagam
            </span>
          </Button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <NavLinks />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <Button
            onClick={toggleMobileMenu}
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-foreground hover:bg-accent w-10 h-10">
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 py-3 sm:py-4 border-t border-border"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}>
          <div className="flex flex-col space-y-3">
            <NavLinks onLinkClick={() => setIsMobileMenuOpen(false)} />
            <div className="flex justify-center pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
