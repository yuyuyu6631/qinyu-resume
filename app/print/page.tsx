import type { Metadata } from "next";
import { resumeData } from "@/lib/resume";

export const metadata: Metadata = {
  title: "秦宇-测试工程师-A4打印版",
  robots: { index: false, follow: false },
};

const b = resumeData.basics;

/** A4 打印版简历（PDF 生成源）：克制排版、真实文本、ATS 可解析 */
export default function PrintPage() {
  return (
    <main className="mx-auto max-w-[820px] px-4 py-8 text-[13.5px] leading-relaxed text-neutral-900">
      {/* 头部 */}
      <header className="border-b-2 border-neutral-900 pb-3">
        <h1 className="text-[30px] font-bold tracking-[0.2em]">{b.name}</h1>
        <p className="mt-1 text-[14px] font-semibold">{b.brand.primary} · AI Testing · Automation · ATE / Semiconductor</p>
        <p className="mt-1.5 text-[11.5px] text-neutral-600">
          电话 {b.contact.phone} ｜ 邮箱 {b.contact.email} ｜ 男 · 22 岁 · 本科 · 1 年经验 ｜ 期望城市：{b.contact.location} ｜ 期望薪资：{b.contact.salary} ｜ {b.contact.availability}
        </p>
        <p className="mt-1 text-[11.5px] text-neutral-600">GitHub: {b.contact.github}</p>
      </header>

      {/* 定位 */}
      <p className="print-avoid-break mt-3 rounded-sm border-l-[3px] border-neutral-900 bg-neutral-50 px-3 py-2 text-[12px]">
        <strong>定位：</strong>
        {b.positioning} 现于半导体芯片测试机上市公司负责 ATE 上位机软件测试；此前在 AI 智能体平台独立完成 1000+ 用例与 50+ 核心 API 自动巡检。接口、自动化与 AI 应用测试均可独立负责。
      </p>

      {/* 核心亮点 */}
      <section className="print-avoid-break mt-4">
        <h2 className="mb-1.5 border-l-[3px] border-neutral-900 pl-2 text-[14px] font-bold">核心亮点</h2>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
          {resumeData.highlights.map((h) => (
            <li key={h.label} className="text-[11.5px]">
              <strong className="font-mono text-[12px]">{h.value}</strong> {h.label}（{h.sub}）
            </li>
          ))}
        </ul>
      </section>

      {/* 专业技能（能力地图压缩） */}
      <section className="print-avoid-break mt-4">
        <h2 className="mb-1.5 border-l-[3px] border-neutral-900 pl-2 text-[14px] font-bold">专业技能</h2>
        <div className="flex flex-col gap-1">
          {resumeData.capabilities.map((cap) => (
            <p key={cap.name} className="text-[11.5px]">
              <strong>{cap.name}</strong>
              <span className="ml-1.5 rounded border border-neutral-400 px-1 text-[9.5px]">{cap.level}</span>
              <span className="ml-1.5 text-neutral-700">{cap.techs.join(" / ")}</span>
            </p>
          ))}
        </div>
      </section>

      {/* 工作经历 */}
      <section className="mt-4">
        <h2 className="mb-1.5 border-l-[3px] border-neutral-900 pl-2 text-[14px] font-bold">工作经历</h2>
        {resumeData.experience.map((exp) => (
          <div key={exp.company} className="print-avoid-break mb-2.5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[13px] font-bold">
                {exp.company}
                <span className="ml-2 rounded bg-neutral-100 px-1.5 text-[10px] font-semibold text-neutral-700">
                  {exp.role}
                </span>
              </p>
              <p className="shrink-0 font-mono text-[10.5px] text-neutral-500">{exp.period}</p>
            </div>
            <p className="text-[10.5px] text-neutral-500">{exp.industry}</p>
            <ul className="mt-0.5 list-none pl-4">
              {exp.bullets.map((b2) => (
                <li key={b2.lead} className="relative pl-3 text-[11.5px] text-neutral-800">
                  <span className="absolute left-0 top-[7px] size-[5px] bg-neutral-900" aria-hidden="true" />
                  <strong>{b2.lead}：</strong>
                  {b2.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* 项目经历 */}
      <section className="mt-3">
        <h2 className="mb-1.5 border-l-[3px] border-neutral-900 pl-2 text-[14px] font-bold">项目经历</h2>
        {resumeData.projects.map((p) => (
          <div key={p.no} className="print-avoid-break mb-2.5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[12.5px] font-bold">
                {p.title}
                <span className="ml-2 rounded bg-neutral-100 px-1.5 text-[10px] font-semibold text-neutral-700">{p.badge}</span>
              </p>
              <p className="shrink-0 font-mono text-[10.5px] text-neutral-500">{p.period}</p>
            </div>
            <ul className="mt-0.5 list-none pl-4">
              <li className="relative pl-3 text-[11.5px] text-neutral-800">
                <span className="absolute left-0 top-[7px] size-[5px] bg-neutral-900" aria-hidden="true" />
                <strong>问题与方法：</strong>
                {p.problem} {p.approach}
              </li>
              {p.strategy.map((s) => (
                <li key={s} className="relative pl-3 text-[11.5px] text-neutral-800">
                  <span className="absolute left-0 top-[7px] size-[5px] bg-neutral-900" aria-hidden="true" />
                  {s}
                </li>
              ))}
              <li className="relative pl-3 text-[11.5px] text-neutral-800">
                <span className="absolute left-0 top-[7px] size-[5px] bg-neutral-900" aria-hidden="true" />
                <strong>结果：</strong>
                {p.result}
              </li>
            </ul>
          </div>
        ))}
      </section>

      {/* 教育 */}
      <section className="print-avoid-break mt-3">
        <h2 className="mb-1.5 border-l-[3px] border-neutral-900 pl-2 text-[14px] font-bold">教育 · 荣誉 · 证书</h2>
        <p className="text-[11.5px]">
          <strong>{resumeData.education.school}</strong> ｜ {resumeData.education.major} ｜ {resumeData.education.period}
        </p>
        <p className="text-[11.5px] text-neutral-700">{resumeData.education.extras}</p>
      </section>
    </main>
  );
}
