/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image-api-wtie.onrender.com" },
    ],
  },
};

export default nextConfig;
