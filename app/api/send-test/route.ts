import { NextRequest, NextResponse } from "next/server";

// TEMPORARY diagnostic route — sends a test newsletter via Brevo's
// transactional API using BREVO_API_KEY (already in Vercel). Remove after use.
const SECRET = "kilampe-nltest-7731";

const HTML = `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f1f3;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f1f3;"><tr><td align="center" style="padding:24px 10px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;">
<tr><td style="background:#0a0c12;padding:22px 30px;"><table width="100%"><tr>
<td style="font-family:Arial,sans-serif;font-size:18px;font-weight:bold;letter-spacing:2px;color:#ffffff;">KI&nbsp;<span style="color:#facc15;">&#9679;</span>&nbsp;LAMPE</td>
<td align="right" style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:1.5px;color:#8b92a0;">AUSGABE&nbsp;#01&nbsp;&middot;&nbsp;JUNI&nbsp;2026</td></tr></table></td></tr>
<tr><td style="padding:34px 30px 6px 30px;font-family:Arial,sans-serif;">
<p style="margin:0 0 12px 0;font-size:19px;font-weight:bold;color:#111111;">Hey 👋</p>
<p style="margin:0;font-size:15px;line-height:1.65;color:#555555;">Diese Woche auf KI-LAMPE — die Ideen hinter den Spielen, der KI und der Kunst, die du liebst. Drei kurze Lesetipps:</p></td></tr>
<tr><td style="padding:28px 30px 0 30px;font-family:Arial,sans-serif;">
<p style="margin:0 0 7px 0;font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#d55b9b;">Game Design</p>
<a href="https://www.ki-lampe.com/article/zelda-z-targeting" style="font-size:21px;font-weight:bold;color:#111111;line-height:1.3;text-decoration:none;">Was alle 3D-Action-Spiele Zeldas Z-Targeting verdanken</a>
<p style="margin:9px 0 8px 0;font-size:14px;line-height:1.55;color:#666666;">Ein Lock-on aus 1998 hat ein ganzes Genre geprägt.</p>
<a href="https://www.ki-lampe.com/article/zelda-z-targeting" style="font-size:13px;font-weight:bold;color:#d55b9b;text-decoration:none;">Lesen &middot; 8 Min &rarr;</a></td></tr>
<tr><td style="padding:22px 30px 0 30px;"><div style="border-top:1px solid #ededed;font-size:0;line-height:0;">&nbsp;</div></td></tr>
<tr><td style="padding:22px 30px 0 30px;font-family:Arial,sans-serif;">
<p style="margin:0 0 7px 0;font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#5b9bd5;">KI</p>
<a href="https://www.ki-lampe.com/article/mozart-ai-anleitung" style="font-size:21px;font-weight:bold;color:#111111;line-height:1.3;text-decoration:none;">MozartAI: aus einer Idee einen fertigen Song</a>
<p style="margin:9px 0 8px 0;font-size:14px;line-height:1.55;color:#666666;">Steuere die KI wie ein Produzent – nicht mit einer faulen Zeile.</p>
<a href="https://www.ki-lampe.com/article/mozart-ai-anleitung" style="font-size:13px;font-weight:bold;color:#5b9bd5;text-decoration:none;">Lesen &middot; 11 Min &rarr;</a></td></tr>
<tr><td style="padding:22px 30px 0 30px;"><div style="border-top:1px solid #ededed;font-size:0;line-height:0;">&nbsp;</div></td></tr>
<tr><td style="padding:22px 30px 0 30px;font-family:Arial,sans-serif;">
<p style="margin:0 0 7px 0;font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#7c5cff;">Art</p>
<a href="https://www.ki-lampe.com/article/flower-power-games" style="font-size:21px;font-weight:bold;color:#111111;line-height:1.3;text-decoration:none;">Warum Pikmins Blume das cleverste UI in Spielen ist</a>
<p style="margin:9px 0 8px 0;font-size:14px;line-height:1.55;color:#666666;">Keine Lebensleiste nötig – die Blüte ist die Statusanzeige.</p>
<a href="https://www.ki-lampe.com/article/flower-power-games" style="font-size:13px;font-weight:bold;color:#7c5cff;text-decoration:none;">Lesen &middot; 8 Min &rarr;</a></td></tr>
<tr><td align="center" style="padding:34px 30px 8px 30px;"><table cellpadding="0" cellspacing="0"><tr>
<td bgcolor="#0a0c12" style="border-radius:9px;"><a href="https://www.ki-lampe.com" style="display:inline-block;padding:15px 34px;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:9px;">Auf KI-LAMPE lesen &rarr;</a></td></tr></table></td></tr>
<tr><td style="padding:14px 30px 30px 30px;font-family:Arial,sans-serif;font-size:13px;color:#999999;text-align:center;">🔧 GPUs für deine KI-Projekte? Ich nutze <a href="https://runpod.io?ref=jo7pk601" style="color:#5b9bd5;font-weight:bold;text-decoration:none;">RunPod &rarr;</a></td></tr>
<tr><td style="background:#0a0c12;padding:26px 30px;font-family:Arial,sans-serif;font-size:12px;line-height:1.7;color:#8b92a0;">
<p style="margin:0 0 8px 0;"><span style="font-weight:bold;letter-spacing:1.5px;color:#ffffff;">KI&nbsp;<span style="color:#facc15;">&#9679;</span>&nbsp;LAMPE</span></p>
<p style="margin:0 0 10px 0;">Testversand der Newsletter-Vorlage.</p>
<p style="margin:0;"><a href="#" style="color:#8b92a0;text-decoration:underline;">Abmelden</a> &nbsp;&middot;&nbsp; <a href="https://www.ki-lampe.com" style="color:#8b92a0;text-decoration:underline;">ki-lampe.com</a></p></td></tr>
</table></td></tr></table></body></html>`;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  if (url.searchParams.get("key") !== SECRET) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const to = url.searchParams.get("to");
  if (!to) return NextResponse.json({ error: "no recipient" }, { status: 400 });

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  // Find a verified sender
  const sRes = await fetch("https://api.brevo.com/v3/senders", { headers: { "api-key": apiKey } });
  const sData: any = await sRes.json().catch(() => ({}));
  const senders = sData.senders || [];
  const sender = senders.find((s: any) => s.active) || senders[0];
  if (!sender) {
    return NextResponse.json({ step: "no_verified_sender", sendersStatus: sRes.status, senders }, { status: 200 });
  }

  // Send the test email
  const send = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": apiKey },
    body: JSON.stringify({
      sender: { email: sender.email, name: "KI-LAMPE" },
      to: [{ email: to }],
      subject: "KI-LAMPE — Testausgabe #01",
      htmlContent: HTML,
    }),
  });
  const body = await send.text();
  return NextResponse.json(
    { senderUsed: sender.email, senderActive: sender.active, sendStatus: send.status, sendBody: body.slice(0, 300) },
    { status: 200 }
  );
}
