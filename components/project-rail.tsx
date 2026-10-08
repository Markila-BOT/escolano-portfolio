"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TagChip } from "@/components/ui/tag-chip";
import { projectsData, projectViews } from "@/lib/data";
import { cn } from "@/lib/utils";

type ProjectRailProps = {
  expandedIndex: number;
  onSelect: (index: number) => void;
  onOpen: (index: number, trigger: HTMLButtonElement) => void;
};

export default function ProjectRail({
  expandedIndex,
  onSelect,
  onOpen,
}: ProjectRailProps) {
  const railId = useId();
  const hasReducedMotion = useReducedMotion();

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-left sm:px-6 lg:flex-row lg:items-stretch lg:px-8">
      {projectsData.map((project, index) => {
        const isExpanded = expandedIndex === index;
        const panelId = `${railId}-panel-${index}`;
        const titleId = `${railId}-title-${index}`;

        return (
          <motion.div
            key={project.title}
            layout={!hasReducedMotion}
            transition={{ duration: 0.25 }}
            className={cn(
              "min-w-0 rounded-lg border border-border bg-card text-card-foreground",
              isExpanded ? "lg:flex-[6]" : "lg:flex-1",
            )}
          >
            <Button
              id={titleId}
              type="button"
              variant="ghost"
              aria-expanded={isExpanded}
              aria-controls={panelId}
              onClick={() => onSelect(index)}
              className={cn(
                "h-auto min-h-11 w-full min-w-11 justify-start gap-2 whitespace-normal rounded-lg p-3 text-left lg:items-start lg:p-2",
                !isExpanded && "lg:h-full lg:flex-col lg:items-center",
              )}
            >
              <span
                aria-hidden="true"
                className="font-mono text-xs text-muted-foreground"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "min-w-0 break-words",
                  !isExpanded &&
                    "lg:rotate-180 lg:whitespace-nowrap lg:[writing-mode:vertical-rl]",
                )}
              >
                {project.title}
              </span>
              <span
                aria-hidden="true"
                className={cn("ml-auto", !isExpanded && "lg:ml-0 lg:mt-auto")}
              >
                {isExpanded ? "−" : "+"}
              </span>
            </Button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={titleId}
              hidden={!isExpanded}
            >
              {isExpanded && (
                <div className="space-y-4 p-4 pt-1">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="aspect-video w-full rounded-md object-cover"
                  />
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <ul
                    className="flex flex-wrap gap-2"
                    aria-label={`${project.title} technologies`}
                  >
                    {project.tags.map((tag) => (
                      <li key={tag.label}>
                        <TagChip size="label">{tag.label}</TagChip>
                      </li>
                    ))}
                  </ul>
                  <Button
                    type="button"
                    className="h-auto min-h-11 whitespace-normal"
                    onClick={(event) => onOpen(index, event.currentTarget)}
                  >
                    {projectViews.details(project.title)}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
