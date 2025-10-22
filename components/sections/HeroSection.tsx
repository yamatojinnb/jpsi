"use client";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center hero-background pt-16"
    >
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 z-5"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <h1
          className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in hero-text-shadow"
          style={{ textShadow: "3px 3px 10px rgba(0,0,0,0.9)" }}
        >
          World Investment Competition 2025
        </h1>
        <h2
          className="text-3xl md:text-4xl font-bold mb-10 text-yellow-400 hero-text-shadow animate-fade-in-delay-1"
          style={{ textShadow: "3px 3px 10px rgba(0,0,0,0.9)" }}
        >
          The Investment Olympics
        </h2>
        <p
          className="text-xl md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed font-bold hero-text-shadow animate-fade-in-delay-2"
          style={{ textShadow: "3px 3px 10px rgba(0,0,0,0.9)" }}
        >
          Compete with students from around the world in the ultimate investment
          challenge. Manage a $100,000 virtual portfolio over three months and
          compete for $15,000 in prizes.
        </p>

        <a
          href="https://forms.cloud.microsoft/r/avh5Ht6gee"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#8B0C19] hover:bg-[#9B1B2F] text-white px-12 py-6 rounded-xl text-xl font-bold transition-all duration-300 hover:scale-110 transform hover:shadow-2xl hover:shadow-[#FFD700]/50 animate-pulse-button"
        >
          Register Now
        </a>
      </div>
    </section>
  );
}
