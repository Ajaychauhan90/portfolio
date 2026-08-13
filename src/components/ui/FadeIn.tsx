"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Direction to fade in from */
  from?: "bottom" | "left" | "right" | "none";
}

export default function FadeIn({
  children,
  delay = 0,
  className = "",
  from = "bottom",
}: FadeInProps) {
  const prefersReduced = useReducedMotion();

  const initial =
    prefersReduced || from === "none"
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: from === "bottom" ? 16 : 0,
          x: from === "left" ? -16 : from === "right" ? 16 : 0,
        };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
