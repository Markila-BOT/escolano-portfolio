"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const revealEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function TextGenerateEffect({
  words,
  className,
}: {
  words: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion() === true;

  return (
    <motion.p
      className={cn("mb-3 leading-relaxed last:mb-0", className)}
      initial={
        prefersReducedMotion ? false : { opacity: 0.45, filter: "blur(6px)" }
      }
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: revealEase }}
    >
      {words}
    </motion.p>
  );
}
