"use client";

import { useState } from "react";

export default function ContactForm({ productName }: { productName: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: name,
          PhoneNumber: phone,
          Email: email,
          PreferredServices: [productName || "General Enquiry"],
          Message: message.trim() || `Enquiry regarding ${productName}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to send enquiry. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to send enquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className="text-navy font-bold mb-1">Thanks — we&apos;ll be in touch.</p>
        <p className="text-sm text-slate-500">A member of the APM team will reach out about {productName} shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-8 space-y-4">
      {submitError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-medium">
          {submitError}
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-navy/70 mb-1.5">Name</label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm text-navy focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-navy/70 mb-1.5">Phone</label>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm text-navy focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-navy/70 mb-1.5">Email</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm text-navy focus:outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-navy/70 mb-1.5">Message</label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`I'm interested in ${productName}...`}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm text-navy focus:outline-none focus:border-primary resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-sm text-white bg-navy hover:bg-primary transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
