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
  title: `${b.name} · ${b.title}｜AI 应用测试 · 自动化 · 半导体设备（ATE / AOI）`,
  description:
    `${b.name}，${b.title}。软件工程本科，1 年+测试 / 测试开发经验：半导体设备软件测试（ATE 上位机 / AOI 光学检测）+ AI 智能体平台 1000+ 用例与 50+ API 自动巡检。专注 AI 应用测试、接口与 UI 自动化。`,
  keywords: [
    "秦宇", "测试开发工程师", "软件测试", "AI 测试", "AI 应用测试", "ATE 上位机测试",
    "AOI 设备测试", "半导体设备软件测试", "Python", "Pytest", "Playwright", "接口自动化",
    "LLM-to-SQL", "Agent 测试", "MeterSphere", "珠海", "简历",
  ],
  authors: [{ name: b.name }],
  creator: b.name,
  openGraph: {
    type: "profile",
    locale: "zh_CN",
    url: siteUrl,
    siteName: `${b.name} · ${b.title}`,
    title: `${b.name} · ${b.title}`,
    description: `${b.brand.primary} · ${b.brand.subs.join(" · ")}。${b.positioning}`,
    images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: `${b.name} · ${b.title}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${b.name} · ${b.title}`,
    description: `${b.brand.primary} · ${b.brand.subs.join(" · ")}`,
    images: [`${siteUrl}/og.png`],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F2EEE6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: b.name,
    alternateName: b.nameEn,
    jobTitle: b.title,
    telephone: b.contact.phone,
    email: b.contact.email,
    address: { "@type": "PostalAddress", addressLocality: b.contact.location },
    url: siteUrl,
    sameAs: [b.contact.github, siteUrl],
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
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
