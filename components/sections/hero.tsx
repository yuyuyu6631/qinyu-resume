"use client";

import { motion } from "motion/react";
import { resumeData } from "@/lib/resume";
import { asset } from "@/lib/asset";

const ease = [0.22, 1, 0.36, 1] as const;

const file = [
  ["岗位", "测试开发工程师"],
  ["经验", "1 年+ · 软件测试 → 测试开发 → ATE"],
  ["城市", resumeData.basics.contact.location],
  ["到岗", resumeData.basics.contact.availability],
  ["学历", "本科 · 软件工程"],
  ["电话", resumeData.basics.contact.phone],
  ["邮箱", resumeData.basics.contact.email],
];

export function Hero() {
  const b = resumeData.basics;
  return (
    <section id="top" className="relative overflow-hidden border-b border-rule">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-x relative">
        {/* 顶部状态条 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center justify-between gap-4 border-b border-rule/70 py-4"
        >
          <p className="eyebrow flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" />
            open to opportunities · shenzhen
          </p>
          <p className="eyebrow hidden sm:block">resume / 2026 — qin yu</p>
        </motion.div>

        <div className="grid gap-10 pb-12 pt-10 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-16">
          {/* 主视觉 */}
          <div className="lg:col-span-8">
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.05, ease }}
              className="text-[clamp(4.6rem,13.5vw,10rem)] font-extrabold leading-[0.82] tracking-tightest"
            >
              {b.name}
              <span
                aria-hidden="true"
                className="ml-[0.05em] inline-block size-[0.13em] translate-y-[-0.04em] bg-accent align-baseline"
              />
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease }}
            >
              <p className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[clamp(1.1rem,2.2vw,1.55rem)] font-semibold leading-snug tracking-tight">
                {b.title}
                <span className="font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-ink-faint">
                  {b.brand.primary}
                </span>
              </p>
              <p className="mt-1.5 text-[15px] font-medium text-ink-soft md:text-[17px]">
                {b.positioning}
              </p>
              <p className="mt-5 max-w-[38rem] text-[13.5px] leading-[1.9] text-ink-soft">
                {b.summary}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease }}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <a href={asset("/秦宇-测试工程师.pdf")} download className="btn-ink">
                下载简历 PDF
                <span aria-hidden="true">↓</span>
              </a>
              <a href={asset("/秦宇-测试工程师.docx")} download className="btn-outline">
                下载 Word 版
              </a>
              <a
                href={`mailto:${b.contact.email}`}
                className="link-editorial font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft hover:text-ink"
              >
                邮件联系 <span aria-hidden="true">↗</span>
              </a>
            </motion.div>
          </div>

          {/* 档案卡 */}
          <motion.aside
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease }}
            className="lg:col-span-4 lg:border-l lg:border-rule lg:pl-8"
          >
            <div className="flex items-baseline justify-between border-b border-ink pb-2">
              <p className="eyebrow text-ink">file / 001</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                last updated 2026.10
              </p>
            </div>
            <dl className="divide-y divide-rule/80">
              {file.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[3.6rem_1fr] gap-3 py-2.5">
                  <dt className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
                    {k}
                  </dt>
                  <dd className="text-[12px] leading-snug text-ink-soft">{v}</dd>
                </div>
              ))}
            </dl>
            <a
              href={asset("/秦宇-测试工程师-ATS.txt")}
              download
              className="link-editorial mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint hover:text-ink"
            >
              ats 纯文本版 <span aria-hidden="true">↓</span>
            </a>
          </motion.aside>
        </div>

        {/* 数字条 */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="grid grid-cols-2 gap-px border-t border-rule bg-rule lg:grid-cols-4"
        >
          {resumeData.highlights.map((h) => (
            <div
              key={h.label}
              className="group flex flex-col justify-end gap-1 bg-paper py-6 pr-4 lg:py-8 lg:pr-6"
            >
              <dt className="order-2 max-w-[13rem] text-[11.5px] leading-snug text-ink-faint">
                {h.label}
              </dt>
              <dd className="order-1 text-[clamp(2.5rem,5vw,3.7rem)] font-extrabold leading-[0.9] tracking-tightest tabular">
                {h.value}
              </dd>
              <p className="order-3 mt-1 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.1em] text-ink-faint/80">
                {h.sub}
              </p>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
