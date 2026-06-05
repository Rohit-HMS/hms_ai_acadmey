console.log("BUILD TIME BACKEND URL:", process.env.NEXT_PUBLIC_CMS_API_URL);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
}

export default nextConfig
