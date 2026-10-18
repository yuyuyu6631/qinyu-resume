import { resumeData } from "@/lib/resume";
import { Reveal } from "@/components/ui/reveal";

/** 04 · AI 应用测试（深色反差区块） */
export function AiLab() {
  const lab = resumeData.aiLab;
  return (
    <section id="ai-lab" className="bg-ink text-paper">
      <div className="container-x section-pad">
        {/* 深色区块标题 */}
        <header className="mb-10 md:mb-14">
          <div className="flex items-baseline justify-between gap-6 border-b border-paper/30 pb-3">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] leading-none text-accent">(04)</span>
              <span className="font-mono text-[10.5px] uppercase leading-none tracking-label text-paper/50">
                ai testing / 专项
              </span>
            </div>
            <span className="hidden font-mono text-[10.5px] uppercase tracking-label text-paper/40 sm:block">
              llm → agent → tool → output
            </span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-12 md:items-end">
            <h2 className="text-[clamp(1.85rem,4.2vw,3.1rem)] font-extrabold leading-[1.04] tracking-tightest md:col-span-7">
              AI 应用测试，
              <br />
              测的是<span className="text-accent">链路</span>而不是单点
            </h2>
            <p className="text-[13.5px] leading-[1.85] text-paper/65 md:col-span-4 md:col-start-9">
              {lab.disclaimer}
              从用户提问到最终展示，每一跳都可能出偏差；把链路拆开逐段验证，才能把 Badcase 归因到模型、工具还是数据。
            </p>
          </div>
        </header>

        {/* 测试链路 */}
        <Reveal>
          <div className="grid grid-cols-2 border-l border-t border-paper/15 sm:grid-cols-4 lg:grid-cols-7">
            {lab.pipeline.map((step, i) => (
              <div
                key={step.stage}
                className="group relative border-b border-r border-paper/15 p-4 transition-colors duration-300 hover:bg-paper/[0.04] md:p-5"
              >
                <p className="font-mono text-[9px] tracking-[0.16em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 text-[13px] font-bold tracking-tight">{step.stage}</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-paper/55">{step.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 三个方向 */}
        <div className="mt-8 grid gap-px bg-paper/15 md:grid-cols-3">
          {lab.directions.map((d, i) => (
            <Reveal key={d.name} delay={0.05 * i} className="bg-ink">
              <div className="flex h-full flex-col p-6 md:p-7">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[17px] font-bold tracking-tight text-paper">{d.name}</h3>
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-paper/35">
                    0{i + 1}
                  </span>
                </div>
                <ul className="mt-4 flex-1 space-y-2">
                  {d.points.map((pt) => (
                    <li
                      key={pt}
                      className="relative pl-3.5 text-[12px] leading-[1.8] text-paper/65 before:absolute before:left-0 before:top-[0.66em] before:h-px before:w-1.5 before:bg-accent"
                    >
                      {pt}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-paper/15 pt-3 font-mono text-[9.5px] uppercase tracking-[0.1em] text-paper/40">
                  {d.evidence}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 方法覆盖 */}
        <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-paper/40">
            methods
          </span>
          {lab.methods.map((m) => (
            <span
              key={m}
              className="border border-paper/20 px-2 py-1 text-[10.5px] tracking-wide text-paper/70"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
