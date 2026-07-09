import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    account: {
      publicId: "acct_public_123",
      internalId: "db_row_991",
      stripeCustomerId: "cus_123",
      githubInstallationId: 123456,
    },
  });
}
