import type { Product } from "@/lib/solutions-data";
import ProductCard from "./ProductCard";

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-black text-navy mb-6">Related Products</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
