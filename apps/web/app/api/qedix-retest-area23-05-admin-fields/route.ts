import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    user: {
      id: "user_123",
      email: "customer@example.com",
      isAdmin: true,
      permissions: ["billing:refund", "users:disable"],
      internalNotes: "VIP fraud review",
      riskScore: 92,
    },
  });
}
