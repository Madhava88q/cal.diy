import { NextResponse } from "next/server";

const appSecret =
  process.env.APP_SECRET || "default-secret";

const allowedOrigin =
  process.env.ALLOWED_ORIGIN || "*";

export async function GET() {
  return NextResponse.json({
    ok: true,
    appSecretConfigured: Boolean(appSecret),
    allowedOrigin,
  });
}
