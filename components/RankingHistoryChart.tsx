"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface HistoryEntry {
  date: string;
  "1st": string;
  "2nd": string;
  "3rd": string;
}

interface RankingHistoryChartProps {
  history: HistoryEntry[];
}

const getUniqueNames = (history: HistoryEntry[]) => {
  const names = new Set<string>();
  history.forEach((entry) => {
    names.add(entry["1st"]);
    names.add(entry["2nd"]);
    names.add(entry["3rd"]);
  });
  return Array.from(names);
};

const COLORS = [
  "#8B0C19",
  "#2563eb",
  "#16a34a",
  "#d97706",
  "#7c3aed",
  "#dc2626",
  "#0891b2",
  "#4f46e5",
];

export default function RankingHistoryChart({ history }: RankingHistoryChartProps) {
  if (!history || history.length === 0) return null;

  const names = getUniqueNames(history);
  const colorMap: { [key: string]: string } = {};
  names.forEach((name, index) => {
    colorMap[name] = COLORS[index % COLORS.length];
  });

  const chartData = history.map((entry) => {
    const dateObj = new Date(entry.date);
    const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
    
    const dataPoint: { [key: string]: string | number } = { date: formattedDate };
    
    names.forEach((name) => {
      if (entry["1st"] === name) dataPoint[name] = 1;
      else if (entry["2nd"] === name) dataPoint[name] = 2;
      else if (entry["3rd"] === name) dataPoint[name] = 3;
      // Not in top 3 = no data point (line will break)
    });
    
    return dataPoint;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">📈 Ranking History</h2>
        <p className="text-sm text-gray-500">Daily ranking changes for top 3 positions</p>
      </div>
      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis
              reversed
              domain={[1, 3]}
              ticks={[1, 2, 3]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                if (value === 1) return "1st";
                if (value === 2) return "2nd";
                if (value === 3) return "3rd";
                return "";
              }}
            />
            <Tooltip
              formatter={(value: number | undefined, name: string) => {
                if (typeof value === "number") {
                  if (value === 1) return ["1st place", name];
                  if (value === 2) return ["2nd place", name];
                  if (value === 3) return ["3rd place", name];
                }
                return ["", name];
              }}
            />
            <Legend />
            {names.map((name) => (
              <Line
                key={name}
                type="monotone"
                dataKey={name}
                stroke={colorMap[name]}
                strokeWidth={2}
                dot={{ r: 3 }}
                connectNulls={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

