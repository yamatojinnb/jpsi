import Image from "next/image";

export default function JudgesSection() {
  const judges = [
    {
      image: "/images/shimura.webp",
      nameEnglish: "Nobuhiko Shimura",
      title: "Research Fellow",
      company: "University of Oxford",
    },
    {
      image: "/images/yamanaka.jpg",
      nameEnglish: "Koji Yamanaka",
      title: "Market Analyst",
      company: "TradingView",
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Competition Judges
          </h2>
          <p className="text-lg text-gray-600">
            Expert evaluation of trading strategies and performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {judges.map((judge, index) => (
            <div key={index} className="text-center">
              {/* Profile Photo */}
              <div className="flex justify-center mb-4">
                <Image
                  src={judge.image}
                  alt={`${judge.nameEnglish} profile`}
                  width={160}
                  height={160}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
                />
              </div>

              {/* Judge Info */}
              <div className="space-y-1">
                {/* English Name */}
                <h3 className="text-xl font-bold text-gray-900">
                  {judge.nameEnglish}
                </h3>

                {/* Title */}
                <p className="text-sm text-gray-600">{judge.title}</p>

                {/* Company */}
                <p className="text-sm text-gray-600">{judge.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
