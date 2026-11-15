import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a plain static copy (used to publish a viewable preview).
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export", distDir: "out-build" } : {}),
  images: {
    unoptimized: staticExport,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 480, 640, 828, 1080, 1280, 1600],
  },
  poweredByHeader: false,
};

export default nextConfig;
