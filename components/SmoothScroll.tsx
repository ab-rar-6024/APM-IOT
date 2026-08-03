"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenisInstance } from "@/lib/lenis-instance";

/**
 * Site-wide inertia scrolling. Native wheel/touch scroll is instantaneous and
 * jumpy by comparison — Lenis smooths every scroll input into eased momentum
 * for the "buttery" feel, while still driving the real document scroll
 * position (so position:fixed/sticky effects like the pinned hero keep
 * working unchanged).
 */
export default function SmoothScroll() {
  useEffect(() => {
    // The browser's native scroll-restoration re-applies the previous scroll
    // offset on reload, which fights Lenis's own position on mount and can
    // make a below-the-fold image get measured as the page's LCP element.
    // Every navigation should start from the top, same as a real first visit.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.1,
      // Nested panels (dropdowns, product lists, tables with horizontal
      // overflow) scroll natively instead of fighting Lenis for the wheel
      // event — but only when they're actually overflowing at that moment,
      // so a table that only sometimes needs horizontal scroll doesn't
      // create a dead zone the rest of the time.
      allowNestedScroll: true,
    });

    setLenisInstance(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      setLenisInstance(null);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
