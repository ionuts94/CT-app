import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yvwguivkecrgmsylszif.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      }
    ]
  }
};

export default nextConfig;
