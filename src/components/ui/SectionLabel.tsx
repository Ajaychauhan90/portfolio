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
      className={`inline-block font-mono text-xs text-[#f59e0b] uppercase tracking-widest mb-4 ${className}`}
    >
      {children}
    </span>
  );
}
