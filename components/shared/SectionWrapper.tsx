"use client";

import React, { memo } from "react";

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  role?: string;
  "aria-label"?: string;
}

// Reusable section wrapper component
const SectionWrapper = memo(({ 
  id, 
  className = "", 
  children, 
  role = "region",
  "aria-label": ariaLabel 
}: SectionWrapperProps) => (
  <section
    id={id}
    className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}
    role={role}
    aria-label={ariaLabel}>
    {children}
  </section>
));

SectionWrapper.displayName = "SectionWrapper";

export default SectionWrapper;

