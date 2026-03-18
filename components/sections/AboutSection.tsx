"use client";

import { DollarSign, Calendar, Trophy, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showRipple, setShowRipple] = useState(false);

  useEffect(() => {
    // Observer for ripple effect - triggers when section enters view
    const rippleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger ripple after a short delay when section becomes visible
          setTimeout(() => {
            setShowRipple(true);
          }, 500);
        }
      },
      { threshold: 0.3 }
    );

    // Observer for cards animation
    const cardsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const aboutSection = document.getElementById("about");
    const cardsSection = document.getElementById("wic-cards");

    if (aboutSection) rippleObserver.observe(aboutSection);
    if (cardsSection) cardsObserver.observe(cardsSection);

    return () => {
      rippleObserver.disconnect();
      cardsObserver.disconnect();
    };
  }, []);

  const highlightCards = [
    {
      icon: Calendar,
      number: "3",
      title: "Team Members",
      description: "Collaborate with teammates in this worldwide competition",
    },
    {
      icon: DollarSign,
      number: "$1,000,000",
      title: "Virtual Portfolio",
      description:
        "Each participant manages $1M in U.S. equities, ETFs, and options",
    },
    {
      icon: Trophy,
      number: "$15,000",
      title: "in Prizes",
      description: "Trophies, travel to Japan, and more",
    },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes ripple-expand {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.8;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }

        .ripple-container {
          position: relative;
          display: inline-block;
        }

        .ripple-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 40px;
          background: radial-gradient(
            circle,
            rgba(249, 115, 22, 0.8) 0%,
            rgba(249, 115, 22, 0.4) 50%,
            transparent 70%
          );
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          pointer-events: none;
        }

        .ripple-active .ripple-circle {
          animation: ripple-expand 1.2s ease-out forwards;
        }

        .ripple-active .ripple-circle-2 {
          animation: ripple-expand 1.2s ease-out forwards;
          animation-delay: 1s;
        }

        /* Second ring for more emphasis */
        .ripple-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 40px;
          border: 3px solid rgba(249, 115, 22, 0.6);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          pointer-events: none;
        }

        .ripple-active .ripple-ring {
          animation: ripple-expand 1s ease-out forwards;
          animation-delay: 0.15s;
        }

        .ripple-active .ripple-ring-2 {
          animation: ripple-expand 1s ease-out forwards;
          animation-delay: 1.15s;
        }
      `}</style>

      <section id="about" className="pt-16 pb-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="w-16 h-1 bg-[#8B0C19]"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                What is WIC?
              </h2>
              <div className="w-16 h-1 bg-[#8B0C19]"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Compete with professional-grade tools:{" "}
              <a
                href="https://www.interactivebrokers.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`ripple-container font-semibold text-[#8B0C19] hover:underline cursor-pointer ${
                  showRipple ? "ripple-active" : ""
                }`}
              >
                Interactive Brokers
                <span className="ripple-circle"></span>
                <span className="ripple-ring"></span>
              </a>
              ' trading platform paired with{" "}
              <a
                href="https://www.tradingview.com/markets/stocks-usa/"
                target="_blank"
                rel="noopener"
                className={`ripple-container font-semibold text-[#8B0C19] hover:underline cursor-pointer ${
                  showRipple ? "ripple-active" : ""
                }`}
              >
                advanced charting software
                <span className="ripple-circle ripple-circle-2"></span>
                <span className="ripple-ring ripple-ring-2"></span>
              </a>
              —exclusively for all participants.
            </p>
          </div>

          <div
            id="wic-cards"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {highlightCards.map((card, index) => {
              const images = [
                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
                "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
                "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
              ];

              const delays = ["delay-0", "delay-200", "delay-400"];

              return (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  } ${delays[index]}`}
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={images[index]}
                        alt={card.title}
                        width={400}
                        height={160}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>

                    <div className="p-6 text-center">
                      <div className="text-4xl font-bold text-[#8B0C19] mb-2">
                        {card.number}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
