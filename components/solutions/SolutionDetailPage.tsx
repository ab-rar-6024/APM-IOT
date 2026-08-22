import { getSolution, type Solution } from "@/lib/solutions-data";
import type { SolutionCategory } from "@/lib/solution-categories";
import type { BreadcrumbItem } from "@/lib/breadcrumbs";
import BackButton from "@/components/BackButton";
import PageBanner from "@/components/solutions/PageBanner";
import SolutionHero from "@/components/solutions/SolutionHero";
import SolutionOverview from "@/components/solutions/SolutionOverview";
import SolutionChallenges from "@/components/solutions/SolutionChallenges";
import SolutionHowItWorks from "@/components/solutions/SolutionHowItWorks";
import SolutionApplications from "@/components/solutions/SolutionApplications";
import SolutionBenefits from "@/components/solutions/SolutionBenefits";
import SolutionIndustries from "@/components/solutions/SolutionIndustries";
import SolutionCTA from "@/components/solutions/SolutionCTA";
import RelatedSolutions from "@/components/solutions/RelatedSolutions";
import PrevNextSolution from "@/components/solutions/PrevNextSolution";
import StructuredData from "@/components/solutions/StructuredData";

// Photos sourced for each topic; where no clean, unbranded, on-license photo could be
// found, we fall back to the site's own existing solution graphics instead.
const bannerImages: Record<string, string> = {
  "fleet-management": "/images/solutions/vehicle-tracking.png",
  "vehicle-safety": "/images/solutions-topics/vehicle-safety.jpg",
  "video-surveillance": "/images/solutions-topics/video-surveillance.jpg",
  "asset-tracking": "/images/solutions-topics/asset-tracking.jpg",
  "public-transport-solutions": "/images/solutions/vehicle-tracking.png",
  "electric-mobility": "/images/solutions-topics/electric-mobility.jpg",
  "vehicle-compliance": "/images/solutions/compliance-solutions.png",
  "automated-testing-solutions": "/images/solutions-topics/automated-testing-solutions.jpg",
  "road-safety-solutions": "/images/solutions-topics/road-safety-solutions.jpg",
  "workplace-safety": "/images/solutions-topics/workplace-safety.png",
  "printing-identification": "/images/solutions/printing-identification.png",
  "automated-testing-lane": "/images/solutions-topics/automated-testing-solutions.jpg",
  "automated-driving-test-track": "/images/solutions-topics/automated-testing-solutions.jpg",
  "high-security-registration-plate": "/images/solutions/printing-identification.png",
  "industrial-label-printing": "/images/solutions/printing-identification.png",
  "asset-identification": "/images/solutions-topics/asset-tracking.jpg",
  "government-identification": "/images/solutions/printing-identification.png",
};

const challengeTopicImages: Record<string, string> = {
  "fleet-management": "/images/solutions/fuel-monitoring.png",
  "vehicle-safety": "/images/solutions-topics/vehicle-safety.jpg",
  "video-surveillance": "/images/solutions-topics/video-surveillance.jpg",
  "asset-tracking": "/images/solutions-topics/asset-tracking.jpg",
  "public-transport-solutions": "/images/solutions/video-telematics.png",
  "electric-mobility": "/images/solutions-topics/electric-mobility.jpg",
  "vehicle-compliance": "/images/solutions/printing-identification.png",
  "automated-testing-solutions": "/images/solutions-topics/automated-testing-solutions.jpg",
  "road-safety-solutions": "/images/solutions-topics/road-safety-solutions.jpg",
  "workplace-safety": "/images/solutions-topics/workplace-safety.png",
  "printing-identification": "/images/solutions/compliance-solutions.png",
  "automated-testing-lane": "/images/solutions/automated-testing-solutions.png",
  "automated-driving-test-track": "/images/solutions/automated-testing-solutions.png",
  "high-security-registration-plate": "/images/solutions/compliance-solutions.png",
  "industrial-label-printing": "/images/solutions/industrial-iot.png",
  "asset-identification": "/images/solutions/asset-tracking.png",
  "government-identification": "/images/solutions/compliance-solutions.png",
};

export default function SolutionDetailPage({
  solution,
  displayName,
  breadcrumb,
  category,
  canonicalUrl,
}: {
  solution: Solution;
  displayName?: string;
  breadcrumb: BreadcrumbItem[];
  category?: SolutionCategory;
  canonicalUrl: string;
}) {
  const name = displayName ?? solution.name;
  const parent = breadcrumb[breadcrumb.length - 2];

  const siblingChildren = category ? category.children.filter((c) => c.slug !== solution.slug) : [];
  const siblingSolutions = siblingChildren
    .map((c) => getSolution(c.slug))
    .filter((s): s is Solution => Boolean(s));

  let prevEntry: { label: string; href: string } | undefined;
  let nextEntry: { label: string; href: string } | undefined;
  if (category) {
    const idx = category.children.findIndex((c) => c.slug === solution.slug);
    if (idx > -1) {
      const prevChild = category.children[idx - 1];
      const nextChild = category.children[idx + 1];
      if (prevChild) {
        const prevSolution = getSolution(prevChild.slug);
        if (prevSolution) {
          prevEntry = {
            label: prevChild.displayName ?? prevSolution.name,
            href: `/solutions/${category.slug}/${prevChild.path ?? prevChild.slug}`,
          };
        }
      }
      if (nextChild) {
        const nextSolution = getSolution(nextChild.slug);
        if (nextSolution) {
          nextEntry = {
            label: nextChild.displayName ?? nextSolution.name,
            href: `/solutions/${category.slug}/${nextChild.path ?? nextChild.slug}`,
          };
        }
      }
    }
  }

  return (
    <main className="min-h-screen bg-white animate-[fadeIn_0.4s_ease]">
      <StructuredData
        name={name}
        description={solution.description}
        url={canonicalUrl}
        breadcrumb={breadcrumb}
        image={bannerImages[solution.slug] ?? solution.heroImage}
      />
      {parent?.href && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-5">
          <BackButton href={parent.href} label={`Back to ${parent.label}`} />
        </div>
      )}
      <PageBanner
        image={bannerImages[solution.slug] ?? solution.heroImage}
        name={name}
        tagline={solution.tagline}
      />
      <SolutionHero solution={{ ...solution, name }} />
      <SolutionOverview overview={solution.overview} imageSrc={solution.heroImage} solutionName={name} />
      <SolutionChallenges challenges={solution.challenges} topicImage={challengeTopicImages[solution.slug]} />
      <SolutionHowItWorks steps={solution.howItWorks} />
      <SolutionApplications
        applications={solution.applications}
        images={solution.applicationImages}
        solutionName={name}
      />
      <SolutionBenefits benefits={solution.benefits} />
      <SolutionIndustries industries={solution.industries} />
      {siblingSolutions.length > 0 && (
        <RelatedSolutions solutions={[...siblingSolutions, solution]} currentSlug={solution.slug} />
      )}
      <PrevNextSolution previous={prevEntry} next={nextEntry} />
      <SolutionCTA solutionName={name} />
    </main>
  );
}
