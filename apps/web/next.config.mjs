/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@sheet-hub/ui"],

  images: {
    remotePatterns: [{ hostname: "picsum.photos" }],
  },
};

export default nextConfig;
