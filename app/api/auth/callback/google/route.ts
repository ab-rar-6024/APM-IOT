import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ENV_PATH = path.join(process.cwd(), ".env.local");

function upsertEnvVar(contents: string, key: string, value: string) {
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, "m");
  if (pattern.test(contents)) {
    return contents.replace(pattern, line);
  }
  return `${contents.trimEnd()}\n${line}\n`;
}

function htmlPage(body: string) {
  return `<!doctype html><html><body style="font-family: Arial, sans-serif; padding: 40px; max-width: 560px; margin: 0 auto;">${body}</body></html>`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return new NextResponse(htmlPage(`<h2>Authorization failed</h2><p>${error}</p>`), {
      status: 400,
      headers: { "Content-Type": "text/html" },
    });
  }

  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;
  if (!code || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
    return new NextResponse(htmlPage("<h2>Missing authorization code or OAuth config.</h2>"), {
      status: 400,
      headers: { "Content-Type": "text/html" },
    });
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenRes.ok || !tokenData.refresh_token) {
    return new NextResponse(
      htmlPage(
        `<h2>Could not obtain a refresh token</h2>
         <p>${tokenData.error_description || tokenData.error || "Unknown error."}</p>
         <p>If you've authorized this app before, Google may withhold the refresh token on repeat
         consent. Revoke prior access at
         <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a>
         and try again.</p>`
      ),
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  const existing = fs.existsSync(ENV_PATH) ? fs.readFileSync(ENV_PATH, "utf8") : "";
  const updated = upsertEnvVar(existing, "GOOGLE_REFRESH_TOKEN", tokenData.refresh_token);
  fs.writeFileSync(ENV_PATH, updated, "utf8");

  return new NextResponse(
    htmlPage(
      `<h2>&#9989; Gmail connected</h2>
       <p>Refresh token saved to <code>.env.local</code>. Restart the dev server, then submit the
       Contact form to send real email.</p>`
    ),
    { headers: { "Content-Type": "text/html" } }
  );
}
