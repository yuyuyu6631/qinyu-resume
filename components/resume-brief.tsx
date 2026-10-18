import brief from "@/data/brief.json";
import { resumeData } from "@/lib/resume";
import { asset } from "@/lib/asset";
import { PrintResume } from "@/components/print-resume";

export function ResumeBrief({ printable = false }: { printable?: boolean }) {
  const { basics, experience, education } = resumeData;
  return (
    <main className={`brief-shell${printable ? " brief-print" : ""}`}>
      <header className="brief-header">
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
      <p className="brief-tools"><strong>常用工具</strong><span>{brief.tools}</span></p>
      <section aria-labelledby="experience-heading" className="brief-section">
        <h2 id="experience-heading">工作经历</h2>
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
        <h2 id="projects-heading">两项具体实践</h2>
        <div className="brief-projects">
          {brief.projects.map(project => <article key={project.title} className="brief-project"><div><h3>{project.title}</h3><span>{project.context}</span></div><p>{project.body}</p></article>)}
        </div>
      </section>
      <footer className="brief-footer">
        <p>{education.school} · {education.major} · {education.period}</p>
        <a className="no-print" href={basics.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <p className="brief-print-contact">{basics.contact.phone} · {basics.contact.email}</p>
      </footer>
    </main>
  );
}
