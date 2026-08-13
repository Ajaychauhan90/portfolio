import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import TechTag from "@/components/ui/TechTag";
import { projects } from "@/lib/data";

const project = projects[0]; // tourism website

// Compact workflow for the homepage overview
const workflowSteps = [
  { label: "Visitor", sub: "Browses the website" },
  { label: "Enquiry Form", sub: "Submits an enquiry" },
  { label: "Turnstile", sub: "Bot protection check" },
  { label: "Backend", sub: "Processes the request" },
  { label: "Database", sub: "Stores in Supabase" },
  { label: "Admin Dashboard", sub: "Company reviews it" },
];

export default function FeaturedProject() {
  return (
    <section
      id="projects"
      className="py-24 bg-[#0d0d0d]"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <FadeIn>
          <SectionLabel>Featured Project</SectionLabel>
          <SectionHeading as="h2" id="projects-heading" className="mb-3">
            {project.title}
          </SectionHeading>
          <p className="text-[#a3a3a3] max-w-2xl leading-relaxed mb-2">
            {project.shortDescription}
          </p>
          <p className="text-xs font-mono text-[#6b6b6b] mb-10">
            Role:{" "}
            <span className="text-[#a3a3a3]">{project.role}</span>
            &nbsp;·&nbsp;Status:{" "}
            <span className="text-green-400">Live</span>
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left column: overview + workflow */}
          <div className="lg:col-span-3 space-y-8">
            {/* What I built */}
            <FadeIn delay={0.1}>
              <div className="p-6 bg-[#111111] border border-[#1f1f1f] rounded-lg">
                <h3 className="text-sm font-semibold text-[#f5f5f5] mb-4">
                  What I built
                </h3>
                <p className="text-sm text-[#a3a3a3] leading-relaxed mb-5">
                  {project.longDescription}
                </p>
                <ul className="grid sm:grid-cols-2 gap-2" role="list">
                  {[
                    "Responsive multi-page website",
                    "Tour & service pages",
                    "Enquiry form system",
                    "Node.js backend",
                    "Supabase / PostgreSQL database",
                    "Admin dashboard",
                    "Cloudflare Turnstile protection",
                    "Cloudflare Workers deployment",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-[#a3a3a3]"
                    >
                      <svg
                        className="w-3 h-3 text-[#f59e0b] mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Enquiry workflow */}
            <FadeIn delay={0.2}>
              <div className="p-6 bg-[#111111] border border-[#1f1f1f] rounded-lg">
                <h3 className="text-sm font-semibold text-[#f5f5f5] mb-1">
                  Enquiry workflow
                </h3>
                <p className="text-xs text-[#6b6b6b] mb-6">
                  How a visitor's enquiry travels through the system
                </p>
                <ol className="relative" aria-label="Enquiry workflow steps">
                  {workflowSteps.map((step, i) => (
                    <li key={step.label} className="flex gap-4 pb-5 last:pb-0">
                      {/* Connector line */}
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] font-mono text-[#f59e0b]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        {i < workflowSteps.length - 1 && (
                          <div
                            className="w-px flex-1 mt-1 bg-[#1f1f1f]"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className="pt-1 pb-2">
                        <p className="text-sm font-medium text-[#f5f5f5]">
                          {step.label}
                        </p>
                        <p className="text-xs text-[#6b6b6b] mt-0.5">
                          {step.sub}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </FadeIn>
          </div>

          {/* Right column: tech + screenshot + CTA */}
          <div className="lg:col-span-2 space-y-6">
            {/* Screenshot placeholder */}
            <FadeIn delay={0.15}>
              <div
                className="aspect-video rounded-lg border border-dashed border-[#2a2a2a] bg-[#111111] flex flex-col items-center justify-center gap-2 p-4 text-center"
                role="img"
                aria-label="Homepage screenshot — coming soon"
              >
                <svg
                  className="w-8 h-8 text-[#2a2a2a]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-xs font-mono text-[#3a3a3a]">
                  Website screenshot
                  <br />
                  <span className="text-[#2a2a2a]">Coming soon</span>
                </p>
              </div>
            </FadeIn>

            {/* Tech stack */}
            <FadeIn delay={0.25}>
              <div className="p-5 bg-[#111111] border border-[#1f1f1f] rounded-lg">
                <h3 className="text-xs font-semibold text-[#6b6b6b] uppercase tracking-wider mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tag) => (
                    <TechTag key={tag.name} tag={tag} size="sm" />
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.3}>
              <div className="flex flex-col gap-3">
                <a
                  href={project.liveUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#f59e0b] hover:bg-[#fcd34d] text-[#0a0a0a] font-medium text-sm rounded transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                >
                  View live website
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                <Link
                  href={project.caseStudyPath}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-[#2a2a2a] hover:border-[#3a3a3a] text-[#a3a3a3] hover:text-[#f5f5f5] font-medium text-sm rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                >
                  Read full case study
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
