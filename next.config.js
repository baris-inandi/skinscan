module.exports = {
  images: {
    domains: ["images.unsplash.com"],
  },
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/:path*',
      },
    ]
  },
};
