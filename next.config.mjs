/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseUrl: process.env.BASE_URL,
  },
  images: {
    domains: ["storage.googleapis.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "palomade-buckets/**",
      },
    ],
  },
};

export default nextConfig;
