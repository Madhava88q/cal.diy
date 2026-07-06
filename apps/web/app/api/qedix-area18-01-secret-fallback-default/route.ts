import { NextResponse } from "next/server";

export async function POST() {
  const providerWebhookSecret =
    process.env.PROVIDER_WEBHOOK_SECRET || "dev-webhook-secret";

  const jwtSigningSecret =
    process.env.JWT_SIGNING_SECRET || "changeme";

  return NextResponse.json({
    ok: true,
    providerWebhookSecretConfigured: Boolean(providerWebhookSecret),
    jwtSigningSecretConfigured: Boolean(jwtSigningSecret),
  });
}
