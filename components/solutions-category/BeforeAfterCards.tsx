"use client";

import { CheckCircle2, XCircle } from "lucide-react";

export default function BeforeAfterCards({
  beforeTitle = "Without",
  afterTitle = "With",
  beforeItems,
  afterItems
}: {
  beforeTitle?: string;
  afterTitle?: string;
  beforeItems: string[];
  afterItems: string[];
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
        <span className="text-[10px] uppercase tracking-widest font-black text-rose-500 block mb-3">
          {beforeTitle}
        </span>
        <ul className="space-y-2.5">
          {beforeItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 leading-snug">
              <XCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
        <span className="text-[10px] uppercase tracking-widest font-black text-emerald-600 block mb-3">
          {afterTitle}
        </span>
        <ul className="space-y-2.5">
          {afterItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 leading-snug">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
