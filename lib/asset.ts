/** 静态资源 / 站内路径：本地构建为空；GitHub Pages 构建时带 /qinyu-resume 前缀 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(p: string): string {
  return `${BASE}${p.startsWith("/") ? p : `/${p}`}`;
}

/** 站内路由（如 /print/），同样处理 basePath */
export function route(p: string): string {
  return asset(p);
}
