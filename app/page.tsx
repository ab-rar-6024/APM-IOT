import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ManufacturingSection from "@/components/ManufacturingSection";
import IndustriesSection from "@/components/IndustriesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import CustomersSection from "@/components/CustomersSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      {/* Everything after the hero stacks in one explicit layer above the
          fixed hero, so it reliably scrolls up and covers it. */}
      <div className="relative lg:z-10 bg-white">
        <AboutSection />
        <CapabilitiesSection />
        <ManufacturingSection />
        <IndustriesSection />
        <WhyChooseSection />
        <CustomersSection />
      </div>
    </main>
  );
}
