import { resumeData } from "@/lib/resume";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/ui/reveal";

/** 02 · 工作经历 */
export function Experience() {
  return (
    <section id="experience" className="border-b border-rule">
      <div className="container-x section-pad">
        <SectionHead
          index="02"
          en="experience / 工作经历"
          title={
            <>
              从软件测试到
              <br />
              AI Testing 与半导体设备
            </>
          }
          desc="四段经历，一条清晰的成长线：企业数字化系统 → AI 智能体平台测试开发 → ATE 上位机 → AOI 光学检测设备软件。每段都有独立的负责范围与交付物。"
          meta="2025.07 — present"
        />

        <div>
          {resumeData.experience.map((exp, idx) => (
            <Reveal key={exp.company} delay={idx * 0.04}>
              <article className="group grid gap-6 border-t border-rule py-9 md:grid-cols-12 md:gap-8 md:py-11">
                {/* 左栏：时间轴 */}
                <div className="md:col-span-3">
                  <div className="flex items-center gap-3">
                    <span className="relative flex size-2 items-center justify-center">
                      <span className="absolute size-2 rounded-full bg-accent/20 transition-transform duration-300 group-hover:scale-[2.2]" />
                      <span className="size-1.5 rounded-full bg-accent" />
                    </span>
                    <p className="font-mono text-[11.5px] tracking-[0.04em] text-ink-soft">
                      {exp.period}
                    </p>
                  </div>
                  <p className="eyebrow mt-3 md:mt-4">{exp.growth}</p>
                  <p className="mt-3 inline-flex border border-ink/20 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
                    {exp.type}
                  </p>
                </div>

                {/* 右栏：内容 */}
                <div className="md:col-span-9">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-[21px] font-bold leading-tight tracking-tight md:text-[25px]">
                      {exp.company}
                    </h3>
                    <span className="text-[12.5px] font-medium text-ink-faint">{exp.role}</span>
                  </div>
                  <p className="mt-2 max-w-[46rem] font-mono text-[10.5px] leading-relaxed tracking-[0.02em] text-ink-faint">
                    {exp.industry}
                  </p>
                  <p className="mt-4 max-w-[46rem] text-[13.5px] leading-[1.85] text-ink">
                    {exp.summary}
                  </p>

                  <ul className="mt-5 grid gap-x-10 gap-y-3 md:grid-cols-2">
                    {exp.bullets.map((b) => (
                      <li
                        key={b.lead}
                        className="relative pl-4 text-[12.8px] leading-[1.8] text-ink-soft before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2 before:bg-accent/70"
                      >
                        <b className="font-semibold text-ink">{b.lead}：</b>
                        {b.text}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-rule bg-paper px-2 py-[3px] font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-faint transition-colors duration-200 group-hover:border-ink/25"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
