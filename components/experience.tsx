import { ObservedSection } from "@/components/observed-section";
import SectionHeading from "@/components/section-heading";
import ExperienceInteractive from "@/components/experience-interactive";

export default function Experience() {
  return (
    <ObservedSection
      name="Experience"
      id="experience"
      className="mb-28 w-full scroll-mt-28 sm:mb-40"
    >
      <SectionHeading id="experience-heading">My experience</SectionHeading>
      <ExperienceInteractive />
    </ObservedSection>
  );
}
