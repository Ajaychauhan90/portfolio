import Image from "next/image";
import type { Screenshot } from "@/types";

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

  return (
    <figure
      className={`group overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#111111] ${className}`}
    >
      <a
        href={screenshot.src}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative block overflow-hidden bg-[#0a0a0a] ${
          isPortrait ? "aspect-[4/5]" : "aspect-video"
        }`}
        aria-label={`Open full ${screenshot.label} screenshot in a new tab`}
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
          className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
          style={{ objectPosition: screenshot.objectPosition ?? "center" }}
        />
      </a>

      <figcaption className="flex items-start justify-between gap-4 border-t border-[#1f1f1f] px-4 py-3">
        <div>
          <p className="text-xs font-medium text-[#a3a3a3]">
            {screenshot.label}
          </p>
          <p className="mt-0.5 text-xs text-[#6b6b6b]">
            {screenshot.description}
          </p>
        </div>
        <span className="shrink-0 text-[10px] font-mono uppercase tracking-wider text-[#4a4a4a]">
          Open full
        </span>
      </figcaption>
    </figure>
  );
}
