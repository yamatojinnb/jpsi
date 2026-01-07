import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Lock, Mail, ArrowLeft } from "lucide-react";

export default function WhatsAppPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            {/* Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              {/* Icon */}
              <div className="w-16 h-16 bg-[#8B0C19]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-[#8B0C19]" />
              </div>

              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Participants Only
              </h1>

              {/* Message */}
              <p className="text-gray-600 mb-6">
                The WhatsApp group is only available to WIC2025 participants.
                Please contact the organizers to request access.
              </p>

              {/* Contact Email */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500 mb-2">Contact us at:</p>
                <a
                  href="mailto:jpsi.waseda.univ@outlook.com"
                  className="inline-flex items-center gap-2 text-[#8B0C19] font-medium hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  jpsi.waseda.univ@outlook.com
                </a>
              </div>

              {/* Back Link */}
              <Link
                href="/live"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Live Rankings
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
