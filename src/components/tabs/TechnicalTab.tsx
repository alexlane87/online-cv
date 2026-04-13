import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  Layers,
  Database,
  Code2,
  TestTube,
  Boxes,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { useNavigation } from "@/contexts/NavigationContext"
import { fadeInUp, unfurlAnimation } from "@/lib/animations"

const techStack = {
  Frontend: [
    "React",
    "Vue.js",
    "TypeScript",
    "Tailwind CSS",
    "Quasar",
    "Apollo Client",
  ],
  Backend: [
    "Node.js",
    "Python",
    "Django",
    "Express",
    "GraphQL",
    "REST APIs",
    "FastAPI",
  ],
  Database: ["PostgreSQL", "MongoDB", "Redis", "PostGIS", "Neo4j"],
  DevOps: ["Docker", "Kubernetes", "AWS", "GCP", "Terraform", "GitHub Actions"],
  "Data & AI": ["Python", "Pandas", "LangChain", "OpenAI", "Vector DBs"],
}

const principles = [
  {
    icon: TestTube,
    title: "Test-Driven Development",
    description:
      "Write tests first, code second. Ensure reliability and maintainability from day one.",
    points: [
      "TDD: Write failing tests, make them pass, refactor",
      "V-Model Testing: Unit, Integration, System, Acceptance",
      "Full coverage with PyTest and Playwright in CI/CD",
      "Automated quality gates preventing regressions",
    ],
  },
  {
    icon: Boxes,
    title: "SOLID Principles",
    description:
      "Object-oriented design principles for maintainable, scalable code.",
    points: [
      "Single Responsibility: One class, one purpose",
      "Open/Closed: Open for extension, closed for modification",
      "Liskov Substitution: Subclasses must be substitutable",
      "Interface Segregation: Many client-specific interfaces",
      "Dependency Inversion: Depend on abstractions, not concretions",
    ],
  },
  {
    icon: Code2,
    title: "Pragmatic Development",
    description:
      "KISS, DRY, YAGNI - keeping code simple, maintainable, and focused.",
    points: [
      "KISS (Keep It Simple, Stupid): Simplicity over cleverness",
      "DRY (Don't Repeat Yourself): Single source of truth",
      "YAGNI (You Aren't Gonna Need It): Build what's needed now",
      "Avoid premature optimisation and over-engineering",
    ],
  },
  {
    icon: Shield,
    title: "Security First",
    description:
      "Security and compliance built into every layer of the application.",
    points: [
      "Authentication & authorisation at every layer",
      "OAuth2 and SAML implementation",
      "Input validation and sanitisation",
      "Rate limiting and DDoS protection",
      "ISO 27001 and Cyber Essentials Plus compliance",
    ],
  },
  {
    icon: Layers,
    title: "Clean Architecture",
    description:
      "Separation of concerns and modularity for testable, maintainable systems.",
    points: [
      "Separation of concerns and clear boundaries",
      "Domain-driven design patterns",
      "Comprehensive testing (unit, integration, e2e)",
      "Type safety with TypeScript/Python type hints",
      "Documentation as code",
    ],
  },
  {
    icon: Database,
    title: "Data Excellence",
    description:
      "Efficient data management with focus on performance and integrity.",
    points: [
      "Efficient schema design and indexing",
      "Query optimisation and caching strategies",
      "Data integrity and consistency guarantees",
      "Scalable data pipelines with error handling",
      "Observability and monitoring throughout",
    ],
  },
]

export function TechnicalTab() {
  const { viewMode, setViewMode } = useNavigation()

  return (
    <motion.div
      {...fadeInUp}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-6 py-8"
    >
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-2 text-4xl font-bold">
            Technical Ecosystem & Product Delivery
          </h1>
          <p className="text-xl text-muted-foreground">
            Full-stack expertise with a focus on security, scalability, and
            clean code
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

      {/* Featured Project: Climate-Risk Analytics Platform */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 rounded-lg border-2 border-primary bg-card p-6"
      >
        <h2 className="mb-4 text-2xl font-semibold">
          Featured: Secure Global Climate-Risk Analytics Platform
        </h2>
        <div className="mb-2 text-sm font-semibold text-primary">
          Digital Engineering Ltd
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "detailed" ? (
            <motion.div {...unfurlAnimation} className="mb-4 space-y-3 text-sm">
              <div>
                <span className="font-semibold text-primary">Situation:</span>
                <p className="mt-1 text-muted-foreground">
                  The business required a greenfield SaaS platform to calculate
                  and visualise the financial impacts of climate change
                  (physical and transition risks) on enterprise businesses,
                  necessitating the processing of massive, complex gridded
                  global datasets from sources like NASA.
                </p>
              </div>
              <div>
                <span className="font-semibold text-primary">Task:</span>
                <p className="mt-1 text-muted-foreground">
                  Architect and lead the development of a highly scalable,
                  secure, multi-region data processing engine and interactive
                  dashboard capable of handling vast data arrays while strictly
                  adhering to compliance standards.
                </p>
              </div>
              <div>
                <span className="font-semibold text-primary">Action:</span>
                <ul className="mt-1 space-y-1 text-muted-foreground">
                  <li>
                    • Designed a responsive Vue.js/Quasar frontend utilising
                    ApexCharts for complex financial and geospatial data
                    visualisation
                  </li>
                  <li>
                    • Architected a robust Django and Celery backend spanning
                    multiple AWS regions, engineering ingestion pipelines
                    specifically designed to handle massive volumes of raw,
                    complex gridded data
                  </li>
                  <li>
                    • Engineered multi-level autoscaling, cache pre-warming, and
                    asynchronous task queues to guarantee rapid data throughput
                  </li>
                  <li>
                    • Deployed Datadog and Sentry across the stack to provide
                    deep, real-time observability into backend performance and
                    data-pipeline health
                  </li>
                </ul>
              </div>
              <div>
                <span className="font-semibold text-primary">Result:</span>
                <p className="mt-1 text-muted-foreground">
                  Successfully delivered a flagship enterprise product capable
                  of ingesting and processing massive gridded datasets,
                  generating comprehensive financial risk reports in minutes and
                  providing the business with a deeply observable platform ready
                  for enterprise-tier clients.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.p
              {...unfurlAnimation}
              className="mb-4 text-sm text-muted-foreground"
            >
              Architected and delivered a flagship enterprise SaaS platform for
              climate-risk management, boosting product margins from ~15% to
              95%+ and reducing report generation from days to minutes.
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-4 border-t border-border pt-4">
          <span className="text-xs font-semibold text-muted-foreground">
            Stack & Tactics:
          </span>
          <p className="mt-1 text-xs text-muted-foreground">
            Vue.js, Quasar, ApexCharts, Django, Celery, AWS (Multi-Region), Big
            Data (Complex Gridded Datasets), Datadog, Sentry
          </p>
        </div>
      </motion.div>

      {/* Tech Stack Overview */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Technology Stack</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {Object.entries(techStack).map(([category, technologies], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border border-border bg-card p-4"
            >
              <h3 className="mb-3 font-semibold text-primary">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
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
      </div>

      {/* Development Principles */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          Development Principles & Practices
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <principle.icon className="text-primary" size={28} />
                <h3 className="text-xl font-semibold">{principle.title}</h3>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                {principle.description}
              </p>
              <AnimatePresence mode="wait">
                {viewMode === "detailed" && (
                  <motion.ul {...unfurlAnimation} className="space-y-2">
                    {principle.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start text-sm text-muted-foreground"
                      >
                        <span className="mr-2 text-primary">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testing Approach - detailed only */}
      <AnimatePresence mode="wait">
        {viewMode === "detailed" && (
          <motion.div
            {...unfurlAnimation}
            className="rounded-lg border border-border bg-card p-6"
          >
            <h2 className="mb-4 text-2xl font-semibold">
              Testing & Quality Assurance
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 font-semibold text-primary">
                  V-Model Testing Approach
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  Comprehensive testing at every level of the development
                  lifecycle, from unit tests to acceptance testing.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    • <strong>Unit Tests:</strong> PyTest for Python, Jest for
                    JavaScript
                  </li>
                  <li>
                    • <strong>Integration Tests:</strong> API and service
                    integration validation
                  </li>
                  <li>
                    • <strong>System Tests:</strong> End-to-end flows with
                    Playwright
                  </li>
                  <li>
                    • <strong>Acceptance Tests:</strong> User story validation
                    against requirements
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 font-semibold text-primary">
                  Continuous Quality
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  Automated testing and quality gates integrated into every
                  stage of the CI/CD pipeline.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    • <strong>Pre-commit:</strong> Husky hooks for linting and
                    formatting
                  </li>
                  <li>
                    • <strong>CI Pipeline:</strong> Full test suite runs on
                    every commit
                  </li>
                  <li>
                    • <strong>Code Coverage:</strong> Minimum 80% coverage
                    enforced
                  </li>
                  <li>
                    • <strong>Static Analysis:</strong> Type checking and
                    security scanning
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
