import type { Metadata } from "next";
import { ResumeBrief } from "@/components/resume-brief";

export const metadata: Metadata = {
  title: "秦宇 简历",
  robots: { index: false, follow: false },
};

export default function PrintPage() {
  return <ResumeBrief printable />;
}
