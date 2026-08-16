"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowDown, Download, Mail } from "lucide-react";
import { resumeData } from "@/lib/resume";
import { asset } from "@/lib/asset";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");
  const m = value.match(/^([\d.]+)(.*)$/);
  const target = m ? parseFloat(m[1]) : 0;
  const suffix = m ? m[2] : value;

  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    const dur = 1200;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const n = target * eased;
      setDisplay(target % 1 === 0 ? String(Math.round(n)) : n.toFixed(1));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular">
      {display}
      {suffix}
    </span>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const b = resumeData.basics;
  return (
    <section id="top" className="relative overflow-hidden border-b">
      {/* 背景：微网格 + 顶部光晕 */}
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="glow-dot pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 md:px-8 md:pb-20 md:pt-28">
        {/* 定位行 */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[12.5px] tracking-tight text-ink-faint"
        >
          <span className="inline-block size-1.5 rounded-full bg-ink animate-pulse-soft" aria-hidden="true" />
          {b.brand.primary}
          <span className="text-border" aria-hidden="true">/</span>
          {b.brand.subs.join(" · ")}
        </motion.p>

        {/* 大标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease }}
          className="text-balance text-[clamp(3.2rem,9vw,6.5rem)] font-extrabold leading-[0.98] tracking-[-0.03em]"
        >
          {b.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-4 max-w-2xl text-[clamp(1.05rem,2.4vw,1.35rem)] font-medium leading-snug tracking-tight text-ink-soft"
        >
          {b.positioning}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
          className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-faint"
        >
          {b.summary}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Button size="lg">
            <a href={asset("/秦宇-测试工程师.pdf")} download className="flex items-center gap-2">
              <Download className="size-4" />
              下载简历 PDF
            </a>
          </Button>
          <Button size="lg" variant="outline">
            <a href={`mailto:${b.contact.email}`} className="flex items-center gap-2">
              <Mail className="size-4" />
              直接联系
            </a>
          </Button>
          <a
            href="#projects"
            className="inline-flex h-12 items-center gap-1.5 px-2 text-sm font-medium text-ink-faint transition-colors hover:text-ink"
          >
            查看项目
            <ArrowDown className="size-4" />
          </a>
        </motion.div>

        {/* 数字条 */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-4"
        >
          {resumeData.highlights.map((h) => (
            <div key={h.label} className="bg-background p-6">
              <dt className="order-2 mt-1.5 block text-[13px] leading-snug text-ink-faint">
                {h.label}
              </dt>
              <dd className="order-1 block font-mono text-[clamp(1.9rem,4vw,2.6rem)] font-semibold tracking-tight text-ink">
                <CountUp value={h.value} />
              </dd>
              <p className="mt-1.5 text-[11.5px] leading-snug text-ink-faint/80">{h.sub}</p>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
