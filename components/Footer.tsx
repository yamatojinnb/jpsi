"use client";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const quickLinks = [
    { label: "About WIC", id: "about" },
    { label: "Results", id: "results" },
    { label: "Rules", id: "rules" },
    { label: "Prizes", id: "prizes" },
    { label: "Contact", id: "contact" },
    { label: "About JPSI", href: "/about-us" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm">
              © 2025 JPSI (Japan Students Investment Union). All rights
              reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() =>
                    link.href
                      ? (window.location.href = link.href)
                      : scrollToSection(link.id!)
                  }
                  className="text-sm hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-sm">
              Questions about WIC2025?
              <br />
              Get in touch with our team.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
