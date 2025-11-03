const withNextIntl = require('next-intl/plugin')('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // Adicione esta linha
  images: {
    domains: ['localhost'],
    unoptimized: true, // Necessário para export estático
  },
}

module.exports = withNextIntl(nextConfig)