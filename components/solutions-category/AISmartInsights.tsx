"use client";

import { Fuel, Scale, Thermometer, AlertOctagon, Video, Wrench, type LucideIcon } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";

const INSIGHTS = [
  { icon: Fuel, title: "Fuel Theft Detected", msg: "Sudden fuel-volume drop flagged in main diesel tank.", tone: "danger" as const },
  { icon: Scale, title: "Payload Overloaded", msg: "Axle load exceeded legal limit on rear suspension.", tone: "danger" as const },
  { icon: Thermometer, title: "Temperature Threshold Exceeded", msg: "Cold-chain cargo temperature rose above safe limit.", tone: "warning" as const },
  { icon: AlertOctagon, title: "Harsh Braking Detected", msg: "Sudden deceleration event logged for driver coaching.", tone: "warning" as const },
  { icon: Video, title: "Accident Video Available", msg: "AI camera clip ready for claims and dispute review.", tone: "info" as const },
  { icon: Wrench, title: "Maintenance Due", msg: "Predictive service window opens within 4 days.", tone: "info" as const }
];

const TONE_STYLES = {
  danger: { border: "border-rose-200", bg: "bg-rose-50/60", icon: "bg-rose-100 text-rose-500" },
  warning: { border: "border-amber-200", bg: "bg-amber-50/60", icon: "bg-amber-100 text-amber-600" },
  info: { border: "border-primary/20", bg: "bg-primary/5", icon: "bg-primary/10 text-primary" }
};

function InsightCard({
  icon: Icon,
  title,
  msg,
  tone,
  index
}: {
  icon: LucideIcon;
  title: string;
  msg: string;
  tone: keyof typeof TONE_STYLES;
  index: number;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const style = TONE_STYLES[tone];

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? `${(index % 3) * 90}ms` : "0ms",
        transitionDuration: "550ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
      }}
      className={`rounded-2xl border ${style.border} ${style.bg} p-4 flex items-start gap-3 transition-all ${
        visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-6"
      }`}
    >
      <span className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${style.icon}`}>
        <Icon className="w-4 h-4" />
      </span>
      <div className="min-w-0">
        <span className="text-xs font-black text-navy block">{title}</span>
        <p className="text-xs text-slate-500 leading-snug mt-0.5">{msg}</p>
      </div>
    </div>
  );
}

export default function AISmartInsights() {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-1.5">AI Smart Insights</h3>
      <p className="text-sm text-slate-400 mb-5">Illustrative alerts APM Connect can raise across your fleet.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {INSIGHTS.map((insight, i) => (
          <InsightCard key={insight.title} {...insight} index={i} />
        ))}
      </div>
    </div>
  );
}
