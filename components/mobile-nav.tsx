"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useSoundContext } from "@/context/sound-context";
import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export const mobileNavigationId = "mobile-navigation";

type MobileNavProps = {
  onClose: () => void;
  onCloseAutoFocus: (event: Event) => void;
  onFocusChange: (hasFocus: boolean) => void;
};

export default function MobileNav({
  onClose,
  onCloseAutoFocus,
  onFocusChange,
}: MobileNavProps) {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const { playCue } = useSoundContext();
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion() === true;

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogContent
        asChild
        id={mobileNavigationId}
        aria-modal="true"
        aria-describedby={undefined}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          closeRef.current?.focus();
        }}
        onCloseAutoFocus={onCloseAutoFocus}
        onFocusCapture={() => onFocusChange(true)}
        onBlurCapture={(event) => {
          if (
            event.relatedTarget &&
            !event.currentTarget.contains(event.relatedTarget)
          )
            onFocusChange(false);
        }}
      >
        <motion.div
          className="fixed inset-0 z-[1001] flex items-center justify-center overflow-y-auto bg-background/90 backdrop-blur-sm"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          <DialogTitle className="sr-only">Main navigation</DialogTitle>
          <DialogClose asChild>
            <Button
              ref={closeRef}
              type="button"
              variant="chrome"
              size="icon"
              aria-label="Close menu"
              className="absolute right-4 top-4 rounded-lg"
            >
              <FaTimes size={24} aria-hidden />
            </Button>
          </DialogClose>
          <nav
            aria-label="Main navigation"
            className="flex flex-col items-center gap-4 py-20"
          >
            <ul className="flex flex-col items-center gap-4 text-xl font-medium text-muted-foreground">
              {links.map((link) => (
                <motion.li
                  key={link.hash}
                  initial={reduceMotion ? false : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                >
                  <Link
                    className={clsx(
                      "relative block px-4 py-2 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
      </DialogContent>
    </DialogPortal>
  );
}
