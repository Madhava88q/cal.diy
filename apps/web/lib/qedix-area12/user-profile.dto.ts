export type QedixArea12UserProfileDto = {
  id: string;
  email: string;
  displayName: string;

  // Qedix Area 12.3 controlled canary:
  // This intentionally changes a public DTO/schema contract by adding
  // new required response/request fields that clients may not expect.
  locale: string;
  timezone: string;
};

export type QedixArea12UserProfileResponse = {
  user: QedixArea12UserProfileDto;
  contractVersion: "area-12-dto-schema-canary";
};

export const qedixArea12UserProfileSchemaFields = [
  "id",
  "email",
  "displayName",
  "locale",
  "timezone",
] as const;
