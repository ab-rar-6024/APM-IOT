import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | APM Group",
  description: "The terms and conditions governing use of the APM Group website, products, and services.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using the APM Group website, products, or services, you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of our website and services."
  },
  {
    title: "2. Use of Website",
    body: "This website is provided for informational purposes about APM Group's products, solutions, and services. You agree not to misuse the site, attempt unauthorized access, or use it in any way that could damage or impair its functionality."
  },
  {
    title: "3. Products & Services",
    body: "Product specifications, certifications, and availability described on this website are subject to change. Installation, dealer network coverage, and service terms may vary by region — please confirm details with your local APM dealer or our support team before purchase."
  },
  {
    title: "4. Intellectual Property",
    body: "All content on this website, including text, images, logos, and product designs, is the property of APM Group or its licensors and may not be reproduced or used without prior written permission."
  },
  {
    title: "5. Warranty",
    body: "Applicable product warranty terms are specified on each product's detail page and accompanying documentation. Warranty coverage is subject to proper installation and use as intended."
  },
  {
    title: "6. Limitation of Liability",
    body: "APM Group shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or our products, to the extent permitted by law."
  },
  {
    title: "7. Governing Law",
    body: "These Terms & Conditions are governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts where APM Group is registered."
  },
  {
    title: "8. Changes to These Terms",
    body: "We may revise these Terms & Conditions from time to time. Continued use of the website after changes are posted constitutes acceptance of the updated terms."
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 py-12 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-navy mb-4 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Last updated: January 2026. Please read these terms carefully before using our website or purchasing our products.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10 space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-black text-navy mb-2">{s.title}</h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">{s.body}</p>
            </div>
          ))}

          <div id="refund-policy">
            <h2 className="text-lg font-black text-navy mb-2">9. Refund Policy</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Refund eligibility depends on the product category, order stage, and installation status. Custom-installed hardware and calibrated compliance devices (such as speed governors and fare meters) are generally non-refundable once installed. To request a refund or discuss a specific order, please{" "}
              <a href="/contact" className="text-primary font-semibold hover:underline">
                contact our support team
              </a>{" "}
              with your order details.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-black text-navy mb-2">10. Contact Us</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              For questions about these Terms & Conditions, please{" "}
              <a href="/contact" className="text-primary font-semibold hover:underline">
                get in touch with our team
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
