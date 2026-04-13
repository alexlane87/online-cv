import { motion, AnimatePresence } from "framer-motion"
import {
  Server,
  GitBranch,
  Shield,
  Gauge,
  XCircle,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  PlayCircle,
  Package,
  Rocket,
  TestTube,
  FileCode,
} from "lucide-react"
import { useNavigation } from "@/contexts/NavigationContext"
import { fadeInUp, unfurlAnimation } from "@/lib/animations"

// CI/CD Pipeline stages for Gantt chart
const pipelineStages = [
  {
    name: "Pre-commit Hooks",
    description: "Husky: Lint, format, type-check",
    start: 0,
    duration: 0.5,
    color: "#10b981",
    icon: FileCode,
    notification: null,
  },
  {
    name: "CI Pipeline Trigger",
    description: "GitHub Actions / Cloud Build starts",
    start: 0.5,
    duration: 0.3,
    color: "#6366f1",
    icon: PlayCircle,
    notification: "Slack: Build started",
  },
  {
    name: "Unit Tests",
    description: "PyTest suite execution",
    start: 0.8,
    duration: 1.2,
    color: "#3b82f6",
    icon: TestTube,
    notification: null,
  },
  {
    name: "Build & Package",
    description: "Docker image build & push to registry",
    start: 2.0,
    duration: 2.5,
    color: "#8b5cf6",
    icon: Package,
    notification: null,
  },
  {
    name: "Security Scan",
    description: "Container vulnerability scan",
    start: 4.5,
    duration: 1.0,
    color: "#f59e0b",
    icon: Shield,
    notification: null,
  },
  {
    name: "Deploy to Staging",
    description: "GHA/CB deploys via manifest/config",
    start: 5.5,
    duration: 1.0,
    color: "#ec4899",
    icon: Rocket,
    notification: "Slack: Staging deployed",
  },
  {
    name: "Integration Tests",
    description: "Playwright E2E suite on staging",
    start: 6.5,
    duration: 2.0,
    color: "#06b6d4",
    icon: Gauge,
    notification: null,
  },
  {
    name: "Production Deploy",
    description: "Rolling/blue-green via GHA/CB",
    start: 8.5,
    duration: 1.5,
    color: "#22c55e",
    icon: Rocket,
    notification: "Slack: Production deployed • Monitoring active",
  },
]

const infraMetrics = [
  { metric: "Uptime", value: 99.9, target: 99.5 },
  { metric: "Deploy Success", value: 98.5, target: 95 },
  { metric: "MTTR (min)", value: 15, target: 30 },
  { metric: "Test Coverage", value: 87, target: 80 },
]

const achievements = [
  {
    title: "Infrastructure as Code & Cost Reduction",
    icon: Shield,
    description: "Terraform/IaC implementation driving ~50% cost savings",
    metrics: [
      "80% reduction in manual provisioning through Terraform",
      "~50% infrastructure cost reduction through optimisation",
      "Environment parity guaranteed across all stages",
      "Version-controlled infrastructure",
      "Self-service provisioning for developers",
    ],
  },
  {
    title: "Authentication & Security",
    icon: Server,
    description: "OAuth2, SAML implementation and secure architecture",
    metrics: [
      "OAuth2 and SAML SSO implementation",
      "mTLS and certificate-based authentication",
      "ISO 27001 and Cyber Essentials Plus compliance",
      "Zero-trust security architecture",
    ],
  },
  {
    title: "CI/CD Implementation",
    icon: GitBranch,
    description: "Built automated deployment pipelines",
    metrics: [
      "Deploy time: 45min → 8min",
      "Deployment frequency: 4x increase",
      "Rollback time: <5 minutes",
      "Automated quality gates with PyTest/Playwright",
    ],
  },
  {
    title: "Observability",
    icon: Gauge,
    description: "Comprehensive monitoring & alerting",
    metrics: [
      "Real-time metrics dashboards (Datadog, GCP Monitoring)",
      "Distributed tracing implemented",
      "Smart alerting (reduced noise by 70%)",
      "SLO/SLI tracking integrated with Slack/Statuspage",
    ],
  },
]

export function DevOpsTab() {
  const { viewMode, setViewMode } = useNavigation()

  return (
    <motion.div
      {...fadeInUp}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-6 py-8"
    >
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-2 text-4xl font-bold">DevOps & Infrastructure</h1>
          <p className="text-xl text-muted-foreground">
            Building reliable, scalable, and secure cloud-native platforms
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

      {/* Featured Project: Serverless Report Generator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 rounded-lg border-2 border-primary bg-card p-6"
      >
        <h2 className="mb-4 text-2xl font-semibold">
          Featured: Serverless Automated Report Generator
        </h2>

        <AnimatePresence mode="wait">
          {viewMode === "detailed" ? (
            <motion.div {...unfurlAnimation} className="mb-4 space-y-3 text-sm">
              <div>
                <span className="font-semibold text-primary">Situation:</span>
                <p className="mt-1 text-muted-foreground">
                  A wind analysis product was operating as a loss leader with
                  near-zero or negative margins due to a highly manual,
                  specialist-dependent process that suffered a 20% error and
                  rework rate.
                </p>
              </div>
              <div>
                <span className="font-semibold text-primary">Task:</span>
                <p className="mt-1 text-muted-foreground">
                  Automate the calculation and reporting process, enabling
                  non-expert internal users to generate accurate reports
                  quickly, whilst building a foundation for external API
                  consumption.
                </p>
              </div>
              <div>
                <span className="font-semibold text-primary">Action:</span>
                <ul className="mt-1 space-y-1 text-muted-foreground">
                  <li>
                    • Built and deployed a Python FastAPI backend on AWS
                    Serverless, paired with a Vue.js frontend hosted on Netlify
                  </li>
                  <li>
                    • Architected the system to perform complex calculations
                    asynchronously, implementing a streamlined QA workflow
                  </li>
                  <li>
                    • Extended the platform by exposing a public API, allowing
                    enterprise customers to consume the service programmatically
                  </li>
                </ul>
              </div>
              <div>
                <span className="font-semibold text-primary">Result:</span>
                <p className="mt-1 text-muted-foreground">
                  Drastically reduced the error rate from 20% to less than 1%,
                  elevated margins from ~0% to 95%, and unlocked a new,
                  hands-off revenue stream via the enterprise API.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.p
              {...unfurlAnimation}
              className="mb-4 text-sm text-muted-foreground"
            >
              Built serverless report generator reducing error rate from 20% to
              &lt;1% and elevating margins from ~0% to 95%.
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-4 border-t border-border pt-4">
          <span className="text-xs font-semibold text-muted-foreground">
            Stack & Tactics:
          </span>
          <p className="mt-1 text-xs text-muted-foreground">
            Python (FastAPI), Vue.js, AWS Serverless, Netlify, Asynchronous
            Processing, API Design
          </p>
        </div>
      </motion.div>

      {/* Key Metrics Dashboard */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {infraMetrics.map((metric, index) => (
          <motion.div
            key={metric.metric}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-lg border border-border bg-card p-6"
          >
            <h3 className="mb-2 text-sm text-muted-foreground">
              {metric.metric}
            </h3>
            <div className="mb-1 text-3xl font-bold">
              {metric.metric.includes("min")
                ? metric.value
                : `${metric.value}%`}
            </div>
            <div className="text-xs text-muted-foreground">
              Target:{" "}
              {metric.metric.includes("min")
                ? metric.target
                : `${metric.target}%`}
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-primary transition-all"
                style={{
                  width: `${
                    metric.metric.includes("min")
                      ? Math.min((metric.target / metric.value) * 100, 100)
                      : (metric.value / 100) * 100
                  }%`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* CI/CD Pipeline Gantt Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 rounded-lg border border-border bg-card p-6"
      >
        <h2 className="mb-2 text-2xl font-semibold">CI/CD Pipeline Timeline</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Complete deployment flow: Pre-commit → Production (~10 minutes total)
        </p>

        {/* Gantt Chart */}
        <div className="space-y-3">
          {pipelineStages.map((stage, index) => {
            const Icon = stage.icon
            const totalDuration = 10 // Total pipeline duration in minutes
            const startPercent = (stage.start / totalDuration) * 100
            const widthPercent = (stage.duration / totalDuration) * 100

            return (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-1.5"
              >
                {/* Stage Label */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Icon size={14} style={{ color: stage.color }} />
                    <span className="text-xs font-semibold">{stage.name}</span>
                    <span className="text-[11px] text-muted-foreground">
                      {stage.description}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {stage.duration}min
                  </span>
                </div>

                {/* Gantt Bar */}
                <div className="relative h-7 rounded-lg bg-secondary">
                  <div
                    className="absolute top-0 h-full rounded-lg transition-all hover:opacity-90"
                    style={{
                      left: `${startPercent}%`,
                      width: `${widthPercent}%`,
                      backgroundColor: stage.color,
                    }}
                  >
                    <div className="flex h-full items-center justify-center px-1.5 text-[10px] font-medium text-white">
                      {stage.start.toFixed(1)}m →{" "}
                      {(stage.start + stage.duration).toFixed(1)}m
                    </div>
                  </div>
                </div>

                {/* Notification Badge */}
                {stage.notification && (
                  <div className="flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-2.5 py-1.5">
                    <MessageSquare size={12} className="text-blue-500" />
                    <span className="text-[10px] text-blue-600 dark:text-blue-400">
                      {stage.notification}
                    </span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Timeline Scale */}
        <div className="mt-6 flex justify-between border-t border-border pt-4 text-[10px] text-muted-foreground">
          <span>0m</span>
          <span>2.5m</span>
          <span>5m</span>
          <span>7.5m</span>
          <span>10m</span>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">~10min</div>
            <div className="text-xs text-muted-foreground">Total Pipeline</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">98.5%</div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">&lt;5min</div>
            <div className="text-xs text-muted-foreground">Rollback Time</div>
          </div>
        </div>

        {/* Failure Handling */}
        <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
          <div className="mb-2 flex items-center gap-2">
            <XCircle size={16} className="text-red-500" />
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
              Failure & Monitoring
            </span>
          </div>
          <p className="text-xs text-red-600 dark:text-red-400">
            Pipeline halts immediately on any stage failure. Alerts sent via
            Slack. Production monitoring watches health metrics post-deployment.
            If monitoring detects failures, automatic rollback triggers and
            Statuspage is updated. Statuspage only notified during incidents,
            not routine deployments.
          </p>
        </div>
      </motion.div>

      {/* Achievement Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-lg border border-border bg-card p-6"
          >
            <div className="mb-3 flex items-center gap-3">
              <achievement.icon className="text-primary" size={28} />
              <h3 className="text-xl font-semibold">{achievement.title}</h3>
            </div>
            <p className="mb-4 text-muted-foreground">
              {achievement.description}
            </p>
            <AnimatePresence mode="wait">
              {viewMode === "detailed" && (
                <motion.ul {...unfurlAnimation} className="space-y-2">
                  {achievement.metrics.map((metric, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm text-muted-foreground"
                    >
                      <span className="mr-2 text-primary">✓</span>
                      <span>{metric}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Tech Stack & Tools */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-2xl font-semibold">Platform & Tools</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div>
            <h3 className="mb-3 font-semibold text-primary">Cloud Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {["AWS", "GCP", "Azure", "DigitalOcean"].map((tool) => (
                <span
                  key={tool}
                  className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm transition-all hover:scale-105 hover:bg-primary/20 hover:shadow-md"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-primary">
              Containers & Orchestration
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Docker", "Kubernetes", "Helm", "Docker Compose"].map(
                (tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm transition-all hover:scale-105 hover:bg-primary/20 hover:shadow-md"
                  >
                    {tool}
                  </span>
                )
              )}
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-primary">
              IaC & Automation
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Terraform", "Ansible", "CloudFormation", "Pulumi"].map(
                (tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm transition-all hover:scale-105 hover:bg-primary/20 hover:shadow-md"
                  >
                    {tool}
                  </span>
                )
              )}
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-primary">
              CI/CD & Monitoring
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "GitHub Actions",
                "GitLab CI",
                "Datadog",
                "Prometheus",
                "Grafana",
              ].map((tool) => (
                <span
                  key={tool}
                  className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm transition-all hover:scale-105 hover:bg-primary/20 hover:shadow-md"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
