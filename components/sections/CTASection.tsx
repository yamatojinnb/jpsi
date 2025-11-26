"use client";

import { useState, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";

export default function CTASection() {
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

  useEffect(() => {
    const calculateDays = () => {
      const deadline = new Date("2025-12-07T23:59:59");
      const now = new Date();
      const diffTime = deadline.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    };

    // Calculate immediately
    setDaysRemaining(calculateDays());

    // Update every hour (in case user keeps page open overnight)
    const interval = setInterval(() => {
      setDaysRemaining(calculateDays());
    }, 1000 * 60 * 60); // Every hour

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="cta"
      className="relative py-12 md:py-16 px-4"
      style={{
        background:
          "radial-gradient(circle at center, #8B0C19 0%, #6B0A15 100%)",
      }}
    >
      <div className="container mx-auto text-center max-w-4xl">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-1 bg-white"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Join the Investment Olympics
          </h2>
          <div className="w-16 h-1 bg-white"></div>
        </div>

        <div className="flex justify-center">
          <div className="relative inline-block">
            {/* Animated pulse rings */}
            <div className="absolute inset-0 animate-ping opacity-20 bg-white rounded-lg"></div>
            <div className="absolute inset-0 animate-pulse opacity-30 bg-white rounded-lg"></div>

            {/* Main button with enhanced effects */}
            <a
              href="https://forms.cloud.microsoft/r/avh5Ht6gee"
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-white text-[#8B0C19] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 flex items-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Register Your Team Now
              {/* Animated arrow */}
              <svg
                className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
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

        {/* Dynamic countdown with icon */}
        {daysRemaining !== null && daysRemaining > 0 ? (
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm mt-6">
            <Clock className="w-4 h-4" />
            <span>Registration closes in:</span>
            <span className="bg-black/30 px-2 py-1 rounded font-semibold">
              {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
            </span>
          </div>
        ) : daysRemaining === 0 ? (
          <div className="flex items-center justify-center gap-2 text-yellow-300 text-sm mt-6">
            <AlertTriangle className="w-4 h-4" />
            <span>Registration closes TODAY!</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm mt-6">
            <Clock className="w-4 h-4" />
            <span>Loading...</span>
          </div>
        )}
      </div>
    </section>
  );
}
