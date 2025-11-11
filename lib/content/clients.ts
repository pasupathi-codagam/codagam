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

export function getClientSectionContent(): ClientSectionContent {
  return {
    title: "Our Partners",
    subtitle:
      "We're proud to work with these industry-leading companies that trust us to deliver exceptional results",
    logos: clientLogosContent,
  };
}
