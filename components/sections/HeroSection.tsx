"use client";

export default function HeroSection() {
  return (
    <>
      <style jsx global>{`
        @keyframes dropBounceWord {
          0% {
            transform: translateY(-80vh);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          60% {
            transform: translateY(0);
            opacity: 1;
          }
          75% {
            transform: translateY(-25px);
            opacity: 1;
          }
          88% {
            transform: translateY(0);
            opacity: 1;
          }
          94% {
            transform: translateY(-10px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-drop-word-1 {
          opacity: 0;
          animation: dropBounceWord 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
          animation-delay: 0.1s;
        }
        .animate-drop-word-2 {
          opacity: 0;
          animation: dropBounceWord 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
          animation-delay: 0.4s;
        }
        .animate-drop-word-3 {
          opacity: 0;
          animation: dropBounceWord 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
          animation-delay: 0.7s;
        }
        .animate-drop-word-4 {
          opacity: 0;
          animation: dropBounceWord 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
          animation-delay: 1s;
        }
      `}</style>

      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center hero-background pt-16 overflow-hidden"
      >
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 z-5"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <h1
            className="text-6xl md:text-8xl font-bold mb-8 hero-text-shadow"
            style={{ textShadow: "3px 3px 10px rgba(0,0,0,0.9)" }}
          >
            <span className="inline-block animate-drop-word-1">World</span>{" "}
            <span className="inline-block animate-drop-word-2">Investment</span>{" "}
            <span className="inline-block animate-drop-word-3">
              Competition
            </span>{" "}
            <span className="inline-block animate-drop-word-4">2025</span>
          </h1>
          <h2
            className="text-3xl md:text-4xl font-bold mb-10 text-yellow-400 hero-text-shadow opacity-0 animate-fade-in"
            style={{
              textShadow: "3px 3px 10px rgba(0,0,0,0.9)",
              animationDelay: "1.8s",
              animationFillMode: "forwards",
            }}
          >
            The Investment Olympics
          </h2>
          <p
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-bold hero-text-shadow opacity-0 animate-fade-in"
            style={{
              textShadow: "3px 3px 10px rgba(0,0,0,0.9)",
              animationDelay: "2.1s",
              animationFillMode: "forwards",
            }}
          >
            Compete with top student investors worldwide in a global investment
            challenge. Manage a $100,000 virtual portfolio over three months for
            a chance to win $15,000 in prizes.
          </p>

          <div
            className="mt-16 opacity-0 animate-fade-in"
            style={{
              animationDelay: "2.4s",
              animationFillMode: "forwards",
            }}
          >
            <a
              href="https://forms.cloud.microsoft/r/avh5Ht6gee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#8B0C19] hover:bg-[#9B1B2F] text-white px-12 py-6 rounded-xl text-xl font-bold transition-all duration-300 hover:scale-110 transform hover:shadow-2xl hover:shadow-[#FFD700]/50 animate-pulse-button"
            >
              Register Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
