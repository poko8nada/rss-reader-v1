import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.jp'
      },
      {
        protocol: 'https',
        hostname: 'cdn-ak2.favicon.st-hatena.com'
      },
      {
        protocol: 'https',
        hostname: 'b.hatena.ne.jp'
      },
    ],
  },
}

export default nextConfig
