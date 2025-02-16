/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'blogger.googleusercontent.com',
      'www.notion.so',
      'images.unsplash.com'
    ],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === 'development', // Disable optimization in development
  },
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

module.exports = nextConfig;
