'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

// Each in-house capability becomes one full-screen "step" that comes into
// focus as you scroll to it — exact same structure/mechanic as Science.tsx.
// `image` is a real photo (not an illustration) shown as a crossfading
// background on the right while its step is in focus.
const STEPS = [
  { n: '01', title: 'Component Procurement', detail: 'Sourced & verified in-house', image: '/images/manufacturing/01-component-procurement.jpg' },
  { n: '02', title: 'Supply Chain Management', detail: 'End-to-end control', image: '/images/manufacturing/02-supply-chain.jpg' },
  { n: '03', title: 'SMT PCB Assembly', detail: 'Surface-mount, in-house line', image: '/images/manufacturing/03-smt-assembly.jpg' },
  { n: '04', title: 'Through-hole Assembly', detail: 'Manual & automated stations', image: '/images/manufacturing/04-through-hole-assembly.jpg' },
  { n: '05', title: 'Product Assembly Line', detail: 'Full unit build', image: '/images/manufacturing/05-assembly-line.jpg' },
  { n: '06', title: 'Firmware Programming', detail: 'Flashed pre-dispatch', image: '/images/manufacturing/06-firmware-programming.jpg' },
  { n: '07', title: 'Functional Testing', detail: '100% unit verification', image: '/images/manufacturing/07-functional-testing.jpg' },
  { n: '08', title: 'Burn-in Testing', detail: 'Extended stress run', image: '/images/manufacturing/08-burn-in-testing.jpg' },
  { n: '09', title: 'Quality Inspection', detail: 'Manual + automated QC', image: '/images/manufacturing/09-quality-inspection.jpg' },
  { n: '10', title: 'Packaging', detail: 'Retail & bulk ready', image: '/images/manufacturing/10-packaging.jpg' },
  { n: '11', title: 'OEM & White Label Manufacturing', detail: 'Custom branding runs', image: '/images/manufacturing/11-oem-white-label.jpg' },
  { n: '12', title: 'Dispatch & Logistics', detail: 'Shipped worldwide', image: '/images/manufacturing/12-dispatch-logistics.jpg' },
];

function FocusStep({ step }: { step: typeof STEPS[0] }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // Triggers slightly earlier/later to give the animation more room to breathe
    offset: ["start 75%", "end 25%"]
  });

  // Spring physics act as a shock absorber for chunky mouse wheels
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, // How fast it tracks the scroll
    damping: 30,    // How much friction (prevents bouncing)
    restDelta: 0.001
  });

  const opacity = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [0.15, 1, 1, 0.15]);
  const scale = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [0.92, 1, 1, 0.92]);
  const blur = useTransform(smoothProgress, [0, 0.35, 0.65, 1], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, filter: blur }}
      className="py-[15vh] md:py-[20vh] relative will-change-transform"
    >
      <div className="flex flex-col gap-6 w-fit max-w-xl bg-white/95 backdrop-blur-md rounded-2xl px-6 py-6 md:px-8 md:py-7 shadow-[0_20px_60px_-15px_rgba(15,58,117,0.25)] border border-white/60">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.2em] text-primary border border-primary/30 px-2.5 py-1 rounded-sm uppercase">
            Phase {step.n}
          </span>
          <span className="text-[10px] font-mono tracking-widest text-navy/40 uppercase">
            {step.detail}
          </span>
        </div>

        <h3 className="text-[2.5rem] md:text-[3.5rem] font-black leading-[1.1] text-navy tracking-tight">
          {step.title}
        </h3>
      </div>
    </motion.div>
  );
}

export default function ManufacturingSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothGlobalProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20
  });

  const glowY = useTransform(smoothGlobalProgress, [0, 1], ["0%", "100%"]);

  // Reuses the section's own scroll progress (rather than a second useScroll
  // target) to pick which step's photo is active, roughly excluding the
  // leading/trailing spacer so the crossfade tracks the visible steps.
  const indexMotion = useTransform(smoothGlobalProgress, [0.04, 0.96], [0, STEPS.length - 1]);
  useMotionValueEvent(indexMotion, "change", (latest) => {
    const clamped = Math.min(STEPS.length - 1, Math.max(0, Math.round(latest)));
    setActiveIndex((prev) => (prev === clamped ? prev : clamped));
  });

  return (
    <section
      id="manufacturing"
      ref={containerRef}
      // NOTE: overflow-hidden must NOT go here — it's an ancestor of the
      // sticky left column below, and overflow:hidden on any ancestor of a
      // position:sticky element breaks its stickiness.
      className="bg-white relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(rgba(47,143,239,0.35)_1px,transparent_1.5px)] bg-[size:28px_28px] opacity-[0.15] pointer-events-none" />

      {/* Ambient Moving Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-navy/25 hidden md:block" />
        <motion.div
          style={{ top: glowY }}
          className="absolute right-0 w-[50vw] h-[50vh] bg-primary/20 rounded-full blur-[150px] opacity-60 -translate-y-1/2 will-change-transform"
        />
      </div>

      {/* Real-photo panel — full-bleed to the browser's right edge (not
          capped by the max-w content wrapper below), sticky, crossfading
          to the relevant photo as each step comes into focus. */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-[46vw] pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={STEPS[activeIndex].n}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={STEPS[activeIndex].image}
                alt={STEPS[activeIndex].title}
                fill
                sizes="46vw"
                className="object-cover"
                priority={activeIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
          {/* Soft blend into the white content area on the left edge only —
              the rest of the photo stays at full clarity. */}
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white to-transparent" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">

          {/* LEFT SIDE: Sticky Header */}
          <div className="md:col-span-5 relative">
            <div className="sticky top-0 h-screen flex flex-col justify-center py-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <span className="block w-8 h-[1px] bg-primary" />
                  <span className="text-primary text-[10px] tracking-[0.35em] uppercase font-medium">
                    In-House Capability
                  </span>
                </div>

                <h2 className="text-navy font-black leading-[1.05] tracking-[-0.02em] mb-8 break-words"
                    style={{ fontSize: 'clamp(2.25rem, 3.2vw, 3.5rem)' }}>
                  Designed. Developed. <br />
                  <em className="not-italic text-primary">Manufactured by APM.</em>
                </h2>

                <p className="text-[14px] text-navy/60 leading-relaxed max-w-[35ch]">
                  Every stage of the build, from raw component to dispatched unit, mapped one step at a time.
                </p>
              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDE: The Focus Track */}
          <div className="md:col-span-7 relative z-10 pb-[20vh]">
            <div className="hidden md:block h-[30vh]" />
            <div className="flex flex-col">
              {STEPS.map((step) => (
                <FocusStep key={step.n} step={step} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
