"use client";

const privateStripeSecret = process.env.STRIPE_SECRET_KEY;
const privateDatabaseUrl = process.env.DATABASE_URL;

export default function QedixArea1809PrivateEnvClientCode() {
  return (
    <main>
      <h1>Private Runtime Config</h1>
      <p>Stripe secret configured: {String(Boolean(privateStripeSecret))}</p>
      <p>Database URL configured: {String(Boolean(privateDatabaseUrl))}</p>
    </main>
  );
}
