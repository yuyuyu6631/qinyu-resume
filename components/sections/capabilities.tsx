import { resumeData } from "@/lib/resume";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/ui/reveal";

/** 05 · 能力矩阵 */
export function Capabilities() {
  return (
    <section id="capabilities" className="border-b border-rule">
      <div className="container-x section-pad">
        <SectionHead
          index="05"
          en="capability matrix / 能力"
          title={
            <>
              会用、在用、
              <br />
              能独立负责
            </>
          }
          desc="区分「主力和当前方向」与「项目中使用过」，不做过期罗列。每项能力都对应上面可验证的工作内容。"
          meta="9 domains"
        />

        <div className="border-t border-ink">
          {/* 表头 */}
          <div className="hidden grid-cols-12 gap-6 border-b border-rule py-2.5 md:grid">
            <p className="eyebrow col-span-3">domain</p>
            <p className="eyebrow col-span-7">tools / methods</p>
            <p className="eyebrow col-span-2 text-right">level</p>
          </div>

          {resumeData.capabilities.map((cap, i) => (
            <Reveal key={cap.name} delay={Math.min(i * 0.02, 0.12)}>
              <div className="group grid gap-2 border-b border-rule py-4 transition-colors duration-200 hover:bg-ink/[0.025] md:grid-cols-12 md:items-baseline md:gap-6 md:py-5">
                <div className="md:col-span-3">
                  <h3 className="text-[14.5px] font-bold tracking-tight">{cap.name}</h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-[12.5px] leading-[1.75] text-ink-soft">
                    {cap.techs.map((t, ti) => (
                      <span key={t}>
                        {t}
                        {ti < cap.techs.length - 1 && (
                          <span className="mx-1.5 text-ink-faint/50" aria-hidden="true">
                            /
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-faint">{cap.note}</p>
                </div>
                <div className="md:col-span-2 md:text-right">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-faint group-hover:text-ink">
                    <span className="size-1 bg-accent" aria-hidden="true" />
                    {cap.level}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
