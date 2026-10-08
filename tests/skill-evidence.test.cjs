const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const ts = require("typescript");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  return originalResolve.call(
    this,
    request.startsWith("@/") ? path.join(root, request.slice(2)) : request,
    parent,
    ...rest,
  );
};
Module._extensions[".ts"] = function (module, file) {
  module._compile(
    ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText,
    file,
  );
};
for (const extension of [".png", ".jpg", ".jpeg", ".webp"])
  Module._extensions[extension] = (module) => {
    module.exports = { src: "test-image", width: 1, height: 1 };
  };
const { resolveSkillEvidence } = require("../lib/skill-evidence.ts");
const {
  skillGroups,
  projectsData,
  experiencesData,
  skillEvidenceAliases,
  skillEvidenceWorkRoles,
} = require("../lib/data.ts");
const realInput = {
  experiences: experiencesData,
  projects: projectsData,
  aliases: skillEvidenceAliases,
  workRoles: skillEvidenceWorkRoles,
};

test("actual portfolio classifies all 22 skills and retains exact evidence values", () => {
  const expected = {
    professional: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind",
      "Redux",
      "GraphQL",
      "Nest.js",
      "Express",
      "MySQL",
    ],
    project: [
      "Framer Motion",
      "Git",
      "Claude Code",
      "Codex",
      "Cursor",
      "MongoDB",
      "PostgreSQL",
      "Firebase",
    ],
    unlinked: ["HTML", "CSS", "Rust"],
  };
  const labels = skillGroups.flatMap((group) =>
    group.skills.map((skill) => skill.label),
  );
  assert.equal(labels.length, 22);
  for (const label of labels) {
    const evidence = resolveSkillEvidence(label, realInput);
    assert.ok(expected[evidence.status].includes(label), label);
    assert.equal(
      new Set(
        evidence.sources.map((source) => `${source.kind}:${source.title}`),
      ).size,
      evidence.sources.length,
    );
    for (const source of evidence.sources) {
      const entry = (
        source.kind === "Experience" ? experiencesData : projectsData
      ).find((entry) => entry.title === source.title);
      assert.ok(entry);
      assert.equal(
        source.date,
        source.kind === "Experience" ? entry.date : entry.year,
      );
      assert.ok(
        entry.tags.some(
          (tag) => (typeof tag === "string" ? tag : tag.label) === source.tag,
        ),
      );
    }
  }
  assert.deepEqual(
    resolveSkillEvidence("Git", realInput).sources.map(
      (source) => source.title,
    ),
    projectsData.map((project) => project.title),
  );
  for (const label of ["Claude Code", "Codex", "Cursor"]) {
    assert.deepEqual(
      resolveSkillEvidence(label, realInput).sources.map(
        (source) => source.title,
      ),
      ["MatterWorx", "Potato V3", "Owner Web App", "Workflow", "House Elf"],
    );
  }
  for (const [label, tag] of [
    ["Next.js", "NextJS"],
    ["Tailwind", "Tailwind CSS"],
    ["Nest.js", "NestJS"],
  ]) {
    assert.ok(
      resolveSkillEvidence(label, realInput).sources.some(
        (source) => source.tag === tag,
      ),
    );
  }
});

test("classification handles precedence, removal, exclusions, exact matches and stale references", () => {
  const input = {
    experiences: [
      { title: "Work", date: "2024", tags: ["React"] },
      { title: "Training", date: "2023", tags: ["React"] },
      { title: "Relocation", date: "2022", tags: ["React"] },
    ],
    projects: [
      { title: "One", year: "2024", tags: [{ label: "React" }] },
      { title: "One", year: "2024", tags: [{ label: "React" }] },
      { title: "Two", year: "2023", tags: [{ label: "React" }] },
    ],
    workRoles: ["Work", "Stale reference"],
    aliases: {},
  };
  const evidence = resolveSkillEvidence("React", input);
  assert.equal(evidence.status, "professional");
  assert.deepEqual(
    evidence.sources.map((source) => source.title),
    ["Work", "One", "Two"],
  );
  const withoutWork = { ...input, experiences: input.experiences.slice(1) };
  assert.equal(resolveSkillEvidence("React", withoutWork).status, "project");
  assert.deepEqual(
    resolveSkillEvidence("React", { ...withoutWork, projects: [] }),
    { status: "unlinked", sources: [] },
  );
  for (const label of ["HTML", "CSS", "Re", "Unknown"])
    assert.equal(resolveSkillEvidence(label, input).status, "unlinked");
  assert.equal(
    resolveSkillEvidence("Next.js", {
      ...input,
      projects: [{ title: "Next", year: "2025", tags: [{ label: "NextJS" }] }],
    }).status,
    "unlinked",
  );
  assert.equal(
    resolveSkillEvidence("Next.js", {
      ...input,
      projects: [{ title: "Next", year: "2025", tags: [{ label: "NextJS" }] }],
      aliases: { "Next.js": ["NextJS"] },
    }).status,
    "project",
  );
});
