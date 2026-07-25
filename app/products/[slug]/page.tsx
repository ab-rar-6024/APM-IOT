import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProduct, getRelatedProducts } from "@/lib/solutions-data";
import ProductHero from "@/components/solutions/ProductHero";
import ContactForm from "@/components/solutions/ContactForm";
import RelatedProducts from "@/components/solutions/RelatedProducts";
import BackButton from "@/components/BackButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const title = `${product.name} | APM Group`;
  const description = product.shortDesc;
  const url = `https://apmgroups.in/products/${product.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <main className="min-h-screen bg-white animate-[fadeIn_0.4s_ease]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-5">
        <BackButton href="/products" label="Back to Products" />
      </div>
      <ProductHero product={product} />

      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          
          {/* Left Column: Main Content */}
          <div className="md:col-span-2 space-y-16">
            
            {/* Overview */}
            {product.overview && (
              <div>
                <h2 className="text-2xl font-black text-navy mb-6">Overview</h2>
                <div className="prose prose-slate max-w-none text-slate-600">
                  <p>{product.overview}</p>
                </div>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-navy mb-6">Key Features</h2>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 bg-surface p-4 rounded-xl border border-border">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm font-semibold text-navy">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-navy mb-6">Benefits</h2>
                <ul className="space-y-3">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-slate-600">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-12">
            
            {/* Applications */}
            {product.applications && product.applications.length > 0 && (
              <div className="bg-surface p-6 rounded-2xl border border-border">
                <h2 className="text-xl font-black text-navy mb-5">Applications</h2>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((a) => (
                    <span
                      key={a}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-navy/70 shadow-sm"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-24 space-y-24">
          {/* Related Products */}
          <RelatedProducts products={related} />

          {/* Request Quote / Download Brochure CTA (Bottom) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 rounded-2xl border border-border bg-surface px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="mb-2 sm:mb-0 sm:mr-auto sm:text-left relative z-10">
              <h3 className="text-xl font-black text-navy mb-1">Ready to move forward with {product.name}?</h3>
              <p className="text-sm text-slate-500">Get pricing or grab the full spec sheet.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 relative z-10">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-white bg-navy hover:bg-navy-light transition-colors shadow-lg shadow-navy/20"
              >
                Request Quote
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-navy border border-border hover:border-primary hover:text-primary transition-colors bg-white"
              >
                Download Brochure
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div id="contact-form" className="scroll-mt-24">
            <h2 className="text-3xl font-black text-navy mb-8 text-center">Enquire About {product.name}</h2>
            <div className="max-w-3xl mx-auto bg-surface p-8 sm:p-10 rounded-3xl border border-border shadow-xl shadow-slate-200/50">
               <ContactForm productName={product.name} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
