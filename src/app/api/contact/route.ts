const MAX_BODY_BYTES = 12_000;
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_EMAIL_URL = "https://api.resend.com/emails";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  turnstileToken?: unknown;
  company?: unknown;
  submissionId?: unknown;
}

interface ValidContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  turnstileToken: string;
  submissionId: string;
}

interface TurnstileResult {
  success: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
}

function json(message: string, status: number) {
  return Response.json(
    { message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validatePayload(payload: ContactPayload):
  | { ok: true; data: ValidContactPayload }
  | { ok: false; message: string } {
  const name = cleanText(payload.name);
  const email = cleanText(payload.email).toLowerCase();
  const subject = cleanText(payload.subject).replace(/[\r\n]+/g, " ");
  const message = cleanText(payload.message);
  const turnstileToken = cleanText(payload.turnstileToken);
  const submissionId = cleanText(payload.submissionId);

  if (name.length < 2 || name.length > 80) {
    return { ok: false, message: "Please enter a valid name." };
  }

  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  if (subject.length > 150) {
    return { ok: false, message: "The subject is too long." };
  }

  if (message.length < 10 || message.length > 3_000) {
    return {
      ok: false,
      message: "Your message must be between 10 and 3,000 characters.",
    };
  }

  if (!turnstileToken || turnstileToken.length > 2_048) {
    return { ok: false, message: "Please complete the security check." };
  }

  if (!/^[0-9a-f-]{36}$/i.test(submissionId)) {
    return { ok: false, message: "Please refresh the page and try again." };
  }

  return {
    ok: true,
    data: { name, email, subject, message, turnstileToken, submissionId },
  };
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.startsWith("application/json")) {
    return json("Unsupported request format.", 415);
  }

  const requestOrigin = request.headers.get("origin");
  const allowedOrigin =
    process.env.CONTACT_ALLOWED_ORIGIN ?? new URL(request.url).origin;
  if (requestOrigin && requestOrigin !== allowedOrigin) {
    return json("Request origin is not allowed.", 403);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return json("The submitted message is too large.", 413);
  }

  let payload: ContactPayload;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return json("The submitted message is too large.", 413);
    }
    payload = JSON.parse(rawBody) as ContactPayload;
  } catch {
    return json("Invalid request data.", 400);
  }

  // Silently accept bot-filled honeypot submissions without sending email.
  if (cleanText(payload.company)) {
    return json("Message sent successfully.", 200);
  }

  const validated = validatePayload(payload);
  if (!validated.ok) {
    return json(validated.message, 400);
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !turnstileSecret || !toEmail || !fromEmail) {
    console.error("Contact form environment variables are not configured.");
    return json("The contact form is temporarily unavailable.", 503);
  }

  let turnstileResult: TurnstileResult;
  try {
    const verificationResponse = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: turnstileSecret,
        response: validated.data.turnstileToken,
        remoteip: request.headers.get("cf-connecting-ip") ?? undefined,
        idempotency_key: validated.data.submissionId,
      }),
      signal: AbortSignal.timeout(8_000),
    });

    turnstileResult = (await verificationResponse.json()) as TurnstileResult;
  } catch {
    console.error("Turnstile verification request failed.");
    return json("Security verification failed. Please try again.", 503);
  }

  const allowedHostname = process.env.CONTACT_ALLOWED_HOSTNAME;
  const hostnameMatches =
    !allowedHostname || turnstileResult.hostname === allowedHostname;

  if (
    !turnstileResult.success ||
    turnstileResult.action !== "contact" ||
    !hostnameMatches
  ) {
    console.warn("Turnstile rejected a contact submission.", {
      errorCodes: turnstileResult["error-codes"],
    });
    return json("Security verification failed. Please try again.", 400);
  }

  const emailSubject = validated.data.subject
    ? `[Portfolio] ${validated.data.subject}`
    : `[Portfolio] Message from ${validated.data.name}`;

  const emailText = [
    "New portfolio contact message",
    "",
    `Name: ${validated.data.name}`,
    `Email: ${validated.data.email}`,
    `Subject: ${validated.data.subject || "Not provided"}`,
    "",
    "Message:",
    validated.data.message,
  ].join("\n");

  try {
    const resendResponse = await fetch(RESEND_EMAIL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `portfolio-contact/${validated.data.submissionId}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: validated.data.email,
        subject: emailSubject,
        text: emailText,
      }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!resendResponse.ok) {
      console.error("Resend rejected a contact email.", {
        status: resendResponse.status,
      });
      return json("Your message could not be sent. Please try again.", 502);
    }
  } catch {
    console.error("Resend email request failed.");
    return json("Your message could not be sent. Please try again.", 502);
  }

  return json("Message sent successfully.", 200);
}
