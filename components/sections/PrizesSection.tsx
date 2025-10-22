import { Trophy, Award, Star, Target } from "lucide-react";

export default function PrizesSection() {
  const awards = [
    {
      icon: Trophy,
      title: "Overall Performance Award",
      subtitle: "Team",
      description:
        "Based purely on investment performance. 1st/2nd/3rd place: Trophy/Plaque, round-trip travel to Japan, and more.",
      color: "bg-yellow-500",
    },
    {
      icon: Award,
      title: "Trader's Award",
      subtitle: "Team",
      description:
        "Evaluated by judges from major securities firms. Based on reports and portfolio management. Potential internship opportunities.",
      color: "bg-[#8B0C19]",
    },
    {
      icon: Star,
      title: "Most Valuable Player Award",
      subtitle: "Individual",
      description: "Exceptional trading skills from unique perspective.",
      color: "bg-purple-500",
    },
    {
      icon: Target,
      title: "Options Trading Award",
      subtitle: "Individual",
      description:
        "Granted by Webull Securities. Excellence in options trading.",
      color: "bg-green-500",
    },
  ];

  return (
    <section id="prizes" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Prize for the Winner
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-4">
            With a $100 team fee, win prizes worth $15,000
          </p>
          <p className="text-sm text-gray-600">
            Prizes provided as products/services, not cash
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 hover:scale-105"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 ${award.color} rounded-full mb-6`}
              >
                <award.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {award.title}
              </h3>
              <div className="text-sm font-semibold text-[#8B0C19] mb-4">
                {award.subtitle}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {award.description}
              </p>
            </div>
          ))}
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
