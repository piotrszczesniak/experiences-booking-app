/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bumperball.pl',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.tripadvisor.co.uk',
        port: '',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
    ],
  },
};

export default nextConfig;
