import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { SafetyFeatures } from "@/components/home/SafetyFeatures";
import { HealthFeatures } from "@/components/home/HealthFeatures";
import { AIAgentDemo } from "@/components/home/AIAgentDemo";
import { Testimonials } from "@/components/home/Testimonials";
import { TechArchitecture } from "@/components/home/TechArchitecture";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <SafetyFeatures />
        <HealthFeatures />
        <AIAgentDemo />
        <TechArchitecture />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
