/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],

    // ⚠️ Disable invalid image errors
    unoptimized: true,
  },
};

export default nextConfig;
