import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"

export type Theme = "light" | "dark"
export type BrandColor = "blue" | "purple" | "green" | "orange" | "red"
export type FontFamily = "geist" | "inter" | "system" | "mono"

interface FontConfig {
  name: FontFamily
  label: string
  value: string
}

interface BrandColorConfig {
  name: BrandColor
  label: string
  hex: string
  light: {
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    accent: string
    accentForeground: string
    muted: string
    mutedForeground: string
  }
  dark: {
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    accent: string
    accentForeground: string
    muted: string
    mutedForeground: string
  }
}

export const fontFamilies: FontConfig[] = [
  {
    name: "geist",
    label: "Geist",
    value: "'Geist Variable', sans-serif",
  },
  {
    name: "inter",
    label: "Inter",
    value: "'Inter Variable', sans-serif",
  },
  {
    name: "system",
    label: "System",
    value:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
  },
  {
    name: "mono",
    label: "Mono",
    value: "'Geist Mono', 'Fira Code', 'Courier New', monospace",
  },
]

export const brandColors: BrandColorConfig[] = [
  {
    name: "blue",
    label: "Blue",
    hex: "#3b82f6",
    light: {
      primary: "oklch(0.488 0.15 264.376)",
      primaryForeground: "oklch(0.145 0 0)",
      secondary: "oklch(0.97 0.008 264.376)",
      secondaryForeground: "oklch(0.145 0 0)",
      accent: "oklch(0.95 0.015 264.376)",
      accentForeground: "oklch(0.145 0 0)",
      muted: "oklch(0.97 0.005 264.376)",
      mutedForeground: "oklch(0.556 0 0)",
    },
    dark: {
      primary: "oklch(0.7 0.12 264.376)",
      primaryForeground: "oklch(0.985 0 0)",
      secondary: "oklch(0.25 0.02 264.376)",
      secondaryForeground: "oklch(0.708 0 0)",
      accent: "oklch(0.28 0.025 264.376)",
      accentForeground: "oklch(0.708 0 0)",
      muted: "oklch(0.25 0.015 264.376)",
      mutedForeground: "oklch(0.708 0 0)",
    },
  },
  {
    name: "purple",
    label: "Purple",
    hex: "#a855f7",
    light: {
      primary: "oklch(0.55 0.15 300)",
      primaryForeground: "oklch(0.145 0 0)",
      secondary: "oklch(0.97 0.008 300)",
      secondaryForeground: "oklch(0.145 0 0)",
      accent: "oklch(0.95 0.015 300)",
      accentForeground: "oklch(0.145 0 0)",
      muted: "oklch(0.97 0.005 300)",
      mutedForeground: "oklch(0.556 0 0)",
    },
    dark: {
      primary: "oklch(0.75 0.12 300)",
      primaryForeground: "oklch(0.985 0 0)",
      secondary: "oklch(0.25 0.02 300)",
      secondaryForeground: "oklch(0.708 0 0)",
      accent: "oklch(0.28 0.025 300)",
      accentForeground: "oklch(0.708 0 0)",
      muted: "oklch(0.25 0.015 300)",
      mutedForeground: "oklch(0.708 0 0)",
    },
  },
  {
    name: "green",
    label: "Green",
    hex: "#22c55e",
    light: {
      primary: "oklch(0.65 0.13 145)",
      primaryForeground: "oklch(0.145 0 0)",
      secondary: "oklch(0.97 0.008 145)",
      secondaryForeground: "oklch(0.145 0 0)",
      accent: "oklch(0.95 0.015 145)",
      accentForeground: "oklch(0.145 0 0)",
      muted: "oklch(0.97 0.005 145)",
      mutedForeground: "oklch(0.556 0 0)",
    },
    dark: {
      primary: "oklch(0.75 0.12 145)",
      primaryForeground: "oklch(0.985 0 0)",
      secondary: "oklch(0.25 0.02 145)",
      secondaryForeground: "oklch(0.708 0 0)",
      accent: "oklch(0.28 0.025 145)",
      accentForeground: "oklch(0.708 0 0)",
      muted: "oklch(0.25 0.015 145)",
      mutedForeground: "oklch(0.708 0 0)",
    },
  },
  {
    name: "orange",
    label: "Orange",
    hex: "#f97316",
    light: {
      primary: "oklch(0.68 0.13 45)",
      primaryForeground: "oklch(0.145 0 0)",
      secondary: "oklch(0.97 0.008 45)",
      secondaryForeground: "oklch(0.145 0 0)",
      accent: "oklch(0.95 0.015 45)",
      accentForeground: "oklch(0.145 0 0)",
      muted: "oklch(0.97 0.005 45)",
      mutedForeground: "oklch(0.556 0 0)",
    },
    dark: {
      primary: "oklch(0.78 0.11 45)",
      primaryForeground: "oklch(0.985 0 0)",
      secondary: "oklch(0.25 0.02 45)",
      secondaryForeground: "oklch(0.708 0 0)",
      accent: "oklch(0.28 0.025 45)",
      accentForeground: "oklch(0.708 0 0)",
      muted: "oklch(0.25 0.015 45)",
      mutedForeground: "oklch(0.708 0 0)",
    },
  },
  {
    name: "red",
    label: "Red",
    hex: "#ef4444",
    light: {
      primary: "oklch(0.6 0.14 27)",
      primaryForeground: "oklch(0.145 0 0)",
      secondary: "oklch(0.97 0.008 27)",
      secondaryForeground: "oklch(0.145 0 0)",
      accent: "oklch(0.95 0.015 27)",
      accentForeground: "oklch(0.145 0 0)",
      muted: "oklch(0.97 0.005 27)",
      mutedForeground: "oklch(0.556 0 0)",
    },
    dark: {
      primary: "oklch(0.7 0.12 27)",
      primaryForeground: "oklch(0.985 0 0)",
      secondary: "oklch(0.25 0.02 27)",
      secondaryForeground: "oklch(0.708 0 0)",
      accent: "oklch(0.28 0.025 27)",
      accentForeground: "oklch(0.708 0 0)",
      muted: "oklch(0.25 0.015 27)",
      mutedForeground: "oklch(0.708 0 0)",
    },
  },
]

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  brandColor: BrandColor
  setBrandColor: (color: BrandColor) => void
  brandColors: BrandColorConfig[]
  fontFamily: FontFamily
  setFontFamily: (font: FontFamily) => void
  fontFamilies: FontConfig[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme")
    return (saved as Theme) || "light"
  })

  const [brandColor, setBrandColorState] = useState<BrandColor>(() => {
    const saved = localStorage.getItem("brandColor")
    return (saved as BrandColor) || "blue"
  })

  const [fontFamily, setFontFamilyState] = useState<FontFamily>(() => {
    const saved = localStorage.getItem("fontFamily")
    return (saved as FontFamily) || "geist"
  })

  useEffect(() => {
    const root = document.documentElement

    // Apply theme class
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    localStorage.setItem("theme", theme)

    // Apply brand color palette
    const colorConfig = brandColors.find((c) => c.name === brandColor)
    if (colorConfig) {
      const colors = theme === "dark" ? colorConfig.dark : colorConfig.light
      root.style.setProperty("--primary", colors.primary)
      root.style.setProperty("--primary-foreground", colors.primaryForeground)
      root.style.setProperty("--secondary", colors.secondary)
      root.style.setProperty(
        "--secondary-foreground",
        colors.secondaryForeground
      )
      root.style.setProperty("--accent", colors.accent)
      root.style.setProperty("--accent-foreground", colors.accentForeground)
      root.style.setProperty("--muted", colors.muted)
      root.style.setProperty("--muted-foreground", colors.mutedForeground)

      // Apply transparent card background with brand color tint
      // Extract the hue from the primary color for card backgrounds
      const primaryMatch = colors.primary.match(
        /oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/
      )
      if (primaryMatch) {
        const [, , chroma, hue] = primaryMatch
        // Very subtle chroma for card backgrounds (transparent effect)
        const cardBg =
          theme === "dark"
            ? `oklch(0.19 ${parseFloat(chroma) * 0.15} ${hue})`
            : `oklch(0.98 ${parseFloat(chroma) * 0.1} ${hue})`
        root.style.setProperty("--card", cardBg)
      }
    }
    localStorage.setItem("brandColor", brandColor)

    // Apply font family
    const fontConfig = fontFamilies.find((f) => f.name === fontFamily)
    if (fontConfig) {
      root.style.setProperty("--font-sans", fontConfig.value)
    }
    localStorage.setItem("fontFamily", fontFamily)
  }, [theme, brandColor, fontFamily])

  // Keyboard shortcuts for color themes
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return
      }

      const key = event.key
      const colorMap: { [key: string]: BrandColor } = {
        "1": "blue",
        "2": "purple",
        "3": "green",
        "4": "orange",
        "5": "red",
      }

      if (colorMap[key]) {
        event.preventDefault()
        setBrandColor(colorMap[key])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const setBrandColor = (color: BrandColor) => {
    setBrandColorState(color)
  }

  const setFontFamily = (font: FontFamily) => {
    setFontFamilyState(font)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        brandColor,
        setBrandColor,
        brandColors,
        fontFamily,
        setFontFamily,
        fontFamilies,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
