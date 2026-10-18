import type { ReactNode } from "react";

/**
 * 编辑部式区块标题：索引 + 英文栏目 + 中文大标题 + 说明
 * 严格网格、底部墨线、右侧元信息
 */
export function SectionHead({
  index,
  en,
  title,
  desc,
  meta,
}: {
  index: string;
  en: string;
  title: ReactNode;
  desc?: ReactNode;
  meta?: string;
}) {
  return (
    <header className="mb-10 md:mb-14">
      <div className="flex items-baseline justify-between gap-6 border-b border-ink pb-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] leading-none text-accent">({index})</span>
          <span className="eyebrow">{en}</span>
        </div>
        {meta && <span className="eyebrow hidden text-ink-faint sm:block">{meta}</span>}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-12 md:items-end">
        <h2 className="text-[clamp(1.85rem,4.2vw,3.1rem)] font-extrabold leading-[1.04] tracking-tightest md:col-span-6">
          {title}
        </h2>
        {desc && (
          <p className="text-[13.5px] leading-[1.85] text-ink-soft md:col-span-5 md:col-start-8">
            {desc}
          </p>
        )}
      </div>
    </header>
  );
}
