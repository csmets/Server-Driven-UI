/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  images: {
    domains: ['picsum.photos', 'cdn-icons-png.flaticon.com'],
  },
}
