import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Netlify deployment
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
    // Image optimization settings - Disabled for Netlify compatibility
  images: {
    unoptimized: true, // Disable Next.js image optimization for static export
    formats: ['image/webp', 'image/avif'],
    domains: [],
  },
    // Compression and optimization
  compress: true,
};

export default nextConfig;
