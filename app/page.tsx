import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[90rem] flex-col items-center">
      <div className="w-full max-w-[52rem] px-4 sm:px-6 md:px-8">
        <Intro />
      </div>
      <SectionDivider />
      <div className="w-full max-w-[52rem] px-4 sm:px-6 md:px-8">
        <About />
      </div>
      <SectionDivider />
      <div className="w-full px-4 sm:px-6 md:px-8">
        <Projects />
      </div>
      <SectionDivider />
      <div className="w-full max-w-[52rem] px-4 sm:px-6 md:px-8">
        <Skills />
      </div>
      <SectionDivider />
      <div className="w-full px-4 sm:px-6 md:px-8">
        <Experience />
      </div>
      <SectionDivider />
      <div className="w-full max-w-[52rem] px-4 sm:px-6 md:px-8">
        <Contact />
      </div>
    </main>
  );
}
