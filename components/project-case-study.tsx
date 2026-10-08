"use client";

import { projectCaseStudy } from "@/lib/data";
import ProjectDescription from "@/components/project-description";

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
          <ProjectDescription key={caseStudy[part]} text={caseStudy[part]} />
        </section>
      ))}
    </div>
  );
}
