import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  Brain,
  Database,
  Zap,
  MapPin,
  Network,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { useNavigation } from "@/contexts/NavigationContext"
import { fadeInUp, unfurlAnimation } from "@/lib/animations"

// Vibrant color palette for charts
const CHART_COLORS = {
  primary: "#6366f1", // Indigo
  secondary: "#ec4899", // Pink
  accent: "#14b8a6", // Teal
  warning: "#f59e0b", // Amber
  success: "#22c55e", // Green
  info: "#3b82f6", // Blue
  muted: "#94a3b8", // Slate
  purple: "#a855f7", // Purple
}

const ragPerformanceData = [
  { metric: "Accuracy", before: 65, after: 92 },
  { metric: "Response Time", before: 45, after: 85 },
  { metric: "User Satisfaction", before: 70, after: 95 },
  { metric: "Cost Efficiency", before: 60, after: 88 },
]

const automationImpact = [
  { task: "Report Gen", manual: 480, automated: 15 },
  { task: "Data Analysis", manual: 240, automated: 20 },
  { task: "Risk Scoring", manual: 180, automated: 5 },
  { task: "Visualisation", manual: 120, automated: 10 },
]

const projects = [
  {
    title: "Custom RAG Pipeline",
    icon: Brain,
    description: "Built enterprise-grade RAG system for document Q&A",
    achievements: [
      "Reduced hallucination rate by 75% through context optimisation",
      "Implemented hybrid search (semantic + keyword)",
      "Custom prompt engineering for domain-specific queries",
      "Vector database optimisation for sub-100ms retrieval",
    ],
    tech: ["LangChain", "Pinecone", "OpenAI", "Python"],
  },
  {
    title: "Geospatial Risk Modeling",
    icon: MapPin,
    description: "Built risk analysis system using PostGIS and ML models",
    achievements: [
      "Processed 10M+ geographic data points",
      "Real-time risk scoring with <200ms latency",
      "Interactive mapping dashboards",
      "Integration with third-party GIS data providers",
    ],
    tech: ["PostGIS", "Python", "Scikit-learn", "Leaflet"],
  },
  {
    title: "Automated Report Generation",
    icon: Zap,
    description: "AI-powered scientific report generation system",
    achievements: [
      "Reduced report generation from days to minutes",
      "Natural language data summarisation",
      "Automated chart and visualisation generation",
      "Quality validation and fact-checking pipeline",
    ],
    tech: ["GPT-4", "Python", "Pandas", "Matplotlib"],
  },
  {
    title: "In-House GPT Development",
    icon: Database,
    description: "Custom fine-tuned models for specialized tasks",
    achievements: [
      "Fine-tuned models on proprietary datasets",
      "Deployed on-premises for data sensitivity",
      "Cost reduction vs. API calls: 80%",
      "Custom evaluation metrics and monitoring",
    ],
    tech: ["Transformers", "PyTorch", "ONNX", "Docker"],
  },
  {
    title: "Graph Database Analytics",
    icon: Network,
    description: "Neo4J-powered relational analysis for complex data networks",
    achievements: [
      "Modeled multi-degree relationships where connections matter as much as data",
      "Pathfinding algorithms for fraud detection and risk propagation",
      "Real-time graph traversal queries for supply chain analysis",
      "Integrated with ML models for link prediction and clustering",
    ],
    tech: ["Neo4j", "Cypher", "Python", "Graph Algorithms"],
  },
]

export function DataScienceTab() {
  const { viewMode, setViewMode } = useNavigation()
  const { theme } = useTheme()

  // Dynamic colors based on theme for chart text
  const axisColor = theme === "dark" ? "#94a3b8" : "#64748b"
  const gridColor = theme === "dark" ? "#334155" : "#e2e8f0"

  return (
    <motion.div
      {...fadeInUp}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-6 py-8"
    >
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-2 text-4xl font-bold">Data Science & AI</h1>
          <p className="text-xl text-muted-foreground">
            Building intelligent systems that transform data into actionable
            insights
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("brief")}
            title="Brief view (Press ↑)"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all ${
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
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all ${
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

      {/* Key Metrics */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="overflow-hidden rounded-xl border border-border bg-card p-6 shadow-lg"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold">RAG Pipeline Performance</h3>
            <p className="text-sm text-muted-foreground">
              Before vs After optimisation scores (%)
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300} key={`rag-${theme}`}>
            <BarChart
              data={ragPerformanceData}
              layout="vertical"
              barGap={4}
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={gridColor}
                horizontal={true}
                vertical={false}
              />
              <XAxis
                type="number"
                stroke={axisColor}
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: gridColor }}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: axisColor }}
              />
              <YAxis
                type="category"
                dataKey="metric"
                stroke={axisColor}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={75}
                tick={{ fill: axisColor }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                  border: `1px solid ${gridColor}`,
                  borderRadius: "8px",
                  color: theme === "dark" ? "#f1f5f9" : "#1e293b",
                }}
                labelStyle={{ color: theme === "dark" ? "#f1f5f9" : "#1e293b" }}
                itemStyle={{ color: theme === "dark" ? "#f1f5f9" : "#1e293b" }}
                cursor={{
                  fill: theme === "dark" ? "#334155" : "#e2e8f0",
                  fillOpacity: 0.5,
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => (
                  <span style={{ color: axisColor }}>{value}</span>
                )}
              />
              <Bar
                dataKey="after"
                fill={CHART_COLORS.primary}
                name="After Optimisation"
                radius={[0, 4, 4, 0]}
                maxBarSize={20}
              />
              <Bar
                dataKey="before"
                fill={CHART_COLORS.muted}
                name="Before"
                radius={[0, 4, 4, 0]}
                maxBarSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="overflow-hidden rounded-xl border border-border bg-card p-6 shadow-lg"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Automation Impact</h3>
            <p className="text-sm text-muted-foreground">
              Time per task (Minutes)
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300} key={`auto-${theme}`}>
            <BarChart data={automationImpact} barGap={8}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={gridColor}
                vertical={false}
              />
              <XAxis
                dataKey="task"
                stroke={axisColor}
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: gridColor }}
                dy={10}
                tick={{ fill: axisColor }}
              />
              <YAxis
                stroke={axisColor}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}m`}
                tick={{ fill: axisColor }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                  border: `1px solid ${gridColor}`,
                  borderRadius: "8px",
                  color: theme === "dark" ? "#f1f5f9" : "#1e293b",
                }}
                labelStyle={{ color: theme === "dark" ? "#f1f5f9" : "#1e293b" }}
                itemStyle={{ color: theme === "dark" ? "#f1f5f9" : "#1e293b" }}
                cursor={{
                  fill: theme === "dark" ? "#334155" : "#e2e8f0",
                  fillOpacity: 0.5,
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => (
                  <span style={{ color: axisColor }}>{value}</span>
                )}
              />
              <Bar
                dataKey="automated"
                fill={CHART_COLORS.success}
                name="Automated"
                radius={[6, 6, 0, 0]}
                maxBarSize={50}
              />
              <Bar
                dataKey="manual"
                fill={CHART_COLORS.secondary}
                name="Manual Process"
                radius={[6, 6, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Project Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-lg border border-border bg-card p-6 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-3">
              <project.icon className="text-primary" size={28} />
              <h3 className="text-xl font-semibold">{project.title}</h3>
            </div>
            <p className="mb-4 text-muted-foreground">{project.description}</p>
            <AnimatePresence mode="wait">
              {viewMode === "detailed" && (
                <motion.ul {...unfurlAnimation} className="mb-4 space-y-2">
                  {project.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm text-muted-foreground"
                    >
                      <span className="mr-2 text-primary">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm transition-all hover:scale-105 hover:bg-primary/20 hover:shadow-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Technical Approach - only in detailed view */}
      <AnimatePresence mode="wait">
        {viewMode === "detailed" && (
          <motion.div
            {...unfurlAnimation}
            className="rounded-lg border border-border bg-card p-6 shadow-sm"
          >
            <h2 className="mb-4 text-2xl font-semibold">Technical Approach</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="mb-2 font-semibold text-primary">
                  Data Pipeline Architecture
                </h3>
                <p className="mb-2 text-sm text-muted-foreground">
                  End-to-end ETL pipelines with error handling, monitoring, and
                  observability. Focus on data quality, lineage tracking, and
                  reproducibility.
                </p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Batch and stream processing</li>
                  <li>• Data validation frameworks</li>
                  <li>• Incremental processing</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-primary">
                  Graph Database Systems
                </h3>
                <p className="mb-2 text-sm text-muted-foreground">
                  Neo4J for complex relational data where relationships are as
                  important as the data itself. Ideal for network analysis,
                  fraud detection, and knowledge graphs.
                </p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Cypher query optimisation</li>
                  <li>• Graph algorithms & analytics</li>
                  <li>• Relationship pattern mining</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-primary">
                  Model Development
                </h3>
                <p className="mb-2 text-sm text-muted-foreground">
                  Iterative model development with emphasis on explainability,
                  fairness, and production-readiness. MLOps best practices for
                  deployment and monitoring.
                </p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Feature engineering pipelines</li>
                  <li>• Model versioning and registry</li>
                  <li>• A/B testing frameworks</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-primary">
                  RAG & LLM Engineering
                </h3>
                <p className="mb-2 text-sm text-muted-foreground">
                  Production-grade RAG systems with optimised retrieval, context
                  management, and hallucination mitigation. Custom prompts and
                  evaluation metrics.
                </p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Vector database optimisation</li>
                  <li>• Prompt engineering & templates</li>
                  <li>• Response quality monitoring</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
