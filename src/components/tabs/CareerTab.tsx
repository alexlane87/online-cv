import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Briefcase, Award, ArrowUp, ArrowDown } from "lucide-react"
import { useNavigation } from "@/contexts/NavigationContext"
import { fadeInUp, unfurlAnimation } from "@/lib/animations"

interface CareerEntry {
  title: string
  company: string
  period: string
  progression?: string
  coreImpact: string[]
  detailedPoints: string[]
}

const careerHistory: CareerEntry[] = [
  {
    title: "Head of Engineering",
    company: "TalentMapper Ltd (GCP)",
    period: "Nov 2025 – Present",
    progression:
      "Promoted to establish and lead a new internal engineering department",
    coreImpact: [
      "Eliminated external agency reliance and deprecated 'Resume Driven Development' architectures (K8s, Gatsby) in favour of pragmatic, highly observable GCP/Cloudflare deployments",
    ],
    detailedPoints: [
      "Built a four-person team and established physical office presence",
      "Implemented rigorous CI/CD with PyTest and Playwright in full pipeline",
      "Established observability standards using PostHog and GCP Native Monitoring",
      "Reduced infrastructure costs by ~50% through architectural rationalisation",
      "Dramatically improved developer velocity and system responsiveness",
    ],
  },
  {
    title: "Solutions Architect / Lead Developer",
    company: "Digital Engineering Ltd (AWS)",
    period: "Nov 2023 – Nov 2025",
    coreImpact: [
      "Architected and launched a flagship enterprise SaaS platform for climate-risk management from concept to delivery",
      "Boosted product margins from ~15% to 95%+ and automated scientific report generation, cutting delivery times from days to minutes",
    ],
    detailedPoints: [
      "Designed responsive Vue.js/Quasar frontend with ApexCharts for complex financial and geospatial data visualisation",
      "Architected robust Django and Celery backend spanning multiple AWS regions",
      "Engineered ingestion pipelines for massive volumes of raw, complex gridded datasets (NASA)",
      "Deployed Datadog and Sentry for deep, real-time observability",
      "Built bespoke RAG pipelines and deployed in-house GPTs",
      "Designed PostGIS data pipelines for geospatial risk modelling",
    ],
  },
  {
    title: "Level 3 Engineer / DevOps & Full-Stack Developer",
    company: "Simwood eSMS Ltd (AWS)",
    period: "May 2021 – Nov 2023",
    coreImpact: [
      "Reduced manual provisioning tasks by 80% through bespoke automation scripts and internal tooling",
      "Designed and deployed an Express.js, AWS-hosted customer-facing API (secure zero-touch provisioning via mTLS/HTTPS), driving a 30% increase in adoption",
    ],
    detailedPoints: [
      "Architected Handlebars-style templating engine for dynamic XML configuration generation",
      "Implemented robust security via NGINX reverse proxy with mTLS validation",
      "Achieved ISO 27001 and Cyber Essentials Plus (CEP) compliance",
      "Maintained hybrid environments optimising Docker containers across bare-metal and AWS",
      "Led full data centre rack and network rebuild",
    ],
  },
  {
    title: "Level 2 Engineer",
    company: "Simwood eSMS Ltd (AWS)",
    period: "Feb 2018 – May 2021",
    coreImpact: [
      "Developed internal PHP/Laravel tools, improving Operational team ticket efficiency by roughly 30%",
    ],
    detailedPoints: [
      "Partnered with stakeholders to design customer-centric solutions",
      "Provided vital bug fixing and feature assistance across the product suite",
      "Mentored junior staff members",
      "Built automated workflows for common operational tasks",
    ],
  },
]

const certifications = [
  "BCS Foundation & Practitioner – Enterprise & Solution Architecture",
  "TOGAF® Enterprise Architecture Foundation & Practitioner",
  "AWS Cloud Practitioner",
  "ITIL Foundation",
  "MSc Digital & Technology Solutions – Software Engineering (Ongoing)",
]

const compliance = [
  "ISO 27001 Information Security Management",
  "Cyber Essentials Plus (CEP)",
]

export function CareerTab() {
  const { viewMode, setViewMode } = useNavigation()
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <motion.div
      {...fadeInUp}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-6 py-8"
    >
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-2 text-4xl font-bold">Career Timeline</h1>
          <p className="text-xl text-muted-foreground">
            Traditional chronological work history for recruiters and hiring
            managers
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

      {/* Summary Stats */}
      <div className="mb-8 text-sm text-muted-foreground">
        {careerHistory.length} positions • 7+ years experience
      </div>

      {/* Professional Experience */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Professional Experience</h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-border md:left-8" />

          {careerHistory.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onViewportEnter={() => setActiveIndex(index)}
              className="relative mb-8 ml-0 pl-8 md:ml-16 md:pl-0"
            >
              {/* Timeline dot */}
              <div
                className={`absolute -left-2 h-4 w-4 rounded-full border-4 border-background transition-colors md:-left-14 ${
                  activeIndex === index ? "bg-primary" : "bg-muted"
                }`}
              />

              <div className="rounded-lg border border-border bg-card p-6">
                {/* Header */}
                <div className="mb-4">
                  <div className="mb-1 flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{entry.title}</h3>
                      <div className="font-medium text-primary">
                        {entry.company}
                      </div>
                    </div>
                    <div className="ml-4 text-sm whitespace-nowrap text-muted-foreground">
                      {entry.period}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {entry.progression && viewMode === "detailed" && (
                      <motion.div
                        {...unfurlAnimation}
                        className="mt-2 rounded bg-primary/10 px-3 py-2 text-sm"
                      >
                        <span className="font-semibold text-primary">
                          Progression:{" "}
                        </span>
                        {entry.progression}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Core Impact */}
                <div className="mb-3">
                  <span className="text-sm font-semibold text-primary">
                    Core Impact:
                  </span>
                  <ul className="mt-2 space-y-1">
                    {entry.coreImpact.map((impact, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <span className="mt-1 mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span>{impact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Detailed Points */}
                <AnimatePresence mode="wait">
                  {viewMode === "detailed" && (
                    <motion.div
                      {...unfurlAnimation}
                      className="border-t border-border pt-3"
                    >
                      <ul className="space-y-2">
                        {entry.detailedPoints.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start text-sm text-muted-foreground"
                          >
                            <span className="mr-2 text-primary">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education & Professional Development */}
      <div className="grid grid-cols-1 gap-6">
        {/* Certifications & Qualifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-border bg-card p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <Award className="text-primary" size={24} />
            <h2 className="text-2xl font-semibold">
              Certifications & Qualifications
            </h2>
          </div>
          <ul className="space-y-3">
            {certifications.map((cert, i) => (
              <li key={i} className="flex items-start text-sm">
                <span className="mt-0.5 mr-2 text-primary">✓</span>
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Security & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-lg border border-border bg-card p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <Briefcase className="text-primary" size={24} />
            <h2 className="text-2xl font-semibold">
              Security & Compliance Experience
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {compliance.map((item, i) => (
              <span
                key={i}
                className="rounded-lg bg-secondary px-4 py-2 text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
