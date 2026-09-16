import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import TechTag from "@/components/ui/TechTag";
import ProjectScreenshot from "@/components/ui/ProjectScreenshot";
import { ScreenshotGalleryProvider } from "@/components/ui/ScreenshotGallery";
import { projects } from "@/lib/data";

const project = projects[0]; // tourism website

// Compact workflow for the homepage overview
const workflowSteps = [
  { label: "Visitor", sub: "Browses the website" },
  { label: "Booking Form", sub: "Chooses a trip and travel details" },
  { label: "Turnstile", sub: "Bot protection check" },
  { label: "Backend", sub: "Processes the request" },
  { label: "Database", sub: "Stores the reservation" },
  { label: "Admin Dashboard", sub: "Company manages the booking" },
];

export default function FeaturedProject() {
  return (
    <ScreenshotGalleryProvider screenshots={project.screenshots}>
      <section
        id="projects"
        className="py-24 bg-[#0c121a]"
        aria-labelledby="projects-heading"
      >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <FadeIn>
          <SectionLabel>Featured Project</SectionLabel>
          <SectionHeading as="h2" id="projects-heading" className="mb-3">
            {project.title}
          </SectionHeading>
          <p className="text-[#cbd5e1] max-w-2xl leading-relaxed mb-2">
            {project.shortDescription}
          </p>
          <p className="text-xs font-mono text-[#94a3b8] mb-10">
            Role:{" "}
            <span className="text-[#cbd5e1]">{project.role}</span>
            &nbsp;·&nbsp;Status:{" "}
            <span className="text-green-400">Live</span>
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left column: overview + workflow */}
          <div className="lg:col-span-3 space-y-8">
            {/* What I built */}
            <FadeIn delay={0.1}>
              <div className="surface-card p-6 border rounded-xl">
                <h3 className="text-sm font-semibold text-[#f8fafc] mb-4">
                  What I built
                </h3>
                <p className="text-sm text-[#cbd5e1] leading-relaxed mb-5">
                  {project.longDescription}
                </p>
                <ul className="grid sm:grid-cols-2 gap-2" role="list">
                  {[
                    "Responsive multi-page website",
                    "Tour & service pages",
                    "Booking and contact forms",
                    "Node.js backend",
                    "Supabase / PostgreSQL database",
                    "Admin dashboard",
                    "Cloudflare Turnstile protection",
                    "Cloudflare Workers deployment",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-[#cbd5e1]"
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

            {/* Booking workflow */}
            <FadeIn delay={0.2}>
              <div className="surface-card p-6 border rounded-xl">
                <h3 className="text-sm font-semibold text-[#f8fafc] mb-1">
                  Booking workflow
                </h3>
                <p className="text-xs text-[#94a3b8] mb-6">
                  How a visitor&apos;s reservation travels through the system
                </p>
                <ol className="relative" aria-label="Booking workflow steps">
                  {workflowSteps.map((step, i) => (
                    <li key={step.label} className="flex gap-4 pb-5 last:pb-0">
                      {/* Connector line */}
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-[#38bdf8]/[0.07] border border-[#38bdf8]/25 flex items-center justify-center flex-shrink-0 shadow-[0_0_18px_rgba(56,189,248,0.08)]">
                          <span className="text-[10px] font-mono text-[#f59e0b]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        {i < workflowSteps.length - 1 && (
                          <div
                            className="w-px flex-1 mt-1 bg-[#263244]"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className="pt-1 pb-2">
                        <p className="text-sm font-medium text-[#f8fafc]">
                          {step.label}
                        </p>
                        <p className="text-xs text-[#94a3b8] mt-0.5">
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
            {/* Project screenshot */}
            <FadeIn delay={0.15}>
              <ProjectScreenshot screenshot={project.screenshots[0]} />
            </FadeIn>

            {/* Tech stack */}
            <FadeIn delay={0.25}>
              <div className="surface-card p-5 border rounded-xl">
                <h3 className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider mb-3">
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
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#f59e0b] hover:bg-[#fbbf24] text-[#090d12] font-semibold text-sm rounded-full transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d12]"
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
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-[#334155] hover:border-[#38bdf8]/70 text-[#cbd5e1] hover:text-[#f8fafc] font-medium text-sm rounded-full transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d12]"
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
    </ScreenshotGalleryProvider>
  );
}
