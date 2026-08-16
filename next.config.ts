import type { NextConfig } from "next";

/** GitHub Pages 部署在 /qinyu-resume 子路径；本地构建为空。
 *  CI 中通过 NEXT_PUBLIC_BASE_PATH=/qinyu-resume 注入。 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  images: { unoptimized: true },
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
