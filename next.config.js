/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // The .com domain is kept only so it can forward to the canonical .org site.
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'mfmtampaflorida.com' }],
        destination: 'https://www.mfmtampaflorida.org/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.mfmtampaflorida.com' }],
        destination: 'https://www.mfmtampaflorida.org/:path*',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
