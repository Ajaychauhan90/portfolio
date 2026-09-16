"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      aria-label="Introduction"
    >
      <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        className="ambient-orb absolute -right-32 top-16 h-80 w-80 rounded-full bg-[#f59e0b]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="ambient-orb absolute -left-32 bottom-20 h-72 w-72 rounded-full bg-[#38bdf8]/10 blur-3xl pointer-events-none [animation-delay:-7s]"
        aria-hidden="true"
      />
      {/* Fade to bg at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #090d12)",
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          {/* Headline */}
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl min-[480px]:text-5xl sm:text-6xl md:text-7xl font-bold text-[#f8fafc] leading-[1.06] tracking-[-0.04em] mb-7"
          >
            I build complete
            <br />
            <span className="text-[#f59e0b]">full-stack</span>{" "}
            <span className="text-[#38bdf8]">web</span>
            <br />
            applications.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-[#cbd5e1] leading-relaxed mb-10 max-w-2xl"
          >
            Next.js &amp; Full-Stack Developer. I handle everything from
            database design and backend logic to frontend UI and production
            deployment.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-[#f59e0b] hover:bg-[#fbbf24] text-[#090d12] font-semibold text-sm rounded-full shadow-[0_10px_30px_rgba(245,158,11,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(245,158,11,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d12]"
            >
              View my work
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
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
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#334155] hover:border-[#38bdf8]/70 bg-[#101722]/65 text-[#cbd5e1] hover:text-[#f8fafc] font-medium text-sm rounded-full backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d12]"
            >
              Get in touch
            </Link>
          </motion.div>

          {/* Tech strip */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-l border-[#38bdf8]/40 pl-4"
            aria-label="Technologies"
          >
            <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-widest">
              Stack
            </span>
            {[
              "Next.js",
              "React",
              "Node.js",
              "Supabase",
              "Cloudflare",
            ].map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono text-[#94a3b8] hover:text-[#f8fafc] transition-colors"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
