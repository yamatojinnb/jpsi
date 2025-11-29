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
  Video,
  Settings,
  LineChart,
  Trophy,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";

// Timezone data grouped by country
// Note: Offsets are for December (winter time in Northern Hemisphere, summer time in Southern Hemisphere)
const countries = [
  {
    code: "JP",
    flag: "🇯🇵",
    name: "Japan",
    timezones: [{ label: "JST", value: "Asia/Tokyo", offset: 9 }],
  },
  {
    code: "US",
    flag: "🇺🇸",
    name: "USA",
    timezones: [
      { label: "EST (Eastern)", value: "America/New_York", offset: -5 },
      { label: "CST (Central)", value: "America/Chicago", offset: -6 },
      { label: "MST (Mountain)", value: "America/Denver", offset: -7 },
      { label: "PST (Pacific)", value: "America/Los_Angeles", offset: -8 },
    ],
  },
  {
    code: "GB",
    flag: "🇬🇧",
    name: "UK",
    timezones: [{ label: "GMT", value: "Europe/London", offset: 0 }],
  },
  {
    code: "DE",
    flag: "🇩🇪",
    name: "Germany",
    timezones: [{ label: "CET", value: "Europe/Berlin", offset: 1 }],
  },
  {
    code: "CA",
    flag: "🇨🇦",
    name: "Canada",
    timezones: [
      { label: "EST (Eastern)", value: "America/Toronto", offset: -5 },
      { label: "CST (Central)", value: "America/Winnipeg", offset: -6 },
      { label: "MST (Mountain)", value: "America/Edmonton", offset: -7 },
      { label: "PST (Pacific)", value: "America/Vancouver", offset: -8 },
    ],
  },
  {
    code: "AU",
    flag: "🇦🇺",
    name: "Australia",
    timezones: [
      { label: "AEDT (Sydney)", value: "Australia/Sydney", offset: 11 },
      { label: "ACDT (Adelaide)", value: "Australia/Adelaide", offset: 10.5 },
      { label: "AWST (Perth)", value: "Australia/Perth", offset: 8 },
    ],
  },
  {
    code: "CH",
    flag: "🇨🇭",
    name: "Switzerland",
    timezones: [{ label: "CET", value: "Europe/Zurich", offset: 1 }],
  },
  {
    code: "LV",
    flag: "🇱🇻",
    name: "Latvia",
    timezones: [{ label: "EET", value: "Europe/Riga", offset: 2 }],
  },
  {
    code: "IN",
    flag: "🇮🇳",
    name: "India",
    timezones: [{ label: "IST", value: "Asia/Kolkata", offset: 5.5 }],
  },
  {
    code: "MY",
    flag: "🇲🇾",
    name: "Malaysia",
    timezones: [{ label: "MYT", value: "Asia/Kuala_Lumpur", offset: 8 }],
  },
];

// Base times in JST (UTC+9)
const eventTimes = {
  kickoff: {
    date: "Dec 1, 2025",
    dayOfWeek: "Sun",
    startHour: 23,
    endHour: 24,
  },
  opening: {
    date: "Dec 14, 2025",
    dayOfWeek: "Sun",
    startHour: 20,
    endHour: 21,
  },
};

export default function DetailsSection() {
  const [accordionTimeline, setAccordionTimeline] = useState<number[]>([]); // All closed by default
  const [activeTab, setActiveTab] = useState("eligibility");
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("JP");
  const [selectedTimezone, setSelectedTimezone] = useState("Asia/Tokyo");
  const [showSubMenu, setShowSubMenu] = useState<string | null>(null);

  const toggleAccordionTimeline = (index: number) => {
    setAccordionTimeline((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const convertTime = (jstHour: number, targetOffset: number) => {
    const jstOffset = 9;
    let convertedHour = jstHour - jstOffset + targetOffset;
    let dayShift = 0;

    if (convertedHour >= 24) {
      convertedHour -= 24;
      dayShift = 1;
    } else if (convertedHour < 0) {
      convertedHour += 24;
      dayShift = -1;
    }

    return { hour: convertedHour, dayShift };
  };

  const formatTime = (hour: number) => {
    const h = Math.floor(hour);
    const m = hour % 1 === 0.5 ? 30 : 0;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".timezone-selector")) {
        setShowSubMenu(null);
      }
    };
    if (showSubMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showSubMenu]);

  const getConvertedEventTime = (eventKey: "kickoff" | "opening") => {
    // Find timezone from countries structure
    let tz = null;
    for (const country of countries) {
      const found = country.timezones.find((t) => t.value === selectedTimezone);
      if (found) {
        tz = found;
        break;
      }
    }
    if (!tz) return null;

    const event = eventTimes[eventKey];
    const start = convertTime(event.startHour, tz.offset);
    const end = convertTime(event.endHour, tz.offset);

    const tzAbbrev = tz.label;

    let dateDisplay = event.date;
    if (start.dayShift === 1) {
      dateDisplay = eventKey === "kickoff" ? "Dec 2, 2025" : "Dec 15, 2025";
    } else if (start.dayShift === -1) {
      dateDisplay = eventKey === "kickoff" ? "Nov 30, 2025" : "Dec 13, 2025";
    }

    return `${dateDisplay} ${formatTime(start.hour)}-${formatTime(
      end.hour
    )} ${tzAbbrev}`;
  };

  const tabs = [
    {
      id: "eligibility",
      label: "Eligibility",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-600",
    },
    {
      id: "trading",
      label: "Trading",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-600",
    },
    {
      id: "reports",
      label: "Reports",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-600",
    },
    {
      id: "prohibited",
      label: "Prohibited",
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-500",
    },
  ];

  // Auto-slide tabs
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = tabs.findIndex((tab) => tab.id === current);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [isPaused, tabs]);

  const timeline = useMemo(
    () => [
      {
        date:
          getConvertedEventTime("kickoff") ||
          "Dec 1, 2025 (Sun) 23:00-24:00 JST",
        event: "Kickoff (Zoom)",
        icons: [
          { icon: Video, bg: "bg-blue-500" },
          { icon: FileText, bg: "bg-green-600" },
        ],
        description:
          "Competition kickoff and orientation. Meet your competitors and learn about the trading platform and rules.",
      },
      {
        date: "Dec 1 - Dec 14, 2025",
        event: "Trial Trading Period",
        icons: [{ icon: Settings, bg: "bg-green-600" }],
        description:
          "Trial trading period. Practice with your virtual portfolio before the official competition begins.",
      },
      {
        date:
          getConvertedEventTime("opening") ||
          "Dec 14, 2025 (Sun) 20:00-21:00 JST",
        event: "Opening Ceremony (Zoom)",
        icons: [{ icon: Video, bg: "bg-blue-500" }],
        description:
          "Official opening of WIC2025. Final instructions before the main trading competition begins.",
      },
      {
        date: "Dec 15, 2025 - Mar 13, 2026",
        event: "Trading Period (3 months)",
        icons: [{ icon: LineChart, bg: "bg-red-600" }],
        description:
          "3 months of active trading. Build and manage your $100K portfolio to beat competitors.",
      },
      {
        date: "TBD",
        event: "Closing Ceremony (Zoom)",
        icons: [
          { icon: Video, bg: "bg-blue-500" },
          { icon: Trophy, bg: "bg-amber-500" },
        ],
        description:
          "Results announcement and awards ceremony. Date and time to be announced.",
      },
    ],
    [selectedTimezone]
  );

  return (
    <section id="rules" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-16 h-1 bg-[#8B0C19]"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Competition Details
            </h2>
            <div className="w-16 h-1 bg-[#8B0C19]"></div>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Everything you need to know about WIC2025 schedule, rules, and
            requirements.
          </p>
        </div>

        <div className="space-y-12">
          {/* Schedule Section - Refined Accordion Timeline */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-gray-900">Schedule</h3>
              <p className="text-sm text-gray-500 mt-1">
                Select your country to view times in your timezone
              </p>
            </div>

            {/* Timezone Selector - Flag Toggle Buttons */}
            <div className="mb-8 timezone-selector">
              <div className="flex flex-col items-center gap-3">
                <div className="flex flex-wrap justify-center gap-2">
                  {countries.map((country) => {
                    const isSelected = selectedCountry === country.code;
                    const hasMultipleTimezones = country.timezones.length > 1;

                    return (
                      <div key={country.code} className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (hasMultipleTimezones) {
                              setShowSubMenu(
                                showSubMenu === country.code
                                  ? null
                                  : country.code
                              );
                            } else {
                              setSelectedCountry(country.code);
                              setSelectedTimezone(country.timezones[0].value);
                              setShowSubMenu(null);
                            }
                          }}
                          className={`
                            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                            transition-all duration-200 border-2
                            ${
                              isSelected
                                ? "bg-[#8B0C19] text-white border-[#8B0C19] shadow-lg"
                                : "bg-white text-gray-700 border-gray-200 hover:border-[#8B0C19] hover:bg-red-50"
                            }
                          `}
                        >
                          <span className="text-xl">{country.flag}</span>
                          <span>{country.name}</span>
                          {hasMultipleTimezones && (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          )}
                        </button>

                        {/* Sub-menu for countries with multiple timezones */}
                        {hasMultipleTimezones &&
                          showSubMenu === country.code && (
                            <div
                              className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20 min-w-[180px]"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {country.timezones.map((tz) => (
                                <button
                                  key={tz.value}
                                  onClick={() => {
                                    setSelectedCountry(country.code);
                                    setSelectedTimezone(tz.value);
                                    setShowSubMenu(null);
                                  }}
                                  className={`
                                  w-full px-4 py-2 text-left text-sm hover:bg-red-50 transition-colors
                                  ${
                                    selectedTimezone === tz.value
                                      ? "bg-red-100 text-[#8B0C19] font-semibold"
                                      : "text-gray-700"
                                  }
                                `}
                                >
                                  {tz.label}
                                </button>
                              ))}
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>

                {/* Currently selected timezone display */}
                <div className="text-sm text-gray-600 mt-2">
                  Currently viewing:{" "}
                  <span className="font-semibold text-[#8B0C19]">
                    {countries
                      .find((c) => c.code === selectedCountry)
                      ?.timezones.find((t) => t.value === selectedTimezone)
                      ?.label || "JST"}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-300"></div>

              <div className="space-y-0">
                {timeline.map((item, index) => {
                  const isOpen = accordionTimeline.includes(index);
                  return (
                    <div key={index} className="relative">
                      {/* Timeline circle - back to numbers */}
                      <div
                        className={`absolute left-0 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-4 border-white z-10 ${
                          // Period events (2 & 4) get larger circles
                          index === 1 // Trial Trading Period
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
                              <div className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                {item.icons &&
                                  item.icons.map((iconItem, iconIndex) => {
                                    const IconComponent = iconItem.icon;
                                    return (
                                      <span
                                        key={iconIndex}
                                        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${iconItem.bg} text-white`}
                                      >
                                        <IconComponent className="w-4 h-4" />
                                      </span>
                                    );
                                  })}
                                <span className="ml-1">{item.event}</span>
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

          {/* Rules Section - Tab Version with Auto-Slide */}
          <div
            className="bg-white rounded-xl shadow-lg p-6 md:p-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Rules Overview
              </h3>
              <p className="text-sm text-gray-500 italic">
                A{" "}
                <a
                  href="/about-us"
                  className="text-[#8B0C19] underline hover:text-[#6d0a14] transition-colors"
                >
                  detailed Rulebook
                </a>{" "}
                will be provided and explained at the Kickoff session for all
                participants.
                <br />
                For IBKR platform instructions, please refer to the{" "}
                <a
                  href="/documents/IBKR%20Operations%20Manual.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8B0C19] underline hover:text-[#6d0a14] transition-colors"
                >
                  IBKR Quick Start Guide
                </a>
                .
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav
                className="flex items-center space-x-2 md:space-x-4"
                role="tablist"
              >
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative inline-flex items-center px-4 md:px-6 py-3 text-sm md:text-base font-semibold transition-all duration-300 border-b-2 ${
                        isActive
                          ? "text-gray-900 border-[#8B0C19]"
                          : "text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300"
                      }`}
                      role="tab"
                      aria-selected={isActive}
                    >
                      <Icon
                        className={`w-4 h-4 mr-2 ${
                          isActive ? tab.color : "text-gray-400"
                        }`}
                      />
                      {tab.label}
                      {/* Progress bar for active tab */}
                      {isActive && !isPaused && (
                        <span
                          className="absolute bottom-0 left-0 h-0.5 bg-[#8B0C19] animate-progress"
                          style={{
                            animation: "progress 5s linear",
                          }}
                        />
                      )}
                    </button>
                  );
                })}

                {/* Right Arrow Navigation Button */}
                <button
                  onClick={() => {
                    const currentIndex = tabs.findIndex(
                      (tab) => tab.id === activeTab
                    );
                    const nextIndex = (currentIndex + 1) % tabs.length;
                    setActiveTab(tabs[nextIndex].id);
                  }}
                  className="ml-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-[#8B0C19] hover:text-white text-gray-500 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md"
                  aria-label="Next tab"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-10 min-h-[300px]">
              {activeTab === "eligibility" && (
                <div className="transition-all duration-300 ease-in-out">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">
                      Who Can Participate?
                    </h4>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        High school, university, or graduate students
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        Team composition:{" "}
                        <span className="font-bold text-[#8B0C19] text-lg">
                          3
                        </span>{" "}
                        students per team
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
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
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">
                      Trading Rules
                    </h4>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        Markets: U.S. equities, ETFs, and options
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        Portfolio: Each participant manages individual{" "}
                        <span className="font-bold text-[#8B0C19] text-lg">
                          $100K
                        </span>{" "}
                        virtual portfolio
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        Team scoring: Combined result of three portfolios
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
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
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">
                      Reporting Requirements
                    </h4>
                  </div>

                  {/* Scoring Overview */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h5 className="text-lg font-semibold text-gray-900 mb-3">
                      Point Allocation (Total: 100 points)
                    </h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border-l-4 border-l-orange-500">
                        <span className="text-gray-700">
                          Mandatory Final Report
                        </span>
                        <span className="font-bold text-orange-500 text-lg">
                          80 pts
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border-l-4 border-l-blue-500">
                        <span className="text-gray-700">
                          Optional Monthly Reports
                        </span>
                        <span className="font-bold text-blue-600 text-lg">
                          20 pts
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submission Requirements */}
                  <div className="mb-6">
                    <h5 className="text-lg font-semibold text-gray-900 mb-3">
                      Submission Format
                    </h5>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>
                          Format: <strong>PDF (A4)</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>
                          Language: <strong>English</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>
                          Length: <strong>No limit</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Mandatory Final Report */}
                    <div>
                      <h5 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        Mandatory Final Report
                      </h5>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">
                            <strong>Deadline:</strong> March 10, 2026
                          </span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">
                            Covers the 3-month trading period (Dec 2025 – Feb
                            2026)
                          </span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">
                            Must include 3 sections: Strategy, Analysis, Results
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Optional Monthly Reports */}
                    <div>
                      <h5 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Optional Monthly Reports
                      </h5>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">
                            <strong>Deadline:</strong> 15th of each month
                          </span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">
                            Submit in Dec, Jan, Feb (up to 20 pts total)
                          </span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">
                            Document progress, strategy adjustments, and
                            insights
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

                  <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-6">
                    <div className="space-y-5">
                      <div className="flex items-start">
                        <XCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-900">
                            Latency Arbitrage
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            Exploiting delays between real-time accounts and
                            delayed price feeds
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <XCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-900">
                            Use of Insider Information
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            Trading based on non-public, material information
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <XCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-900">
                            Market Manipulation
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            Any attempt to distort prices or volume, including
                            coordinated trading
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <XCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-900">
                            Other Misconduct
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            Any activities that undermine the fairness or
                            integrity of the competition
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Penalty Clause */}
                  <div className="bg-gray-900 text-white p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <p className="text-sm">
                        <strong>Penalty:</strong> Violation of any prohibited
                        activities will result in immediate disqualification
                        from the competition and forfeiture of all prize
                        eligibility.
                      </p>
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
