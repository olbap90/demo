// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.apple.com',
        pathname: '/**',  // Permitir cualquier ruta bajo www.apple.com
      },
      {
        protocol: 'https',
        hostname: 'cdsassets.apple.com',
        pathname: '/live/**',  // Permitir imágenes desde cdsassets.apple.com
      },
    ],
  },
};

export default nextConfig;
