"use client";

import { useState, useEffect, useRef, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navItems, personalInfo } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSectionHref, setActiveSectionHref] = useState<string | null>(
    null
  );
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const activeHref =
    pathname === "/"
      ? activeSectionHref
      : pathname.startsWith("/projects")
        ? "/#projects"
        : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = navItems
      .map((item) => item.href.split("#")[1])
      .filter(Boolean);
    let animationFrame = 0;

    const updateActiveSection = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const marker = window.scrollY + window.innerHeight * 0.3;
        let currentId: string | null = null;

        for (const id of sectionIds) {
          const section = document.getElementById(id);
          if (section && section.offsetTop <= marker) currentId = id;
        }

        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 8
        ) {
          currentId = "contact";
        }

        setActiveSectionHref(currentId ? `/#${currentId}` : null);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [pathname]);

  // Close menu on route change / resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleSectionNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    closeMenu();
    if (pathname !== "/") return;

    const sectionId = href.split("#")[1];
    if (!sectionId) return;

    event.preventDefault();
    if (window.location.hash !== `#${sectionId}`) {
      window.history.pushState(null, "", `/#${sectionId}`);
    }

    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({
      behavior: "instant" as ScrollBehavior,
      block: "start",
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#090d12]/80 backdrop-blur-xl border-b border-[#263244] shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo / Name */}
        <Link
          href="/"
          className="text-[#f8fafc] font-semibold text-sm tracking-wide hover:text-[#f59e0b] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded"
          aria-label="Ajay Chauhan — home"
        >
          <span className="font-mono text-[#f59e0b]">/</span>{" "}
          {personalInfo.name}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={(event) => handleSectionNavigation(event, item.href)}
                aria-current={activeHref === item.href ? "location" : undefined}
                className={`group relative rounded px-1 py-2 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] ${
                  activeHref === item.href
                    ? "text-[#f8fafc]"
                    : "text-[#cbd5e1] hover:text-[#38bdf8]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-[#38bdf8] transition-all duration-300 ${
                    activeHref === item.href
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 group-hover:w-full group-hover:opacity-60"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/#contact"
          onClick={(event) =>
            handleSectionNavigation(event, "/#contact")
          }
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[#090d12] bg-[#f59e0b] hover:bg-[#fbbf24] px-5 py-2 rounded-full transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d12]"
        >
          Get in touch
        </Link>

        {/* Mobile hamburger */}
        <button
          ref={menuButtonRef}
          type="button"
          className="md:hidden text-[#cbd5e1] hover:text-[#f8fafc] p-2 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls={menuOpen ? "mobile-menu" : undefined}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="overflow-hidden border-t border-[#263244] bg-[#090d12]/95 backdrop-blur-xl md:hidden"
            initial={
              prefersReducedMotion ? false : { opacity: 0, y: -8, height: 0 }
            }
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, height: 0 }
            }
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col gap-2 px-6 py-4" role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={
                      activeHref === item.href ? "location" : undefined
                    }
                    className={`flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors duration-200 ${
                      activeHref === item.href
                        ? "bg-[#38bdf8]/[0.07] text-[#f8fafc]"
                        : "text-[#cbd5e1] hover:bg-[#101722] hover:text-[#38bdf8]"
                    }`}
                    onClick={(event) =>
                      handleSectionNavigation(event, item.href)
                    }
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        activeHref === item.href
                          ? "bg-[#38bdf8]"
                          : "bg-[#334155]"
                      }`}
                      aria-hidden="true"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 border-t border-[#263244] pt-4">
                <Link
                  href="/#contact"
                  className="inline-flex rounded-full bg-[#f59e0b] px-4 py-2 text-sm font-semibold text-[#090d12] transition-colors duration-200 hover:bg-[#fbbf24]"
                  onClick={(event) =>
                    handleSectionNavigation(event, "/#contact")
                  }
                >
                  Get in touch
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
