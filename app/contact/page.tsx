"use client";

import { useState, useEffect, useRef } from "react";
import ServiceMultiSelect from "@/components/contact/ServiceMultiSelect";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    Name: "",
    PhoneNumber: "",
    Email: "",
    PreferredServices: [] as string[],
    Message: ""
  });
  const [serviceError, setServiceError] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate a random captcha code
  const generateCaptcha = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput("");
  };

  // Generate captcha on mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Draw captcha on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid lines for security styling
    ctx.strokeStyle = "rgba(0,0,0,0.06)";
    for (let i = 0; i < canvas.width; i += 15) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += 15) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }

    // Skewed captcha text
    ctx.font = "28px Georgia, serif";
    ctx.fillStyle = "#242251";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.setTransform(1, 0.1, -0.1, 1, 0, 0);
    ctx.fillText(captchaCode, canvas.width / 2, canvas.height / 2);
  }, [captchaCode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.PreferredServices.length === 0) {
      setServiceError(true);
      return;
    }
    setServiceError(false);

    if (captchaInput.trim() !== captchaCode) {
      alert("❌ Invalid Captcha. Please try again.");
      generateCaptcha();
      return;
    }

    setSubmitStatus("loading");
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to send enquiry.");
      }

      setSubmitStatus("success");
      setFormData({
        Name: "",
        PhoneNumber: "",
        Email: "",
        PreferredServices: [],
        Message: ""
      });
      generateCaptcha();
    } catch (err) {
      setSubmitStatus("error");
      setSubmitError(err instanceof Error ? err.message : "Failed to send enquiry.");
      generateCaptcha();
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/50 py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-navy mb-4 tracking-tight leading-tight max-w-4xl">
            Custom Hardware. Intelligent Software. Let's Drive Innovation Together.
          </h1>
          <p className="text-slate-500 max-w-2xl text-sm md:text-base leading-relaxed">
            Whether you're looking for product details, a quote, or a partnership, we're ready to connect and assist.
          </p>
        </div>

        {/* Split Form & Details grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Contact Details and Map */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="bg-navy rounded-3xl p-8 text-white space-y-6 shadow-lg shadow-navy/15 flex-1">
              <h2 className="text-xl font-bold border-b border-white/10 pb-4">Corporate Office</h2>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white/10 border border-white/10 rounded-xl text-amber-400 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase text-slate-400 font-extrabold tracking-widest mb-1">Email Us</h4>
                    <a href="mailto:contact@apmiot.com" className="text-sm text-slate-200 hover:text-amber-400 transition-colors font-medium">
                      contact@apmiot.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white/10 border border-white/10 rounded-xl text-amber-400 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.118-6.944-6.94l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H3.62A2.25 2.25 0 001.37 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase text-slate-400 font-extrabold tracking-widest mb-1">Call Us</h4>
                    <a href="tel:+919600696008" className="text-sm text-slate-200 hover:text-amber-400 transition-colors font-medium">
                      +91 96006 96008
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white/10 border border-white/10 rounded-xl text-amber-400 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase text-slate-400 font-extrabold tracking-widest mb-1">Address</h4>
                    <p className="text-sm text-slate-200 leading-relaxed font-medium">
                      No. 21, School Street, Chettiyaragaram, Vanagaram, Chennai - 600 095, Tamil Nadu, India.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map iframe */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm h-64 relative bg-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.567783563221!2d80.16534597494505!3d13.063160987260673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261852f1369d7%3A0x9d3dc3c8f1dc2bf9!2sAPM%20GROUPS!5e0!3m2!1sen!2sin!4v1690298549151!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-navy mb-6">Send an Enquiry</h2>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Thank you! We've emailed you a confirmation of your order enquiry — our team has been notified too.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {submitError || "Something went wrong. Please try again."}
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="Name" className="text-xs font-bold text-navy/70 uppercase">Name</label>
                    <input
                      type="text"
                      id="Name"
                      name="Name"
                      required
                      value={formData.Name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="PhoneNumber" className="text-xs font-bold text-navy/70 uppercase">Phone Number</label>
                    <input
                      type="tel"
                      id="PhoneNumber"
                      name="PhoneNumber"
                      required
                      value={formData.PhoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="Email" className="text-xs font-bold text-navy/70 uppercase">Email</label>
                  <input
                    type="email"
                    id="Email"
                    name="Email"
                    required
                    value={formData.Email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-navy/70 uppercase">Preferred Service / Product</label>
                  <ServiceMultiSelect
                    value={formData.PreferredServices}
                    onChange={(next) => {
                      setFormData((prev) => ({ ...prev, PreferredServices: next }));
                      if (next.length > 0) setServiceError(false);
                    }}
                  />
                  {serviceError && (
                    <p className="text-xs text-red-500 font-medium">Please select at least one service or product.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="Message" className="text-xs font-bold text-navy/70 uppercase">Message</label>
                  <textarea
                    id="Message"
                    name="Message"
                    required
                    rows={4}
                    value={formData.Message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                {/* Captcha */}
                <div className="space-y-3 pt-2">
                  <label htmlFor="captchaInput" className="text-xs font-bold text-navy/70 uppercase block">Security Code</label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <canvas
                        ref={canvasRef}
                        width={150}
                        height={46}
                        className="bg-slate-100 rounded-xl border border-slate-200"
                      />
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        aria-label="Refresh Captcha"
                        className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-navy rounded-xl transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                      </button>
                    </div>
                    <input
                      type="text"
                      id="captchaInput"
                      placeholder="Enter captcha"
                      required
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="w-full mt-4 bg-navy hover:bg-primary text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-navy/10 flex items-center justify-center gap-2"
                >
                  {submitStatus === "loading" ? "Submitting..." : "Submit Enquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
