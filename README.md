# 秦宇简历网站

首页只保留工作经历、两项具体实践、常用工具和教育信息。网页与打印页共用同一个组件，PDF 与 Word 为一页简历。

- `data/brief.json`：当前呈现的精简正文。
- `data/resume.json`：公司、岗位、任职日期与教育信息。历史长版内容仍保留在数据中，不在首页重复展示。
- `components/resume-brief.tsx`：首页与 `/print/` 共用页面。
- `scripts/gen_brief.mjs`：生成一页 Word、ATS 文字和 Markdown。

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm run gen:all
```

PDF 由 `/print/` 页面打印生成；Windows 可使用 `npm run gen:pdf`。PDF 与 DOCX 放在 `public/` 供网站下载。更新文案后需重新生成下载文件。

推送 `main` 会自动构建并部署至 https://yuyuyu6631.github.io/qinyu-resume/ 。

本次检查：360/390/768/1440px 无横向溢出；390px 页面高约 1230px；主页面两节内容；浏览器生成的 PDF 及 LibreOffice 渲染的 Word 均为一页。页面、打印页和 Word 已检查截图。类型检查与生产构建通过。
