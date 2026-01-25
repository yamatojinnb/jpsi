"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface HistoryEntry {
  date: string;
  "1st": string;
  "2nd": string;
  "3rd": string;
  "4th"?: string;
  "5th"?: string;
  "6th"?: string;
  "7th"?: string;
  "8th"?: string;
  "9th"?: string;
  "10th"?: string;
}

interface RankingHistoryChartProps {
  history: HistoryEntry[];
}

const getUniqueNames = (history: HistoryEntry[]) => {
  const names = new Set<string>();
  const positions = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
  ] as const;

  history.forEach((entry) => {
    positions.forEach((pos) => {
      const name = entry[pos];
      if (name) names.add(name);
    });
  });
  return Array.from(names);
};

// Use consistent colors with BarChartRace
const COLORS: { [key: string]: string } = {
  "Yorck Linderhaus": "#8B0C19",
  "William Florio": "#2563eb",
  "Yutaro Nagamori": "#16a34a",
  "Elias Hannert": "#d97706",
  "Noah Holland": "#7c3aed",
  "Yash Kumar": "#dc2626",
  "Yigit Kaan Ertürk": "#0891b2",
  "Catherine Yanran Xu": "#ec4899",
  "Brandon Choi": "#14b8a6",
  "Xianmingsheng Diao": "#f97316",
  "Victor Popescu": "#8b5cf6",
  "Charlotte Voon": "#06b6d4",
  "Hana Shigeta": "#f43f5e",
  "Aditya Jain": "#84cc16",
  "Divyansh Kashyap": "#a855f7",
  "Ohji Fukuda": "#10b981",
  "Kenzo Ota": "#ef4444",
  "Elizabeth Dufrane": "#0ea5e9",
  "Kokota SUMI": "#14b8a6",
  "Risa KONNO": "#f59e0b",
  "yuki sumiyoshi": "#22c55e",
  "Pratyush Kumar": "#3b82f6",
};

const getColor = (name: string) => COLORS[name] || "#6b7280";

export default function RankingHistoryChart({
  history,
}: RankingHistoryChartProps) {
  if (!history || history.length === 0) return null;

  const names = getUniqueNames(history);
  const colorMap: { [key: string]: string } = {};
  names.forEach((name) => {
    colorMap[name] = getColor(name);
  });

  const chartData = history.map((entry) => {
    const dateObj = new Date(entry.date);
    const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;

    const dataPoint: { [key: string]: string | number } = {
      date: formattedDate,
    };

    const positions = [
      { key: "1st", rank: 1 },
      { key: "2nd", rank: 2 },
      { key: "3rd", rank: 3 },
      { key: "4th", rank: 4 },
      { key: "5th", rank: 5 },
      { key: "6th", rank: 6 },
      { key: "7th", rank: 7 },
      { key: "8th", rank: 8 },
      { key: "9th", rank: 9 },
      { key: "10th", rank: 10 },
    ] as const;

    names.forEach((name) => {
      positions.forEach(({ key, rank }) => {
        if (entry[key as keyof HistoryEntry] === name) {
          dataPoint[name] = rank;
        }
      });
    });

    return dataPoint;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">📈 Ranking History</h2>
        <p className="text-sm text-gray-500">
          Daily ranking changes for top 10 positions
        </p>
      </div>
      <div className="p-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis
              reversed
              domain={[1, 10]}
              ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              tick={{ fontSize: 11 }}
              width={35}
              tickFormatter={(value) => {
                if (value === 1) return "1st";
                if (value === 2) return "2nd";
                if (value === 3) return "3rd";
                return `${value}th`;
              }}
            />
            <Tooltip
              formatter={(value, name) => {
                const numValue = Number(value);
                const nameStr = String(name || "");
                if (numValue === 1) return ["1st place", nameStr];
                if (numValue === 2) return ["2nd place", nameStr];
                if (numValue === 3) return ["3rd place", nameStr];
                if (numValue >= 4 && numValue <= 10)
                  return [`${numValue}th place`, nameStr];
                return ["", nameStr];
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
