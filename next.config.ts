import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react'],
      },
    });
    return config;
  }
};

export default nextConfig;
