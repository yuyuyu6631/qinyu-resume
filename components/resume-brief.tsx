import brief from "@/data/brief.json";
import { resumeData } from "@/lib/resume";
import { asset } from "@/lib/asset";
import { PrintResume } from "@/components/print-resume";

export function ResumeBrief({ printable = false }: { printable?: boolean }) {
  const { basics, experience, education } = resumeData;
  return (
    <main className={`brief-shell${printable ? " brief-print" : " brief-web"}`}>
      {!printable && <div className="folio-masthead"><a href="#top" aria-label="秦宇，返回顶部"><span className="folio-mark">Q<span>Y</span></span><span>QIN YU<span className="folio-mast-sub">个人简历 / RESUME</span></span></a><span className="folio-location"><i aria-hidden="true" />{basics.contact.location} · 在职</span></div>}
      {!printable && <header id="top" className="folio-hero">
        <div className="folio-hero-copy">
          <p className="folio-eyebrow">SOFTWARE TESTING & AUTOMATION</p>
          <h1>{basics.name}<span>{brief.title}</span></h1>
          <p className="folio-summary">{brief.intro}</p>
          <nav className="folio-actions" aria-label="联系与下载简历">
            <a className="folio-primary" href={asset("/秦宇-测试工程师.pdf")} download>下载一页简历 <span aria-hidden="true">↗</span></a>
            <a href={`mailto:${basics.contact.email}`}>邮件联系 <span aria-hidden="true">↗</span></a>
            <a href={`tel:${basics.contact.phone}`}>电话联系</a>
          </nav>
        </div>
        <div className="folio-art" aria-hidden="true">
          <svg className="folio-orbits" viewBox="0 0 360 300" fill="none"><circle cx="180" cy="150" r="120"/><circle cx="180" cy="150" r="84"/><ellipse cx="180" cy="150" rx="158" ry="52" transform="rotate(-38 180 150)"/><path d="M20 150h320M180 0v300" className="folio-axis"/><circle cx="273" cy="74" r="5" className="folio-satellite"/></svg>
          <span className="folio-monogram">QY<span>TEST / BUILD / VERIFY</span></span>
          <span className="folio-art-label folio-art-label-top">01 / 设备软件</span><span className="folio-art-label folio-art-label-bottom">02 / AI 应用 & 自动化</span>
        </div>
        <div className="folio-tools"><span>TOOLKIT</span><p>{brief.tools}</p><a href="#experience-heading">查看经历 <span aria-hidden="true">↓</span></a></div>
      </header>}
      {printable && <><header className="brief-header">
        <div>
          <h1>{basics.name}<span>{brief.title}</span></h1>
          <p className="brief-meta">{basics.contact.location} · 在职</p>
        </div>
        <nav className="brief-actions no-print" aria-label="联系与简历下载">
          <a href={`mailto:${basics.contact.email}`}>邮件联系</a>
          <a href={`tel:${basics.contact.phone}`}>电话联系</a>
          {printable ? <PrintResume /> : <a href={asset("/秦宇-测试工程师.pdf")} download className="brief-download">下载一页简历</a>}
        </nav>
      </header>
      <p className="brief-intro">{brief.intro}</p>
      <p className="brief-tools"><strong>常用工具</strong><span>{brief.tools}</span></p></>}
      <div className="brief-content">
      <section aria-labelledby="experience-heading" className="brief-section">
        <h2 id="experience-heading"><span className="folio-section-number no-print" aria-hidden="true">01</span>工作经历<span className="folio-section-caption no-print">EXPERIENCE</span></h2>
        <div className="brief-experiences">
          {brief.experience.map(item => {
            const source = experience.find(exp => exp.company === item.company)!;
            return (
              <article className="brief-job" key={item.company}>
                <div className="brief-job-meta"><h3>{item.company}</h3><p>{source.role}</p><p className="brief-period">{source.period}</p></div>
                <p className="brief-job-work">{item.points.join(" ")}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section aria-labelledby="projects-heading" className="brief-section">
        <h2 id="projects-heading"><span className="folio-section-number no-print" aria-hidden="true">02</span>两项具体实践<span className="folio-section-caption no-print">SELECTED WORK</span></h2>
        <div className="brief-projects">
          {brief.projects.map((project, index) => <article key={project.title} className="brief-project"><span className="folio-project-index no-print" aria-hidden="true">{index === 0 ? "A / TEXT-TO-SQL" : "B / TEST MANAGEMENT"}</span><div><h3>{project.title}</h3><span>{project.context}</span></div><p>{project.body}</p></article>)}
        </div>
      </section>
      </div>
      <footer className="brief-footer">
        <p>{education.school} · {education.major} · {education.period}</p>
        <a className="no-print" href={basics.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <p className="brief-print-contact">{basics.contact.phone} · {basics.contact.email}</p>
      </footer>
    </main>
  );
}
