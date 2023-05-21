/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { remotePatterns: [{ hostname: "mls.mioymreo.com" }] },
};

module.exports = nextConfig;
