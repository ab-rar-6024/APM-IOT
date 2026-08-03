"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BackButton from "@/components/BackButton";
import type { ComponentType } from "react";
import {
  Navigation,
  Tv,
  Gauge,
  Scale,
  Shield,
  Activity,
  Thermometer,
  Zap,
  Layers,
  Cpu,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  IndianRupee,
  Clock,
  Sparkles,
  ShieldCheck,
  XCircle,
  X
} from "lucide-react";
import { VEHICLES, type VehicleType, type ProductType } from "@/data/vehicle-apm-config";
import {
  VEHICLE_PANEL_CONTENT,
  getHighlightProducts,
  getRoiPerVehicleSavings,
  type VehiclePanelContent
} from "@/data/vehicle-panel-content";
import { PRODUCT_PANEL_CONTENT } from "@/data/product-panel-content";
import ContactForm from "@/components/solutions/ContactForm";
import { smoothScrollTo } from "@/lib/lenis-instance";
import AnimatedCounter from "./AnimatedCounter";
import ProductSimulatorPanel from "./ProductSimulatorPanel";
import DashboardIntegration from "./DashboardIntegration";
import AISmartInsights from "./AISmartInsights";

const HERO_VEHICLE_IDS = ["truck", "bus", "taxi"];

const PRODUCT_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  navigation: Navigation,
  tv: Tv,
  gauge: Gauge,
  scale: Scale,
  shield: Shield,
  activity: Activity,
  thermometer: Thermometer,
  zap: Zap,
  layers: Layers,
  cpu: Cpu,
  "check-circle": CheckCircle2
};

function ProductIcon({ name, className }: { name: string; className?: string }) {
  const Icon = PRODUCT_ICONS[name] ?? Cpu;
  return <Icon className={className} />;
}

// Reliability story per product — what breaks down without it vs. what APM guarantees with it.
const PRODUCT_RELIABILITY: Record<string, { before: string; after: string }> = {
  "ais-140-gps": {
    before: "No verified location trail — theft or route deviation goes unnoticed for hours.",
    after: "Certified GPS reports a verified location every second, straight to RTO servers."
  },
  "ai-camera": {
    before: "Driver fatigue and lane drift go unnoticed until an incident happens.",
    after: "Continuous AI monitoring flags fatigue and lane drift before a collision occurs."
  },
  "fuel-sensor": {
    before: "Fuel drainage and pilferage go undetected between refuels.",
    after: "Any abnormal drop is flagged within seconds, audited to 99% accuracy."
  },
  "payload-monitoring": {
    before: "Axle overload is discovered only after a fine or a suspension failure.",
    after: "Live axle-strain readout keeps every load within legal and mechanical limits."
  },
  tpms: {
    before: "Slow leaks and pressure loss go unnoticed until a blowout.",
    after: "Continuous pressure & temperature telemetry flags leaks before they become blowouts."
  },
  "speed-limiter": {
    before: "Over-speeding is discovered only after a fine or an accident report.",
    after: "Throttle-governed speed keeps every trip within RTO limits automatically."
  },
  "panic-button": {
    before: "A driver or passenger in distress has no fast way to alert dispatch.",
    after: "One press sends a silent, location-tagged SOS straight to the dispatch console."
  },
  "reverse-parking": {
    before: "Loading-bay dents and reversing collisions are discovered after the fact.",
    after: "Ultrasonic sonar gives audible distance warnings before contact happens."
  },
  "bms-card": {
    before: "Cell-level battery faults go undetected until a thermal event occurs.",
    after: "Continuous voltage & thermal monitoring catches faults before they become failures."
  },
  "dc-converter": {
    before: "Auxiliary electronics are vulnerable to sudden voltage drops and failure.",
    after: "Regulated 12V output keeps dash and telemetry hardware stable at all times."
  }
};

function getReliability(product: ProductType) {
  return (
    PRODUCT_RELIABILITY[product.id] ?? {
      before: `Without it, the risk ${product.benefit.toLowerCase()} addresses goes unmanaged.`,
      after: product.desc
    }
  );
}

export default function VehicleHeroSelector() {
  const heroVehicles = VEHICLES.filter((v) => HERO_VEHICLE_IDS.includes(v.id));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selectedVehicle = heroVehicles.find((v) => v.id === selectedId) ?? null;
  const content: VehiclePanelContent | null = selectedId ? VEHICLE_PANEL_CONTENT[selectedId] ?? null : null;

  // Clicking a platform card auto-scrolls down to the Key Features table instead of leaving the
  // user to notice the panel appeared below the fold. Scrolled via the site's own Lenis instance
  // (not native scrollIntoView) so it animates smoothly instead of Lenis cancelling it mid-flight.
  useEffect(() => {
    if (selectedId) {
      smoothScrollTo(panelRef.current);
    }
  }, [selectedId]);

  return (
    <div>
      {/* Top Hero Header Frame with Looping Background Video */}
      <section className="relative bg-slate-950 pt-10 pb-16 lg:pt-14 lg:pb-20 px-6 lg:px-8 overflow-hidden">
        {/* Looping Background Video — Confined strictly to this top hero frame */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-80 brightness-[1.12] contrast-[1.05] scale-[1.02]"
          src="/videos/vehicle-background.mp4"
        />
        {/* Lightened gradient overlay for high video visibility and vibrant contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/30 to-slate-950/70 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-4">
            <BackButton href="/solutions" label="Back to Solutions" variant="glass" />
          </div>

          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-primary mb-4 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 backdrop-blur-sm">
              Vehicle Solutions
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-sm">
              Choose Your Vehicle Platform
            </h1>
            <p className="text-slate-200/90 text-base md:text-lg leading-relaxed drop-shadow-sm font-medium">
              Select a platform to see the hardware, workflow, and ROI it unlocks.
            </p>
          </div>

          {/* Three-image platform selector */}
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {heroVehicles.map((vehicle) => {
              const isSelected = selectedId === vehicle.id;
              return (
                <button
                  key={vehicle.id}
                  type="button"
                  onClick={() => setSelectedId(isSelected ? null : vehicle.id)}
                  aria-pressed={isSelected}
                  className={`group relative flex flex-col items-center text-center bg-white/95 backdrop-blur-md rounded-3xl border p-4 transition-all duration-300 ${
                    isSelected
                      ? "border-primary shadow-[0_20px_45px_rgba(47,143,239,0.3)] -translate-y-1 bg-white"
                      : "border-slate-200/80 hover:border-primary/40 hover:-translate-y-1 hover:shadow-2xl hover:bg-white"
                  }`}
                >
                  <div className="relative w-full aspect-square mb-4">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      sizes="(max-width: 640px) 90vw, 440px"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      quality={100}
                      priority
                    />
                  </div>
                  <h3 className="text-base md:text-lg font-black text-navy">{vehicle.name}</h3>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mt-1">
                    {vehicle.tagline}
                  </p>
                  <span
                    className={`mt-4 inline-flex items-center gap-1.5 text-xs font-bold transition-colors ${
                      isSelected ? "text-primary" : "text-slate-500 group-hover:text-primary"
                    }`}
                  >
                    {isSelected ? "Viewing details" : "View details"}
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? "translate-x-1" : "group-hover:translate-x-1"
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic detail panel — Outside the video frame on a clean white background */}
      {selectedVehicle && content && (
        <section className="bg-white py-12 px-6 lg:px-8 border-t border-slate-100">
          <div key={selectedVehicle.id} ref={panelRef} className="max-w-7xl mx-auto animate-fade-in scroll-mt-24">
            <VehicleDetailPanel vehicle={selectedVehicle} content={content} />
          </div>
        </section>
      )}
    </div>
  );
}

function VehicleDetailPanel({
  vehicle,
  content
}: {
  vehicle: VehicleType;
  content: VehiclePanelContent;
}) {
  const highlightProducts: ProductType[] = getHighlightProducts(content);
  const perVehicleSavings = getRoiPerVehicleSavings(content);

  const [fleetSize, setFleetSize] = useState(10);
  const totalSavings = perVehicleSavings * fleetSize;
  const totalInvestment = content.roiPackageCost * fleetSize;
  const roiPercent = Math.round((totalSavings / totalInvestment) * 100);
  const paybackMonths = Math.max(1, Math.round((totalInvestment / totalSavings) * 12));

  // Selecting a row in the Key Features table swaps the Product Information Panel below
  // to that product's own content; null falls back to the vehicle-level content.
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const selectedProduct = selectedProductId ? highlightProducts.find((p) => p.id === selectedProductId) ?? null : null;
  const selectedProductPanelContent = selectedProduct ? PRODUCT_PANEL_CONTENT[selectedProduct.id] : null;

  // Product Information Panel content — vehicle-level by default, swapped to the selected
  // product's own content when a Key Features row is active. Same fixed order either way:
  // image, short description, How It Works, Key Features, Business Benefits, simulator/ROI.
  const activeImage = selectedProduct ? selectedProduct.image : vehicle.image;
  const activeName = selectedProduct ? selectedProduct.name : vehicle.name;
  const activeDesc = selectedProduct ? selectedProduct.desc : content.shortDescription;
  const activeHowItWorks = selectedProduct ? selectedProductPanelContent?.howItWorksSteps ?? [] : content.howItWorks;
  const activeKeyFeatures = selectedProduct ? selectedProduct.features : vehicle.features;
  const activeBusinessBenefits = selectedProduct ? selectedProductPanelContent?.businessBenefits ?? [] : content.businessBenefits;

  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const productDetailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedProductId) {
      smoothScrollTo(productDetailRef.current);
    }
  }, [selectedProductId]);

  return (
    <div className="rounded-[2rem] border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-2xl p-6 md:p-10">
      {/* Key Features — cost calculator table, shown first */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-1.5">
          <h3 className="text-sm font-black uppercase tracking-widest text-primary">Key Features</h3>
          {selectedProduct && (
            <button
              type="button"
              onClick={() => setSelectedProductId(null)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/15 px-3 py-1.5 rounded-full transition-colors"
            >
              Viewing: {selectedProduct.name}
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <p className="text-sm text-slate-400 mb-5">
          How reliable your fleet is before vs. after each feature. Click a row to see its full product panel below.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[980px] text-base border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left font-black text-navy text-xs uppercase tracking-wider px-6 py-4">
                  Product
                </th>
                <th className="text-left font-black text-navy text-xs uppercase tracking-wider px-6 py-4">
                  Benefits
                </th>
                <th className="text-left font-black text-navy text-xs uppercase tracking-wider px-6 py-4">
                  Security
                </th>
                <th className="text-left font-black text-rose-500 text-xs uppercase tracking-wider px-6 py-4">
                  Before APM
                </th>
                <th className="text-left font-black text-emerald-500 text-xs uppercase tracking-wider px-6 py-4">
                  After APM
                </th>
              </tr>
            </thead>
            <tbody>
              {highlightProducts.map((product, idx) => {
                const reliability = getReliability(product);
                const isActiveProduct = selectedProductId === product.id;
                return (
                  <tr
                    key={product.id}
                    onClick={() => setSelectedProductId(product.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedProductId(product.id);
                      }
                    }}
                    tabIndex={0}
                    aria-label={`View ${product.name} details`}
                    className={`border-b border-slate-100 last:border-0 cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                      isActiveProduct ? "bg-primary/5" : idx % 2 === 1 ? "bg-slate-50/40 hover:bg-slate-100/60" : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="px-6 py-5 align-top">
                      <div className="flex items-center gap-3">
                        <span className="shrink-0 w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                          <ProductIcon name={product.iconName} className="w-5 h-5" />
                        </span>
                        <span className="font-bold text-navy text-base leading-tight">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 align-top text-slate-500 text-sm leading-snug max-w-[200px]">
                      {product.benefit}
                    </td>
                    <td className="px-6 py-5 align-top text-slate-500 text-sm leading-snug max-w-[180px]">
                      <span className="inline-flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 shrink-0 text-primary mt-0.5" />
                        <span>{product.compliance}</span>
                      </span>
                    </td>
                    <td className="px-6 py-5 align-top text-sm leading-snug max-w-[240px]">
                      <span className="inline-flex items-start gap-2 text-rose-500">
                        <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{reliability.before}</span>
                      </span>
                    </td>
                    <td className="px-6 py-5 align-top text-sm leading-snug max-w-[240px]">
                      <span className="inline-flex items-start gap-2 text-emerald-600">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{reliability.after}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div ref={productDetailRef} className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start scroll-mt-28">
        {/* Product Image + Short Description */}
        <div className="lg:sticky lg:top-24">
          <div className="relative w-full aspect-[4/3] rounded-3xl bg-white border border-slate-200 overflow-hidden">
            <Image src={activeImage} alt={activeName} fill sizes="(max-width: 1024px) 100vw, 480px" className="object-contain p-6" />
          </div>
          <h2 className="text-2xl font-black text-navy mt-6">{activeName}</h2>
          <p className="text-slate-500 leading-relaxed mt-2">{activeDesc}</p>
        </div>

        <div className="space-y-10">
          {/* How It Works */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4">How It Works</h3>
            <ol className="space-y-3">
              {activeHowItWorks.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-navy text-white text-[11px] font-black flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Key Features (bullet list) */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4">Key Features</h3>
            <ul className="grid sm:grid-cols-2 gap-y-2.5 gap-x-4">
              {activeKeyFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Benefits */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4">Business Benefits</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {activeBusinessBenefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-navy leading-tight">{benefit.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedProduct ? (
            /* Per-Product Simulator */
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> {selectedProduct.name} Simulator
              </h3>
              <p className="text-xs text-slate-400 -mt-3 mb-4">
                Fleet size of {fleetSize} vehicle{fleetSize === 1 ? "" : "s"} — adjust it in the ROI calculator on the
                vehicle overview, or below.
              </p>
              <div className="mb-4">
                <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                  <span>Fleet Size</span>
                  <span className="text-navy font-black">
                    {fleetSize} vehicle{fleetSize === 1 ? "" : "s"}
                  </span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={200}
                  value={fleetSize}
                  onChange={(e) => setFleetSize(Number(e.target.value))}
                  className="w-full accent-primary"
                  aria-label="Fleet size"
                />
              </div>
              <ProductSimulatorPanel product={selectedProduct} fleetSize={fleetSize} />
            </div>
          ) : (
            /* Interactive ROI Calculator */
            <div className="bg-navy rounded-3xl p-6 md:p-8 text-white">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-1 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Interactive ROI Calculator
              </h3>
              <p className="text-white/50 text-xs mb-6">
                Estimate for a fleet of {vehicle.name.toLowerCase()} platforms.
              </p>

              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-white/70 mb-2">
                <span>Fleet Size</span>
                <span className="text-white font-black">
                  {fleetSize} vehicle{fleetSize === 1 ? "" : "s"}
                </span>
              </label>
              <input
                type="range"
                min={1}
                max={200}
                value={fleetSize}
                onChange={(e) => setFleetSize(Number(e.target.value))}
                className="w-full accent-primary"
                aria-label="Fleet size"
              />

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <span className="text-[10px] uppercase tracking-wide text-white/50 font-bold flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" /> Est. Annual Savings
                  </span>
                  <AnimatedCounter prefix="₹" value={Math.round(totalSavings)} className="block text-xl font-black mt-1 font-mono tabular-nums text-white" />
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <span className="text-[10px] uppercase tracking-wide text-white/50 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Year 1 ROI
                  </span>
                  <AnimatedCounter value={roiPercent} suffix="%" className="block text-xl font-black mt-1 font-mono tabular-nums text-primary" />
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <span className="text-[10px] uppercase tracking-wide text-white/50 font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Payback Period
                  </span>
                  <AnimatedCounter value={paybackMonths} suffix=" mo" className="block text-xl font-black mt-1 font-mono tabular-nums text-white" />
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <span className="text-[10px] uppercase tracking-wide text-white/50 font-bold">Est. Investment</span>
                  <AnimatedCounter prefix="₹" value={Math.round(totalInvestment)} className="block text-xl font-black mt-1 font-mono tabular-nums text-white" />
                </div>
              </div>

              {showQuoteForm ? (
                <div className="mt-6 animate-fade-in">
                  <ContactForm productName={vehicle.name} />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowQuoteForm(true)}
                  className="mt-6 inline-flex items-center justify-center w-full px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#E30613] hover:bg-[#c10510] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
                >
                  Get a Custom Quote
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* AI Smart Insights, Dashboard Integration — based on this vehicle's full recommended feature set */}
      <div className="mt-14 pt-10 border-t border-slate-200 space-y-10">
        <AISmartInsights />
        <DashboardIntegration vehicle={vehicle} productIds={highlightProducts.map((p) => p.id)} fleetSize={fleetSize} />
      </div>
    </div>
  );
}
