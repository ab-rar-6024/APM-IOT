"use client";

import { useEffect, useRef, useState } from "react";
import { productCategories } from "@/lib/product-categories";
import { products } from "@/lib/solutions-data";

const descriptionByName: Record<string, string> = Object.fromEntries(
  products.map((p) => [p.name, p.shortDesc])
);

interface ServiceMultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function ServiceMultiSelect({ value, onChange }: ServiceMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setExpanded(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleValue = (name: string) => {
    onChange(value.includes(name) ? value.filter((v) => v !== name) : [...value, name]);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-left flex items-center justify-between gap-3 focus:outline-none focus:border-primary transition-colors bg-white"
      >
        <span className={`truncate ${value.length ? "text-navy" : "text-slate-400"}`}>
          {value.length ? value.join(", ") : "Select service / product"}
        </span>
        <svg
          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-20 mt-2 w-full max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg"
        >
          {productCategories.map((category) => (
            <div key={category.id} className="border-b border-slate-100 last:border-b-0">
              <div className="px-4 pt-3 pb-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                {category.label}
              </div>
              {category.products.map((name) => {
                const description = descriptionByName[name];
                const isExpanded = expanded === name;
                const isChecked = value.includes(name);
                return (
                  <div key={name} className="px-2">
                    <div className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-50">
                      <label className="flex items-center gap-2.5 flex-1 cursor-pointer text-sm text-navy">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleValue(name)}
                          className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/40"
                        />
                        {name}
                      </label>
                      {description && (
                        <button
                          type="button"
                          onClick={() => setExpanded(isExpanded ? null : name)}
                          aria-label={isExpanded ? "Hide description" : "Show description"}
                          className="p-1 text-slate-400 hover:text-navy transition-colors"
                        >
                          <svg
                            className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {isExpanded && description && (
                      <p className="px-9 pb-3 -mt-1 text-xs text-slate-500 leading-relaxed">{description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
