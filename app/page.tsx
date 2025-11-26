import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import UniversitiesSection from "@/components/sections/UniversitiesSection";
import ResultsSection from "@/components/sections/ResultsSection";
import DetailsSection from "@/components/sections/DetailsSection";
import PrizesSection from "@/components/sections/PrizesSection";
import SponsorsSection from "@/components/sections/SponsorsSection";
import JudgesSection from "@/components/sections/JudgesSection";
import CTASection from "@/components/sections/CTASection";
import RegistrationSection from "@/components/sections/RegistrationSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <UniversitiesSection />
        <ResultsSection />
        <DetailsSection />
        <PrizesSection />
        <SponsorsSection />
        <JudgesSection />
        <CTASection />
        <RegistrationSection />
      </main>
      <Footer />
    </div>
  );
}
