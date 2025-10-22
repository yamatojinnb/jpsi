import Image from "next/image";
import { TrendingUp, Globe, Users, Award } from "lucide-react";

export default function ResultsSection() {
  return (
    <section id="results" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Last Year's Achievement
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            WIC2024 was our first international investment competition, bringing
            together students from 9 countries and 12 universities worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Champion Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Award className="w-8 h-8 text-yellow-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">
                  WIC2024 Champion
                </h3>
              </div>
              <h4 className="text-3xl font-bold text-[#8B0C19] mb-4">
                TU München (Germany)
              </h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <TrendingUp className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-2xl font-bold text-green-600">
                    +28.4% return
                  </span>
                </div>
                <div className="text-lg text-gray-700">
                  Portfolio: $300,000 → $384,000
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
              <blockquote className="text-lg italic text-gray-700 mb-4">
                "The world investment competition was a fantastic experience!
                The professionalism stood out to us from beginning to end. We
                are very happy to have won and want to thank Waseda University
                for organizing such a successful competition."
              </blockquote>
              <cite className="text-sm font-semibold text-gray-600">
                — TU Investment Club, TU München
              </cite>
            </div>
          </div>

          {/* Statistics and Image */}
          <div className="space-y-8">
            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                <Globe className="w-8 h-8 text-[#8B0C19] mx-auto mb-3" />
                <div className="text-3xl font-bold text-[#8B0C19] mb-2">9</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-green-600 mb-2">12</div>
                <div className="text-sm text-gray-600">Universities</div>
              </div>
            </div>

            {/* Participating Universities */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Participating Universities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                <div>• Yale University</div>
                <div>• TU München</div>
                <div>• RWTH Aachen</div>
                <div>• IIT Roorkee</div>
                <div>• SMU Singapore</div>
                <div>• Waseda University</div>
              </div>
            </div>

            {/* Champion Photo Placeholder */}
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Award className="w-16 h-16 mx-auto mb-4" />
                <p>WIC2024 Champion Team Photo</p>
                <p className="text-sm">(Image placeholder)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
