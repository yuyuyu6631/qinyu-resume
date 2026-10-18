import { ArrowDown, ArrowUpRight, Download, FlaskConical, MapPin, Monitor, Workflow } from "lucide-react";
import brief from "@/data/brief.json";
import { resumeData } from "@/lib/resume";
import { asset } from "@/lib/asset";
import { PrintResume } from "@/components/print-resume";

const directions = [
  { icon: Monitor, label: "设备软件测试", detail: "AOI / ATE · 功能与稳定性", href: "#experience-heading" },
  { icon: FlaskConical, label: "AI 应用验证", detail: "Text-to-SQL · 结果与口径核对", href: "#projects-heading" },
  { icon: Workflow, label: "测试自动化", detail: "Python / Pytest / Playwright", href: "#experience-heading" },
];

function CompactContent({ printable = false }: { printable?: boolean }) {
  const { experience } = resumeData;
  return (
    <div className={printable ? "brief-content" : "resume-content"}>
      <section aria-labelledby="experience-heading" className="brief-section resume-experience">
        <div className="resume-section-head"><div><p className="resume-kicker no-print">EXPERIENCE</p><h2 id="experience-heading">工作经历</h2></div><span className="resume-count no-print">04</span></div>
        <div className="brief-experiences">
          {brief.experience.map((item, index) => {
            const source = experience.find(exp => exp.company === item.company)!;
            return <article className="brief-job" key={item.company}>
              <div className="brief-job-meta"><span className="resume-index no-print">0{index + 1}</span><h3>{item.company}</h3><p>{source.role}</p><p className="brief-period">{source.period}</p></div>
              <p className="brief-job-work">{item.points.join(" ")}</p>
            </article>;
          })}
        </div>
      </section>
      <section aria-labelledby="projects-heading" className="brief-section resume-project-section">
        <div className="resume-section-head"><div><p className="resume-kicker no-print">SELECTED WORK</p><h2 id="projects-heading">具体实践</h2></div><span className="resume-count no-print">02</span></div>
        <div className="brief-projects">{brief.projects.map((project, index) => <article key={project.title} className="brief-project">
          <div className="resume-project-top no-print"><span>0{index + 1}</span><ArrowUpRight aria-hidden="true" /></div><div><h3>{project.title}</h3><span>{project.context}</span></div><p>{project.body}</p>
        </article>)}</div>
      </section>
    </div>
  );
}

export function ResumeBrief({ printable = false }: { printable?: boolean }) {
  const { basics, experience, education } = resumeData;
  const current = experience[0];
  if (printable) return <main className="brief-shell brief-print">
    <header className="brief-header"><div><h1>{basics.name}<span>{brief.title}</span></h1><p className="brief-meta">{basics.contact.location} · 在职</p></div><nav className="brief-actions no-print" aria-label="打印简历"><PrintResume /></nav></header>
    <p className="brief-intro">{brief.intro}</p><p className="brief-tools"><strong>常用工具</strong><span>{brief.tools}</span></p><CompactContent printable />
    <footer className="brief-footer"><p>{education.school} · {education.major} · {education.period}</p><p className="brief-print-contact">{basics.contact.phone} · {basics.contact.email}</p></footer>
  </main>;

  return <main className="resume-site">
    <header className="resume-topbar"><a href="#top" className="resume-brand" aria-label="秦宇，返回顶部"><strong>QY</strong><span>QIN YU<small>TEST DEVELOPMENT</small></span></a><nav aria-label="联系入口"><span><MapPin aria-hidden="true" />{basics.contact.location}</span><a href={`mailto:${basics.contact.email}`}>邮件联系</a></nav></header>
    <section id="top" className="resume-hero">
      <div className="resume-hero-orbit" aria-hidden="true"><i /><i /><i /></div>
      <div className="resume-hero-copy"><p className="resume-kicker">QIN YU / TEST DEVELOPMENT</p><h1><span>{basics.name}<small>QIN YU</small></span>测试开发<strong>工程师</strong></h1><p className="resume-lead">{brief.intro}</p>
        <div className="resume-actions"><a href="#projects-heading" className="resume-primary">查看具体实践 <ArrowDown aria-hidden="true" /></a><a href={asset("/秦宇-测试工程师.pdf")} download><Download aria-hidden="true" />下载一页简历</a></div><p className="resume-tools"><span>TOOLS</span>{brief.tools}</p></div>
      <aside className="resume-profile" aria-label="当前工作与专业方向"><div className="resume-profile-head"><p className="resume-kicker">当前工作</p><span><i />在职</span></div><h2>AOI 设备软件测试</h2><p className="resume-company">{current.company}</p><p className="resume-period">{current.period}</p>
        <div className="resume-directions">{directions.map(({ icon: Icon, ...item }) => <a href={item.href} key={item.label}><span><Icon aria-hidden="true" /></span><p><strong>{item.label}</strong><small>{item.detail}</small></p><ArrowUpRight aria-hidden="true" /></a>)}</div></aside>
    </section>
    <CompactContent />
    <footer className="resume-footer"><p>{education.school} · {education.major} · {education.period}</p><div><a href={basics.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a><a href={`tel:${basics.contact.phone}`}>电话联系</a></div></footer>
  </main>;
}
