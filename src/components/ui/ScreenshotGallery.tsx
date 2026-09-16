"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Screenshot } from "@/types";

interface ScreenshotGalleryContextValue {
  openScreenshot: (id: string, trigger: HTMLButtonElement) => void;
}

const ScreenshotGalleryContext =
  createContext<ScreenshotGalleryContextValue | null>(null);

interface ScreenshotGalleryProviderProps {
  screenshots: Screenshot[];
  children: ReactNode;
}

export function ScreenshotGalleryProvider({
  screenshots,
  children,
}: ScreenshotGalleryProviderProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const activeScreenshot =
    activeIndex === null ? null : screenshots[activeIndex];

  const openScreenshot = useCallback(
    (id: string, trigger: HTMLButtonElement) => {
      const nextIndex = screenshots.findIndex((item) => item.id === id);
      if (nextIndex === -1) return;

      triggerRef.current = trigger;
      setActiveIndex(nextIndex);
    },
    [screenshots]
  );

  const closeGallery = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      dialog.close();
    } else {
      setActiveIndex(null);
    }
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + screenshots.length) % screenshots.length;
    });
  }, [screenshots.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % screenshots.length;
    });
  }, [screenshots.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (activeIndex !== null && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;

    mediaRef.current?.scrollTo({ top: 0 });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
      if (event.key === "Home") {
        event.preventDefault();
        setActiveIndex(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        setActiveIndex(screenshots.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, screenshots.length, showNext, showPrevious]);

  const contextValue = useMemo(
    () => ({ openScreenshot }),
    [openScreenshot]
  );

  return (
    <ScreenshotGalleryContext.Provider value={contextValue}>
      {children}

      <dialog
        ref={dialogRef}
        className="screenshot-dialog fixed inset-0 z-[100] m-auto max-h-[94dvh] w-[min(1120px,94vw)] overflow-hidden rounded-2xl border border-[#334155] bg-[#090d12] p-0 text-[#f8fafc] shadow-[0_30px_100px_rgba(0,0,0,0.65)] backdrop:bg-[#020407]/85 backdrop:backdrop-blur-sm open:flex open:flex-col"
        aria-label="Project screenshot gallery"
        onClose={() => {
          setActiveIndex(null);
          window.requestAnimationFrame(() => triggerRef.current?.focus());
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeGallery();
        }}
      >
        {activeScreenshot && activeIndex !== null && (
          <>
            <div className="flex items-center justify-between gap-4 border-b border-[#263244] bg-[#101722]/95 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#f8fafc]">
                  {activeScreenshot.label}
                </p>
                <p
                  className="text-[10px] font-mono uppercase tracking-wider text-[#38bdf8]"
                  aria-live="polite"
                >
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(screenshots.length).padStart(2, "0")}
                </p>
              </div>
              <button
                type="button"
                onClick={closeGallery}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#334155] text-[#cbd5e1] transition-colors hover:border-[#38bdf8]/60 hover:text-[#f8fafc]"
                aria-label="Close screenshot gallery"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div
              ref={mediaRef}
              className="gallery-scroll min-h-0 flex-1 overflow-auto bg-[#06090d]"
            >
              <Image
                key={activeScreenshot.id}
                src={activeScreenshot.src}
                alt={activeScreenshot.alt}
                width={activeScreenshot.width}
                height={activeScreenshot.height}
                sizes="94vw"
                className="h-auto w-full"
                priority
              />
            </div>

            <div className="flex flex-col gap-4 border-t border-[#263244] bg-[#101722] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div className="min-w-0">
                <p className="text-xs leading-relaxed text-[#94a3b8]">
                  {activeScreenshot.description}
                </p>
                <a
                  href={activeScreenshot.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex text-[10px] font-mono uppercase tracking-wider text-[#38bdf8] transition-colors hover:text-[#7dd3fc]"
                >
                  Open original image
                  <span aria-hidden="true">&nbsp;↗</span>
                </a>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={showPrevious}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-[#334155] px-4 text-xs font-medium text-[#cbd5e1] transition-all hover:border-[#38bdf8]/60 hover:text-[#f8fafc]"
                  aria-label="Show previous screenshot"
                >
                  <span aria-hidden="true">←</span>
                  Previous
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-[#f59e0b] px-4 text-xs font-semibold text-[#090d12] transition-colors hover:bg-[#fbbf24]"
                  aria-label="Show next screenshot"
                >
                  Next
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </ScreenshotGalleryContext.Provider>
  );
}

export function useScreenshotGallery() {
  return useContext(ScreenshotGalleryContext);
}
