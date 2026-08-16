"use client";

import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";
import { resumeData } from "@/lib/resume";

const ease = [0.22, 1, 0.36, 1] as const;

export function Education() {
  const edu = resumeData.education;
  return (
    <section id="education" className="border-t">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
          className="flex flex-col gap-3 rounded-xl border bg-card p-5 md:flex-row md:items-center md:justify-between md:p-6"
        >
          <div className="flex items-center gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-ink">
              <GraduationCap className="size-5" />
            </span>
            <div>
              <h2 className="text-[16px] font-bold tracking-tight">{edu.school}</h2>
              <p className="mt-0.5 font-mono text-[13px] text-ink-faint">
                {edu.major} · {edu.period}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
