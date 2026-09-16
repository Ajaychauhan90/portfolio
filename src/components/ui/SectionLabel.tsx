interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({
  children,
  className = "",
}: SectionLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-xs text-[#f59e0b] uppercase tracking-widest mb-4 before:block before:h-px before:w-5 before:bg-[#38bdf8]/60 before:content-[''] ${className}`}
    >
      {children}
    </span>
  );
}
