import { NextResponse } from "next/server";

export async function GET() {
  const providerResponse = await fetch(
    "https://status.provider.example.invalid/api/health",
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    },
  );

  if (!providerResponse.ok) {
    return NextResponse.json(
      {
        ok: false,
        providerAvailable: false,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    providerAvailable: true,
  });
}
