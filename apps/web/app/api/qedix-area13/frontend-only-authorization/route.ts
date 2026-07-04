import { NextResponse } from "next/server";

type SettingsChangeRequest = {
  settingName: string;
  settingValue: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as SettingsChangeRequest;

  // Qedix Area 13.2 controlled canary:
  // This intentionally represents a server route trusting frontend-only authorization.
  // No visible server-side auth, role, or permission check exists here.
  return NextResponse.json({
    applied: true,
    settingName: body.settingName,
    settingValue: body.settingValue,
    contractVersion: "area-13-frontend-only-authorization-canary",
  });
}
