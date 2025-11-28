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
import { ContactForm } from "@/components/shared/ContactForm";
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
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        // Get actual navbar height dynamically
        const navbar = document.querySelector('nav[aria-label="Primary navigation"]');
        const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 64;
        
        // Small gap (8px = 0.5rem = pt-2)
        const smallGap = 8;
        
        const offsetTop = element.offsetTop - navbarHeight - smallGap;
        window.scrollTo({
          top: Math.max(0, offsetTop),
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <footer
      id="footer-section"
      className="border-t border-border bg-background px-4 text-foreground sm:px-6 lg:px-8">
      <SectionReveal
        variant="fade-up"
        delayMs={90}
        durationMs={700}
        className="w-full">
        <div className="mx-auto w-full max-w-7xl py-10 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4 lg:gap-8">
            {/* Company Info */}
            <div>
              <div className="mb-3 flex justify-center sm:justify-start">
                <Image
                  src="/images/og-image.jpg"
                  alt="Codagam Logo"
                  loading="eager"
                  width={100}
                  height={60}
                  className="object-contain rounded w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-16"
                />
              </div>
              <p className="text-xs sm:text-sm text-black dark:text-white text-center sm:text-left">
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
              <nav
                aria-label="Footer quick links"
                className="flex flex-col space-y-1 items-center sm:items-start">
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
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="Visit Codagam on Instagram"
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform duration-300">
                  <Instagram className="h-5 w-5 sm:h-6 sm:w-6 text-[#E4405F]" />
                </Link>
                <Link
                  href="https://www.facebook.com/codagam"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="Visit Codagam on Facebook"
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform duration-300">
                  <FacebookIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#1877F2]" />
                </Link>
                <Link
                  href="https://twitter.com/codagam"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="Visit Codagam on X (Twitter)"
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform duration-300">
                  <X className="h-5 w-5 sm:h-6 sm:w-6 text-black dark:text-white" />
                </Link>
                <Link
                  href="https://linkedin.com/company/codagam"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="Visit Codagam on LinkedIn"
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform duration-300">
                  <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-[#0A66C2]" />
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground sm:mb-4 sm:text-base">
                Get in Touch
              </h4>
              <ContactForm showTitle={false} className="w-full" />
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
        <div className="py-2">
          <div className="mx-auto w-full max-w-7xl ">
            <div className="border-t border-border">
              <div className="py-2 flex items-center justify-center gap-2 text-xs text-muted-foreground sm:text-sm">
                <p>
                  &copy; 2025 Codagam Software Labs Private Limited. All rights
                  reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </footer>
  );
}
