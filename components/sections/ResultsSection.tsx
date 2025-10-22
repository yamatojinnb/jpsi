"use client";

import Image from "next/image";
import {
  TrendingUp,
  Globe,
  Users,
  Award,
  MapPin,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

export default function ResultsSection() {
  const [isQuoteExpanded, setIsQuoteExpanded] = useState(false);

  // Intersection observers for animations
  const [photoRef, photoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [quoteRef, quoteInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="results" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* WIC2024 Results Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              WIC2024 Results
            </h2>
          </div>

          {/* TOP SECTION: Photo Hero (40%) + Content (60%) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
            {/* LEFT COLUMN: Photo Hero (40% - 2/5 columns) */}
            <div className="lg:col-span-2" ref={photoRef}>
              <div
                className={`relative group h-[80vh] transition-all duration-600 ${
                  photoInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-[#8B0C19] to-[#FFD700] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative bg-white rounded-2xl p-4 shadow-2xl h-full">
                  <Image
                    src="/images/wic2024winner.jpg"
                    alt="WIC2024 Champion Team - TU München"
                    width={400}
                    height={600}
                    className="w-full h-full rounded-xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Information Stack (60% - 3/5 columns) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Team Name & Location */}
              <div className="space-y-3">
                <div className="space-y-2">
                  <a
                    href="https://www.tum.de/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl md:text-4xl font-bold text-[#8B0C19] leading-tight hover:underline transition-all duration-300"
                  >
                    Technical University of Munich (TU München)
                  </a>
                  <a
                    href="https://www.tuinvest.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#8B0C19] text-[#8B0C19] px-4 py-2 rounded-md hover:bg-[#8B0C19] hover:text-white transition-all duration-300 font-medium text-sm"
                  >
                    Visit TU Investment Club
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">Munich, Germany</span>
                  <Image
                    src="/images/flags/germany.png"
                    alt="Germany"
                    width={32}
                    height={20}
                    className="inline-block w-8 h-5"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentNode;
                      if (parent) {
                        const fallback = document.createElement("span");
                        fallback.textContent = " (DE)";
                        fallback.className = "text-lg text-gray-600";
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Performance Stats - MASSIVE */}
              <div
                className="bg-gray-50 rounded-xl p-8 space-y-6"
                ref={statsRef}
              >
                <div
                  className={`text-center space-y-4 transition-all duration-800 delay-200 ${
                    statsInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  <div className="text-7xl md:text-8xl font-bold text-emerald-700 leading-none">
                    {statsInView && (
                      <CountUp
                        start={0}
                        end={28.4}
                        duration={2}
                        decimals={1}
                        suffix="%"
                        prefix="+"
                      />
                    )}
                  </div>
                  <div className="text-lg text-[#8B0C19] font-mono tracking-wide font-medium">
                    Portfolio: $300,000 → $384,000
                    <div className="text-sm text-emerald-600 font-semibold mt-1">
                      +$84,000 profit
                    </div>
                  </div>
                </div>
              </div>

              {/* Collapsible Testimonial Quote */}
              <div
                className={`bg-white rounded-xl p-6 shadow-xl border-l-4 border-[#FFD700] transition-all duration-600 delay-400 ${
                  quoteInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                ref={quoteRef}
              >
                <blockquote className="text-base italic text-gray-700 mb-4 leading-relaxed space-y-4">
                  <p>
                    "The most important point for us was coming up with a
                    strategy that was fitting the two-month time horizon of the
                    competition. We decided to combine elements of traditional
                    investment wisdom and high-conviction tactical trades.
                    Drawing inspiration from legendary asset allocators like
                    George Soros, we concentrated on select opportunities with a
                    high probability of significant returns."
                  </p>

                  {isQuoteExpanded && (
                    <>
                      <p>
                        "We considered companies with strong historical
                        correlations between earnings revisions and significant
                        stock price moves, prioritizing those operating in
                        industries undergoing rapid change or facing pivotal
                        moments, such as AI-driven innovation or shifts in
                        consumer behavior."
                      </p>
                      <p>
                        "The World Investment Competition was a fantastic
                        experience! One thing that stood out to us was the
                        professionalism with which the competition was
                        approached. From beginning to end, we noticed how much
                        the host team cared about the competition. We are very
                        happy to have won the competition and to share our
                        achievement with our members at TU Investment Club, and
                        we want to thank Waseda University for organizing such a
                        successful competition."
                      </p>
                    </>
                  )}
                </blockquote>

                <cite className="text-sm font-semibold text-[#8B0C19] mb-3 block">
                  — TU Investment Club, TU München
                </cite>

                {/* Read More/Less Button */}
                <button
                  onClick={() => setIsQuoteExpanded(!isQuoteExpanded)}
                  className="text-sm text-[#8B0C19] hover:underline font-medium transition-colors duration-300 block"
                >
                  {isQuoteExpanded ? "Show Less ▲" : "Read Full Interview →"}
                </button>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: Full Width (2 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT COLUMN: Competition Overview */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Competition Overview
              </h4>

              {/* Stats in one line */}
              <div className="flex items-center justify-center gap-6 mb-6 py-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#8B0C19]">9</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#8B0C19]">12</div>
                  <div className="text-sm text-gray-600">Universities</div>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#8B0C19]">50+</div>
                  <div className="text-sm text-gray-600">Participants</div>
                </div>
              </div>

              {/* Participating Universities - Compact */}
              <div>
                <h5 className="text-sm font-semibold text-gray-700 mb-3">
                  Participating Universities
                </h5>
                <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                  <div>• Yale University</div>
                  <div>• TU München</div>
                  <div>• RWTH Aachen</div>
                  <div>• IIT Roorkee</div>
                  <div>• SMU Singapore</div>
                  <div>• Waseda University</div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Performance Chart */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <h4 className="text-lg font-semibold text-gray-900">
                  Performance Chart
                </h4>
              </div>
              <div className="h-48 bg-green-50 rounded border-2 border-dashed border-green-300 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <p className="text-sm text-green-600 font-medium">
                    Chart Coming Soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
