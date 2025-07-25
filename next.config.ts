import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  devIndicators: {
    buildActivity: false,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;
