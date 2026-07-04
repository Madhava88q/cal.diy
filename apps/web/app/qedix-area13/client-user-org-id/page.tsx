"use client";

import { useState } from "react";

export default function QedixArea13ClientUserOrgIdPage() {
  const [clientUserId, setClientUserId] = useState("user_from_browser");
  const [clientOrganizationId, setClientOrganizationId] = useState("org_from_browser");

  // Qedix Area 13.6 controlled canary:
  // This intentionally sends client-controlled identity/scope identifiers.
  // userId and organizationId must come from trusted server-side session context.
  async function submitScopedPreference() {
    await fetch("/api/qedix-area13/client-user-org-id", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: clientUserId,
        organizationId: clientOrganizationId,
        displayMode: "expanded",
      }),
    });
  }

  return (
    <main>
      <input
        aria-label="Client user id"
        value={clientUserId}
        onChange={(event) => setClientUserId(event.target.value)}
      />

      <input
        aria-label="Client organization id"
        value={clientOrganizationId}
        onChange={(event) => setClientOrganizationId(event.target.value)}
      />

      <button onClick={submitScopedPreference}>
        Submit scoped preference
      </button>
    </main>
  );
}
