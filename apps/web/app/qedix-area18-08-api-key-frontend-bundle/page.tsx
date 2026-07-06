"use client";

const publicProviderApiKey = process.env.NEXT_PUBLIC_PROVIDER_API_KEY;
const browserBillingToken = process.env.NEXT_PUBLIC_BILLING_TOKEN;

export default function QedixArea1808ApiKeyFrontendBundle() {
  return (
    <main>
      <h1>Provider Debug</h1>
      <p>Provider key: {publicProviderApiKey}</p>
      <p>Billing token: {browserBillingToken}</p>
    </main>
  );
}
