"use client";

import { useState, useId, useRef } from "react";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import { personalInfo } from "@/lib/data";
import TurnstileWidget from "@/components/ui/TurnstileWidget";

type FormState = "idle" | "submitting" | "success" | "error";

interface ContactFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const id = useId();
  const [formData, setFormData] = useState<ContactFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileVersion, setTurnstileVersion] = useState(0);
  const submittingRef = useRef(false);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    if (!turnstileSiteKey) {
      setErrorMessage("The contact form is not configured yet.");
      setFormState("error");
      return;
    }

    if (!turnstileToken) {
      setErrorMessage("Please complete the security check.");
      setFormState("error");
      return;
    }

    submittingRef.current = true;
    setFormState("submitting");
    setErrorMessage("");

    const submittedForm = new window.FormData(e.currentTarget as HTMLFormElement);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          company: submittedForm.get("company") ?? "",
          turnstileToken,
          submissionId: crypto.randomUUID(),
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(result?.message || "Your message could not be sent.");
      }

      setFormData({ name: "", email: "", subject: "", message: "" });
      setFormState("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please try again."
      );
      setTurnstileToken("");
      setTurnstileVersion((version) => version + 1);
      setFormState("error");
    } finally {
      submittingRef.current = false;
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-[#0c121a] border border-[#263244] rounded-lg text-sm text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-colors duration-200";

  return (
    <section
      id="contact"
      className="py-24 bg-[#0c121a]"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <SectionLabel>Contact</SectionLabel>
          <SectionHeading as="h2" id="contact-heading" className="mb-3">
            Let&apos;s work together
          </SectionHeading>
          <p className="text-[#cbd5e1] max-w-xl leading-relaxed mb-12">
            Have a project in mind? Send me a message and I&apos;ll get back
            to you.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact info */}
          <FadeIn delay={0.1} className="md:col-span-2">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-[#f8fafc] mb-4">
                  Reach me directly
                </h3>
                <div className="space-y-3">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-3 text-sm text-[#cbd5e1] hover:text-[#f8fafc] transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#101722] border border-[#263244] flex items-center justify-center flex-shrink-0 group-hover:border-[#38bdf8]/60 transition-colors">
                      <svg className="w-3.5 h-3.5 text-[#38bdf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    {personalInfo.email}
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#cbd5e1] hover:text-[#f8fafc] transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#101722] border border-[#263244] flex items-center justify-center flex-shrink-0 group-hover:border-[#38bdf8]/60 transition-colors">
                      <svg className="w-3.5 h-3.5 text-[#38bdf8]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </span>
                    LinkedIn
                  </a>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#cbd5e1] hover:text-[#f8fafc] transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#101722] border border-[#263244] flex items-center justify-center flex-shrink-0 group-hover:border-[#38bdf8]/60 transition-colors">
                      <svg className="w-3.5 h-3.5 text-[#38bdf8]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </span>
                    GitHub
                  </a>
                </div>
              </div>

              <div className="surface-card p-4 border rounded-xl">
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  I typically respond within 1–2 business days. For urgent
                  enquiries, email me directly.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.2} className="md:col-span-3">
            {formState === "success" ? (
              <div className="surface-card p-8 border rounded-xl text-center">
                <svg className="w-10 h-10 text-green-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[#f8fafc] font-medium">Message sent</p>
                <p className="text-sm text-[#94a3b8] mt-1">
                  I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                aria-label="Contact form"
                className="surface-panel rounded-xl border p-6 sm:p-8"
              >
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor={`${id}-company`}>Company website</label>
                  <input
                    id={`${id}-company`}
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor={`${id}-name`}
                      className="block text-xs font-medium text-[#94a3b8] mb-1.5"
                    >
                      Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={`${id}-name`}
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${id}-email`}
                      className="block text-xs font-medium text-[#94a3b8] mb-1.5"
                    >
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={`${id}-email`}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor={`${id}-subject`}
                    className="block text-xs font-medium text-[#94a3b8] mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id={`${id}-subject`}
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's the project about?"
                    className={inputClass}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor={`${id}-message`}
                    className="block text-xs font-medium text-[#94a3b8] mb-1.5"
                  >
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id={`${id}-message`}
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="mb-6">
                  {turnstileSiteKey ? (
                    <TurnstileWidget
                      key={turnstileVersion}
                      siteKey={turnstileSiteKey}
                      onVerify={(token) => {
                        setTurnstileToken(token);
                        if (formState === "error") {
                          setFormState("idle");
                          setErrorMessage("");
                        }
                      }}
                      onExpire={() => setTurnstileToken("")}
                      onError={() => {
                        setTurnstileToken("");
                        setErrorMessage(
                          "The security check could not load. Please try again."
                        );
                        setFormState("error");
                      }}
                    />
                  ) : (
                    <p className="rounded border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-500">
                      Contact form security is not configured.
                    </p>
                  )}
                </div>

                {/* Submission error */}
                {formState === "error" && (
                  <p
                    role="alert"
                    className="text-xs text-amber-500 mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded"
                  >
                    {errorMessage} You can also email me directly at{" "}
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="underline hover:text-amber-400"
                    >
                      {personalInfo.email}
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === "submitting" || !turnstileSiteKey}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#f59e0b] hover:bg-[#fbbf24] disabled:opacity-60 disabled:cursor-not-allowed text-[#090d12] font-semibold text-sm rounded-full transition-all duration-300 hover:-translate-y-0.5 disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c121a]"
                >
                  {formState === "submitting" ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
