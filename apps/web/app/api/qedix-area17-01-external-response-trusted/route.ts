import { NextRequest, NextResponse } from "next/server";

type ProviderProfile = {
  id: string;
  plan: string;
  accountStatus: string;
  creditLimit: number;
};

export async function POST(req: NextRequest) {
  const body = await req.json();

  const providerResponse = await fetch(
    `https://provider.example.invalid/api/customers/${body.customerId}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${process.env.PROVIDER_API_KEY}`,
      },
    },
  );

  const providerProfile = (await providerResponse.json()) as ProviderProfile;

  return NextResponse.json({
    ok: true,
    customerId: body.customerId,
    plan: providerProfile.plan,
    accountStatus: providerProfile.accountStatus,
    creditLimit: providerProfile.creditLimit,
  });
}
