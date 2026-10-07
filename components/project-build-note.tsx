"use client";

import { projectBuildNote } from "@/lib/data";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

type ProjectBuildNoteProps = {
  buildNote: string;
};

export default function ProjectBuildNote({ buildNote }: ProjectBuildNoteProps) {
  return (
    <section>
      <h4 className="text-sm font-semibold">{projectBuildNote.label}</h4>
      <TextGenerateEffect words={buildNote} />
    </section>
  );
}
