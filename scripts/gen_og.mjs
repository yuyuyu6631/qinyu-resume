/**
 * 生成社交分享图 public/og.png（1200×630）。
 * 用法：node scripts/gen_og.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const R = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "resume.json"), "utf8"));
const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].find((p) => fs.existsSync(p));
const OUT = path.join(ROOT, "public", "og.png");
const TMP = path.join(process.env.TEMP ?? "C:/Temp", "qinyu-og.html");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const metrics = R.highlights
  .map((h) => `<div><b>${h.value}</b><span>${h.short ?? h.label}</span></div>`)
  .join("");

const html = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1200px;height:630px;overflow:hidden}
  body{
    background:#F2EEE6;color:#17150F;position:relative;
    font-family:"Microsoft YaHei","PingFang SC","Source Han Sans SC",sans-serif;
    background-image:linear-gradient(to right,rgba(221,215,202,.55) 1px,transparent 1px),linear-gradient(to bottom,rgba(221,215,202,.55) 1px,transparent 1px);
    background-size:80px 80px;
  }
  .wrap{position:relative;height:100%;padding:44px 60px 38px;display:flex;flex-direction:column}
  .top{display:flex;justify-content:space-between;border-bottom:1px solid #DDD7CA;padding-bottom:13px;
       font-family:Consolas,monospace;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#6f6a5f}
  .top b{color:#B93A22;font-weight:600}
  .name{font-size:148px;font-weight:800;line-height:.82;letter-spacing:-.045em;margin-top:34px}
  .name i{display:inline-block;width:19px;height:19px;background:#B93A22;margin-left:12px;vertical-align:baseline}
  .role{margin-top:28px;font-size:27px;font-weight:800;letter-spacing:-.01em}
  .role span{font-family:Consolas,monospace;font-size:11px;font-weight:400;letter-spacing:.17em;color:#7a7469;margin-left:14px;text-transform:uppercase}
  .pos{margin-top:12px;font-size:17px;line-height:1.5;color:#45403A;max-width:820px}
  .foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;gap:40px}
  .metrics{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid #17150F;flex:1;max-width:760px}
  .metrics div{padding:15px 18px 0 0;display:flex;flex-direction:column;gap:5px}
  .metrics b{font-size:38px;font-weight:800;line-height:.95;letter-spacing:-.03em}
  .metrics span{font-size:11.5px;color:#6f6a5f}
  .contact{text-align:right;font-family:Consolas,monospace;font-size:11px;line-height:1.8;color:#6f6a5f;padding-bottom:2px}
  .contact b{display:block;color:#17150F;font-weight:600;letter-spacing:.08em}
</style></head>
<body><div class="wrap">
  <div class="top"><span><b>●</b> RESUME / 2026</span><span>TEST DEVELOPMENT ENGINEER</span></div>
  <div class="name">${R.basics.name}<i></i></div>
  <div class="role">${R.basics.title}<span>${R.basics.brand.primary} · AI TESTING · AUTOMATION · ATE</span></div>
  <div class="pos">${R.basics.positioning}</div>
  <div class="foot">
    <div class="metrics">${metrics}</div>
    <div class="contact"><b>yuyuyu6631.github.io/qinyu-resume</b>${R.basics.contact.location} · ${R.basics.contact.phone}<br>${R.basics.contact.email}</div>
  </div>
</div></body></html>`;

fs.writeFileSync(TMP, html, "utf8");
const PORT = 9522;
const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--hide-scrollbars",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${path.join(process.env.TEMP ?? "C:/Temp", "chrome-og-profile")}`,
    "--window-size=1200,630",
    "about:blank",
  ],
  { stdio: "ignore" }
);

async function target() {
  for (let i = 0; i < 100; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) return page;
    } catch {}
    await sleep(150);
  }
  throw new Error("Chrome 调试端口未就绪");
}

try {
  const t = await target();
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = rej;
  });
  let id = 0;
  const pending = new Map();
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const p = pending.get(m.id);
      pending.delete(m.id);
      m.error ? p.reject(new Error(JSON.stringify(m.error))) : p.resolve(m.result);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const mid = ++id;
      pending.set(mid, { resolve, reject });
      ws.send(JSON.stringify({ id: mid, method, params }));
    });
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: "file:///" + TMP.replace(/\\/g, "/") });
  await sleep(1200);
  const shot = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(OUT, Buffer.from(shot.data, "base64"));
  console.log(`OG 已生成: ${OUT} (${fs.statSync(OUT).size} bytes)`);
  ws.close();
} finally {
  chrome.kill();
}
