import Image from "next/image";

export default function SponsorsSection() {
  const sponsors = [
    {
      name: "TradingView Inc.",
      logo: "/images/sponsors/tradingview-logo.png",
      description:
        "90+ million users worldwide. Providing premium charting tools.",
      website: "https://www.tradingview.com",
    },
    {
      name: "Interactive Brokers Securities",
      logo: "/images/sponsors/interactive-brokers-logo.png",
      description:
        "Providing demo trading accounts that mirror real-market conditions.",
      website: "https://www.interactivebrokers.com",
    },
    {
      name: "Webull Securities Co. Ltd.",
      logo: "/images/sponsors/webull-logo.png",
      description: "Supporting options trading excellence.",
      website: "https://www.webull.com",
    },
  ];

  return (
    <section id="sponsors" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Partners
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            WIC2025 is made possible by our generous sponsors who provide the
            tools and platforms for our participants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="text-center group">
              {/* Premium Logo Card */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-8 group-hover:shadow-2xl group-hover:shadow-gray-300/50 transition-all duration-500 group-hover:-translate-y-2 border border-gray-200/50">
                <div className="bg-white rounded-xl p-8 flex items-center justify-center h-40 shadow-sm group-hover:shadow-lg transition-all duration-500 border border-gray-100">
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={240}
                    height={100}
                    className="max-h-24 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Company Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#8B0C19] transition-colors duration-300">
                  {sponsor.name}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {sponsor.description}
                </p>
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#8B0C19] hover:bg-[#9B1B2F] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#8B0C19]/25"
                >
                  Visit Website
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
