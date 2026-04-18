import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://res.cloudinary.com/dhb5ubvvy/image/upload/**"),
    ],
  },
};

export default nextConfig;
