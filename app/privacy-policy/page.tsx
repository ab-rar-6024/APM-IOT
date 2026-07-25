import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | APM Group",
  description: "How APM Group collects, uses, and protects your information.",
};

const sections = [
  {
    title: "1. Introduction",
    body: "APM Group (\"APM\", \"we\", \"us\", or \"our\") respects your privacy and is committed to protecting the personal information you share with us through our website, products, and services. This Privacy Policy explains what information we collect, how we use it, and the choices you have."
  },
  {
    title: "2. Information We Collect",
    body: "We may collect information you provide directly, such as your name, phone number, email address, and company details when you submit an enquiry, request a demo, or contact our support team. We may also collect technical information such as device type, browser, and general usage data to help us improve our website."
  },
  {
    title: "3. How We Use Information",
    body: "We use the information we collect to respond to enquiries, provide quotes and product information, deliver installation and support services, improve our website and offerings, and communicate important updates about our products and services."
  },
  {
    title: "4. Data Security",
    body: "We apply reasonable administrative, technical, and physical safeguards to protect the information we hold from unauthorized access, disclosure, alteration, or destruction."
  },
  {
    title: "5. Cookies",
    body: "Our website may use cookies and similar technologies to improve site functionality and understand how visitors interact with our content. You can control cookie preferences through your browser settings."
  },
  {
    title: "6. Sharing of Information",
    body: "We do not sell your personal information. We may share information with our certified dealer network, service partners, or regulatory authorities where required to deliver our products and services or to comply with the law."
  },
  {
    title: "7. Your Rights",
    body: "You may request access to, correction of, or deletion of your personal information by contacting us using the details below."
  },
  {
    title: "8. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date."
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 py-12 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-navy mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Last updated: January 2026. This policy describes how APM Group handles information collected through our website and services.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10 space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-black text-navy mb-2">{s.title}</h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">{s.body}</p>
            </div>
          ))}

          <div>
            <h2 className="text-lg font-black text-navy mb-2">9. Contact Us</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              For any questions about this Privacy Policy or how your information is handled, please{" "}
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
