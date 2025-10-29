"use client";

import React from "react";
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
      className="bg-white text-black pt-6 sm:pt-8 lg:pt-10 pb-2 border-t border-gray-200">
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
                className="object-contain rounded w-20 h-12 sm:w-24 sm:h-16"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              <strong>Mobile:</strong> +91 75984 54546
              <br />
              <strong>Email:</strong> support@codagam.com
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 text-sm sm:text-base text-black flex items-center justify-center sm:justify-start">
              <ArrowRight className="h-4 w-4 mr-2 text-blue-900" />
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-1 items-center sm:items-start">
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  variant="ghost"
                  size="sm"
                  className="flex items-center px-2 py-1 hover:bg-blue-50 hover:text-blue-900 transition group text-center sm:text-left text-xs sm:text-sm">
                  <link.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-600 group-hover:text-blue-900" />
                  {link.label}
                </Button>
              ))}
            </nav>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm sm:text-base text-black text-center sm:text-left">
              Follow Us
            </h4>
            <div className="flex items-center flex-wrap gap-3 justify-center sm:justify-start">
              <Link
                href="https://www.instagram.com/codagam"
                className="flex items-center justify-center w-10 h-10 hover:scale-110 transition-transform duration-300">
                <Instagram className="h-6 w-6 text-pink-600" />
              </Link>
              <Link
                href="https://www.facebook.com/codagam"
                className="flex items-center justify-center w-10 h-10 hover:scale-110 transition-transform duration-300">
                <FacebookIcon className="h-6 w-6 text-blue-600" />
              </Link>
              <Link
                href="https://twitter.com/codagam"
                className="flex items-center justify-center w-10 h-10 hover:scale-110 transition-transform duration-300">
                <X className="h-6 w-6 text-gray-800" />
              </Link>
              <Link
                href="https://linkedin.com/company/codagam"
                className="flex items-center justify-center w-10 h-10 hover:scale-110 transition-transform duration-300">
                <Linkedin className="h-6 w-6 text-blue-700" />
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h4 className="font-semibold mb-4 text-sm sm:text-base text-black text-center sm:text-left">
              Get in Touch
            </h4>
            <ContactForm showTitle={false} className="w-full" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 pt-2 pb-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center text-xs sm:text-sm text-gray-600 gap-2">
            <p>&copy; 2024 Codagam. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-blue-900 transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-blue-900 transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
