import { DollarSign, Calendar, Trophy, Users } from "lucide-react";

export default function AboutSection() {
  const highlightCards = [
    {
      icon: DollarSign,
      number: "$100,000",
      title: "Virtual Portfolio",
      description:
        "Each participant manages $100K in U.S. equities, ETFs, and options",
    },
    {
      icon: Calendar,
      number: "3-Month",
      title: "Competition",
      description: "December 2025 – March 2026 trading period",
    },
    {
      icon: Trophy,
      number: "$15,000",
      title: "in Prizes",
      description: "Trophies, travel to Japan, and more",
    },
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What is WIC?
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            The World Investment Competition 2025 (WIC2025) embodies the spirit
            of the "Investment Olympics." Organized by the Japan Students
            Investment Union (JPSI), established by Waseda University's student
            finance community — the country's largest with 20+ years of history.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {highlightCards.map((card, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition duration-300 hover:scale-105"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8B0C19]/10 rounded-full mb-6">
                <card.icon className="w-8 h-8 text-[#8B0C19]" />
              </div>
              <div className="text-3xl font-bold text-[#8B0C19] mb-2">
                {card.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Organizer Info */}
        <div className="bg-[#8B0C19]/5 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Organized by JPSI
          </h3>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Japan Students Investment Union (JPSI) is Japan's leading student
            finance community, established by Waseda University's student
            finance community with over 20 years of history.
          </p>
        </div>
      </div>
    </section>
  );
}
