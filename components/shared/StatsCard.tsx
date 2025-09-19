"use client";

import React, { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StatsCardProps } from "@/models/interfaces";

// Reusable stats card component
const StatsCard = memo(({ number, label, color }: StatsCardProps) => (
  <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-500 hover:scale-105 rounded-2xl">
    <CardContent className="p-8 text-center">
      <div
        className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-4`}>
        {number}
      </div>
      <p className="text-lg text-gray-600 font-medium">{label}</p>
    </CardContent>
  </Card>
));

StatsCard.displayName = "StatsCard";

export default StatsCard;
