import type { Metadata } from "next";
import { resumeData } from "@/lib/resume";
import { PrintActions } from "@/components/print-actions";

export const metadata: Metadata = {
  title: "秦宇 · 测试开发工程师 — A4 一页简历",
  description: "秦宇的 A4 一页版简历：投递、打印与转存 PDF 用。",
  robots: { index: false, follow: false },
};

const b = resumeData.basics;

/** 一页版各经历的 bullet 取舍（网站保持全量） */
function printBullets(company: string, bullets: { lead: string; text: string }[]) {
  if (company.startsWith("长川")) return bullets.slice(0, 4); // 略去「流程与交付」
  if (company.startsWith("北京零壹")) return bullets.filter((x) => x.lead !== "用例体系"); // 用例规模已在核心数据中
  if (company.startsWith("湖南展通")) return bullets.slice(1, 3); // 保留「方案与用例 / 现场交付」
  return bullets;
}

/** 一页版精选项目：当前 AOI 工作 + 自动化框架 + LLM-to-SQL */
const selectedProjects = ["01", "05", "06"];

/** A4 一页打印版（PDF 生成源）：真实文本、ATS 可解析、单页 */
export default function PrintPage() {
  return (
    <main className="a4-stage">
      <PrintActions />

      <article className="a4-sheet">
        {/* 页眉 */}
        <header className="a4-head">
          <div>
            <h1 className="a4-name">
              秦宇<em>.</em>
            </h1>
            <p className="a4-role">
              {b.title} · {b.brand.primary} · {b.brand.subs.join(" · ")}
            </p>
          </div>
          <div className="a4-contact">
            <div>
              电话 {b.contact.phone} · 邮箱 {b.contact.email}
            </div>
            <div>
              {b.contact.location} · 本科 · 软件工程 · {b.contact.availability}
            </div>
            <div>github.com/yuyuyu6631/qinyu-resume</div>
          </div>
        </header>

        {/* 定位 */}
        <p className="a4-lead">
          <b>定位｜</b>
          {b.positioning} {b.summary}
        </p>

        {/* 核心数据 */}
        <dl className="a4-metrics">
          {resumeData.highlights.map((h) => (
            <div className="a4-metric" key={h.label}>
              <dd>{h.value}</dd>
              <dt>{h.short ?? h.label}</dt>
            </div>
          ))}
        </dl>

        {/* 专业技能 */}
        <section className="a4-sec">
          <h2 className="a4-sec-title">
            <i>01</i>专业技能<span>capability</span>
          </h2>
          <div className="a4-two">
            {resumeData.capabilities.map((cap) => (
              <div className="a4-skill" key={cap.name}>
                <b>{cap.name}</b>
                <span>{cap.techs.join(" / ")}</span>
              </div>
            ))}
          </div>
          <p className="a4-skill-note">
            主力方向：Test Development · Automation · AI Testing · Desktop Testing ｜ 其余为实际项目使用
          </p>
        </section>

        {/* 工作经历 */}
        <section className="a4-sec">
          <h2 className="a4-sec-title">
            <i>02</i>工作经历<span>experience</span>
          </h2>
          {resumeData.experience.map((exp) => (
            <div className="a4-entry" key={exp.company}>
              <div className="a4-entry-head">
                <p className="a4-entry-title">
                  {exp.company}
                  <small>
                    {exp.role} · {exp.type}
                  </small>
                </p>
                <p className="a4-period">{exp.period}</p>
              </div>
              <p className="a4-entry-sub">{exp.industry}</p>
              <ul className="a4-list">
                {printBullets(exp.company, exp.bullets).map((bl) => (
                  <li key={bl.lead}>
                    <b>{bl.lead}：</b>
                    {bl.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* 项目经历（节选） */}
        <section className="a4-sec">
          <h2 className="a4-sec-title">
            <i>03</i>项目经历<span>selected 3 / 6</span>
          </h2>
          {resumeData.projects
            .filter((p) => selectedProjects.includes(p.no))
            .map((p) => (
            <div className="a4-entry" key={p.no}>
              <div className="a4-entry-head">
                <p className="a4-entry-title">
                  {p.title}
                  <small>
                    {p.badge} · {p.category}
                  </small>
                </p>
                <p className="a4-period">{p.period}</p>
              </div>
              <ul className="a4-list">
                <li>
                  <b>问题与方法：</b>
                  {p.problem}
                  {p.approach}
                </li>
                <li>
                  <b>结果：</b>
                  {p.result}
                </li>
              </ul>
            </div>
          ))}
        </section>

        {/* 教育 */}
        <section className="a4-sec">
          <h2 className="a4-sec-title">
            <i>04</i>教育背景<span>education</span>
          </h2>
          <div className="a4-entry-head">
            <p className="a4-entry-title">
              {resumeData.education.school}
              <small>{resumeData.education.major}</small>
            </p>
            <p className="a4-period">{resumeData.education.period}</p>
          </div>
          <p className="a4-entry-sub">
            荣誉：{resumeData.education.honors}｜证书：{resumeData.education.certificates}
          </p>
        </section>

        <footer className="a4-foot">
          <span>在线版 · yuyuyu6631.github.io/qinyu-resume</span>
          <span>PDF / DOCX / ATS 与网站由同一份数据源生成</span>
        </footer>
      </article>
    </main>
  );
}
