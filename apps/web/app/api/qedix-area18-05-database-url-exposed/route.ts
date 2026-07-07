import { NextResponse } from "next/server";

export async function GET() {
  const databaseUrl = process.env.DATABASE_URL;

  return NextResponse.json({
    ok: true,
    databaseUrl,
    configured: Boolean(databaseUrl),
  });
}
