/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Replace deprecated images.domains with images.remotePatterns
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  // Fix the multiple lockfile warning
  turbopack: {
    root: process.cwd(),
  },
};

module.exports = nextConfig;