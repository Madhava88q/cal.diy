"use client";

import { useState } from "react";

export default function QedixArea13DangerousHtmlRenderingPage() {
  const [previewHtml, setPreviewHtml] = useState(
    "<strong>Area 13 preview</strong><script>console.log('canary')</script>",
  );

  // Qedix Area 13.9 controlled canary:
  // This intentionally renders client-controlled HTML with dangerouslySetInnerHTML.
  // No sanitizer, allowlist, or trusted HTML policy is visible.
  return (
    <main>
      <textarea
        aria-label="Preview HTML"
        value={previewHtml}
        onChange={(event) => setPreviewHtml(event.target.value)}
      />

      <section
        aria-label="Rendered preview"
        dangerouslySetInnerHTML={{
          __html: previewHtml,
        }}
      />
    </main>
  );
}
