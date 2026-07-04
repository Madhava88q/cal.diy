import { NextResponse } from "next/server";

type PublicUser = {
  id: string;
  email: string;
  name: string;
};

const users: PublicUser[] = [
  {
    id: "usr_area12_001",
    email: "area12@example.com",
    name: "Area 12 Canary",
  },
];

export async function GET() {
  // Qedix Area 12.1 controlled canary:
  // This intentionally exposes a changed public response shape.
  // Old-style callers may expect { users: [{ id, email, name }] }.
  // This route now returns { data: [{ userId, primaryEmail, displayName }], meta }.
  return NextResponse.json({
    data: users.map((user) => ({
      userId: user.id,
      primaryEmail: user.email,
      displayName: user.name,
    })),
    meta: {
      contractVersion: "area-12-response-shape-canary",
      total: users.length,
    },
  });
}
