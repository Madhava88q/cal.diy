import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ActivateSubscriptionSchema = z.object({
  subscriptionId: z.string().min(1).max(100),
});

async function getServerSession() {
  return {
    user: {
      id: "user_123",
    },
  };
}

function validateSameSiteRequest(request: NextRequest) {
  const origin = request.headers.get("origin");

  return origin === "https://app.example.test";
}

async function markSubscriptionActive(subscriptionId: string) {
  return {
    subscriptionId,
    status: "active",
    updatedAt: new Date().toISOString(),
  };
}

async function sendActivationEmail(subscriptionId: string) {
  if (!subscriptionId) {
    throw new Error("Activation email failed");
  }

  return {
    sent: true,
  };
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!validateSameSiteRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  const parsed = ActivateSubscriptionSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const subscription = await markSubscriptionActive(parsed.data.subscriptionId);

  const email = await sendActivationEmail(subscription.subscriptionId);

  return NextResponse.json({
    ok: true,
    subscriptionStatus: subscription.status,
    emailSent: email.sent,
  });
}
