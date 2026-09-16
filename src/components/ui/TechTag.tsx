import type { TechTag as TechTagType } from "@/types";

interface TechTagProps {
  tag: TechTagType | string;
  size?: "sm" | "md";
}

const categoryColors: Record<string, string> = {
  frontend: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  backend: "text-green-400 bg-green-400/10 border-green-400/20",
  database: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  deployment: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  security: "text-red-400 bg-red-400/10 border-red-400/20",
  default: "text-[#cbd5e1] bg-[#141e2a] border-[#334155]",
};

export default function TechTag({ tag, size = "md" }: TechTagProps) {
  const name = typeof tag === "string" ? tag : tag.name;
  const category = typeof tag === "string" ? "default" : tag.category;
  const colorClass = categoryColors[category] ?? categoryColors.default;

  const sizeClass =
    size === "sm"
      ? "text-xs px-2 py-0.5"
      : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center font-mono border rounded ${sizeClass} ${colorClass}`}
    >
      {name}
    </span>
  );
}
