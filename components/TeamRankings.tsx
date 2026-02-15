"use client";

interface TeamRanking {
  rank: number;
  university: string;
  country: string;
  return: number;
}

interface TeamRankingsProps {
  teamRankings: TeamRanking[];
  lastUpdated: string;
}

export default function TeamRankings({ teamRankings, lastUpdated }: TeamRankingsProps) {
  if (!teamRankings || teamRankings.length === 0) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getMedalStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bg: "bg-gradient-to-r from-yellow-50 to-yellow-100",
          border: "border-yellow-300",
          badge: "bg-yellow-500",
          text: "text-yellow-800",
        };
      case 2:
        return {
          bg: "bg-gradient-to-r from-gray-50 to-gray-100",
          border: "border-gray-300",
          badge: "bg-gray-400",
          text: "text-gray-700",
        };
      case 3:
        return {
          bg: "bg-gradient-to-r from-amber-50 to-orange-50",
          border: "border-amber-300",
          badge: "bg-amber-600",
          text: "text-amber-800",
        };
      default:
        return {
          bg: "bg-white",
          border: "border-gray-200",
          badge: "bg-gray-500",
          text: "text-gray-700",
        };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">🏫 Team Standings</h2>
          <p className="text-sm text-gray-500">Top performing universities</p>
        </div>
        <span className="text-sm text-gray-400">
          as of {formatDate(lastUpdated)}
        </span>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teamRankings.map((team) => {
            const style = getMedalStyle(team.rank);
            return (
              <div
                key={team.rank}
                className={`${style.bg} ${style.border} border rounded-xl p-5 flex flex-col items-center text-center transition-transform hover:scale-[1.02]`}
              >
                {/* Rank Badge */}
                <div
                  className={`${style.badge} w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold mb-3`}
                >
                  {team.rank}
                </div>
                {/* Country Flag */}
                <span className="text-3xl mb-2">{team.country}</span>
                {/* University Name */}
                <h3 className={`font-semibold ${style.text} text-sm mb-2 leading-tight min-h-[2.5rem] flex items-center`}>
                  {team.university}
                </h3>
                {/* Return */}
                <div className="mt-auto">
                  <span
                    className={`text-2xl font-bold ${
                      team.return >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {team.return >= 0 ? "+" : ""}
                    {team.return.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

