/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['.'],
  },
  transpilePackages: ['three'],
  images: {
    domains: [
      'firebasestorage.googleapis.com'
    ]
  }
}

export default nextConfig
