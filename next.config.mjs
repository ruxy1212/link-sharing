/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['.'],
  },
  transpilePackages: ['three']
}

export default nextConfig
