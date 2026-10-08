import {
  HiOutlineBriefcase,
  HiOutlineCode,
  HiOutlineMinusCircle,
} from "react-icons/hi";
import {
  skillEvidenceAliases,
  skillEvidenceWorkRoles,
  skillEvidenceCopy,
  experiencesData,
  projectsData,
} from "@/lib/data";
import { resolveSkillEvidence } from "@/lib/skill-evidence";

const evidenceInput = {
  experiences: experiencesData,
  projects: projectsData,
  workRoles: skillEvidenceWorkRoles,
  aliases: skillEvidenceAliases,
};
const statusIcons = {
  professional: HiOutlineBriefcase,
  project: HiOutlineCode,
  unlinked: HiOutlineMinusCircle,
};

type SkillEvidenceProps = { label: string };

export function SkillEvidence({ label }: SkillEvidenceProps) {
  const evidence = resolveSkillEvidence(label, evidenceInput);
  const StatusIcon = statusIcons[evidence.status];
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-card-foreground">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-medium">{label}</h4>
        <p className="inline-flex items-center gap-2 text-sm">
          <StatusIcon aria-hidden="true" />
          {skillEvidenceCopy[evidence.status]}
        </p>
      </div>
      {evidence.status === "unlinked" ? (
        <p className="mt-3 text-sm text-muted-foreground">
          {skillEvidenceCopy.missing}
        </p>
      ) : (
        <ul className="mt-4 grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
          {evidence.sources.map((source) => (
            <li
              key={`${source.kind}:${source.title}`}
              className="min-w-0 break-words"
            >
              <p className="text-sm font-medium">{source.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {source.kind} · {source.date}
              </p>
              <p className="mt-1 text-xs">{source.tag}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
