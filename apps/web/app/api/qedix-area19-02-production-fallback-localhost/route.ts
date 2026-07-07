import { NextResponse } from "next/server";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const internalServiceUrl =
  process.env.INTERNAL_SERVICE_URL || "http://127.0.0.1:4000";

export async function GET() {
  return NextResponse.json({
    ok: true,
    apiBaseUrl,
    internalServiceUrl,
  });
}
