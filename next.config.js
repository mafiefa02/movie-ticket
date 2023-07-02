/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
      },
    ],
  },
};

module.exports = nextConfig;
