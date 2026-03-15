"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";
import TeamSelector from "@/components/dashboard/TeamSelector";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SummaryTab from "@/components/dashboard/SummaryTab";
import AllocationTab from "@/components/dashboard/AllocationTab";
import RawDataTab from "@/components/dashboard/RawDataTab";
import { getAllUniversities, Position, Order, Performance } from "@/lib/dashboard-utils";

type Tab = "summary" | "allocation" | "rawdata";

export default function DashboardPage() {
  const [selectedTeam, setSelectedTeam] = useState<string>(getAllUniversities()[0] || "");
  const [activeTab, setActiveTab] = useState<Tab>("summary");
  const [positionsData, setPositionsData] = useState<Position[]>([]);
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [performanceData, setPerformanceData] = useState<Performance[]>([]);
  const [sp500Data, setSp500Data] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [posResponse, ordResponse, perfResponse] = await Promise.all([
          fetch("/dashboard-data/dashboard_positions.csv"),
          fetch("/dashboard-data/dashboard_orders.csv"),
          fetch("/dashboard-data/dashboard_performance.csv"),
        ]);

        if (!posResponse.ok || !ordResponse.ok || !perfResponse.ok) {
          throw new Error("Failed to load CSV files");
        }

        const [posText, ordText, perfText] = await Promise.all([
          posResponse.text(),
          ordResponse.text(),
          perfResponse.text(),
        ]);

        const positions = Papa.parse<Position>(posText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        }).data;

        const orders = Papa.parse<Order>(ordText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        }).data;

        const performance = Papa.parse<Performance>(perfText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        }).data;

        setPositionsData(positions);
        setOrdersData(orders);
        setPerformanceData(performance);

        try {
          const sp500Response = await fetch("/dashboard-data/S&P500.csv");
          const sp500Text = await sp500Response.text();
          const parsed = Papa.parse(sp500Text, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
          }).data as Record<string, unknown>[];
          setSp500Data(parsed);
        } catch {
          setSp500Data([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#fafafa] text-xl font-semibold mb-2">Loading Dashboard...</div>
          <div className="text-[#a1a1aa] text-sm">Loading CSV data files</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#ef4444] text-xl font-semibold mb-2">Error Loading Data</div>
          <div className="text-[#a1a1aa] text-sm">{error}</div>
          <div className="text-[#52525b] text-xs mt-4">
            Please ensure CSV files are in /public/dashboard-data/
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <TeamSelector selectedTeam={selectedTeam} onSelectTeam={setSelectedTeam} />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="bg-[#09090b] border-b border-[#27272a] px-6">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("summary")}
                className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === "summary"
                    ? "text-[#fafafa] border-b-[1.5px] border-[#22c55e]"
                    : "text-[#71717a] hover:text-[#a1a1aa]"
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => setActiveTab("allocation")}
                className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === "allocation"
                    ? "text-[#fafafa] border-b-[1.5px] border-[#22c55e]"
                    : "text-[#71717a] hover:text-[#a1a1aa]"
                }`}
              >
                Sector Allocation
              </button>
              <button
                onClick={() => setActiveTab("rawdata")}
                className={`px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === "rawdata"
                    ? "text-[#fafafa] border-b-[1.5px] border-[#22c55e]"
                    : "text-[#71717a] hover:text-[#a1a1aa]"
                }`}
              >
                Raw Data
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "summary" && (
              <SummaryTab
                selectedTeam={selectedTeam}
                performanceData={performanceData}
                ordersData={ordersData}
                sp500Data={sp500Data}
              />
            )}
            {activeTab === "allocation" && (
              <AllocationTab
                selectedTeam={selectedTeam}
                positionsData={positionsData}
              />
            )}
            {activeTab === "rawdata" && (
              <RawDataTab
                selectedTeam={selectedTeam}
                ordersData={ordersData}
                allOrdersData={ordersData}
              />
            )}
          </div>

          {/* Footer */}
          <div className="bg-[#09090b] border-t border-[#27272a] px-6 py-4">
            <div className="text-center text-xs text-[#52525b]">
              WIC 2025 · Japan Students Investment Union (全日本学生投資連盟) · Confidential — For
              Judges Only
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

