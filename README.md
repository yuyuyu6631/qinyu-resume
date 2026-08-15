# 秦宇 · 测试工程师 — 个人简历网站

基于 PDF 简历《秦宇-测试工程师.pdf》构建的个人简历单页网站。**纯 HTML / CSS / JavaScript 实现，零运行时依赖**，可直接双击打开，也可一键部署到 GitHub Pages。

## ✨ 设计风格：中式编辑排版（面向中文读者）

- **白底墨黑**：白色背景（`#ffffff`）+ 1px 浅灰细线（`#e7e7e7`）分区，**工程蓝**（`#1e4fd8`）标色关键数字与术语，校对红（`#e5484d`）仅用于印章/专项徽章点缀
- **中文优先**：正文黑体（PingFang / 微软雅黑）、宋体大标题，等宽字体（JetBrains Mono）用于日期、编号与坐标；无大写英文装饰
- **信息前置**：首屏 = 求职定位 + 打字机角色标题 + 一句人话介绍 + 黑底反色档案卡（求职意向 / 经验 / 薪资 / 联系方式 / 坐标牌 + 旋转印章）
- **关键成果数字条**：1000+ 用例 / 50+ API 巡检 / 10+ 站点 / 4 条产品线，滚入视口时数字递增
- **标签化技能**：技能区用「分组 + 标签 + 熟练度徽章」呈现，HR 3 秒扫完关键词（不用自评百分比条）
- 编号章节（01/02/03…）、直角分区 + 细分割线，无渐变、无霓虹、无玻璃拟态
- 深色页脚（黑底反色）收尾，联系方式与简历下载集中呈现

## ✨ 动态效果（克制、自研、零依赖）

- **浅色粒子背景**：低对比度连线粒子 + 鼠标交互连线（自研 Canvas 实现，配色适配白底纸感风格）
- **打字机循环角色标题**：软件测试工程师 / 测试开发工程师 / AI 应用测试 / 接口自动化，四角色循环输入删除（自研，无依赖）
- IntersectionObserver 滚动显现（`.reveal` 元素进入视口淡入上浮）
- 数字递增动画（1000+ 用例 / 50+ API 巡检 / 10+ 站点 / 4 条产品线）
- 技能标签 hover 边框加深、按钮 / 链接 hover 反馈、回到顶部按钮滚动显现
- 导航滚动跟随高亮当前章节（scrollspy）
- 响应式布局 + 移动端汉堡菜单 + 打印友好样式（`@media print` 可直接导出 PDF）
- 尊重 `prefers-reduced-motion`：动画全部降级为静态呈现

## 🧠 文案协作方式

正文文案（网站 + PDF 简历）由 [shuorenhua「说人话」Skill](https://github.com/MrGeDiao/shuorenhua) 的流程改写：判场景 → 保护事实与术语（数字、公司、工具名、日期一个不改）→ 删空话收尾与名词化 → 把动作还原成「谁做了什么、怎么做的、结果是什么」。

## 📁 目录结构

```
resume-site/
├── index.html          # 页面结构（含全部简历内容）
├── resume.html         # A4 打印版简历（生成 PDF 的源文件）
├── css/style.css       # 中式编辑排版样式与设计变量
├── js/main.js          # 交互脚本（粒子背景 / 打字机 / 滚动动画等）
├── assets/
│   └── 秦宇-测试工程师.pdf  # 简历 PDF（供下载，由 resume.html 打印生成）
├── deploy.bat          # 一键发布入口（Windows 双击）
├── deploy.ps1          # 一键发布脚本（提交并推送 main）
├── .gitignore
└── README.md
```

## 🚀 本地预览

直接双击 `index.html` 即可打开（Google Fonts 离线时自动降级系统字体），或使用本地服务：

```bash
cd resume-site
python -m http.server 8080
# 访问 http://localhost:8080
```

## 🌐 线上地址与同步发布

- **线上地址**：<https://yuyuyu6631.github.io/qinyu-resume/>
- 源码仓库：<https://github.com/yuyuyu6631/qinyu-resume>（`main` 分支 = 网站源码；`legacy-vite` 分支 = 旧版 React 项目备份）

**本地更新后同步上线**：双击 `deploy.bat`（或在目录内执行 `.\deploy.ps1 "提交说明"`），脚本会自动提交并推送到 GitHub，Pages 在 1-2 分钟内自动更新，无需手动操作网页。

## 🎨 参考项目（GitHub stars 均 ≥ 1000，经 GitHub API 验证）

**简历 / 作品集模板（信息架构与排版参考）：**

| 项目 | Stars | 借鉴点 |
|---|---|---|
| [amruthpillai/Reactive-Resume](https://github.com/amruthpillai/Reactive-Resume) | 40.3k | 简历信息组织方式、档案卡排版 |
| [salomonelli/best-resume-ever](https://github.com/salomonelli/best-resume-ever) | 16.5k | 多主题简历的层级与分区 |
| [bchiang7/v4](https://github.com/bchiang7/v4) | 8.3k | 极简编辑风排版、导航与信息密度 |
| [saadpasta/developerFolio](https://github.com/saadpasta/developerFolio) | 6.6k | 技能区划分与项目展示结构 |
| [RyanFitzgerald/devportfolio](https://github.com/RyanFitzgerald/devportfolio) | 5.0k | 极简现代单页布局 |
| [rammcodes/Dopefolio](https://github.com/rammcodes/Dopefolio) | 3.7k | 项目卡片动效与 hover 交互 |
| [StartBootstrap/startbootstrap-resume](https://github.com/StartBootstrap/startbootstrap-resume) | 2.2k | 简历侧栏信息卡布局 |

**动效库（仅作效果参考，本站为自研轻量实现）：**

| 项目 | Stars | 对应效果 |
|---|---|---|
| [michalsnik/aos](https://github.com/michalsnik/aos) | 28.1k | 滚动显现动画 |
| [greensock/GSAP](https://github.com/greensock/GSAP) | 27.7k | 时间线动画思路 |
| [jlmakes/scrollreveal](https://github.com/jlmakes/scrollreveal) | 22.5k | 滚动显现动画 |
| [mattboldt/typed.js](https://github.com/mattboldt/typed.js) | 16.3k | 打字机效果 |
| [darkroomengineering/lenis](https://github.com/darkroomengineering/lenis) | 15.4k | 平滑滚动（未启用，保持克制） |
| [locomotivemtl/locomotive-scroll](https://github.com/locomotivemtl/locomotive-scroll) | 8.8k | 视口元素检测 |

## ✍️ 定制指南

- **改内容**：编辑 `index.html` 中对应 section 的文本即可；PDF 简历改 `resume.html`，再用 Edge 无头模式重新生成：
  `msedge --headless=new --no-pdf-header-footer --print-to-pdf=assets/秦宇-测试工程师.pdf resume.html`
- **改颜色**：修改 `css/style.css` 顶部 `:root` 中的设计变量（`--bg` 背景 / `--ink` 墨色 / `--accent` 强调色 / `--red` 印章红）。
- **改技能标签**：在 `index.html` 的 `.skill-chips` 里增删 `<span>` 项即可，熟练度改 `.level` 徽章（`level-mid` / `level-special` 变体）。
- **改关键数字**：调整 `.stat-num` 的 `data-count` 属性（数字动画目标值）与 `data-suffix`（后缀）。
- **改打字机文案**：编辑 `js/main.js` 中 `roles` 数组即可。
