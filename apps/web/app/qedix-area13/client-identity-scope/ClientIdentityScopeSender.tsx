"use client";

import { useState } from "react";

export function QedixClientIdentityScopeSender() {
  const [clientUserId] = useState("user_from_browser_state");
  const [clientOrganizationId] = useState("org_from_browser_state");

  async function updateScopedResource() {
    await fetch("/api/qedix-area13/client-identity-scope", {
      method: "POST",
      body: JSON.stringify({
        clientUserId,
        clientOrganizationId,
        tenantId: clientOrganizationId,
      }),
    });
  }

  return <button onClick={updateScopedResource}>Update scoped resource</button>;
}
