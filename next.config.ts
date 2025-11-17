import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '8mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wibjhfqmmlorwspxfcbk.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
