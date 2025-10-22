import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ResultsSection from "@/components/sections/ResultsSection";
import DetailsSection from "@/components/sections/DetailsSection";
import PrizesSection from "@/components/sections/PrizesSection";
import SponsorsSection from "@/components/sections/SponsorsSection";
import CTASection from "@/components/sections/CTASection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ResultsSection />
        <DetailsSection />
        <PrizesSection />
        <SponsorsSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
