/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["oss.deltares.nl"],
  },
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },
};

module.exports = nextConfig;
