"use client";

import { Trophy, Award, Star, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function PrizesSection() {
  const [hoveredPrizeType, setHoveredPrizeType] = useState<string | null>(null);
  const prizes = [
    {
      icon: Trophy,
      iconBg: "bg-amber-500",
      title: "Overall Performance Award",
      category: "Team",
      description: "Based purely on investment performance.",
      details: [
        "1st Place: Round-trip flights for 3 + TradingView Premium (1 year) + Exclusive dinner with Webull executives",
        "2nd Place: TradingView Premium (1 year)",
        "3rd Place: TradingView Premium (6 months)",
      ],
    },
    {
      icon: Award,
      iconBg: "bg-[#8B0C19]",
      title: "Trader's Award",
      category: "Team",
      description:
        "Evaluated by judges based on reports and portfolio management.",
      details: [
        "Round-trip flights for 3",
        "Exclusive dinner with judges Shimura & Yamanaka at a premium restaurant",
      ],
    },
    {
      icon: Star,
      iconBg: "bg-purple-500",
      title: "Most Valuable Player Award",
      category: "Individual",
      description: "Exceptional trading skills from unique perspective.",
      details: [
        "Round-trip flight (1 person)",
        "Invitation to Waseda Forward Investment Club party",
      ],
    },
    {
      icon: TrendingUp,
      iconBg: "bg-green-500",
      title: "Options Trading Award",
      category: "Team",
      description:
        "Excellence in options trading. Granted by Webull Securities.",
      details: ["VIP dinner with Webull executives"],
    },
  ];

  const prizeTypes = [
    {
      id: "flight",
      icon: "✈️",
      isImage: false,
      label: "Flight",
      awards: [
        "Overall Performance Award",
        "Trader's Award",
        "Most Valuable Player Award",
      ],
    },
    {
      id: "dinner",
      icon: "🥂",
      isImage: false,
      label: "VIP Dinner",
      awards: [
        "Overall Performance Award",
        "Trader's Award",
        "Options Trading Award",
      ],
    },
    {
      id: "tradingview",
      icon: "/images/TV-2.png",
      isImage: true,
      label: "TradingView",
      awards: ["Overall Performance Award"],
    },
  ];

  return (
    <section id="prizes" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-16 h-1 bg-[#8B0C19]"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Prize for the Winner
            </h2>
            <div className="w-16 h-1 bg-[#8B0C19]"></div>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-4">
            With a $100 team fee, win prizes worth $15,000
          </p>
          <p className="text-sm text-gray-600">
            Prizes provided as products/services, not cash
          </p>
        </div>

        {/* Prize Type Filter */}
        <div className="mb-8">
          <div className="flex justify-center gap-4 flex-wrap">
            {prizeTypes.map((type) => (
              <div
                key={type.id}
                onMouseEnter={() => setHoveredPrizeType(type.id)}
                onMouseLeave={() => setHoveredPrizeType(null)}
                className={`
                  flex items-center gap-2 px-5 py-3 rounded-full cursor-pointer
                  transition-all duration-300 border-2
                  ${
                    hoveredPrizeType === type.id
                      ? "bg-[#8B0C19] text-white border-[#8B0C19] shadow-lg shadow-red-200 scale-105"
                      : "bg-white text-gray-700 border-gray-200 hover:border-[#8B0C19] hover:bg-red-50"
                  }
                `}
              >
                {type.isImage ? (
                  <img
                    src={type.icon}
                    alt={type.label}
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <span className="text-2xl">{type.icon}</span>
                )}
                <span className="font-semibold">{type.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {prizes.map((prize, index) => {
            // Check if this card should be highlighted
            const isHighlighted = hoveredPrizeType
              ? prizeTypes
                  .find((t) => t.id === hoveredPrizeType)
                  ?.awards.includes(prize.title)
              : false;

            const isOtherHighlighted = hoveredPrizeType && !isHighlighted;

            return (
              <div
                key={index}
                className={`
                  relative overflow-hidden
                  bg-white rounded-xl shadow-lg p-6 border-l-4
                  transition-all duration-500 ease-out
                  ${
                    prize.category.includes("Team")
                      ? "border-l-[#8B0C19]"
                      : "border-l-blue-500"
                  }
                  ${isHighlighted ? "scale-[1.03] bg-amber-50/60" : ""}
                  ${isOtherHighlighted ? "opacity-30" : ""}
                `}
                style={
                  isHighlighted
                    ? {
                        boxShadow:
                          "0 0 20px rgba(139, 12, 25, 0.3), 0 0 40px rgba(139, 12, 25, 0.15), 0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      }
                    : {}
                }
              >
                {/* Shine Effect Overlay */}
                {isHighlighted && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                      animation: "shine 2s ease-in-out infinite",
                      width: "50%",
                    }}
                  />
                )}

                {/* Crimson Border Glow */}
                {isHighlighted && (
                  <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-[#8B0C19]" />
                )}

                {/* Category Badge - Centered */}
                <div className="text-center relative z-10">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${
                      prize.category.includes("Team")
                        ? "bg-red-100 text-[#8B0C19]"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {prize.category}
                  </span>
                </div>

                {/* Title - Centered with Elegant Font */}
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-3 text-center relative z-10">
                  {prize.title}
                </h3>

                {/* Description - Centered */}
                <p className="text-gray-600 text-sm mb-4 text-center relative z-10">
                  {prize.description}
                </p>

                {/* Divider - Centered */}
                <div className="w-12 h-0.5 bg-[#8B0C19] mx-auto mb-4 relative z-10"></div>

                {/* Prize Details - Keep GREEN checkmarks */}
                <ul className="space-y-2 relative z-10">
                  {prize.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-green-500 mt-0.5 flex-shrink-0">
                        ✓
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Prize Value Highlight */}
        <div className="mt-16 bg-gradient-to-r from-[#8B0C19] to-[#FFD700] rounded-lg p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">$15,000 in Total Prizes</h3>
          <p className="text-lg opacity-90">
            Including trophies, travel to Japan, premium trading accounts, and
            internship opportunities
          </p>
        </div>
      </div>
    </section>
  );
}
