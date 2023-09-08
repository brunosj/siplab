/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.siplab.ca",
        pathname: "/uploads/**",
      },
    ],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
