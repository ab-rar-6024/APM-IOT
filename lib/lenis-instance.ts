"use client";

import type Lenis from "lenis";

// The site's single global Lenis instance (components/SmoothScroll.tsx), exposed here so other
// components can trigger a scroll through Lenis itself instead of calling the native
// `element.scrollIntoView({ behavior: "smooth" })`, which Lenis cancels mid-animation by
// re-syncing to the actual scroll position on every native scroll event it observes.
let lenisInstance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function smoothScrollTo(target: Element | null, options?: { offset?: number }) {
  if (!target) return;
  if (lenisInstance) {
    // Force Lenis to recompute its cached content-height/limit before scrolling — newly
    // revealed content (this scroll almost always follows something just mounting) grows the
    // page, but Lenis's own ResizeObserver is debounced and may not have caught up yet, which
    // would otherwise clamp the target to a stale, too-short limit.
    lenisInstance.resize();
    lenisInstance.scrollTo(target as HTMLElement, { offset: options?.offset ?? 0 });
  } else {
    target.scrollIntoView({ block: "start" });
  }
}

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
