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
      className="bg-white text-black py-4 sm:py-6 md:py-8 lg:py-10 border-t border-gray-200 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-center sm:text-left">
        {/* Company Info */}
        <div>
          <div className="mb-3 sm:mb-4 flex justify-center sm:justify-start">
            <Image
              src="/images/og-image.jpg"
              alt="Codagam Logo"
              width={120}
              height={80}
              className="object-contain rounded w-24 h-16 sm:w-28 sm:h-18 md:w-32 md:h-20 lg:w-36 lg:h-24"
            />
          </div>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2 text-center sm:text-left">
            <strong>Mobile:</strong> +91 75984 54546
            <br />
            <strong>Email:</strong> support@codagam.com
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-black flex items-center justify-center sm:justify-start">
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-900" />
            Quick Links
          </h4>
          <nav className="flex flex-col space-y-1 sm:space-y-2 items-center sm:items-start">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="flex items-center px-2 py-1 rounded hover:bg-blue-50 hover:text-blue-900 transition group text-center sm:text-left text-xs sm:text-sm md:text-base">
                <link.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-600 group-hover:text-blue-900" />
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-black text-center sm:text-left">
            Our Services
          </h4>
          <div className="flex flex-col space-y-1 sm:space-y-2 text-xs sm:text-sm md:text-base text-gray-600 items-center sm:items-start">
            <span>Web Development</span>
            <span>Mobile Apps</span>
            <span>Digital Marketing</span>
            <span>UI/UX Design</span>
            <span>Cloud Solutions</span>
            <span>Consulting</span>
          </div>
        </div>

        {/* Follow Us */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-black text-center sm:text-left">
            Follow Us
          </h4>
          <div className="flex items-center flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center sm:justify-start">
            <Link
              href="https://www.instagram.com/codagam"
              className="bg-gray-100 text-gray-600 rounded-full p-2 sm:p-2.5 md:p-3 hover:bg-blue-100 hover:text-blue-900 transition-all duration-200 hover:scale-105">
              <Instagram className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </Link>
            <Link
              href="https://www.facebook.com/codagam"
              className="bg-gray-100 text-gray-600 rounded-full p-2 sm:p-2.5 md:p-3 hover:bg-blue-100 hover:text-blue-900 transition-all duration-200 hover:scale-105">
              <FacebookIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </Link>
            <Link
              href="https://twitter.com/codagam"
              className="bg-gray-100 text-gray-600 rounded-full p-2 sm:p-2.5 md:p-3 hover:bg-blue-100 hover:text-blue-900 transition-all duration-200 hover:scale-105">
              <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </Link>
            <Link
              href="https://linkedin.com/company/codagam"
              className="bg-gray-100 text-gray-600 rounded-full p-2 sm:p-2.5 md:p-3 hover:bg-blue-100 hover:text-blue-900 transition-all duration-200 hover:scale-105">
              <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6">
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center text-xs sm:text-sm md:text-base text-gray-600 gap-2 sm:gap-3">
          <p>&copy; 2024 Codagam. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <Link
              href="/privacy"
              className="hover:text-blue-900 transition text-center sm:text-left">
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-blue-900 transition text-center sm:text-left">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
