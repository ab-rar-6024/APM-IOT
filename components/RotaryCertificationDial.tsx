"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface RotaryCertificationDialProps {
  /** Certification names — add, remove, or reorder freely; nothing else needs to change. */
  items: string[];
  /** Controlled active index. Omit to let the dial manage its own selection. */
  value?: number;
  defaultIndex?: number;
  onChange?: (index: number, item: string) => void;
  /** Infinite wraparound instead of stopping at the first/last item. */
  loop?: boolean;
  /** Glow/accent color for the active item. */
  accentColor?: string;
  /** Vertical distance in px between neighboring items at rest. */
  itemHeight?: number;
  /** How many neighbors to render on each side of the active item. */
  visibleRadius?: number;
  className?: string;
}

const DEFAULT_ITEMS = [
  "Retro-Reflecting Tape — Conformity of Production",
  "AIS 090 Certification",
  "AIS 140 Certification",
  "Automotive Industry Standard Compliance",
  "Type Approval Certificate",
  "Quality Assurance Certification",
  "ISO Compliance Documentation",
  "Product Validation Certificate",
];

const DRAG_THRESHOLD = 4;
const WHEEL_SNAP_DELAY = 140;
const VELOCITY_WINDOW = 120; // ms of pointer history kept for inertia projection

function wrappedDistance(i: number, active: number, count: number, loop: boolean) {
  const raw = i - active;
  if (!loop || count <= 1) return raw;
  const wrapped = ((raw % count) + count) % count;
  return wrapped > count / 2 ? wrapped - count : wrapped;
}

function wrapIndex(i: number, count: number) {
  return ((Math.round(i) % count) + count) % count;
}

export default function RotaryCertificationDial({
  items = DEFAULT_ITEMS,
  value,
  defaultIndex = 0,
  onChange,
  loop = true,
  accentColor = "#3B82F6",
  itemHeight = 108,
  visibleRadius = 2,
  className = "",
}: RotaryCertificationDialProps) {
  const reduceMotion = useReducedMotion();
  const count = items.length;

  const [internalIndex, setInternalIndex] = useState(() => wrapIndex(defaultIndex, count));
  const activeIndex = value !== undefined ? wrapIndex(value, count) : internalIndex;

  const [dragOffset, setDragOffset] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [velocityBlur, setVelocityBlur] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const historyRef = useRef<{ t: number; y: number }[]>([]);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  // Mirrors `dragOffset` so handlers can read the latest value without
  // calling commit() (which triggers other components' setState) from
  // inside a setState updater function, which React disallows.
  const dragOffsetRef = useRef(0);
  useEffect(() => {
    dragOffsetRef.current = dragOffset;
  }, [dragOffset]);

  const commit = useCallback(
    (rawIndex: number) => {
      const next = wrapIndex(rawIndex, count);
      if (value === undefined) setInternalIndex(next);
      if (next !== activeIndexRef.current) onChange?.(next, items[next]);
      setDragOffset(0);
      setIsInteracting(false);
    },
    [count, items, onChange, value]
  );

  // Controlled sync: retarget smoothly if the active index changes from
  // outside this component (keyboard elsewhere, external navigation, etc).
  useEffect(() => {
    if (value === undefined) return;
    setDragOffset(0);
  }, [value]);

  const nudge = useCallback(
    (delta: number) => {
      if (isInteracting) return;
      commit(activeIndexRef.current + delta);
    },
    [commit, isInteracting]
  );

  // Wheel: notchy wheels move exactly one item per tick; trackpads scroll
  // continuously and settle to the nearest item after a short pause.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaMode === 1 ? e.deltaY * 24 : e.deltaY;
      const step = Math.max(-1, Math.min(1, delta / itemHeight));
      setIsInteracting(true);
      setDragOffset((prev) => prev + step);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => {
        commit(activeIndexRef.current + dragOffsetRef.current);
      }, WHEEL_SNAP_DELAY);
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    };
  }, [commit, itemHeight]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const startY = e.clientY;
      const startIndex = activeIndexRef.current;
      let moved = false;
      historyRef.current = [{ t: performance.now(), y: startY }];

      function onMove(ev: PointerEvent) {
        const deltaY = ev.clientY - startY;
        if (!moved && Math.abs(deltaY) > DRAG_THRESHOLD) {
          moved = true;
          setIsInteracting(true);
        }
        if (moved) {
          historyRef.current.push({ t: performance.now(), y: ev.clientY });
          historyRef.current = historyRef.current.filter((p) => performance.now() - p.t < VELOCITY_WINDOW);
          setDragOffset(-deltaY / itemHeight);
        }
      }

      function onUp(ev: PointerEvent) {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        if (!moved) return;

        const history = historyRef.current;
        let velocity = 0; // px/ms
        if (history.length >= 2) {
          const first = history[0];
          const last = history[history.length - 1];
          const dt = last.t - first.t;
          if (dt > 0) velocity = (last.y - first.y) / dt;
        }
        setVelocityBlur(Math.min(6, Math.abs(velocity) * 14));

        const deltaY = ev.clientY - startY;
        const liveOffset = -deltaY / itemHeight;
        const flung = liveOffset - velocity * 4.5; // project inertia from release velocity
        commit(startIndex + flung);

        window.setTimeout(() => setVelocityBlur(0), 260);
      }

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [commit, itemHeight]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        nudge(-1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        nudge(1);
      } else if (e.key === "Home") {
        e.preventDefault();
        commit(0);
      } else if (e.key === "End") {
        e.preventDefault();
        commit(count - 1);
      }
    },
    [commit, count, nudge]
  );

  const activeContinuous = activeIndex + dragOffset;

  const slots = useMemo(() => {
    return items
      .map((label, i) => ({ label, i, distance: wrappedDistance(i, activeContinuous, count, loop) }))
      .filter((s) => Math.abs(s.distance) <= visibleRadius + 1);
  }, [items, activeContinuous, count, loop, visibleRadius]);

  return (
    <div
      ref={containerRef}
      role="listbox"
      tabIndex={0}
      aria-label="Certification selector"
      aria-activedescendant={`rotary-cert-${activeIndex}`}
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
      className={`relative w-full h-full outline-none select-none cursor-grab active:cursor-grabbing ${className}`}
      style={{ touchAction: "none", perspective: "1000px" }}
    >
      {slots.map(({ label, i, distance }) => {
        const absDist = Math.abs(distance);
        const isActive = Math.round(activeContinuous + 1e-6) === i && absDist < 0.5;
        const y = distance * itemHeight;
        const rotateX = reduceMotion ? 0 : Math.max(-56, Math.min(56, distance * 24));
        const scale = Math.max(0.62, 1 - Math.min(0.4, absDist * 0.18));
        const opacity = isActive ? 1 : Math.max(0.14, Math.min(0.6, 1 - absDist * 0.32));
        const baseBlur = reduceMotion ? 0 : Math.min(3.5, Math.max(0, (absDist - 0.6) * 1.6));
        const blurPx = baseBlur + (isInteracting || velocityBlur > 0 ? velocityBlur * Math.min(1, absDist + 0.3) : 0);
        const fontSize = isActive
          ? "clamp(1.5rem, 2.1vw, 2.1rem)"
          : absDist < 1.5
          ? "clamp(1.05rem, 1.4vw, 1.4rem)"
          : "clamp(0.9rem, 1.1vw, 1.1rem)";

        return (
          <motion.div
            key={i}
            id={`rotary-cert-${i}`}
            role="option"
            aria-selected={isActive}
            onClick={() => !isInteracting && commit(i)}
            initial={false}
            animate={{
              y,
              rotateX,
              scale,
              opacity,
              filter: `blur(${blurPx}px)`,
            }}
            transition={
              isInteracting || reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 260, damping: 28, mass: 0.9 }
            }
            className="absolute inset-x-0 top-1/2 flex items-center justify-center px-4 cursor-pointer"
            style={{ translateY: "-50%", transformStyle: "preserve-3d" }}
          >
            <span
              className="text-center leading-tight max-w-[420px] transition-colors duration-300"
              style={{
                fontSize,
                fontWeight: isActive ? 700 : absDist < 1.5 ? 500 : 400,
                color: isActive ? "#173A75" : "#94A3B8",
                textShadow: isActive ? `0 0 22px ${accentColor}33` : "none",
              }}
            >
              {label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
