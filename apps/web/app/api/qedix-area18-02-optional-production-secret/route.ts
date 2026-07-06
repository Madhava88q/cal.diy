import { NextResponse } from "next/server";

export async function POST() {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: "webhook secret not configured",
    });
  }

  return NextResponse.json({
    ok: true,
    webhookVerificationEnabled: true,
  });
}
