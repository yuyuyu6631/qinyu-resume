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
      <Nav />
      <main>
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
