"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ROLE_TITLE_INTERVAL_MS = 4000;
const ROLE_TITLE_TRANSITION_S = 0.35;

type RoleTitleLoopProps = {
  titles: readonly string[];
  isPaused: boolean;
  className?: string;
};

function describeRoleTitles(titles: readonly string[]) {
  const lastTitle = titles[titles.length - 1];
  if (lastTitle === undefined) {
    return "";
  }
  if (titles.length === 1) {
    return lastTitle;
  }

  return `${titles.slice(0, -1).join(", ")}, and ${lastTitle}`;
}

export function RoleTitleLoop({
  titles,
  isPaused,
  className,
}: RoleTitleLoopProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);
  const activeTitle = titles[activeIndex] ?? titles[0];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(media.matches);
    };

    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);
    return () => media.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const updateDocumentVisibility = () => {
      setIsDocumentHidden(document.visibilityState === "hidden");
    };

    updateDocumentVisibility();
    document.addEventListener("visibilitychange", updateDocumentVisibility);
    return () =>
      document.removeEventListener(
        "visibilitychange",
        updateDocumentVisibility,
      );
  }, []);

  useEffect(() => {
    if (
      prefersReducedMotion ||
      isPaused ||
      isDocumentHidden ||
      titles.length < 2
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % titles.length);
    }, ROLE_TITLE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isDocumentHidden, isPaused, prefersReducedMotion, titles.length]);

  if (activeTitle === undefined) {
    return null;
  }

  const widestTitle = titles.reduce((widest, title) =>
    title.length > widest.length ? title : widest,
  );
  const titleClassName = cn(className, "leading-[1.4]");

  return (
    <strong className="relative mx-auto inline-grid w-max max-w-full text-center leading-none">
      <span className="sr-only">{describeRoleTitles(titles)}</span>
      <span
        aria-hidden="true"
        className={cn(
          "invisible col-start-1 row-start-1 min-w-0",
          titleClassName,
        )}
      >
        {widestTitle}
      </span>
      {prefersReducedMotion ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span aria-hidden="true" className={cn("max-w-full", titleClassName)}>
            {titles[0]}
          </span>
        </span>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={activeIndex}
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: ROLE_TITLE_TRANSITION_S, ease: "easeOut" }}
          >
            <span
              aria-hidden="true"
              className={cn("max-w-full", titleClassName)}
            >
              {activeTitle}
            </span>
          </motion.span>
        </AnimatePresence>
      )}
    </strong>
  );
}
