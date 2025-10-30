"use client";

import React from "react";
import SectionReveal from "@/components/shared/animation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Facebook as FacebookIcon,
  Home,
  Info,
  Instagram,
  LayoutGrid,
  Linkedin,
  User,
  Wrench,
  X,
} from "lucide-react";
import { ContactForm } from "@/components/shared";
import { Button } from "@/components/ui/button";

export function Footer() {
  const navLinks = [
    {
      label: "Home",
      href: "#hero-section",
      icon: Home,
    },
    {
      label: "About",
      href: "#about-section",
      icon: Info,
    },
    {
      label: "Services",
      href: "#services-section",
      icon: Wrench,
    },
    {
      label: "Products",
      href: "#products-section",
      icon: LayoutGrid,
    },
    {
      label: "Careers",
      href: "#career-section",
      icon: User,
    },
    {
      label: "Contact",
      href: "#client-section",
      icon: User,
    },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        const offsetTop = element.offsetTop - 80; // Account for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <footer
      id="footer-section"
      className="bg-background text-foreground pt-4 sm:pt-6 lg:pt-8 xl:pt-10 pb-2 border-t border-border">
      <SectionReveal
        variant="fade-up"
        delayMs={90}
        durationMs={700}
        className="w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center sm:text-left">
            {/* Company Info */}
            <div>
              <div className="mb-3 flex justify-center sm:justify-start">
                <Image
                  src="/images/og-image.jpg"
                  alt="Codagam Logo"
                  width={100}
                  height={60}
                  className="object-contain rounded w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-16"
                />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                <strong>Mobile:</strong> +91 75984 54546
                <br />
                <strong>Email:</strong> support@codagam.com
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-3 text-sm sm:text-base text-foreground flex items-center justify-center sm:justify-start">
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary" />
                Quick Links
              </h4>
              <nav className="flex flex-col space-y-1 items-center sm:items-start">
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    variant="ghost"
                    size="sm"
                    className="flex items-center px-2 py-1 hover:bg-accent hover:text-primary transition group text-center sm:text-left text-xs sm:text-sm">
                    <link.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-muted-foreground group-hover:text-primary" />
                    {link.label}
                  </Button>
                ))}
              </nav>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-foreground text-center sm:text-left">
                Follow Us
              </h4>
              <div className="flex items-center flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                <Link
                  href="https://www.instagram.com/codagam"
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform duration-300">
                  <Instagram className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600" />
                </Link>
                <Link
                  href="https://www.facebook.com/codagam"
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform duration-300">
                  <FacebookIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </Link>
                <Link
                  href="https://twitter.com/codagam"
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform duration-300">
                  <X className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                </Link>
                <Link
                  href="https://linkedin.com/company/codagam"
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform duration-300">
                  <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-foreground text-center sm:text-left">
                Get in Touch
              </h4>
              <ContactForm showTitle={false} className="w-full mb-4" />
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* Bottom Bar */}
      <SectionReveal
        variant="fade-down"
        delayMs={120}
        durationMs={700}
        className="w-full">
        <div className="border-t border-border pt-4 pb-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center text-xs sm:text-sm text-muted-foreground gap-2">
              <p>&copy; 2024 Codagam. All rights reserved.</p>
              <div className="flex gap-3 sm:gap-4">
                <Link
                  href="/privacy"
                  className="hover:text-primary transition text-xs sm:text-sm">
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-primary transition text-xs sm:text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </footer>
  );
}
