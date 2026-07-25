"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/solutions-data";

function buildHighlights(product: Product) {
  const features = product.features.slice(0, 4);
  const specs = product.specifications.slice(0, 4).map((s) => `${s.label}: ${s.value}`);
  return [...features, ...specs].slice(0, 8);
}

/**
 * Orbit chip: outer static positioner places it at a fixed angle + radius on
 * the circle (rotate then translate, pivoted at the ring's center). The two
 * counter-rotations inside cancel, in order, the ring's continuous spin and
 * this item's own static angle — so the chip's *position* sweeps clockwise
 * around the image while its text always stays upright and readable.
 *
 * On mount, the chip bursts outward from the image (its local frame is
 * already fully de-rotated at this point, so a plain x/y spring reads as a
 * straight launch from center to its resting spot on the ring) before
 * settling into the continuous orbit.
 */
function OrbitChip({ text, angle, index }: { text: string; angle: number; index: number }) {
  const rad = (angle * Math.PI) / 180;
  const launchDistance = 70;

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `rotate(${angle}deg) translate(clamp(130px, 16vw, 170px), 0)`,
        transformOrigin: "0 0",
      }}
    >
      <div className="animate-orbit-reverse">
        <div style={{ transform: `rotate(${-angle}deg)` }}>
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.3,
              x: -Math.cos(rad) * launchDistance,
              y: -Math.sin(rad) * launchDistance,
            }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 160,
              damping: 18,
              mass: 0.7,
              delay: 0.75 + index * 0.09,
            }}
            className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy shadow-md shadow-navy/5"
          >
            {text}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ProductHero({ product }: { product: Product }) {
  const highlights = buildHighlights(product);

  return (
    <section className="relative overflow-hidden bg-surface py-16 md:py-24 px-6 lg:px-8">
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-navy/10 blur-3xl pointer-events-none" />

      {/* Product name only — kept clear of the orbit so nothing collides with it */}
      <div className="relative z-20 max-w-4xl mx-auto text-center mb-6 md:mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-black text-navy leading-tight"
        >
          {product.name}
        </motion.h1>
      </div>

      {/* Orbit diagram — desktop/tablet. Chips (features + technical specs)
          are placed at fixed angles around the circle and slowly revolve
          clockwise; a nested counter-rotation keeps every label upright
          throughout the motion. Generous min-height + overflow-hidden keeps
          the whole ring's reach clipped well clear of the name above and the
          CTA below, regardless of viewport width. */}
      <div className="relative hidden sm:flex justify-center items-center min-h-[36rem] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 210, damping: 16, mass: 0.8, delay: 0.15 }}
          className="relative z-10 w-56 h-56 md:w-64 md:h-64 rounded-full bg-white border border-slate-200 shadow-xl shadow-navy/5 overflow-hidden"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="256px"
            className="object-contain p-9"
            priority
          />
        </motion.div>

        <div className="absolute inset-0 animate-orbit-slow">
          {highlights.map((text, i) => (
            <OrbitChip key={text} text={text} angle={(360 / highlights.length) * i} index={i} />
          ))}
        </div>
      </div>

      {/* Mobile fallback — image + highlight chips, static (orbiting text is
          hard to track on small screens) */}
      <div className="sm:hidden max-w-md mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 210, damping: 16, mass: 0.8, delay: 0.15 }}
          className="relative w-48 h-48 mx-auto mb-8 rounded-full bg-white border border-slate-200 shadow-xl shadow-navy/5 overflow-hidden"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="192px"
            className="object-contain p-7"
            priority
          />
        </motion.div>
        <div className="grid grid-cols-2 gap-3">
          {highlights.map((text) => (
            <div
              key={text}
              className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2.5"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="text-xs font-bold text-navy leading-snug">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA — sits below the orbit, right before Overview */}
      <div className="relative z-20 max-w-2xl mx-auto text-center mt-2 sm:mt-6">
        <motion.a
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          href="#contact-form"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white bg-navy hover:bg-primary transition-colors"
        >
          Request Demo
        </motion.a>
      </div>
    </section>
  );
}
