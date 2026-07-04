"use client";

import { useState } from "react";

export default function QedixArea13ClientRoleTrustedPage() {
  const [clientRole, setClientRole] = useState("viewer");

  // Qedix Area 13.4 controlled canary:
  // This intentionally sends a client-controlled role to the server.
  // Browser-controlled role values must not be trusted server-side.
  async function submitRoleBasedAction() {
    await fetch("/api/qedix-area13/client-role-trusted", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        clientRole,
        displayMode: "expanded",
      }),
    });
  }

  return (
    <main>
      <select
        aria-label="Client role"
        value={clientRole}
        onChange={(event) => setClientRole(event.target.value)}
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={submitRoleBasedAction}>
        Submit role-based action
      </button>
    </main>
  );
}
