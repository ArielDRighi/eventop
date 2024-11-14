import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['i.pinimg.com'], 
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignora errores de ESLint en la compilación de producción
  },
};

export default nextConfig;

