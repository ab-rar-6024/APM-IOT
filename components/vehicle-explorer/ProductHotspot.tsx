"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { HotspotProduct } from "@/lib/vehicle-hotspot-data";
import ProductLabel from "./ProductLabel";

export default function ProductHotspot({
  product,
  index,
  isHovered,
  isClicked,
  onHoverChange,
  onClick,
}: {
  product: HotspotProduct;
  index: number;
  isHovered: boolean;
  isClicked: boolean;
  onHoverChange: (id: string | null) => void;
  onClick: () => void;
}) {
  const dx = product.truckAnchor.x - product.position.x;
  const dy = product.truckAnchor.y - product.position.y;
  const mag = Math.sqrt(dx * dx + dy * dy) || 1;
  const startX = (dx / mag) * 60;
  const startY = (dy / mag) * 60;

  const active = isHovered || isClicked;

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${product.position.x}%`, top: `${product.position.y}%` }}
      initial={{ opacity: 0, scale: 0.4, x: startX, y: startY }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ delay: 0.3 + index * 0.09, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        onMouseEnter={() => onHoverChange(product.id)}
        onMouseLeave={() => onHoverChange(null)}
        className="relative block"
      >
        <ProductLabel
          name={product.name}
          description={product.description}
          slug={product.slug}
          isHovered={isHovered && !isClicked}
          isClicked={isClicked}
        />
        <motion.button
          onClick={onClick}
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border overflow-hidden shadow-md transition-all duration-300 ${
            active ? "border-primary shadow-xl shadow-primary/30 ring-4 ring-primary/15" : "border-slate-200"
          }`}
        >
          <Image
            src={product.image}
            alt={product.name}
            width={56}
            height={56}
            className="object-contain w-full h-full p-2 pointer-events-none"
          />
        </motion.button>
      </div>
    </motion.div>
  );
}

