import React from "react";
import Link from "next/link";

const NavLinks = () => {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/careers", label: "Careers" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
