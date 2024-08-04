/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.prosperaico.com',
          },
        ],
        destination: 'https://prosperaico.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;