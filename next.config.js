/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Allow external image hosts used in the app
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'images.pexels.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  // Enable compression
  compress: true,
  // Enable SWC minification
  swcMinify: true,
  // Optimize bundle
  webpack: (config, { dev, isServer }) => {
    // Exclude scripts directory from build
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }

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
    // Enable server components
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
  // Enable static optimization
  output: 'standalone',
  // Performance optimizations
  poweredByHeader: false,
  generateEtags: false,
};

module.exports = nextConfig;
