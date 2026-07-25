"use client";

import { ArrowRight } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

export default function FlowDiagram({
  steps,
  outputLabel,
  outputValue,
  outputPrefix = "",
  outputSuffix = ""
}: {
  steps: string[];
  outputLabel?: string;
  outputValue?: number;
  outputPrefix?: string;
  outputSuffix?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-y-6 gap-x-1 justify-center">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center text-center w-28 md:w-32">
              <span className="w-9 h-9 rounded-full bg-navy text-white text-xs font-black flex items-center justify-center mb-2 shrink-0">
                {i + 1}
              </span>
              <span className="text-xs font-bold text-navy leading-snug">{step}</span>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-primary/50 mx-1 shrink-0 hidden sm:block" />
            )}
          </div>
        ))}
      </div>

      {outputLabel && outputValue !== undefined && (
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <span className="text-[10px] uppercase tracking-wide text-slate-400 font-bold block mb-1">
            {outputLabel}
          </span>
          <AnimatedCounter
            value={outputValue}
            prefix={outputPrefix}
            suffix={outputSuffix}
            className="font-mono tabular-nums font-black text-2xl text-primary"
          />
        </div>
      )}
    </div>
  );
}
