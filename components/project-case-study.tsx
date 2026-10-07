"use client";

import { projectCaseStudy } from "@/lib/data";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

type ProjectCaseStudyProps = {
  caseStudy: {
    readonly problem: string;
    readonly role: string;
    readonly outcome: string;
  };
};

const parts = ["problem", "role", "outcome"] as const;

export default function ProjectCaseStudy({ caseStudy }: ProjectCaseStudyProps) {
  return (
    <div className="flex flex-col gap-4">
      {parts.map((part) => (
        <section key={part}>
          <h4 className="text-sm font-semibold">{projectCaseStudy[part]}</h4>
          <TextGenerateEffect words={caseStudy[part]} />
        </section>
      ))}
    </div>
  );
}
