interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
}

export default function SectionHeading({
  children,
  className = "",
  as: Tag = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <Tag
      id={id}
      className={`text-3xl md:text-4xl font-bold text-[#f8fafc] leading-tight tracking-[-0.03em] ${className}`}
    >
      {children}
    </Tag>
  );
}
