"use client";

import { useTheme } from "@/context/theme-context";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="border-border bg-background/80 text-foreground fixed bottom-5 right-5 flex h-[3rem] w-[3rem] items-center justify-center rounded-full border shadow-2xl backdrop-blur-[0.5rem] transition-all hover:scale-[1.15] active:scale-105"
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      onClick={toggleTheme}
    >
      {theme === "light" ? <BsSun aria-hidden /> : <BsMoon aria-hidden />}
    </button>
  );
}
