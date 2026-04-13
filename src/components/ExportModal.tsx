import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Download, FileText } from "lucide-react"
import { useNavigation } from "@/contexts/NavigationContext"
import { Button } from "@/components/ui/button"
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Font,
} from "@react-pdf/renderer"
import { Document as DocxDocument, Packer, Paragraph, TextRun } from "docx"

// Register a clean sans-serif font for PDF
// Using Trebuchet MS style through system fonts, fallback to Helvetica
Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-italic.ttf",
      fontStyle: "italic",
    },
  ],
})

// Shared font family for consistency between PDF and DOCX
const FONT_FAMILY = "Open Sans"
const DOCX_FONT = "Trebuchet MS" // Clean sans-serif available in Word

// Helper to create styled TextRun for DOCX
const createTextRun = (
  text: string,
  options: { bold?: boolean; italics?: boolean; size?: number } = {}
) =>
  new TextRun({
    text,
    font: DOCX_FONT,
    ...options,
  })

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: FONT_FAMILY,
  },
  header: {
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 3,
  },
  title: {
    fontSize: 12,
    color: "#444",
    marginBottom: 8,
  },
  contact: {
    fontSize: 10,
    color: "#666",
    marginBottom: 3,
  },
  section: {
    marginTop: 15,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#222",
    textTransform: "uppercase",
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
  },
  jobDate: {
    fontSize: 9,
    color: "#666",
    marginBottom: 5,
    fontStyle: "italic",
  },
  text: {
    fontSize: 10,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  bulletPoint: {
    fontSize: 10,
    marginLeft: 12,
    marginBottom: 3,
    lineHeight: 1.3,
  },
})

type FileFormat = "pdf" | "md" | "docx"

function getFormattedDate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}_${month}_${day}`
}

// Fetch README.md as the source of truth
async function fetchREADME(): Promise<string> {
  try {
    const response = await fetch("/README.md")
    if (response.ok) {
      return await response.text()
    }
  } catch (error) {
    console.error("Error fetching README:", error)
  }

  // Fallback content if README fetch fails
  return `# Alex Lane
**Head of Engineering**
📧 Email: alexlane87@outlook.com | 📱 Phone: 07510 664936 | 📍 Bristol, UK

Error: Could not load CV content. Please try again.`
}

// Helper to clean markdown formatting for plain text export
function cleanMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markers
    .replace(/\*(.*?)\*/g, "$1") // Remove italic markers
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Remove links, keep text
    .replace(/`(.*?)`/g, "$1") // Remove code markers
    .trim()
}

// Parse README markdown into structured sections
interface CVSection {
  title: string
  content: string[]
  subsections?: { title: string; period?: string; items: string[] }[]
}

function parseREADME(markdown: string): CVSection[] {
  const lines = markdown.split("\n")
  const sections: CVSection[] = []
  let currentSection: CVSection | null = null
  let currentSubsection: {
    title: string
    period?: string
    items: string[]
  } | null = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Main heading (# Title)
    if (line.startsWith("# ")) {
      if (currentSection) sections.push(currentSection)
      currentSection = {
        title: line.replace("# ", ""),
        content: [],
        subsections: [],
      }
      currentSubsection = null
    }
    // Section heading (## Title)
    else if (line.startsWith("## ")) {
      if (currentSection && currentSubsection) {
        currentSection.subsections?.push(currentSubsection)
      }
      if (currentSection) sections.push(currentSection)
      currentSection = {
        title: line.replace("## ", ""),
        content: [],
        subsections: [],
      }
      currentSubsection = null
    }
    // Subsection heading (### Title)
    else if (line.startsWith("### ")) {
      if (currentSubsection && currentSection) {
        currentSection.subsections?.push(currentSubsection)
      }
      // Check next line for period/date
      const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : ""
      const period = nextLine.startsWith("*")
        ? nextLine.replace(/\*/g, "")
        : undefined
      if (period) i++ // Skip the period line

      currentSubsection = {
        title: line.replace("### ", ""),
        period,
        items: [],
      }
    }
    // List items (convert * to • for display)
    else if (line.startsWith("* ") || line.startsWith("- ")) {
      const content = line.substring(2).trim()
      if (currentSubsection) {
        currentSubsection.items.push(content)
      } else if (currentSection) {
        currentSection.content.push(`• ${content}`)
      }
    }
    // Regular content
    else if (line && !line.startsWith("---")) {
      if (currentSection && !currentSubsection) {
        currentSection.content.push(line)
      }
    }
  }

  // Push final section
  if (currentSubsection && currentSection) {
    currentSection.subsections?.push(currentSubsection)
  }
  if (currentSection) {
    sections.push(currentSection)
  }

  return sections
}

async function generateDOCXContent(): Promise<Paragraph[]> {
  const readmeContent = await fetchREADME()
  const sections = parseREADME(readmeContent)
  const paragraphs: Paragraph[] = []

  // Extract header info
  const headerSection = sections[0]
  const name = headerSection?.title || "Alex Lane"
  const titleLine = headerSection?.content[0] || "**Head of Engineering**"
  const title = titleLine.replace(/\*\*/g, "")
  const contactLine = headerSection?.content[1] || ""
  const contact = contactLine
    .replace(/📧|📱|📍/g, "")
    .replace("Email:", "")
    .replace("Phone:", "")
    .replace(/\[LinkedIn\]\(.*?\)/g, "")
    .trim()

  // Header
  paragraphs.push(
    new Paragraph({
      children: [createTextRun(name, { bold: true, size: 32 })],
      spacing: { after: 100 },
    })
  )
  paragraphs.push(
    new Paragraph({
      children: [createTextRun(title, { italics: true, size: 24 })],
      spacing: { after: 200 },
    })
  )
  paragraphs.push(
    new Paragraph({
      children: [createTextRun(contact, { size: 20 })],
      spacing: { after: 300 },
    })
  )

  // Process all sections
  sections.slice(1).forEach((section) => {
    // Section title
    paragraphs.push(
      new Paragraph({
        children: [
          createTextRun(section.title.toUpperCase(), { bold: true, size: 24 }),
        ],
        spacing: { before: 200, after: 150 },
      })
    )

    // Regular content
    section.content.forEach((content) => {
      const cleanContent = cleanMarkdown(content)
      paragraphs.push(
        new Paragraph({
          children: [createTextRun(cleanContent)],
          spacing: { after: 100 },
        })
      )
    })

    // Subsections (for Professional Experience)
    if (section.subsections && section.subsections.length > 0) {
      section.subsections.forEach((sub, idx) => {
        paragraphs.push(
          new Paragraph({
            children: [createTextRun(sub.title, { bold: true })],
            spacing: { before: idx > 0 ? 150 : 0, after: 50 },
          })
        )
        if (sub.period) {
          paragraphs.push(
            new Paragraph({
              children: [createTextRun(sub.period, { italics: true })],
              spacing: { after: 100 },
            })
          )
        }
        sub.items.forEach((item) => {
          const cleanItem = cleanMarkdown(item)
          paragraphs.push(
            new Paragraph({
              children: [createTextRun(`• ${cleanItem}`)],
              spacing: { after: 50 },
            })
          )
        })
      })
    }
  })

  return paragraphs
}

export function ExportModal() {
  const { showExportModal, setShowExportModal } = useNavigation()
  const [fileFormat, setFileFormat] = useState<FileFormat>("pdf")
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    setIsGenerating(true)

    try {
      const readmeContent = await fetchREADME()
      const sections = parseREADME(readmeContent)

      // Extract header info
      const headerSection = sections[0]
      const name = headerSection?.title || "Alex Lane"
      const titleLine = headerSection?.content[0] || "**Head of Engineering**"
      const title = titleLine.replace(/\*\*/g, "")
      const contactLine = headerSection?.content[1] || ""
      const contact = contactLine
        .replace(/📧|📱|📍/g, "")
        .replace("Email:", "")
        .replace("Phone:", "")
        .replace(/\[LinkedIn\]\(.*?\)/g, "")
        .trim()

      const CVDocument = (
        <Document>
          <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.contact}>{contact}</Text>
            </View>

            {/* Render all sections */}
            {sections.slice(1).map((section, idx) => (
              <View key={idx} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>

                {/* Regular content */}
                {section.content.map((content, i) => (
                  <Text key={i} style={styles.text}>
                    {cleanMarkdown(content)}
                  </Text>
                ))}

                {/* List items */}
                {section.content.length === 0 &&
                  !section.subsections?.length && (
                    <Text style={styles.text}>(Content not available)</Text>
                  )}

                {/* Subsections (for Professional Experience) */}
                {section.subsections?.map((sub, subIdx) => (
                  <View key={subIdx} style={{ marginTop: subIdx > 0 ? 10 : 0 }}>
                    <Text style={styles.jobTitle}>{sub.title}</Text>
                    {sub.period && (
                      <Text style={styles.jobDate}>{sub.period}</Text>
                    )}
                    {sub.items.map((item, itemIdx) => (
                      <Text key={itemIdx} style={styles.bulletPoint}>
                        • {cleanMarkdown(item)}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            ))}
          </Page>
        </Document>
      )

      const blob = await pdf(CVDocument).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      const dateStr = getFormattedDate()
      link.download = `${dateStr}_Alex_Lane_CV.pdf`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateMarkdown = async () => {
    setIsGenerating(true)

    try {
      // Directly fetch and download README.md
      const markdown = await fetchREADME()
      const blob = new Blob([markdown], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      const dateStr = getFormattedDate()
      link.download = `${dateStr}_Alex_Lane_CV.md`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating Markdown:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateDOCX = async () => {
    setIsGenerating(true)

    try {
      const content = await generateDOCXContent()
      const doc = new DocxDocument({
        sections: [
          {
            properties: {},
            children: content,
          },
        ],
      })

      const blob = await Packer.toBlob(doc)
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      const dateStr = getFormattedDate()
      link.download = `${dateStr}_Alex_Lane_CV.docx`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating DOCX:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExport = () => {
    switch (fileFormat) {
      case "pdf":
        generatePDF()
        break
      case "md":
        generateMarkdown()
        break
      case "docx":
        generateDOCX()
        break
    }
  }

  return (
    <AnimatePresence>
      {showExportModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
          onClick={() => setShowExportModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="text-primary" size={24} />
                <h2 className="text-2xl font-bold">Export CV</h2>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <X size={24} />
              </button>
            </div>

            {/* Description */}
            <p className="mb-6 text-sm text-muted-foreground">
              Download a professional CV in your preferred format. The CV
              includes all relevant sections: professional experience, technical
              skills, achievements, data science expertise, and certifications.
            </p>

            {/* File Format Selector */}
            <div className="mb-6">
              <label className="mb-3 block text-sm font-semibold">
                Select Format
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setFileFormat("pdf")}
                  className={`flex-1 rounded-lg border px-6 py-4 text-sm font-medium transition-all ${
                    fileFormat === "pdf"
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : "border-border bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <FileText size={24} />
                    <span>PDF</span>
                  </div>
                </button>
                <button
                  onClick={() => setFileFormat("md")}
                  className={`flex-1 rounded-lg border px-6 py-4 text-sm font-medium transition-all ${
                    fileFormat === "md"
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : "border-border bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <FileText size={24} />
                    <span>Markdown</span>
                  </div>
                </button>
                <button
                  onClick={() => setFileFormat("docx")}
                  className={`flex-1 rounded-lg border px-6 py-4 text-sm font-medium transition-all ${
                    fileFormat === "docx"
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : "border-border bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <FileText size={24} />
                    <span>DOCX</span>
                  </div>
                </button>
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                {getFormattedDate()}_Alex_Lane_CV.{fileFormat}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={() => setShowExportModal(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleExport}
                disabled={isGenerating}
                className="flex-1"
              >
                {isGenerating ? (
                  "Generating..."
                ) : (
                  <>
                    <Download size={16} className="mr-2" />
                    Download {fileFormat.toUpperCase()}
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
