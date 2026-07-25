"use client";

import type { ReactNode } from "react";

export interface ComparisonBar {
  label: string;
  before: number;
  after: number;
}

export default function ComparisonBarChart({
  title,
  icon,
  beforeLabel = "Before",
  afterLabel = "After",
  bars,
  maxValue,
  formatValue = (v: number) => `${Math.round(v)}%`
}: {
  title?: string;
  icon?: ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  bars: ComparisonBar[];
  maxValue?: number;
  formatValue?: (v: number) => string;
}) {
  if (bars.length === 0) return null;

  const computedMax =
    maxValue ?? Math.max(1, ...bars.flatMap((b) => [b.before, b.after]));

  const heightPercent = (v: number) => Math.max(2, Math.min(100, (v / computedMax) * 100));

  const gridLabels = [4, 3, 2, 1, 0].map((step) => formatValue((computedMax / 4) * step));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      {title && (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <h4 className="text-sm font-black uppercase tracking-widest text-navy flex items-center gap-2">
            {icon} {title}
          </h4>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wide">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-3 h-3 rounded-sm bg-slate-300" /> {beforeLabel}
            </span>
            <span className="flex items-center gap-1.5 text-primary">
              <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-primary to-emerald-400" /> {afterLabel}
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {/* Shared Y axis */}
        <div className="flex flex-col justify-between h-64 pb-7 text-[11px] font-mono text-slate-300 text-right w-14 shrink-0">
          {gridLabels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>

        {/* Chart area */}
        <div className="flex-1 min-w-0 overflow-x-auto">
          <div className="relative h-64 border-b border-slate-200 min-w-[280px]" style={{ minWidth: `${bars.length * 140}px` }}>
            {/* Gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-slate-100 w-full" />
              ))}
            </div>

            {/* Grouped bars */}
            <div className="absolute inset-0 flex items-end justify-around gap-8 px-4">
              {bars.map((bar) => (
                <div key={bar.label} className="flex items-end gap-2 h-full">
                  <div className="relative w-8 md:w-10 h-full flex items-end">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] font-mono font-bold text-slate-400 whitespace-nowrap">
                      {formatValue(bar.before)}
                    </span>
                    <div
                      className="w-full bg-slate-300 rounded-t-lg transition-all duration-700 ease-out"
                      style={{ height: `${heightPercent(bar.before)}%` }}
                    />
                  </div>
                  <div className="relative w-8 md:w-10 h-full flex items-end">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] font-mono font-bold text-primary whitespace-nowrap">
                      {formatValue(bar.after)}
                    </span>
                    <div
                      className="w-full bg-gradient-to-t from-primary to-emerald-400 rounded-t-lg transition-all duration-700 ease-out"
                      style={{ height: `${heightPercent(bar.after)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* X axis labels */}
          <div className="flex justify-around gap-8 px-4 mt-3">
            {bars.map((bar) => (
              <span key={bar.label} className="text-xs font-bold text-navy text-center leading-tight" style={{ width: "5rem" }}>
                {bar.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
