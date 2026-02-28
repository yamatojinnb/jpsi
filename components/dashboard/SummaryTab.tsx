"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import KPICard from "./KPICard";
import {
  Performance,
  Order,
  getTeamAccounts,
  calculateTWR,
  calculateWeeklyTWR,
  filterOrdersByTeam,
  formatDateLocal,
  getWeekNumber,
} from "@/lib/dashboard-utils";

interface SummaryTabProps {
  selectedTeam: string;
  performanceData: Performance[];
  ordersData: Order[];
}

export default function SummaryTab({
  selectedTeam,
  performanceData,
  ordersData,
}: SummaryTabProps) {
  const teamAccounts = useMemo(
    () => getTeamAccounts(selectedTeam),
    [selectedTeam]
  );

  // Calculate TWR
  const twrData = useMemo(() => {
    if (!selectedTeam || teamAccounts.length === 0) return [];
    return calculateTWR(performanceData, teamAccounts);
  }, [selectedTeam, teamAccounts, performanceData]);

  // Calculate weekly TWR
  const weeklyTWR = useMemo(() => {
    return calculateWeeklyTWR(twrData);
  }, [twrData]);

  // Get team orders
  const teamOrders = useMemo(() => {
    if (!selectedTeam || teamAccounts.length === 0) return [];
    return filterOrdersByTeam(ordersData, teamAccounts);
  }, [selectedTeam, teamAccounts, ordersData]);

  // Calculate KPIs
  const totalTrades = teamOrders.length;
  const weeksWithTrades = useMemo(() => {
    const weeks = new Set<number>();
    teamOrders.forEach((order) => {
      const date = new Date(
        parseInt(order.TradeDate.toString().substring(0, 4)),
        parseInt(order.TradeDate.toString().substring(4, 6)) - 1,
        parseInt(order.TradeDate.toString().substring(6, 8))
      );
      weeks.add(getWeekNumber(date));
    });
    return weeks.size;
  }, [teamOrders]);

  const cumulativeTWR =
    twrData.length > 0
      ? twrData[twrData.length - 1].cumulativeTWR
      : 0;

  // Format chart data (use local date to avoid UTC 1-day shift)
  const chartData = twrData.map((d) => ({
    date: formatDateLocal(d.date),
    "Team TWR": d.cumulativeTWR,
    "S&P 500": 0, // TODO: Add actual S&P 500 data
  }));

  // Format weekly table data
  const weeklyTableData = weeklyTWR.map((w) => {
    const weekOrders = teamOrders.filter((order) => {
      const date = new Date(
        parseInt(order.TradeDate.toString().substring(0, 4)),
        parseInt(order.TradeDate.toString().substring(4, 6)) - 1,
        parseInt(order.TradeDate.toString().substring(6, 8))
      );
      return getWeekNumber(date) === w.week;
    });

    return {
      week: w.week,
      trades: weekOrders.length,
      weeklyTWR: w.weeklyTWR,
      cumulativeTWR: w.cumulativeTWR,
      vsSP500: 0, // TODO: Add S&P 500 comparison
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-3 shadow-lg">
          <p className="text-[#52525b] text-xs mb-2">{payload[0].payload.date}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-[#fafafa]" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(2)}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        <KPICard
          title="Cumulative TWR"
          value={`${cumulativeTWR.toFixed(2)}%`}
          trend={cumulativeTWR >= 0 ? "up" : "down"}
        />
        <KPICard title="Total Trades" value={totalTrades} />
        <KPICard title="Weeks Active" value={weeksWithTrades} />
      </div>

      {/* Performance Chart */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#fafafa] mb-4">Performance Chart</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorTWR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1e" />
            <XAxis
              dataKey="date"
              stroke="#52525b"
              tick={{ fill: "#52525b", fontSize: 12 }}
              tickFormatter={(value) => {
                // value is local "YYYY-MM-DD"; parse without UTC
                const parts = String(value).split("-");
                if (parts.length === 3) {
                  const m = parseInt(parts[1], 10);
                  const d = parseInt(parts[2], 10);
                  return `${m}/${d}`;
                }
                return value;
              }}
            />
            <YAxis
              stroke="#52525b"
              tick={{ fill: "#52525b", fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#a1a1aa" }} />
            <Area
              type="monotone"
              dataKey="Team TWR"
              stroke="#22c55e"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTWR)"
            />
            <Area
              type="monotone"
              dataKey="S&P 500"
              stroke="#52525b"
              strokeWidth={2}
              strokeDasharray="5 5"
              fillOpacity={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly Summary Table */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#fafafa] mb-4">Weekly Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#27272a]">
                <th className="text-left py-3 px-4 text-[#71717a] font-medium uppercase tracking-wider text-xs">Week</th>
                <th className="text-right py-3 px-4 text-[#71717a] font-medium uppercase tracking-wider text-xs">Trades</th>
                <th className="text-right py-3 px-4 text-[#71717a] font-medium uppercase tracking-wider text-xs">Weekly TWR</th>
                <th className="text-right py-3 px-4 text-[#71717a] font-medium uppercase tracking-wider text-xs">
                  Cumulative TWR
                </th>
                <th className="text-right py-3 px-4 text-[#71717a] font-medium uppercase tracking-wider text-xs">vs S&P 500</th>
              </tr>
            </thead>
            <tbody>
              {weeklyTableData.map((row) => (
                <tr
                  key={row.week}
                  className="border-b border-[#27272a] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                >
                  <td className="py-3 px-4 text-[#fafafa]">W{row.week}</td>
                  <td className="py-3 px-4 text-right text-[#fafafa]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>{row.trades}</td>
                  <td
                    className={`py-3 px-4 text-right ${
                      row.weeklyTWR >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"
                    }`}
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {row.weeklyTWR >= 0 ? "+" : ""}
                    {row.weeklyTWR.toFixed(2)}%
                  </td>
                  <td
                    className={`py-3 px-4 text-right ${
                      row.cumulativeTWR >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"
                    }`}
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {row.cumulativeTWR >= 0 ? "+" : ""}
                    {row.cumulativeTWR.toFixed(2)}%
                  </td>
                  <td
                    className={`py-3 px-4 text-right ${
                      row.vsSP500 >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"
                    }`}
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {row.vsSP500 >= 0 ? "+" : ""}
                    {row.vsSP500.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

