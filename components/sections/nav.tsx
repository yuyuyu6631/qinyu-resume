"use client";

import { useEffect, useState } from "react";
import { Menu, X, Download, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { resumeData } from "@/lib/resume";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#experience", label: "经历" },
  { href: "#projects", label: "项目" },
  { href: "#ai-lab", label: "AI Lab" },
  { href: "#capabilities", label: "能力" },
  { href: "#proof", label: "证明" },
  { href: "#contact", label: "联系" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
      { rootMargin: "-40% 0px -55% 0px" }
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
        "sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md transition-colors duration-200",
        scrolled ? "border-border" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="回到顶部">
          <span className="grid size-8 place-items-center rounded-full bg-ink font-sans text-[13px] font-semibold text-background">
            {resumeData.basics.name.slice(0, 1)}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            {resumeData.basics.name}
            <span className="ml-2 font-mono text-xs font-normal text-ink-faint">
              {resumeData.basics.brand.primary}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="主导航">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "text-[13.5px] transition-colors duration-150",
                active === l.href ? "text-ink" : "text-ink-faint hover:text-ink"
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={resumeData.basics.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub 仓库"
            className="grid size-10 place-items-center rounded-full text-ink-faint transition-colors hover:bg-muted hover:text-ink"
          >
            <Github className="size-[18px]" />
          </a>
          <Button size="sm" variant="outline" className="hidden sm:inline-flex">
            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/秦宇-测试工程师.pdf`} download className="flex items-center gap-2">
              <Download className="size-3.5" />
              下载简历
            </a>
          </Button>
          <button
            className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-muted md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "关闭菜单" : "打开菜单"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t bg-background/95 px-5 py-4 backdrop-blur-md md:hidden"
          aria-label="移动端导航"
        >
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-[15px] text-ink-soft transition-colors hover:bg-muted"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/秦宇-测试工程师.pdf`}
                download
                className="flex items-center gap-2 rounded-md bg-ink px-3 py-2.5 text-[15px] font-medium text-background"
              >
                <Download className="size-4" />
                下载简历 PDF
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
