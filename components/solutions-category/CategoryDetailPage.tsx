import type { SolutionCategory } from "@/lib/solution-categories";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";
import BackButton from "@/components/BackButton";
import CategoryHeroInteractive from "@/components/solutions-category/CategoryHeroInteractive";
import SolutionOverview from "@/components/solutions/SolutionOverview";
import SolutionChallenges from "@/components/solutions/SolutionChallenges";
import SolutionHowItWorks from "@/components/solutions/SolutionHowItWorks";
import SolutionBenefits from "@/components/solutions/SolutionBenefits";
import SolutionIndustries from "@/components/solutions/SolutionIndustries";
import SolutionCTA from "@/components/solutions/SolutionCTA";
import StructuredData from "@/components/solutions/StructuredData";

// Per-category overrides for the Overview section: a real (non-illustrated)
// photo plus, optionally, a punchier heading/copy and a floating checklist
// card over the image. Categories without an override fall back to the
// heroImage and the category's own overview copy, no checklist.
const overviewOverrides: Record<
  string,
  {
    image: string;
    heading?: string;
    overview?: string[];
    metricsTitle?: string;
    metrics?: string[];
  }
> = {
  "automated-testing-solutions": {
    image: "/images/solutions-topics/automated-testing-lane-gantry.jpg",
    heading: "Automated, Sensor-Verified Vehicle Testing",
    overview: [
      "Every vehicle is scored by sensors, not inspectors — removing manual bias from fitness testing and driver licensing entirely.",
      "Brakes, lights, and emissions move through a sequence of automated stations, with every result logged digitally into a tamper-resistant, government-linked record — built to Automated Testing Station (ATS) and licensing standards.",
    ],
    metricsTitle: "Automated Test Checklist:",
    metrics: ["Brake Performance", "Emission Levels", "Headlight Alignment"],
  },
  "software-solutions": {
    image: "/images/solutions/software-solutions-realistic.png",
    heading: "A Unified Pane of Glass for Connected Fleet IoT",
    overview: [
      "APM's Software Solutions aggregate and clean data from all GPS, video, and diagnostic sensors into a single, real-time control panel.",
      "Engineered with developer-friendly APIs and high-throughput webhooks, the platform syncs with custom ERP, CRM, or dispatch databases—allowing operators to automate workflows and receive alerts only for exceptions requiring action."
    ],
    metricsTitle: "Unified Dashboard Modules:",
    metrics: ["Live Map Tracking", "Driver Safety Scoring", "SIM Card Management", "API Diagnostics & Logs"],
  },
  "manufacturing-solutions": {
    image: "/images/solutions/trafficjet-printers.png",
    heading: "Automatic, Compliant Sign Production",
    overview: [
      "APM's Manufacturing Solutions feature TrafficJet digital printers, the trusted system for producing durable traffic safety, wayfinding, and custom signage.",
      "Backed 100% by Tracole Technologies Pvt. Ltd., Tracole provides the printer, ink, sheeting, lamination, and technical support. It is a complete, single-supplier system designed to simplify printing of compliant traffic signs while maximizing printhead life and minimizing ink and cartridge waste."
    ],
    metricsTitle: "TrafficJet System Features:",
    metrics: ["Integrated Dryer (162 ft²/hr)", "Large Bulk Ink Loaders", "Unified Ink Indication", "True Traffic Color™ Inks"],
  },
};

export default function CategoryDetailPage({
  category,
  breadcrumb,
  canonicalUrl,
}: {
  category: SolutionCategory;
  breadcrumb: BreadcrumbItem[];
  canonicalUrl: string;
}) {
  const parent = breadcrumb[breadcrumb.length - 2];
  const override = overviewOverrides[category.slug];

  return (
    <main className="min-h-screen bg-white animate-[fadeIn_0.4s_ease]">
      <StructuredData
        name={category.name}
        description={category.description}
        url={canonicalUrl}
        breadcrumb={breadcrumb}
        image={category.heroImage}
      />
      {parent?.href && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-5">
          <BackButton href={parent.href} label={`Back to ${parent.label}`} />
        </div>
      )}
      <CategoryHeroInteractive category={category} />

      <SolutionOverview
        overview={override?.overview ?? category.overview}
        imageSrc={override?.image ?? category.heroImage}
        solutionName={category.name}
        heading={override?.heading}
        metricsTitle={override?.metricsTitle}
        metrics={override?.metrics}
      />
      <SolutionChallenges challenges={category.challenges} />
      <SolutionHowItWorks steps={category.howItWorks} />
      <SolutionBenefits benefits={category.benefits} />
      <SolutionIndustries industries={category.industries} />
      <SolutionCTA solutionName={category.name} />
    </main>
  );
}
