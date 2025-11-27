import { Lightbulb, TrendingUp, Target } from "lucide-react";

export const careerBenefits = [
  {
    id: "innovation",
    title: "Innovation First",
    description:
      "Work on cutting-edge projects using the latest technologies. We encourage experimentation and creative problem-solving.",
    color: "blue",
    bgColor: "blue-50/30",
    elementId: "benefit-1",
    icon: Lightbulb,
    hoverColor: "rgb(59, 130, 246)", // blue
  },
  {
    id: "growth",
    title: "Growth Opportunities",
    description:
      "Continuous learning with mentorship programs, conference attendance, and access to premium learning resources.",
    color: "green",
    bgColor: "green-50/30",
    elementId: "benefit-2",
    icon: TrendingUp,
    hoverColor: "rgb(34, 197, 94)", // green
  },
  {
    id: "impact",
    title: "Meaningful Impact",
    description:
      "Build solutions that solve real-world problems and make a positive difference in people&apos;s lives.",
    color: "purple",
    bgColor: "purple-50/30",
    elementId: "benefit-3",
    icon: Target,
    hoverColor: "rgb(168, 85, 247)", // purple
  },
];
