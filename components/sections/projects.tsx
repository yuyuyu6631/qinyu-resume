import { resumeData } from "@/lib/resume";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/ui/reveal";

/** 03 · 代表项目 */
export function Projects() {
  return (
    <section id="projects" className="border-b border-rule">
      <div className="container-x section-pad">
        <SectionHead
          index="03"
          en="selected cases / 项目"
          title={
            <>
              六个真实项目，
              <br />
              六种测试难题
            </>
          }
          desc="只放能讲清楚「问题—方法—结果」的项目。每个案例都包含可复现的执行路径，而不是一句「负责测试」。"
          meta="6 cases · 2025.10 — present"
        />

        <div className="border-t border-rule">
          {resumeData.projects.map((p, idx) => (
            <Reveal key={p.no} delay={idx * 0.03}>
              <article className="group grid gap-6 border-b border-rule py-9 md:grid-cols-12 md:gap-8 md:py-11">
                {/* 左侧：编号 + 标题 + 技术 */}
                <div className="md:col-span-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-accent">{p.no}</span>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
                      {p.category}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[20px] font-bold leading-[1.25] tracking-tight md:text-[23px]">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
                    <span>{p.period}</span>
                    <span className="meta-sep" aria-hidden="true" />
                    <span>{p.badge}</span>
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-1.5 gap-y-1.5">
                    {p.technology.map((t) => (
                      <span
                        key={t}
                        className="border border-rule px-1.5 py-[2px] text-[10px] tracking-wide text-ink-faint"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 右侧：问题 / 方法 / 策略 / 结果 */}
                <div className="md:col-span-8">
                  <dl className="space-y-3.5">
                    <div className="grid gap-1 md:grid-cols-[5.5rem_1fr] md:gap-4">
                      <dt className="eyebrow pt-[3px] text-ink-faint">problem</dt>
                      <dd className="text-[13px] leading-[1.85] text-ink-soft">{p.problem}</dd>
                    </div>
                    <div className="grid gap-1 md:grid-cols-[5.5rem_1fr] md:gap-4">
                      <dt className="eyebrow pt-[3px] text-ink-faint">approach</dt>
                      <dd className="text-[13px] leading-[1.85] text-ink-soft">{p.approach}</dd>
                    </div>
                    <div className="grid gap-1 md:grid-cols-[5.5rem_1fr] md:gap-4">
                      <dt className="eyebrow pt-[3px] text-ink-faint">practice</dt>
                      <dd>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {p.strategy.map((s) => (
                            <li
                              key={s}
                              className="relative pl-3.5 text-[12px] leading-[1.75] text-ink-soft before:absolute before:left-0 before:top-[0.62em] before:h-1 before:w-1 before:bg-ink/40"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div className="grid gap-1 md:grid-cols-[5.5rem_1fr] md:gap-4">
                      <dt className="eyebrow pt-[3px] text-accent">result</dt>
                      <dd className="border-l-2 border-accent pl-4 text-[12.8px] leading-[1.8] text-ink">
                        {p.result}
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
