# 简历网站视觉与交互设计

2026-10-18

## 信息层级

面向招聘者的浏览顺序为岗位与姓名、当前工作、项目与结果、具体测试方法。首屏采用双栏：左侧为职业定位与项目、简历入口，右侧为当前工作及三个实践方向。手机端依次展示，主要按钮保留在首屏内容中。四个统计项的标题保留相同高度，使数字基线对齐。

使用暖白背景、深蓝文字与单一蓝色强调色。强调色用于主操作、当前导航和实践方向；正文保持克制。容器统一为 max-w-6xl，使用相同左右边距。补齐中文无衬线字体回退，避免依赖未定义的字体变量。

## 交互与实现

- 首屏直接输出 HTML，不依赖进入动画才显示内容。
- 项目按设备软件、AI 应用、自动化、测试工具筛选，提供数量反馈及 aria-pressed 状态。
- 使用原生 details / summary 展开测试方法，保留键盘操作，先呈现问题与结果。
- 下载入口使用链接，修正按钮内嵌链接的嵌套交互问题。
- 移动导航、筛选和主要操作保留至少 44px 的点击高度；导航在 1024px 以下收起。
- 导航支持当前段落状态、Escape 关闭和焦点返回；增加跳至内容入口。
- 保留清晰的键盘焦点，深色区使用浅色焦点环；提高深色区辅助文字的对比度。
- 尊重减少动态效果偏好，并提供 JavaScript 不可用时的内容显示回退。

## 内容边界

按实际工作、验证方法与交付记录描述经历，去掉学习或培训式表达。设备案例概括为功能验证、成像结果核查与问题追踪，不包含内部操作参数或流程细节。增加测试管理系统设计实践，不宣称已经交付未确认的后端、多人同步能力或效率指标。网站保留完整案例，Word 与 PDF 投递版聚焦核心技能、工作经历和两项代表项目。

## 参考来源

- Nielsen Norman Group — Visual Hierarchy in UX: Definition: https://www.nngroup.com/articles/visual-hierarchy-ux-definition/
- Nielsen Norman Group — First Impressions Matter: https://www.nngroup.com/articles/first-impressions-human-automaticity/
- W3C — Understanding Target Size (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- W3C — Understanding Focus Visible: https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html

检索与页面读取使用 Firecrawl。视觉层级参考颜色对比、尺度与内容分组原则，44px 操作高度是本网站采用的设计选择，并非将 WCAG 2.5.8 的最低要求误写为 44px。

## 本次验证

- `npm run typecheck`、带 `/qinyu-resume` 路径前缀的生产构建与 `git diff --check` 通过。
- Chromium 下检查 360、390、768、1024、1440px 视口，未发现横向溢出。
- 检查移动菜单开关、Escape 与焦点返回、导航跳转、五类筛选与数量反馈、键盘展开项目方法。
- axe 自动检查 WCAG A/AA 相关规则未返回违规项；已修复深色区辅助文字的对比度问题。
- JavaScript 关闭时，经历与全部项目仍可阅读；PDF、DOCX 下载响应正常，无浏览器脚本异常。
- 桌面及手机首屏、手机项目区已截图检查；更新后的三页 Word/PDF 已逐页渲染检查。
