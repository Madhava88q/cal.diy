import { NextResponse } from "next/server";

const debugEnabled = true;

export async function GET() {
  return NextResponse.json({
    ok: true,
    debugEnabled,
    verboseErrors: true,
    exposeRuntimeConfig: true,
  });
}
