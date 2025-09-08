/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    // Exclude scripts directory from build
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
  // Exclude scripts from TypeScript compilation
  typescript: {
    ignoreBuildErrors: false,
  },
  // Exclude scripts from build
  experimental: {
    outputFileTracingExcludes: {
      '*': ['./scripts/**/*'],
    },
  },
};

module.exports = nextConfig;
