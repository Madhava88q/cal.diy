import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    debug: true,
    runtimeConfig: {
      nodeEnv: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL,
    },
  });
}
