"use client";

import { motion } from "framer-motion";
import type { LineStyle, LineType } from "@/lib/vehicle-hotspot-data";

function buildPath(from: { x: number; y: number }, to: { x: number; y: number }, type: LineType) {
  if (type === "straight") {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }
  if (type === "elbow") {
    const midX = from.x + (to.x - from.x) * 0.5;
    return `M ${from.x} ${from.y} L ${midX} ${from.y} L ${midX} ${to.y} L ${to.x} ${to.y}`;
  }
  const dx = to.x - from.x;
  return `M ${from.x} ${from.y} C ${from.x + dx * 0.5} ${from.y}, ${to.x - dx * 0.5} ${to.y}, ${to.x} ${to.y}`;
}

export default function SVGConnector({
  from,
  to,
  color,
  width,
  lineStyle,
  type,
  animate,
  active,
  delay = 0,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
  width: number;
  lineStyle: LineStyle;
  type: LineType;
  animate: boolean;
  active: boolean;
  delay?: number;
}) {
  const d = buildPath(from, to, type);
  const dashArray = lineStyle === "dashed" ? "3 2" : undefined;

  return (
    <svg
      className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Glow layer */}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width * (active ? 4 : 2.5)}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ filter: `blur(${active ? 4 : 2.5}px)` }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: active ? 0.55 : 0.25 }}
        transition={{ pathLength: { duration: animate ? 1.1 : 0, delay, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
      />
      {/* Crisp line */}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={active ? width * 1.6 : width}
        strokeDasharray={dashArray}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ pathLength: { duration: animate ? 1.1 : 0, delay, ease: "easeInOut" }, opacity: { duration: 0.3, delay } }}
      />
    </svg>
  );
}
