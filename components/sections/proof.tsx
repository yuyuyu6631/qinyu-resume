import { resumeData } from "@/lib/resume";
import { route } from "@/lib/asset";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/ui/reveal";

/** 06 · 教育与可验证产出 */
export function Proof() {
  const edu = resumeData.education;
  const proof = resumeData.proof;
  const site = "https://yuyuyu6631.github.io/qinyu-resume/";

  return (
    <section id="proof" className="border-b border-rule">
      <div className="container-x section-pad">
        <SectionHead
          index="06"
          en="education & proof / 教育"
          title={
            <>
              学历是起点，
              <br />
              作品才是证明
            </>
          }
          desc="教育背景、荣誉与证书如实列出；同时给出可以点开验证的源码与在线站点——这份简历本身就是作品。"
          meta="2022 — 2026"
        />

        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          {/* 教育 */}
          <Reveal className="md:col-span-7">
            <div className="border-t border-ink pt-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[22px] font-bold tracking-tight md:text-[26px]">{edu.school}</h3>
                <p className="font-mono text-[11px] tracking-[0.04em] text-ink-faint">{edu.period}</p>
              </div>
              <p className="mt-1.5 text-[13px] font-medium text-ink-soft">{edu.major}</p>
              <p className="mt-4 max-w-[36rem] text-[12.8px] leading-[1.9] text-ink-soft">{edu.desc}</p>

              <dl className="mt-6 space-y-3">
                <div className="grid grid-cols-[4.5rem_1fr] gap-3 border-t border-rule pt-3">
                  <dt className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
                    荣誉
                  </dt>
                  <dd className="text-[12.5px] leading-[1.8] text-ink-soft">{edu.honors}</dd>
                </div>
                <div className="grid grid-cols-[4.5rem_1fr] gap-3 border-t border-rule pt-3">
                  <dt className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
                    证书
                  </dt>
                  <dd className="text-[12.5px] leading-[1.8] text-ink-soft">{edu.certificates}</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          {/* 可验证产出 */}
          <Reveal delay={0.08} className="md:col-span-5">
            <div className="border border-rule bg-ink/[0.02] p-6 md:p-7">
              <div className="flex items-baseline justify-between border-b border-ink pb-2">
                <p className="eyebrow text-ink">{proof.headline}</p>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                  verifiable
                </span>
              </div>
              <h3 className="mt-5 font-mono text-[16px] font-bold tracking-tight">
                {proof.github.name}
                <span className="ml-2 text-[10px] font-normal uppercase tracking-[0.12em] text-ink-faint">
                  github
                </span>
              </h3>
              <p className="mt-3 text-[12.5px] leading-[1.85] text-ink-soft">{proof.github.desc}</p>
              <div className="mt-5 space-y-2.5 border-t border-rule pt-4">
                <a
                  href={proof.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial flex w-full justify-between font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft hover:text-ink"
                >
                  source code <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial flex w-full justify-between font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft hover:text-ink"
                >
                  live site <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={route("/print/")}
                  className="link-editorial flex w-full justify-between font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft hover:text-ink"
                >
                  a4 one-pager <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
