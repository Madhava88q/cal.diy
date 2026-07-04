import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const selectedMode = String(formData.get("selectedMode") ?? "");
  const clientContract = String(formData.get("clientContract") ?? "");

  // Qedix Area 13.3 controlled canary:
  // This intentionally trusts values submitted through hidden inputs.
  // No server-side allowlist or validation is visible here.
  return NextResponse.json({
    saved: true,
    selectedMode,
    clientContract,
  });
}
