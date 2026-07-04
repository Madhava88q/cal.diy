"use client";

import { useState } from "react";

export default function QedixArea13FrontendOnlyAuthorizationPage() {
  const [canManageSettings, setCanManageSettings] = useState(false);

  // Qedix Area 13.2 controlled canary:
  // This intentionally trusts frontend-only authorization.
  // The browser decides whether the user can perform the action.
  async function applySettingsChange() {
    if (!canManageSettings) {
      return;
    }

    await fetch("/api/qedix-area13/frontend-only-authorization", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        settingName: "displayMode",
        settingValue: "expanded",
      }),
    });
  }

  return (
    <main>
      <label>
        <input
          type="checkbox"
          checked={canManageSettings}
          onChange={(event) => setCanManageSettings(event.target.checked)}
        />
        Can manage settings
      </label>

      <button disabled={!canManageSettings} onClick={applySettingsChange}>
        Apply settings change
      </button>
    </main>
  );
}
