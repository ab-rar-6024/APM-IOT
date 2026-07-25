"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { VehicleHotspotConfig } from "@/lib/vehicle-hotspot-data";
import TruckViewer from "./TruckViewer";
import ConnectorLine from "./ConnectorLine";
import ProductHotspot from "./ProductHotspot";

export default function HotspotRenderer({ config }: { config: VehicleHotspotConfig }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const products = config.products.filter((p) => p.visible).sort((a, b) => a.order - b.order);

  return (
    <div className="w-full">
      {/* Desktop / tablet interactive diagram — fully data-driven from config */}
      <div className="relative hidden sm:block w-full max-w-6xl mx-auto aspect-[16/10]">
        <TruckViewer src={config.truckImage} />
        {products.map((product, i) => (
          <ConnectorLine
            key={`line-${product.id}`}
            product={product}
            active={hoveredId === product.id || clickedId === product.id}
            delay={0.3 + i * 0.09}
          />
        ))}
        {products.map((product, i) => (
          <ProductHotspot
            key={`hotspot-${product.id}`}
            product={product}
            index={i}
            isHovered={hoveredId === product.id}
            isClicked={clickedId === product.id}
            onHoverChange={setHoveredId}
            onClick={() => setClickedId(clickedId === product.id ? null : product.id)}
          />
        ))}
      </div>

      {/* Mobile fallback — same config, simplified layout */}
      <div className="sm:hidden">
        <div className="relative w-full max-w-xs mx-auto aspect-square mb-8">
          <TruckViewer src={config.truckImage} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm active:scale-95 transition-transform"
            >
              <span
                className="block w-8 h-0.5 rounded-full mb-1"
                style={{ backgroundColor: product.lineColor }}
              />
              <span className="relative w-14 h-14 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="object-contain w-full h-full p-1.5"
                />
              </span>
              <span className="text-xs font-bold text-navy leading-snug">{product.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
