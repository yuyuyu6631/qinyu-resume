import { ArrowDown, ArrowUpRight, Download, MapPin, FlaskConical, Monitor, Workflow } from "lucide-react";
import { resumeData } from "@/lib/resume";
import { asset } from "@/lib/asset";
import { buttonVariants } from "@/components/ui/button";

const paths = [
  { icon: Monitor, label: "设备软件测试", detail: "AOI / ATE · 功能与稳定性", href: "#experience" },
  { icon: FlaskConical, label: "AI 应用测试", detail: "Text-to-SQL · 智能体调用链路", href: "#ai-lab" },
  { icon: Workflow, label: "测试自动化", detail: "Python / Pytest / Playwright", href: "#projects" },
];

export function Hero() {
  const { basics: b, highlights, experience } = resumeData;
  const current = experience[0];
  return (
    <section id="top" className="hero-surface relative overflow-hidden border-b">
      <div className="hero-orbit pointer-events-none hidden lg:block absolute -right-52 -top-64 size-[680px] rounded-full border border-accent/10" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-12 md:px-8 md:pb-16 md:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.85fr] lg:gap-16">
          <div className="min-w-0">
            <p className="section-kicker">QIN YU / TEST DEVELOPMENT</p>
            <h1 className="mt-6 font-bold tracking-tight">
              <span className="block text-3xl leading-tight md:text-4xl">{b.name}<span className="ml-3 align-middle font-mono text-xs font-normal tracking-[0.15em] text-ink-faint">QIN YU</span></span>
              <span className="mt-3 block text-[clamp(2.15rem,4.8vw,3.6rem)] leading-[1.2] tracking-[-0.04em]">测试开发<span className="text-accent">工程师</span></span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] font-medium leading-relaxed text-ink-soft">{b.positioning}</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-ink-faint">{b.summary}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#projects" className={buttonVariants({ size: "lg", className: "rounded-lg" })}>查看项目实践 <ArrowDown aria-hidden="true" /></a>
              <a href={asset("/秦宇-测试工程师.pdf")} download className={buttonVariants({ size: "lg", variant: "outline", className: "rounded-lg" })}><Download aria-hidden="true" /> 下载简历 PDF</a>
            </div>
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-faint"><span className="inline-flex items-center gap-1"><MapPin className="size-3.5" aria-hidden="true" />{b.contact.location}</span><span>软件工程本科</span><a href={`mailto:${b.contact.email}`} className="inline-flex min-h-6 items-center gap-1 underline decoration-border underline-offset-4 hover:text-accent">邮件联系<ArrowUpRight className="size-3" aria-hidden="true" /></a></p>
          </div>
          <aside className="hero-profile min-w-0 rounded-2xl border bg-card p-6 shadow-[0_20px_70px_-36px_hsl(var(--ink)/0.25)] md:p-8" aria-label="当前工作与实践方向">
            <div className="flex items-center justify-between border-b pb-5"><p className="section-kicker">当前工作</p><span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"><span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />在职</span></div>
            <p className="mt-6 text-2xl font-bold leading-snug tracking-tight">AOI 设备软件测试</p>
            <p className="mt-2 text-sm text-ink-faint">{current.company}</p>
            <p className="mt-2 font-mono text-xs text-ink-faint">{current.period}</p>
            <div className="mt-7 divide-y border-t">
              {paths.map(({ icon: Icon, ...path }) => <a key={path.label} href={path.href} className="group flex min-h-20 items-center gap-4 py-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border bg-muted transition-colors group-hover:border-accent/20 group-hover:bg-accent/10"><Icon className="size-[18px] text-accent" aria-hidden="true" /></span>
                <span className="min-w-0 flex-1"><span className="block text-sm font-semibold group-hover:text-accent">{path.label}</span><span className="mt-1 block text-xs leading-relaxed text-ink-faint">{path.detail}</span></span><ArrowUpRight className="size-4 shrink-0 text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>)}
            </div>
          </aside>
        </div>
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t pt-7 md:mt-14 lg:grid-cols-4">
          {highlights.map(h => <div key={h.label} className="min-w-0 lg:border-r lg:pr-6 last:lg:border-r-0"><dt className="min-h-10 text-xs leading-5 text-ink-faint">{h.label}</dt><dd className="mt-2 font-mono text-3xl font-semibold tracking-tight text-ink md:text-4xl">{h.value}</dd><dd className="mt-2 max-w-[24ch] text-xs leading-5 text-ink-faint">{h.sub}</dd></div>)}
        </dl>
      </div>
    </section>
  );
}
