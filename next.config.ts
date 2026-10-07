import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server in .next/standalone, used by docker/Dockerfile.
  output: "standalone",
};

export default nextConfig;
