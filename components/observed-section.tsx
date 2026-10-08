"use client";

import type { ReactNode } from "react";
import type { SectionName } from "@/lib/types";
import { useSectionInView } from "@/lib/hooks";

type ObservedSectionProps = {
  name: SectionName;
  id: string;
  className?: string;
  threshold?: number;
  children: ReactNode;
};

export function ObservedSection({
  name,
  id,
  className,
  threshold,
  children,
}: ObservedSectionProps) {
  const { ref } = useSectionInView(name, threshold);
  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}
