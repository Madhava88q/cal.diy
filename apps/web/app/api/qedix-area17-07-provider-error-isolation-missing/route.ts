import { NextResponse } from "next/server";

export async function GET() {
  const providerResponse = await fetch(
    "https://provider.example.invalid/api/account/enrichment",
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      signal: AbortSignal.timeout(2500),
    },
  );

  if (!providerResponse.ok) {
    throw new Error(`provider enrichment failed: ${providerResponse.status}`);
  }

  const enrichment = await providerResponse.json();

  return NextResponse.json({
    ok: true,
    enrichment,
  });
}
