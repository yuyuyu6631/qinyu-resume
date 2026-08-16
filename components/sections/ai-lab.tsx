"use client";

import { motion } from "motion/react";
import { ArrowRight, FlaskConical } from "lucide-react";
import { resumeData } from "@/lib/resume";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function AiLab() {
  const lab = resumeData.aiLab;
  return (
    <section id="ai-lab" className="border-t bg-ink text-background">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex items-center gap-2.5">
            <FlaskConical className="size-5 text-background/70" aria-hidden="true" />
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-background/60">AI Testing Lab</p>
          </div>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            AI 应用测试实验室
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-background/70">
            {lab.headline}：从输入到回归的完整测试链路，全部来自真实项目的可复现方法。
          </p>
        </motion.div>

        {/* Pipeline */}
        <div className="mt-12">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0">
            {lab.pipeline.map((stage, i) => (
              <div key={stage.stage} className="flex flex-1 flex-col items-stretch">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.09, ease }}
                  className="flex h-full flex-col gap-1 rounded-lg border border-background/15 bg-background/[0.05] p-4 transition-colors duration-200 hover:border-background/40 hover:bg-background/[0.09]"
                >
                  <span className="font-mono text-[10.5px] tracking-[0.18em] text-background/45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-semibold tracking-tight">{stage.stage}</span>
                  <span className="text-[11.5px] leading-snug text-background/55">{stage.detail}</span>
                </motion.div>
                {i < lab.pipeline.length - 1 && (
                  <div className="hidden items-center justify-center py-0 lg:flex" aria-hidden="true">
                    <ArrowRight className="mx-auto size-4 text-background/35" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 三个方向 */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {lab.directions.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              className="rounded-xl border border-background/15 bg-background/[0.04] p-6"
            >
              <h3 className="font-mono text-[14.5px] font-semibold tracking-tight">{d.name}</h3>
              <ul className="mt-3.5 flex flex-col gap-2">
                {d.points.map((pt) => (
                  <li key={pt} className="flex gap-2 text-[13px] leading-relaxed text-background/70">
                    <span className="mt-[8px] inline-block size-[5px] shrink-0 rounded-full bg-background/40" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-background/10 pt-3 font-mono text-[11px] text-background/45">
                {d.evidence}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 方法论标签 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.2, ease }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {lab.methods.map((mth) => (
            <span
              key={mth}
              className={cn(
                "rounded-full border border-background/20 px-3 py-1 font-mono text-[11.5px] tracking-tight text-background/75"
              )}
            >
              {mth}
            </span>
          ))}
        </motion.div>

        <p className="mt-8 text-[12px] leading-relaxed text-background/40">
          {lab.disclaimer}
        </p>
      </div>
    </section>
  );
}
