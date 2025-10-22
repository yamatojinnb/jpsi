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
    <section
      id="sponsors"
      className="pt-8 pb-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden"
    >
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 via-transparent to-[#FFD700]/5"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gold Sponsors
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Supporting the competition infrastructure
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 max-w-5xl mx-auto">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="text-center">
              {/* Logo Display */}
              <div className="flex items-center justify-center h-32 mb-6">
                <Image
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  width={index === 0 ? 240 : 200}
                  height={index === 0 ? 100 : 80}
                  className={`${
                    index === 0 ? "max-h-24" : "max-h-20"
                  } w-auto object-contain`}
                />
              </div>

              {/* Company Name */}
              <div className="mt-4">
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-[#8B0C19] hover:underline transition-colors duration-300 cursor-pointer block"
                >
                  {sponsor.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
