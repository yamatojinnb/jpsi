interface HallOfFameProps {
  hallOfFame: {
    mostDaysAt1: { name: string; days: number; country: string }[];
    top3Appearances: { name: string; count: number; country: string }[];
  };
}

export default function HallOfFame({ hallOfFame }: HallOfFameProps) {
  if (!hallOfFame) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">🏆 Hall of Fame</h2>
        <p className="text-sm text-gray-500">Notable achievements in the competition</p>
      </div>
      <div className="p-6 grid md:grid-cols-2 gap-6">
        {/* Most Days at #1 */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>👑</span> Most Days at #1
          </h3>
          <div className="space-y-2">
            {hallOfFame.mostDaysAt1.map((item, index) => (
              <div
                key={item.name}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  index === 0 ? "bg-yellow-50 border border-yellow-200" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-400">
                    {index + 1}.
                  </span>
                  <span className="font-medium text-gray-900">{item.name}</span>
                  <span>{item.country}</span>
                </div>
                <span className="text-sm font-semibold text-gray-600">
                  {item.days} days
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 3 Appearances */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>🏅</span> Top 3 Appearances
          </h3>
          <div className="space-y-2">
            {hallOfFame.top3Appearances.slice(0, 5).map((item, index) => (
              <div
                key={item.name}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  index === 0 ? "bg-yellow-50 border border-yellow-200" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-400">
                    {index + 1}.
                  </span>
                  <span className="font-medium text-gray-900">{item.name}</span>
                  <span>{item.country}</span>
                </div>
                <span className="text-sm font-semibold text-gray-600">
                  {item.count} times
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

