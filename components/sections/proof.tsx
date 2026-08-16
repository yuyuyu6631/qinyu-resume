"use client";

import { motion } from "motion/react";
import { Github, ExternalLink } from "lucide-react";
import { resumeData } from "@/lib/resume";

const ease = [0.22, 1, 0.36, 1] as const;

export function Proof() {
  const proof = resumeData.proof;
  return (
    <section id="proof" className="border-t bg-muted/40">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14"
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-ink-faint">Selected Work</p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl">{proof.headline}</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-faint">{proof.desc}</p>
        </motion.div>

        <motion.a
          href={proof.github.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease }}
          className="group flex flex-col justify-between rounded-xl border bg-card p-6 card-hover md:flex-row md:items-center md:gap-8 md:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-ink text-background">
              <Github className="size-5" />
            </span>
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold tracking-tight">
                {proof.github.name}
                <ExternalLink className="size-4 text-ink-faint transition-colors group-hover:text-ink" />
              </h3>
              <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-ink-faint">{proof.github.desc}</p>
            </div>
          </div>
          <span className="mt-4 shrink-0 rounded-full border border-ink/25 px-3 py-1 font-mono text-[11.5px] tracking-tight text-ink-soft md:mt-0">
            真实仓库 · 可查看源码
          </span>
        </motion.a>
      </div>
    </section>
  );
}
