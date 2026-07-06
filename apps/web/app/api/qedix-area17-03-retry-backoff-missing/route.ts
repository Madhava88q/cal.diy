import { NextResponse } from "next/server";

export async function GET() {
  let lastStatus = 0;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const providerResponse = await fetch(
      "https://status.provider.example.invalid/api/health",
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
        signal: AbortSignal.timeout(2500),
      },
    );

    lastStatus = providerResponse.status;

    if (providerResponse.ok) {
      return NextResponse.json({
        ok: true,
        providerAvailable: true,
        attempt,
      });
    }
  }

  return NextResponse.json(
    {
      ok: false,
      providerAvailable: false,
      lastStatus,
    },
    { status: 503 },
  );
}
