"use client";

import { useEffect, useState } from "react";

const solutions = [
  {
    id: "fleet-management",
    label: "Fleet Management",
    desc: "Centralized visibility and control across your entire vehicle fleet — location, health, and utilization in one dashboard.",
    products: ["Rover Elite", "Rover Elite+", "Prime Load"],
    certs: ["ISO 9001"],
    productCategory: "fleet-tracking",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={1.3}>
        <rect x="2" y="9" width="11" height="7" rx="1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 11h4l3 3v2h-7z" />
        <circle cx="6.5" cy="18" r="1.5" />
        <circle cx="16.5" cy="18" r="1.5" />
      </svg>
    ),
  },
  {
    id: "vehicle-tracking",
    label: "Vehicle Tracking",
    desc: "Real-time GPS tracking with route history, geofencing, and instant location alerts.",
    products: ["Rover Elite", "Rover Asset", "AIS 140 GPS"],
    certs: ["AIS 140", "ICAT Certified"],
    productCategory: "fleet-tracking",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={1.3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    id: "video-telematics",
    label: "Video Telematics",
    desc: "AI-powered dash cams and DVR systems capturing critical driving events for safety and evidence.",
    products: ["Rover AI Dash Cam", "Mobile DVR", "4G/WiFi Vandal Proof Camera"],
    certs: ["BIS Certified"],
    productCategory: "smart-analytics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={1.3}>
        <rect x="2" y="7" width="13" height="10" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l6-3v10l-6-3z" />
      </svg>
    ),
  },
  {
    id: "ai-driver-monitoring",
    label: "AI Driver Monitoring",
    desc: "Computer-vision based driver fatigue and distraction detection to prevent accidents before they happen.",
    products: ["Rover View", "Rover AI Dash Cam", "Mobile DVR"],
    certs: ["ISO 27001"],
    productCategory: "smart-analytics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={1.3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "asset-tracking",
    label: "Asset Tracking",
    desc: "Track high-value assets and equipment across sites with real-time location and condition monitoring.",
    products: ["Rover Asset", "Prime Load"],
    certs: ["M2M Certified"],
    productCategory: "fleet-tracking",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={1.3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
  },
  {
    id: "payload-monitoring",
    label: "Payload Monitoring",
    desc: "Monitor cargo weight and load distribution in real time to prevent overloading and optimize trips.",
    products: ["Prime Load"],
    certs: ["Legal Metrology"],
    productCategory: "smart-logistics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={1.3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M4 7h16M4 7l-2 5a3 3 0 006 0l-2-5zM20 7l-2 5a3 3 0 006 0l-2-5z" />
      </svg>
    ),
  },
  {
    id: "fuel-monitoring",
    label: "Fuel Monitoring",
    desc: "Detect fuel theft and optimize consumption with real-time tank-level monitoring across your fleet.",
    products: ["Rover Elite", "Prime Load"],
    certs: ["BIS Certified"],
    productCategory: "fleet-tracking",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={1.3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4 5-6 8-6 11a6 6 0 0012 0c0-3-2-6-6-11z" />
      </svg>
    ),
  },
  {
    id: "compliance-solutions",
    label: "Compliance Solutions",
    desc: "AIS-140 and regulatory-compliant hardware and reporting built for government and enterprise mandates.",
    products: ["AIS 140 GPS", "High Security Registration Plate", "Pollution Machine", "Printing Solution"],
    certs: ["AIS", "ARAI", "ICAT Certified", "BIS Certified"],
    productCategory: "compliance-services",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={1.3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    id: "industrial-iot",
    label: "Industrial IoT",
    desc: "Connected sensors and edge devices for industrial equipment monitoring and predictive maintenance.",
    products: ["IoT M2M – E-SIM", "BMS Card", "DC to DC Converter"],
    certs: ["IEC 62443"],
    productCategory: "connected-mobility",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={1.3}>
        <rect x="7" y="7" width="10" height="10" rx="1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3" />
      </svg>
    ),
  },
  {
    id: "connected-vehicle-platform",
    label: "Connected Vehicle Platform",
    desc: "A unified software platform connecting vehicles, devices, and fleet managers in real time.",
    products: ["APM Connect", "Rover Connect"],
    certs: ["ISO 20000-1"],
    productCategory: "smart-analytics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={1.3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M12 12h.008v.007H12V12z" />
      </svg>
    ),
  },
  {
    id: "road-safety",
    label: "Road Safety",
    desc: "Traffic safety equipment and signage systems designed to reduce accidents on Indian roads.",
    products: ["Traffic Cone", "Safety Jacket", "Construction Worker Jacket", "Permanent Signs", "Delineator"],
    certs: ["ISO 45001"],
    productCategory: "vehicle-safety",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={1.3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "ev-solutions",
    label: "EV Solutions",
    desc: "Power electronics and battery management systems purpose-built for electric vehicles.",
    products: ["DC to DC Converter", "BMS Card"],
    certs: ["CE", "RoHS"],
    productCategory: "connected-mobility",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={1.3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

export default function SolutionsSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = solutions.find((s) => s.id === openId) ?? null;

  useEffect(() => {
    const applyHash = () => {
      const match = window.location.hash.match(/^#solutions--(.+)$/);
      if (match && solutions.some((s) => s.id === match[1])) {
        setOpenId(match[1]);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <section id="solutions" className="relative py-24 px-6 lg:px-8 bg-surface overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #2F8FEF 0, #2F8FEF 1px, transparent 1px, transparent 14px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="accent-bar accent-bar-center text-3xl md:text-4xl font-black text-navy mb-4 inline-block">
            Solutions
          </h3>
          <p className="text-slate-500 max-w-xl mx-auto mt-4">
            Select a solution to learn more.
          </p>
        </div>

        {/* Icon row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-12 mb-4">
          {solutions.map((s) => {
            const isOpen = openId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setOpenId(isOpen ? null : s.id)}
                className="group flex flex-col items-center text-center gap-4"
              >
                <div
                  className={`transition-transform duration-200 ${
                    isOpen ? "text-primary scale-110" : "text-primary/80 group-hover:text-primary group-hover:scale-105"
                  }`}
                >
                  {s.icon}
                </div>
                <span
                  className={`text-sm font-semibold transition-colors ${
                    isOpen ? "text-primary" : "text-navy/80 group-hover:text-primary"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Expanded detail panel */}
        {active && (
          <div className="mt-10 bg-white rounded-2xl border border-border p-8 md:p-10">
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-xl font-black text-navy">{active.label}</h4>
              <button
                onClick={() => setOpenId(null)}
                aria-label="Close"
                className="text-navy/40 hover:text-navy transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-slate-500 text-sm mb-8 max-w-2xl">{active.desc}</p>

            {/* Related products */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {active.products.map((p) => (
                <div key={p} className="rounded-xl border border-border bg-surface overflow-hidden">
                  <div className="aspect-[16/9] bg-white flex items-center justify-center">
                    <svg className="w-8 h-8 text-navy/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
                    </svg>
                  </div>
                  <p className="text-sm font-bold text-navy px-4 py-3">{p}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {active.certs.map((cert) => (
                  <span
                    key={cert}
                    className="px-3 py-1.5 rounded-full border border-border bg-surface text-xs font-semibold text-navy/60"
                  >
                    {cert}
                  </span>
                ))}
              </div>
              <a
                href={`#products--${active.productCategory}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = `products--${active.productCategory}`;
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-navy transition-colors"
              >
                View all in Products
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
