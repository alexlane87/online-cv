import { AnimatePresence } from "framer-motion"
import { NavigationProvider, useNavigation } from "@/contexts/NavigationContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { CommandLegend } from "@/components/CommandLegend"
import { ExportModal } from "@/components/ExportModal"
import { SummaryTab } from "@/components/tabs/SummaryTab"
import { LeadershipTab } from "@/components/tabs/LeadershipTab"
import { CareerTab } from "@/components/tabs/CareerTab"
import { TechnicalTab } from "@/components/tabs/TechnicalTab"
import { DataScienceTab } from "@/components/tabs/DataScienceTab"
import { DevOpsTab } from "@/components/tabs/DevOpsTab"
import { ArchitectureTab } from "@/components/tabs/ArchitectureTab"

function AppContent() {
  const { currentTab } = useNavigation()

  return (
    <div className="min-h-screen bg-background">
      <CommandLegend />
      <div className="pt-16">
        <AnimatePresence mode="wait">
          {currentTab === "s" && <SummaryTab key="summary" />}
          {currentTab === "l" && <LeadershipTab key="leadership" />}
          {currentTab === "c" && <CareerTab key="career" />}
          {currentTab === "t" && <TechnicalTab key="technical" />}
          {currentTab === "d" && <DataScienceTab key="datascience" />}
          {currentTab === "o" && <DevOpsTab key="devops" />}
          {currentTab === "a" && <ArchitectureTab key="architecture" />}
        </AnimatePresence>
      </div>
      <ExportModal />
    </div>
  )
}

export function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ThemeProvider>
  )
}

export default App
