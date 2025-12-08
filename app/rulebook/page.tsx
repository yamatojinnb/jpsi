"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, ChevronDown, ChevronUp, ArrowUp } from "lucide-react";

export default function RulebookPage() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);

      // Update active section in TOC
      const sections = [
        "overview",
        "registration",
        "timeline",
        "rules",
        "assessment",
        "prizes",
        "communication",
        "sponsors",
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 96;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tocItems = [
    { id: "overview", label: "1. Overview" },
    { id: "registration", label: "2. Registration & Team Composition" },
    { id: "timeline", label: "3. Timeline" },
    { id: "rules", label: "4. Rules and Regulations" },
    { id: "assessment", label: "5. Assessment" },
    { id: "prizes", label: "6. Prizes and Awards" },
    { id: "communication", label: "7. Communication Hub" },
    { id: "sponsors", label: "8. Sponsors" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header Area */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  World Investment Competition 2025 Rulebook
                </h1>
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
              </div>
              <a
                href="/documents/WIC2025_RuleBook_fix.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 bg-[#8B0C19] hover:bg-[#9B1B2F] text-white px-6 py-3 rounded-lg font-semibold transition duration-200 hover:scale-105 transform"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </a>
            </div>

            {/* Table of Contents */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Table of Contents
              </h2>
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-4 py-2 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? "bg-[#8B0C19] text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Section 1: Overview */}
            <section
              id="overview"
              className="bg-white rounded-xl shadow-lg p-6 md:p-8 scroll-mt-24"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
                <h2 className="text-3xl font-bold text-gray-900">1. Overview</h2>
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
              </div>

              <div className="space-y-4 text-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  WIC 2025 at a Glance
                </h3>
                <p className="flex items-start gap-2">
                  <span className="text-[#8B0C19] text-xl">◆</span>
                  <span>
                    A global demo investment competition hosted by JPSI, Japan's
                    student-led investment community, that brings together student
                    investors and traders from around the world.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-[#8B0C19] text-xl">◆</span>
                  <span>
                    Teams of three compete over a three-month period, with each
                    member managing $1,000,000 in U.S. equities.
                  </span>
                </p>
              </div>
            </section>

            {/* Section 2: Registration & Team Composition */}
            <section
              id="registration"
              className="bg-white rounded-xl shadow-lg p-6 md:p-8 scroll-mt-24"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  2. Registration & Team Composition
                </h2>
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
              </div>

              <div className="space-y-4 text-gray-700">
                <p className="flex items-start gap-2">
                  <span className="text-[#8B0C19] text-xl">◆</span>
                  <span>
                    To participate, each team must register with exactly three
                    students.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-[#8B0C19] text-xl">◆</span>
                  <span>
                    Teams will compete as one unit, with results calculated as the
                    sum of the individual portfolios of all three members.
                  </span>
                </p>
              </div>
            </section>

            {/* Section 3: Timeline */}
            <section
              id="timeline"
              className="bg-white rounded-xl shadow-lg p-6 md:p-8 scroll-mt-24"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
                <h2 className="text-3xl font-bold text-gray-900">3. Timeline</h2>
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
              </div>

              <div className="space-y-4 text-gray-700">
                <p className="flex items-start gap-2">
                  <span className="text-[#8B0C19] text-xl">◆</span>
                  <span>
                    <strong>Kickoff:</strong> December 1, 2025 (Monday) 23:00-24:00
                    JST (Held via Zoom)
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-[#8B0C19] text-xl">◆</span>
                  <span>
                    <strong>Trial Trading Period:</strong> December 1 – December 14,
                    2025
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-[#8B0C19] text-xl">◆</span>
                  <span>
                    <strong>Opening Ceremony:</strong> December 14, 2025 (Sunday)
                    20:00-21:00 JST (Held via Zoom)
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-[#8B0C19] text-xl">◆</span>
                  <span>
                    <strong>Trading Period:</strong> December 15, 2025 – March 13,
                    2026 (3 months)
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-[#8B0C19] text-xl">◆</span>
                  <span>
                    <strong>Closing Ceremony:</strong> TBD (Held via Zoom, date and
                    time subject to scheduling)
                  </span>
                </p>
              </div>
            </section>

            {/* Section 4: Rules and Regulations */}
            <section
              id="rules"
              className="bg-white rounded-xl shadow-lg p-6 md:p-8 scroll-mt-24"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  4. Rules and Regulations
                </h2>
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
              </div>

              <div className="space-y-8">
                {/* 4.1 Registration */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    4.1 Registration
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        <strong>Eligibility:</strong> Students at the high school,
                        university, or graduate level
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        <strong>Fairness:</strong> Each student investment community
                        may register only one representative team
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        <strong>Participation Fee:</strong> $100 per team (Payment must
                        be made in U.S. dollars; participants are responsible for any
                        currency conversion fees.)
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        The team leader is responsible for making the payment on behalf
                        of the team via PayPal.
                      </span>
                    </p>
                  </div>
                </div>

                {/* 4.2 Trading */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    4.2 Trading
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        <strong>Eligible Market:</strong> Trading is permitted in U.S.
                        equities, ETFs, and options
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        <strong>Portfolio:</strong> Each participant is assigned an
                        individual $1,000,000 virtual portfolio
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        <strong>Team Performance:</strong> Calculated as the combined
                        total asset value of the three individual portfolios
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        <strong>Duration:</strong> Trading is conducted over a
                        three-month period (December 15, 2025 – March 13, 2026)
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        <strong>Trading System:</strong> All trades must be executed
                        using demo trading accounts provided by Interactive Brokers
                        Securities
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        <strong>Trading Platform:</strong> Participants must install the
                        Interactive Brokers Trader Workstation (TWS) on their PC and use
                        the account distributed on December 1, 2025 to conduct all
                        trading activities.
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        <strong>Stock Price Restriction:</strong> Trading in stocks
                        priced at $1.00 or below is prohibited. This restriction is not
                        enforced by the system; participants are responsible for
                        monitoring and complying with this rule.
                      </span>
                    </p>
                  </div>
                </div>

                {/* 4.3 Margin & Leverage - Accordion */}
                <div>
                  <button
                    onClick={() => toggleSection("margin-leverage")}
                    className="flex items-center justify-between w-full text-left mb-4"
                  >
                    <h3 className="text-2xl font-bold text-gray-900">
                      4.3 Margin & Leverage
                    </h3>
                    {openSections.has("margin-leverage") ? (
                      <ChevronUp className="w-6 h-6 text-[#8B0C19]" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-[#8B0C19]" />
                    )}
                  </button>

                  {openSections.has("margin-leverage") && (
                    <div className="space-y-6 text-gray-700">
                      {/* 4.3.1 Account Type */}
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          4.3.1 Account Type
                        </h4>
                        <p>
                          All participants are provided with a Reg T Margin Account. This
                          account type allows leverage trading and short selling under
                          U.S. Federal Reserve Regulation T rules.
                        </p>
                      </div>

                      {/* 4.3.2 Margin Requirements */}
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          4.3.2 Margin Requirements
                        </h4>

                        <div className="mb-6">
                          <h5 className="text-lg font-semibold text-gray-900 mb-3">
                            Long Positions (Buying Stock)
                          </h5>
                          <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="border border-gray-300 px-4 py-2 text-left">
                                    Requirement
                                  </th>
                                  <th className="border border-gray-300 px-4 py-2 text-left">
                                    Rate
                                  </th>
                                  <th className="border border-gray-300 px-4 py-2 text-left">
                                    Max Leverage
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="border border-gray-300 px-4 py-2">
                                    Intraday Initial Margin
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    25%
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    4x
                                  </td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-4 py-2">
                                    Intraday Maintenance Margin
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    25%
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    4x
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border border-gray-300 px-4 py-2">
                                    Overnight (Reg T End of Day)
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    50%
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    2x
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h5 className="text-lg font-semibold text-gray-900 mb-3">
                            Short Positions (Short Selling)
                          </h5>
                          <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="border border-gray-300 px-4 py-2 text-left">
                                    Requirement
                                  </th>
                                  <th className="border border-gray-300 px-4 py-2 text-left">
                                    Rate
                                  </th>
                                  <th className="border border-gray-300 px-4 py-2 text-left">
                                    Max Leverage
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="border border-gray-300 px-4 py-2">
                                    Intraday Initial Margin
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    30%
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    ~3.3x
                                  </td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-4 py-2">
                                    Intraday Maintenance Margin
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    30%
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    ~3.3x
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border border-gray-300 px-4 py-2">
                                    Overnight (Reg T End of Day)
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    50%
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    2x
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-4">
                          <p className="text-sm text-amber-800">
                            <strong>Note:</strong> Although the theoretical maximum is
                            ~3.3x based on 30% margin, the system limits short leverage
                            to 2x to reduce margin call frequency.
                          </p>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
                          <h5 className="text-lg font-semibold text-gray-900 mb-2">
                            Example 1: Leverage Calculation
                          </h5>
                          <p className="text-sm text-blue-900">
                            With a $1,000,000 portfolio, you can purchase up to
                            $4,000,000 worth of stock during trading hours (4x
                            leverage). However, you must reduce your position to
                            $2,000,000 or less by the end of the trading day to meet the
                            50% overnight requirement.
                          </p>
                        </div>
                      </div>

                      {/* 4.3.3 Overnight Requirements */}
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          4.3.3 Overnight Requirements
                        </h4>
                        <p className="mb-4">
                          Under Regulation T, all positions held overnight must meet the
                          50% margin requirement. This is checked at 15:50 ET (Eastern
                          Time) each trading day.
                        </p>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
                          <h5 className="text-lg font-semibold text-gray-900 mb-2">
                            Example 2: Intraday to Overnight Transition
                          </h5>
                          <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="border border-gray-300 px-4 py-2 text-left">
                                    Time
                                  </th>
                                  <th className="border border-gray-300 px-4 py-2 text-left">
                                    Position
                                  </th>
                                  <th className="border border-gray-300 px-4 py-2 text-left">
                                    Margin Required
                                  </th>
                                  <th className="border border-gray-300 px-4 py-2 text-left">
                                    Your Equity
                                  </th>
                                  <th className="border border-gray-300 px-4 py-2 text-left">
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="border border-gray-300 px-4 py-2">
                                    10:00 AM
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    Buy $3,000,000 stock
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    $750,000 (25%)
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    $1,000,000
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    ✅ OK
                                  </td>
                                </tr>
                                <tr className="bg-red-50">
                                  <td className="border border-gray-300 px-4 py-2">
                                    3:50 PM
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    Still holding $3,000,000
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    $1,500,000 (50%)
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    $1,000,000
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2 text-red-600">
                                    ❌ Margin Violation
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <p className="text-sm text-blue-900 mt-3">
                            In this scenario, you must either sell $1,000,000 worth of
                            stock before 3:50 PM ET, or face automatic liquidation.
                          </p>
                        </div>
                      </div>

                      {/* 4.3.4 Liquidation */}
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          4.3.4 Liquidation (Forced Selling)
                        </h4>
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
                          <p className="text-sm text-red-900 font-semibold mb-2">
                            <strong>Important: IBKR does not issue margin calls.</strong>{" "}
                            There is no warning email or phone call before liquidation.
                            If your account fails to meet margin requirements, positions
                            are automatically liquidated immediately.
                          </p>
                        </div>
                        <p className="mb-4">
                          Automatic liquidation occurs when your account fails to meet
                          margin requirements. There are two main triggers:
                        </p>
                        <div className="space-y-3 mb-4">
                          <p>
                            <strong>Trigger 1: Maintenance Margin Violation</strong>
                            <br />
                            If your Net Liquidation Value falls below the maintenance
                            margin requirement, liquidation may occur immediately in
                            real-time.
                          </p>
                          <p>
                            <strong>Trigger 2: SMA (Special Memorandum Account)
                            Violation</strong>
                            <br />
                            SMA is a credit line used to track Reg T compliance. IBKR
                            checks your SMA balance at 15:50 ET each trading day. If
                            your SMA is negative at this time, your positions will be
                            liquidated to restore compliance.
                          </p>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
                          <h5 className="text-lg font-semibold text-gray-900 mb-2">
                            Example 3: Liquidation Scenario
                          </h5>
                          <p className="text-sm text-blue-900 mb-3">
                            This scenario proceeds in three stages:
                          </p>
                          <div className="space-y-3 text-sm text-blue-900">
                            <div>
                              <strong>1. Morning: Buy $2,000,000 stock</strong>
                              <br />
                              Your Equity: $1,000,000 / Position Value: $2,000,000 /
                              Margin Required: $500,000 (25%) — Status: OK
                            </div>
                            <div>
                              <strong>2. Afternoon: Stock drops 30%</strong>
                              <br />
                              Your Equity: $400,000 / Position Value: $1,400,000 /
                              Margin Required: $350,000 (25%) — Status: Still OK
                            </div>
                            <div>
                              <strong>3. Stock drops 40% in total</strong>
                              <br />
                              Your Equity: $200,000 / Position Value: $1,200,000 /
                              Margin Required: $300,000 (25%) — Status: Liquidation
                            </div>
                          </div>
                          <p className="text-sm text-blue-900 mt-3">
                            When your equity ($200,000) falls below the maintenance
                            margin requirement ($300,000), IBKR will automatically sell a
                            portion of your holdings to restore the margin balance.
                          </p>
                        </div>
                      </div>

                      {/* 4.3.5 Important Notes */}
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          4.3.5 Important Notes
                        </h4>
                        <div className="space-y-3">
                          <p className="flex items-start gap-2">
                            <span className="text-[#8B0C19] text-lg">➢</span>
                            <span>
                              <strong>Negative Cash Balance is Normal:</strong> In a
                              margin account, your cash balance may show negative when
                              using leverage. This indicates borrowed funds and is a
                              standard feature, not an error.
                            </span>
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-[#8B0C19] text-lg">➢</span>
                            <span>
                              <strong>Short Selling Cash Increase:</strong> When you
                              short sell, the sale proceeds are credited to your cash
                              balance. However, this cash is held as collateral and
                              cannot be used freely until the position is closed.
                            </span>
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-[#8B0C19] text-lg">➢</span>
                            <span>
                              <strong>Short Selling Risk:</strong> With short positions,
                              if the stock price rises, not only does your loss
                              increase, but your maintenance margin requirement also
                              increases. This double effect makes short selling higher
                              risk.
                            </span>
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-[#8B0C19] text-lg">➢</span>
                            <span>
                              <strong>Available Funds vs. Buying Power:</strong>{" "}
                              "Available Funds" shows what you can use for new trades.
                              "Buying Power" shows the maximum value of securities you can
                              purchase with leverage. These are different from your cash
                              balance.
                            </span>
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-[#8B0C19] text-lg">➢</span>
                            <span>
                              <strong>Monitor Your Positions:</strong> Always be aware
                              of the time (especially approaching 15:50 ET) and your
                              margin utilization to avoid unexpected liquidation.
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4.4 Reports - Accordion */}
                <div>
                  <button
                    onClick={() => toggleSection("reports")}
                    className="flex items-center justify-between w-full text-left mb-4"
                  >
                    <h3 className="text-2xl font-bold text-gray-900">4.4 Reports</h3>
                    {openSections.has("reports") ? (
                      <ChevronUp className="w-6 h-6 text-[#8B0C19]" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-[#8B0C19]" />
                    )}
                  </button>

                  {openSections.has("reports") && (
                    <div className="space-y-6 text-gray-700">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          4.4.1 Point Allocation
                        </h4>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>Total: 100 points</li>
                          <li>Mandatory Final Report: 80 points</li>
                          <li>Optional Monthly Reports: 20 points</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          4.4.2 Submission Requirements
                        </h4>
                        <div className="space-y-2">
                          <p className="flex items-start gap-2">
                            <span className="text-[#8B0C19] text-lg">➢</span>
                            <span>Format: PDF (A4)</span>
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-[#8B0C19] text-lg">➢</span>
                            <span>Language: English</span>
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-[#8B0C19] text-lg">➢</span>
                            <span>Length: No specified length requirement</span>
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          4.4.3 Mandatory Final Report
                        </h4>
                        <p className="mb-3">
                          The mandatory final report must be submitted by March 10, 2026,
                          and should cover the three-month trading period (December 2025
                          – March 2026). The report must consist of the following three
                          sections:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                          <li>
                            <strong>Investment Approach Overview:</strong> Outline your
                            overall investment approach, strategy, and methodology during
                            the three-month period.
                          </li>
                          <li>
                            <strong>Key Investment Decisions:</strong> Describe the most
                            important investment decisions made during the competition
                            period, including the rationale and thought process behind
                            each decision.
                          </li>
                          <li>
                            <strong>Performance Analysis & Learning:</strong> Analyze
                            your portfolio performance and reflect on what you learned
                            from the trading experience, including successes, failures,
                            and key takeaways.
                          </li>
                        </ol>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          4.4.4 Optional Monthly Reports
                        </h4>
                        <p className="mb-3">
                          Teams may submit monthly reports during the competition period
                          (December, January, February) to document their progress,
                          strategy adjustments, and insights. These reports are optional
                          but can earn up to 20 points total.
                        </p>
                        <div className="space-y-2">
                          <p className="flex items-start gap-2">
                            <span className="text-[#8B0C19] text-lg">➢</span>
                            <span>
                              <strong>Content:</strong> Monthly reports should primarily
                              outline your investment strategy for the upcoming month.
                              You may also include progress updates, strategy
                              adjustments, and key insights from the current month.
                            </span>
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-[#8B0C19] text-lg">➢</span>
                            <span>
                              <strong>Submission:</strong> Monthly reports must be
                              submitted by the 22nd of each respective month.
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4.5 Prohibited Activities */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    4.5 Prohibited Activities
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        <strong>Latency Arbitrage:</strong> Exploiting delays between
                        real-time accounts and third-party delayed price feeds
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        <strong>Use of Insider Information:</strong> Engaging in trades
                        based on non-public, material information
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        <strong>Market Manipulation:</strong> Any attempt to distort
                        market prices or trading volume, including coordinated or
                        deceptive trading practices
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        <strong>Other Misconduct:</strong> Any activities deemed to
                        undermine the fairness or integrity of the competition
                      </span>
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mt-4">
                    <p className="text-sm text-red-900">
                      <strong>Penalty:</strong>
                      <br />
                      Violation of any of the above prohibited activities, if confirmed
                      by the organizers, will result in immediate disqualification from
                      the competition and forfeiture of all prize eligibility.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Assessment */}
            <section
              id="assessment"
              className="bg-white rounded-xl shadow-lg p-6 md:p-8 scroll-mt-24"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
                <h2 className="text-3xl font-bold text-gray-900">5. Assessment</h2>
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
              </div>

              <div className="space-y-6 text-gray-700">
                <p className="mb-6">
                  Reports will be evaluated by two distinguished judges with deep
                  expertise in investment strategy and portfolio management.
                </p>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Judge Mr. Nobuhiko Shimura
                  </h3>
                  <p>
                    A seasoned investment strategist and portfolio manager with over 25
                    years of experience across Japan, the UK, and global markets. Mr.
                    Shimura has provided expertise in equity investment, asset
                    management, and financial advisory, working with both institutional
                    and individual investors. His career includes roles such as Chief
                    Strategist at First Partners Inc., Founder & CEO of Skye Investment
                    Management Corporation, and Visiting Scholar at Stanford
                    University's Asia-Pacific Research Center. Mr. Shimura's track
                    record encompasses bottom-up global equity analysis, high-volume
                    trading operations, and the integration of AI and ETF strategies. He
                    is a certified Investment Management professional and the author of
                    "How the World's Wealthy Are Making Returns."
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Judge Mr. Yasuji Yamanaka
                  </h3>
                  <p>
                    Mr. Yamanaka is the founder of Ascendant Inc., Director (Compliance
                    Officer) of Trilogy Inc., and Representative Director of the
                    Financial Literacy Association of Japan. He formerly served as
                    Director at UP-FRONT Inc., Deputy General Manager at Nikko Citi
                    Trust Bank, and VP & Manager (proprietary trading) at Bank of
                    America. With extensive practical experience and compliance
                    expertise, he is widely active in both Japan's capital markets and
                    global markets.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Prizes and Awards */}
            <section
              id="prizes"
              className="bg-white rounded-xl shadow-lg p-6 md:p-8 scroll-mt-24"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  6. Prizes and Awards
                </h2>
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
              </div>

              <div className="space-y-8 text-gray-700">
                <p>
                  With a team participation fee of $100, participants have the chance to
                  win prizes and benefits totaling $15,000 in value. Prizes are
                  provided in the form of equivalent products and services, rather than
                  cash.
                </p>

                {/* 6.1 Award Eligibility Requirements */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    6.1 Award Eligibility Requirements
                  </h3>
                  <p className="mb-3">
                    To be eligible for any award, teams must fulfill all of the
                    following requirements:
                  </p>
                  <div className="space-y-2">
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        Payment of participation fee by the designated deadline
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        At least one team member must attend both the Opening Ceremony
                        and Closing Ceremony (held online via Zoom)
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-[#8B0C19] text-lg">➢</span>
                      <span>
                        Submission of the mandatory final report by March 10, 2026
                      </span>
                    </p>
                  </div>
                </div>

                {/* 6.2 Four Award Categories */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    6.2 Four Award Categories
                  </h3>
                  <p className="mb-6">
                    The competition recognizes outstanding performance across four
                    distinct award categories, each highlighting different aspects of
                    investment excellence.
                  </p>

                  {/* 6.2.1 Overall Performance Award */}
                  <div className="mb-6">
                    <button
                      onClick={() => toggleSection("overall-performance")}
                      className="flex items-center justify-between w-full text-left mb-4"
                    >
                      <h4 className="text-xl font-bold text-gray-900">
                        6.2.1 Overall Performance Award (Team)
                      </h4>
                      {openSections.has("overall-performance") ? (
                        <ChevronUp className="w-6 h-6 text-[#8B0C19]" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-[#8B0C19]" />
                      )}
                    </button>
                    {openSections.has("overall-performance") && (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600 italic">
                          Evaluated solely based on investment performance (the
                          percentage change in the team's combined portfolio value
                          during the competition period; reports are not included in the
                          evaluation)
                        </p>
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                          <p className="font-semibold text-gray-900 mb-2">1st Place:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Round-trip airfare for 3 team members to Japan</li>
                            <li>A one-year paid TradingView Premium account</li>
                            <li>
                              Dinner with representatives from sponsoring company
                              Webull Securities
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg">
                          <p className="font-semibold text-gray-900 mb-2">2nd Place:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>A one-year paid TradingView Premium account</li>
                          </ul>
                        </div>
                        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                          <p className="font-semibold text-gray-900 mb-2">3rd Place:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>A six-month paid TradingView Premium account</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 6.2.2 Report Award */}
                  <div className="mb-6">
                    <button
                      onClick={() => toggleSection("report-award")}
                      className="flex items-center justify-between w-full text-left mb-4"
                    >
                      <h4 className="text-xl font-bold text-gray-900">
                        6.2.2 Report Award (Team)
                      </h4>
                      {openSections.has("report-award") ? (
                        <ChevronUp className="w-6 h-6 text-[#8B0C19]" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-[#8B0C19]" />
                      )}
                    </button>
                    {openSections.has("report-award") && (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600 italic">
                          Evaluated solely based on reports (the mandatory final report,
                          optional monthly reports, and actual portfolio management).
                        </p>
                        <p className="text-sm text-gray-600 italic">
                          Assessments will be conducted fairly and from multiple
                          perspectives by two experienced judges with backgrounds at
                          major securities firms.
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                          <p className="font-semibold text-gray-900 mb-2">Prize:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Round-trip airfare for 3 team members to Japan</li>
                            <li>
                              Dinner with judges Mr. Nobuhiko Shimura and Mr. Yasuji
                              Yamanaka
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 6.2.3 Most Valuable Player Award */}
                  <div className="mb-6">
                    <button
                      onClick={() => toggleSection("mvp-award")}
                      className="flex items-center justify-between w-full text-left mb-4"
                    >
                      <h4 className="text-xl font-bold text-gray-900">
                        6.2.3 Most Valuable Player Award (Individual)
                      </h4>
                      {openSections.has("mvp-award") ? (
                        <ChevronUp className="w-6 h-6 text-[#8B0C19]" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-[#8B0C19]" />
                      )}
                    </button>
                    {openSections.has("mvp-award") && (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600 italic">
                          Presented to the individual who achieves the best performance
                          (excluding the overall winning team).
                        </p>
                        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                          <p className="font-semibold text-gray-900 mb-2">Prize:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Round-trip airfare for 1 person to Japan</li>
                            <li>
                              Invitation to a party hosted by Forward Investment Club, a
                              student investment community at Waseda University, Japan
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 6.2.4 Options Trading Award */}
                  <div className="mb-6">
                    <button
                      onClick={() => toggleSection("options-award")}
                      className="flex items-center justify-between w-full text-left mb-4"
                    >
                      <h4 className="text-xl font-bold text-gray-900">
                        6.2.4 Options Trading Award (Team)
                      </h4>
                      {openSections.has("options-award") ? (
                        <ChevronUp className="w-6 h-6 text-[#8B0C19]" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-[#8B0C19]" />
                      )}
                    </button>
                    {openSections.has("options-award") && (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600 italic">
                          Granted by Webull Securities Co. Ltd. to the team who
                          demonstrated excellence in options trading, evaluated based
                          on both options trading performance and the quality of each
                          team's report on their options trading strategies.
                        </p>
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                          <p className="font-semibold text-gray-900 mb-2">Prize:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>
                              Dinner with representatives from sponsoring company Webull
                              Securities
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 border-l-4 border-gray-400 p-3 rounded-r-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Note:</strong> This dinner is a networking
                            opportunity, not a sales or business solicitation.
                            Information about the attending Webull representatives will
                            be shared with winners in advance.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 6.3 Prize Details */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    6.3 Prize Details
                  </h3>

                  {/* 6.3.1 Airfare */}
                  <div className="mb-6">
                    <button
                      onClick={() => toggleSection("airfare")}
                      className="flex items-center justify-between w-full text-left mb-4"
                    >
                      <h4 className="text-xl font-bold text-gray-900">6.3.1 Airfare</h4>
                      {openSections.has("airfare") ? (
                        <ChevronUp className="w-6 h-6 text-[#8B0C19]" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-[#8B0C19]" />
                      )}
                    </button>
                    {openSections.has("airfare") && (
                      <div className="space-y-2">
                        <p className="flex items-start gap-2">
                          <span className="text-[#8B0C19] text-lg">➢</span>
                          <span>
                            JPSI will procure tickets on your behalf based on the date
                            and time specified at least 3 months in advance.
                          </span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="text-[#8B0C19] text-lg">➢</span>
                          <span>
                            Extremely high seasons, such as peak travel periods, may not
                            be accepted.
                          </span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="text-[#8B0C19] text-lg">➢</span>
                          <span>
                            Other methods of ticket procurement are not accepted due to
                            the involvement of sponsoring companies.
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 6.3.2 Award Variations */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      6.3.2 Award Variations
                    </h4>
                    <p>
                      Each award category is distinct and recognizes different aspects of
                      investment excellence. To ensure fairness, no team or individual may
                      receive more than one award.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: Communication Hub */}
            <section
              id="communication"
              className="bg-white rounded-xl shadow-lg p-6 md:p-8 scroll-mt-24"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  7. Communication Hub
                </h2>
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
              </div>

              <div className="space-y-4 text-gray-700">
                <p>
                  During the competition period, all official announcements from JPSI
                  will be communicated through WhatsApp groups. This includes regular
                  performance rankings, important updates, schedule changes, and
                  responses to participant questions.
                </p>
                <p>
                  Participants must join the official WhatsApp group and check it
                  regularly to ensure they receive all necessary information.
                </p>
              </div>
            </section>

            {/* Section 8: Sponsors */}
            <section
              id="sponsors"
              className="bg-white rounded-xl shadow-lg p-6 md:p-8 scroll-mt-24"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
                <h2 className="text-3xl font-bold text-gray-900">8. Sponsors</h2>
                <div className="w-16 h-1 bg-[#8B0C19]"></div>
              </div>

              <div className="space-y-8 text-gray-700">
                {/* 8.1 Interactive Brokers Securities */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    8.1 Interactive Brokers Securities (IBKR)
                  </h3>
                  <p className="mb-3">
                    A leading online brokerage firm offering institutional-level trading
                    infrastructure and access to global markets.
                  </p>
                  <p>
                    For WIC 2025, Interactive Brokers Securities (IBKR) supports the
                    competition by providing demo trading accounts and professional-grade
                    trading systems.
                  </p>
                </div>

                {/* 8.2 TradingView Inc. */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    8.2 TradingView Inc.
                  </h3>
                  <p className="mb-3">
                    One of the world's leading charting and trading platform, trusted by
                    over 100 million traders and investors worldwide.
                  </p>
                  <p>
                    For WIC 2025, TradingView Inc. provides all registered participants
                    with premium account access and full use of its advanced charting
                    tools during the competition period. Additionally, top-performing
                    teams will receive extended premium subscriptions as prizes.
                  </p>
                </div>

                {/* 8.3 Webull Securities Co. Ltd. */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    8.3 Webull Securities Co. Ltd.
                  </h3>
                  <p className="mb-3">
                    A fast-growing U.S.-based digital trading platform offering
                    commission-free trading in stocks, ETFs, and options.
                  </p>
                  <p>
                    For WIC 2025, Webull Securities Co. Ltd. sponsors the Options
                    Trading Award and additionally supports the competition through venue
                    and facility arrangements.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#8B0C19] hover:bg-[#9B1B2F] text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-40"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      <Footer />
    </div>
  );
}

