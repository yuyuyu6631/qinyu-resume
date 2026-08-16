"use client";

import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";
import { resumeData } from "@/lib/resume";

const ease = [0.22, 1, 0.36, 1] as const;

export function Education() {
  const edu = resumeData.education;
  return (
    <section id="education" className="border-t">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col gap-6 rounded-xl border bg-card p-6 md:flex-row md:items-center md:justify-between md:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-muted text-ink">
              <GraduationCap className="size-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold tracking-tight">{edu.school}</h2>
              <p className="mt-0.5 font-mono text-[13px] text-ink-faint">
                {edu.major} · {edu.period}
              </p>
              <p className="mt-2.5 max-w-2xl text-[14px] leading-relaxed text-ink-soft">{edu.desc}</p>
            </div>
          </div>
          <p className="max-w-xs shrink-0 text-[13px] leading-relaxed text-ink-faint md:text-right">
            {edu.extras}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
