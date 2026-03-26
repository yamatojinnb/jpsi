"use client";

interface ReportRanking {
  rank: number;
  university: string;
  country: string;
  score: number;
}

interface ReportAwardProps {
  reportRankings: ReportRanking[];
  lastUpdated: string;
}

export default function ReportAward({ reportRankings, lastUpdated }: ReportAwardProps) {
  if (!reportRankings || reportRankings.length === 0) return null;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    });

  const getBadgeStyle = (rank: number) => {
    if (rank === 1) return "bg-yellow-500";
    if (rank === 2) return "bg-gray-400";
    if (rank === 3) return "bg-amber-600";
    return "bg-gray-500";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">📄 Report Award</h2>
          <p className="text-sm text-gray-500">Top performing reports</p>
        </div>
        <span className="text-sm text-gray-400">as of {formatDate(lastUpdated)}</span>
      </div>
      <div className="p-6 space-y-4">
        {reportRankings.map((team) => (
          <div key={team.rank}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className={`${getBadgeStyle(team.rank)} w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {team.rank}
                </div>
                <span className="text-base">{team.country}</span>
                <span className="text-sm font-medium text-gray-800">
                  {team.university}
                </span>
              </div>
              <span className="text-sm font-semibold text-green-700 ml-4 flex-shrink-0">
                {team.score} / 100
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded h-1.5 overflow-hidden">
              <div
                className="bg-green-600 h-1.5 rounded"
                style={{ width: `${team.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
