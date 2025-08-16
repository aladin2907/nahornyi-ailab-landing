import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Temporary fix for createRoot() error
  output: 'export', // For static export (GitHub Pages compatible)
  trailingSlash: true,
  images: {
    unoptimized: true // Required for static export
  },
  serverExternalPackages: ['three'] // Updated syntax for Next.js 15
};

export default nextConfig;
