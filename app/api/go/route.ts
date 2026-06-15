import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/kv";
import { unstable_noStore as noStore } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = /(^|\.)(ki-lampe\.com|gumroad\.com|runpod\.io|theneverendingprompt\.xyz)$/;

function kvClient() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? createClient({ url, token }) : null;
}

// /api/go?u=<dest>&s=<source>&c=<campaign>  -> logs the click (best-effort) then 302 to dest
export async function GET(req: NextRequest) {
  noStore(); // every click must execute its own KV write — never serve a cached fetch
  const sp = req.nextUrl.searchParams;
  const u = sp.get("u") || "https://www.ki-lampe.com";
  const s = (sp.get("s") || "direct").slice(0, 40);
  const c = (sp.get("c") || "none").slice(0, 80);

  // best-effort logging — never block the redirect
  const kv = kvClient();
  if (kv) {
    try {
      await Promise.all([
        kv.incr("clicks:total"),
        kv.zincrby("clicks:src", 1, s),
        kv.zincrby("clicks:camp", 1, c),
        kv.zincrby("clicks:pair", 1, `${s}|${c}`),
      ]);
    } catch { /* store hiccup — links still work */ }
  }

  // open-redirect guard: only bounce to our own properties
  let dest = "https://www.ki-lampe.com";
  try { if (ALLOWED.test(new URL(u).hostname)) dest = u; } catch { /* keep default */ }
  return NextResponse.redirect(dest, 302);
}
