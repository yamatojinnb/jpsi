import { DollarSign, Calendar, Trophy, Users } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  const highlightCards = [
    {
      icon: Calendar,
      number: "3",
      title: "Team Members",
      description: "Collaborate with teammates in this worldwide competition",
    },
    {
      icon: DollarSign,
      number: "$100,000",
      title: "Virtual Portfolio",
      description:
        "Each participant manages $100K in U.S. equities, ETFs, and options",
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
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Compete with professional-grade tools:{" "}
            <a
              href="https://www.interactivebrokers.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#8B0C19] hover:underline"
            >
              Interactive Brokers
            </a>
            ' real-time market data and{" "}
            <a
              href="https://www.tradingview.com/chart/"
              target="_blank"
              rel="dofollow noopener noreferrer"
              className="font-semibold text-[#8B0C19] hover:underline"
            >
              TradingView
            </a>
            's premium charts—exclusively for all participants.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {highlightCards.map((card, index) => {
            const images = [
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=160&fit=crop",
              "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=160&fit=crop",
              "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=400&h=160&fit=crop",
            ];

            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={images[index]}
                    alt={card.title}
                    width={400}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="p-6 text-center">
                  <div className="text-4xl font-bold text-[#8B0C19] mb-2">
                    {card.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
