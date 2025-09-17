import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3vkpydtgsc252.cloudfront.net",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
