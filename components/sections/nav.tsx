"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { resumeData } from "@/lib/resume";
import { asset } from "@/lib/asset";

const links = [
  { href: "#about", no: "01", label: "定位" },
  { href: "#experience", no: "02", label: "经历" },
  { href: "#projects", no: "03", label: "项目" },
  { href: "#ai-lab", no: "04", label: "AI 测试" },
  { href: "#capabilities", no: "05", label: "能力" },
  { href: "#proof", no: "06", label: "教育" },
  { href: "#contact", no: "07", label: "联系" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-42% 0px -52% 0px" }
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-paper/85 backdrop-blur-md transition-colors duration-300",
        scrolled ? "border-rule" : "border-transparent"
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6">
        {/* 标识 */}
        <a href="#top" className="group flex items-center gap-3" aria-label="回到顶部">
          <span className="grid size-8 place-items-center bg-ink font-mono text-[13px] font-bold text-paper transition-colors duration-200 group-hover:bg-accent">
            秦
          </span>
          <span className="flex flex-col">
            <span className="text-[14px] font-bold leading-none tracking-wide">
              {resumeData.basics.name}
            </span>
            <span className="mt-1 font-mono text-[9px] uppercase leading-none tracking-[0.18em] text-ink-faint">
              Test Development Engineer
            </span>
          </span>
        </a>

        {/* 桌面导航 */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="主导航">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "group inline-flex items-baseline gap-1.5 text-[13px] transition-colors duration-150",
                active === l.href ? "text-ink" : "text-ink-faint hover:text-ink"
              )}
            >
              <span
                className={cn(
                  "font-mono text-[9px] leading-none transition-colors duration-150",
                  active === l.href ? "text-accent" : "text-ink-faint/60 group-hover:text-accent"
                )}
              >
                {l.no}
              </span>
              {l.label}
            </a>
          ))}
        </nav>

        {/* 动作区 */}
        <div className="flex items-center gap-2">
          <a
            href={asset("/秦宇-测试工程师.pdf")}
            download
            className="hidden items-center gap-2 bg-ink px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-paper transition-colors duration-200 hover:bg-accent sm:inline-flex"
          >
            下载 PDF
            <span aria-hidden="true">↓</span>
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center border border-rule text-ink transition-colors hover:border-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "关闭菜单" : "打开菜单"}
          >
            <span className="relative block h-[10px] w-4">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-200",
                  open && "translate-y-[4.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px w-full bg-ink transition-transform duration-200",
                  open && "-translate-y-[4.5px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-rule bg-paper lg:hidden"
          aria-label="移动端导航"
        >
          <div className="container-x grid grid-cols-2 gap-px py-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-2 border-b border-rule/60 py-3.5 text-[15px] text-ink-soft transition-colors hover:text-ink"
              >
                <span className="font-mono text-[9px] text-accent">{l.no}</span>
                {l.label}
              </a>
            ))}
          </div>
          <div className="container-x pb-4 pt-1">
            <a
              href={asset("/秦宇-测试工程师.pdf")}
              download
              onClick={() => setOpen(false)}
              className="flex items-center justify-between bg-ink px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-paper"
            >
              下载 PDF 简历
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
