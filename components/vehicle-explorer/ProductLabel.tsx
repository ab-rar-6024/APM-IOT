"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductLabel({
  name,
  description,
  slug,
  isHovered,
  isClicked,
}: {
  name: string;
  description?: string;
  slug: string;
  isHovered: boolean;
  isClicked: boolean;
}) {
  const visible = isHovered || isClicked;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.95 }}
          transition={{ duration: 0.18 }}
          className={`absolute left-1/2 -top-3 -translate-x-1/2 -translate-y-full z-50 ${
            isClicked
              ? "w-64 shadow-2xl rounded-xl bg-white border border-slate-100 overflow-hidden group/label"
              : "pointer-events-none whitespace-nowrap rounded-lg bg-navy px-3 py-1.5 shadow-lg"
          }`}
        >
          {isClicked ? (
            <Link href={`/products/${slug}`} className="block p-4 relative cursor-pointer">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <h4 className="font-bold text-navy text-sm leading-tight pr-6">{name}</h4>
                <div className="absolute top-4 right-4 text-primary bg-primary/10 rounded-full p-1 opacity-0 group-hover/label:opacity-100 transition-opacity">
                  <ArrowRight size={14} />
                </div>
              </div>
              {description && <p className="text-xs text-slate-500 leading-snug">{description}</p>}
            </Link>
          ) : (
            <span className="text-xs font-semibold text-white">{name}</span>
          )}
          <span
            className={`absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent ${
              isClicked ? "border-t-white" : "border-t-navy"
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

