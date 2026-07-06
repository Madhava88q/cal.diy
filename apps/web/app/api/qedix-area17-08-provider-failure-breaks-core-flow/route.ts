import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const providerResponse = await fetch(
    "https://provider.example.invalid/api/billing/activate",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      signal: AbortSignal.timeout(2500),
      body: JSON.stringify({
        accountId: body.accountId,
        planId: body.planId,
      }),
    },
  );

  if (!providerResponse.ok) {
    return NextResponse.json(
      {
        ok: false,
        accountActivated: false,
        providerStatus: providerResponse.status,
      },
      { status: 502 },
    );
  }

  const activation = await providerResponse.json();

  return NextResponse.json({
    ok: true,
    accountActivated: true,
    activation,
  });
}
