"use client";

import { getAllUniversities, UNIVERSITY_COUNTRY_MAP, COUNTRY_FLAGS } from "@/lib/dashboard-utils";

interface TeamSelectorProps {
  selectedTeam: string;
  onSelectTeam: (team: string) => void;
}

export default function TeamSelector({ selectedTeam, onSelectTeam }: TeamSelectorProps) {
  const universities = getAllUniversities();

  return (
    <div className="w-60 bg-[#0a0a0a] border-r border-[#27272a] h-full overflow-y-auto">
      <div className="p-4 border-b border-[#27272a]">
        <h2 className="text-base font-semibold text-[#fafafa]">Teams</h2>
        <p className="text-xs text-[#52525b] mt-1">{universities.length} teams</p>
      </div>
      <div className="py-2">
        {universities.map((university) => {
          const country = UNIVERSITY_COUNTRY_MAP[university];
          const flag = COUNTRY_FLAGS[country] || "🌍";
          const isSelected = selectedTeam === university;

          return (
            <button
              key={university}
              onClick={() => onSelectTeam(university)}
              className={`w-full text-left px-4 py-2.5 transition-colors duration-200 ${
                isSelected
                  ? "bg-[rgba(34,197,94,0.05)] border-l-2 border-[#22c55e]"
                  : "hover:bg-[rgba(255,255,255,0.03)]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{flag}</span>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-medium truncate ${
                    isSelected ? "text-[#fafafa]" : "text-[#fafafa]"
                  }`}>
                    {university}
                  </div>
                  <div className="text-xs text-[#52525b] truncate">{country}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

