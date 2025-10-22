import {
  Calendar,
  Users,
  DollarSign,
  BookOpen,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function DetailsSection() {
  const timeline = [
    {
      date: "Dec 1, 2025",
      event: "Opening Ceremony (JST)",
      description: "Competition kickoff and orientation",
    },
    {
      date: "Dec 1-14, 2025",
      event: "Pre-Orientation",
      description: "Trial trading period",
    },
    {
      date: "Dec 15, 2025",
      event: "Kickoff (JST)",
      description: "Official trading begins",
    },
    {
      date: "Dec 15, 2025 – Mar 13, 2026",
      event: "Trading Period",
      description: "3 months of active trading",
    },
    {
      date: "Mar 22, 2026",
      event: "Closing Ceremony (JST)",
      description: "Results announcement and awards",
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
    <section id="rules" className="py-16 bg-white">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Timeline */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-[#8B0C19]" />
              Schedule
            </h3>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#8B0C19] rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {item.date}
                    </div>
                    <div className="text-lg font-bold text-[#8B0C19] mb-1">
                      {item.event}
                    </div>
                    <div className="text-gray-600">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-[#8B0C19]" />
              Rules Overview
            </h3>
            <div className="space-y-6">
              {rules.map((rule, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <rule.icon className="w-5 h-5 text-[#8B0C19] mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">
                      {rule.category}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {rule.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
