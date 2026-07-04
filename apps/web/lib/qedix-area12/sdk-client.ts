export type QedixArea12SdkUser = {
  id: string;
  email: string;
  displayName: string;
};

export async function listQedixArea12Users(): Promise<QedixArea12SdkUser[]> {
  // Qedix Area 12.11 controlled canary:
  // This SDK client still expects the old contract fields:
  // { id, email, displayName }
  //
  // The API route returns:
  // { profileId, primaryEmail, displayLabel }
  const response = await fetch("/api/qedix-area12-sdk-client");
  const payload = await response.json();

  return payload.data.map((item: QedixArea12SdkUser) => ({
    id: item.id,
    email: item.email,
    displayName: item.displayName,
  }));
}
