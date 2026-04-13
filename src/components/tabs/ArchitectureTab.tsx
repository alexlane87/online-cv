import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import {
  Shield,
  Info,
  MousePointer2,
  Code2,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
  type Node,
} from "reactflow"
import "reactflow/dist/style.css"
import { useTheme } from "@/contexts/ThemeContext"
import { useNavigation } from "@/contexts/NavigationContext"
import { fadeInUp, unfurlAnimation } from "@/lib/animations"

// --- THEME & STYLING CONFIG ---
const colors = {
  primary: { bg: "#EFF6FF", border: "#3B82F6", text: "#1E3A8A" }, // Blue (System/Internal)
  secondary: { bg: "#ECFDF5", border: "#10B981", text: "#064E3B" }, // Green (Users/Clients)
  tertiary: { bg: "#FFFBEB", border: "#F59E0B", text: "#78350F" }, // Orange (External/Data)
  dark: { bg: "#1F2937", border: "#4B5563", text: "#F3F4F6" }, // Dark mode base
}

const createStyle = (
  type: "primary" | "secondary" | "tertiary",
  isDark: boolean
) => ({
  background: isDark ? colors.dark.bg : colors[type].bg,
  border: `2px solid ${colors[type].border}`,
  color: isDark ? colors.dark.text : colors[type].text,
  borderRadius: "8px",
  padding: "12px 16px",
  fontSize: "14px",
  fontWeight: 600,
  textAlign: "center" as const,
  width: 200,
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
})

// Edge label style - subtle, no background, bold text
const createEdgeLabelStyle = (isDark: boolean) => ({
  fill: isDark ? "#94a3b8" : "#64748b",
  fontWeight: 600,
  fontSize: 11,
})

const createEdgeOptions = (isDark: boolean) => ({
  animated: true,
  style: { strokeWidth: 2, stroke: isDark ? "#6b7280" : "#9ca3af" },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: isDark ? "#6b7280" : "#9ca3af",
  },
  labelStyle: createEdgeLabelStyle(isDark),
  labelBgStyle: { fill: "transparent", strokeWidth: 0 },
})

// --- C4 DATA DEFINITIONS ---

type C4Level = "context" | "container" | "component" | "code"

const flowData = {
  context: {
    title: "Level 1: System Context",
    description:
      "The big picture. Shows how the Climate-Risk Analytics Platform fits into the enterprise ecosystem.",
    mermaidCode: `graph TB
    User(Enterprise Risk Analyst)
    System[Climate Risk Platform<br/>Multi-Region SaaS]
    Data[(Global Weather Datasets<br/>External APIs e.g., NASA)]
    Auth{Enterprise Auth<br/>SAML/SSO}
    
    User -->|Calculates financial impact| System
    System -->|Ingests gridded climate data| Data
    System -->|Authenticates via| Auth`,
    nodes: [
      {
        id: "c1",
        position: { x: 250, y: 50 },
        data: {
          label: "Enterprise Risk Analyst",
          detail:
            "Internal or external user accessing the dashboard to run climate risk projections.",
        },
        type: "input",
        style: {},
      },
      {
        id: "c2",
        position: { x: 250, y: 200 },
        data: {
          label: "Climate Risk Platform",
          detail:
            "Multi-Region SaaS platform providing asynchronous risk calculations and mapping.",
        },
        style: {},
      },
      {
        id: "c3",
        position: { x: 50, y: 350 },
        data: {
          label: "Global Weather Datasets",
          detail:
            "External APIs (e.g., NASA) providing complex gridded climate data.",
        },
        type: "output",
        style: {},
      },
      {
        id: "c4",
        position: { x: 450, y: 350 },
        data: {
          label: "Enterprise Auth (SSO)",
          detail:
            "SAML/OAuth provider ensuring strict ISO 27001 access compliance.",
        },
        type: "output",
        style: {},
      },
    ],
    edges: [
      {
        id: "e1-2",
        source: "c1",
        target: "c2",
        label: "Calculates impact",
      },
      {
        id: "e2-3",
        source: "c2",
        target: "c3",
        label: "Ingests data",
      },
      {
        id: "e2-4",
        source: "c2",
        target: "c4",
        label: "Authenticates via",
      },
    ],
  },
  container: {
    title: "Level 2: Container",
    description:
      "The independently deployable units: SPA frontend, async Django backend, and geospatial data layers.",
    mermaidCode: `graph TB
    User(User Browser)
    CDN[Edge CDN<br/>Static Assets]
    FE[Dashboard App<br/>Vue.js + Quasar]
    API[Core Backend API<br/>Django REST]
    Worker[Async Task Workers<br/>Celery]
    DB[(Geospatial DB<br/>PostgreSQL + PostGIS)]
    Cache[(In-Memory Cache<br/>Redis)]
    
    User -->|HTTPS| CDN
    CDN -->|Serves| FE
    FE -->|REST API| API
    API -->|Reads/Writes| DB
    API -->|Caches| Cache
    API -->|Enqueues Tasks| Worker
    Worker -->|Processes Heavy Data| DB`,
    nodes: [
      {
        id: "cont1",
        position: { x: 300, y: 0 },
        data: {
          label: "User Browser",
          detail: "Client browser running the Single Page Application.",
        },
        type: "input",
        style: {},
      },
      {
        id: "cont2",
        position: { x: 300, y: 100 },
        data: {
          label: "Edge CDN (Cloudflare)",
          detail: "Distributes static assets globally for low latency.",
        },
        style: {},
      },
      {
        id: "cont3",
        position: { x: 300, y: 200 },
        data: {
          label: "Dashboard App (Vue.js)",
          detail:
            "Vue.js + Quasar frontend with ApexCharts for complex data visualisation.",
        },
        style: {},
      },
      {
        id: "cont4",
        position: { x: 300, y: 320 },
        data: {
          label: "Core Backend API",
          detail: "Django REST Framework handling business logic and routing.",
        },
        style: {},
      },
      {
        id: "cont5",
        position: { x: 50, y: 450 },
        data: {
          label: "Async Task Workers",
          detail:
            "Celery workers processing heavy geospatial data outside the request cycle.",
        },
        style: {},
      },
      {
        id: "cont6",
        position: { x: 300, y: 450 },
        data: {
          label: "Geospatial DB",
          detail:
            "PostgreSQL + PostGIS storing complex geographic polygon data.",
        },
        type: "output",
        style: {},
      },
      {
        id: "cont7",
        position: { x: 550, y: 450 },
        data: {
          label: "In-Memory Cache",
          detail:
            "Redis handling session states and cache pre-warming strategies.",
        },
        type: "output",
        style: {},
      },
    ],
    edges: [
      {
        id: "ec1-2",
        source: "cont1",
        target: "cont2",
        label: "HTTPS",
      },
      {
        id: "ec2-3",
        source: "cont2",
        target: "cont3",
        label: "Serves",
      },
      {
        id: "ec3-4",
        source: "cont3",
        target: "cont4",
        label: "REST API",
      },
      {
        id: "ec4-5",
        source: "cont4",
        target: "cont5",
        label: "Enqueues",
      },
      {
        id: "ec4-6",
        source: "cont4",
        target: "cont6",
        label: "R/W",
      },
      {
        id: "ec4-7",
        source: "cont4",
        target: "cont7",
        label: "Caches",
      },
      {
        id: "ec5-6",
        source: "cont5",
        target: "cont6",
        label: "Processes",
      },
    ],
  },
  component: {
    title: "Level 3: Component (Backend Top-to-Bottom)",
    description:
      "How requests flow through the Core Backend API to specific domain services.",
    mermaidCode: `graph TB
    Router[API Router<br/>Django URLs]
    Auth{Auth Middleware<br/>Security Validation}
    RiskService[Risk Analysis Service<br/>Core Logic]
    GeoService[Geospatial Service<br/>PostGIS Interface]
    Queue[(Task Broker<br/>Redis/Celery Client)]
    
    Router -->|Validates| Auth
    Router -->|Routes to| RiskService
    RiskService -->|Delegates mapping| GeoService
    RiskService -->|Dispatches async calc| Queue
    
    subgraph Core Backend API Container
        Router
        Auth
        RiskService
        GeoService
        Queue
    end`,
    nodes: [
      {
        id: "comp1",
        position: { x: 250, y: 0 },
        data: {
          label: "API Router",
          detail: "Django URLs and initial request validation.",
        },
        type: "input",
        style: {},
      },
      {
        id: "comp2",
        position: { x: 500, y: 100 },
        data: {
          label: "Auth Middleware",
          detail: "Validates JWT/SSO tokens against active sessions.",
        },
        style: {},
      },
      {
        id: "comp3",
        position: { x: 250, y: 150 },
        data: {
          label: "Risk Analysis Service",
          detail: "Core domain logic orchestrating the calculations.",
        },
        style: {},
      },
      {
        id: "comp4",
        position: { x: 50, y: 300 },
        data: {
          label: "Geospatial Service",
          detail: "Interfaces directly with PostGIS for spatial queries.",
        },
        style: {},
      },
      {
        id: "comp5",
        position: { x: 450, y: 300 },
        data: {
          label: "Task Broker Client",
          detail: "Pushes validated analysis jobs to the Celery queue.",
        },
        type: "output",
        style: {},
      },
    ],
    edges: [
      {
        id: "eco1-2",
        source: "comp1",
        target: "comp2",
        label: "Validates",
      },
      {
        id: "eco1-3",
        source: "comp1",
        target: "comp3",
        label: "Routes to",
      },
      {
        id: "eco3-4",
        source: "comp3",
        target: "comp4",
        label: "Maps data",
      },
      {
        id: "eco3-5",
        source: "comp3",
        target: "comp5",
        label: "Dispatches async",
      },
    ],
  },
  code: {
    title: "Level 4: Process Flow (Risk Calculation Pipeline)",
    description:
      "The step-by-step programmatic logic of executing a climate risk calculation.",
    mermaidCode: `graph TD
    P1[1. Receive Payload] --> P2[2. Validate Schema]
    P2 --> P3[3. Fetch Gridded Data]
    P3 --> P4A[4A. Calc Physical Risk]
    P3 --> P4B[4B. Calc Transition Risk]
    P4A --> P5[5. Aggregate Results]
    P4B --> P5
    P5 --> P6[6. Store & Notify]`,
    nodes: [
      {
        id: "p1",
        position: { x: 300, y: 0 },
        data: {
          label: "1. Receive Payload",
          detail:
            "Worker picks up job containing coordinates and risk parameters.",
        },
        type: "input",
        style: {},
      },
      {
        id: "p2",
        position: { x: 300, y: 100 },
        data: {
          label: "2. Validate Schema",
          detail: "Pydantic validates the incoming JSON schema.",
        },
        style: {},
      },
      {
        id: "p3",
        position: { x: 300, y: 200 },
        data: {
          label: "3. Fetch Gridded Data",
          detail: "Retrieve overlapping spatial data from NASA/PostGIS.",
        },
        style: {},
      },
      {
        id: "p4",
        position: { x: 100, y: 320 },
        data: {
          label: "4A. Calc Physical Risk",
          detail: "Run flood/temperature models against coordinates.",
        },
        style: {},
      },
      {
        id: "p5",
        position: { x: 500, y: 320 },
        data: {
          label: "4B. Calc Transition Risk",
          detail: "Calculate carbon pricing and supply chain impacts.",
        },
        style: {},
      },
      {
        id: "p6",
        position: { x: 300, y: 450 },
        data: {
          label: "5. Aggregate Results",
          detail: "Combine vectors into a single financial impact score.",
        },
        style: {},
      },
      {
        id: "p7",
        position: { x: 300, y: 550 },
        data: {
          label: "6. Store & Notify",
          detail: "Save to DB and trigger Webhook/Email completion.",
        },
        type: "output",
        style: {},
      },
    ],
    edges: [
      { id: "ep1-2", source: "p1", target: "p2", label: "JSON payload" },
      { id: "ep2-3", source: "p2", target: "p3", label: "Valid request" },
      { id: "ep3-4", source: "p3", target: "p4", label: "Climate data" },
      { id: "ep3-5", source: "p3", target: "p5", label: "Market data" },
      { id: "ep4-6", source: "p4", target: "p6", label: "Physical score" },
      { id: "ep5-6", source: "p5", target: "p6", label: "Transition score" },
      { id: "ep6-7", source: "p6", target: "p7", label: "Final report" },
    ],
  },
}

export function ArchitectureTab() {
  const [activeLevel, setActiveLevel] = useState<C4Level>("context")
  const [selectedNodeData, setSelectedNodeData] = useState<any>(null)
  const { viewMode, setViewMode } = useNavigation()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  // Load appropriate diagram data based on active level and theme
  useEffect(() => {
    const currentData = flowData[activeLevel]
    const edgeOptions = createEdgeOptions(isDark)

    // Apply styling based on node types (Input = Green, Output = Orange, Default = Blue)
    const styledNodes = currentData.nodes.map((node) => {
      let type: "primary" | "secondary" | "tertiary" = "primary"
      if (node.type === "input") type = "secondary"
      if (node.type === "output") type = "tertiary"

      return {
        ...node,
        style: createStyle(type, isDark),
      }
    })

    // Apply edge styling with theme-aware labels
    const styledEdges = currentData.edges.map((edge) => ({
      ...edge,
      ...edgeOptions,
    }))

    setNodes(styledNodes)
    setEdges(styledEdges)
    setSelectedNodeData(null) // Reset selection on tab change
  }, [activeLevel, isDark, setNodes, setEdges])

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNodeData(node.data)
  }, [])

  const activeDiagram = flowData[activeLevel]

  return (
    <motion.div
      {...fadeInUp}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-6 py-8"
    >
      {/* Sticky Header */}
      <div className="sticky top-16 z-10 -mx-6 mb-8 border-b border-border bg-background/95 px-6 py-4 backdrop-blur-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="mb-2 text-4xl font-bold">
              Interactive System Architecture
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore the SaaS platform infrastructure. Pan, zoom, and click
              nodes for detailed context.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("brief")}
              title="Brief view (Press ↑)"
              className={`flex items-center gap-2 cursor-pointer rounded-lg px-4 py-2 text-sm transition-all ${
                viewMode === "brief"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary hover:shadow-md"
              }`}
            >
              <ArrowUp size={16} />
              Brief
            </button>
            <button
              onClick={() => setViewMode("detailed")}
              title="Detailed view (Press ↓)"
              className={`flex items-center gap-2 cursor-pointer rounded-lg px-4 py-2 text-sm transition-all ${
                viewMode === "detailed"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary hover:shadow-md"
              }`}
            >
              <ArrowDown size={16} />
              Detailed
            </button>
          </div>
        </div>
      </div>

      {/* Level Selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(flowData) as C4Level[]).map((level) => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeLevel === level
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {flowData[level].title}
          </button>
        ))}
      </div>

      {/* ROW 1: TWO COLUMN LAYOUT - Interactive Diagram (Left) & Context Panel (Right) */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: React Flow Canvas */}
        <div className="flex h-[600px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm lg:col-span-2">
          <div className="relative z-10 flex items-center justify-between border-b border-border bg-secondary/50 p-4">
            <div>
              <h3 className="text-lg font-semibold">{activeDiagram.title}</h3>
              <p className="text-sm text-muted-foreground">
                {activeDiagram.description}
              </p>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground sm:flex">
              <MousePointer2 size={14} />
              <span>Interactive Canvas</span>
            </div>
          </div>

          <div className="relative w-full flex-1 bg-muted/10">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              fitView
              attributionPosition="bottom-right"
              className="bg-grid-pattern"
            >
              <Background color={isDark ? "#374151" : "#E5E7EB"} gap={16} />
              <Controls
                className="!border-border !shadow-md"
                style={{
                  backgroundColor: isDark
                    ? "hsl(222.2 84% 4.9%)"
                    : "hsl(0 0% 100%)",
                  borderColor: isDark
                    ? "hsl(217.2 32.6% 17.5%)"
                    : "hsl(214.3 31.8% 91.4%)",
                }}
              />
            </ReactFlow>
          </div>
        </div>

        {/* Right Column: Node Details & Principles */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* Dynamic Details Panel */}
          <div className="flex-1 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
              <Info className="text-primary" size={20} />
              <h3 className="text-lg font-semibold">Component Inspector</h3>
            </div>

            {selectedNodeData ? (
              <motion.div
                key={selectedNodeData.label}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div>
                  <div className="mb-1 text-xs font-semibold tracking-wider text-primary uppercase">
                    Selected Element
                  </div>
                  <h4 className="text-xl font-bold text-foreground">
                    {selectedNodeData.label}
                  </h4>
                </div>
                <div className="rounded-lg border border-border bg-secondary/50 p-4">
                  <p className="text-sm leading-relaxed text-foreground">
                    {selectedNodeData.detail}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20 px-4 text-center">
                <MousePointer2
                  className="mb-3 text-muted-foreground opacity-50"
                  size={32}
                />
                <p className="text-sm text-muted-foreground">
                  Click on any node in the diagram to view its architectural
                  purpose and technical details.
                </p>
              </div>
            )}
          </div>

          {/* Static Compliance Panel */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <Shield className="text-primary" size={20} />
              <h3 className="text-base font-semibold">
                Infrastructure Standards
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                  Built to strict <strong>ISO 27001</strong> standards.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Multi-level autoscaling for Celery async workers.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Deep observability stack (Datadog & Sentry).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ROW 2: SINGLE COLUMN - Mermaid Code (Centred) - detailed only */}
      <AnimatePresence mode="wait">
        {viewMode === "detailed" && (
          <motion.div {...unfurlAnimation} className="mx-auto w-full lg:w-3/4">
            <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div className="flex items-center gap-2 border-b border-border bg-muted/20 px-6 py-4">
                <Code2 className="text-primary" size={18} />
                <h4 className="text-sm font-semibold text-primary">
                  Architecture as Code (Mermaid Syntax)
                </h4>
              </div>
              <div className="bg-muted/5 p-6">
                <pre className="overflow-auto rounded-md border border-border bg-background p-4 font-mono text-xs text-muted-foreground">
                  <code>{activeDiagram.mermaidCode}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
