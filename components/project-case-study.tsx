"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projectCaseStudy, projectWalkthrough } from "@/lib/data";
import ProjectDescription from "@/components/project-description";
import { Button } from "@/components/ui/button";

type ProjectCaseStudyProps = {
  caseStudy: {
    readonly problem: string;
    readonly role: string;
    readonly outcome: string;
  };
  walkthrough?: boolean;
};

const parts = ["problem", "role", "outcome"] as const;

export default function ProjectCaseStudy({
  caseStudy,
  walkthrough = false,
}: ProjectCaseStudyProps) {
  const studyKey = `${caseStudy.problem}\0${caseStudy.role}\0${caseStudy.outcome}`;
  const [currentPart, setCurrentPart] = useState<number | null>(null);
  const [studyKeySeen, setStudyKeySeen] = useState(studyKey);
  const reduceMotion = useReducedMotion() === true;
  const partRefs = useRef<Array<HTMLElement | null>>([]);
  const previousPartRef = useRef<HTMLButtonElement>(null);
  const nextPartRef = useRef<HTMLButtonElement>(null);

  if (studyKeySeen !== studyKey) {
    setStudyKeySeen(studyKey);
    setCurrentPart(null);
  }

  useEffect(() => {
    if (currentPart === null) return;
    partRefs.current[currentPart]?.scrollIntoView({
      block: "nearest",
      behavior: reduceMotion ? "auto" : "smooth",
    });
    const active = document.activeElement;
    if (currentPart === 0 && active === previousPartRef.current) {
      nextPartRef.current?.focus();
    }
    if (currentPart === parts.length - 1 && active === nextPartRef.current) {
      previousPartRef.current?.focus();
    }
  }, [currentPart, reduceMotion]);

  const handlePreviousPart = () => {
    setCurrentPart((current) =>
      current === null || current <= 0 ? current : current - 1,
    );
  };

  const handleNextPart = () => {
    setCurrentPart((current) => {
      if (current === null) return 0;
      return Math.min(current + 1, parts.length - 1);
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {walkthrough ? (
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            ref={previousPartRef}
            type="button"
            variant="outline"
            className="h-auto min-h-10 px-3 py-2 whitespace-normal"
            disabled={currentPart === null || currentPart === 0}
            onClick={handlePreviousPart}
          >
            {projectWalkthrough.previous}
          </Button>
          <Button
            ref={nextPartRef}
            type="button"
            variant="outline"
            className="h-auto min-h-10 px-3 py-2 whitespace-normal"
            disabled={currentPart === parts.length - 1}
            onClick={handleNextPart}
          >
            {projectWalkthrough.next}
          </Button>
        </div>
      ) : null}
      {parts.map((part, index) => {
        const isCurrent = walkthrough && currentPart === index;
        const section = (
          <section
            key={part}
            ref={(node) => {
              partRefs.current[index] = node;
            }}
            aria-current={isCurrent ? "step" : undefined}
            className="scroll-mt-4 rounded-md"
          >
            <h4 className="text-sm font-semibold">{projectCaseStudy[part]}</h4>
            <ProjectDescription text={caseStudy[part]} />
          </section>
        );
        if (!isCurrent || reduceMotion) return section;
        return (
          <motion.div
            key={part}
            initial={false}
            animate={{ boxShadow: "0 0 0 2px var(--ring)" }}
            transition={{ duration: 0.35 }}
          >
            {section}
          </motion.div>
        );
      })}
    </div>
  );
}
