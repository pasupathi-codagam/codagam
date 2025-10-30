"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/nav/Navbar";
import { Footer } from "@/components/nav/Footer";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";

export default function LayoutFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSplash = pathname === "/";

  if (isSplash) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
