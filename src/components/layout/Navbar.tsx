"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navItems, personalInfo } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change / resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1f1f1f]"
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
          className="text-[#f5f5f5] font-semibold text-sm tracking-wide hover:text-[#f59e0b] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded"
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
                className="text-sm text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded px-1"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/#contact"
          className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[#0a0a0a] bg-[#f59e0b] hover:bg-[#fcd34d] px-4 py-2 rounded transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
        >
          Get in touch
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-[#a3a3a3] hover:text-[#f5f5f5] p-2 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
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
      <div
        id="mobile-menu"
        className={`md:hidden border-t border-[#1f1f1f] bg-[#0a0a0a]/98 backdrop-blur-md transition-all duration-200 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="px-6 py-4 flex flex-col gap-4" role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors duration-200 block py-1"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2 border-t border-[#1f1f1f]">
            <Link
              href="/#contact"
              className="inline-flex text-sm font-medium text-[#0a0a0a] bg-[#f59e0b] hover:bg-[#fcd34d] px-4 py-2 rounded transition-colors duration-200"
              onClick={closeMenu}
            >
              Get in touch
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
