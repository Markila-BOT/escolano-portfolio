"use client";

import { useTheme } from "@/context/theme-context";
import { Button } from "@/components/ui/button";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="chrome"
      size="icon"
      className="fixed bottom-5 right-5 h-12 w-12 shadow-2xl transition-all hover:scale-[1.15] active:scale-105"
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      onClick={toggleTheme}
    >
      {theme === "light" ? <BsSun aria-hidden /> : <BsMoon aria-hidden />}
    </Button>
  );
}
