"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const sponsorsData = [
  {
    title: "Technical Sponsor",
    borderColor: "border-crimson",
    content: (
      <div className="bg-gray-900 px-8 py-4 rounded-xl">
        <img
          src="/images/sponsors/interactive-brokers-logo.png"
          alt="Interactive Brokers"
          className="h-12 w-auto object-contain"
        />
      </div>
    ),
  },
  {
    title: "Analysis Tool Sponsor",
    borderColor: "border-blue-600",
    content: (
      <img
        src="/images/sponsors/tradingview-logo.png"
        alt="TradingView"
        className="h-12 w-auto object-contain"
      />
    ),
  },
  {
    title: "Judge Sponsor",
    borderColor: "border-purple-600",
    content: (
      <img
        src="/images/sponsors/webull-logo.png"
        alt="Webull"
        className="h-12 w-auto object-contain"
      />
    ),
  },
  {
    title: "Media Sponsor",
    borderColor: "border-green-600",
    content: (
      <img
        src="/images/sponsors/nihon-syoken.png"
        alt="Nihon Shoken Shimbun"
        className="h-16 w-auto object-contain"
      />
    ),
  },
  {
    title: "Special Sponsor",
    borderColor: "border-amber-600",
    content: (
      <img
        src="/images/sponsors/airsis.png"
        alt="ASYS Holdings (Airsis)"
        className="h-14 w-auto object-contain"
      />
    ),
  },
];

export default function SponsorsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [visibleSponsors, setVisibleSponsors] = useState<number[]>([]);

  useEffect(() => {
    if (!inView) return;

    const delays = [0, 250, 500, 750, 1000];
    const timers = delays.map((delay, index) =>
      setTimeout(() => {
        setVisibleSponsors((prev) => [...prev, index]);
      }, delay)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [inView]);

  return (
    <section ref={ref} id="sponsors" className="py-16 px-4 bg-amber-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-16 h-1 bg-[#8B0C19]"></div>
            <h2 className="text-4xl font-bold text-gray-900">Sponsors</h2>
            <div className="w-16 h-1 bg-[#8B0C19]"></div>
          </div>
          <p className="text-lg text-gray-600">
            Supporting the competition infrastructure
          </p>
        </div>

        <div className="space-y-6">
          {sponsorsData.map((sponsor, index) => (
            <div
              key={sponsor.title}
              className={`border-l-8 ${
                sponsor.borderColor
              } bg-white/80 rounded-r-2xl p-8 shadow-md hover:shadow-xl transition-all duration-500 ${
                visibleSponsors.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="flex items-center justify-between gap-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {sponsor.title}
                </h3>
                {sponsor.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
