"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { fadeInAnimationVariants, sectionReveal } from "@/lib/animations";
import { Label } from "@/components/ui/label";
import { TagChip } from "@/components/ui/tag-chip";

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <motion.section
      id="skills"
      ref={ref}
      {...sectionReveal}
      className="mb-20 max-w-[53rem] scroll-mt-28 text-center sm:mb-0"
    >
      <SectionHeading>My skills</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-2 text-lg">
        {skillsData.map((skill, index) => (
          <motion.li
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            <TagChip>
              {skill.icon}
              <Label>{skill.label}</Label>
            </TagChip>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
