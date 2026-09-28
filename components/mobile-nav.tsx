"use client";

import React from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useSoundContext } from "@/context/sound-context";

export const mobileNavigationId = "mobile-navigation";

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const { playCue } = useSoundContext();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.95 }}
      transition={{ duration: 0.2 }}
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <nav id={mobileNavigationId} className="flex flex-col items-center gap-4">
        <ul className="flex flex-col items-center gap-4 text-xl font-medium text-muted-foreground">
          {links.map((link) => (
            <motion.li
              key={link.hash}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                className={clsx(
                  "relative px-4 py-2 transition hover:text-foreground",
                  {
                    "text-accent-foreground": activeSection === link.name,
                  },
                )}
                href={link.hash}
                onClick={() => {
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                  playCue("navigate");
                  onClose();
                }}
              >
                {link.name}
                {link.name === activeSection && (
                  <motion.span
                    className="absolute inset-0 -z-10 rounded-full bg-accent"
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
}
