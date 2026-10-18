# -*- coding: utf-8 -*-
"""从 data/resume.json 生成正式 DOCX 简历（A4 / 微软雅黑 / 两页内 / 链接可点击 / ATS 可解析）。

用法:
    py scripts/gen_docx.py

输出（两份字节一致）:
    docs/秦宇-测试工程师.docx
    public/秦宇-测试工程师.docx

版式（与网站「纸白 · 墨黑 · 朱红」瑞士编辑风一致）:
    - A4，四边 1.9cm；中文微软雅黑，正文 10pt；不使用文本框 / 表格；
    - 墨黑标题 + 朱红编号 / 细线点缀，严格分栏线；
    - 区块: 核心数据 / 专业技能 / 工作经历 / 项目经历 / 教育背景；
    - 邮箱、GitHub 为真实可点击超链接（mailto: / https:）。
"""
from __future__ import annotations

import json
import os
import shutil
import sys

from docx import Document
from docx.enum.text import WD_LINE_SPACING, WD_TAB_ALIGNMENT
from docx.opc.constants import RELATIONSHIP_TYPE as RT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(ROOT, "data", "resume.json")
OUT_DOCS = os.path.join(ROOT, "docs", "秦宇-测试工程师.docx")
OUT_PUBLIC = os.path.join(ROOT, "public", "秦宇-测试工程师.docx")

# ── 设计令牌 ───────────────────────────────────────────────────────────────
INK = RGBColor(0x17, 0x15, 0x0F)      # 墨黑
ACCENT = RGBColor(0xB9, 0x3A, 0x22)   # 朱红
MUTED = RGBColor(0x5E, 0x59, 0x4E)    # 暖灰（正文辅助）
FAINT = RGBColor(0x7C, 0x76, 0x69)    # 更浅的灰（元信息）
RULE = RGBColor(0xD9, 0xD3, 0xC7)     # 纸白底上的细线

CN_FONT = "微软雅黑"
EN_FONT = "Segoe UI"
MONO_FONT = "Consolas"

PAGE_W_CM = 21.0
PAGE_H_CM = 29.7
MARGIN_CM = 1.9
CONTENT_W_CM = PAGE_W_CM - MARGIN_CM * 2  # 17.2cm

BODY_PT = 10.0
BODY_LINE = 13.25
SMALL_PT = 9.0
META_PT = 8.4

KEYWORDS = [
    "长川科技", "零壹视界", "展通", "中金点睛", "星点评", "数字分身",
    "1000+", "50+", "CET-4", "优秀共青团员", "MeterSphere", "Playwright",
]

# pBdr 之后出现的子元素（用于把 pBdr 插到合法的 schema 位置）
_PPR_AFTER_BORDER = (
    "w:shd", "w:tabs", "w:suppressAutoHyphens", "w:kinsoku", "w:wordWrap",
    "w:overflowPunct", "w:topLinePunct", "w:autoSpaceDE", "w:autoSpaceDN",
    "w:bidi", "w:adjustRightInd", "w:snapToGrid", "w:spacing", "w:ind",
    "w:contextualSpacing", "w:mirrorIndents", "w:suppressOverlap", "w:jc",
    "w:textDirection", "w:textAlignment", "w:textboxTightWrap", "w:outlineLvl",
    "w:divId", "w:cnfStyle", "w:rPr", "w:sectPr", "w:pPrChange",
)
_BORDER_ORDER = ["w:top", "w:left", "w:bottom", "w:right", "w:between", "w:bar"]


# ── 底层 XML 助手 ─────────────────────────────────────────────────────────
def _set_char_spacing(run, points: float) -> None:
    """字间距（w:spacing，单位 1/20 磅），插到 sz 之前以符合 rPr 顺序。"""
    rPr = run._element.get_or_add_rPr()
    el = OxmlElement("w:spacing")
    el.set(qn("w:val"), str(int(round(points * 20))))
    rPr.insert_element_before(
        el, "w:w", "w:kern", "w:position", "w:sz", "w:szCs", "w:highlight",
        "w:u", "w:effect", "w:bdr", "w:shd", "w:fitText", "w:vertAlign",
        "w:rtl", "w:cs", "w:em", "w:lang", "w:eastAsianLayout",
        "w:specVanish", "w:oMath",
    )


def style_run(run, size=None, bold=None, color=None, font=None,
              spacing=None, italic=None):
    """统一设置 run 的中西文字体与格式；font 仅影响西文，中文恒为微软雅黑。"""
    if font:
        run.font.name = font
    if size is not None:
        run.font.size = Pt(size)
    if bold is not None:
        run.font.bold = bold
    if italic is not None:
        run.font.italic = italic
    if color is not None:
        run.font.color.rgb = color
    rPr = run._element.get_or_add_rPr()
    rFonts = rPr.find(qn("w:rFonts"))
    if rFonts is None:
        rFonts = OxmlElement("w:rFonts")
        rPr.insert(0, rFonts)
    if font:
        rFonts.set(qn("w:ascii"), font)
        rFonts.set(qn("w:hAnsi"), font)
    rFonts.set(qn("w:eastAsia"), CN_FONT)
    rFonts.set(qn("w:cs"), font or EN_FONT)
    if spacing:
        _set_char_spacing(run, spacing)


def add_border(paragraph, edge: str, color: RGBColor, sz: int,
               space: int, val: str = "single") -> None:
    """给段落加边框。sz 单位为 1/8 磅，space 单位为磅。"""
    pPr = paragraph._p.get_or_add_pPr()
    pBdr = pPr.find(qn("w:pBdr"))
    if pBdr is None:
        pBdr = OxmlElement("w:pBdr")
        pPr.insert_element_before(pBdr, *_PPR_AFTER_BORDER)
    tag = f"w:{edge}"
    el = pBdr.find(qn(tag))
    if el is None:
        el = OxmlElement(tag)
        order_index = _BORDER_ORDER.index(tag)
        inserted = False
        for child in list(pBdr):
            child_tag = child.tag
            for i, candidate in enumerate(_BORDER_ORDER):
                if child_tag == qn(candidate) and i > order_index:
                    pBdr.insert(list(pBdr).index(child), el)
                    inserted = True
                    break
            if inserted:
                break
        if not inserted:
            pBdr.append(el)
    el.set(qn("w:val"), val)
    el.set(qn("w:sz"), str(sz))
    el.set(qn("w:space"), str(space))
    el.set(qn("w:color"), str(color))


def set_para_mark_size(paragraph, points: float) -> None:
    """缩小段落标记字号，让纯线条段落不撑高。"""
    pPr = paragraph._p.get_or_add_pPr()
    rPr = pPr.find(qn("w:rPr"))
    if rPr is None:
        rPr = OxmlElement("w:rPr")
        pPr.insert_element_before(rPr, "w:sectPr", "w:pPrChange")
    for tag in ("w:sz", "w:szCs"):
        el = rPr.find(qn(tag))
        if el is None:
            el = OxmlElement(tag)
            rPr.append(el)
        el.set(qn("w:val"), str(max(2, int(round(points * 2)))))


def add_hyperlink(paragraph, url: str, text: str, size: float = META_PT,
                  color: RGBColor = ACCENT, bold: bool = False) -> None:
    """插入真实可点击超链接（w:hyperlink + 外部关系）。"""
    r_id = paragraph.part.relate_to(url, RT.HYPERLINK, is_external=True)
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), r_id)

    run = OxmlElement("w:r")
    rPr = OxmlElement("w:rPr")
    rFonts = OxmlElement("w:rFonts")
    rFonts.set(qn("w:ascii"), EN_FONT)
    rFonts.set(qn("w:hAnsi"), EN_FONT)
    rFonts.set(qn("w:eastAsia"), CN_FONT)
    rPr.append(rFonts)
    if bold:
        rPr.append(OxmlElement("w:b"))
    color_el = OxmlElement("w:color")
    color_el.set(qn("w:val"), str(color))
    rPr.append(color_el)
    for tag in ("w:sz", "w:szCs"):
        el = OxmlElement(tag)
        el.set(qn("w:val"), str(int(round(size * 2))))
        rPr.append(el)
    underline = OxmlElement("w:u")
    underline.set(qn("w:val"), "single")
    rPr.append(underline)
    run.append(rPr)

    t = OxmlElement("w:t")
    t.set(qn("xml:space"), "preserve")
    t.text = text
    run.append(t)
    hyperlink.append(run)
    paragraph._p.append(hyperlink)


def para(doc, before: float = 0, after: float = 0, line: float | None = None,
         keep_next: bool = False, keep_together: bool = False,
         left_cm: float | None = None, first_cm: float | None = None):
    p = doc.add_paragraph()
    pf = p.paragraph_format
    pf.space_before = Pt(before)
    pf.space_after = Pt(after)
    if line is not None:
        pf.line_spacing = Pt(line)
    pf.keep_with_next = keep_next
    if keep_together:
        pf.keep_together = True
    if left_cm is not None:
        pf.left_indent = Cm(left_cm)
    if first_cm is not None:
        pf.first_line_indent = Cm(first_cm)
    return p


def rule(doc, color: RGBColor = RULE, sz: int = 4, before: float = 0,
         after: float = 0, space: int = 0):
    p = para(doc, before=before, after=after, line=1.0)
    add_border(p, "bottom", color, sz, space)
    set_para_mark_size(p, 1)
    return p


def add_tab(p, cm: float, align=WD_TAB_ALIGNMENT.LEFT) -> None:
    p.paragraph_format.tab_stops.add_tab_stop(Cm(cm), align)


# ── 文档构建 ─────────────────────────────────────────────────────────────
def section_head(doc, no: str, title: str, en: str) -> None:
    p = para(doc, before=6.5, after=1.8, line=14.4, keep_next=True)
    add_tab(p, CONTENT_W_CM, WD_TAB_ALIGNMENT.RIGHT)
    style_run(p.add_run(no), size=8.6, bold=True, color=ACCENT,
              font=MONO_FONT, spacing=0.5)
    style_run(p.add_run("  "), size=SMALL_PT)
    style_run(p.add_run(title), size=11.6, bold=True, color=INK, spacing=0.8)
    style_run(p.add_run("\t"), size=8)
    style_run(p.add_run(en.upper()), size=7.0, color=FAINT,
              font=MONO_FONT, spacing=1.4)
    add_border(p, "bottom", INK, 8, 2, val="single")


def bullet(doc, lead: str | None, text: str, after: float = 0.6):
    p = para(doc, before=0, after=after, line=BODY_LINE,
             keep_together=True, left_cm=0.44, first_cm=-0.44)
    add_tab(p, 0.44)
    style_run(p.add_run("\u25aa"), size=6.6, color=ACCENT)
    style_run(p.add_run("  "), size=BODY_PT)
    if lead:
        style_run(p.add_run(f"{lead}："), size=BODY_PT, bold=True, color=INK)
    style_run(p.add_run(text), size=BODY_PT, color=INK)
    return p


def build_document(R: dict) -> Document:
    b = R["basics"]
    c = b["contact"]

    doc = Document()

    # 页面：A4 + 1.9cm 页边距
    sec = doc.sections[0]
    sec.page_width = Cm(PAGE_W_CM)
    sec.page_height = Cm(PAGE_H_CM)
    sec.top_margin = Cm(MARGIN_CM)
    sec.bottom_margin = Cm(MARGIN_CM)
    sec.left_margin = Cm(MARGIN_CM)
    sec.right_margin = Cm(MARGIN_CM)
    sec.header_distance = Cm(1.0)
    sec.footer_distance = Cm(1.0)

    # Normal 样式：西文 Segoe UI / 中文微软雅黑，正文 10pt
    normal = doc.styles["Normal"]
    normal.font.name = EN_FONT
    normal.font.size = Pt(BODY_PT)
    normal.font.color.rgb = INK
    n_rpr = normal.element.get_or_add_rPr()
    n_fonts = n_rpr.get_or_add_rFonts()
    n_fonts.set(qn("w:ascii"), EN_FONT)
    n_fonts.set(qn("w:hAnsi"), EN_FONT)
    n_fonts.set(qn("w:eastAsia"), CN_FONT)
    n_fonts.set(qn("w:cs"), EN_FONT)
    normal.paragraph_format.space_before = Pt(0)
    normal.paragraph_format.space_after = Pt(0)
    normal.paragraph_format.line_spacing = Pt(BODY_LINE)
    normal.paragraph_format.widow_control = True

    # 文档属性
    cp = doc.core_properties
    cp.title = f"{b['name']} · {b['title']}"
    cp.subject = "测试开发工程师 / AI 应用测试 · 简历"
    cp.author = b["name"]
    cp.last_modified_by = b["name"]
    cp.keywords = "测试开发, 软件测试, AI 测试, 自动化测试, ATE, 半导体"
    cp.comments = "由 data/resume.json 通过 scripts/gen_docx.py 生成"

    # ── 页眉 ──────────────────────────────────────────────────────────
    p = para(doc, before=0, after=0, line=25.0)
    add_tab(p, CONTENT_W_CM, WD_TAB_ALIGNMENT.RIGHT)
    style_run(p.add_run(b["name"]), size=23, bold=True, color=INK, spacing=1.6)
    style_run(p.add_run("\t"), size=9)
    style_run(p.add_run(b.get("nameEn", "")), size=8.2, color=FAINT,
              font=MONO_FONT, spacing=2.4)

    p = para(doc, before=1, after=1.2, line=14.3)
    style_run(p.add_run(b["title"]), size=10.8, bold=True, color=INK, spacing=0.5)
    style_run(p.add_run("  "), size=8)
    style_run(
        p.add_run(f"{b['brand']['primary']} · " + " · ".join(b["brand"]["subs"])),
        size=8.0, color=MUTED, font=EN_FONT, spacing=0.15,
    )

    # 联系方式（真实文本 + 可点击链接）
    p = para(doc, before=0, after=0.8, line=13.9)
    style_run(p.add_run(f"电话 {c['phone']}"), size=SMALL_PT, color=INK)
    style_run(p.add_run("　｜　邮箱 "), size=SMALL_PT, color=FAINT)
    add_hyperlink(p, f"mailto:{c['email']}", c["email"], size=SMALL_PT)
    style_run(p.add_run(f"　｜　{c['location']}　｜　{c['availability']}"),
              size=SMALL_PT, color=MUTED)

    p = para(doc, before=0, after=4, line=13.9)
    style_run(p.add_run("GitHub　"), size=SMALL_PT, color=FAINT)
    add_hyperlink(p, c["github"], c["github"], size=SMALL_PT)
    rule(doc, color=INK, sz=12, after=2)

    # ── 定位 ──────────────────────────────────────────────────────────
    p = para(doc, before=4, after=2, line=13.2, keep_together=True)
    style_run(p.add_run("定位｜"), size=9.3, bold=True, color=ACCENT, spacing=0.4)
    style_run(p.add_run(b["positioning"]), size=9.3, bold=True, color=INK)
    style_run(p.add_run(" " + b["summary"]), size=9.2, color=MUTED)

    # ── 01 核心数据 ───────────────────────────────────────────────────
    section_head(doc, "01", "核心数据", "key figures")
    for h in R["highlights"]:
        p = para(doc, before=0, after=0.8, line=13.8,
                 left_cm=1.95, first_cm=-1.95)
        add_tab(p, 1.95)
        style_run(p.add_run(h["value"]), size=12.2, bold=True, color=INK,
                  spacing=0.2)
        style_run(p.add_run("\t"), size=BODY_PT)
        style_run(p.add_run(h.get("short") or h["label"]), size=9.6,
                  bold=True, color=INK)
        style_run(p.add_run("　" + h["sub"]), size=8.6, color=MUTED)

    # ── 02 专业技能 ───────────────────────────────────────────────────
    section_head(doc, "02", "专业技能", "capability matrix")

    def skill_row(name: str, level: str, detail: str, dotted: bool = True):
        p = para(doc, before=0, after=0.3, line=12.35,
                 keep_together=True, left_cm=5.35, first_cm=-5.35)
        add_tab(p, 5.35)
        style_run(p.add_run(name), size=9.4, bold=True, color=INK,
                  font=MONO_FONT if name.isascii() else None, spacing=0.2)
        if level:
            style_run(p.add_run(f"（{level}）"), size=7.8, color=FAINT)
        style_run(p.add_run("\t"), size=9)
        style_run(p.add_run(detail), size=8.7, color=MUTED)
        if dotted:
            add_border(p, "bottom", RULE, 4, 0, val="dotted")

    for cap in R["capabilities"]:
        techs = cap["techs"] if isinstance(cap["techs"], str) else " / ".join(cap["techs"])
        skill_row(cap["name"], cap["level"], techs)

    method_titles = " / ".join(item["title"] for item in R["about"])
    skill_row("测试方法论", "", method_titles)
    skill_row("AI 应用测试方法", "", " / ".join(R["aiLab"]["methods"]))

    # ── 03 工作经历 ───────────────────────────────────────────────────
    section_head(doc, "03", "工作经历", "experience")
    for idx, exp in enumerate(R["experience"]):
        role = exp["role"]
        if exp.get("type") and exp["type"] not in role:
            role = f"{role}（{exp['type']}）"
        p = para(doc, before=4.0 if idx else 2, after=0.3, line=14.1,
                 keep_next=True)
        add_tab(p, CONTENT_W_CM, WD_TAB_ALIGNMENT.RIGHT)
        style_run(p.add_run(exp["company"]), size=10.6, bold=True, color=INK,
                  spacing=0.3)
        style_run(p.add_run("　" + role), size=8.8, color=MUTED)
        style_run(p.add_run("\t"), size=8)
        style_run(p.add_run(exp["period"]), size=8.3, color=FAINT,
                  font=MONO_FONT, spacing=0.2)

        p = para(doc, before=0, after=0.6, line=12.2, keep_next=True)
        style_run(p.add_run(exp["industry"]), size=8.3, color=FAINT)

        for item in exp["bullets"]:
            bullet(doc, item["lead"], item["text"])

    # ── 04 项目经历 ───────────────────────────────────────────────────
    section_head(doc, "04", "项目经历", "selected work")
    for idx, pr in enumerate(R["projects"]):
        p = para(doc, before=4.0 if idx else 2, after=0.3, line=13.9,
                 keep_next=True)
        add_tab(p, CONTENT_W_CM, WD_TAB_ALIGNMENT.RIGHT)
        style_run(p.add_run(pr["no"]), size=8.4, bold=True, color=ACCENT,
                  font=MONO_FONT, spacing=0.4)
        style_run(p.add_run("  "), size=8)
        style_run(p.add_run(pr["title"]), size=10.4, bold=True, color=INK,
                  spacing=0.2)
        style_run(p.add_run("　" + pr["badge"]), size=8.5, color=MUTED)
        style_run(p.add_run("\t"), size=8)
        style_run(p.add_run(pr["period"]), size=8.3, color=FAINT,
                  font=MONO_FONT, spacing=0.2)

        techs = " / ".join(pr["technology"]) if not isinstance(pr["technology"], str) else pr["technology"]
        bullet(doc, "问题与方法", f"{pr['problem']} {pr['approach']}（技术：{techs}）")
        bullet(doc, "策略", "；".join(pr["strategy"]))
        bullet(doc, "结果", pr["result"])

    # ── 05 教育背景 ───────────────────────────────────────────────────
    section_head(doc, "05", "教育背景", "education")
    edu = R["education"]
    p = para(doc, before=2, after=1.0, line=14.0, keep_next=True)
    add_tab(p, CONTENT_W_CM, WD_TAB_ALIGNMENT.RIGHT)
    style_run(p.add_run(edu["school"]), size=10.5, bold=True, color=INK,
              spacing=0.3)
    style_run(p.add_run("　" + edu["major"]), size=8.9, color=MUTED)
    style_run(p.add_run("\t"), size=8)
    style_run(p.add_run(edu["period"]), size=8.3, color=FAINT,
              font=MONO_FONT, spacing=0.2)

    p = para(doc, before=0, after=0.8, line=12.8, keep_together=True)
    style_run(p.add_run("课程与能力｜"), size=8.8, bold=True, color=INK)
    style_run(p.add_run(edu["desc"]), size=8.8, color=MUTED)

    p = para(doc, before=0, after=0.8, line=12.8, keep_together=True)
    style_run(p.add_run("荣誉｜"), size=8.8, bold=True, color=INK)
    style_run(p.add_run(edu["honors"]), size=8.8, color=MUTED)

    p = para(doc, before=0, after=0, line=13.2, keep_together=True)
    style_run(p.add_run("证书｜"), size=8.8, bold=True, color=INK)
    style_run(p.add_run(edu["certificates"]), size=8.8, color=MUTED)

    # ── 页脚注：作品与源码 ────────────────────────────────────────────
    rule(doc, color=RULE, sz=4, before=4, after=1)
    pf = R["proof"]
    p = para(doc, before=0, after=0, line=12.2, keep_together=True)
    style_run(p.add_run("作品与源码｜"), size=8.3, bold=True, color=ACCENT,
              spacing=0.3)
    add_hyperlink(p, pf["github"]["url"], pf["github"]["name"], size=8.3,
                  bold=True)
    style_run(p.add_run("　" + pf["github"]["desc"]), size=8.1, color=FAINT)

    return doc


# ── 输出与自检 ───────────────────────────────────────────────────────────
def _collect_text(doc: Document) -> str:
    parts = [p.text for p in doc.paragraphs]
    for section in doc.sections:
        for p in section.footer.paragraphs:
            parts.append(p.text)
    return "\n".join(parts)


def _count_hyperlinks(doc: Document) -> int:
    return len(doc.element.body.findall(".//" + qn("w:hyperlink")))


def main() -> int:
    with open(DATA_PATH, encoding="utf-8") as f:
        R = json.load(f)

    doc = build_document(R)

    os.makedirs(os.path.dirname(OUT_DOCS), exist_ok=True)
    os.makedirs(os.path.dirname(OUT_PUBLIC), exist_ok=True)
    doc.save(OUT_DOCS)
    shutil.copyfile(OUT_DOCS, OUT_PUBLIC)

    # 复读校验：真实打开自己生成的 DOCX
    check = Document(OUT_DOCS)
    text = _collect_text(check)
    missing = [kw for kw in KEYWORDS if kw not in text]
    empty_paras = sum(1 for p in check.paragraphs if not p.text.strip())
    tables = len(check.tables)
    links = _count_hyperlinks(check)
    same = open(OUT_DOCS, "rb").read() == open(OUT_PUBLIC, "rb").read()

    print(f"DOCX: {OUT_DOCS}")
    print(f"DOCX: {OUT_PUBLIC}")
    print(f"段落数: {len(check.paragraphs)} / 空段落: {empty_paras} / 表格: {tables} / 超链接: {links}")
    print(f"两处字节一致: {same}")
    if missing:
        print(f"ERROR: 缺少关键字段 {missing}", file=sys.stderr)
        return 1
    if tables or links < 2 or not same:
        print("ERROR: 表格 / 链接 / 副本一致性校验失败", file=sys.stderr)
        return 1
    print("关键字段校验: 全部通过")
    return 0


if __name__ == "__main__":
    sys.exit(main())
