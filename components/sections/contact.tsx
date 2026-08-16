"use client";

import { motion } from "motion/react";
import { Phone, Mail, Download, Github, MapPin } from "lucide-react";
import { resumeData } from "@/lib/resume";
import { asset } from "@/lib/asset";

const ease = [0.22, 1, 0.36, 1] as const;

export function Contact() {
  const b = resumeData.basics;
  const items = [
    { icon: Phone, label: "TEL", value: b.contact.phone, href: `tel:${b.contact.phone}` },
    { icon: Mail, label: "EMAIL", value: b.contact.email, href: `mailto:${b.contact.email}` },
    { icon: Download, label: "RESUME", value: "下载 PDF 简历", href: asset("/秦宇-测试工程师.pdf"), download: true },
    { icon: Github, label: "GITHUB", value: "yuyuyu6631/qinyu-resume", href: b.contact.github, external: true },
  ];
  return (
    <footer id="contact" className="border-t bg-ink text-background">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-background/60">Contact</p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-5xl">
            期待与您交流
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-background/70">
            正在寻找深圳地区测试开发 / AI 测试方向岗位，坐标深圳 · {b.contact.salary} · {b.contact.availability}。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mt-12 grid gap-px overflow-hidden rounded-xl border border-background/15 bg-background/15 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((it) => (
            <a
              key={it.label}
              href={it.href}
              download={it.download}
              target={it.external ? "_blank" : undefined}
              rel={it.external ? "noopener noreferrer" : undefined}
              className="group flex flex-col gap-3 bg-ink p-6 transition-colors duration-200 hover:bg-background/[0.07]"
            >
              <it.icon className="size-5 text-background/60 transition-colors group-hover:text-background" />
              <span className="font-mono text-[10.5px] tracking-[0.2em] text-background/45">{it.label}</span>
              <span className="break-all text-[14.5px] font-semibold tracking-tight">{it.value}</span>
            </a>
          ))}
        </motion.div>

        <div className="mt-14 flex flex-col gap-3 border-t border-background/12 pt-6 text-[12px] text-background/40 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 {b.name} — {b.brand.primary} · AI Testing · Automation · ATE / Semiconductor
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden="true" />
            深圳 · Shenzhen · {b.contact.availability}
          </p>
        </div>
      </div>
    </footer>
  );
}
