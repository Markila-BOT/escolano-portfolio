import { ObservedSection } from "@/components/observed-section";
import SectionHeading from "@/components/section-heading";
import SkillSelector from "@/components/skill-selector";
import { skillGroups, skillEvidenceCopy } from "@/lib/data";
export default function Skills() {
  return (
    <ObservedSection
      name="Skills"
      id="skills"
      className="mb-20 max-w-[53rem] scroll-mt-28 text-center sm:mb-0"
    >
      <SectionHeading>My skills</SectionHeading>
      <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {skillEvidenceCopy.instruction} {skillEvidenceCopy.description}
      </p>
      <SkillSelector
        groups={skillGroups.map((group) => ({
          label: group.label,
          skills: group.skills.map((skill) => ({
            label: skill.label,
            icon: skill.icon,
          })),
        }))}
      />
    </ObservedSection>
  );
}
