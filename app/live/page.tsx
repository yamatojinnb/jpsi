"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Bell,
  Calendar,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PerformanceChart from "@/components/PerformanceChart";

// Import rankings data
import rankingsData from "@/data/rankings.json";

export default function LivePage() {
  const [data, setData] = useState(rankingsData);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Country flag emoji helper
  const getFlag = (code: string) => {
    const flags: { [key: string]: string } = {
      CA: "🇨🇦",
      DE: "🇩🇪",
      JP: "🇯🇵",
      AU: "🇦🇺",
      IN: "🇮🇳",
      UK: "🇬🇧",
      MY: "🇲🇾",
      US: "🇺🇸",
      CH: "🇨🇭",
    };
    return flags[code] || "🏳️";
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Header */}
        <section className="bg-[#8B0C19] text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-start">
              {/* Left side - Title */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                  <span className="text-sm font-medium uppercase tracking-wider">
                    Live Updates
                  </span>
                </div>
                <h1 className="text-4xl font-bold mb-2">
                  WIC2025 Live Rankings
                </h1>
                <p className="text-white/80">
                  Week {data.week} • Last updated:{" "}
                  {formatDate(data.lastUpdated)}
                </p>
              </div>

              {/* Right side - Quick Links */}
              <div className="hidden lg:block">
                <p className="text-white/60 text-xs uppercase tracking-wider mb-3 text-right">
                  Quick Links
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <Link
                    href="/whatsapp"
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm text-center"
                  >
                    WhatsApp Group
                  </Link>
                  <a
                    href="https://www.interactivebrokers.com/en/trading/download-tws.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm text-center"
                  >
                    Download TWS
                  </a>
                  <a
                    href="https://jp.tradingview.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm text-center"
                  >
                    TradingView
                  </a>
                  <a
                    href="https://www.jpsi-official.jp/rulebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm text-center"
                  >
                    WIC Rulebook
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm text-center"
                  >
                    Report Guidelines
                  </a>
                  <a
                    href="https://www.jpsi-official.jp/documents/IBKR%20Operations%20Manual.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm text-center"
                  >
                    IBKR Guide
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Rankings Table - Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#8B0C19]" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Current Standings
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Team
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          University
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Return
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Change
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.rankings.map((team, index) => (
                        <tr
                          key={team.rank}
                          className={`hover:bg-gray-50 transition-colors ${
                            index < 3 ? "bg-yellow-50/30" : ""
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                                team.rank === 1
                                  ? "bg-yellow-400 text-yellow-900"
                                  : team.rank === 2
                                  ? "bg-gray-300 text-gray-700"
                                  : team.rank === 3
                                  ? "bg-amber-600 text-white"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {team.rank}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {team.team}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                            <span className="mr-2">
                              {getFlag(team.country)}
                            </span>
                            {team.university}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-gray-900">
                            {team.return > 0 ? "+" : ""}
                            {team.return.toFixed(2)}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <span
                              className={`inline-flex items-center gap-1 ${
                                team.change > 0
                                  ? "text-green-600"
                                  : team.change < 0
                                  ? "text-red-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {team.change > 0 ? (
                                <TrendingUp className="w-4 h-4" />
                              ) : team.change < 0 ? (
                                <TrendingDown className="w-4 h-4" />
                              ) : null}
                              {team.change > 0 ? "+" : ""}
                              {team.change.toFixed(2)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Performance Chart */}
              {data.history && data.history.length > 0 && (
                <PerformanceChart
                  history={data.history}
                  rankings={data.rankings}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Announcements - Scrollable, max 2 visible */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#8B0C19]" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Announcements
                  </h2>
                </div>
                {data.announcements.length > 0 ? (
                  <div className="divide-y divide-gray-100 max-h-[200px] overflow-y-auto">
                    {data.announcements.map((announcement, index) => (
                      <div
                        key={index}
                        className={`px-6 py-4 ${
                          index === 0 ? "bg-[#8B0C19]/5" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-xs text-gray-500">
                            {formatDate(announcement.date)}
                          </p>
                          {index === 0 && (
                            <span className="text-xs bg-[#8B0C19]/10 text-[#8B0C19] px-2 py-0.5 rounded-full font-medium">
                              Latest
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {index === 0 && (
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B0C19] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B0C19]"></span>
                            </span>
                          )}
                          <h3 className="font-semibold text-gray-900">
                            {announcement.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {announcement.content}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-6 py-8 text-center text-gray-500">
                    <p className="text-sm">No announcements at this time.</p>
                  </div>
                )}
              </div>

              {/* Schedule - With past event styling */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#8B0C19]" />
                  <h2 className="text-lg font-bold text-gray-900">Schedule</h2>
                </div>
                <div className="p-4 space-y-3">
                  {/* Jan 22 - Optional Report #1 */}
                  {(() => {
                    const isPast = new Date() > new Date("2026-01-22");
                    return (
                      <div
                        className={`flex items-center gap-3 ${
                          isPast ? "opacity-50" : ""
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center ${
                            isPast ? "bg-gray-100" : "bg-[#8B0C19]/10"
                          }`}
                        >
                          <span
                            className={`text-xs font-medium ${
                              isPast ? "text-gray-400" : "text-[#8B0C19]"
                            }`}
                          >
                            JAN
                          </span>
                          <span
                            className={`text-lg font-bold ${
                              isPast ? "text-gray-400" : "text-[#8B0C19]"
                            }`}
                          >
                            22
                          </span>
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              isPast
                                ? "text-gray-400 line-through"
                                : "text-gray-900"
                            }`}
                          >
                            Optional Report #1
                          </p>
                          <p
                            className={`text-sm ${
                              isPast ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            December report deadline
                          </p>
                        </div>
                        {isPast && (
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                            Done
                          </span>
                        )}
                      </div>
                    );
                  })()}

                  {/* Feb 22 - Optional Report #2 */}
                  {(() => {
                    const isPast = new Date() > new Date("2026-02-22");
                    return (
                      <div
                        className={`flex items-center gap-3 ${
                          isPast ? "opacity-50" : ""
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center ${
                            isPast ? "bg-gray-100" : "bg-gray-100"
                          }`}
                        >
                          <span
                            className={`text-xs font-medium ${
                              isPast ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            FEB
                          </span>
                          <span
                            className={`text-lg font-bold ${
                              isPast ? "text-gray-400" : "text-gray-700"
                            }`}
                          >
                            22
                          </span>
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              isPast
                                ? "text-gray-400 line-through"
                                : "text-gray-900"
                            }`}
                          >
                            Optional Report #2
                          </p>
                          <p
                            className={`text-sm ${
                              isPast ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            January report deadline
                          </p>
                        </div>
                        {isPast && (
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                            Done
                          </span>
                        )}
                      </div>
                    );
                  })()}

                  {/* Mar 10 - Final Report */}
                  {(() => {
                    const isPast = new Date() > new Date("2026-03-10");
                    return (
                      <div
                        className={`flex items-center gap-3 ${
                          isPast ? "opacity-50" : ""
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center ${
                            isPast ? "bg-gray-100" : "bg-red-100"
                          }`}
                        >
                          <span
                            className={`text-xs font-medium ${
                              isPast ? "text-gray-400" : "text-red-600"
                            }`}
                          >
                            MAR
                          </span>
                          <span
                            className={`text-lg font-bold ${
                              isPast ? "text-gray-400" : "text-red-600"
                            }`}
                          >
                            10
                          </span>
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              isPast
                                ? "text-gray-400 line-through"
                                : "text-gray-900"
                            }`}
                          >
                            Final Report Due
                          </p>
                          <p
                            className={`text-sm ${
                              isPast ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Mandatory submission
                          </p>
                        </div>
                        {isPast && (
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                            Done
                          </span>
                        )}
                      </div>
                    );
                  })()}

                  {/* Mar 13 - Trading Ends */}
                  {(() => {
                    const isPast = new Date() > new Date("2026-03-13");
                    return (
                      <div
                        className={`flex items-center gap-3 ${
                          isPast ? "opacity-50" : ""
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center ${
                            isPast ? "bg-gray-100" : "bg-gray-100"
                          }`}
                        >
                          <span
                            className={`text-xs font-medium ${
                              isPast ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            MAR
                          </span>
                          <span
                            className={`text-lg font-bold ${
                              isPast ? "text-gray-400" : "text-gray-700"
                            }`}
                          >
                            13
                          </span>
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              isPast
                                ? "text-gray-400 line-through"
                                : "text-gray-900"
                            }`}
                          >
                            Trading Period Ends
                          </p>
                          <p
                            className={`text-sm ${
                              isPast ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Final day of competition
                          </p>
                        </div>
                        {isPast && (
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                            Done
                          </span>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
