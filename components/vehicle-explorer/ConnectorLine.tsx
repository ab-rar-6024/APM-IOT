"use client";

import SVGConnector from "./SVGConnector";
import type { HotspotProduct } from "@/lib/vehicle-hotspot-data";

export default function ConnectorLine({
  product,
  active,
  delay,
}: {
  product: HotspotProduct;
  active: boolean;
  delay: number;
}) {
  return (
    <>
      <SVGConnector
        from={product.truckAnchor}
        to={product.position}
        color={product.lineColor}
        width={product.lineWidth}
        lineStyle={product.lineStyle}
        type={product.lineType}
        animate={product.animation === "draw"}
        active={active}
        delay={delay}
      />
      {/* Pulsing anchor dot on the truck */}
      <span
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: `${product.truckAnchor.x}%`,
          top: `${product.truckAnchor.y}%`,
          width: active ? 10 : 7,
          height: active ? 10 : 7,
          backgroundColor: product.lineColor,
          boxShadow: active
            ? `0 0 0 6px ${product.lineColor}33, 0 0 12px 2px ${product.lineColor}99`
            : `0 0 0 3px ${product.lineColor}22`,
          transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </>
  );
}
