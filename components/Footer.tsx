"use client";

import { Mail, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="text-gray-700" style={{ backgroundColor: "#f9fafb" }}>
      {/* Waseda crimson accent line */}
      <div className="h-1 bg-gradient-to-r from-[#8B0C19] to-[#FFD700]"></div>

      <div className="container mx-auto px-4 py-12">
        {/* Top Section - Navigation */}
        <div className="mb-8">
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="#about"
              className="hover:text-[#8B0C19] transition-colors duration-300"
            >
              About WIC
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="#results"
              className="hover:text-[#8B0C19] transition-colors duration-300"
            >
              Results
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="#rules"
              className="hover:text-[#8B0C19] transition-colors duration-300"
            >
              Rules
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="#prizes"
              className="hover:text-[#8B0C19] transition-colors duration-300"
            >
              Prizes
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="#about"
              className="hover:text-[#8B0C19] transition-colors duration-300"
            >
              About JPSI
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="#contact"
              className="hover:text-[#8B0C19] transition-colors duration-300"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Middle Section - Contact */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Email */}
            <a
              href="mailto:jpsi.waseda.univ@outlook.com"
              className="flex items-center gap-2 text-gray-600 hover:text-[#8B0C19] transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              <span>jpsi.waseda.univ@outlook.com</span>
            </a>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              {/* Twitter/X - Active */}
              <a
                href="https://x.com/official33541"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#8B0C19] transition-colors duration-300 cursor-pointer"
                aria-label="Follow us on X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>

              {/* Instagram - Active */}
              <a
                href="https://www.instagram.com/jpsi_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#8B0C19] transition-colors duration-300 cursor-pointer"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              {/* LinkedIn - Inactive */}
              <div className="text-gray-400 opacity-50 cursor-default">
                <Linkedin className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-gray-300 pt-8">
          <div className="text-center text-sm text-gray-600">
            <p>
              © 2025 Japan Students Investment Union (JPSI). All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
