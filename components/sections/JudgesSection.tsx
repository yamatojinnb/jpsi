"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const judgesData = [
  {
    name: "Nobuhiko Shimura",
    image: "/images/shimura.webp",
    imageShape: "square",
    titles: [
      "CEO, Skye Investment Managers Co Ltd.",
      "Visiting Fellow, Stanford University",
    ],
    bio: [
      "Born in Kanagawa Prefecture in 1974. After working at Shinkin Central Bank, Nissei Asset Management, and Nissei Schroders Asset Management (London), he founded Sky Capital Group in 2013.",
      "As a fund manager and trader, he has been involved in asset management for major institutional investors and investment trusts. Currently, he supports wealth building for individual investors, including high-net-worth individuals, and corporate executives.",
      "He collaborates extensively with domestic and international asset management firms, investment banks, hedge funds, and public institutions. His expertise lies in active management of global equities.",
    ],
    publishedWork: {
      title:
        "Investment Strategies of the World's Wealthy That Individual Investors Can Also Use",
      publisher: "Diamond Inc.",
      note: "Bestseller",
    },
    website: "https://www.shimuranobuhiko.jp/",
  },
  {
    name: "Yasuji Yamanaka",
    image: "/images/yamanaka.png",
    imageShape: "circle",
    titles: ["Director, Ascendant Inc."],
    bio: [
      "Graduated from Keio University in 1982 and joined Bank of America. He engaged in proprietary trading operations and was promoted to Vice President in 1989.",
      "In 1997, he moved to Nikko Securities, and in 1999 became Deputy General Manager of the Foreign Exchange Division at NikkoCiti Trust & Banking.",
      "In 2002, he founded Ascendant Inc., a financial consulting firm, where he serves as Director. Since 2019, he has been the Head of Japan Market at TradingView.",
    ],
    publishedWork: {
      title: "How to Read and Use Technical Indicators",
      publisher: "Nihon Jitsugyo Publishing (2015)",
      note: "and other publications",
    },
    website: "https://www.gaitame.com/media/entry/2025/06/27/174818",
  },
];

function JudgeCard({
  judge,
  index,
}: {
  judge: (typeof judgesData)[0];
  index: number;
}) {
  const [bioRef, bioInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [visibleParagraphs, setVisibleParagraphs] = useState<number[]>([]);
  const [showExtra, setShowExtra] = useState(false);

  useEffect(() => {
    if (!bioInView) return;

    const delays = [0, 400, 800];
    const timers = delays.map((delay, idx) =>
      setTimeout(() => {
        setVisibleParagraphs((prev) => Array.from(new Set([...prev, idx])));
      }, delay)
    );

    const extraTimer = setTimeout(() => {
      setShowExtra(true);
    }, 1200);

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      clearTimeout(extraTimer);
    };
  }, [bioInView]);

  return (
    <div className="bg-amber-50 rounded-2xl shadow-lg p-6 md:p-8">
      {/* Photo and Name */}
      <div className="flex flex-col items-center mb-6">
        <div
          className={`w-40 h-40 overflow-hidden shadow-md mb-4 ${
            judge.imageShape === "circle"
              ? "rounded-full bg-transparent"
              : "rounded-xl bg-gray-200"
          }`}
        >
          <img
            src={judge.image}
            alt={judge.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold text-gray-900 text-center">
          {judge.name}
        </h3>
        <div className="text-sm text-gray-600 mt-1 text-center space-y-1">
          {judge.titles.map((title, i) => (
            <p key={i}>{title}</p>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div className="prose prose-sm max-w-none" ref={bioRef}>
        {judge.bio.map((paragraph, idx) => (
          <p
            key={idx}
            className={`text-gray-700 leading-relaxed mb-3 text-sm transition-all duration-500 ${
              visibleParagraphs.includes(idx)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {paragraph}
          </p>
        ))}

        {/* Published Work (if exists) */}
        {judge.publishedWork && (
          <div
            className={`mt-4 p-3 bg-white/70 rounded-lg border-l-4 border-crimson transition-all duration-500 ${
              showExtra
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-xs font-semibold text-gray-800 mb-1">
              Published Work:
            </p>
            <p className="text-xs text-gray-700 italic">
              "{judge.publishedWork.title}" ({judge.publishedWork.publisher}) -{" "}
              {judge.publishedWork.note}
            </p>
          </div>
        )}

        {/* Website Link */}
        <div
          className={`mt-4 transition-all duration-500 ${
            showExtra ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href={judge.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-crimson hover:text-crimson-dark font-semibold text-sm transition-colors group"
          >
            <span>More</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function JudgesSection() {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-16 h-1 bg-[#8B0C19]"></div>
            <h2 className="text-4xl font-bold text-gray-900">Judges</h2>
            <div className="w-16 h-1 bg-[#8B0C19]"></div>
          </div>
          <p className="text-lg text-gray-600">
            Expert panel evaluating competition performance
          </p>
        </div>

        {/* Judges Grid - 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {judgesData.map((judge, index) => (
            <JudgeCard key={judge.name} judge={judge} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
