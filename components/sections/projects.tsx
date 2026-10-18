"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { resumeData } from "@/lib/resume";
import { cn } from "@/lib/utils";

const filters = ["全部项目", "设备软件", "AI 应用", "自动化", "测试工具"] as const;
type Filter = (typeof filters)[number];
function category(value: string): Filter {
  if (/Tooling/.test(value)) return "测试工具";
  if (/AOI|ATE/.test(value)) return "设备软件";
  if (/AI/.test(value)) return "AI 应用";
  return "自动化";
}

export function Projects() {
  const [selected, setSelected] = useState<Filter>("全部项目");
  const projects = resumeData.projects.filter(p => selected === "全部项目" || category(p.category) === selected);
  return (
    <section id="projects" className="border-y bg-muted/50">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="section-kicker">02 / SELECTED PROJECTS</p><h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">项目里的测试实践</h2><p className="mt-4 max-w-xl text-sm leading-7 text-ink-faint">从设备软件到 AI 应用，查看问题、验证方法与交付结果。</p></div>
          <a href="#contact" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent hover:underline underline-offset-4">交流项目细节<ArrowUpRight className="size-4" aria-hidden="true" /></a>
        </div>
        <div role="group" aria-label="按项目方向筛选" className="mt-8 flex flex-wrap gap-2">
          {filters.map(filter => <button key={filter} type="button" aria-pressed={selected === filter} onClick={() => setSelected(filter)} className={cn("min-h-11 rounded-full border px-5 text-sm font-medium transition-colors", selected === filter ? "border-ink bg-ink text-white" : "bg-card text-ink-soft hover:border-accent/50 hover:text-accent")}>{filter}</button>)}
        </div>
        <p role="status" className="mt-4 text-xs text-ink-faint">{selected} · {projects.length} 个项目</p>
        <div className="mt-5 grid items-start gap-5 lg:grid-cols-2">
          {projects.map(p => <article key={p.no} className="project-card min-w-0 rounded-2xl border bg-card p-6 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2"><span className="font-mono text-xs font-medium text-accent">{p.no} / {category(p.category)}</span><span className="font-mono text-xs text-ink-faint">{p.period}</span></div>
            <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight">{p.title}</h3>
            <p className="mt-3 text-sm leading-7 text-ink-faint">{p.problem}</p>
            <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-accent/[0.06] p-4 text-sm leading-7 text-ink-soft"><Check className="mt-1.5 size-4 shrink-0 text-accent" aria-hidden="true" /><p><span className="font-semibold text-ink">交付与结果</span><br />{p.result}</p></div>
            <div className="mt-5 flex flex-wrap gap-2">{p.technology.map(t => <span key={t} className="rounded-md bg-muted px-2.5 py-1 text-xs leading-5 text-ink-soft">{t}</span>)}</div>
            <details className="group mt-5 border-t pt-2"><summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-ink hover:text-accent"><span>查看测试方法</span><ArrowDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" /></summary><div className="pb-2 pt-2 text-sm leading-7 text-ink-soft"><p>{p.approach}</p><ul className="mt-4 space-y-2">{p.strategy.map(s => <li key={s} className="flex gap-3"><span className="mt-3 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" /><span>{s}</span></li>)}</ul></div></details>
          </article>)}
        </div>
      </div>
    </section>
  );
}
