import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { Document, Packer, Paragraph, TextRun, BorderStyle } = require(process.env.RESUME_DOCX_MODULE || 'docx');
const root = process.cwd();
const brief = JSON.parse(fs.readFileSync(path.join(root, 'data/brief.json'), 'utf8').replace(/^\uFEFF/, ''));
const resume = JSON.parse(fs.readFileSync(path.join(root, 'data/resume.json'), 'utf8'));
const b = resume.basics;
const run = (text, bold = false, size = 20, color = '263143') => new TextRun({ text, bold, size, color, font: { ascii: 'Calibri', eastAsia: 'Microsoft YaHei' } });
const para = (children, after = 80, before = 0, keepNext = false) => new Paragraph({ children, spacing: { after, before, line: 270 }, keepNext });
const heading = text => new Paragraph({ children: [run(text, true, 23)], spacing: { before: 150, after: 80 }, keepNext: true, border: { bottom: { color: 'D7DCE5', style: BorderStyle.SINGLE, size: 4, space: 4 } } });
const content = [
 para([run(b.name, true, 40), run('   ' + brief.title, false, 24)], 40),
 para([run(`${b.contact.location} · 在职  |  ${b.contact.phone}  |  ${b.contact.email}`, false, 18, '596575')], 120),
 para([run(brief.intro)], 100),
 para([run('常用工具  ', true, 18), run(brief.tools, false, 18)], 120),
 heading('工作经历'),
];
for (const exp of brief.experience) {
 const original = resume.experience.find(x => x.company === exp.company);
 content.push(para([run(exp.company, true), run(`   ${original.role}   ${original.period}`, false, 17, '596575')], 35, 70, true));
 content.push(para([run(exp.points.join(' '))], 85));
}
content.push(heading('两项具体实践'));
for (const p of brief.projects) {
 content.push(para([run(p.title, true), run('  ' + p.context, false, 17, '596575')], 30, 60, true));
 content.push(para([run(p.body)], 85));
}
content.push(para([run(`${resume.education.school} · ${resume.education.major} · ${resume.education.period}`, false, 18, '596575')], 0, 140));
const document = new Document({ sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 700, bottom: 650, left: 800, right: 800 } } }, children: content }] });
const buffer = await Packer.toBuffer(document);
for (const dir of ['public', 'docs']) fs.writeFileSync(path.join(root, dir, '秦宇-测试工程师.docx'), buffer);
const lines = [b.name + ' | ' + brief.title, `${b.contact.location} · 在职 | ${b.contact.phone} | ${b.contact.email}`, '', brief.intro, brief.tools, '', '工作经历'];
for (const exp of brief.experience) { const o=resume.experience.find(x=>x.company===exp.company); lines.push(`${exp.company} | ${o.role} | ${o.period}`, ...exp.points, ''); }
lines.push('两项具体实践'); for (const p of brief.projects) lines.push(`${p.title} (${p.context})`, p.body, '');
lines.push(`${resume.education.school} · ${resume.education.major} · ${resume.education.period}`);
fs.writeFileSync(path.join(root,'docs/ats/resume.txt'), lines.join('\n'));
fs.writeFileSync(path.join(root,'docs/resume.md'), '# '+lines.join('\n\n'));
console.log('Generated compact DOCX, ATS and Markdown.');
