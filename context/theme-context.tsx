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
  const [mounted, setMounted] = useState(false);

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
    let localTheme: Theme | null = null;
    try {
      localTheme = window.localStorage.getItem("theme") as Theme | null;
    } catch {
      localTheme = null;
    }

    if (localTheme) {
      setTheme(localTheme);

      if (localTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
