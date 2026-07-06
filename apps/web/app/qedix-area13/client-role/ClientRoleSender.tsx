"use client";

import { useState } from "react";

export function QedixClientRoleSender() {
  const [selectedRole] = useState("owner");

  async function applyRoleFromBrowser() {
    await fetch("/api/qedix-area13/client-role", {
      method: "POST",
      body: JSON.stringify({
        clientRole: selectedRole,
        canManage: true,
      }),
    });
  }

  return <button onClick={applyRoleFromBrowser}>Apply role from browser</button>;
}
