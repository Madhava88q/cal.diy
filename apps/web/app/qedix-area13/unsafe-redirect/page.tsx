"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function QedixArea13UnsafeRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Qedix Area 13.10 controlled canary:
  // This intentionally trusts a client-controlled redirect target.
  // Redirect targets should be allowlisted or constrained to safe internal paths.
  function continueAfterLogin() {
    const redirectTarget = searchParams.get("redirect");

    if (redirectTarget) {
      router.push(redirectTarget);
    }
  }

  return (
    <main>
      <button onClick={continueAfterLogin}>
        Continue
      </button>
    </main>
  );
}
