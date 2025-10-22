import { Users, Network, Trophy } from "lucide-react";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="py-16 bg-gradient-to-r from-[#8B0C19] to-[#FFD700]"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the Investment Olympics
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Compete with students from around the world
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <div className="flex items-center">
              <Users className="w-6 h-6 mr-3" />
              <span className="text-lg">3 Students per Team</span>
            </div>
            <div className="flex items-center">
              <Network className="w-6 h-6 mr-3" />
              <span className="text-lg">Investment Community</span>
            </div>
            <div className="flex items-center">
              <Trophy className="w-6 h-6 mr-3" />
              <span className="text-lg">$15,000 in Prizes</span>
            </div>
          </div>

          <a
            href="https://forms.cloud.microsoft/r/avh5Ht6gee"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-gray-900 border-2 border-black px-12 py-4 rounded-lg text-xl font-bold hover:bg-[#8B0C19] hover:text-white hover:scale-102 hover:shadow-xl transition-all duration-300 transform shadow-lg"
          >
            Register Your Team Now
          </a>

          <div className="mt-8 text-sm opacity-75">
            Registration deadline: December 15, 2025
          </div>
        </div>
      </div>
    </section>
  );
}
