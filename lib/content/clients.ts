import { ClientLogoWithSize, ClientSectionContent } from "@/models/interfaces";

export const clientLogosContent: ClientLogoWithSize[] = [
  {
    name: "Facebook",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/facebook.png",
    alt: "logo of facebook",
    width: 183,
    height: 145,
  },
  {
    name: "Google",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/google.png",
    alt: "logo of google",
    width: 183,
    height: 145,
  },
  {
    name: "GoodFirms",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/goodfirms.png",
    alt: "logo of goodfirms",
    width: 183,
    height: 145,
  },
  {
    name: "Clutch",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/clutch.png",
    alt: "logo of clutch",
    width: 183,
    height: 145,
  },
  {
    name: "Upwork",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/upwork.png",
    alt: "logo of upwork",
    width: 183,
    height: 145,
  },
  {
    name: "Codeable",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/codeable.png",
    alt: "logo of codeable",
    width: 183,
    height: 145,
  },
  {
    name: "Uni Wines",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/uni-wines.svg",
    alt: "Uni Wines logo",
    width: 182,
    height: 145,
  },
  {
    name: "Vital Healthcare",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/vital-healthcare.svg",
    alt: "Vital Healthcare logo",
    width: 182,
    height: 145,
  },
  {
    name: "Svanz",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/Svanz.svg",
    alt: "Svanz logo",
    width: 182,
    height: 145,
  },
  {
    name: "Rasta",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/Rasta.svg",
    alt: "Rasta logo",
    width: 182,
    height: 145,
  },
  {
    name: "NRI Legal Services",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/NRI-Legal-Services.svg",
    alt: "NRI Legal Services logo",
    width: 182,
    height: 145,
  },
  {
    name: "NavTech Industries",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/NavTech-Industries.svg",
    alt: "NavTech Industries logo",
    width: 182,
    height: 145,
  },
  {
    name: "Nautica",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/Nautica.svg",
    alt: "Nautica logo",
    width: 182,
    height: 145,
  },
  {
    name: "Mekosha",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/Mekosha.svg",
    alt: "Mekosha logo",
    width: 182,
    height: 145,
  },
  {
    name: "Dr. Nanadas Homeclinic",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/Dr.-Nanadas-Homeclinic.svg",
    alt: "Dr. Nanadas Homeclinic logo",
    width: 182,
    height: 145,
  },
  {
    name: "Chukde",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/Chukde.svg",
    alt: "Chukde logo",
    width: 182,
    height: 145,
  },
  {
    name: "Body Mind Alliance",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/05/Body-Mind-Alliance.svg",
    alt: "Body Mind Alliance logo",
    width: 182,
    height: 145,
  },
  {
    name: "Asian Paints",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/Asian-paints-logo.jpg",
    alt: "Asian Paints logo",
    width: 182,
    height: 145,
  },
  {
    name: "Honeywell Connection",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/honeywell-connection-logo.jpg",
    alt: "Honeywell Connection logo",
    width: 182,
    height: 145,
  },
  {
    name: "Albaik",
    logo: "https://d3vkpydtgsc252.cloudfront.net/uploads/2021/02/Albaik-logo.jpg",
    alt: "Albaik logo",
    width: 182,
    height: 145,
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
