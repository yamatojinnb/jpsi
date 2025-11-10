"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const bioParagraphs = [
  "Born in Kanagawa Prefecture in 1974. After working at Shinkin Central Bank, Nissei Asset Management, and Nissei Schroders Asset Management (London), he founded Sky Capital Group in 2013.",
  "As a fund manager and trader, he has been involved in asset management for major institutional investors and investment trusts. Currently, he supports wealth building for individual investors, including high-net-worth individuals, and corporate executives.",
  "He collaborates extensively with domestic and international asset management firms, investment banks, hedge funds, and public institutions. His expertise lies in active management of global equities.",
];

export default function JudgesSection() {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [bioRef, bioInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [visibleParagraphs, setVisibleParagraphs] = useState<number[]>([]);
  const [showPublishedWork, setShowPublishedWork] = useState(false);

  useEffect(() => {
    if (!bioInView) return;

    const delays = [0, 400, 800];
    const timers = delays.map((delay, index) =>
      setTimeout(() => {
        setVisibleParagraphs((prev) => Array.from(new Set([...prev, index])));
      }, delay)
    );

    const publishedWorkTimer = setTimeout(() => {
      setShowPublishedWork(true);
    }, 1200);

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      clearTimeout(publishedWorkTimer);
    };
  }, [bioInView]);

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
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

        <div className="max-w-6xl mx-auto">
          <div className="bg-amber-50 rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden shadow-md bg-gray-200">
                  <img
                    src="/images/shimura.webp"
                    alt="Nobuhiko Shimura"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Nobuhiko Shimura
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Chief Strategist, Oxford Club Japan
                  </p>
                </div>
              </div>

              <div className="flex-1">
                <div className="prose prose-lg max-w-none" ref={bioRef}>
                  {bioParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className={`text-gray-700 leading-relaxed mb-4 transition-all duration-500 ${
                        visibleParagraphs.includes(index)
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}

                  <div
                    className={`mt-6 p-4 bg-white/70 rounded-lg border-l-4 border-crimson transition-all duration-500 ${
                      showPublishedWork
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      Published Work:
                    </p>
                    <p className="text-sm text-gray-700 italic mb-3">
                      "Investment Strategies of the World's Wealthy That
                      Individual Investors Can Also Use" (Diamond Inc.) -
                      Bestseller
                    </p>
                  </div>

                  <div
                    className={`mt-6 transition-all duration-500 ${
                      showPublishedWork
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <a
                      href="https://www.shimuranobuhiko.jp/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-crimson hover:text-crimson-dark font-semibold transition-colors group"
                    >
                      <span>More</span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
