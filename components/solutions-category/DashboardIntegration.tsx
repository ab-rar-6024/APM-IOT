"use client";

import type { ReactNode } from "react";
import { ShieldCheck, Gauge, FileCheck2, Wrench, UserCheck2, IndianRupee } from "lucide-react";
import type { VehicleType } from "@/data/vehicle-apm-config";
import { computeFleetMetrics } from "@/lib/fleet-metrics";
import AnimatedCounter from "./AnimatedCounter";

function DashboardTile({
  icon,
  label,
  value,
  suffix = "%",
  prefix = "",
  sublabel,
  delay
}: {
  icon: ReactNode;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  sublabel?: string;
  delay: number;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className="animate-fade-slide-up rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-2"
    >
      <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">{icon}</span>
      <span className="text-[11px] uppercase tracking-wide text-slate-400 font-bold">{label}</span>
      <AnimatedCounter prefix={prefix} value={value} suffix={suffix} className="block text-2xl font-black text-navy font-mono tabular-nums" />
      {sublabel && <span className="text-xs text-slate-400 leading-tight">{sublabel}</span>}
    </div>
  );
}

export default function DashboardIntegration({
  vehicle,
  productIds,
  fleetSize
}: {
  vehicle: VehicleType;
  productIds: string[];
  fleetSize: number;
}) {
  const metrics = computeFleetMetrics(vehicle, productIds);
  const annualSavings = metrics.savingsPerVehicle * fleetSize;

  const tiles = [
    { icon: <ShieldCheck className="w-5 h-5" />, label: "Fleet Safety Score", value: metrics.safetyScore },
    { icon: <Gauge className="w-5 h-5" />, label: "Fuel Efficiency", value: metrics.fuelEfficiency },
    {
      icon: <FileCheck2 className="w-5 h-5" />,
      label: "Compliance Status",
      value: metrics.compliancePercent,
      sublabel: metrics.complianceLabel
    },
    { icon: <Wrench className="w-5 h-5" />, label: "Maintenance Health", value: metrics.maintenanceHealth },
    { icon: <UserCheck2 className="w-5 h-5" />, label: "Driver Behaviour Score", value: metrics.driverBehaviour },
    {
      icon: <IndianRupee className="w-5 h-5" />,
      label: "Estimated Annual Savings",
      value: Math.round(annualSavings),
      prefix: "₹",
      suffix: ""
    }
  ];

  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-1.5">Dashboard Integration</h3>
      <p className="text-sm text-slate-400 mb-5">
        Fleet indicators for {vehicle.name.toLowerCase()}, based on its full recommended feature set.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map((tile, i) => (
          <DashboardTile key={tile.label} {...tile} delay={i * 100} />
        ))}
      </div>
    </div>
  );
}
