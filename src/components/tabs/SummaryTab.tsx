import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  TrendingDown,
  TrendingUp,
  Clock,
  Settings,
  Users,
  Briefcase,
  Code2,
  Brain,
  Cloud,
  Boxes,
  ChevronRight,
  Eye,
  EyeOff,
  Quote,
  Server,
  HeartHandshake,
  Swords,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
} from "lucide-react"
import { useNavigation } from "@/contexts/NavigationContext"
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  hoverLift,
} from "@/lib/animations"

export function SummaryTab() {
  const [showContact, setShowContact] = useState(false)
  const { setCurrentTab, viewMode, setViewMode } = useNavigation()

  return (
    <motion.div
      {...fadeInUp}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-6 py-8"
    >
      {/* View Mode Toggle */}
      <div className="mb-4 flex justify-end gap-2">
        <button
          onClick={() => setViewMode("brief")}
          className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            viewMode === "brief"
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-card text-muted-foreground hover:bg-muted"
          }`}
        >
          <ArrowUp size={14} />
          Brief
        </button>
        <button
          onClick={() => setViewMode("detailed")}
          className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            viewMode === "detailed"
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-card text-muted-foreground hover:bg-muted"
          }`}
        >
          <ArrowDown size={14} />
          Detailed
        </button>
      </div>

      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">Alex Lane</h1>
        <p className="text-xl font-medium text-primary">
          Head of Engineering
        </p>
      </div>

      {/* Core Value Proposition */}
      <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <CheckCircle2 className="text-primary" size={20} />
          Core Value Proposition
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          A multi-disciplinary engineering leader who thrives at both ends of
          the product lifecycle: building engineering departments and flagship
          SaaS platforms from scratch (0-to-1), and executing complex digital
          transformations. I specialise in slaying technical debt, ruthlessly
          replacing over-engineered "Resume Driven Development" with pragmatic,
          outcome-based architectures that halve infrastructure costs. I
          comfortably bridge the gap between executive strategy and hands-on
          technical delivery.
        </p>
      </div>

      {/* Contact Info */}
      <div className="mb-10 rounded-xl border border-border bg-muted/20 p-4">
        <div className="flex flex-wrap items-center gap-6 text-sm">
          {!showContact ? (
            <button
              onClick={() => setShowContact(true)}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <Eye size={16} />
              <span>Reveal Contact Details</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setShowContact(false)}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-foreground transition-colors hover:bg-muted"
              >
                <EyeOff size={14} />
                <span className="text-xs font-medium">Hide</span>
              </button>
              <div className="flex items-center gap-2 text-foreground">
                <span className="font-semibold text-muted-foreground">
                  Email:
                </span>{" "}
                alexlane87@outlook.com
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <span className="font-semibold text-muted-foreground">
                  Phone:
                </span>
                07510 664936
              </div>
            </>
          )}
          <div className="flex items-center gap-2 text-foreground">
            <span className="font-semibold text-muted-foreground">
              Location:
            </span>
            Bristol, UK
          </div>
          <a
            href="https://www.linkedin.com/in/alexander-lane-71118492/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ExternalLink size={14} />
            <span className="text-xs font-medium">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Explore Sections */}
      <h2 className="mb-4 text-2xl font-bold tracking-tight">
        Explore Portfolio
      </h2>
      <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Leadership Section */}
        <motion.button
          onClick={() => setCurrentTab("l")}
          whileHover={hoverLift}
          className="group rounded-xl border border-border bg-card p-6 text-left shadow-sm cursor-pointer transition-all hover:border-primary hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Users size={24} />
            </div>
            <ChevronRight
              className="text-muted-foreground transition-transform group-hover:translate-x-1"
              size={20}
            />
          </div>
          <h3 className="mb-2 text-lg font-bold">Leadership</h3>
          <p className="text-sm text-muted-foreground">
            Department genesis, tech-debt slaying, and agile culture.
          </p>
        </motion.button>

        {/* Technical Section */}
        <motion.button
          onClick={() => setCurrentTab("t")}
          whileHover={hoverLift}
          className="group rounded-xl border border-border bg-card p-6 text-left shadow-sm cursor-pointer transition-all hover:border-primary hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Code2 size={24} />
            </div>
            <ChevronRight
              className="text-muted-foreground transition-transform group-hover:translate-x-1"
              size={20}
            />
          </div>
          <h3 className="mb-2 text-lg font-bold">Technical Ecosystem</h3>
          <p className="text-sm text-muted-foreground">
            Full-stack (Vue/Python/Node), testing, and observability.
          </p>
        </motion.button>

        {/* Data Science Section */}
        <motion.button
          onClick={() => setCurrentTab("d")}
          whileHover={hoverLift}
          className="group rounded-xl border border-border bg-card p-6 text-left shadow-sm cursor-pointer transition-all hover:border-primary hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Brain size={24} />
            </div>
            <ChevronRight
              className="text-muted-foreground transition-transform group-hover:translate-x-1"
              size={20}
            />
          </div>
          <h3 className="mb-2 text-lg font-bold">Data Science & AI</h3>
          <p className="text-sm text-muted-foreground">
            Custom RAG pipelines, PostGIS, and automation.
          </p>
        </motion.button>

        {/* Architecture Section */}
        <motion.button
          onClick={() => setCurrentTab("a")}
          whileHover={hoverLift}
          className="group rounded-xl border border-border bg-card p-6 text-left shadow-sm cursor-pointer transition-all hover:border-primary hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Boxes size={24} />
            </div>
            <ChevronRight
              className="text-muted-foreground transition-transform group-hover:translate-x-1"
              size={20}
            />
          </div>
          <h3 className="mb-2 text-lg font-bold">Architecture</h3>
          <p className="text-sm text-muted-foreground">
            Interactive C4 models, ISO 27001, and system design.
          </p>
        </motion.button>

        {/* DevOps Section */}
        <motion.button
          onClick={() => setCurrentTab("o")}
          whileHover={hoverLift}
          className="group rounded-xl border border-border bg-card p-6 text-left shadow-sm cursor-pointer transition-all hover:border-primary hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Cloud size={24} />
            </div>
            <ChevronRight
              className="text-muted-foreground transition-transform group-hover:translate-x-1"
              size={20}
            />
          </div>
          <h3 className="mb-2 text-lg font-bold">DevOps & Infra</h3>
          <p className="text-sm text-muted-foreground">
            AWS/GCP, Kubernetes, Bare-metal, and CI/CD pipelines.
          </p>
        </motion.button>

        {/* Career Section */}
        <motion.button
          onClick={() => setCurrentTab("c")}
          whileHover={hoverLift}
          className="group rounded-xl border border-border bg-card p-6 text-left shadow-sm cursor-pointer transition-all hover:border-primary hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Code2 size={24} />
            </div>
            <ChevronRight
              className="text-muted-foreground transition-transform group-hover:translate-x-1"
              size={20}
            />
          </div>
          <h3 className="mb-2 text-lg font-bold">Technical Ecosystem</h3>
          <p className="text-sm text-muted-foreground">
            Full-stack (Vue/Python/Node), testing, and observability.
          </p>
        </motion.button>

        {/* Data Science Section */}
        <motion.button
          onClick={() => setCurrentTab("d")}
          whileHover={{ scale: 1.02, y: -2 }}
          className="group rounded-xl border border-border bg-card p-6 text-left shadow-sm cursor-pointer transition-all hover:border-primary hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Brain size={24} />
            </div>
            <ChevronRight
              className="text-muted-foreground transition-transform group-hover:translate-x-1"
              size={20}
            />
          </div>
          <h3 className="mb-2 text-lg font-bold">Data Science & AI</h3>
          <p className="text-sm text-muted-foreground">
            Custom RAG pipelines, PostGIS, and automation.
          </p>
        </motion.button>

        {/* Architecture Section */}
        <motion.button
          onClick={() => setCurrentTab("a")}
          whileHover={{ scale: 1.02, y: -2 }}
          className="group rounded-xl border border-border bg-card p-6 text-left shadow-sm cursor-pointer transition-all hover:border-primary hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Boxes size={24} />
            </div>
            <ChevronRight
              className="text-muted-foreground transition-transform group-hover:translate-x-1"
              size={20}
            />
          </div>
          <h3 className="mb-2 text-lg font-bold">Architecture</h3>
          <p className="text-sm text-muted-foreground">
            Interactive C4 models, ISO 27001, and system design.
          </p>
        </motion.button>

        {/* DevOps Section */}
        <motion.button
          onClick={() => setCurrentTab("o")}
          whileHover={{ scale: 1.02, y: -2 }}
          className="group rounded-xl border border-border bg-card p-6 text-left shadow-sm cursor-pointer transition-all hover:border-primary hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Cloud size={24} />
            </div>
            <ChevronRight
              className="text-muted-foreground transition-transform group-hover:translate-x-1"
              size={20}
            />
          </div>
          <h3 className="mb-2 text-lg font-bold">DevOps & Infra</h3>
          <p className="text-sm text-muted-foreground">
            AWS/GCP, Kubernetes, Bare-metal, and CI/CD pipelines.
          </p>
        </motion.button>

        {/* Career Section */}
        <motion.button
          onClick={() => setCurrentTab("c")}
          whileHover={{ scale: 1.02, y: -2 }}
          className="group rounded-xl border border-border bg-card p-6 text-left shadow-sm cursor-pointer transition-all hover:border-primary hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Briefcase size={24} />
            </div>
            <ChevronRight
              className="text-muted-foreground transition-transform group-hover:translate-x-1"
              size={20}
            />
          </div>
          <h3 className="mb-2 text-lg font-bold">Career Timeline</h3>
          <p className="text-sm text-muted-foreground">
            Chronological work history and core achievements.
          </p>
        </motion.button>
      </div>

      {/* =========================================
          NEW EXECUTIVE DASHBOARD (KPIs & Metrics) 
          ========================================= */}
      <AnimatePresence mode="wait">
        {viewMode === "detailed" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">
                Executive Dashboard
              </h2>
              <span className="rounded-full border border-border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                Business Impact Metrics
              </span>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
            >
              {/* KPI 1: Commercial Impact */}
              <motion.div
                variants={staggerItem}
                className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div>
                  <div className="mb-4 flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="text-emerald-500" size={18} />
                    <h3 className="text-sm font-semibold tracking-wider uppercase">
                      Product Margin
                    </h3>
                  </div>
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tighter text-foreground">
                      95%
                    </span>
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-sm font-medium text-emerald-500">
                      Up from ~15%
                    </span>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Boosted via AWS web application automation, eliminating
                    hundreds of manual processing hours.
                  </p>
                </div>
                {/* Visual Progress Bar */}
                <div className="mt-6 flex h-2 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "15%" }}
                    className="h-full bg-muted-foreground/30"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </motion.div>

              {/* KPI 2: Infrastructure Savings */}
              <motion.div
                variants={staggerItem}
                className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div>
                  <div className="mb-4 flex items-center gap-2 text-muted-foreground">
                    <TrendingDown className="text-blue-500" size={18} />
                    <h3 className="text-sm font-semibold tracking-wider uppercase">
                      Infra Bill Cut
                    </h3>
                  </div>
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tighter text-foreground">
                      50%
                    </span>
                    <span className="rounded bg-blue-500/10 px-2 py-0.5 text-sm font-medium text-blue-500">
                      Halved costs
                    </span>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Achieved by deprecating "Resume Driven" microservices
                    (K8s/Gatsby) for pragmatic cloud deployments.
                  </p>
                </div>
                {/* Visual Compare Bar */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-full rounded-full bg-red-500/50" />
                    <span className="w-8 font-mono text-[10px] text-muted-foreground">
                      Legacy
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      initial={{ width: "100%" }}
                      animate={{ width: "50%" }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="h-1.5 rounded-full bg-blue-500"
                    />
                    <span className="w-8 font-mono text-[10px] text-muted-foreground">
                      Modern
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* KPI 3: Delivery Velocity */}
              <motion.div
                variants={staggerItem}
                className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div>
                  <div className="mb-4 flex items-center gap-2 text-muted-foreground">
                    <Clock className="text-amber-500" size={18} />
                    <h3 className="text-sm font-semibold tracking-wider uppercase">
                      Delivery Velocity
                    </h3>
                  </div>
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tighter text-foreground">
                      Mins
                    </span>
                    <span className="rounded bg-amber-500/10 px-2 py-0.5 text-sm font-medium text-amber-500">
                      Down from Days
                    </span>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Accelerated complex scientific report generation through
                    custom in-house AI and RAG pipelines.
                  </p>
                </div>
                {/* Visual Timeline Nodes */}
                <div className="mt-6 flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <div className="h-0.5 flex-1 bg-amber-500/30" />
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <div className="h-0.5 flex-1 bg-amber-500/30" />
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <div className="h-0.5 flex-1 bg-amber-500/30" />
                  <div className="h-3 w-3 animate-pulse rounded-full bg-amber-500" />
                </div>
              </motion.div>

              {/* KPI 4: Operational Excellence */}
              <motion.div
                variants={staggerItem}
                className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div>
                  <div className="mb-4 flex items-center gap-2 text-muted-foreground">
                    <Settings className="text-purple-500" size={18} />
                    <h3 className="text-sm font-semibold tracking-wider uppercase">
                      Ops Automation
                    </h3>
                  </div>
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tighter text-foreground">
                      80%
                    </span>
                    <span className="rounded bg-purple-500/10 px-2 py-0.5 text-sm font-medium text-purple-500">
                      Manual drop
                    </span>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Decreased manual provisioning tasks via bespoke tooling,
                    infrastructure as code, and custom scripts.
                  </p>
                </div>
                {/* Visual Progress Bar */}
                <div className="mt-6 flex h-2 w-full justify-end overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-full bg-purple-500"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Engineering Philosophy & The Human Factor */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Philosophy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative flex flex-col justify-center overflow-hidden rounded-xl border border-border bg-card p-8 shadow-sm"
              >
                <Quote
                  className="absolute top-6 right-6 text-primary/10"
                  size={80}
                />
                <h3 className="mb-6 text-xl font-bold text-foreground">
                  The Engineering Manifesto
                </h3>
                <ul className="relative z-10 space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">
                        Eradicate RDD:
                      </strong>{" "}
                      "Resume Driven Development" kills product margins. I build
                      pragmatic architectures that serve the business, not the
                      hype cycle.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">
                        Observability as a Standard:
                      </strong>{" "}
                      Code is only as good as our ability to monitor it. I
                      enforce strict QA (PyTest/Playwright) and deep
                      observability (Datadog/Sentry).
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">
                        Secure by Design:
                      </strong>{" "}
                      Security cannot be an afterthought. Systems must be
                      engineered from inception to meet ISO 27001 and Cyber
                      Essentials Plus compliance.
                    </p>
                  </li>
                </ul>
              </motion.div>

              {/* The Human Factor */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-xl border border-border bg-primary/5 p-8 shadow-sm"
              >
                <h3 className="mb-6 text-xl font-bold text-foreground">
                  The Human Factor
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg border border-border bg-background p-2 text-primary shadow-sm">
                      <Server size={20} />
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm font-bold text-foreground">
                        The Miniature Data Centre
                      </h4>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        I design and maintain a functional home-lab data centre.
                        It serves as my testing ground for bare-metal
                        provisioning, complex networking topologies, and
                        hypervisor management.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-lg border border-border bg-background p-2 text-primary shadow-sm">
                      <Swords size={20} />
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm font-bold text-foreground">
                        Custom RPG Systems
                      </h4>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        Bridging my love for tabletop gaming and software, I
                        develop full-stack web apps with real-time database
                        syncing to manage complex tabletop character states and
                        statistics.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-lg border border-border bg-background p-2 text-primary shadow-sm">
                      <HeartHandshake size={20} />
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm font-bold text-foreground">
                        Community Mentorship
                      </h4>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        I actively volunteer to teach coding in local schools,
                        organise charity board game events, and provide 1-to-1
                        mentoring for junior developers entering the industry.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
