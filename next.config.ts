import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Performance Optimizations */
  experimental: {
    optimizePackageImports: ["framer-motion", "@splinetool/react-spline", "three"],
  },

  // Optional: Better image handling for your frame sequence
  images: {
    unoptimized: true, // Since you're using local PNG frames
  },

  // Optional: Reduce build size
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;