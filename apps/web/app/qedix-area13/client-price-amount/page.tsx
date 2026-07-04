"use client";

import { useState } from "react";

export default function QedixArea13ClientPriceAmountPage() {
  const [clientAmount, setClientAmount] = useState("4999");

  // Qedix Area 13.5 controlled canary:
  // This intentionally sends a client-controlled amount to the server.
  // Price and amount values must be computed or verified server-side.
  async function startCheckout() {
    await fetch("/api/qedix-area13/client-price-amount", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(clientAmount),
        currency: "usd",
        planCode: "starter",
      }),
    });
  }

  return (
    <main>
      <input
        aria-label="Client amount"
        value={clientAmount}
        onChange={(event) => setClientAmount(event.target.value)}
      />

      <button onClick={startCheckout}>
        Start checkout
      </button>
    </main>
  );
}
