"use client";

import { useState } from "react";

export default function QedixArea13FrontendOnlyValidationPage() {
  const [displayName, setDisplayName] = useState("");

  // Qedix Area 13.1 controlled canary:
  // This intentionally trusts frontend-only validation.
  // The browser checks the field, but the server route receives the raw value.
  const isValidDisplayName = displayName.trim().length >= 3;

  async function submitProfile() {
    if (!isValidDisplayName) {
      return;
    }

    await fetch("/api/qedix-area13/frontend-only-validation", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        displayName,
      }),
    });
  }

  return (
    <main>
      <input
        aria-label="Display name"
        value={displayName}
        onChange={(event) => setDisplayName(event.target.value)}
      />

      <button disabled={!isValidDisplayName} onClick={submitProfile}>
        Save profile
      </button>
    </main>
  );
}
