"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16"
      aria-label="Introduction"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Fade to bg at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #0a0a0a)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-xs font-mono text-[#6b6b6b]">
              Available for freelance work
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#f5f5f5] leading-tight tracking-tight mb-6"
          >
            I build complete
            <br />
            <span className="text-[#f59e0b]">full-stack</span> web
            <br />
            applications.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-[#a3a3a3] leading-relaxed mb-10 max-w-xl"
          >
            Next.js &amp; Full-Stack Developer. I handle everything from
            database design and backend logic to frontend UI and production
            deployment.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#f59e0b] hover:bg-[#fcd34d] text-[#0a0a0a] font-medium text-sm rounded transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            >
              View my work
              <svg
                className="w-4 h-4"
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
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#2a2a2a] hover:border-[#3a3a3a] text-[#a3a3a3] hover:text-[#f5f5f5] font-medium text-sm rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            >
              Get in touch
            </Link>
          </motion.div>

          {/* Tech strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2"
            aria-label="Technologies"
          >
            <span className="text-xs font-mono text-[#3a3a3a] uppercase tracking-widest">
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
                className="text-xs font-mono text-[#4a4a4a] hover:text-[#6b6b6b] transition-colors"
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
