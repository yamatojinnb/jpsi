import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

export const metadata = {
  title: "About JPSI | WIC2025",
  description:
    "Learn about JPSI, Japan's leading student finance community with over 20 years of history.",
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-lg p-12">
          <div className="mb-8">
            <Clock className="w-16 h-16 text-[#8B0C19] mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Learn more about JPSI — Japan's leading student finance community
            </p>
          </div>

          <div className="bg-[#8B0C19]/5 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Japan Students Investment Union (JPSI)
            </h2>
            <p className="text-gray-700">
              Established by Waseda University's student finance community, JPSI
              has over 20 years of history as Japan's largest student finance
              organization.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center bg-[#8B0C19] hover:bg-[#9B1B2F] text-white px-8 py-4 rounded-lg font-semibold transition duration-200 hover:scale-105 transform"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
