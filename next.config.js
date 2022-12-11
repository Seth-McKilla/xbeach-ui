/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["oss.deltares.nl"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
