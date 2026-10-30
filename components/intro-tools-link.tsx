"use client";

import { motion, useReducedMotion } from "framer-motion";

type IntroToolsLinkProps = { children: React.ReactNode };

export default function IntroToolsLink({ children }: IntroToolsLinkProps) {
  const isReducedMotion = useReducedMotion();

  return (
    <motion.a
      href="/tools"
      initial={false}
      whileHover="feedback"
      whileFocus="feedback"
      className="inline-block rounded-sm py-2 text-foreground underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <motion.span
        aria-hidden="true"
        className="mr-1 inline-block"
        variants={{
          feedback: { rotate: isReducedMotion === false ? [0, -12, 8, 0] : 0 },
        }}
        transition={{ duration: isReducedMotion === false ? 0.36 : 0 }}
      >
        🛠️
      </motion.span>
      {children}
    </motion.a>
  );
}
