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
import { useState, useMemo } from "react";

// Timezone data organized by participant countries
// Note: Offsets are for December (winter time in Northern Hemisphere, summer time in Southern Hemisphere)
const timezones = [
  // Japan
  { label: "🇯🇵 Japan (JST)", value: "Asia/Tokyo", offset: 9 },

  // USA - Multiple timezones
  { label: "🇺🇸 USA - Eastern (EST)", value: "America/New_York", offset: -5 },
  { label: "🇺🇸 USA - Central (CST)", value: "America/Chicago", offset: -6 },
  { label: "🇺🇸 USA - Mountain (MST)", value: "America/Denver", offset: -7 },
  { label: "🇺🇸 USA - Pacific (PST)", value: "America/Los_Angeles", offset: -8 },

  // Canada - Multiple timezones
  { label: "🇨🇦 Canada - Eastern (EST)", value: "America/Toronto", offset: -5 },
  { label: "🇨🇦 Canada - Central (CST)", value: "America/Winnipeg", offset: -6 },
  {
    label: "🇨🇦 Canada - Mountain (MST)",
    value: "America/Edmonton",
    offset: -7,
  },
  {
    label: "🇨🇦 Canada - Pacific (PST)",
    value: "America/Vancouver",
    offset: -8,
  },

  // Australia - Multiple timezones (December = Summer Time)
  {
    label: "🇦🇺 Australia - Eastern (AEDT)",
    value: "Australia/Sydney",
    offset: 11,
  },
  {
    label: "🇦🇺 Australia - Central (ACDT)",
    value: "Australia/Adelaide",
    offset: 10.5,
  },
  {
    label: "🇦🇺 Australia - Western (AWST)",
    value: "Australia/Perth",
    offset: 8,
  },

  // UK
  { label: "🇬🇧 United Kingdom (GMT)", value: "Europe/London", offset: 0 },

  // Germany
  { label: "🇩🇪 Germany (CET)", value: "Europe/Berlin", offset: 1 },

  // Switzerland
  { label: "🇨🇭 Switzerland (CET)", value: "Europe/Zurich", offset: 1 },

  // Latvia
  { label: "🇱🇻 Latvia (EET)", value: "Europe/Riga", offset: 2 },

  // India
  { label: "🇮🇳 India (IST)", value: "Asia/Kolkata", offset: 5.5 },

  // Malaysia
  { label: "🇲🇾 Malaysia (MYT)", value: "Asia/Kuala_Lumpur", offset: 8 },
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
  const [selectedTimezone, setSelectedTimezone] = useState("Asia/Tokyo");

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

  const getConvertedEventTime = (eventKey: "kickoff" | "opening") => {
    const tz = timezones.find((t) => t.value === selectedTimezone);
    if (!tz) return null;

    const event = eventTimes[eventKey];
    const start = convertTime(event.startHour, tz.offset);
    const end = convertTime(event.endHour, tz.offset);

    const tzAbbrev = tz.label.match(/\(([^)]+)\)/)?.[1] || "";

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
    { id: "eligibility", label: "Eligibility", icon: Users },
    { id: "trading", label: "Trading", icon: DollarSign },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "prohibited", label: "Prohibited", icon: AlertTriangle },
  ];

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
            {/* Timezone Selector - Inline Right-aligned */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <h3 className="text-3xl font-bold text-gray-900">Schedule</h3>

              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                <span className="text-sm text-gray-600">Timezone:</span>
                <select
                  id="timezone"
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                  className="px-3 py-1.5 text-sm font-semibold text-[#8B0C19] bg-transparent border-none focus:ring-0 cursor-pointer"
                >
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
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
