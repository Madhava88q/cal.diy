"use client";

export default function QedixArea13HiddenInputTrustedPage() {
  // Qedix Area 13.3 controlled canary:
  // This intentionally trusts a hidden input value from the browser.
  // Hidden inputs can be modified by users and must not be trusted server-side.
  async function submitPreference(formData: FormData) {
    await fetch("/api/qedix-area13/hidden-input-trusted", {
      method: "POST",
      body: formData,
    });
  }

  return (
    <main>
      <form action={submitPreference}>
        <input type="hidden" name="selectedMode" value="expanded" />
        <input type="hidden" name="clientContract" value="area-13-hidden-input-canary" />

        <button type="submit">
          Save display preference
        </button>
      </form>
    </main>
  );
}
