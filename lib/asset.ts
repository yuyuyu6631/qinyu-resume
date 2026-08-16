/** 静态资源路径：本地 dev 无 basePath；GitHub Pages 构建时带 /qinyu-resume 前缀 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(p: string): string {
  return `${BASE}${p.startsWith("/") ? p : `/${p}`}`;
}
