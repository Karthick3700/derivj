/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "beta-api-derivj.onrender.com" },
    ],
  },
};

export default nextConfig;
