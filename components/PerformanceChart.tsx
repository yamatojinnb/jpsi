"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Team colors
const TEAM_COLORS: { [key: string]: string } = {
  "Team Alpha": "#8B0C19",
  "Team Beta": "#2563eb",
  "Team Gamma": "#16a34a",
  "Team Delta": "#d97706",
  "Team Epsilon": "#7c3aed",
};

interface HistoryEntry {
  week: number;
  date: string;
  data: { [team: string]: number };
}

interface PerformanceChartProps {
  history: HistoryEntry[] | undefined;
  rankings: { team: string }[] | undefined;
}

export default function PerformanceChart({
  history,
  rankings,
}: PerformanceChartProps) {
  // Guard clause - return null if no data
  if (!history || history.length === 0 || !rankings || rankings.length === 0) {
    return null;
  }

  // Transform data for Recharts
  const chartData = history.map((entry) => ({
    week: `W${entry.week}`,
    ...entry.data,
  }));

  // Get top 5 team names from rankings
  const topTeams = rankings.slice(0, 5).map((r) => r.team);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Performance Trend</h2>
        <p className="text-sm text-gray-500">
          Top 5 teams return over time (weekly)
        </p>
      </div>
      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
              domain={["dataMin - 2", "dataMax + 2"]}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(2)}%`, ""]}
              labelFormatter={(label) => `Week ${label.replace("W", "")}`}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: 20 }} />
            {topTeams.map((team) => (
              <Line
                key={team}
                type="monotone"
                dataKey={team}
                stroke={TEAM_COLORS[team] || "#888"}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
