import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { resumeData } from "@/lib/resume";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl = "https://yuyuyu6631.github.io/qinyu-resume";
const b = resumeData.basics;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${b.name} · ${b.brand.primary} — 个人简历`,
  description:
    `${b.name}，${b.title}。专注 AI 应用测试（LLM-to-SQL / Agent Workflow / Tool Calling）、接口与 UI 自动化，拥有半导体 ATE 上位机测试经验。1000+ 用例 · 50+ API 自动巡检。`,
  keywords: [
    "测试开发工程师", "AI 测试", "软件测试", "ATE 上位机测试", "半导体测试",
    "Python", "Pytest", "Playwright", "接口自动化", "LLM-to-SQL", "Agent 测试", "深圳",
  ],
  authors: [{ name: b.name }],
  openGraph: {
    type: "profile",
    locale: "zh_CN",
    url: siteUrl,
    siteName: `${b.name} · Resume`,
    title: `${b.name} · ${b.brand.primary} — 个人简历`,
    description: `${b.brand.primary} · AI Testing · Automation · ATE / Semiconductor。${b.positioning}`,
    images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: `${b.name} · ${b.brand.primary}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${b.name} · ${b.brand.primary}`,
    description: `${b.brand.primary} · AI Testing · Automation · ATE / Semiconductor`,
    images: [`${siteUrl}/og.png`],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: b.name,
    jobTitle: b.title,
    telephone: b.contact.phone,
    email: b.contact.email,
    address: { "@type": "PostalAddress", addressLocality: b.contact.location },
    url: siteUrl,
    knowsAbout: [
      "软件测试", "测试开发", "AI 应用测试", "LLM-to-SQL", "Agent Workflow",
      "Tool Calling", "接口自动化", "UI 自动化", "ATE 上位机测试", "Python", "Pytest", "Playwright",
    ],
  };
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        {children}
      </body>
    </html>
  );
}
