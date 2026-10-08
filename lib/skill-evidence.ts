export type EvidenceExperience = {
  title: string;
  date: string;
  tags?: readonly string[];
};
export type EvidenceProject = {
  title: string;
  year: string;
  tags: readonly { label: string }[];
};
export type SkillEvidenceSource = {
  kind: "Experience" | "Project";
  title: string;
  date: string;
  tag: string;
};
type SkillEvidenceInput = {
  experiences: readonly EvidenceExperience[];
  projects: readonly EvidenceProject[];
  workRoles: readonly string[];
  aliases: Readonly<Record<string, readonly string[]>>;
};
export type SkillEvidence =
  | {
      status: "professional" | "project";
      sources: readonly SkillEvidenceSource[];
    }
  | { status: "unlinked"; sources: readonly [] };

export function resolveSkillEvidence(
  label: string,
  { experiences, projects, workRoles, aliases }: SkillEvidenceInput,
): SkillEvidence {
  const names = new Set([label, ...(aliases[label] ?? [])]);
  const roles = new Set(workRoles);
  const sources: SkillEvidenceSource[] = [];
  const seen = new Set<string>();
  const add = (source: SkillEvidenceSource) => {
    const key = `${source.kind}:${source.title}`;
    if (seen.has(key)) return;
    seen.add(key);
    sources.push(source);
  };
  for (const entry of experiences) {
    if (!roles.has(entry.title)) continue;
    const tag = entry.tags?.find((tag) => names.has(tag));
    if (tag)
      add({ kind: "Experience", title: entry.title, date: entry.date, tag });
  }
  const hasProfessionalEvidence = sources.length > 0;
  for (const entry of projects) {
    const tag = entry.tags.find((tag) => names.has(tag.label));
    if (tag)
      add({
        kind: "Project",
        title: entry.title,
        date: entry.year,
        tag: tag.label,
      });
  }
  if (sources.length === 0) return { status: "unlinked", sources: [] };
  return {
    status: hasProfessionalEvidence ? "professional" : "project",
    sources,
  };
}
