"use client";

import React, { memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavigationButtonProps } from "@/models/interfaces";

// Reusable navigation button component
const NavigationButton = memo(
  ({ direction, onClick, disabled, ariaLabel }: NavigationButtonProps) => (
    <button
      className="group h-16 w-16 rounded-full bg-white/95 backdrop-blur-sm border border-gray-200/50 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:scale-110 transition-all duration-300 flex items-center justify-center"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}>
      {direction === "prev" ? (
        <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors duration-300" />
      ) : (
        <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors duration-300" />
      )}
    </button>
  )
);

NavigationButton.displayName = "NavigationButton";

export default NavigationButton;
