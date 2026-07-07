import { NextResponse } from "next/server";

export async function GET() {
  const providerResponse = await fetch("https://api.github.com/users/octocat");
  const providerProfile = await providerResponse.json();

  return NextResponse.json({
    provider: "github",
    trustedProfile: providerProfile,
  });
}
