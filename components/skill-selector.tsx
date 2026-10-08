"use client";
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SkillEvidence } from "@/components/skill-evidence";
import { fadeInAnimationVariants } from "@/lib/animations";
type SkillSelectorProps = {
  groups: {
    label: string;
    skills: { label: string; icon: React.ReactNode }[];
  }[];
};
export default function SkillSelector({
  groups: skillGroups,
}: SkillSelectorProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  function handleSkillClick(label: string) {
    setSelectedSkill((current) => (current === label ? null : label));
  }

  return (
    <div className="flex flex-col gap-6">
      {skillGroups.map((group) => {
        if (group.skills.length === 0) {
          return null;
        }

        return (
          <div key={group.label}>
            <h3 className="mb-3 text-lg font-medium">{group.label}</h3>
            <ul className="flex flex-wrap justify-center gap-2">
              {group.skills.map((skill, index) => (
                <motion.li
                  key={skill.label}
                  variants={reduceMotion ? undefined : fadeInAnimationVariants}
                  initial={reduceMotion ? false : "initial"}
                  whileInView="animate"
                  viewport={{
                    once: true,
                  }}
                  custom={index}
                >
                  <Button
                    type="button"
                    variant="outline"
                    id={`skill-trigger-${group.label}-${index}`}
                    aria-expanded={selectedSkill === skill.label}
                    aria-controls={`skill-panel-${group.label}-${index}`}
                    onClick={() => handleSkillClick(skill.label)}
                    className={cn(
                      "h-11 gap-2 rounded-xl border-border bg-card px-3 text-card-foreground motion-reduce:transition-none",
                      selectedSkill === skill.label &&
                        "border-ring bg-secondary text-secondary-foreground ring-1 ring-ring",
                    )}
                  >
                    <span aria-hidden="true">{skill.icon}</span>
                    <span>{skill.label}</span>
                  </Button>
                </motion.li>
              ))}
            </ul>
            {group.skills.map((skill, index) => (
              <div
                key={skill.label}
                id={`skill-panel-${group.label}-${index}`}
                role="region"
                aria-labelledby={`skill-trigger-${group.label}-${index}`}
                hidden={selectedSkill !== skill.label}
                className="mt-4 text-left"
              >
                {selectedSkill === skill.label && (
                  <SkillEvidence label={skill.label} />
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
