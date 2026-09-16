"use client";

import Image from "next/image";
import type { Screenshot } from "@/types";
import { useScreenshotGallery } from "@/components/ui/ScreenshotGallery";

interface ProjectScreenshotProps {
  screenshot: Screenshot;
  className?: string;
  preload?: boolean;
}

export default function ProjectScreenshot({
  screenshot,
  className = "",
  preload = false,
}: ProjectScreenshotProps) {
  const isPortrait = screenshot.aspectRatio === "portrait";
  const gallery = useScreenshotGallery();

  return (
    <figure
      className={`surface-card group overflow-hidden rounded-xl border border-[#334155] bg-[#101722] ${className}`}
    >
      <button
        type="button"
        onClick={(event) =>
          gallery?.openScreenshot(screenshot.id, event.currentTarget)
        }
        className={`relative block overflow-hidden bg-[#090d12] ${
          isPortrait ? "aspect-[4/5]" : "aspect-video"
        } w-full cursor-zoom-in text-left`}
        aria-label={`Open ${screenshot.label} in the screenshot gallery`}
        aria-haspopup="dialog"
      >
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          fill
          preload={preload}
          sizes={
            isPortrait
              ? "(max-width: 640px) 100vw, 50vw"
              : "(max-width: 1024px) 100vw, 960px"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          style={{ objectPosition: screenshot.objectPosition ?? "center" }}
        />
        <span
          className="absolute inset-0 flex items-center justify-center bg-[#090d12]/0 opacity-0 transition-all duration-300 group-hover:bg-[#090d12]/35 group-hover:opacity-100 group-focus-within:bg-[#090d12]/35 group-focus-within:opacity-100"
          aria-hidden="true"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#090d12]/85 px-4 py-2 text-xs font-medium text-white shadow-xl backdrop-blur-md">
            <svg
              className="h-3.5 w-3.5 text-[#38bdf8]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9V5.25A1.5 1.5 0 015.25 3.75H9m6 0h3.75a1.5 1.5 0 011.5 1.5V9m0 6v3.75a1.5 1.5 0 01-1.5 1.5H15m-6 0H5.25a1.5 1.5 0 01-1.5-1.5V15"
              />
            </svg>
            View gallery
          </span>
        </span>
      </button>

      <figcaption className="flex items-start justify-between gap-4 border-t border-[#263244] px-4 py-3">
        <div>
          <p className="text-xs font-medium text-[#cbd5e1]">
            {screenshot.label}
          </p>
          <p className="mt-0.5 text-xs text-[#94a3b8]">
            {screenshot.description}
          </p>
        </div>
        <span className="shrink-0 text-[10px] font-mono uppercase tracking-wider text-[#38bdf8]">
          View gallery
        </span>
      </figcaption>
    </figure>
  );
}
