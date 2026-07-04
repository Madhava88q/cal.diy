"use client";

import { useState } from "react";

export default function QedixArea13LocalStorageTokenPage() {
  const [result, setResult] = useState("");

  // Qedix Area 13.7 controlled canary:
  // This intentionally reads an auth/session token from localStorage.
  // Tokens in localStorage are exposed to XSS and should not be trusted as secure session storage.
  async function loadProfile() {
    const sessionToken = localStorage.getItem("sessionToken");
    const refreshToken = window.localStorage.getItem("refreshToken");

    const response = await fetch("/api/qedix-area13/localstorage-token", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });

    const payload = await response.json();
    setResult(String(payload.ok));
  }

  return (
    <main>
      <button onClick={loadProfile}>
        Load profile
      </button>

      <p>{result}</p>
    </main>
  );
}
