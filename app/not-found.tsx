import Link from "next/link";
import { route } from "@/lib/asset";

export default function NotFound() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden px-6">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative text-center">
        <p className="eyebrow">404 / page not found</p>
        <h1 className="mt-5 text-[clamp(3rem,10vw,6rem)] font-extrabold leading-none tracking-tightest">
          页面不存在<span className="text-accent">。</span>
        </h1>
        <p className="mt-4 text-[14px] text-ink-soft">你访问的链接可能已失效，或地址输入有误。</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href={route("/")} className="btn-ink">
            返回首页 <span aria-hidden="true">→</span>
          </Link>
          <Link href={route("/print/")} className="btn-outline">
            A4 一页简历
          </Link>
        </div>
      </div>
    </main>
  );
}
