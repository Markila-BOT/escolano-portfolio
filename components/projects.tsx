import { ObservedSection } from "@/components/observed-section";
import SectionHeading from "@/components/section-heading";
import ProjectsInteractive from "@/components/projects-interactive";

export default function Projects() {
  return (
    <ObservedSection
      name="Projects"
      id="projects"
      className="mb-20 scroll-mt-28 text-center sm:mb-0"
    >
      <SectionHeading>My projects</SectionHeading>
      <ProjectsInteractive />
    </ObservedSection>
  );
}
