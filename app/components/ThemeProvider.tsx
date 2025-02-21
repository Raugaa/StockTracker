"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type React from "react" // Added import for React

interface ThemeContext {
  theme: "light" | "dark"
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContext | null>(null)

export const ThemeProvider = ({
  children,
  attribute,
  defaultTheme,
  enableSystem,
}: { children: React.ReactNode; attribute: string; defaultTheme: string; enableSystem: boolean }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  useEffect(() => {
    if (enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      setTheme(systemTheme as "light" | "dark")
    } else {
      setTheme(defaultTheme === "dark" ? "dark" : "light")
    }
  }, [enableSystem, defaultTheme])

  useEffect(() => {
    document.documentElement.setAttribute(attribute, theme)
  }, [theme, attribute])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

