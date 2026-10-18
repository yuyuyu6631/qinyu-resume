import { resumeData } from "@/lib/resume";
import { asset } from "@/lib/asset";

const contactRows = (b: typeof resumeData.basics) => [
  { label: "TEL", value: b.contact.phone, href: `tel:${b.contact.phone}` },
  { label: "EMAIL", value: b.contact.email, href: `mailto:${b.contact.email}` },
  { label: "GITHUB", value: "yuyuyu6631/qinyu-resume", href: b.contact.github },
  { label: "CITY", value: b.contact.location, href: undefined },
];

const downloads = [
  { label: "PDF", desc: "A4 一页 · 投递/打印", href: asset("/秦宇-测试工程师.pdf"), arrow: "↓" },
  { label: "DOCX", desc: "Word 版 · 可编辑", href: asset("/秦宇-测试工程师.docx"), arrow: "↓" },
  { label: "ATS", desc: "纯文本 · 系统解析", href: asset("/秦宇-测试工程师-ATS.txt"), arrow: "↓" },
  { label: "WEB", desc: "本页 · 在线深挖", href: "#top", arrow: "↑" },
];

/** 07 · 联系与一站式下载 */
export function Contact() {
  const b = resumeData.basics;
  return (
    <section id="contact" className="bg-ink text-paper">
      <div className="container-x section-pad">
        <div className="flex items-baseline justify-between border-b border-paper/25 pb-3">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] leading-none text-accent">(07)</span>
            <span className="font-mono text-[10.5px] uppercase leading-none tracking-label text-paper/50">
              contact / 联系
            </span>
          </div>
          <span className="hidden font-mono text-[10.5px] uppercase tracking-label text-paper/40 sm:block">
            open to 测试开发 / 测试工程师
          </span>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
          <h2 className="text-[clamp(2.4rem,7vw,5rem)] font-extrabold leading-[0.95] tracking-tightest md:col-span-8">
            期待与您
            <br />
            交流<span className="text-accent">。</span>
          </h2>
          <p className="text-[13px] leading-[1.85] text-paper/60 md:col-span-4">
            正在寻找深圳地区测试开发 / 测试工程师机会。
            <br />
            简历可直接下载，也欢迎直接电话或邮件联系。
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-16">
          {/* 联系方式 */}
          <div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-paper/40">
              direct
            </p>
            <div className="mt-3 border-t border-paper/20">
              {contactRows(b).map((row) => {
                const inner = (
                  <>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-paper/40">
                      {row.label}
                    </span>
                    <span className="font-mono text-[13px] tracking-[0.02em] text-paper/90 transition-colors duration-200 group-hover:text-accent">
                      {row.value}
                    </span>
                  </>
                );
                return row.href ? (
                  <a
                    key={row.label}
                    href={row.href}
                    target={row.href.startsWith("http") ? "_blank" : undefined}
                    rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-baseline justify-between gap-4 border-b border-paper/15 py-3.5"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b border-paper/15 py-3.5"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 一站式下载 */}
          <div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-paper/40">
              one-stop / 下载
            </p>
            <div className="mt-3 grid grid-cols-2 gap-px bg-paper/15">
              {downloads.map((d) => (
                <a
                  key={d.label}
                  href={d.href}
                  download={d.href.includes(".") ? true : undefined}
                  className="group flex flex-col justify-between gap-6 bg-ink p-4 transition-colors duration-200 hover:bg-paper/[0.06]"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[15px] font-bold tracking-[0.08em] text-paper">
                      {d.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-[12px] text-paper/40 transition-colors group-hover:text-accent"
                    >
                      {d.arrow}
                    </span>
                  </div>
                  <span className="text-[10.5px] leading-snug text-paper/45">{d.desc}</span>
                </a>
              ))}
            </div>
            <p className="mt-3 font-mono text-[9.5px] leading-relaxed tracking-[0.04em] text-paper/35">
              全部产物由 resume.json 单一数据源生成 · 内容与网站一致
            </p>
          </div>
        </div>

        {/* 页脚 */}
        <footer className="mt-14 flex flex-col gap-3 border-t border-paper/20 pt-5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-paper/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {b.name} · {b.title}</p>
          <p className="hidden md:block">next.js · typescript · tailwind · motion</p>
          <a href="#top" className="transition-colors hover:text-paper">
            回到顶部 ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
