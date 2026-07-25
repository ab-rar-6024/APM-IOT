import { NextResponse } from "next/server";

export async function GET() {
  const { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI, GMAIL_USER } = process.env;

  if (!GOOGLE_CLIENT_ID || !GOOGLE_REDIRECT_URI) {
    return NextResponse.json({ error: "Google OAuth client is not configured." }, { status: 500 });
  }

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: "code",
    // Full mail scope is required for SMTP XOAUTH2 (not just the Gmail API send scope).
    scope: "https://mail.google.com/",
    access_type: "offline",
    prompt: "consent",
    ...(GMAIL_USER ? { login_hint: GMAIL_USER } : {}),
  });

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}
