"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

interface HistoryEntry {
  date: string;
  "1st": string;
  "2nd": string;
  "3rd": string;
  "4th"?: string;
  "5th"?: string;
  "1stPerf"?: number;
  "2ndPerf"?: number;
  "3rdPerf"?: number;
  "4thPerf"?: number;
  "5thPerf"?: number;
}

interface BarChartRaceProps {
  history: HistoryEntry[];
}

// Color mapping for participants
const COLORS: { [key: string]: string } = {
  "Yorck Linderhaus": "#8B0C19",
  "William Florio": "#2563eb",
  "Yutaro Nagamori": "#16a34a",
  "Elias Hannert": "#d97706",
  "Noah Holland": "#7c3aed",
  "Yash Kumar": "#dc2626",
  "Yigit Kaan Ertürk": "#0891b2",
  "Catherine Yanran Xu": "#ec4899",
  "Brandon Choi": "#14b8a6",
  "Xianmingsheng Diao": "#f97316",
  "Victor Popescu": "#8b5cf6",
  "Charlotte Voon": "#06b6d4",
  "Hana Shigeta": "#f43f5e",
  "Aditya Jain": "#84cc16",
  "Divyansh Kashyap": "#a855f7",
  "Ohji Fukuda": "#10b981",
};

const getColor = (name: string) => COLORS[name] || "#6b7280";

export default function BarChartRace({ history }: BarChartRaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Filter history to only include entries with performance data
  const validHistory = history.filter(
    (entry) => entry["1stPerf"] !== undefined
  );

  // Set initial position to last frame (latest date)
  useEffect(() => {
    if (!initialized && validHistory.length > 0) {
      setCurrentIndex(validHistory.length - 1);
      setInitialized(true);
    }
  }, [validHistory.length, initialized]);

  useEffect(() => {
    if (isPlaying && currentIndex < validHistory.length - 1) {
      intervalRef.current = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 800); // 800ms between each frame
    } else if (currentIndex >= validHistory.length - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isPlaying, currentIndex, validHistory.length]);

  const handlePlayPause = () => {
    if (currentIndex >= validHistory.length - 1) {
      setCurrentIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPlaying(false);
    setCurrentIndex(Number(e.target.value));
  };

  if (!validHistory || validHistory.length === 0) return null;

  const currentData = validHistory[currentIndex];
  const maxPerf = currentData["1stPerf"] || 100; // 1st place is always max
  const scaleMax = maxPerf + 1; // 1st place value + 1%
  const scaleMin = 100;

  // Build ranking data for current frame
  const rankings = [
    { name: currentData["1st"], perf: currentData["1stPerf"] || 100, rank: 1 },
    { name: currentData["2nd"], perf: currentData["2ndPerf"] || 100, rank: 2 },
    { name: currentData["3rd"], perf: currentData["3rdPerf"] || 100, rank: 3 },
    { name: currentData["4th"], perf: currentData["4thPerf"] || 100, rank: 4 },
    { name: currentData["5th"], perf: currentData["5thPerf"] || 100, rank: 5 },
  ].filter(item => item.name); // Filter out entries without a name

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">🏁 Performance Race</h2>
        <p className="text-sm text-gray-500">Watch the top 5 battle over time</p>
      </div>
      
      <div className="p-6">
        {/* Bar Chart */}
        <div className="space-y-4 mb-6">
          {rankings.map((item, index) => (
            <div key={item.name} className="flex items-center gap-4">
              {/* Rank Badge */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  index === 0
                    ? "bg-yellow-500"
                    : index === 1
                    ? "bg-gray-400"
                    : index === 2
                    ? "bg-amber-600"
                    : "bg-gray-500"
                }`}
              >
                {index + 1}
              </div>
              
              {/* Name with colored dot */}
              <div className="w-40 text-sm font-medium text-gray-900 truncate flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: getColor(item.name || "") }}
                ></span>
                {item.name}
              </div>
              
              {/* Bar */}
              <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-3"
                  style={{
                    width: `${((item.perf - scaleMin) / (scaleMax - scaleMin)) * 100}%`,
                    backgroundColor: getColor(item.name || ""),
                    minWidth: "40px",
                  }}
                >
                  <span className="text-white text-sm font-bold">
                    +{(item.perf - 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scale Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>100%</span>
            <span>{scaleMax.toFixed(1)}%</span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full relative">
            <div 
              className="absolute left-0 top-0 h-full bg-gray-300 rounded-full"
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>

        {/* Date Display */}
        <div className="text-right mb-4">
          <span className="text-2xl font-bold text-gray-300">
            {formatDate(currentData.date)}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="p-3 bg-[#8B0C19] text-white rounded-full hover:bg-[#6d0a14] transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="p-3 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Timeline Slider */}
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max={validHistory.length - 1}
              value={currentIndex}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B0C19]"
            />
          </div>

          {/* Frame Counter */}
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {validHistory.length}
          </span>
        </div>
      </div>
    </div>
  );
}

