import type { Screenshot } from "@/types";

interface ScreenshotPlaceholderProps {
  screenshot: Screenshot;
  className?: string;
}

export default function ScreenshotPlaceholder({
  screenshot,
  className = "",
}: ScreenshotPlaceholderProps) {
  const isPortrait = screenshot.aspectRatio === "portrait";

  return (
    <figure
      className={`group relative overflow-hidden rounded-lg border border-dashed border-[#2a2a2a] bg-[#111111] ${className}`}
      aria-label={screenshot.label}
    >
      {/* Aspect ratio container */}
      <div className={isPortrait ? "aspect-[9/16]" : "aspect-video"}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
          {/* Camera icon */}
          <svg
            className="w-8 h-8 text-[#2a2a2a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="text-xs font-mono text-[#3a3a3a] leading-relaxed">
            {screenshot.label}
            <br />
            <span className="text-[#2a2a2a]">Screenshot coming soon</span>
          </p>
        </div>
      </div>

      {/* Caption */}
      <figcaption className="px-4 py-3 border-t border-[#1f1f1f]">
        <p className="text-xs font-medium text-[#6b6b6b]">{screenshot.label}</p>
        <p className="text-xs text-[#3a3a3a] mt-0.5">{screenshot.description}</p>
      </figcaption>
    </figure>
  );
}
