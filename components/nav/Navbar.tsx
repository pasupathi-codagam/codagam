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
    <nav
      aria-label="Primary navigation"
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
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
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
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
          id="mobile-menu"
          className={`md:hidden fixed top-14 sm:top-16 right-4 z-40 w-11/12 max-w-xs bg-background shadow-lg transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "translate-x-0 opacity-100 pointer-events-auto"
              : "translate-x-full opacity-0 pointer-events-none"
          }`}>
          <div className="flex flex-col space-y-3 px-4 py-4">
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
