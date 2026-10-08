"use client";

import React, { useEffect, useState, createContext, useContext } from "react";

type Theme = "light" | "dark";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      try {
        window.localStorage.setItem("theme", "dark");
      } catch {
        // A blocked store still leaves the dark theme on the page.
      }
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      try {
        window.localStorage.setItem("theme", "light");
      } catch {
        // A blocked store still leaves the light theme on the page.
      }
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    let nextTheme: Theme = "light";
    try {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        nextTheme = "dark";
      }
    } catch {
      // The deterministic default also works without media-query support.
    }
    try {
      const storedTheme = window.localStorage.getItem("theme");
      if (storedTheme === "light" || storedTheme === "dark") {
        nextTheme = storedTheme;
      }
    } catch {
      // Keep the system preference when storage is unavailable.
    }
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }

  return context;
}
