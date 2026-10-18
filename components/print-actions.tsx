"use client";

import { route } from "@/lib/asset";

/** 打印页屏幕工具条：不进入打印结果 */
export function PrintActions() {
  return (
    <div className="no-print mx-auto mb-6 flex w-full max-w-[210mm] flex-wrap items-center justify-between gap-3 border border-rule bg-paper px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
        A4 一页简历 · 可直接打印或另存为 PDF
      </p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => window.print()}
          className="bg-ink px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-paper transition-colors hover:bg-accent"
        >
          打印 / 保存 PDF
        </button>
        <a
          href={route("/")}
          className="link-editorial font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft hover:text-ink"
        >
          ← 返回网站
        </a>
      </div>
    </div>
  );
}
