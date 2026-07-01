import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  //basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  // basePath and assetPrefix removed because we are using a custom subdomain
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
