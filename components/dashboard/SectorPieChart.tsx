"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { SECTOR_COLORS } from "@/lib/dashboard-utils";

interface SectorData {
  sector: string;
  value: number;
  percentage: number;
}

interface SectorPieChartProps {
  data: SectorData[];
  size?: number;
  showLegend?: boolean;
}

export default function SectorPieChart({
  data,
  size = 200,
  showLegend = true,
}: SectorPieChartProps) {
  const chartData = data.map((d) => ({
    name: d.sector,
    value: d.percentage,
  }));

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    if (percent < 0.05) return null; // Don't show label for slices < 5%
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-3 shadow-lg">
          <p className="text-[#fafafa] font-semibold">{payload[0].name}</p>
          <p className="text-[#a1a1aa] text-sm">
            {payload[0].value.toFixed(2)}% · ${payload[0].payload.value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate radius based on size (diameter)
  const outerRadius = (size / 2) * 0.9; // 90% of half diameter
  const innerRadius = outerRadius * 0.3; // 30% of outer radius

  return (
    <ResponsiveContainer width="100%" height={size + (showLegend ? 100 : 0)}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomLabel}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={SECTOR_COLORS[entry.name] || SECTOR_COLORS["Unknown"]}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        {showLegend && (
          <Legend
            wrapperStyle={{ fontSize: "12px", color: "#a1a1aa" }}
            iconType="circle"
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}

