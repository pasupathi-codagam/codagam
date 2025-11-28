import { Brain, Award, Users, Zap } from "lucide-react";
import { ClientLogoWithSize, ClientSectionContent } from "@/models/interfaces";

export const clientLogosContent: ClientLogoWithSize[] = [
  {
    name: "Codagam",
    logo: "/images/logo.png",
    alt: "Codagam wordmark",
    width: 320,
    height: 180,
  },
  {
    name: "SurveyMachi",
    logo: "/images/twitter-image.jpg",
    alt: "SurveyMachi circular badge",
    width: 240,
    height: 240,
  },
  {
    name: "W Brand",
    logo: "/images/WhatsApp Image 2025-09-18 at 14.09.42_e8607c7e.jpg",
    alt: "Stylized white W logo on pink background",
    width: 240,
    height: 240,
  },
  {
    name: "Gobi Today Icon",
    logo: "/images/gt_logo.png",
    alt: "Gobi Today flame icon in red",
    width: 240,
    height: 240,
  },
  

  {
    name: "Codagam",
    logo: "/images/logo.png",
    alt: "Codagam wordmark",
    width: 320,
    height: 180,
  },
  {
    name: "SurveyMachi",
    logo: "/images/twitter-image.jpg",
    alt: "SurveyMachi circular badge",
    width: 240,
    height: 240,
  },
  {
    name: "W Brand",
    logo: "/images/WhatsApp Image 2025-09-18 at 14.09.42_e8607c7e.jpg",
    alt: "Stylized white W logo on pink background",
    width: 240,
    height: 240,
  },
  {
    name: "Gobi Today Icon",
    logo: "/images/gt_logo.png",
    alt: "Gobi Today flame icon in red",
    width: 240,
    height: 240,
  },
 
];

export const aboutStats = [
  {
    icon: Brain,
    number: "500+",
    label: "AI Solutions",
    color: "from-blue-500 to-blue-600",
    hoverColor: "bg-blue-500",
  },
  {
    icon: Award,
    number: "50+",
    label: "Innovations",
    color: "from-purple-500 to-purple-600",
    hoverColor: "bg-purple-500",
  },
  {
    icon: Users,
    number: "100+",
    label: "Happy Clients",
    color: "from-green-500 to-green-600",
    hoverColor: "bg-green-500",
  },
  {
    icon: Zap,
    number: "4+",
    label: "Years Experience",
    color: "from-yellow-500 to-orange-500",
    hoverColor: "bg-orange-500",
  },
];

export function getClientSectionContent(): ClientSectionContent {
  return {
    title: "Our Partners",
    subtitle:
      "We're proud to work with these industry-leading companies that trust us to deliver exceptional results",
    logos: clientLogosContent,
  };
}
