import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import { personalInfo } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0a0a0a]" aria-labelledby="about-heading">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div>
            <FadeIn>
              <SectionLabel>About</SectionLabel>
              <SectionHeading as="h2" id="about-heading" className="mb-6">
                Background &amp; approach
              </SectionHeading>
            </FadeIn>

            <div className="space-y-4">
              {personalInfo.about.map((paragraph, i) => (
                <FadeIn key={i} delay={0.1 * (i + 1)}>
                  <p className="text-[#a3a3a3] leading-relaxed">{paragraph}</p>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="px-3 py-1.5 bg-[#111111] border border-[#1f1f1f] rounded text-xs font-mono text-[#6b6b6b]">
                  {personalInfo.education}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: interests + quick facts */}
          <div className="space-y-8">
            <FadeIn delay={0.2}>
              <div className="p-6 bg-[#111111] border border-[#1f1f1f] rounded-lg">
                <h3 className="text-sm font-semibold text-[#f5f5f5] mb-4">
                  Interests
                </h3>
                <ul className="space-y-2" role="list">
                  {personalInfo.interests.map((interest) => (
                    <li
                      key={interest}
                      className="flex items-center gap-3 text-sm text-[#a3a3a3]"
                    >
                      <span
                        className="w-1 h-1 rounded-full bg-[#f59e0b] flex-shrink-0"
                        aria-hidden="true"
                      />
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="p-6 bg-[#111111] border border-[#1f1f1f] rounded-lg">
                <h3 className="text-sm font-semibold text-[#f5f5f5] mb-4">
                  What I bring to a project
                </h3>
                <ul className="space-y-2" role="list">
                  {[
                    "Frontend to backend — I own the whole stack",
                    "Database design and integration",
                    "Security-aware development",
                    "Production deployment experience",
                    "Clean, maintainable code",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-[#a3a3a3]"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-[#f59e0b] flex-shrink-0"
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
          </div>
        </div>
      </div>
    </section>
  );
}
