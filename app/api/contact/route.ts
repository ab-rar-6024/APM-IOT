import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

interface ContactPayload {
  Name: string;
  PhoneNumber: string;
  Email: string;
  PreferredServices: string[];
  Message: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.Name === "string" &&
    b.Name.trim().length > 0 &&
    typeof b.PhoneNumber === "string" &&
    b.PhoneNumber.trim().length > 0 &&
    typeof b.Email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.Email) &&
    Array.isArray(b.PreferredServices) &&
    b.PreferredServices.length > 0 &&
    b.PreferredServices.every((s) => typeof s === "string") &&
    typeof b.Message === "string" &&
    b.Message.trim().length > 0
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  const { Name, PhoneNumber, Email, PreferredServices, Message } = body;

  const orderId = `APM-${Date.now().toString(36).toUpperCase()}`;
  const productListHtml = PreferredServices.map((s) => `<li>${escapeHtml(s)}</li>`).join("");

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; color: #1e293b;">
      <h2 style="color: #173A75;">New Enquiry / Buy List Received</h2>
      <p><strong>Reference:</strong> ${orderId}</p>
      <table cellpadding="6" style="border-collapse: collapse;">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(Name)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(PhoneNumber)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(Email)}</td></tr>
      </table>
      <p><strong>Products / Services requested:</strong></p>
      <ul>${productListHtml}</ul>
      <p><strong>Message:</strong><br/>${escapeHtml(Message).replace(/\n/g, "<br/>")}</p>
    </div>
  `;

  const userHtml = `
    <div style="font-family: Arial, sans-serif; color: #1e293b;">
      <h2 style="color: #173A75;">Thank you, ${escapeHtml(Name)}!</h2>
      <p>We've received your enquiry and our team will reach out shortly to confirm your order.</p>
      <p><strong>Reference:</strong> ${orderId}</p>
      <p><strong>Your requested products / services:</strong></p>
      <ul>${productListHtml}</ul>
      <p><strong>Your message:</strong><br/>${escapeHtml(Message).replace(/\n/g, "<br/>")}</p>
      <p style="margin-top: 24px; color: #64748b; font-size: 13px;">
        This is a confirmation that your enquiry was submitted — our team will contact you at
        ${escapeHtml(PhoneNumber)} or reply to this email to finalize your order.
      </p>
    </div>
  `;

  // Falls back to a placeholder admin inbox only while no real SMTP is configured
  // (lib/mailer.ts then routes through the disposable Ethereal test account, so nothing
  // is actually delivered) — a real deployment must set ADMIN_EMAIL explicitly.
  const adminEmail = process.env.ADMIN_EMAIL || (!process.env.SMTP_HOST ? "admin@apmiot.test" : undefined);
  if (!adminEmail) {
    return NextResponse.json({ error: "Server email is not configured." }, { status: 500 });
  }

  try {
    const [adminResult, userResult] = await Promise.all([
      sendMail({
        to: adminEmail,
        subject: `New Buy List Enquiry — ${Name} (${orderId})`,
        html: adminHtml,
        replyTo: Email,
      }),
      sendMail({
        to: Email,
        subject: `We've received your order enquiry — ${orderId}`,
        html: userHtml,
      }),
    ]);

    return NextResponse.json(
      {
        ok: true,
        orderId,
        ...(adminResult.previewUrl || userResult.previewUrl
          ? { previewUrls: { admin: adminResult.previewUrl, user: userResult.previewUrl } }
          : {}),
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Failed to send enquiry emails:", err);
    return NextResponse.json({ error: "Failed to send enquiry. Please try again later." }, { status: 502 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });
}
