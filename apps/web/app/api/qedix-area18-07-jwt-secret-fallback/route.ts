import { NextResponse } from "next/server";

export async function POST() {
  const jwtSecret =
    process.env.JWT_SECRET || "development-jwt-secret";

  return NextResponse.json({
    ok: true,
    jwtSigningEnabled: Boolean(jwtSecret),
  });
}
