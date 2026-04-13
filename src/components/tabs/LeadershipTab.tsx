import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  TrendingUp,
  Code,
  Target,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { useNavigation } from "@/contexts/NavigationContext"
import { fadeInUp, unfurlAnimation } from "@/lib/animations"

interface TeamData {
  role: string
  company: string
  period: string
  teamSize: string
  structure: string
  technologies: string[]
  outcomes: string[]
  situation?: string
  task?: string
  stack?: string
}

const teamsLed: TeamData[] = [
  {
    role: "Head of Engineering",
    company: "TalentMapper Ltd",
    period: "Nov 2025 – Present",
    teamSize: "8 engineers",
    structure:
      "1 Full-stack, 3 Backend, 2 Frontend, 1 QA, 1 DevOps (mix of internal and external)",
    situation:
      "Over-reliance on expensive agency, 'Resume Driven' tech stack (Gatsby, GraphQL, Kubernetes), low velocity, high costs, historical bugs, poor visibility",
    task: "Build internal four-person engineering team from scratch, establish agile workflows, simplify architecture, implement enterprise-grade testing and monitoring",
    technologies: [
      "Vite",
      "REST APIs",
      "GCP Managed Instance Groups",
      "Cloudflare Edge",
      "PyTest",
      "Playwright",
      "PostHog",
      "GCP Native Monitoring",
      "Jira",
    ],
    outcomes: [
      "Eliminated external agency reliance and reduced long-term infrastructure costs by ~50%",
      "Eradicated deep-seated architectural bugs and unlocked historic interdependencies",
      "Dramatically improved developer velocity and system responsiveness",
      "Reduced MTTR for incidents through integrated Slack and Statuspage monitoring",
      "Established rigorous CI/CD with full-coverage PyTest and Playwright in pipeline",
    ],
    stack:
      "Agile Leadership, Budgeting, Jira, PyTest, Playwright, CI/CD, Husky, PostHog, GCP Native Monitoring",
  },
  {
    role: "Solutions Architect / Lead Developer",
    company: "Digital Engineering Ltd",
    period: "Nov 2023 – Nov 2025",
    teamSize: "3 engineers",
    structure: "1 Frontend, 2 Backend (mix of internal and external)",
    technologies: [
      "Vue.js",
      "Quasar",
      "ApexCharts",
      "Django",
      "Celery",
      "AWS Multi-Region",
      "PostGIS",
      "Python",
      "Pandas",
      "Datadog",
      "Sentry",
    ],
    outcomes: [
      "Architected and delivered flagship enterprise SaaS platform for climate-risk management",
      "Boosted product margins from ~15% to 95%+ through automation",
      "Reduced scientific report generation time from days to minutes",
      "Successfully processed massive gridded datasets from NASA and other sources",
      "Implemented deep observability with Datadog and Sentry across full stack",
      "Designed bespoke RAG pipelines and deployed in-house GPTs",
    ],
  },
  {
    role: "Level 3 Engineer",
    company: "Simwood eSMS Ltd",
    period: "May 2021 – Nov 2023",
    teamSize: "5-6 engineers",
    structure: "Mentoring and project management responsibilities",
    technologies: [
      "Express.js",
      "NGINX",
      "AWS",
      "Docker",
      "PHP",
      "Laravel",
      "PostgreSQL",
      "mTLS/HTTPS",
      "Bare-metal servers",
    ],
    outcomes: [
      "Reduced manual provisioning tasks by 80% through bespoke automation",
      "Designed secure zero-touch provisioning system (mTLS/HTTPS) driving 30% adoption increase",
      "Achieved ISO 27001 and Cyber Essentials Plus (CEP) compliance",
      "Led full data centre rack and network rebuild",
      "Maintained hybrid environments across bare-metal and AWS",
    ],
  },
  {
    role: "Level 2 Engineer",
    company: "Simwood eSMS Ltd",
    period: "Feb 2018 – May 2021",
    teamSize: "3-4 engineers",
    structure: "Project management responsibilities",
    technologies: [
      "PHP",
      "Laravel",
      "JavaScript",
      "MySQL",
      "Linux",
      "Bash scripting",
    ],
    outcomes: [
      "Developed internal tools improving operational efficiency by ~30%",
      "Mentored junior engineers on best practices and code quality",
      "Partnered with stakeholders for customer-centric solutions",
      "Built automated workflows for common operational tasks",
    ],
  },
]

const leadershipPrinciples = [
  {
    icon: Users,
    title: "Team Building & Growth",
    points: [
      "Built engineering teams from 3 to 8+ members (mix of internal and external)",
      "Establishing psychological safety and open communication",
      "Lead from the front: muck in and contribute directly to codebase",
      "Regular 1-on-1s, performance reviews, and career development paths",
      "Mentored junior engineers through project management responsibilities",
    ],
  },
  {
    icon: Target,
    title: "Outcome-Focused Delivery",
    points: [
      "Eliminate 'Resume Driven Development' in favour of pragmatic solutions",
      "Measure what matters: velocity, quality, business impact",
      "Reduced infrastructure costs by ~50% through architectural rationalisation",
      "Improved product margins from ~15% to 95%+ through automation",
    ],
  },
  {
    icon: Code,
    title: "Technical Excellence",
    points: [
      "Enforce quality through automated testing (PyTest, Playwright)",
      "Implement observability standards (PostHog, Datadog, GCP Monitoring)",
      "Establish CI/CD pipelines with pre-commit hooks",
      "Security and compliance first (ISO 27001, Cyber Essentials Plus)",
    ],
  },
  {
    icon: TrendingUp,
    title: "Agile & Process",
    points: [
      "Established agile workflows with Jira and regular ceremonies",
      "Incident management integrated with Slack and Statuspage",
      "Cross-functional collaboration between Engineering, Product, and Data Science",
      "Reduced MTTR through improved monitoring and alerting",
    ],
  },
]

export function LeadershipTab() {
  const { viewMode, setViewMode } = useNavigation()

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
            <h1 className="mb-2 text-4xl font-bold">Leadership & Teams</h1>
            <p className="text-xl text-muted-foreground">
              Building high-performance engineering teams and delivering
              measurable outcomes
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

      {/* Leadership Principles */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {leadershipPrinciples.map((principle, index) => (
          <motion.div
            key={principle.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-lg border border-border bg-card p-4"
          >
            <principle.icon className="mb-3 text-primary" size={24} />
            <h3 className="mb-3 text-sm font-semibold">{principle.title}</h3>
            <AnimatePresence mode="wait">
              {viewMode === "detailed" && (
                <motion.ul {...unfurlAnimation} className="space-y-1.5">
                  {principle.points.map((point, i) => (
                    <li key={i} className="text-xs text-muted-foreground">
                      • {point}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Teams Led */}
      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-semibold">Teams Led</h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-border md:left-8" />

          {teamsLed.map((team, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative mb-8 ml-0 pl-8 md:ml-16 md:pl-0"
            >
              {/* Timeline dot */}
              <div className="absolute -left-2 h-4 w-4 rounded-full border-4 border-background bg-primary md:-left-14" />

              <div className="rounded-lg border border-border bg-card p-6">
                {/* Header */}
                <div className="mb-4">
                  <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-semibold">{team.role}</h3>
                      <div className="font-medium text-primary">
                        {team.company}
                      </div>
                    </div>
                    <div className="text-sm whitespace-nowrap text-muted-foreground">
                      {team.period}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-primary">
                        Team Size:
                      </span>{" "}
                      <span className="text-muted-foreground">
                        {team.teamSize}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-primary">
                        Structure:
                      </span>{" "}
                      <span className="text-muted-foreground">
                        {team.structure}
                      </span>
                    </div>
                  </div>
                </div>

                {/* STAR Context (if present) - detailed only */}
                <AnimatePresence mode="wait">
                  {viewMode === "detailed" && team.situation && (
                    <motion.div
                      {...unfurlAnimation}
                      className="mb-4 rounded bg-muted/50 p-4 text-sm"
                    >
                      <div className="mb-2">
                        <span className="font-semibold text-primary">
                          Situation:
                        </span>
                        <p className="mt-1 text-muted-foreground">
                          {team.situation}
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-primary">
                          Task:
                        </span>
                        <p className="mt-1 text-muted-foreground">
                          {team.task}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-semibold text-primary">
                    Technologies & Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {team.technologies
                      .slice(0, viewMode === "brief" ? 5 : undefined)
                      .map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm transition-all hover:scale-105 hover:bg-primary/20 hover:shadow-md"
                        >
                          {tech}
                        </span>
                      ))}
                    {viewMode === "brief" && team.technologies.length > 5 && (
                      <span className="rounded-md border border-muted-foreground/30 bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                        +{team.technologies.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Outcomes */}
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-primary">
                    Key Outcomes & Achievements
                  </h4>
                  <ul className="space-y-2">
                    {team.outcomes
                      .slice(0, viewMode === "brief" ? 2 : undefined)
                      .map((outcome, i) => (
                        <li
                          key={i}
                          className="flex items-start text-sm text-muted-foreground"
                        >
                          <span className="mr-2 text-primary">✓</span>
                          <span>{outcome}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Stack & Tactics - detailed only */}
                <AnimatePresence mode="wait">
                  {viewMode === "detailed" && team.stack && (
                    <motion.div
                      {...unfurlAnimation}
                      className="mt-4 border-t border-border pt-4"
                    >
                      <span className="text-xs font-semibold text-muted-foreground">
                        Stack & Tactics:
                      </span>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {team.stack}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
