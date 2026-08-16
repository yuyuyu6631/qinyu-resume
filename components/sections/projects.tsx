"use client";

import { motion } from "motion/react";
import { resumeData } from "@/lib/resume";
import { Badge } from "@/components/ui/badge";

const ease = [0.22, 1, 0.36, 1] as const;

export function Projects() {
  return (
    <section id="projects" className="border-t bg-muted/40">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14"
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-ink-faint">Engineering Case Studies</p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl">代表性项目</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-faint">
            以工程案例的方式呈现：问题、方法、技术、测试策略与结果。每个案例都经过面试追问检验。
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {resumeData.projects.map((p, i) => (
            <motion.article
              key={p.no}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease }}
              className="group rounded-xl border bg-card card-hover"
            >
              <div className="grid gap-6 p-6 md:grid-cols-[240px_1fr] md:gap-8 md:p-8">
                {/* 左侧：编号 + 元信息 */}
                <div className="md:border-r md:pr-8">
                  <div className="flex items-center justify-between md:block">
                    <span className="font-mono text-[13px] font-medium tracking-[0.15em] text-ink-faint">
                      {p.no}
                    </span>
                    <span className="font-mono text-[11px] tabular tracking-tight text-ink-faint md:mt-3 md:block">
                      {p.period}
                    </span>
                  </div>
                  <p className="mt-4 font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-faint">
                    {p.category}
                  </p>
                  <Badge variant="outline" className="mt-3">
                    {p.badge}
                  </Badge>
                </div>

                {/* 右侧：案例内容 */}
                <div>
                  <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
                  <div className="mt-4 flex flex-col gap-3.5 text-[14px] leading-relaxed text-ink-soft">
                    <p>
                      <strong className="font-semibold text-ink">Problem · </strong>
                      {p.problem}
                    </p>
                    <p>
                      <strong className="font-semibold text-ink">Approach · </strong>
                      {p.approach}
                    </p>
                    <div>
                      <strong className="font-semibold text-ink">Testing Strategy · </strong>
                      <ul className="mt-1.5 flex flex-col gap-1.5">
                        {p.strategy.map((s) => (
                          <li key={s} className="flex gap-2.5">
                            <span className="mt-[9px] inline-block size-[5px] shrink-0 rounded-full bg-ink/40" aria-hidden="true" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p>
                      <strong className="font-semibold text-ink">Result · </strong>
                      {p.result}
                    </p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.technology.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[11px] tracking-tight text-ink-soft transition-colors group-hover:border-ink/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
