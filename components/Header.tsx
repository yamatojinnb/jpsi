"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 96; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: "About WIC", id: "about" },
    { label: "Results", id: "results" },
    { label: "Rules", id: "rules" },
    { label: "Prizes", id: "prizes" },
    { label: "Sponsors", id: "sponsors" },
    { label: "About JPSI", href: "/about-us" },
    {
      label: "Contact",
      href: "mailto:jpsi.waseda.univ@outlook.com?subject=WIC2025%20Inquiry&body=Hello%20WIC2025%20Team%2C%0A%0A",
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#8B0C19] shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className={`text-2xl font-bold transition-all duration-300 text-white cursor-pointer hover:opacity-80 ${
                !isScrolled ? "text-shadow-lg" : ""
              }`}
            >
              WIC2025
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) =>
              item.href && item.href.startsWith("mailto:") ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={`
                    relative px-3 py-2 font-medium 
                    transition-colors duration-300 
                    text-white
                    hover:text-[#FFD700]
                    after:content-['']
                    after:absolute
                    after:bottom-0
                    after:left-0
                    after:right-0
                    after:h-0.5
                    ${isScrolled ? "after:bg-[#FFD700]" : "after:bg-white"}
                    after:scale-x-0
                    hover:after:scale-x-100
                    after:transition-transform
                    after:duration-300
                    after:origin-center
                    ${!isScrolled ? "text-shadow-lg" : ""}
                  `}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.label}
                  onClick={() =>
                    item.href
                      ? (window.location.href = item.href)
                      : scrollToSection(item.id!)
                  }
                  className={`
                    relative px-3 py-2 font-medium 
                    transition-colors duration-300 
                    text-white
                    hover:text-[#FFD700]
                    after:content-['']
                    after:absolute
                    after:bottom-0
                    after:left-0
                    after:right-0
                    after:h-0.5
                    ${isScrolled ? "after:bg-[#FFD700]" : "after:bg-white"}
                    after:scale-x-0
                    hover:after:scale-x-100
                    after:transition-transform
                    after:duration-300
                    after:origin-center
                    ${!isScrolled ? "text-shadow-lg" : ""}
                  `}
                >
                  {item.label}
                </button>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-300 text-white ${
              !isScrolled ? "text-shadow-lg" : ""
            }`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) =>
                item.href && item.href.startsWith("mailto:") ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-left font-medium text-gray-700 hover:text-[#8B0C19] transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={item.label}
                    onClick={() =>
                      item.href
                        ? (window.location.href = item.href)
                        : scrollToSection(item.id!)
                    }
                    className="text-left font-medium text-gray-700 hover:text-[#8B0C19] transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
