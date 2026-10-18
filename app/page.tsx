import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { AiLab } from "@/components/sections/ai-lab";
import { Capabilities } from "@/components/sections/capabilities";
import { Proof } from "@/components/sections/proof";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <AiLab />
        <Capabilities />
        <Proof />
      </main>
      <Contact />
    </>
  );
}
