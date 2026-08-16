"use client";

import { motion } from "motion/react";
import { Github, ExternalLink, Construction } from "lucide-react";
import { resumeData } from "@/lib/resume";
import { asset } from "@/lib/asset";

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
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-ink-faint">Provable</p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl">{proof.headline}</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-faint">
            能力需要可验证的证据。这里展示真实的源码与文档；尚未公开的内容明确标注构建状态，不做虚构。
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* GitHub 真实仓库 */}
          <motion.a
            href={proof.github.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease }}
            className="group flex flex-col justify-between rounded-xl border bg-card p-6 card-hover md:col-span-2 md:flex-row md:items-center md:gap-8 md:p-8"
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

          {/* 预留位 */}
          {proof.placeholders.map((pl, i) => (
            <motion.div
              key={pl.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.08 + i * 0.06, ease }}
              className="flex flex-col justify-between rounded-xl border border-dashed bg-card/60 p-6"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md bg-muted text-ink-faint">
                  <Construction className="size-4" />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold tracking-tight">{pl.name}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-faint">{pl.desc}</p>
                </div>
              </div>
              <span className="mt-4 self-start rounded-full bg-muted px-2.5 py-0.5 font-mono text-[10.5px] tracking-tight text-ink-faint">
                构建中 · 后续公开
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
