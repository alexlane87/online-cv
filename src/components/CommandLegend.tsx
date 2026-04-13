import { useNavigation } from "@/contexts/NavigationContext"
import { Moon, Sun, Type, Home } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { slideDown } from "@/lib/animations"

const commands = [
  { key: "S", label: "Summary" },
  { key: "L", label: "Leadership" },
  { key: "C", label: "Career" },
  { key: "T", label: "Technical" },
  { key: "D", label: "Data Science" },
  { key: "O", label: "DevOps" },
  { key: "A", label: "Architecture" },
  { key: "E", label: "Export" },
]

export function CommandLegend() {
  const { currentTab, setCurrentTab, setShowExportModal } = useNavigation()
  const {
    theme,
    toggleTheme,
    brandColor,
    setBrandColor,
    brandColors,
    fontFamily,
    setFontFamily,
    fontFamilies,
  } = useTheme()
  const [showFontMenu, setShowFontMenu] = useState(false)
  const fontMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        fontMenuRef.current &&
        !fontMenuRef.current.contains(event.target as Node)
      ) {
        setShowFontMenu(false)
      }
    }

    if (showFontMenu) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [showFontMenu])

  return (
    <motion.div
      {...slideDown}
      transition={{ duration: 0.3 }}
      className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Home Button */}
          <button
            onClick={() => setCurrentTab("s")}
            className={`flex cursor-pointer items-center gap-2 transition-colors hover:text-primary ${
              currentTab === "s"
                ? "font-semibold text-primary"
                : "text-muted-foreground"
            }`}
            title="Home / Summary"
          >
            <Home
              size={20}
              className={currentTab === "s" ? "text-primary" : ""}
            />
            <span className="hidden text-sm font-semibold sm:inline">
              Alex Lane
            </span>
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-border" />

          {/* Navigation Commands */}
          <div className="flex flex-1 items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <kbd className="rounded border border-border bg-muted px-2 py-1 font-mono text-xs">
                ←
              </kbd>
              <kbd className="rounded border border-border bg-muted px-2 py-1 font-mono text-xs">
                →
              </kbd>
            </div>
            {commands.map(({ key, label }) => {
              const isActive = currentTab === key.toLowerCase()
              return (
                <button
                  key={key}
                  onClick={() => {
                    if (key === "E") {
                      setShowExportModal(true)
                    } else {
                      setCurrentTab(key.toLowerCase() as any)
                    }
                  }}
                  title={`${label} (Press ${key})`}
                  className={`flex cursor-pointer items-center gap-2 transition-colors hover:text-primary ${
                    isActive
                      ? "font-semibold text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <kbd
                    className={`rounded border px-2 py-1 font-mono text-xs ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-muted"
                    }`}
                  >
                    {key}
                  </kbd>
                  <span className="hidden text-xs sm:inline">{label}</span>
                </button>
              )
            })}
          </div>

          {/* Theme Controls */}
          <div className="flex items-center gap-3">
            {/* Color Theme Selector */}
            <div className="flex items-center gap-1 rounded-lg border border-border p-1">
              {brandColors.map((colorScheme, index) => (
                <button
                  key={colorScheme.name}
                  onClick={() => setBrandColor(colorScheme.name)}
                  className={`group relative flex h-8 cursor-pointer items-center gap-1.5 rounded px-2 transition-all hover:scale-105 ${
                    brandColor === colorScheme.name
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : ""
                  }`}
                  title={`${colorScheme.label} (Press ${index + 1})`}
                  aria-label={`Switch to ${colorScheme.label} color scheme`}
                >
                  <div className="flex h-full items-center gap-0.5">
                    <div
                      className="h-3 w-3 rounded-sm"
                      style={{ backgroundColor: colorScheme.hex }}
                    />
                    <div
                      className="h-2 w-2 rounded-sm opacity-70"
                      style={{
                        backgroundColor: colorScheme.hex,
                        filter: "brightness(1.2)",
                      }}
                    />
                  </div>
                  <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {index + 1}
                  </kbd>
                  <span className="sr-only">{colorScheme.label}</span>
                </button>
              ))}
            </div>

            {/* Font Family Selector */}
            <div className="relative" ref={fontMenuRef}>
              <button
                onClick={() => setShowFontMenu(!showFontMenu)}
                className="cursor-pointer rounded-lg border border-border bg-muted p-2 transition-colors hover:bg-muted/80"
                aria-label="Select font"
                title="Change font"
              >
                <Type size={16} />
              </button>
              <AnimatePresence>
                {showFontMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 z-50 mt-2 w-40 rounded-lg border border-border bg-card shadow-lg"
                  >
                    {fontFamilies.map((font) => (
                      <button
                        key={font.name}
                        onClick={() => {
                          setFontFamily(font.name)
                          setShowFontMenu(false)
                        }}
                        className={`w-full cursor-pointer px-4 py-2 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-accent ${
                          fontFamily === font.name
                            ? "bg-primary font-semibold text-primary-foreground"
                            : ""
                        }`}
                        style={{ fontFamily: font.value }}
                      >
                        {font.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="cursor-pointer rounded-lg border border-border bg-muted p-2 transition-colors hover:bg-muted/80"
              aria-label="Toggle theme"
              title={`Toggle ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
