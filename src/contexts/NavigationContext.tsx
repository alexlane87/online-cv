import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"

export type TabKey = "s" | "l" | "c" | "t" | "d" | "o" | "a" | "e"
export type ViewMode = "brief" | "detailed"

export interface NavigationContextType {
  currentTab: TabKey
  setCurrentTab: (tab: TabKey) => void
  showExportModal: boolean
  setShowExportModal: (show: boolean) => void
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentTab, setCurrentTab] = useState<TabKey>("s")
  const [showExportModal, setShowExportModal] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = localStorage.getItem("viewMode")
    return (saved as ViewMode) || "detailed"
  })

  // Persist viewMode to localStorage
  useEffect(() => {
    localStorage.setItem("viewMode", viewMode)
  }, [viewMode])

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

      const key = event.key.toLowerCase()

      // Arrow key navigation for tabs (left/right)
      if (key === "arrowright" || key === "arrowleft") {
        event.preventDefault()
        const tabs: TabKey[] = ["s", "l", "c", "t", "d", "o", "a"]
        const currentIndex = tabs.indexOf(currentTab)

        if (key === "arrowright") {
          // Navigate to next tab (wrap around to first if at end)
          const nextIndex = (currentIndex + 1) % tabs.length
          setCurrentTab(tabs[nextIndex])
        } else {
          // Navigate to previous tab (wrap around to last if at start)
          const prevIndex =
            currentIndex === 0 ? tabs.length - 1 : currentIndex - 1
          setCurrentTab(tabs[prevIndex])
        }
        return
      }

      // Arrow key navigation for view mode (up/down)
      if (key === "arrowup" || key === "arrowdown") {
        event.preventDefault()
        if (key === "arrowup") {
          setViewMode("brief")
        } else {
          setViewMode("detailed")
        }
        return
      }

      if (key === "e") {
        event.preventDefault()
        setShowExportModal(true)
      } else if (["s", "l", "c", "t", "d", "o", "a"].includes(key)) {
        event.preventDefault()
        setCurrentTab(key as TabKey)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentTab])

  return (
    <NavigationContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        showExportModal,
        setShowExportModal,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
