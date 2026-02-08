"use client";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
}

export default function KPICard({ title, value, subtitle, trend }: KPICardProps) {
  const trendColor =
    trend === "up"
      ? "text-[#22c55e]"
      : trend === "down"
      ? "text-[#ef4444]"
      : "text-[#fafafa]";

  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6">
      <div className="text-[10px] uppercase tracking-wider text-[#71717a] mb-2 font-medium">{title}</div>
      <div className={`text-2xl font-bold mb-1 ${trendColor}`} style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      {subtitle && (
        <div className="text-xs text-[#52525b] mt-1">{subtitle}</div>
      )}
    </div>
  );
}

