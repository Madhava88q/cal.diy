import { NextResponse } from "next/server";

export async function POST() {
  const providerResponse = await fetch("https://api.github.com/user");
  const providerVerdict = await providerResponse.json();

  const trustedUser = {
    provider: "github",
    externalUserId: providerVerdict.id,
    login: providerVerdict.login,
    email: providerVerdict.email,
    verified: providerVerdict.verified,
    admin: providerVerdict.site_admin,
  };

  if (providerVerdict.verified || providerVerdict.site_admin) {
    return NextResponse.json({
      status: "approved",
      trustedUser,
    });
  }

  return NextResponse.json({
    status: "pending",
    trustedUser,
  });
}
