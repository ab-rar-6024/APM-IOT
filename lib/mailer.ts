import nodemailer from "nodemailer";

let transporterPromise: Promise<nodemailer.Transporter> | null = null;
let cachedFrom: string | null = null;

async function getTransporter() {
  if (transporterPromise) return transporterPromise;

  const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
    GMAIL_USER,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
  } = process.env;

  if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && GOOGLE_REFRESH_TOKEN && GMAIL_USER) {
    cachedFrom = GMAIL_USER;
    transporterPromise = Promise.resolve(
      nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: GMAIL_USER,
          clientId: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          refreshToken: GOOGLE_REFRESH_TOKEN,
        },
      })
    );
    return transporterPromise;
  }

  if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
    transporterPromise = Promise.resolve(
      nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
    );
    return transporterPromise;
  }

  // No real mail account configured — fall back to a disposable Ethereal test account so the
  // send/receive flow can be checked end-to-end without real credentials. Nothing is
  // actually delivered; sendMail() logs a preview URL for each message instead.
  transporterPromise = nodemailer.createTestAccount().then((account) =>
    nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: { user: account.user, pass: account.pass },
    })
  );
  return transporterPromise;
}

export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const transporter = await getTransporter();
  const from = cachedFrom || process.env.MAIL_FROM || process.env.SMTP_USER || "APM Group <no-reply@apmiot.test>";
  const info = await transporter.sendMail({
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    replyTo: options.replyTo,
  });

  const previewUrl = nodemailer.getTestMessageUrl(info);
  if (previewUrl) {
    console.log(`[mailer] Preview (${options.to}): ${previewUrl}`);
  }

  return { previewUrl: previewUrl || null };
}
