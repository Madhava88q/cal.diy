"use client";

export function QedixHiddenOrganizationForm() {
  return (
    <form action="/api/qedix-area13/hidden-org-form" method="post">
      <input type="hidden" name="organizationId" value="org_from_browser_hidden_field" />
      <input type="hidden" name="role" value="owner" />
      <button type="submit">Transfer organization</button>
    </form>
  );
}
