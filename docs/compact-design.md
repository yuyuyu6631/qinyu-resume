# 紧凑简历页面

2026-10-18

首页与打印页共用 components/resume-brief.tsx，精简正文保存在 data/brief.json，公司、岗位和日期仍从 data/resume.json 读取。页面只呈现四段工作经历、两项具体实践、一行常用工具和教育信息。

删除首页原来的独立 AI Lab、能力地图、证明区、成长时间线、统计数字卡及重复项目卡。没有把长文藏进折叠区，直接缩减默认呈现的正文。数字归入其对应公司的经历，删除自评等级、全覆盖、独立负责全流程等笼统或过度表述。

Word、ATS、Markdown 使用 scripts/gen_brief.mjs 从同一份正文生成（需安装 docx 包）；PDF 由 /print 页面输出。旧 gen_docx.py / gen_ats.py 为历史长版生成器，不用于当前简历下载版。
