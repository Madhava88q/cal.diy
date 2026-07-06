import { NextResponse } from "next/server";

export async function GET() {
  const providerResponse = await fetch(
    "https://provider.example.invalid/api/subscriptions/current",
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      signal: AbortSignal.timeout(2500),
    },
  );

  const subscription = await providerResponse.json();

  return NextResponse.json({
    ok: true,
    subscriptionId: subscription.id,
    currentPeriodEnd: subscription.current_period_end,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    providerStatus: subscription.status,
  });
}
