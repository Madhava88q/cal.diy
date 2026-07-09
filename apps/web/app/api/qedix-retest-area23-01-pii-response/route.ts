import { NextResponse } from "next/server";

export async function GET() {
  const user = {
    id: "user_123",
    email: "customer@example.com",
    phone: "+15555550123",
    fullName: "Test Customer",
  };

  return NextResponse.json({ user });
}
