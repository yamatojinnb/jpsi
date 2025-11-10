"use client";

import { useInView } from "react-intersection-observer";

export default function RegistrationSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="registration"
      className="py-16 bg-gradient-to-br from-gray-50 to-white"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <div
          className={`text-center max-w-4xl mx-auto transition-all duration-800 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-16 h-1 bg-[#8B0C19]"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Ready to Compete?
            </h2>
            <div className="w-16 h-1 bg-[#8B0C19]"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary Button - Register Now */}
            <a
              href="https://forms.cloud.microsoft/pages/responsepage.aspx?id=QOW1RZ6yGECByqwq6A1h2yTcxl4gZSdChYSPaRdO7QJUREdJUEtEODhUOVZRTUQ3QjlIU0dON0NUWC4u&route=shorturl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#8B0C19] hover:bg-[#9B1B2F] text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#8B0C19]/25 min-w-[200px]"
            >
              Register Now
              <svg
                className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
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

            {/* Secondary Button - View Rules */}
            <a
              href="#rules"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#8B0C19] text-[#8B0C19] hover:bg-[#8B0C19] hover:text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105 min-w-[200px]"
            >
              View Competition Rules
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
