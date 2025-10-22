"use client";

import {
  Calendar,
  Users,
  DollarSign,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

export default function DetailsSection() {
  const [openSections, setOpenSections] = useState<number[]>([0]); // Eligibility open by default
  const [accordionTimeline, setAccordionTimeline] = useState<number[]>([]); // All closed by default

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleAccordionTimeline = (index: number) => {
    setAccordionTimeline((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const timeline = [
    {
      date: "Dec 1, 2025",
      event: "Opening Ceremony (JST)",
      description: "Competition kickoff and orientation. Meet your competitors and learn about the platform.",
    },
    {
      date: "Dec 1-14, 2025",
      event: "Pre-Orientation",
      description: "Trial trading period. Practice with virtual portfolio before competition begins.",
    },
    {
      date: "Dec 15, 2025",
      event: "Kickoff (JST)",
      description: "Official trading begins. Real competition starts - make your first trades!",
    },
    {
      date: "Dec 15, 2025 – Mar 13, 2026",
      event: "Trading Period",
      description: "3 months of active trading. Build and manage your $100K portfolio to beat competitors.",
    },
    {
      date: "Mar 22, 2026",
      event: "Closing Ceremony (JST)",
      description: "Results announcement and awards. Celebrate the winners and learn from the competition.",
    },
  ];

  const rules = [
    {
      category: "Eligibility",
      icon: Users,
      items: [
        "High school, university, or graduate students",
        "Team composition: 3 students per team",
        "Participation fee: $100 per team",
      ],
    },
    {
      category: "Trading",
      icon: DollarSign,
      items: [
        "Trading markets: U.S. equities, ETFs, and options",
        "Portfolio: Each participant manages individual $100K virtual portfolio",
        "Team performance: Combined result of three portfolios",
        "Trading system: Interactive Brokers demo accounts",
      ],
    },
    {
      category: "Reports",
      icon: BookOpen,
      items: [
        "Mandatory report in December (investment strategy)",
        "Optional reports for strategy changes",
      ],
    },
    {
      category: "Prohibited",
      icon: AlertTriangle,
      items: [
        "Latency arbitrage",
        "Insider information",
        "Market manipulation",
      ],
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
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-[#8B0C19]" />
              Schedule
            </h3>
            
            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              
              <div className="space-y-0">
                {timeline.map((item, index) => {
                  const isOpen = accordionTimeline.includes(index);
                  return (
                    <div key={index} className="relative">
                      {/* Timeline circle */}
                      <div className="absolute left-0 w-10 h-10 bg-[#8B0C19] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-4 border-white z-10">
                        {index + 1}
                      </div>
                      
                      {/* Accordion item */}
                      <div className={`ml-6 border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${
                        isOpen ? 'bg-gray-50 border-l-4 border-l-[#8B0C19]' : 'bg-white'
                      }`}>
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

          {/* Rules Section - Accordion */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-[#8B0C19]" />
              Rules Overview
            </h3>
            
            <div className="space-y-4">
              {rules.map((rule, index) => {
                const isOpen = openSections.includes(index);
                return (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleSection(index)}
                      className="flex w-full items-center justify-between p-6 text-left hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#8B0C19] focus:ring-opacity-50"
                    >
                      <div className="flex items-center">
                        <rule.icon className="w-5 h-5 text-[#8B0C19] mr-3" />
                        <h4 className="text-lg font-semibold text-gray-900">
                          {rule.category}
                        </h4>
                      </div>
                      {isOpen ? (
                        <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500 transition-transform duration-300" />
                      )}
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 pb-6 transition-all duration-300">
                        <ul className="space-y-3">
                          {rule.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-600 mr-3 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
