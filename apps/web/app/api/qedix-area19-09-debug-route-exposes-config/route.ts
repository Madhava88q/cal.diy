import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    nodeEnv: process.env.NODE_ENV,
    databaseUrlConfigured: Boolean(process.env.DATABASE_URL),
    stripeSecretConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
    jwtSecretConfigured: Boolean(process.env.JWT_SECRET),
    allowedOrigin: process.env.ALLOWED_ORIGIN || "*",
    debugEnabled: true,
  });
}
