# 秦宇 · Test Development Engineer — 个人品牌简历网站

> AI 应用测试 · 自动化 · 半导体 ATE 上位机测试 · Windows 桌面测试

个人品牌简历网站 v2：以**测试开发工程师 + AI 应用测试**为核心定位，采用现代工程师作品集的设计语言（Apple / Vercel / Linear 风格），并实现 **单一数据源驱动多端输出**——一份 `resume.json` 同时生成网站、ATS 可解析 PDF、正式 DOCX、纯文本 ATS 版与 Markdown 数据源。

## 技术栈

- **Next.js 15（App Router，静态导出 `output: export`）+ TypeScript**
- **Tailwind CSS**（设计令牌化，shadcn/ui 风格组件：button / badge / card / separator）
- **Motion**（framer-motion 继任者）：页面进入、滚动显现、数字递增，全部克制且尊重 `prefers-reduced-motion`
- 无 UI 框架之外的运行时依赖；无字体下载依赖（Geist 经 next/font 优化，中文走系统字体栈）
- **GitHub Actions** 自动构建并部署 GitHub Pages

## 单一数据源架构

```
data/resume.json ──┬──> 网站（components/* 直接消费）
                   ├──> A4 PDF（app/print/ 打印页 → scripts/gen_pdf.ps1 → Chrome 无头）
                   ├──> DOCX（scripts/gen_docx.py → python-docx）
                   ├──> ATS 纯文本（scripts/gen_ats.py → docs/ats/resume.txt）
                   └──> Markdown 数据源（scripts/gen_ats.py → docs/resume.md）
```

改内容只改 `data/resume.json` 一处，其余全部产物重新生成。**所有内容以真实经历为准，禁止虚构。**

## 目录结构

```
resume-site/
├── app/
│   ├── layout.tsx        # 根布局：字体、SEO metadata、JSON-LD 结构化数据
│   ├── page.tsx          # 首页（Hero / 经历 / 项目 / AI Lab / 能力 / 证明 / 教育 / 联系）
│   ├── print/page.tsx    # A4 打印版（PDF 生成源，ATS 可解析）
│   └── globals.css       # 设计令牌与打印样式
├── components/
│   ├── ui/               # shadcn/ui 风格基础组件
│   └── sections/         # Nav / Hero / Experience / Projects / AiLab / Capabilities / Proof / Education / Contact
├── data/resume.json      # 单一事实源
├── lib/                  # 数据加载、工具函数、资源路径
├── public/               # 简历 PDF / DOCX / favicon / og 图
├── docs/                 # ATS 版、Markdown 数据源
├── scripts/              # PDF / DOCX / ATS 生成脚本
├── .skills/              # 简历写作技能包（高密度证据链简历法）
├── .github/workflows/    # Pages 部署
└── README.md
```

## 本地开发

```bash
npm install
npm run dev        # http://localhost:3000
```

## 构建与文档生成

```bash
npm run build      # 静态导出到 out/
npm run gen:all    # 生成 ATS 文本 + Markdown 数据源 + DOCX
npm run gen:pdf    # 由 /print 打印页生成 ATS 可解析 PDF（需先 build）
```

生成的 PDF / DOCX 位于 `public/`（网站下载用）与 `docs/`（存档）。

## 部署

推送 `main` 分支后 GitHub Actions 自动构建并部署到 GitHub Pages：

- 线上地址：<https://yuyuyu6631.github.io/qinyu-resume/>
- 源码仓库：<https://github.com/yuyuyu6631/qinyu-resume>（`main` = 本站；`legacy-vite` = 旧版 React 备份）

## 设计说明

- 视觉语言：白底墨黑、1px 细线、大留白、精确网格、微妙光效；无彩色噪声、无廉价粒子/3D
- 排版：Geist（拉丁/数字，tabular-nums）+ 系统中文栈（PingFang / 微软雅黑）
- 动画：Motion 驱动的进入与滚动显现、数字递增、AI Lab 流程链，全部服务于信息层级
- 可访问性：focus-visible 焦点环、ARIA 标签、`prefers-reduced-motion` 降级、打印样式

## 简历写作方法论

内容生成遵循 `.skills/` 中的「高密度证据链简历法」：每条经历都是 `动作 + 工具/方法 + 结果` 证据单元，删除套话，面试压力测试通过才保留。
