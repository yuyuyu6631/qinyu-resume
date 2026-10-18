# -*- coding: utf-8 -*-
"""从 data/resume.json 生成 ATS 纯文本版与 Markdown 数据源版。

用法:
    py scripts/gen_ats.py

输出（均 UTF-8 无 BOM）:
    docs/ats/resume.txt                    ATS 纯文本（单栏、无表格）
    public/秦宇-测试工程师-ATS.txt          与上面字节一致
    docs/resume.md                         对应 Markdown 数据源

约定:
    - ATS 版只使用纯文本段落与 "- " 列表，不出现表格 / 文本框 / 制表符；
    - 顺序: 姓名/岗位/联系方式 → 职业定位 → 核心数据 → 专业技能
            → 工作经历 → 项目经历 → 教育背景（含课程/荣誉/证书）；
    - 内容全部来自 data/resume.json，不做事实性改写。
"""
from __future__ import annotations

import json
import os
import shutil
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(ROOT, "data", "resume.json")

ATS_PATH = os.path.join(ROOT, "docs", "ats", "resume.txt")
ATS_PUBLIC_PATH = os.path.join(ROOT, "public", "秦宇-测试工程师-ATS.txt")
MD_PATH = os.path.join(ROOT, "docs", "resume.md")


def load_resume() -> dict:
    with open(DATA_PATH, encoding="utf-8") as f:
        return json.load(f)


def tech_list(techs) -> str:
    if isinstance(techs, str):
        return techs
    return " / ".join(techs)


def role_with_type(exp: dict) -> str:
    role = exp["role"]
    if exp.get("type") and exp["type"] not in role:
        role = f"{role}（{exp['type']}）"
    return role


# ────────────────────────────── ATS 纯文本 ──────────────────────────────

def build_ats(R: dict) -> str:
    b = R["basics"]
    c = b["contact"]
    L: list[str] = []

    def blank() -> None:
        if L and L[-1] != "":
            L.append("")

    def section(title: str) -> None:
        blank()
        L.append(title)

    def bullet(text: str) -> None:
        L.append(f"- {text}")

    # 1. 姓名 / 岗位 / 联系方式
    L.append(b["name"])
    L.append(b["title"] + " | " + b["brand"]["primary"] + " | " + " | ".join(b["brand"]["subs"]))
    L.append(
        f"电话: {c['phone']} | 邮箱: {c['email']} | 城市: {c['location']} | "
        f"{c['availability']}"
    )
    L.append(f"GitHub: {c['github']}")

    # 2. 职业定位
    section("职业定位")
    L.append(b["positioning"])
    L.append(b["summary"])

    # 3. 核心数据
    section("核心数据")
    for h in R["highlights"]:
        bullet(f"{h['value']} | {h['label']}（{h['sub']}）")

    # 4. 专业技能（能力矩阵 + 测试方法论 + AI 应用测试方法）
    section("专业技能")
    for cap in R["capabilities"]:
        bullet(f"{cap['name']}（{cap['level']}）: {tech_list(cap['techs'])}")

    section("测试方法论")
    method_notes = {
        "风险驱动的测试设计": "等价类 / 边界值 / 场景法 / 状态迁移，覆盖权限、异常、兼容性与回归场景，缺陷跟进至修复验证。",
        "AI 应用测试": "LLM-to-SQL / Agent Workflow / Tool Calling 三个方向专项测试，输出 Badcase 记录与 Prompt 偏差分析。",
        "自动化与巡检": "Python + Pytest 编写接口 / 页面 / 数据校验脚本，Playwright 做 UI 自动化；50+ 核心 API 接入 MeterSphere 定时巡检与钉钉告警。",
        "交叉验证与问题定位": "接口返回 + SQL + 页面展示 + 业务规则交叉验证，结合日志与服务状态区分产品缺陷、数据异常与环境阻塞。",
    }
    for item in R["about"]:
        bullet(f"{item['title']}: {method_notes.get(item['title'], item['body'])}")

    ai = R["aiLab"]
    section("AI 应用测试")
    for d in ai["directions"]:
        bullet(f"{d['name']}: {'；'.join(d['points'])}（{d['evidence']}）")
    bullet("评估方法: " + " / ".join(ai["methods"]))

    # 5. 工作经历
    section("工作经历")
    for exp in R["experience"]:
        L.append(f"{exp['company']} | {role_with_type(exp)} | {exp['period']}")
        L.append(f"行业: {exp['industry']}")
        for item in exp["bullets"]:
            bullet(f"{item['lead']}: {item['text']}")

    # 6. 项目经历
    section("项目经历")
    for pr in R["projects"]:
        L.append(
            f"{pr['no']}. {pr['title']} | {pr['badge']} | {pr['period']} | {pr['category']}"
        )
        L.append(f"技术: {tech_list(pr['technology'])}")
        bullet("问题: " + pr["problem"])
        bullet("方法: " + pr["approach"])
        bullet("策略: " + "；".join(pr["strategy"]))
        bullet("结果: " + pr["result"])

    pf = R["proof"]
    L.append(
        f"开源作品: {pf['github']['name']} | {pf['github']['url']} | "
        f"本简历网站源码（Next.js，网站 / PDF / DOCX / ATS 同一数据源）"
    )

    # 7. 教育背景（含课程 / 荣誉 / 证书）
    section("教育背景")
    edu = R["education"]
    L.append(f"{edu['school']} | {edu['major']} | {edu['period']}")
    L.append(f"课程与能力: {edu['desc']}")
    L.append(f"荣誉: {edu['honors']}")
    L.append(f"证书: {edu['certificates']}")

    while L and L[-1] == "":
        L.pop()
    return "\n".join(L) + "\n"


# ────────────────────────────── Markdown 数据源 ──────────────────────────────

def build_markdown(R: dict) -> str:
    b = R["basics"]
    c = b["contact"]
    M: list[str] = []

    M.append(f"# {b['name']} · {b['title']}")
    M.append("")
    M.append(
        f"> {b['title']} · {b['brand']['primary']} · " + " · ".join(b["brand"]["subs"])
    )
    M.append(
        f"> 电话 {c['phone']} · 邮箱 {c['email']} · GitHub <{c['github']}>"
    )
    M.append(f"> {c['location']} · {c['availability']}")
    M.append("")

    M.append("## 职业定位")
    M.append("")
    M.append(b["positioning"])
    M.append("")
    M.append(b["summary"])
    M.append("")

    M.append("## 核心数据")
    M.append("")
    for h in R["highlights"]:
        M.append(f"- **{h['value']}** {h['label']}（{h['sub']}）")
    M.append("")

    M.append("## 专业技能")
    M.append("")
    for cap in R["capabilities"]:
        M.append(
            f"- **{cap['name']}**（{cap['level']}）：{tech_list(cap['techs'])}。{cap['note']}"
        )
    M.append("")

    M.append("## 测试方法论")
    M.append("")
    for item in R["about"]:
        M.append(f"### {item['no']} · {item['title']}")
        M.append("")
        M.append(item["body"])
        M.append("")

    M.append("## 工作经历")
    M.append("")
    for exp in R["experience"]:
        M.append(f"### {exp['company']} · {role_with_type(exp)} · {exp['period']}")
        M.append("")
        M.append(f"_{exp['industry']}_")
        M.append("")
        M.append(f"{exp['summary']}")
        M.append("")
        for item in exp["bullets"]:
            M.append(f"- **{item['lead']}：**{item['text']}")
        M.append("")

    M.append("## 项目经历")
    M.append("")
    for pr in R["projects"]:
        M.append(f"### {pr['no']} · {pr['title']} · {pr['badge']} · {pr['period']}")
        M.append("")
        M.append(f"_{pr['category']}_")
        M.append("")
        M.append(f"- **问题：**{pr['problem']}")
        M.append(f"- **方法：**{pr['approach']}")
        M.append(f"- **技术：**{tech_list(pr['technology'])}")
        M.append("- **策略：**")
        for s in pr["strategy"]:
            M.append(f"  - {s}")
        M.append(f"- **结果：**{pr['result']}")
        M.append("")

    ai = R["aiLab"]
    M.append(f"## {ai['headline']}")
    M.append("")
    M.append(f"> {ai['disclaimer']}")
    M.append("")
    M.append("### 测试链路")
    M.append("")
    M.append(" → ".join(f"**{p['stage']}** {p['detail']}" for p in ai["pipeline"]))
    M.append("")
    M.append("### 测试方向")
    M.append("")
    for d in ai["directions"]:
        M.append(f"- **{d['name']}**：{'；'.join(d['points'])}（{d['evidence']}）")
    M.append("")
    M.append("### 评估方法")
    M.append("")
    M.append(" · ".join(ai["methods"]))
    M.append("")

    edu = R["education"]
    M.append("## 教育背景")
    M.append("")
    M.append(f"**{edu['school']}** · {edu['major']} · {edu['period']}")
    M.append("")
    M.append(edu["desc"])
    M.append("")
    M.append(f"- **荣誉：**{edu['honors']}")
    M.append(f"- **证书：**{edu['certificates']}")
    M.append("")

    pf = R["proof"]
    M.append("## 作品与源码")
    M.append("")
    M.append(
        f"**{pf['github']['name']}** — <{pf['github']['url']}>"
    )
    M.append("")
    M.append(pf["github"]["desc"])
    M.append("")

    return "\n".join(M).rstrip("\n") + "\n"


def write_utf8(path: str, text: str) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)


def main() -> int:
    R = load_resume()

    ats = build_ats(R)
    write_utf8(ATS_PATH, ats)
    os.makedirs(os.path.dirname(ATS_PUBLIC_PATH), exist_ok=True)
    shutil.copyfile(ATS_PATH, ATS_PUBLIC_PATH)

    md = build_markdown(R)
    write_utf8(MD_PATH, md)

    # 自检
    with open(ATS_PATH, "rb") as f:
        raw = f.read()
    no_bom = not raw.startswith(b"\xef\xbb\xbf")
    chars = len(ats)
    lines = ats.count("\n")
    same = raw == open(ATS_PUBLIC_PATH, "rb").read()

    print(f"ATS 文本: {ATS_PATH}")
    print(f"ATS 副本: {ATS_PUBLIC_PATH}")
    print(f"Markdown: {MD_PATH}")
    print(f"ATS 字符数: {chars} / 行数: {lines} / UTF-8 无 BOM: {no_bom} / 两处一致: {same}")

    if not 3000 <= chars <= 5000:
        print(f"WARN: ATS 字符数 {chars} 超出 3000-5000 的建议区间", file=sys.stderr)
    if not no_bom or not same:
        print("ERROR: ATS 编码或副本一致性校验失败", file=sys.stderr)
        return 1
    if "CET-4" not in ats or "优秀共青团员" not in ats:
        print("WARN: ATS 文本缺少关键证书 / 荣誉字段", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
