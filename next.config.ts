import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'comicvine.gamespot.com',
        pathname: '/a/uploads/**',
      },
    ],
  },
};

export default nextConfig;
