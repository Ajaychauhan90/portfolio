import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import TechTag from "@/components/ui/TechTag";
import ProjectScreenshot from "@/components/ui/ProjectScreenshot";
import FadeIn from "@/components/ui/FadeIn";
import { projects } from "@/lib/data";
import CaseStudyWorkflow from "./CaseStudyWorkflow";

export const metadata: Metadata = {
  title: "Indian Tourism Company Website — Case Study",
  description:
    "A full-stack tourism website built with Next.js, Node.js, Supabase, and Cloudflare Workers. Includes a booking system, admin dashboard, and Cloudflare Turnstile integration.",
  openGraph: {
    title: "Indian Tourism Company Website — Case Study | Ajay Chauhan",
    description:
      "Full-stack tourism booking website: Next.js frontend, Node.js backend, Supabase/PostgreSQL database, admin dashboard, and Cloudflare Workers deployment.",
    url: "https://ajaychauhan.dev/projects/tourism-website",
  },
};

const project = projects[0];

export default function TourismCaseStudy() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16">
        {/* ── Hero / header ──────────────────────────────────────── */}
        <div className="bg-[#0d0d0d] border-b border-[#1f1f1f]">
          <div className="max-w-5xl mx-auto px-6 py-20">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-xs font-mono text-[#6b6b6b]" role="list">
                <li>
                  <Link href="/" className="hover:text-[#a3a3a3] transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/#projects" className="hover:text-[#a3a3a3] transition-colors">
                    Projects
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-[#a3a3a3]" aria-current="page">
                  Tourism Website
                </li>
              </ol>
            </nav>

            <FadeIn>
              <SectionLabel>Case Study</SectionLabel>
              <h1 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] tracking-tight leading-tight mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-[#a3a3a3] leading-relaxed max-w-2xl mb-8">
                {project.shortDescription}
              </p>

              {/* Meta row */}
              <dl className="flex flex-wrap gap-x-8 gap-y-3 mb-10">
                <div>
                  <dt className="text-xs font-mono text-[#6b6b6b] uppercase tracking-wider mb-1">Role</dt>
                  <dd className="text-sm text-[#f5f5f5] font-medium">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-xs font-mono text-[#6b6b6b] uppercase tracking-wider mb-1">Status</dt>
                  <dd className="flex items-center gap-1.5 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" aria-hidden="true" />
                    <span className="text-green-400 font-medium">Live</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-mono text-[#6b6b6b] uppercase tracking-wider mb-1">Website</dt>
                  <dd>
                    <a
                      href={project.liveUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#f59e0b] hover:text-[#fcd34d] transition-colors font-mono"
                    >
                      {project.liveUrl}
                    </a>
                  </dd>
                </div>
              </dl>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tag) => (
                  <TechTag key={tag.name} tag={tag} />
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ── Hero screenshot ────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          <FadeIn>
            <ProjectScreenshot screenshot={project.screenshots[0]} preload />
          </FadeIn>
        </div>

        {/* ── Main content ───────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-6 pb-24 space-y-20">

          {/* 1. Project Overview */}
          <FadeIn>
            <section aria-labelledby="cs-overview">
              <SectionLabel>01 — Overview</SectionLabel>
              <h2 id="cs-overview" className="text-2xl font-bold text-[#f5f5f5] mb-4">
                Project overview
              </h2>
              <p className="text-[#a3a3a3] leading-relaxed max-w-3xl">
                {project.longDescription}
              </p>
            </section>
          </FadeIn>

          {/* 2. My Role */}
          <FadeIn>
            <section aria-labelledby="cs-role">
              <SectionLabel>02 — Role</SectionLabel>
              <h2 id="cs-role" className="text-2xl font-bold text-[#f5f5f5] mb-4">
                My role
              </h2>
              <div className="p-6 bg-[#111111] border border-[#1f1f1f] rounded-lg max-w-3xl">
                <p className="text-base font-semibold text-[#f5f5f5] mb-2">{project.role}</p>
                <p className="text-sm text-[#a3a3a3] leading-relaxed">
                  {project.roleDescription}
                </p>
              </div>
            </section>
          </FadeIn>

          {/* 3. Key Features */}
          <FadeIn>
            <section aria-labelledby="cs-features">
              <SectionLabel>03 — Features</SectionLabel>
              <h2 id="cs-features" className="text-2xl font-bold text-[#f5f5f5] mb-6">
                Key features
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <FadeIn key={feature.title} delay={0.06 * i}>
                    <article className="p-5 bg-[#111111] border border-[#1f1f1f] rounded-lg h-full">
                      <h3 className="text-sm font-semibold text-[#f5f5f5] mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[#a3a3a3] leading-relaxed">
                        {feature.description}
                      </p>
                    </article>
                  </FadeIn>
                ))}
              </div>
            </section>
          </FadeIn>

          {/* 4. Screenshots */}
          <FadeIn>
            <section aria-labelledby="cs-screenshots">
              <SectionLabel>04 — Screenshots</SectionLabel>
              <h2 id="cs-screenshots" className="text-2xl font-bold text-[#f5f5f5] mb-6">
                Pages &amp; views
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.screenshots.slice(1, 5).map((shot) => (
                  <ProjectScreenshot key={shot.id} screenshot={shot} />
                ))}
              </div>
            </section>
          </FadeIn>

          {/* 5. Booking Workflow */}
          <FadeIn>
            <section aria-labelledby="cs-workflow">
              <SectionLabel>05 — Workflow</SectionLabel>
              <h2 id="cs-workflow" className="text-2xl font-bold text-[#f5f5f5] mb-2">
                Booking workflow
              </h2>
              <p className="text-[#a3a3a3] leading-relaxed mb-8 max-w-2xl">
                When a visitor submits a booking, it travels through several
                layers before reaching the company. Here&apos;s the complete
                flow from submission to review.
              </p>
              <CaseStudyWorkflow steps={project.workflow} />
            </section>
          </FadeIn>

          {/* 6. Admin Dashboard */}
          <FadeIn>
            <section aria-labelledby="cs-admin">
              <SectionLabel>06 — Admin Dashboard</SectionLabel>
              <h2 id="cs-admin" className="text-2xl font-bold text-[#f5f5f5] mb-4">
                Admin dashboard
              </h2>
              <p className="text-[#a3a3a3] leading-relaxed max-w-3xl mb-6">
                The company has access to a private admin dashboard where all
                reservations are listed. The dashboard lets the team review
                booking details, track availability, and approve or reject
                requests without needing a third-party CRM.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <ProjectScreenshot screenshot={project.screenshots[5]} />
                <div className="p-5 bg-[#111111] border border-[#1f1f1f] rounded-lg flex flex-col justify-center gap-3">
                  <h3 className="text-sm font-semibold text-[#f5f5f5]">Dashboard capabilities</h3>
                  <ul className="space-y-2" role="list">
                    {[
                      "View and search all reservations",
                      "See travel dates, group size, duration, and totals",
                      "Approve, reject, and track booking status",
                      "Authenticated access — not publicly accessible",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[#a3a3a3]">
                        <svg className="w-3 h-3 text-[#f59e0b] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* 7. Database */}
          <FadeIn>
            <section aria-labelledby="cs-database">
              <SectionLabel>07 — Database</SectionLabel>
              <h2 id="cs-database" className="text-2xl font-bold text-[#f5f5f5] mb-4">
                Database &amp; data flow
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 bg-[#111111] border border-[#1f1f1f] rounded-lg">
                  <h3 className="text-sm font-semibold text-[#f5f5f5] mb-3">Supabase / PostgreSQL</h3>
                  <p className="text-sm text-[#a3a3a3] leading-relaxed">
                    The application uses Supabase as the database layer, backed
                    by PostgreSQL. Booking and application data submitted
                    through the public forms is stored here and made available
                    to the admin dashboard. Supabase handles authentication and
                    provides a clean API for database access.
                  </p>
                </div>
                <div className="p-5 bg-[#111111] border border-[#1f1f1f] rounded-lg">
                  <h3 className="text-sm font-semibold text-[#f5f5f5] mb-3">Data flow</h3>
                  <ol className="space-y-2" aria-label="Database data flow">
                    {[
                      "Form submitted by visitor",
                      "Backend validates & sanitises input",
                      "Turnstile token verified server-side",
                      "Booking written to PostgreSQL via Supabase",
                      "Admin reads bookings via authenticated dashboard",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#a3a3a3]">
                        <span className="text-xs font-mono text-[#3a3a3a] mt-0.5 w-4 flex-shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* 8. Security — Turnstile */}
          <FadeIn>
            <section aria-labelledby="cs-security">
              <SectionLabel>08 — Security</SectionLabel>
              <h2 id="cs-security" className="text-2xl font-bold text-[#f5f5f5] mb-4">
                Cloudflare Turnstile
              </h2>
              <div className="p-6 bg-[#111111] border border-[#1f1f1f] rounded-lg max-w-3xl">
                <p className="text-sm text-[#a3a3a3] leading-relaxed mb-4">
                  The public booking and contact forms are protected with Cloudflare
                  Turnstile, which helps reduce automated and spam submissions.
                  When a visitor submits a form, a Turnstile token is generated
                  client-side and verified server-side before the request is
                  processed. Submissions that fail verification are rejected
                  before any database write occurs.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Client-side widget",
                    "Server-side token verification",
                    "Pre-database validation",
                    "Spam & bot reduction",
                  ].map((point) => (
                    <span
                      key={point}
                      className="text-xs font-mono px-2.5 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-[#6b6b6b] rounded"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </FadeIn>

          {/* 9. Deployment */}
          <FadeIn>
            <section aria-labelledby="cs-deployment">
              <SectionLabel>09 — Deployment</SectionLabel>
              <h2 id="cs-deployment" className="text-2xl font-bold text-[#f5f5f5] mb-4">
                Cloudflare Workers deployment
              </h2>
              <div className="p-6 bg-[#111111] border border-[#1f1f1f] rounded-lg max-w-3xl">
                <p className="text-sm text-[#a3a3a3] leading-relaxed mb-4">
                  The Next.js application is deployed on Cloudflare Workers,
                  running on Cloudflare&apos;s global edge network. This means
                  the application is served close to the user regardless of
                  their location, rather than from a single server region.
                  Deployment uses the OpenNext adapter to make Next.js
                  compatible with the Workers runtime.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Cloudflare Workers",
                    "Edge deployment",
                    "Global distribution",
                    "OpenNext adapter",
                  ].map((point) => (
                    <span
                      key={point}
                      className="text-xs font-mono px-2.5 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-[#6b6b6b] rounded"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </FadeIn>

          {/* 10. CTA */}
          <FadeIn>
            <div className="border-t border-[#1f1f1f] pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-sm font-semibold text-[#f5f5f5] mb-1">
                  View the live website
                </p>
                <p className="text-xs text-[#6b6b6b]">
                  The website is live and publicly accessible.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={project.liveUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f59e0b] hover:bg-[#fcd34d] text-[#0a0a0a] font-medium text-sm rounded transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                >
                  View live website
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#2a2a2a] hover:border-[#3a3a3a] text-[#a3a3a3] hover:text-[#f5f5f5] font-medium text-sm rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                >
                  Work with me
                </Link>
              </div>
            </div>
          </FadeIn>

        </div>
      </main>
      <Footer />
    </>
  );
}
