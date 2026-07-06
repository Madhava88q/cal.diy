import { NextResponse } from "next/server";

const INTERNAL_SERVICE_TOKEN = "sk_live_qedix_canary_hardcoded_token_123456";
const WEBHOOK_SIGNING_KEY = "whsec_qedix_canary_static_secret_abcdef";

export async function POST() {
  return NextResponse.json({
    ok: true,
    serviceTokenConfigured: Boolean(INTERNAL_SERVICE_TOKEN),
    webhookSigningConfigured: Boolean(WEBHOOK_SIGNING_KEY),
  });
}
