import { NextResponse } from "next/server";

export async function GET() {
  const providerResponse = await fetch(
    "https://provider.example.invalid/api/usage/current",
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      signal: AbortSignal.timeout(2500),
    },
  );

  if (!providerResponse.ok) {
    return NextResponse.json(
      {
        ok: false,
        providerStatus: providerResponse.status,
      },
      { status: 502 },
    );
  }

  const usage = await providerResponse.json();

  return NextResponse.json({
    ok: true,
    usage,
  });
}
