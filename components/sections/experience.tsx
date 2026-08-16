"use client";

import { motion } from "motion/react";
import { resumeData } from "@/lib/resume";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const stageLabel: Record<string, { label: string; className: string }> = {
  "Software Testing": { label: "01 · 软件测试", className: "bg-muted text-ink-soft" },
  "AI Testing": { label: "02 · 测试开发 / AI Testing", className: "bg-ink text-background" },
  "Windows Desktop / ATE": { label: "03 · 测试开发 / Desktop · ATE", className: "bg-ink text-background" },
};

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
        className="mb-14"
      >
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-ink-faint">Experience</p>
        <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl">
          从软件测试到 AI Testing 与 ATE
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-faint">
          三段经历对应能力成长线：业务测试打底 → AI 智能体平台独立测试开发 → 半导体 ATE 上位机测试。
          每一段都有独立负责的成果，可在面试中展开。
        </p>
      </motion.div>

      <div className="relative">
        {/* 成长线 */}
        <div
          className="absolute left-[9px] top-2 bottom-2 w-px bg-border md:left-[217px]"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-10 md:gap-14">
          {resumeData.experience.map((exp, i) => {
            const stage = stageLabel[exp.growth] ?? { label: exp.growth, className: "bg-muted text-ink-soft" };
            return (
              <motion.article
                key={exp.company}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
                className="relative grid gap-4 pl-8 md:grid-cols-[200px_1fr] md:gap-10 md:pl-0"
              >
                {/* 节点 */}
                <span
                  className="absolute left-0 top-1.5 size-[19px] rounded-full border-4 border-background bg-ink md:left-[209px]"
                  aria-hidden="true"
                />
                <aside className="md:pt-1 md:text-right">
                  <p className="font-mono text-[13px] tabular tracking-tight text-ink-faint">{exp.period}</p>
                  <span
                    className={cn(
                      "mt-2 inline-block rounded-full px-3 py-1 font-mono text-[11px] font-medium tracking-tight",
                      stage.className
                    )}
                  >
                    {stage.label}
                  </span>
                </aside>

                <div className="rounded-xl border bg-card p-6 card-hover md:p-7">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-lg font-bold tracking-tight">{exp.company}</h3>
                    <span className="font-mono text-[12.5px] text-ink-faint">{exp.role}</span>
                    {exp.type === "在职" && <Badge variant="solid">在职</Badge>}
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">{exp.industry}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{exp.summary}</p>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {exp.bullets.map((b) => (
                      <li key={b.lead} className="flex gap-2.5 text-[14px] leading-relaxed text-ink-soft">
                        <span className="mt-[9px] inline-block size-[5px] shrink-0 rounded-full bg-ink/40" aria-hidden="true" />
                        <span>
                          <strong className="font-semibold text-ink">{b.lead}：</strong>
                          {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[11px] tracking-tight text-ink-soft"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
