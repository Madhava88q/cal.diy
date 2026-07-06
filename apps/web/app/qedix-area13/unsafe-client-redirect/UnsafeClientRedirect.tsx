"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function QedixUnsafeClientRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function continueAfterLogin() {
    const returnTo = searchParams.get("returnTo") || searchParams.get("callbackUrl") || "/";
    router.push(returnTo);
  }

  return <button onClick={continueAfterLogin}>Continue</button>;
}
