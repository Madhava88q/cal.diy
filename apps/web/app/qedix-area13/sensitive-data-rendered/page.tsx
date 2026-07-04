"use client";

const accountDebugPayload = {
  email: "area13-sensitive@example.com",
  sessionToken: "client_visible_session_token",
  refreshToken: "client_visible_refresh_token",
  apiSecret: "client_visible_api_secret",
};

export default function QedixArea13SensitiveDataRenderedPage() {
  // Qedix Area 13.8 controlled canary:
  // This intentionally renders sensitive token/secret-like fields in the browser.
  // Sensitive data should be redacted or omitted before rendering.
  return (
    <main>
      <h1>Account debug payload</h1>

      <dl>
        <dt>Email</dt>
        <dd>{accountDebugPayload.email}</dd>

        <dt>Session token</dt>
        <dd>{accountDebugPayload.sessionToken}</dd>

        <dt>Refresh token</dt>
        <dd>{accountDebugPayload.refreshToken}</dd>

        <dt>API secret</dt>
        <dd>{accountDebugPayload.apiSecret}</dd>
      </dl>
    </main>
  );
}
