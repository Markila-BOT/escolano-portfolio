import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type TagChipProps = {
  children: ReactNode;
  size?: "default" | "compact";
};

const chipSize = {
  default:
    "gap-2 rounded-xl border-border bg-card px-5 py-3 text-card-foreground",
  compact:
    "gap-1 rounded-full border-border bg-secondary px-2 py-0.5 text-[0.5rem] uppercase tracking-wider text-secondary-foreground md:px-3 md:py-1 md:text-[0.6rem]",
} as const;

export function TagChip({ children, size = "default" }: TagChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center border",
        chipSize[size],
      )}
    >
      {children}
    </span>
  );
}
