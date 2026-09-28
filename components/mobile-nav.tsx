"use client";

import React from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";

export const mobileNavigationId = "mobile-navigation";

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <motion.div
      className="bg-background/90 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.95 }}
      transition={{ duration: 0.2 }}
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <nav id={mobileNavigationId} className="flex flex-col items-center gap-4">
        <ul className="text-muted-foreground flex flex-col items-center gap-4 text-xl font-medium">
          {links.map((link) => (
            <motion.li
              key={link.hash}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                className={clsx(
                  "hover:text-foreground relative px-4 py-2 transition",
                  {
                    "text-accent-foreground": activeSection === link.name,
                  },
                )}
                href={link.hash}
                onClick={() => {
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                  onClose();
                }}
              >
                {link.name}
                {link.name === activeSection && (
                  <motion.span
                    className="bg-accent absolute inset-0 -z-10 rounded-full"
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
