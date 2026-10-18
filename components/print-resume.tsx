"use client";

export function PrintResume() {
  return <button type="button" className="brief-download" onClick={() => window.print()}>打印 / 保存 PDF</button>;
}
