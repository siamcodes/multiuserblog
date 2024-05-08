/** @type {import('next').NextConfig} */
const config = require("./config");

const nextConfig = {
  serverRuntimeConfig: {
    timeout: 120000, // 2 minutes (adjust as needed)
    //timeout: 30000, // 30 sec
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  env: {
    DB_URI: config.DB_URI,
    API: config.API,
    NEXTAUTH_SECRET: config.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: config.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: config.GOOGLE_CLIENT_SECRET,
    CLOUDINARY_CLOUD_NAME: config.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: config.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: config.CLOUDINARY_API_SECRET,
    GMAIL_AUTH_USER: config.GMAIL_AUTH_USER,
    GMAIL_AUTH_PASS: config.GMAIL_AUTH_PASS,
  },
};

module.exports = nextConfig;
