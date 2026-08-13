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
      className={`text-3xl md:text-4xl font-bold text-[#f5f5f5] tracking-tight ${className}`}
    >
      {children}
    </Tag>
  );
}
