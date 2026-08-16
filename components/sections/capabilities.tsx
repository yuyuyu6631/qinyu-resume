"use client";

import { motion } from "motion/react";
import { resumeData } from "@/lib/resume";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const levelStyle: Record<string, string> = {
  主力: "bg-ink text-background",
  "实际项目使用": "border border-ink/30 text-ink-soft",
  "专项实践": "bg-background text-ink border border-ink",
  "当前工作方向": "bg-muted text-ink-soft",
};

export function Capabilities() {
  return (
    <section id="capabilities" className="border-t">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14"
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-ink-faint">Capability Map</p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl">能力地图</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-faint">
            按能力域组织，而不是把工具平铺成清单。每个能力域都对应真实项目中的使用场景。
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resumeData.capabilities.map((cap, i) => (
            <motion.div
              key={cap.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease }}
              className="flex flex-col rounded-xl border bg-card p-6 card-hover"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[15.5px] font-bold tracking-tight">{cap.name}</h3>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 font-mono text-[10.5px] font-medium tracking-tight",
                    levelStyle[cap.level] ?? "bg-muted text-ink-soft"
                  )}
                >
                  {cap.level}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {cap.techs.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[11px] tracking-tight text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-4 border-t border-border pt-3.5 text-[13px] leading-relaxed text-ink-faint">
                {cap.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
