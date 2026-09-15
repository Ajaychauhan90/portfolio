"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { WorkflowStep } from "@/types";

interface Props {
  steps: WorkflowStep[];
}

const stepIcons: Record<number, React.ReactNode> = {
  1: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  2: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  3: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  4: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  5: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  6: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  ),
  7: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
};

export default function CaseStudyWorkflow({ steps }: Props) {
  const prefersReduced = useReducedMotion();

  // Split into two rows: [1,2,3,4] top row left-to-right, [5,6,7] bottom row right-to-left
  const topRow = steps.slice(0, 4);
  const bottomRow = steps.slice(4).reverse(); // reversed so the arrow bends right-to-left visually

  return (
    <div
      className="p-6 bg-[#111111] border border-[#1f1f1f] rounded-lg"
      role="region"
      aria-label="Booking workflow diagram"
    >
      {/* ── Desktop: Z-shaped grid ─────────────────────────────── */}
      <div className="hidden md:block">
        {/* Row 1: steps 1–4, left → right */}
        <div className="grid grid-cols-4 gap-0">
          {topRow.map((step, i) => (
            <div key={step.step} className="relative flex flex-col items-center">
              {/* Connector arrow after each node except the last in the row */}
              {i < topRow.length - 1 && (
                <div className="absolute top-6 left-[calc(50%+22px)] right-0 flex items-center" aria-hidden="true">
                  <div className="flex-1 h-px bg-[#2a2a2a]" />
                  <svg className="w-3 h-3 text-[#2a2a2a] -mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              <StepNode step={step} prefersReduced={prefersReduced ?? false} index={i} />
            </div>
          ))}
        </div>

        {/* Bend connector: right side going down */}
        <div className="flex justify-end pr-[12.5%] my-1" aria-hidden="true">
          <div className="w-px h-8 bg-[#2a2a2a] relative">
            <svg className="w-3 h-3 text-[#2a2a2a] absolute -bottom-1 left-1/2 -translate-x-1/2" fill="currentColor" viewBox="0 0 12 12">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Row 2: steps 5–7 reversed visually (right → left) */}
        <div className="grid grid-cols-4 gap-0">
          {/* Empty placeholder cell for column 1 */}
          <div />
          {/* Step 7 (rightmost, col 4), step 6 (col 3), step 5 (col 2) — reversed */}
          {bottomRow.map((step, i) => (
            <div key={step.step} className="relative flex flex-col items-center">
              {/* Connector arrow after each node except the last (rightmost visible) */}
              {i < bottomRow.length - 1 && (
                <div className="absolute top-6 left-0 right-[calc(50%+22px)] flex items-center" aria-hidden="true">
                  <svg className="w-3 h-3 text-[#2a2a2a] -ml-1 flex-shrink-0" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex-1 h-px bg-[#2a2a2a]" />
                </div>
              )}
              <StepNode step={step} prefersReduced={prefersReduced ?? false} index={topRow.length + i} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: vertical list ──────────────────────────────── */}
      <ol className="md:hidden space-y-0" aria-label="Booking workflow steps">
        {steps.map((step, i) => (
          <li key={step.step} className="flex gap-4 pb-6 last:pb-0">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0 text-[#6b6b6b]">
                {stepIcons[step.step]}
              </div>
              {i < steps.length - 1 && (
                <div className="w-px flex-1 mt-2 bg-[#1f1f1f]" aria-hidden="true" />
              )}
            </div>
            <div className="pt-2">
              <p className="text-sm font-semibold text-[#f5f5f5]">{step.title}</p>
              <p className="text-xs text-[#6b6b6b] mt-0.5 leading-relaxed">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function StepNode({
  step,
  prefersReduced,
  index,
}: {
  step: WorkflowStep;
  prefersReduced: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center px-2 py-4 w-full"
    >
      {/* Icon circle */}
      <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#6b6b6b] mb-3 z-10 relative">
        {stepIcons[step.step]}
      </div>
      {/* Step number */}
      <span className="text-[10px] font-mono text-[#f59e0b] mb-1">
        {String(step.step).padStart(2, "0")}
      </span>
      {/* Title */}
      <p className="text-xs font-semibold text-[#f5f5f5] leading-snug mb-1">
        {step.title}
      </p>
      {/* Description */}
      <p className="text-[10px] text-[#6b6b6b] leading-relaxed max-w-[100px]">
        {step.description}
      </p>
    </motion.div>
  );
}
