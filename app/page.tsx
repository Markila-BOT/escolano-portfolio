import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex w-full max-w-[90rem] scroll-mt-28 flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
    >
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
