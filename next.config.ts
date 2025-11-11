import path from "path";
import { fileURLToPath } from "url";

const configDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
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
  turbopack: {
    root: configDir,
  },
};

export default nextConfig;
