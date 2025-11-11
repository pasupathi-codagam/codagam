"use client";

import React, { useState, useCallback } from "react";
import { Menu } from "lucide-react";
import NavLinks from "./NavLinks";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/themeSwitch/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const handleLogoClick = () => {
    const element = document.getElementById("hero-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileSheetOpen(false);
  };

  const closeMobileSheet = useCallback(() => setMobileSheetOpen(false), []);

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
            className="flex items-center space-x-2 p-1 hover:bg-transparent">
            <span className="text-base sm:text-lg md:text-xl font-bold text-blue-900 dark:text-blue-900">
              Codagam
            </span>
          </Button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <NavLinks />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Sheet */}
          <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[340px] p-4">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-4">
                <nav className="flex flex-col gap-4">
                  <NavLinks onLinkClick={closeMobileSheet} />
                </nav>
                <div className="flex justify-center pt-4 border-t border-border">
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
