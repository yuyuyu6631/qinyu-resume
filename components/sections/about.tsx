import { resumeData } from "@/lib/resume";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/ui/reveal";

/** 01 · 定位 / 测试方法 */
export function About() {
  return (
    <section id="about" className="border-b border-rule">
      <div className="container-x section-pad">
        <SectionHead
          index="01"
          en="method / how i test"
          title={
            <>
              测试，从<span className="text-accent">风险</span>开始
            </>
          }
          desc="不做「点一遍没问题」的测试。先把功能、数据、权限、链路的风险拆开，再决定用例写在哪、自动化压在哪、缺陷怎么闭环。以下四条是日常工作的默认动作。"
          meta="four principles"
        />

        <Reveal>
          <div className="grid border-t border-rule md:grid-cols-2">
            {resumeData.about.map((item, i) => (
              <div
                key={item.no}
                className={[
                  "group relative border-b border-rule py-7 md:px-8 md:py-9",
                  i % 2 === 0 ? "md:border-r md:pl-0" : "md:pr-0",
                  i < 2 ? "" : "",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] text-accent">{item.no}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint/70">
                    principle
                  </span>
                </div>
                <h3 className="mt-4 text-[19px] font-bold tracking-tight md:text-[21px]">
                  {item.title}
                </h3>
                <p className="mt-2.5 max-w-[34rem] text-[13px] leading-[1.9] text-ink-soft">
                  {item.body}
                </p>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
