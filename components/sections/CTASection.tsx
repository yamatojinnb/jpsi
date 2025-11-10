"use client";

import { useState, useEffect } from "react";

export default function CTASection() {
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

  useEffect(() => {
    const calculateDaysRemaining = () => {
      const now = new Date();
      // Set deadline to 21 days from now
      const deadline = new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000);
      const diffTime = deadline.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays > 0 ? diffDays : 0;
    };

    // Calculate immediately
    setDaysRemaining(calculateDaysRemaining());

    // Update daily at midnight
    const updateAtMidnight = () => {
      const now = new Date();
      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
      const msUntilMidnight = tomorrow.getTime() - now.getTime();

      setTimeout(() => {
        setDaysRemaining(calculateDaysRemaining());
        // Set up daily updates
        setInterval(() => {
          setDaysRemaining(calculateDaysRemaining());
        }, 24 * 60 * 60 * 1000);
      }, msUntilMidnight);
    };

    updateAtMidnight();
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
        <div className="flex items-center justify-center gap-2 text-white/90 text-sm mt-6">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Registration closes in: </span>
          <span className="font-bold text-white bg-white/20 px-2 py-1 rounded">
            {daysRemaining !== null ? `${daysRemaining} days` : "Loading..."}
          </span>
        </div>
      </div>
    </section>
  );
}
