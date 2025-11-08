import Image from "next/image";

export default function JudgesSection() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Competition Judge
          </h2>
          <p className="text-lg text-gray-600">
            Expert evaluation of trading strategies and performance
          </p>
        </div>

        <div className="flex justify-center">
          <div className="text-center">
            {/* Profile Photo */}
            <div className="flex justify-center mb-4">
              <Image
                src="/images/shimura.webp"
                alt="Nobuhiko Shimura profile"
                width={160}
                height={160}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
              />
            </div>

            {/* Judge Info */}
            <div className="space-y-1">
              {/* English Name */}
              <h3 className="text-xl font-bold text-gray-900">
                Nobuhiko Shimura
              </h3>

              {/* Title */}
              <p className="text-sm text-gray-600">Research Fellow</p>

              {/* Company */}
              <p className="text-sm text-gray-600">University of Oxford</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
