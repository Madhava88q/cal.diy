import { NextResponse } from "next/server";

export async function GET() {
  const providerResponse = await fetch(
    "https://provider.example.invalid/api/pricing/current",
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      signal: AbortSignal.timeout(2500),
    },
  );

  const providerPricing = await providerResponse.json();

  const monthlyPrice = Number(providerPricing.monthlyPrice);
  const currency = String(providerPricing.currency);
  const plan = String(providerPricing.plan);

  return NextResponse.json({
    ok: true,
    plan,
    currency,
    monthlyPrice,
  });
}
