import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 bg-[#0d0d0d]"
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <SectionLabel>Services</SectionLabel>
          <SectionHeading as="h2" id="services-heading" className="mb-3">
            What I can build for you
          </SectionHeading>
          <p className="text-[#a3a3a3] max-w-xl leading-relaxed mb-12">
            Whether you need a complete website from scratch or improvements
            to something that already exists, here&apos;s how I can help.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={0.08 * i}>
              <article className="p-6 bg-[#111111] border border-[#1f1f1f] rounded-lg h-full flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-base font-semibold text-[#f5f5f5] leading-snug">
                    {service.title}
                  </h3>
                  <span className="text-xs font-mono text-[#3a3a3a] flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-sm text-[#a3a3a3] leading-relaxed flex-1 mb-5">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 bg-[#1a1a1a] border border-[#2a2a2a] text-[#6b6b6b] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
