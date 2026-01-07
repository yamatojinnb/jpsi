"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function LiveFloatingButton() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Check if user has seen the tooltip before
    const hasSeenTooltip = localStorage.getItem("liveTooltipSeen");

    if (!hasSeenTooltip) {
      // Show tooltip after 2 seconds
      const showTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 2000);

      // Auto-hide after 8 seconds (total 10s)
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
        localStorage.setItem("liveTooltipSeen", "true");
      }, 10000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  const dismissTooltip = () => {
    setShowTooltip(false);
    localStorage.setItem("liveTooltipSeen", "true");
  };

  // Don't show on /live page itself
  if (pathname === "/live") return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip - Dark Background + Gold Text */}
      {showTooltip && (
        <div
          className="absolute bottom-full right-0 mb-4 animate-tooltip-bounce"
          onClick={dismissTooltip}
        >
          <div
            className="relative bg-gray-900 px-4 py-2.5 rounded-lg shadow-2xl whitespace-nowrap border border-gray-700"
            style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)" }}
          >
            {/* Content */}
            <div className="flex items-center gap-2 pr-6">
              <p className="font-semibold text-sm" style={{ color: "#C9A227" }}>
                View Live Rankings
              </p>
              <span style={{ color: "#C9A227" }}>→</span>
            </div>

            {/* Arrow pointing down - dark */}
            <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-900"></div>

            {/* Close button */}
            <button
              className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gray-700 text-gray-400 rounded-full text-xs flex items-center justify-center hover:bg-gray-600 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                dismissTooltip();
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <Link
        href="/live"
        className="flex items-center gap-2 px-5 py-3.5 bg-[#8B0C19] text-white rounded-full shadow-lg hover:bg-[#6d0a14] transition-all hover:scale-105 hover:shadow-xl"
        onClick={dismissTooltip}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <span className="font-semibold text-sm">Live Rankings</span>
      </Link>
    </div>
  );
}
