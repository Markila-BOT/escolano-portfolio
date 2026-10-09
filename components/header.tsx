"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useSoundContext } from "@/context/sound-context";
import useMediaQuery from "@/hooks/useMediaQuery";
import { FaBars } from "react-icons/fa";
import { LogoMark } from "@/components/logo-mark";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MobileNav, { mobileNavigationId } from "./mobile-nav";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const { playCue } = useSoundContext();
  const isDesktop = useMediaQuery("(min-width: 960px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;
  const desktopNavigationRef = useRef<HTMLElement>(null);
  const hasModalFocus = useRef(false);

  useEffect(() => {
    if (isDesktop) setIsMenuOpen(false);
  }, [isDesktop]);

  function handleCloseAutoFocus(event: Event) {
    if (!window.matchMedia("(min-width: 960px)").matches) return;
    event.preventDefault();
    if (hasModalFocus.current) {
      const navigation = desktopNavigationRef.current;
      const destination =
        navigation?.querySelector<HTMLAnchorElement>(
          `a[href="${links.find((link) => link.name === activeSection)?.hash}"]`,
        ) ?? navigation?.querySelector<HTMLAnchorElement>("a[href]");
      destination?.focus({ preventScroll: true });
    }
    hasModalFocus.current = false;
  }

  return (
    <Dialog open={isMenuOpen && !isDesktop} onOpenChange={setIsMenuOpen}>
      <header className="relative z-[999]">
        <motion.div
          className="fixed left-1/2 top-0 h-[4.5rem] w-full rounded-none border border-border bg-background/80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full"
          initial={reduceMotion ? false : { y: -100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
        ></motion.div>

        <motion.div
          className="fixed left-4 top-3 h-12 w-12 min-[960px]:left-20 min-[960px]:top-6"
          initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            reduceMotion ? { duration: 0 } : { type: "tween", duration: 0.2 }
          }
        >
          <Link
            href="#home"
            aria-label="Home"
            onClick={() => {
              setActiveSection("Home");
              setTimeOfLastClick(Date.now());
              playCue("navigate");
            }}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              !reduceMotion &&
                "transition duration-300 ease-in-out hover:scale-110",
            )}
          >
            <LogoMark className="h-12 w-12" />
          </Link>
        </motion.div>

        {isDesktop ? (
          <nav
            ref={desktopNavigationRef}
            aria-label="Main navigation"
            className="fixed left-1/2 top-[0.15rem] flex h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0"
          >
            <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-muted-foreground sm:w-[initial] sm:flex-nowrap sm:gap-5">
              {links
                .filter((link) => link.name !== "Home")
                .map((link) => (
                  <motion.li
                    className="relative flex h-3/4 items-center justify-center"
                    key={link.hash}
                    initial={reduceMotion ? false : { y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <Link
                      className={clsx(
                        "flex w-full items-center justify-center px-3 py-3 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        {
                          "text-accent-foreground": activeSection === link.name,
                        },
                      )}
                      href={link.hash}
                      onClick={() => {
                        setActiveSection(link.name);
                        setTimeOfLastClick(Date.now());
                        playCue("navigate");
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
                        ></motion.span>
                      )}
                    </Link>
                  </motion.li>
                ))}
            </ul>
          </nav>
        ) : (
          <>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="chrome"
                size="icon"
                className="fixed right-4 top-4 z-50 rounded-lg"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls={mobileNavigationId}
              >
                <FaBars size={24} aria-hidden />
              </Button>
            </DialogTrigger>
            <MobileNav
              onClose={() => setIsMenuOpen(false)}
              onCloseAutoFocus={handleCloseAutoFocus}
              onFocusChange={(hasFocus) => {
                hasModalFocus.current = hasFocus;
              }}
            />
          </>
        )}
      </header>
    </Dialog>
  );
}
