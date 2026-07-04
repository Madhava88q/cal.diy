import { NextResponse } from "next/server";

type RoleActionRequest = {
  clientRole: string;
  displayMode: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as RoleActionRequest;

  // Qedix Area 13.4 controlled canary:
  // This intentionally trusts a role value supplied by the browser.
  // No server-side session, permission, or role lookup is visible.
  if (body.clientRole === "admin") {
    return NextResponse.json({
      allowed: true,
      appliedMode: body.displayMode,
      contractVersion: "area-13-client-role-trusted-canary",
    });
  }

  return NextResponse.json({
    allowed: false,
    appliedMode: "readonly",
    contractVersion: "area-13-client-role-trusted-canary",
  });
}
