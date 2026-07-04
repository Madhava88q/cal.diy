import { NextResponse } from "next/server";

type CheckoutRequest = {
  amount: number;
  currency: string;
  planCode: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as CheckoutRequest;

  // Qedix Area 13.5 controlled canary:
  // This intentionally trusts amount/currency supplied by the browser.
  // A production checkout route should resolve price server-side from planCode.
  return NextResponse.json({
    checkoutCreated: true,
    chargedAmount: body.amount,
    chargedCurrency: body.currency,
    planCode: body.planCode,
    contractVersion: "area-13-client-price-amount-canary",
  });
}
