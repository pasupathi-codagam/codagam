"use client";

import React, { memo, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StatsCardProps } from "@/models/interfaces";
import {
  TrendingUp,
  Users,
  Calendar,
  Target,
  Star,
  Award,
  Zap,
} from "lucide-react";

// Color and icon configuration for stats
const STATS_CONFIG = {
  blue: {
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100",
    icon: TrendingUp,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  green: {
    gradient: "from-green-500 to-green-600",
    bgGradient: "from-green-50 to-green-100",
    icon: Users,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  purple: {
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 to-purple-100",
    icon: Calendar,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  orange: {
    gradient: "from-orange-500 to-orange-600",
    bgGradient: "from-orange-50 to-orange-100",
    icon: Target,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
} as const;

// Simplified animated counter hook
const useAnimatedCounter = (target: number) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Simple timeout to start animation after component mounts
    const timer = setTimeout(() => {
      if (!hasAnimated) {
        setHasAnimated(true);
        animateCounter(target);
      }
    }, 500); // Small delay to ensure component is mounted

    return () => clearTimeout(timer);
  }, [target, hasAnimated]);

  const animateCounter = (targetValue: number) => {
    const duration = 2000;
    const startTime = Date.now();
    const startValue = 0;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + targetValue * easeOutQuart);

      setCount(currentValue);

      if (progress >= 1) {
        clearInterval(timer);
        setCount(targetValue);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  };

  return count;
};

// Enhanced stats card component with animations and modern design
const StatsCard = memo(
  ({ number, label, color, elementId }: StatsCardProps) => {
    const config =
      STATS_CONFIG[color as keyof typeof STATS_CONFIG] || STATS_CONFIG.blue;
    const IconComponent = config.icon;

    // Extract numeric value for animation
    const numericValue = parseInt(number.replace(/[^\d]/g, ""));
    const animatedValue = useAnimatedCounter(numericValue);

    return (
      <Card
        id={elementId}
        className={`group border-0 bg-gradient-to-br ${config.bgGradient} transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-${color}-200/50 rounded-3xl overflow-hidden relative`}>
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
          <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-300" />
          <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-700" />
        </div>

        <CardContent className="p-6 sm:p-8 relative z-10">
          <div className="text-center space-y-4">
            {/* Icon with animated background */}
            <div className="flex justify-center">
              <div
                className={`${config.iconBg} ${config.iconColor} p-3 sm:p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </div>

            {/* Animated number */}
            <div className="space-y-2">
              <div
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500`}>
                {animatedValue || numericValue}
                {number.replace(/[\d]/g, "")}
              </div>
            </div>

            {/* Label with enhanced typography */}
            <div className="space-y-1">
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 font-semibold group-hover:text-gray-900 transition-colors duration-300">
                {label}
              </p>

              {/* Additional context based on stat type */}
              {label.includes("Projects") && (
                <div className="flex justify-center">
                  <div className="flex items-center space-x-1 text-blue-600">
                    <Award className="w-3 h-3" />
                    <span className="text-xs font-medium">
                      Successfully Delivered
                    </span>
                  </div>
                </div>
              )}

              {label.includes("Clients") && (
                <div className="flex justify-center">
                  <div className="flex items-center space-x-1 text-green-600">
                    <Star className="w-3 h-3" />
                    <span className="text-xs font-medium">
                      Satisfied Customers
                    </span>
                  </div>
                </div>
              )}

              {label.includes("Years") && (
                <div className="flex justify-center">
                  <div className="flex items-center space-x-1 text-purple-600">
                    <Zap className="w-3 h-3" />
                    <span className="text-xs font-medium">
                      Industry Experience
                    </span>
                  </div>
                </div>
              )}

              {label.includes("Success Rate") && (
                <div className="flex justify-center">
                  <div className="flex items-center space-x-1 text-orange-600">
                    <Target className="w-3 h-3" />
                    <span className="text-xs font-medium">
                      Perfect Track Record
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

StatsCard.displayName = "StatsCard";

export default StatsCard;
