# .skills — 简历写作技能包

本目录是简历内容生成与审查的**方法论技能包**，供本仓库的简历（`index.html` 网站版 / `resume.html` PDF 版）迭代使用。

## 来源与许可

- 上游仓库：[zhanfoguang/high-density-resume](https://github.com/zhanfoguang/high-density-resume)（MIT License，见 `LICENSE`）
- 安装方式：项目级目录复制（本目录），兼容 Claude Code / Codex / OpenClaw 等任何支持 `SKILL.md` 的 agent；也可用 `npx skills add zhanfoguang/high-density-resume@high-density-resume` 全局安装

## 包含内容

| 目录 | 作用 | 何时用 |
|---|---|---|
| `high-density-resume/` | **高密度证据链简历法**（主技能）：五步法（挖料 → 搭骨架 → 写血肉 → 排兵布阵 → 修门面），证据单元公式 `动作 + 工具/方法 + 结果`，套话删除、压力测试、双 AI 交叉审稿 | 写 / 改 / 审 / 压测任何一段简历内容 |
| `resume-evidence-matcher/` | **JD 证据匹配**：把具体岗位 JD 与简历母版做证据覆盖分析，定位材料缺口与定制优先级 | 投递具体岗位前 |
| `docs/` | 完整方法论：`method.md`（五步法）、`rubric.md`（简历评分表）、`hr-machine-screening.md`（HR/机器筛选规则）、`user-entry-workflows.md`（入口分流）等 | 人工阅读参考 |
| `templates/` | `resume-template.md`、`ats-friendly-resume-template.md`（ATS 友好模板）、`review-checklist.md`（审查清单） | 结构化产出与自检 |

## 用法

- **Agent 驱动**：在 Claude Code / Codex 中让模型加载 `high-density-resume/SKILL.md` 后执行改写/审查
- **人工参考**：改简历前先读 `docs/method.md`，改完用 `templates/review-checklist.md` 自检

## 与本站生成流程的关系

```
真实经历（事实为主，不编造）
  → high-density-resume 五步法：挖料 → 证据单元（动作+工具/方法+结果）
  → shuorenhua「说人话」复核（判场景 → 保护事实与术语 → 删空话 → 还原动作）
  → 输出到 index.html（网站版）+ resume.html（PDF 版，Edge/Chrome 无头生成 PDF）
  → review-checklist.md 压力测试：每条经历能否在面试中 3 秒内讲清
```
