import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: ["@mdx-js/loader"],
    });
    return config;
  },
};

export default nextConfig;
