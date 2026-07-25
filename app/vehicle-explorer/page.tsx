import type { Metadata } from "next";
import BackButton from "@/components/BackButton";
import HotspotRenderer from "@/components/vehicle-explorer/HotspotRenderer";
import { getVehicleHotspotConfig } from "@/lib/vehicle-hotspot-data";

export const metadata: Metadata = {
  title: "Vehicle Hotspot Explorer | APM Group",
  description:
    "Explore APM's connected vehicle hardware interactively — GPS tracking, AI cameras, sensors, and safety devices mapped directly onto the vehicle.",
  alternates: { canonical: "https://apmgroups.in/vehicle-explorer" },
};

export default async function VehicleExplorerPage() {
  const config = await getVehicleHotspotConfig();

  return (
    <main className="min-h-screen bg-white animate-[fadeIn_0.4s_ease]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-5">
        <BackButton href="/" label="Back to Home" />
      </div>

      <section className="relative overflow-hidden bg-surface py-14 md:py-20 px-6 lg:px-8">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-navy/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="accent-bar accent-bar-center text-4xl sm:text-5xl font-black text-navy leading-[1.1] tracking-tight mb-5 inline-block">
            Vehicle Hotspot Explorer
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Every piece of connected hardware APM builds into a fleet vehicle — mapped to where it
            actually lives. Hover a point to see what it does, click through for the full spec sheet.
          </p>
        </div>

        <HotspotRenderer config={config} />
      </section>
    </main>
  );
}
