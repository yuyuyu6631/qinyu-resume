# 秦宇 · 测试开发工程师 — 一站式简历

> AI 应用测试 · 自动化 · 半导体设备软件测试（ATE / AOI）· Windows 桌面测试

一份 `data/resume.json`，生成一整套互不打架的简历产物：**在线网站**（深挖）+ **A4 一页 PDF**（投递/打印）+ **Word 版**（可编辑）+ **ATS 纯文本**（招聘系统解析）+ **社交分享图**。内容只有一处真相，改一处、全端同步。

设计语言为**瑞士编辑风**：纸白 `#F2EEE6`、墨黑 `#17150F`、一点朱红 `#B93A22`；严格网格、发丝细线、编号索引、大字号排版，深色区块与纸白区块交替形成节奏。动画克制（滚动显现、数字、链路），并尊重 `prefers-reduced-motion`。

---

## 一分钟看懂

| 产物 | 入口 | 用途 |
| --- | --- | --- |
| 网站 | `/` | 线上面试官深挖：定位、经历、项目、AI 测试链路、能力矩阵、教育 |
| A4 一页 PDF | `public/秦宇-测试工程师.pdf` | 投递、打印、发 HR；真实文本，ATS 可解析，严格 1 页 |
| Word 版 | `public/秦宇-测试工程师.docx` | 需要改内容/走内部系统的场合，可编辑、超链接可点 |
| ATS 纯文本 | `public/秦宇-测试工程师-ATS.txt` | 招聘系统/内推表单一键粘贴 |
| A4 打印页 | `/print/` | 浏览器直接「打印 / 另存为 PDF」的源页面 |
| 分享图 | `public/og.png` | 微信/飞书/Slack 链接预览 1200×630 |

## 单一数据源架构

```
data/resume.json ──┬──> 网站（components/sections/* 直接消费）
                   ├──> A4 PDF（app/print/ → scripts/gen_pdf.mjs → Chrome CDP printToPDF）
                   ├──> DOCX（scripts/gen_docx.py → python-docx）
                   ├──> ATS 文本 + Markdown（scripts/gen_ats.py）
                   └──> OG 分享图（scripts/gen_og.mjs → Chrome 无头截图 1200×630）
```

**所有内容以真实经历为准，禁止虚构。** PDF 为「精选一页」：项目经历取 6 个中的 3 个（当前 AOI 设备软件验证、数字分身小程序自动化、中金点睛 Text-to-SQL），工作经历按一页容量做 bullet 取舍；网站保留全量 6 个案例与全部 bullet。

## 技术栈

- **Next.js 15（App Router，`output: "export"` 静态导出）+ TypeScript**
- **Tailwind CSS 3**：设计令牌（`paper / ink / accent / rule`）、编辑风工具类、A4 打印版独立样式层
- **Motion**（framer-motion 继任者）：进入与滚动显现，克制且可降级
- 字体：Geist / Geist Mono（next/font）+ 中文系统字体栈（PingFang SC / 微软雅黑）
- **GitHub Actions** 自动构建并部署 GitHub Pages

## 目录

```
resume-site/
├─ app/
│  ├─ layout.tsx        # 根布局：字体、SEO metadata、JSON-LD Person 结构化数据
│  ├─ page.tsx          # 首页：Hero → 定位 → 经历 → 项目 → AI 测试 → 能力 → 教育 → 联系
│  ├─ print/page.tsx    # A4 一页打印版（PDF 生成源，ATS 可解析）
│  ├─ not-found.tsx     # 编辑风 404
│  └─ globals.css       # 设计令牌 / 编辑风组件 / A4 打印样式
├─ components/
│  ├─ section-head.tsx  # 区块标题（编号 + 英文栏目 + 大标题 + 说明 + 墨线）
│  ├─ print-actions.tsx # 打印页屏幕工具条（不进入 PDF）
│  ├─ ui/reveal.tsx     # 滚动显现
│  └─ sections/         # nav / hero / about / experience / projects / ai-lab / capabilities / proof / contact
├─ data/resume.json     # 单一事实源
├─ lib/                 # 数据加载 / 资源路径（basePath）/ cn
├─ public/              # PDF / DOCX / ATS / og.png / favicon
├─ docs/                # DOCX、ATS、Markdown 存档
├─ scripts/             # gen_pdf.mjs / gen_docx.py / gen_ats.py / gen_og.mjs
├─ .skills/             # 简历写作技能包（高密度证据链简历法）
└─ .github/workflows/   # Pages 部署
```

## 本地开发与产物生成

```bash
npm install
npm run dev          # http://localhost:3000

npm run build        # 静态导出到 out/
npm run gen:pdf      # 由 /print 生成 A4 一页 PDF（需先 build；Chrome CDP printToPDF）
npm run gen:all      # 生成 ATS 文本 + Markdown + DOCX（需要 Python + python-docx）
npm run gen:og       # 生成 1200×630 分享图
npm run gen:assets   # 上面全部
```

依赖：Node 20+；生成 DOCX 需要 Python 3 + `python-docx`；生成 PDF/OG 需要本机 Chrome 或 Edge。

## 内容与写作口径

内容遵循 `.skills/` 中的「高密度证据链简历法」：每条经历是 `动作 + 工具/方法 + 结果` 的证据单元，删除套话，能通过面试压力测试才保留。设计上区分：

- **网站**：完整叙事，包含测试方法（01）、AI 测试链路（04）、能力矩阵（05）与可验证产出（06）；
- **PDF**：一页以内完成「我是谁 / 数据 / 技能 / 经历 / 项目 / 教育」，只保留 HR 30 秒需要的信息；
- **DOCX / ATS**：全量、纯文本优先，保证机器可读。

## 部署

推送 `main` 后 GitHub Actions 自动构建并部署到 GitHub Pages：

- 线上地址：<https://yuyuyu6631.github.io/qinyu-resume/>
- 源码仓库：<https://github.com/yuyuyu6631/qinyu-resume>（`main` = 当前版本；`legacy-vite` = 旧版备份）

CI 中通过 `NEXT_PUBLIC_BASE_PATH=/qinyu-resume` 注入子路径；站内链接与下载一律走 `lib/asset.ts` 的 `asset()` / `route()`，避免 Pages 子路径下失效。

## 设计说明

- **配色**：纸白底 + 墨黑字，朱红只做「编号、句点、强调词、细线」四类点缀，不做大面积彩色；
- **网格**：12 栏容器、统一发丝线（1px `--rule`）、区块编号 01–07；
- **排版**：Hero 汉字超大字重（clamp 4.6–10rem）、正文 13–13.5px / 1.85 行高、元信息全部等宽大写小字；
- **反差点**：AI 测试与联系两个深色区块把长页面切成三段，避免「白底长滚动」的疲劳；
- **打印**：`/print` 为真实 A4 纸张（210×297mm），PDF 通过 `preferCSSPageSize` 输出单页，不靠缩放了事。
