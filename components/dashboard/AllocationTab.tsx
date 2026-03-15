"use client";

import { useState, useMemo } from "react";
import SectorPieChart from "./SectorPieChart";
import {
  Position,
  getTeamAccounts,
  filterPositionsByTeam,
  calculateSectorAllocation,
  getWeekStart,
  getWeekEnd,
  parseDate,
  SECTOR_COLORS,
} from "@/lib/dashboard-utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface AllocationTabProps {
  selectedTeam: string;
  positionsData: Position[];
}

export default function AllocationTab({
  selectedTeam,
  positionsData,
}: AllocationTabProps) {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  const teamAccounts = useMemo(
    () => getTeamAccounts(selectedTeam),
    [selectedTeam]
  );

  // Get all unique dates and group by week
  const teamPositions = useMemo(() => {
    if (!selectedTeam || teamAccounts.length === 0) return [];
    return filterPositionsByTeam(positionsData, teamAccounts);
  }, [selectedTeam, teamAccounts, positionsData]);

  const uniqueDates = useMemo(() => {
    const dates = new Set<number>();
    teamPositions.forEach((p) => dates.add(p.ReportDate));
    return Array.from(dates).sort((a, b) => a - b);
  }, [teamPositions]);

  // Group dates by week
  const weeks = useMemo(() => {
    const weekMap = new Map<number, number[]>();
    uniqueDates.forEach((dateInt) => {
      const date = parseDate(dateInt);
      const weekStart = getWeekStart(date);
      const weekNum = Math.floor(
        (date.getTime() - new Date(2025, 11, 17).getTime()) / (7 * 24 * 60 * 60 * 1000)
      ) + 1;
      if (!weekMap.has(weekNum)) {
        weekMap.set(weekNum, []);
      }
      weekMap.get(weekNum)!.push(dateInt);
    });
    return Array.from(weekMap.entries())
      .map(([weekNum, dates]) => ({
        week: weekNum,
        dates: dates.sort((a, b) => b - a), // Latest date first
      }))
      .sort((a, b) => a.week - b.week);
  }, [uniqueDates]);

  // Calculate allocation for each week
  const weeklyAllocations = useMemo(() => {
    return weeks.map((w) => {
      const latestDate = w.dates[0];
      const date = parseDate(latestDate);
      const weekStart = getWeekStart(date);
      const weekEnd = getWeekEnd(date);
      const allocation = calculateSectorAllocation(teamPositions, weekStart, weekEnd);
      return {
        week: w.week,
        allocation,
        date: date,
      };
    });
  }, [weeks, teamPositions]);

  // Selected week detail
  const selectedWeekData = useMemo(() => {
    if (selectedWeek === null) return null;
    const weekData = weeklyAllocations.find((w) => w.week === selectedWeek);
    return weekData || null;
  }, [selectedWeek, weeklyAllocations]);

  const barChartData = selectedWeekData
    ? selectedWeekData.allocation
        .map((a) => ({
          sector: a.sector,
          percentage: a.percentage,
          fill: SECTOR_COLORS[a.sector] || SECTOR_COLORS["Unknown"],
        }))
        .sort((a, b) => b.percentage - a.percentage)
    : [];

  return (
    <div className="space-y-6">
      {/* Weekly Pie Charts */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#fafafa] mb-4">Sector Allocation by Week</h3>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max px-2">
            {weeklyAllocations.map((weekData) => (
              <div
                key={weekData.week}
                className={`flex-shrink-0 cursor-pointer transition-all duration-200 ${
                  selectedWeek === weekData.week
                    ? "border-2 border-[#22c55e] rounded-lg p-3"
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setSelectedWeek(weekData.week)}
              >
                <div className="text-center mb-2">
                  <div className="text-sm font-medium text-[#fafafa]">Week {weekData.week}</div>
                  <div className="text-xs text-[#52525b]">
                    {weekData.date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div className="w-[180px] h-[180px]">
                  <SectorPieChart data={weekData.allocation} size={180} showLegend={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Week Detail */}
      {selectedWeekData && (
        <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#fafafa] mb-4">
            Week {selectedWeekData.week} Detail
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barChartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1e" />
              <XAxis
                type="number"
                stroke="#52525b"
                tick={{ fill: "#52525b", fontSize: 12 }}
                tickFormatter={(value) => `${value.toFixed(1)}%`}
              />
              <YAxis
                type="category"
                dataKey="sector"
                stroke="#52525b"
                tick={{ fill: "#a1a1aa", fontSize: 12 }}
                width={150}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                  color: "#fafafa",
                }}
                formatter={(value: number | undefined) => [`${(value ?? 0).toFixed(2)}%`, "Allocation"]}
              />
              <Bar
                dataKey="percentage"
                radius={[0, 4, 4, 0]}
                fill="#0ea5e9"
              >
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

