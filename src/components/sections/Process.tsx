import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data";

export default function Process() {
  return (
    <section
      id="process"
      className="py-24 bg-[#0a0a0a]"
      aria-labelledby="process-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <SectionLabel>How I work</SectionLabel>
          <SectionHeading as="h2" id="process-heading" className="mb-3">
            Development process
          </SectionHeading>
          <p className="text-[#a3a3a3] max-w-xl leading-relaxed mb-12">
            I follow a structured approach to every project so nothing gets
            missed and the result works correctly in production.
          </p>
        </FadeIn>

        <ol
          className="relative grid md:grid-cols-5 gap-0"
          aria-label="Development process steps"
        >
          {processSteps.map((step, i) => (
            <FadeIn key={step.number} delay={0.1 * i}>
              <li className="relative flex md:flex-col gap-4 md:gap-3 pb-8 md:pb-0 md:pr-4">
                {/* Connector line on desktop */}
                {i < processSteps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-5 left-[calc(1.75rem+1px)] right-0 h-px bg-[#1f1f1f]"
                    aria-hidden="true"
                  />
                )}
                {/* Connector line on mobile */}
                {i < processSteps.length - 1 && (
                  <div
                    className="md:hidden absolute top-9 left-[13px] bottom-0 w-px bg-[#1f1f1f]"
                    aria-hidden="true"
                  />
                )}

                {/* Step circle */}
                <div className="relative flex-shrink-0 w-7 h-7 md:mb-3 rounded-full bg-[#111111] border border-[#2a2a2a] flex items-center justify-center z-10">
                  <span className="text-[10px] font-mono text-[#f59e0b]">
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#f5f5f5] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#6b6b6b] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
