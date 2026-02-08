"use client";

export default function DashboardHeader() {
  return (
    <div className="bg-[#09090b] border-b border-[#27272a] px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#fafafa]">WIC 2025 — Judge Dashboard</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-[#a1a1aa]">
            <span>14 teams</span>
            <span>•</span>
            <span>9 countries</span>
            <span>•</span>
            <span>Dec 15 → Mar 13</span>
          </div>
        </div>
        <div className="text-xs text-[#52525b]">
          Confidential — For Judges Only
        </div>
      </div>
    </div>
  );
}

