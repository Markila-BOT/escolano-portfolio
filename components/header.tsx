"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import logo from "@/public/logo.png";
import Image from "next/image";
import useMediaQuery from "@/hooks/useMediaQuery";
import { FaBars, FaTimes } from "react-icons/fa";
import MobileNav from "./mobile-nav";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const isDesktop = useMediaQuery("(min-width: 960px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-[999]">
      <motion.div
        className="fixed left-1/2 top-0 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:border-black/40 dark:bg-gray-950 dark:bg-opacity-75 sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>

      {isDesktop ? (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <Link
              href={"#home"}
              onClick={() => {
                setActiveSection("Home");
                setTimeOfLastClick(Date.now());
              }}
            >
              <Image
                src={logo}
                alt="Logo"
                width="52"
                height="52"
                quality="95"
                priority={true}
                className="fixed left-[5rem] top-[1rem] flex h-12 cursor-pointer transition duration-300 ease-in-out hover:scale-110 sm:top-[1.5rem] sm:h-[initial] sm:py-0"
              />
            </Link>
          </motion.div>
          <nav className="fixed left-1/2 top-[0.15rem] flex h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
            <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5">
              {links
                .filter((link) => link.name !== "Home")
                .map((link) => (
                  <motion.li
                    className="relative flex h-3/4 items-center justify-center"
                    key={link.hash}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <Link
                      className={clsx(
                        "flex w-full items-center justify-center px-3 py-3 transition hover:text-gray-950 dark:text-gray-500 dark:hover:text-gray-300",
                        {
                          "text-gray-950 dark:text-gray-200":
                            activeSection === link.name,
                        },
                      )}
                      href={link.hash}
                      onClick={() => {
                        setActiveSection(link.name);
                        setTimeOfLastClick(Date.now());
                      }}
                    >
                      {link.name}
                      {link.name === activeSection && (
                        <motion.span
                          className="absolute inset-0 -z-10 rounded-full bg-gray-100 dark:bg-gray-800"
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
        </>
      ) : (
        <>
          <button
            className="fixed right-4 top-4 z-50 rounded-lg bg-white/80 p-2 backdrop-blur-sm dark:bg-gray-950/80"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
      )}
    </header>
  );
}
