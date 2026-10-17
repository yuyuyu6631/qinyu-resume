import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-background px-6 text-center">
      <div>
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-ink-faint">404</p>
        <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
          页面不存在
        </h1>
        <p className="mt-3 text-[15px] text-ink-faint">你访问的链接可能已失效或被移动。</p>
        <div className="mt-8 flex justify-center gap-3">
          <a href="/" className={buttonVariants()}>返回首页</a>
          <a href="/print/" className={buttonVariants({ variant: "outline" })}>A4 简历版</a>
        </div>
      </div>
    </main>
  );
}
