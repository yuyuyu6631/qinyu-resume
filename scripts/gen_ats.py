# -*- coding: utf-8 -*-
"""从 data/resume.json 生成 ATS 纯文本版与 Markdown 数据源版。
用法: py scripts/gen_ats.py
输出: docs/ats/resume.txt（ATS 版）、docs/resume.md（Markdown 数据源）
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with open(os.path.join(ROOT, "data", "resume.json"), encoding="utf-8") as f:
    R = json.load(f)

b = R["basics"]


def build_lines() -> list:
    L = []
    L.append(f"{b['name']} - {b['brand']['primary']}")
    L.append("")
    L.append(f"{b['brand']['primary']} | {' | '.join(b['brand']['subs'])}")
    L.append("")
    L.append(
        f"电话: {b['contact']['phone']} | 邮箱: {b['contact']['email']} | "
        f"GitHub: {b['contact']['github']} | 城市: {b['contact']['location']} | "
        f"期望薪资: {b['contact']['salary']} | {b['contact']['availability']}"
    )
    L.append("")
    L.append("职业定位")
    L.append(b["positioning"])
    L.append(b["summary"])
    L.append("")
    L.append("核心亮点")
    for h in R["highlights"]:
        L.append(f"- {h['value']} {h['label']}（{h['sub']}）")
    L.append("")
    L.append("专业技能")
    for cap in R["capabilities"]:
        techs = cap["techs"].join(" / ") if isinstance(cap["techs"], str) else " / ".join(cap["techs"])
        L.append(f"- {cap['name']}（{cap['level']}）: {techs}")
    L.append("")
    L.append("工作经历")
    for exp in R["experience"]:
        L.append(f"- {exp['company']} | {exp['role']} | {exp['period']} | {exp['industry']}")
        for b2 in exp["bullets"]:
            L.append(f"  * {b2['lead']}: {b2['text']}")
    L.append("")
    L.append("项目经历")
    for pr in R["projects"]:
        L.append(f"- {pr['title']} | {pr['badge']} | {pr['period']} | {pr['category']}")
        L.append(f"  * 问题与方法: {pr['problem']} {pr['approach']}")
        for s in pr["strategy"]:
            L.append(f"  * {s}")
        L.append(f"  * 结果: {pr['result']}")
    L.append("")
    L.append("AI 应用测试方法论")
    for d in R["aiLab"]["directions"]:
        L.append(f"- {d['name']}: {'；'.join(d['points'])}（{d['evidence']}）")
    L.append("")
    edu = R["education"]
    L.append(f"教育: {edu['school']} | {edu['major']} | {edu['period']}")
    L.append(f"荣誉与证书: {edu['extras']}")
    return L


def main():
    lines = build_lines()
    ats_dir = os.path.join(ROOT, "docs", "ats")
    os.makedirs(ats_dir, exist_ok=True)
    ats_path = os.path.join(ats_dir, "resume.txt")
    with open(ats_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"ATS 文本已生成: {ats_path}")

    # Markdown 数据源
    md = []
    md.append(f"# {b['name']} · {b['brand']['primary']}\n")
    md.append(f"> {b['brand']['primary']} · {' · '.join(b['brand']['subs'])}\n")
    md.append(f"> 电话 {b['contact']['phone']} · 邮箱 {b['contact']['email']} · GitHub {b['contact']['github']}\n")
    md.append(f"> {b['contact']['location']} · {b['contact']['salary']} · {b['contact']['availability']}\n")
    md.append("\n## 职业定位\n")
    md.append(f"{b['positioning']}\n")
    md.append(f"{b['summary']}\n")
    md.append("\n## 核心亮点\n")
    for h in R["highlights"]:
        md.append(f"- **{h['value']}** {h['label']}（{h['sub']}）\n")
    md.append("\n## 专业技能\n")
    for cap in R["capabilities"]:
        techs = cap["techs"].join(" / ") if isinstance(cap["techs"], str) else " / ".join(cap["techs"])
        md.append(f"- **{cap['name']}**（{cap['level']}）：{techs}\n")
    md.append("\n## 工作经历\n")
    for exp in R["experience"]:
        md.append(f"### {exp['company']} · {exp['role']} · {exp['period']}\n")
        md.append(f"_{exp['industry']}_\n")
        for b2 in exp["bullets"]:
            md.append(f"- **{b2['lead']}：**{b2['text']}\n")
    md.append("\n## 项目经历\n")
    for pr in R["projects"]:
        md.append(f"### {pr['title']} · {pr['badge']} · {pr['period']}\n")
        md.append(f"_{pr['category']}_\n")
        md.append(f"- **问题与方法：**{pr['problem']} {pr['approach']}\n")
        for s in pr["strategy"]:
            md.append(f"- {s}\n")
        md.append(f"- **结果：**{pr['result']}\n")
    md.append("\n## AI 应用测试方法论\n")
    for d in R["aiLab"]["directions"]:
        md.append(f"- **{d['name']}**：{'；'.join(d['points'])}（{d['evidence']}）\n")
    edu = R["education"]
    md.append("\n## 教育\n")
    md.append(f"{edu['school']} · {edu['major']} · {edu['period']}\n")
    md.append(f"{edu['extras']}\n")
    md_path = os.path.join(ROOT, "docs", "resume.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write("".join(md))
    print(f"Markdown 已生成: {md_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
