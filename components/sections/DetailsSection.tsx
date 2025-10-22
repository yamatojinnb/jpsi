"use client";

import {
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  FileText,
  XCircle,
} from "lucide-react";
import { useState } from "react";

export default function DetailsSection() {
  const [accordionTimeline, setAccordionTimeline] = useState<number[]>([]); // All closed by default
  const [activeTab, setActiveTab] = useState("eligibility");

  const toggleAccordionTimeline = (index: number) => {
    setAccordionTimeline((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const tabs = [
    { id: "eligibility", label: "Eligibility", icon: Users },
    { id: "trading", label: "Trading", icon: DollarSign },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "prohibited", label: "Prohibited", icon: AlertTriangle },
  ];

  const timeline = [
    {
      date: "Dec 1, 2025",
      event: "Opening Ceremony (JST)",
      description:
        "Competition kickoff and orientation. Meet your competitors and learn about the platform.",
    },
    {
      date: "Dec 1, 2025 - Dec 14, 2025",
      event: "Pre-Orientation",
      description:
        "Trial trading period. Practice with virtual portfolio before competition begins.",
    },
    {
      date: "Dec 14, 2025",
      event: "Kickoff (JST)",
      description:
        "Official trading begins. Real competition starts - make your first trades!",
    },
    {
      date: "Dec 15, 2025 - Mar 13, 2026",
      event: "Trading Period",
      description:
        "3 months of active trading. Build and manage your $100K portfolio to beat competitors.",
    },
    {
      date: "Mar 22, 2026",
      event: "Closing Ceremony (JST)",
      description:
        "Results announcement and awards. Celebrate the winners and learn from the competition.",
    },
  ];

  return (
    <section id="rules" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Competition Details
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Everything you need to know about WIC2025 schedule, rules, and
            requirements.
          </p>
        </div>

        <div className="space-y-12">
          {/* Schedule Section - Refined Accordion Timeline */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Schedule</h3>

            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-300"></div>

              <div className="space-y-0">
                {timeline.map((item, index) => {
                  const isOpen = accordionTimeline.includes(index);
                  return (
                    <div key={index} className="relative">
                      {/* Timeline circle */}
                      <div
                        className={`absolute left-0 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-4 border-white z-10 ${
                          // Period events (2 & 4) get larger circles
                          index === 1 // Pre-Orientation
                            ? "w-11 h-11 bg-[#8B0C19]"
                            : index === 3 // Trading Period
                            ? "w-11 h-11 bg-[#F59E0B]"
                            : "w-10 h-10 bg-[#8B0C19]"
                        }`}
                      >
                        {index + 1}
                      </div>

                      {/* Accordion item */}
                      <div
                        className={`ml-6 border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${
                          isOpen
                            ? "bg-gray-50 border-l-4 border-l-[#8B0C19]"
                            : "bg-white"
                        } ${
                          // Period events (2 & 4) get special styling
                          index === 1 // Pre-Orientation
                            ? "bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-l-[#8B0C19]"
                            : index === 3 // Trading Period
                            ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-l-[#F59E0B]"
                            : ""
                        }`}
                      >
                        <button
                          onClick={() => toggleAccordionTimeline(index)}
                          className="flex w-full items-center justify-between p-6 text-left hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#8B0C19] focus:ring-opacity-50"
                        >
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-500 mb-1">
                                {item.date}
                              </div>
                              <div className="text-lg font-bold text-gray-900">
                                {item.event}
                              </div>
                            </div>
                          </div>
                          {isOpen ? (
                            <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400 transition-transform duration-300" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-6 transition-all duration-300">
                            {/* Duration indicator for period events */}
                            {(index === 1 || index === 3) && (
                              <div
                                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                                  index === 1
                                    ? "bg-red-100 text-red-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {index === 1
                                  ? "Duration: 14 days"
                                  : "Duration: 88 days"}
                              </div>
                            )}
                            <div className="text-gray-600 leading-relaxed">
                              {item.description}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Rules Section - Tab Version */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Rules Overview
              </h3>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-2 md:space-x-4" role="tablist">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex items-center px-6 py-3 text-base font-semibold transition-all duration-300 border-b-3 ${
                        isActive
                          ? "text-gray-900 border-[#8B0C19]"
                          : "text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300"
                      }`}
                      role="tab"
                      aria-selected={isActive}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-10 min-h-[300px]">
              {activeTab === "eligibility" && (
                <div className="transition-all duration-300 ease-in-out">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#8B0C19] rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">
                      Who Can Participate?
                    </h4>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        High school, university, or graduate students
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        Team composition:{" "}
                        <span className="font-bold text-[#8B0C19] text-lg">
                          3
                        </span>{" "}
                        students per team
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        Participation fee:{" "}
                        <span className="font-bold text-[#8B0C19] text-lg">
                          $100
                        </span>{" "}
                        per team
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "trading" && (
                <div className="transition-all duration-300 ease-in-out">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#8B0C19] rounded-full flex items-center justify-center mr-4">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">
                      Trading Rules
                    </h4>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        Markets: U.S. equities, ETFs, and options
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        Portfolio: Each participant manages individual{" "}
                        <span className="font-bold text-[#8B0C19] text-lg">
                          $100K
                        </span>{" "}
                        virtual portfolio
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        Team scoring: Combined result of three portfolios
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        Platform: Interactive Brokers demo accounts
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reports" && (
                <div className="transition-all duration-300 ease-in-out">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#8B0C19] rounded-full flex items-center justify-center mr-4">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">
                      Reporting Requirements
                    </h4>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h5 className="text-lg font-semibold text-gray-900 mb-4">
                        Required Reports
                      </h5>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">
                            Mandatory report in December (investment strategy)
                          </span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">
                            Monthly performance tracking
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-semibold text-gray-900 mb-4">
                        Optional Reports
                      </h5>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">
                            Strategy change notifications
                          </span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">
                            Additional analysis documents
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "prohibited" && (
                <div className="transition-all duration-300 ease-in-out">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-red-600">
                      Prohibited Activities
                    </h4>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <XCircle className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Latency arbitrage</span>
                      </div>
                      <div className="flex items-start">
                        <XCircle className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">
                          Insider information usage
                        </span>
                      </div>
                      <div className="flex items-start">
                        <XCircle className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">
                          Market manipulation
                        </span>
                      </div>
                      <div className="flex items-start">
                        <XCircle className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">
                          Collusion with other teams
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
