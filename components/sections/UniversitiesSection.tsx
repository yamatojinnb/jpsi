"use client";

// Reordered to avoid consecutive same countries
const universities = [
  {
    name: "Waseda University",
    club: "Forward Investment Club",
    country: "Japan",
    code: "JP",
  },
  {
    name: "University of Alberta",
    club: "The Business Finance Association",
    country: "Canada",
    code: "CA",
  },
  {
    name: "Technical University of Munich",
    club: "TU Investment Club e.V.",
    country: "Germany",
    code: "DE",
  },
  {
    name: "Indian Institute of Technology Roorkee",
    club: "Finance Club IITR",
    country: "India",
    code: "IN",
  },
  {
    name: "University of New South Wales",
    club: "Alternative Investment Society",
    country: "Australia",
    code: "AU",
  },
  {
    name: "University of Sheffield",
    club: "Investment Society",
    country: "United Kingdom",
    code: "GB",
  },
  {
    name: "Roger Williams University",
    club: "MBA Program",
    country: "United States",
    code: "US",
  },
  {
    name: "Universiti Kebangsaan Malaysia",
    club: "Bursa Young Investor Club",
    country: "Malaysia",
    code: "MY",
  },
  {
    name: "RWTH Aachen University",
    club: "Aachen Investment Club",
    country: "Germany",
    code: "DE",
  },
  {
    name: "University of Toronto",
    club: "Rational Capital Investment Club",
    country: "Canada",
    code: "CA",
  },
  {
    name: "University of Delhi",
    club: "Alpha Research & Investment Cell",
    country: "India",
    code: "IN",
  },
];

export default function UniversitiesSection() {
  return (
    <section id="universities" className="pb-20 bg-white overflow-hidden">
      {/* Improved subtitle */}
      <div className="text-center mb-8">
        <p className="text-gray-600 text-base">
          Competing teams from{" "}
          <span className="font-semibold text-[#8B0C19]">
            leading universities
          </span>{" "}
          across the globe
        </p>
      </div>

      {/* Marquee */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="overflow-hidden py-4">
        <div className="animate-marquee flex" style={{ width: "max-content" }}>
          {[...universities, ...universities].map((uni, index) => (
            <div
              key={`marquee-${index}`}
              className="flex-shrink-0 mx-3 px-6 py-5 bg-gray-50 rounded-xl hover:bg-[#8B0C19] transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                {/* Flag using flagcdn.com */}
                <img
                  src={`https://flagcdn.com/w40/${uni.code.toLowerCase()}.png`}
                  alt={uni.country}
                  className="w-8 h-6 object-cover rounded shadow-sm"
                />
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-white transition-colors">
                    {uni.name}
                  </div>
                  <div className="text-sm text-gray-500 group-hover:text-white/80 transition-colors mt-1">
                    {uni.club}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
