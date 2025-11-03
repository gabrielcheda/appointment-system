const withNextIntl = require('next-intl/plugin')('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/appointment-system' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/appointment-system/' : '',
}

module.exports = withNextIntl(nextConfig)
