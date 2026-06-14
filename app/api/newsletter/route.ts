import { NextRequest, NextResponse } from "next/server";

/**
 * Newsletter signup → Brevo (formerly Sendinblue).
 * Requires env vars BREVO_API_KEY and BREVO_LIST_ID (set in Vercel).
 * Returns { success, already? } so the client can show the right message.
 */
export async function POST(request: NextRequest) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }

  const email = (body?.email || "").trim();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ success: false, error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;

  if (!apiKey || !listId) {
    console.warn("Newsletter: BREVO_API_KEY / BREVO_LIST_ID not configured");
    return NextResponse.json({ success: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": apiKey },
      body: JSON.stringify({
        email,
        listIds: [parseInt(listId, 10)],
        updateEnabled: true,
      }),
    });

    if (res.ok) {
      return NextResponse.json({ success: true });
    }

    const text = await res.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }

    // Already subscribed → treat as success.
    if (
      res.status === 400 &&
      (data.code === "duplicate_parameter" ||
        /already exist/i.test(data.message || ""))
    ) {
      return NextResponse.json({ success: true, already: true });
    }

    console.error("Brevo error:", res.status, text);
    return NextResponse.json({ success: false, error: "provider_error" }, { status: 502 });
  } catch (error: any) {
    console.error("Newsletter exception:", error?.message);
    return NextResponse.json({ success: false, error: "server_error" }, { status: 500 });
  }
}
