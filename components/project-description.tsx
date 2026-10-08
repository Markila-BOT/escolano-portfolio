"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { loadParagraphLayout } from "@/lib/project-description-layout";

type ProjectDescriptionProps = { text: string };
type ParagraphPresentation = { text: string; lines: string[]; reveal: boolean };

export default function ProjectDescription({ text }: ProjectDescriptionProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [presentation, setPresentation] =
    useState<ParagraphPresentation | null>(null);
  const hasReducedMotion = useReducedMotion();

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph) return;
    let isActive = true;
    let frame = 0;
    let generation = 0;
    let hasRevealed = false;
    let lastKey = "";
    let revision = 0;
    const update = () => {
      const style = getComputedStyle(paragraph);
      const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const width = paragraph.clientWidth;
      const lineHeight = parseFloat(style.lineHeight);
      const letterSpacing = parseFloat(style.letterSpacing) || 0;
      const key = JSON.stringify([
        width,
        font,
        lineHeight,
        letterSpacing,
        generation,
      ]);
      if (key === lastKey || !width || !Number.isFinite(lineHeight)) return;
      const currentRevision = ++revision;
      lastKey = key;
      void Promise.all([loadParagraphLayout(), document.fonts.load(font, text)])
        .then(([layout]) => {
          if (!isActive || currentRevision !== revision) return;
          const result = layout(text, width, {
            font,
            lineHeight,
            letterSpacing,
            generation,
          });
          if (!result) {
            setPresentation(null);
            return;
          }
          setPresentation({ text, lines: result.lines, reveal: !hasRevealed });
          hasRevealed = true;
        })
        .catch(() => {
          if (isActive && currentRevision === revision) setPresentation(null);
        });
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const handleFontsLoaded = () => {
      generation++;
      schedule();
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(paragraph);
    window.addEventListener("resize", schedule);
    document.fonts.addEventListener("loadingdone", handleFontsLoaded);
    schedule();
    return () => {
      isActive = false;
      revision++;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      document.fonts.removeEventListener("loadingdone", handleFontsLoaded);
    };
  }, [text]);

  const current = presentation?.text === text ? presentation : null;
  return (
    <p
      ref={paragraphRef}
      data-project-description
      data-vaul-no-drag
      data-measured={Boolean(current)}
      className="mb-3 select-text break-words leading-relaxed last:mb-0"
    >
      {current
        ? current.lines.map((line, index) => (
            <motion.span
              key={index}
              className="inline-block w-full whitespace-pre-wrap align-top"
              initial={
                current.reveal && !hasReducedMotion
                  ? { opacity: 0.55, y: 6 }
                  : false
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: hasReducedMotion ? 0 : 0.3,
                ease: [0.16, 1, 0.3, 1],
                delay:
                  current.reveal && !hasReducedMotion
                    ? index *
                      Math.min(
                        0.07,
                        0.2 / Math.max(1, current.lines.length - 1),
                      )
                    : 0,
              }}
            >
              {line}
            </motion.span>
          ))
        : text}
    </p>
  );
}
