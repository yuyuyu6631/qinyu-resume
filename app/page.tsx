import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { AiLab } from "@/components/sections/ai-lab";
import { Capabilities } from "@/components/sections/capabilities";
import { Proof } from "@/components/sections/proof";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">跳至主要内容</a>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Experience />
        <Projects />
        <AiLab />
        <Capabilities />
        <Proof />
        <Education />
      </main>
      <Contact />
    </>
  );
}
