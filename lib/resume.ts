import resume from "@/data/resume.json";

export type Basics = typeof resume.basics;
export type Highlight = (typeof resume.highlights)[number];
export type AboutItem = (typeof resume.about)[number];
export type Experience = (typeof resume.experience)[number];
export type Project = (typeof resume.projects)[number];
export type AiLab = typeof resume.aiLab;
export type Capability = (typeof resume.capabilities)[number];
export type Education = typeof resume.education;
export type Proof = typeof resume.proof;

export const resumeData = resume;
